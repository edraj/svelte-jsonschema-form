<script>import { hasRequired as checkRequired, isBoolean } from "../utilities";
import UISchema from "../UISchema";
import { Accordion, AccordionItem } from "sveltestrap";
import AnyOfControl from "./AnyOfControl.svelte";
import ObjectProps from "./ObjectProps.svelte";
export let data = void 0;
export let uischema = {};
export let title = void 0;
export let properties = void 0;
export let required = [];
export let anyOf = void 0;
export let isRequired = void 0;
let open = true;
let enabled = false;
const uiOptions = UISchema.Options.get(uischema);
const justAnyOf = title == null && properties == null && anyOf != null;
const hasProps = !!Object.keys(properties ?? {}).length || !!Object.keys(anyOf ?? {}).length;
const hasRequired = isRequired || checkRequired({ properties, required, anyOf });
const ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
$:
  updateEnabled(data, hasRequired, ignoreEmpty);
$:
  updateData(enabled);
$:
  updateOpen(enabled);
$:
  updateOpen($uiOptions.collapse);
function updateOpen(arg) {
  open = hasProps && (isBoolean(arg) ? arg : !UISchema.shouldCollapse($$props, arg, open));
}
function updateEnabled(data2, hasRequired2, ignoreEmpty2) {
  const shouldEnable = hasRequired2 || !!data2;
  if (shouldEnable != enabled) {
    enabled = shouldEnable;
  }
}
function updateData(enabled2) {
  const hasData = typeof data === "object" ? Object.keys(data).length > 0 : !!data;
  const shouldHaveData = enabled2 && !ignoreEmpty;
  if (hasData != shouldHaveData) {
    data = shouldHaveData ? {} : void 0;
  }
}
function stop() {
  enabled = !enabled;
}
const extraPrefix = {
  action: stop,
  value: enabled
};
</script>

{#if justAnyOf}
  <AnyOfControl {title} {anyOf} type={'object'} bind:data {uischema} />
{:else}
  <Accordion class="jsonschema-form-control control-object mb-3">
    <AccordionItem
      class={hasRequired ? "no-disable" : undefined}
      header={(title ?? data?.title) ?? ""}
      extraPrefix={!hasRequired ? extraPrefix : null}
      nonInteractive={!hasProps}
    >
        <ObjectProps {title} {properties} {required} {anyOf} bind:data {uischema} />
    </AccordionItem>
  </Accordion>
{/if}
