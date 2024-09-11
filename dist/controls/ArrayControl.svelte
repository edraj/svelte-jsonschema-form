<script>import UISchema from "../UISchema";
import { hasRequired as checkRequired, isBoolean } from "../utilities";
import Control from "../Control.svelte";
import { Button, Icon, Accordion, AccordionItem } from "sveltestrap";
import { onMount } from "svelte";
export let data = undefined;
export let uischema = {};
export let title = undefined;
export let description = null;
export let prefixItems = undefined;
export let items = undefined;
export let additionalItems = undefined;
// Validation Settings
export let minItems = 0;
// export let maxItems: number = Infinity;
// TODO: implement additional validation settings
// export let uniqueItems: boolean = false;
// export let contains: JSONSchema7 | undefined = undefined;
// export let minContains: number = 0;
// export let maxContains: number = Infinity;
// export let unevaluatedItems: JSONSchema7 | undefined = undefined;
let open = true;
const hasItems = (data?.length ?? 0) > 0;
let prefixed = [];
let additional = null;
let canAddItem = false;
let enabled = true;
const uiOptions = UISchema.Options.get(uischema);
const ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
const hasRequired = checkRequired({
    prefixItems,
    items,
    additionalItems,
});
onMount(() => {
    updateEnabled(data, hasRequired);
    updateData(enabled, ignoreEmpty);
    updateOpen(enabled);
    canAddItem = true;
});
$: {
    const itemsIsArray = Array.isArray(items);
    [prefixed, additional] = [
        (itemsIsArray ? items : prefixItems ?? []),
        (itemsIsArray ? additionalItems : items),
    ];
}
function getKey(index) {
    const value = data[index];
    const useIndex = value == null || typeof value !== "object";
    return useIndex ? `${index} | ${getType(index) ?? ""}` : value;
}
function getItem(index) {
    return prefixed.length > index ? prefixed[index] : additional;
}
function getType(index) {
    return getItem(index)?.type;
}
function canRemoveItem(index) {
    return index >= prefixed.length && (data?.length ?? 0) > minItems;
}
function canMoveItemUp(index) {
    return index > 0 && getType(index) === getType(index - 1);
}
function canMoveItemDown(index) {
    return (index < (data?.length ?? 0) - 1 && getType(index) === getType(index + 1));
}
function addItem() {
    if (canAddItem) {
        switch (additional?.type) {
            case "array":
                data = [...(data ?? []), []];
                break;
            case "boolean":
                data = [...(data ?? []), false];
                break;
            case "integer":
                data = [...(data ?? []), 0];
                break;
            case "number":
                data = [...(data ?? []), 0];
                break;
            case "object":
                data = [...(data ?? []), {}];
                break;
            case "null":
                data = [...(data ?? []), null];
                break;
            case "string":
                data = [...(data ?? []), ""];
                break;
        }
    }
}
function removeItem(index) {
    if (canRemoveItem(index)) {
        data?.splice(index, 1);
        data = ignoreEmpty && (data?.length ?? 0) === 0 ? undefined : data;
    }
}
function moveItemUp(index) {
    if (canMoveItemUp(index)) {
        [data[index - 1], data[index]] = [data[index], data[index - 1]];
    }
}
function moveItemDown(index) {
    if (canMoveItemDown(index)) {
        [data[index + 1], data[index]] = [data[index], data[index + 1]];
    }
}
function updateOpen(arg) {
    open =
        hasItems ||
            (isBoolean(arg) ? arg : !UISchema.shouldCollapse($$props, arg, open));
}
function updateEnabled(data, hasRequired) {
    const shouldEnable = hasRequired || !!data;
    if (shouldEnable != enabled) {
        enabled = shouldEnable;
    }
}
function updateData(enabled, ignoreEmpty) {
    const hasData = typeof (data) === 'object' ? Object.keys(data).length > 0 : !!data;
    const shouldHaveData = enabled && !ignoreEmpty;
    if (hasData != shouldHaveData) {
        data = shouldHaveData ? [] : undefined;
    }
}
function stop() {
    enabled = !enabled;
}
const extraSuffix = {
    action: addItem,
    icon: "plus-square-fill",
};
const extraPrefix = {
    action: stop,
    value: enabled,
};
</script>


<Accordion class="jsonschema-form-control control-array mb-3">
  <AccordionItem
    header={title ?? ""}
    {extraSuffix}
    extraPrefix={hasRequired ? extraPrefix : null}
    class={hasRequired ? "has-required" : undefined}
  >
    <h4>
      <p>{description ?? ""}</p>
    </h4>

    <ul class="control-array-items">
        {#if data}
          {#each data as value, index (getKey(index))}
            <li>
                <Control
                  schema={getItem(index)}
                  bind:data={value}
                  uischema={uischema?.["items"]}
                  force
                />
              <div class="control-array-item-actions">
                <Button
                  class="p-1 m-0"
                  on:click={() => moveItemUp(index)}
                  disabled={!canMoveItemUp(index)}
                >
                  <Icon name="arrow-bar-up" />
                </Button>
                <Button
                  class="p-1 m-0"
                  on:click={() => removeItem(index)}
                  disabled={!canRemoveItem(index)}
                >
                  <Icon name="trash-fill" />
                </Button>
                <Button
                  class="p-1 m-0"
                  on:click={() => moveItemDown(index)}
                  disabled={!canMoveItemDown(index)}
                >
                  <Icon name="arrow-bar-down p-0" />
                </Button>
              </div>
            </li>
          {/each}
        {/if}
      </ul>

  </AccordionItem>
</Accordion>


<style>
  .control-array-items {
    list-style: none;
    padding-left: 0;
    margin: 0;
    width: 100%;
  }

  .control-array-items > li {
    display: flex;
    align-items: center;
  }

  .control-array-items > li > :global(*:not(.control-array-item-actions)) {
    flex: 1;
  }

  .control-array-items > li > .control-array-item-actions {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }

  .control-array-items
    > li
    > .control-array-item-actions
    :global(.mdc-icon-button) {
    color: revert;
  }
</style>
