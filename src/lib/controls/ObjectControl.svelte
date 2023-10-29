<script lang="ts">
  import type { JSONSchema7Definition } from "json-schema";
  import { hasRequired as checkRequired, isBoolean } from "$lib/utilities";
  import UISchema from "$lib/UISchema";
  import { Accordion, AccordionItem, Button, Icon } from 'sveltestrap';
  import AnyOfControl from "./AnyOfControl.svelte";
  import ObjectProps from "./ObjectProps.svelte";

  export let data: { [prop: string]: any } | undefined = undefined;
  export let uischema: UISchema = {};
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
  export let properties: { [prop: string]: any } | undefined = undefined;
  export let required: string[] = [];
  export let anyOf: JSONSchema7Definition[] | undefined = undefined;
  export let isRequired: boolean | undefined = undefined;

  let open = true;
  let hasProps = false;
  let enabled = true;

  $: uiOptions = UISchema.Options.get(uischema);
  $: justAnyOf = (title == null) && (properties == null) && (anyOf != null);
  $: hasProps = !!Object.keys(properties ?? {}).length || !!Object.keys(anyOf ?? {}).length;
  $: hasRequired = isRequired || checkRequired({ properties, required, anyOf });
  $: ignoreEmpty = $uiOptions.ignoreEmpty ?? false;
  $: updateEnabled(data, hasRequired, ignoreEmpty);
  $: updateData(enabled);
  $: updateOpen(enabled);
  $: updateOpen($uiOptions.collapse);

  function updateOpen(enabled: boolean): void;
  function updateOpen(collapse: UISchema.Options.Collapse): void;
  function updateOpen(arg: boolean | UISchema.Options.Collapse) {
    open = hasProps && (isBoolean(arg) ? arg : !UISchema.shouldCollapse($$props, arg, open));
  }

  function updateEnabled(data: any, hasRequired: boolean, ignoreEmpty: boolean) {
    const shouldEnable = hasRequired || ignoreEmpty || !!data;
    if (shouldEnable != enabled) {
      enabled = shouldEnable;
    }
  }

  function updateData(enabled: boolean) {
    const hasData = (data != null);
    const shouldHaveData = enabled && !ignoreEmpty;
    if (hasData != shouldHaveData) {
      data = shouldHaveData ? {} : undefined;
    }
  }

  function stop(event: Event) {
    event.stopPropagation();
      enabled = !enabled;
  }

  const extraSuffix = {
      action: () => {
          open = !open
      },
      icon: "plus-square-fill"
  };
  const extraPrefix = {
      action: stop,
      value: !enabled
  };
</script>

{#if justAnyOf}
  <AnyOfControl {title} {anyOf} type={'object'} bind:data {uischema} />
{:else}
  <Accordion class="jsonschema-form-control control-object mb-3">
    <AccordionItem
      class={(hasRequired || ignoreEmpty) ? "no-disable" : undefined}
      header={title ?? ""}
      extraPrefix={!hasRequired && !ignoreEmpty ? extraPrefix : null}
      nonInteractive={!hasProps}
    >
        <ObjectProps {title} {properties} {required} {anyOf} bind:data {uischema} />
    </AccordionItem>
  </Accordion>
{/if}
