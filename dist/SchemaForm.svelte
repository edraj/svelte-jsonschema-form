<script>import DownloadOptions, {} from './DowloadOptions';
import UISchema from "./UISchema";
import JsonSchemaDereferencer from "@json-schema-tools/dereferencer";
import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import mergeAllOf from "json-schema-merge-allof";
import ObjectProps from "./controls/ObjectProps.svelte";
import Control from "./Control.svelte";
import ValidationError from "./ValidationError";
import { isObjectSchema, isString } from './utilities';
import { Card, CardBody, } from 'sveltestrap';
export let ref;
export let schema = {};
export let data = {};
export let uischema = {};
/* A bit of a hack - When bulding the static test site, the dereferencer is still behind a
 * `.default` property for some reason. I'm guessing it has something to do with how modules are
 * imported during the svelte build process. When running in browser, it appears to be imported
 * properly (so `.default` is `undefined`).
 */
const Dereferencer = JsonSchemaDereferencer.default ?? JsonSchemaDereferencer;
const ajv = new Ajv();
ajvFormats(ajv);
let uischemaStore = UISchema.store(uischema);
let dereferencing;
$: {
    dereferencing = new Dereferencer(mergeAllOf(structuredClone(schema)), { mutate: true, recursive: false }).resolve();
}
let validator = ajv.compile(schema);
updateUischemaStore(uischema);
function updateUischemaStore(uischema) {
    $uischemaStore = uischema[UISchema.Options.Key] ?? {};
}
export function validate() {
    const valid = validator(data);
    return valid || (validator.errors ?? false);
}
</script>

<form class="jsonschema-form" bind:this={ref}>
  {#await dereferencing}
    <p>dereferencing...</p>
  {:then dereferenced}
    {#if isObjectSchema(dereferenced)}
      <Card>
        <!--{#if dereferenced.title}-->
        <!--  <CardTitle>{dereferenced.title}</CardTitle>-->
        <!--{/if}-->
        <!--{#if dereferenced.description}-->
        <!--  <CardSubtitle>{dereferenced.description}</CardSubtitle>-->
        <!--{/if}-->
        <CardBody class="d-flex flex-column">
          <ObjectProps {...dereferenced} bind:data {uischema} />
        </CardBody>
      </Card>
    {:else}
      <Control schema={dereferenced} bind:data {uischema} force />
    {/if}
  {:catch error}
    <div class="error">ERROR: {error.message}</div>
  {/await}
</form>

<style>
  .jsonschema-form :global(.jsonschema-form-controls),
  .jsonschema-form :global(.control-anyof > .smui-paper__title) {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .jsonschema-form :global(.jsonschema-form-controls > .jsonschema-form-control),
  .jsonschema-form :global(.jsonschema-form-controls .control-anyof-select) {
    flex-basis: 325px;
  }

  :global(.smui-select__menu-portal > .mdc-select__menu) {
    width: 325px;
    max-width: 80%;
  }

  .jsonschema-form :global(.jsonschema-form-controls > .control-array),
  .jsonschema-form :global(.jsonschema-form-controls > .control-object),
  .jsonschema-form :global(.jsonschema-form-controls > .control-anyof) {
    flex-basis: 100%;
  }
</style>
 