<script>import UISchema from "../UISchema";
import { hasRequired as checkRequired, isBoolean } from "../utilities";
import Control from "../Control.svelte";
import { Button, Icon, Accordion, AccordionItem } from "sveltestrap";
export let data = void 0;
export let uischema = {};
export let title = void 0;
export let description = null;
export let prefixItems = void 0;
export let items = void 0;
export let additionalItems = void 0;
export let minItems = 0;
export let maxItems = Infinity;
let open = true;
let hasItems = false;
let prefixed = [];
let additional = null;
let canAddItem = false;
let enabled = true;
$:
  uiOptions = UISchema.Options.get(uischema);
$:
  ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
$:
  hasItems = (data?.length ?? 0) > 0;
$: {
  const itemsIsArray = Array.isArray(items);
  [prefixed, additional] = [
    itemsIsArray ? items : prefixItems ?? [],
    itemsIsArray ? additionalItems : items
  ];
}
$:
  hasRequired = checkRequired({
    prefixItems,
    items,
    additionalItems
  });
$:
  canAddItem = additional !== null && (ignoreEmpty || !!data) && (data?.length ?? 0) < maxItems;
$:
  updateEnabled(data, hasRequired);
$:
  updateData(enabled, ignoreEmpty);
$:
  updateOpen(enabled);
$:
  updateOpen($uiOptions.collapse);
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
  return index < (data?.length ?? 0) - 1 && getType(index) === getType(index + 1);
}
function addItem() {
  if (canAddItem) {
    data = [...data ?? [], void 0];
  }
}
function removeItem(index) {
  if (canRemoveItem(index)) {
    data?.splice(index, 1);
    data = ignoreEmpty && (data?.length ?? 0) === 0 ? void 0 : data;
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
function headerAddItem(event) {
  addItem();
  event.stopPropagation();
  event.preventDefault();
  return false;
}
function updateOpen(arg) {
  open = hasItems || (isBoolean(arg) ? arg : !UISchema.shouldCollapse($$props, arg, open));
}
function updateEnabled(data2, hasRequired2) {
  const shouldEnable = hasRequired2 || !!data2;
  if (shouldEnable != enabled) {
    enabled = shouldEnable;
  }
}
function updateData(enabled2, ignoreEmpty2) {
  const hasData = data != null;
  const shouldHaveData = enabled2 && !ignoreEmpty2;
  if (hasData != shouldHaveData) {
    data = shouldHaveData ? [] : void 0;
  }
}
function stop(event) {
  event.stopPropagation();
  enabled = !enabled;
}
const extraSuffix = {
  action: headerAddItem,
  icon: "plus-square-fill"
};
const extraPrefix = {
  action: stop,
  value: !enabled
};
</script>

<Accordion class="jsonschema-form-control control-array mb-3">
  <AccordionItem
    header={title ?? ""}
    {extraSuffix}
    extraPrefix={!hasRequired ? extraPrefix : null}
    class={hasRequired ? "has-required" : undefined}
  >
    <h4>
      <p>{description ?? ""}</p>
    </h4>
    <div class="smui-paper__content">
      <ul class="control-array-items">
        {#if data}
          {#each data as value, index (getKey(index))}
            <li>
              <div class="">
                <Control
                  schema={getItem(index)}
                  bind:data={value}
                  uischema={uischema?.["items"]}
                  force
                />
              </div>
              <div class="control-array-item-actions">
                <Button
                  on:click={() => moveItemUp(index)}
                  disabled={!canMoveItemUp(index)}
                >
                  <Icon name="arrow-bar-up" />
                </Button>
                <!-- {#if canRemoveItem(index)}
                  <Fab mini on:click={() => removeItem(index)}>
                    <Icon class="material-icons">delete</Icon>
                  </Fab>
                {/if} -->
                <Button
                  on:click={() => removeItem(index)}
                  disabled={!canRemoveItem(index)}
                >
                  <Icon name="trash-fill" />
                </Button>
                <Button
                  on:click={() => moveItemDown(index)}
                  disabled={!canMoveItemDown(index)}
                >
                  <Icon name="arrow-bar-down" />
                </Button>
              </div>
            </li>
          {/each}
        {/if}
      </ul>
    </div>
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
