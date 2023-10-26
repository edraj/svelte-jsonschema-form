<script lang="ts">
  import {FormGroup, Input, Label} from 'sveltestrap';

  export let data: string | undefined = $$props.default;
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let format: string | undefined = undefined;
  export let minLength: number | undefined = undefined;
  export let maxLength: number | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let isRequired: boolean | undefined = undefined;
  export let force: boolean = false;

  let value: string = data ?? "";
  let enumValues: string[] | undefined = undefined;

  $: updateData(value);
  $: updateValue(data);
  $: enumValues = $$props.enum;


  function updateData(val: string) {
    const setData = (!!val || force) ? val : undefined;
    if (data !== setData) {
      data = setData;
    }
  }

  function updateValue(val: string | undefined) {
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
