<script lang="ts">
  import type { JSONSchema7 } from "json-schema";
  import type UISchema from "./UISchema";
  import * as controls from "./controls";
  import { onMount } from "svelte";

  export let schema: JSONSchema7 | null;
  export let data: any = undefined;
  export let uischema: UISchema = {};
  export let force: boolean = false;

  let control: any;

  onMount(()=>{
    updateControlType(schema?.type)
  });

  function updateControlType(type: JSONSchema7['type']) {
    const singleType = (Array.isArray(type) ? type[0] : type) ?? "object";
    control = controls[singleType as keyof typeof controls] as any;
  }
</script>

<svelte:component this={control} {...schema} bind:data {uischema} {force} />
