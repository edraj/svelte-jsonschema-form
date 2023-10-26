<script lang="ts">
  import "../theme/_custom.scss"
  import { tick } from 'svelte';
  import SchemaForm, { type ValidationError } from "$lib";
  import schemas, { type TestSchema } from "../schemas";
  import { Input, TabContent, TabPane, Button } from "sveltestrap";

  import type UISchema from "$lib/UISchema";

  let active = schemas[0];
  let schema: TestSchema["schema"];
  let uischema: UISchema;
  let data: TestSchema["data"];
  let schemaString = "";
  let uischemaString = "";
  let dataString = "";
  let validationError: ValidationError | null = null;

  let schemaForm: SchemaForm;

  $: updateActive(active);
  $: setSchemaString(schema);
  $: setUISchemaString(uischema);
  $: setDataString(data);

  async function setSchemaString(schema: TestSchema["schema"]) {
    await tick();
    schemaString = JSON.stringify(schema, null, 2);
  }

  async function setUISchemaString(uischema: UISchema) {
    await tick();
    uischemaString = JSON.stringify(uischema, null, 2);
  }

  async function setDataString(data: TestSchema["data"]) {
    await tick();
    dataString = JSON.stringify(data, null, 2);
  }

  function updateActive(active: TestSchema) {
    schema = structuredClone(active.schema);
    uischema = structuredClone(active.uischema) ?? {};
    data = structuredClone(active.data);
  }

  function setSchema() {
    {schemaString}
    try {
      schema = JSON.parse(schemaString);
    } catch (error) {
      console.error(error);
    }
  }

  function setUISchema() {
    try {
      uischema = JSON.parse(uischemaString);
    } catch (error) {
      console.error(error);
    }
  }

  function setData() {
    try {
      data = JSON.parse(dataString);
    } catch (error) {
      console.error(error);
    }
  }

  function download() {
    try {
      schemaForm.download();
    } catch (error) {
      validationError = error as ValidationError;
    }
  }
</script>

<section>
  <TabContent id="schema-select">
    {#each schemas as schema}
      <TabPane tabId={schema.name} tab={schema.name}>
        <p>{schema.name}</p>
      </TabPane>
    {/each}
  </TabContent>
  <SchemaForm {schema} {uischema} bind:data bind:this={schemaForm} ref={null}>
    <Button color="primary" on:click={download} type="button" variant="raised">
      Download
    </Button>
  </SchemaForm>
</section>

<hr id="divider" />

<section id="debug">
  <Input type="textarea"
    bind:value={schemaString}
    on:change={setSchema}
    label="Schema"
  />

  <Input type="textarea"
    bind:value={uischemaString}
    on:change={setUISchema}
    label="UI Schema"
  />

  <Input type="textarea"
    bind:value={dataString}
    on:change={setData}
    label="Data"
  />
</section>

<style>
  :global(#schema-select) {
    margin-bottom: 32px;
  }

  #divider {
    margin-top: 3rem;
  }

  #debug {
    display: flex;
    justify-content: space-between;
    min-height: 500px;
  }

  #debug > :global(*) {
    margin: 8px;
    flex: 1;
  }
</style>
