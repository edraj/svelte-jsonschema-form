<script>import { FormGroup, Input, Label } from "sveltestrap";
export let data = $$props.default;
export let title = void 0;
export let description = void 0;
export let format = void 0;
export let minLength = void 0;
export let maxLength = void 0;
export let pattern = void 0;
export let isRequired = void 0;
export let force = false;
let value = data ?? "";
let enumValues = void 0;
$:
  updateData(value);
$:
  updateValue(data);
$:
  enumValues = $$props.enum;
function updateData(val) {
  const setData = !!val || force ? val : void 0;
  if (data !== setData) {
    data = setData;
  }
}
function updateValue(val) {
  const setValue = val ?? "";
  if (value !== setValue) {
    value = setValue;
  }
}
</script>

<div class="jsonschema-form-control control-string mb-3">
  {#if title}
    <Label>{title}</Label>
  {/if}
  {#if enumValues?.length}
    <Input type="select" bind:value label={title} required={isRequired} feedback={description ? description : ""}>
      {#if !force}
        <option value={null}/>
      {/if}
      {#each enumValues as enumValue}
        <option value={enumValue}>{enumValue}</option>
      {/each}
    </Input>
  {:else}
    <Input
      feedback={description ? description : ""}
      label={title}
      type={format}
      bind:value
      {minLength}
      {maxLength}
      {pattern}
      required={isRequired}
    >
    </Input>
  {/if}
</div>

<style>
  .control-string > :global(.mdc-text-field),
  .control-string > :global(.mdc-select) {
    width: 100%;
  }
</style>
