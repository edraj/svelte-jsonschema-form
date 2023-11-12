<script>import UISchema from "../UISchema";
import Control from "../Control.svelte";
import AnyOfControl from "./AnyOfControl.svelte";
import { isEmpty } from "../utilities";
export let data;
export let title = void 0;
export let uischema = {};
export let properties = void 0;
export let required = [];
export let anyOf = void 0;
let items = [];
let values;
$:
  uiOptions = UISchema.Options.get(uischema);
$:
  ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
$:
  updateItems(properties, uischema);
$:
  updateValues(data, ignoreEmpty);
$:
  updateData(values);
function updateItems(properties2, uischema2) {
  items = properties2 == null ? [] : Object.entries(properties2).map(([name, props]) => {
    const schema = { title: name, ...props, isRequired: required.includes(name) };
    return { name, schema, uischema: uischema2?.[name] };
  });
}
function updateValues(data2, ignoreEmpty2) {
  if (ignoreEmpty2 && data2 == null && (values == null || !isEmpty(values))) {
    values = {};
  } else if (values != data2) {
    values = data2;
  }
}
function updateData(values2) {
  if (ignoreEmpty && values2 != null && isEmpty(values2) && data != null) {
    data = void 0;
  } else {
    data = values2;
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
