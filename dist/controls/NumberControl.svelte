<script>import { Input, Label } from "sveltestrap";
export let data = $$props.default;
export let title = void 0;
export let description = void 0;
export let format = void 0;
export let isRequired = void 0;
export let minimum = void 0;
export let maximum = void 0;
export let multipleOf = void 0;
export let force = false;
let value = data ?? NaN;
let enumValues = void 0;
$:
  updateData(value);
$:
  updateValue(data);
$:
  enumValues = $$props.enum;
function updateData(val) {
  const setData = Number.isNaN(val) ? force ? $$props.default ?? NaN : void 0 : val;
  if (data !== setData) {
    data = setData;
  }
}
function updateValue(val) {
  const setValue = val ?? NaN;
  if (value !== setValue) {
    value = setValue;
  }
}
</script>

<div class="jsonschema-form-control control-number mb-3">
  {#if title}
    <Label>{title}</Label>
  {/if}
  {#if enumValues?.length}
    <Input  feedback={description ? description : ""} type="select"  variant="outlined" bind:value label={title} required={isRequired} menu$portal>
      {#if !force}
        <option value={NaN}/>
      {/if}
      {#each enumValues as enumValue}
        <option value={enumValue}>{enumValue}</option>
      {/each}
    </Input>
  {:else}
    <Input
      type={format ?? "number"}
      variant="outlined"
      feedback={description ? description : ""}
      label={title}
      bind:value={value}
      min={minimum}
      max={maximum}
      step={multipleOf ?? "any"}
      required={isRequired}
    >
      <svelte:fragment slot="helper">
      </svelte:fragment>
    </Input>
  {/if}
</div>

<style>
  .control-number > :global(.mdc-text-field),
  .control-number > :global(.mdc-select) {
    width: 100%;
  }
</style>
