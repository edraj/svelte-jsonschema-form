<script>import { FormGroup, Input } from "sveltestrap";
export let data = $$props.default;
export let title = void 0;
export let description = void 0;
export let force = false;
let checked = data ?? false;
$:
  updateData(checked);
$:
  updateChecked(data);
function updateData(val) {
  const setData = data != null || val || force ? val : void 0;
  if (data !== setData) {
    data = setData;
  }
}
function updateChecked(val) {
  const setValue = val ?? $$props.default ?? false;
  if (checked !== setValue) {
    checked = setValue;
  }
}
</script>

<div class="jsonschema-form-control control-boolean mb-3">
  <FormGroup class="d-flex">
    <Input type="checkbox" bind:checked  feedback={description ? description : ""} /> {title}
  </FormGroup>
</div>

<style>
  .control-boolean > :global(.mdc-text-field-helper-text) {
    margin-top: -10px;
    margin-left: 10px;
  }
</style>
