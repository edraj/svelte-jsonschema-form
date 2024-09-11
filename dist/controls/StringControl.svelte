<script>import { Input, Label } from 'sveltestrap';
export let data = $$props.default;
export let title = undefined;
export let description = undefined;
export let format = undefined;
export let minLength = undefined;
export let maxLength = undefined;
export let pattern = undefined;
export let isRequired = undefined;
export let force = false;
let value = data ?? "";
let enumValues = undefined;
$: updateData(value);
$: updateValue(data);
$: enumValues = $$props.enum;
function formatCasting() {
    switch (format) {
        case 'date-time': return "datetime-local";
        default: return format;
    }
}
function updateData(val) {
    const setData = (!!val || force) ? val : undefined;
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
      type={formatCasting()}
      bind:value
      minlength={minLength}
      maxlength={maxLength}
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
