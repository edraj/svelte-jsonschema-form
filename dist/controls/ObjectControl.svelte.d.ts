import { SvelteComponentTyped } from "svelte";
import type { JSONSchema7Definition } from "json-schema";
import UISchema from "../UISchema";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: {
            [prop: string]: any;
        } | undefined;
        uischema?: UISchema | undefined;
        title?: string | undefined;
        description?: string | undefined;
        properties?: {
            [prop: string]: any;
        } | undefined;
        required?: string[] | undefined;
        anyOf?: JSONSchema7Definition[] | undefined;
        isRequired?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ObjectControlProps = typeof __propDef.props;
export type ObjectControlEvents = typeof __propDef.events;
export type ObjectControlSlots = typeof __propDef.slots;
export default class ObjectControl extends SvelteComponentTyped<ObjectControlProps, ObjectControlEvents, ObjectControlSlots> {
}
export {};
