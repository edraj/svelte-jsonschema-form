<script>import UISchema from "../UISchema";
import Control from "../Control.svelte";
import AnyOfControl from "./AnyOfControl.svelte";
import { isEmpty } from "../utilities";
export let data;
export let title = undefined;
export let uischema = {};
export let properties = undefined;
export let required = [];
export let anyOf = undefined;
let items = [];
let values;
$: uiOptions = UISchema.Options.get(uischema);
$: ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
$: updateItems(properties, uischema);
$: updateValues(data, ignoreEmpty);
$: updateData(values);
function updateItems(properties, uischema) {
    items = (properties == null) ? [] :
        Object.entries(properties).map(([name, props]) => {
            const schema = { title: name, ...props, isRequired: required.includes(name) };
            return { name, schema, uischema: uischema?.[name] };
        });
}
function updateValues(data, ignoreEmpty) {
    if (ignoreEmpty && (data == null) && ((values == null) || !isEmpty(values))) {
        values = {};
    }
    else if (values != data) {
        values = data;
    }
}
function updateData(values) {
    if (ignoreEmpty && (values != null) && isEmpty(values) && (data != null)) {
        data = undefined;
    }
    else {
        data = values;
    }
}
</script>

{#if !!values}
  {#each items as { name, schema, uischema } (name)}
    <Control {schema} bind:data={values[name]} {uischema} />
  {/each}
{/if}
{#if (anyOf != null)}
  <AnyOfControl {anyOf} {title} type={'object'} bind:data {uischema} />
{/if}
