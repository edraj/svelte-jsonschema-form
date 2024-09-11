import type { JSONSchema7 } from "json-schema";
import { type Readable } from "svelte/store";
type UISchemaComponent<T extends string = string> = (T extends typeof UISchema.Options.Key ? never : {
    [key: string]: UISchemaComponent<T>;
}) & {
    [UISchema.Options.Key]?: UISchema.Options;
};
type UISchema = UISchemaComponent;
declare namespace UISchema {
    type Options = {
        collapse?: UISchema.Options.Collapse;
        ignoreEmpty?: boolean;
    };
    namespace Options {
        const Key = ":ui:";
        const ContextKey: unique symbol;
        type Collapse = "all" | "none" | "unrequired" | undefined;
        function get(uischema?: UISchema): Readable<{
            collapse?: UISchema.Options.Collapse;
            ignoreEmpty?: boolean;
        }>;
    }
    function store(uischema: UISchema): import("svelte/store").Writable<Options>;
    function shouldCollapse(schema: JSONSchema7, setting: Options.Collapse, fallback: boolean): boolean;
}
export default UISchema;
