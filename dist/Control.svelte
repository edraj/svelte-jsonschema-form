<script>import * as controls from "./controls";
export let schema;
export let data = void 0;
export let uischema = {};
export let force = false;
let control;
$:
  updateControlType(schema?.type);
function updateControlType(type) {
  const singleType = (Array.isArray(type) ? type[0] : type) ?? "object";
  control = controls[singleType];
}
</script>

<svelte:component this={control} {...schema} bind:data {uischema} {force} />
