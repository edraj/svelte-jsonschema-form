<script lang="ts">
  import type { JSONSchema7 } from "json-schema";
  import UISchema from "$lib/UISchema";
  import { hasRequired as checkRequired, isBoolean } from "$lib/utilities";
  import Control from "../Control.svelte";
  import { Button, Icon, Accordion, AccordionItem } from "sveltestrap";
  import {onMount} from "svelte";

  export let data: any[] | undefined = undefined;
  export let uischema: UISchema = {};
  export let title: string | undefined = undefined;
  export let description: string | null = null;

  export let prefixItems: JSONSchema7[] | undefined = undefined;
  export let items: JSONSchema7 | JSONSchema7[] | undefined = undefined;
  export let additionalItems: JSONSchema7 | undefined = undefined;

  // Validation Settings
  export let minItems: number = 0;
  // export let maxItems: number = Infinity;
  // TODO: implement additional validation settings
  // export let uniqueItems: boolean = false;
  // export let contains: JSONSchema7 | undefined = undefined;
  // export let minContains: number = 0;
  // export let maxContains: number = Infinity;
  // export let unevaluatedItems: JSONSchema7 | undefined = undefined;

  let open = true;
  const hasItems: boolean = (data?.length ?? 0) > 0;
  let prefixed: JSONSchema7[] = [];
  let additional: JSONSchema7 | null = null;
  let canAddItem = false;
  let enabled = true;

  const uiOptions = UISchema.Options.get(uischema);
  const ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
  const hasRequired = checkRequired({
      prefixItems,
      items,
      additionalItems,
  } as any);

  onMount(()=>{
    updateEnabled(data, hasRequired);
    updateData(enabled, ignoreEmpty);
    updateOpen(enabled);
    canAddItem = true;
  });


  $: {
    const itemsIsArray = Array.isArray(items);
    [prefixed, additional] = [
      (itemsIsArray ? items : prefixItems ?? []) as JSONSchema7[],
      (itemsIsArray ? additionalItems : items) as JSONSchema7,
    ];
  }


  function getKey(index: number) {
    const value = data![index];
    const useIndex = value == null || typeof value !== "object";
    return useIndex ? `${index} | ${getType(index) ?? ""}` : value;
  }

  function getItem(index: number) {
    return prefixed.length > index ? prefixed[index] : additional;
  }

  function getType(index: number) {
    return getItem(index)?.type;
  }

  function canRemoveItem(index: number) {
    return index >= prefixed.length && (data?.length ?? 0) > minItems;
  }

  function canMoveItemUp(index: number) {
    return index > 0 && getType(index) === getType(index - 1);
  }

  function canMoveItemDown(index: number) {
    return (
      index < (data?.length ?? 0) - 1 && getType(index) === getType(index + 1)
    );
  }

  function addItem() {
    if (canAddItem) {
        switch (additional?.type){
            case "array": data = [...(data ?? []), []]; break;
            case "boolean": data = [...(data ?? []), false]; break;
            case "integer": data = [...(data ?? []), 0]; break;
            case "number": data = [...(data ?? []), 0]; break;
            case "object": data = [...(data ?? []), {}]; break;
            case "null": data = [...(data ?? []), null]; break;
            case "string": data = [...(data ?? []), ""]; break;
        }
    }
  }

  function removeItem(index: number) {
    if (canRemoveItem(index)) {
      data?.splice(index, 1);
      data = ignoreEmpty && (data?.length ?? 0) === 0 ? undefined : data;
    }
  }

  function moveItemUp(index: number) {
    if (canMoveItemUp(index)) {
      [data![index - 1], data![index]] = [data![index], data![index - 1]];
    }
  }

  function moveItemDown(index: number) {
    if (canMoveItemDown(index)) {
      [data![index + 1], data![index]] = [data![index], data![index + 1]];
    }
  }

  function updateOpen(arg: boolean | UISchema.Options.Collapse) {
    open =
      hasItems ||
      (isBoolean(arg) ? arg : !UISchema.shouldCollapse($$props, arg, open));
  }

  function updateEnabled(data: any, hasRequired: boolean) {
    const shouldEnable = hasRequired || !!data;
    if (shouldEnable != enabled) {
      enabled = shouldEnable;
    }
  }

  function updateData(enabled: boolean, ignoreEmpty: boolean) {
    const hasData = typeof(data) === 'object' ? Object.keys(data).length > 0 : !!data;
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
    extraSuffix={extraSuffix}
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
