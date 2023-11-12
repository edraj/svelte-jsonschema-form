import { getContext, setContext } from 'svelte';
import { writable, derived } from "svelte/store";
import { hasRequired } from "./utilities";
var UISchema;
(function (UISchema) {
    let Options;
    (function (Options) {
        Options.Key = ":ui:";
        Options.ContextKey = Symbol("svelte-jsonschema-form UI schema context key");
        function get(uischema) {
            const rootOpts = getContext(Options.ContextKey);
            const opts = uischema?.[Options.Key];
            return derived(rootOpts, $rootOpts => ({ ...$rootOpts, ...opts }));
        }
        Options.get = get;
    })(Options = UISchema.Options || (UISchema.Options = {}));
    function store(uischema) {
        const options = uischema?.[Options.Key] ?? {};
        const store = writable(options);
        return setContext(Options.ContextKey, store);
    }
    UISchema.store = store;
    function shouldCollapse(schema, setting, fallback) {
        switch (setting) {
            case "all":
                return true;
            case "none":
                return false;
            case "unrequired":
                return !hasRequired(schema);
        }
        return fallback;
    }
    UISchema.shouldCollapse = shouldCollapse;
})(UISchema || (UISchema = {}));
export default UISchema;
