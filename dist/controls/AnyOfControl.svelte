<script>import deepEquals from "fast-deep-equal";
import { tick } from 'svelte';
import { isObjectSchema, omit } from "../utilities";
import { Card, Input, Label } from 'sveltestrap';
import Control from "../Control.svelte";
import ObjectProps from "./ObjectProps.svelte";
export let type = undefined;
export let data;
export let title = undefined;
export let uischema = {};
export let anyOf = [];
export let isRequired = undefined;
export let force = false;
const keys = new WeakMap();
let schemas = [];
let selected = null;
let selectedProps = [];
$: typeSchema = { type: selected?.type ?? type };
$: updateSchemas(anyOf);
$: resetSelected(schemas);
$: resetData(selected);
function getKey(schema) {
    return keys.get(schema) ?? "";
}
function updateSchemas(anyOf) {
    const filtered = anyOf.filter(schema => (schema !== true) && (schema !== false));
    if (!deepEquals(schemas, filtered)) {
        schemas = filtered;
        const timestamp = Date.now();
        schemas.forEach((schema, index) => {
            if (!keys.has(schema)) {
                keys.set(schema, `${timestamp}#${index}`);
            }
        });
    }
}
function resetSelected(schemas) {
    if ((selected == null) ? force : !schemas.includes(selected)) {
        selected = force ? schemas[0] : null;
    }
}
async function resetData(selected) {
    await tick();
    const isObj = isObjectSchema(typeSchema);
    if (data != null) {
        if (selectedProps) {
            const omitted = omit(data, selectedProps);
            // make sure it's changed (to prevent infinite loop)
            if (Object.keys(data).length != Object.keys(omitted).length) {
                data = omitted;
            }
        }
        else {
            data = undefined;
        }
    }
    else if (isObj && force) {
        data = {};
    }
    selectedProps = isObj ? Object.keys(selected?.properties ?? {}) : undefined;
}
</script>

<Card variant="unelevated" class="jsonschema-form-control control-anyof">
    {#if title}
        <Label>{title}</Label>
    {/if}
  <Input type="select" name="select" id="exampleSelect">
      variant="outlined"
      key={getKey}
      class="control-anyof-select"
      required={isRequired}
      bind:value={selected}
    >
      {#if !force}
        <option value={null} />
      {/if}
      {#each schemas as schema, index (schema)}
        <option value={schema}>{schema.title ?? `Option ${index + 1}` }</option>
      {/each}
    </Input>
  <p class="jsonschema-form-controls">
    {#if selected != null}
      {#if isObjectSchema(typeSchema)}
        <ObjectProps {...selected} bind:data {uischema} />
      {:else}
        <Control schema={selected} bind:data {uischema} force />
      {/if}
    {/if}
  </p>
</Card>
