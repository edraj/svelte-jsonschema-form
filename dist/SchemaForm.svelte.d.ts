import { SvelteComponentTyped } from "svelte";
import type { JSONSchema7 } from "json-schema";
import UISchema from "./UISchema";
declare const __propDef: {
    props: {
        ref: any;
        schema?: JSONSchema7 | undefined;
        data?: {
            [prop: string]: any;
        } | undefined;
        uischema?: UISchema | undefined;
        validate?: (() => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[]) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SchemaFormProps = typeof __propDef.props;
export type SchemaFormEvents = typeof __propDef.events;
export type SchemaFormSlots = typeof __propDef.slots;
export default class SchemaForm extends SvelteComponentTyped<SchemaFormProps, SchemaFormEvents, SchemaFormSlots> {
    get validate(): () => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
}
export {};
