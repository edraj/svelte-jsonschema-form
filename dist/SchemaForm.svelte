<script>import "core-js/actual/structured-clone";
import DownloadOptions, {} from "./DowloadOptions";
import UISchema from "./UISchema";
import JsonSchemaDereferencer from "@json-schema-tools/dereferencer";
import Ajv from "ajv";
import ajvFormats from "ajv-formats";
import mergeAllOf from "json-schema-merge-allof";
import ObjectProps from "./controls/ObjectProps.svelte";
import Control from "./Control.svelte";
import ValidationError from "./ValidationError";
import { isObjectSchema, isString } from "./utilities";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle
} from "sveltestrap";
export let schema = {};
export let data = {};
export let uischema = {};
const Dereferencer = JsonSchemaDereferencer.default ?? JsonSchemaDereferencer;
const ajv = new Ajv();
ajvFormats(ajv);
const actions = {
  get blob() {
    return getBlob();
  },
  get url() {
    return getUrl();
  },
  validate,
  download
};
let uischemaStore = UISchema.store(uischema);
$:
  dereferencing = new Dereferencer(
    mergeAllOf(structuredClone(schema)),
    { mutate: true }
  ).resolve();
$:
  validator = ajv.compile(schema);
$:
  updateUischemaStore(uischema);
function updateUischemaStore(uischema2) {
  $uischemaStore = uischema2[UISchema.Options.Key] ?? {};
}
export function validate() {
  const valid = validator(data);
  return valid || (validator.errors ?? false);
}
export function getBlob(transform) {
  const transformed = transform ? transform(structuredClone(data), schema) : data;
  return new Blob(
    [JSON.stringify(transformed)],
    { type: "application/json" }
  );
}
export function getUrl(transform) {
  const blob = getBlob(transform);
  return URL.createObjectURL(blob);
}
export function download(arg1, arg2) {
  const [filename, options] = isString(arg1) ? [arg1, DownloadOptions.withDefaults(arg2)] : ["data", DownloadOptions.withDefaults(arg1)];
  const validity = !options.validate || validate();
  if (validity !== true) {
    throw new ValidationError(validity);
  }
  const url = getUrl(options.transform);
  const anchor = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  anchor.href = url;
  anchor.setAttribute("download", `${filename}.json`);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
</script>

<form class="jsonschema-form">
  {#await dereferencing}
    <p>dereferencing...</p>
  {:then dereferenced}
    {#if isObjectSchema(dereferenced)}
      <Card>
        {#if dereferenced.title}
          <CardTitle>{dereferenced.title}</CardTitle>
        {/if}
        {#if dereferenced.description}
          <CardSubtitle>{dereferenced.description}</CardSubtitle>
        {/if}
        <CardBody class="jsonschema-form-controls">
          <ObjectProps {...dereferenced} bind:data {uischema} force />
        </CardBody>
      </Card>
    {:else}
      <Control schema={dereferenced} bind:data {uischema} force />
    {/if}
  {:catch error}
    <div class="error">ERROR: {error.message}</div>
  {/await}

  {#if $$slots.default}
    <div class="actions">
      <slot {actions} />
    </div>
  {/if}
</form>

<style>
  .jsonschema-form .actions {
    margin: 12px 0;
  }

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
 