<script>import { Input, Label } from "sveltestrap";
export let data = $$props.default;
export let title = undefined;
export let description = undefined;
export let format = undefined;
export let isRequired = undefined;
export let minimum = undefined;
export let maximum = undefined;
// export let multipleOf: number | undefined = undefined;
export let force = false;
let value = data ?? NaN;
let enumValues = undefined;
$: updateData(value);
$: updateValue(data);
$: enumValues = $$props.enum;
function updateData(val) {
    const setData = Number.isNaN(val) ? force ? ($$props.default ?? NaN) : undefined : val;
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
      feedback={description ? description : ""}
      bind:value={value}
      min={minimum}
      max={maximum}
      required={isRequired}
      step="any"
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
