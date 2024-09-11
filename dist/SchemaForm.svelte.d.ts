import { SvelteComponent } from "svelte";
import type { JSONSchema7 } from "json-schema";
import UISchema from "./UISchema";
declare const __propDef: {
    props: {
        ref: any;
        schema?: JSONSchema7;
        data?: {
            [prop: string]: any;
        };
        uischema?: UISchema;
        validate?: () => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type SchemaFormProps = typeof __propDef.props;
export type SchemaFormEvents = typeof __propDef.events;
export type SchemaFormSlots = typeof __propDef.slots;
export default class SchemaForm extends SvelteComponent<SchemaFormProps, SchemaFormEvents, SchemaFormSlots> {
    get validate(): () => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
}
export {};
