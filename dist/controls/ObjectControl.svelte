<script>import { hasRequired as checkRequired, isBoolean } from "../utilities";
import UISchema from "../UISchema";
import { Accordion, AccordionItem, Button, Icon } from "sveltestrap";
import AnyOfControl from "./AnyOfControl.svelte";
import ObjectProps from "./ObjectProps.svelte";
export let data = void 0;
export let uischema = {};
export let title = void 0;
export let description = void 0;
export let properties = void 0;
export let required = [];
export let anyOf = void 0;
export let isRequired = void 0;
let open = true;
let hasProps = false;
let enabled = true;
$:
  uiOptions = UISchema.Options.get(uischema);
$:
  justAnyOf = title == null && properties == null && anyOf != null;
$:
  hasProps = !!Object.keys(properties ?? {}).length || !!Object.keys(anyOf ?? {}).length;
$:
  hasRequired = isRequired || checkRequired({ properties, required, anyOf });
$:
  ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
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
  const shouldEnable = hasRequired2 || ignoreEmpty2 || !!data2;
  if (shouldEnable != enabled) {
    enabled = shouldEnable;
  }
}
function updateData(enabled2) {
  const hasData = data != null;
  const shouldHaveData = enabled2 && !ignoreEmpty;
  if (hasData != shouldHaveData) {
    data = shouldHaveData ? {} : void 0;
  }
}
function stop(event) {
  event.stopPropagation();
}
</script>

{#if justAnyOf}
  <AnyOfControl {title} {anyOf} type={'object'} bind:data {uischema} />
{:else}
  <Accordion class="jsonschema-form-control control-object">
    <AccordionItem
      bind:open
      variant="unelevated"
      disabled={!enabled}
      class={(hasRequired || ignoreEmpty) ? "no-disable" : undefined}
      nonInteractive={!hasProps}
    >
        {#if !hasRequired && !ignoreEmpty}
          <Button type="button" toggle bind:pressed={enabled} size="button" on:click={stop}>
            <Icon name="check-square-fill" />
            <Icon name="check-square" />
          </Button>
        {/if}
        <span class="control-object-title">{title ?? ""}</span>
        <svelte:fragment slot="description">{description ?? ""}</svelte:fragment>
        <svelte:fragment slot="icon">
          {#if hasProps}
            <Button type="button"toggle pressed={open} size="button">
              <Icon class="arrows-angle-expand" />
              <Icon class="arrows-angle-contract" />
            </Button>
          {/if}
        </svelte:fragment>

        <ObjectProps {title} {properties} {required} {anyOf} bind:data {uischema} />

    </AccordionItem>
  </Accordion>
{/if}
