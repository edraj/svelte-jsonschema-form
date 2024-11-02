import { SvelteComponent } from "svelte";
import type { JSONSchema7Definition } from "json-schema";
import UISchema from "../UISchema";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: {
            [prop: string]: any;
        } | undefined;
        uischema?: UISchema;
        title?: string | undefined;
        description?: string | undefined;
        properties?: {
            [prop: string]: any;
        } | undefined;
        required?: string[];
        anyOf?: JSONSchema7Definition[] | undefined;
        isRequired?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type ObjectControlProps = typeof __propDef.props;
export type ObjectControlEvents = typeof __propDef.events;
export type ObjectControlSlots = typeof __propDef.slots;
export default class ObjectControl extends SvelteComponent<ObjectControlProps, ObjectControlEvents, ObjectControlSlots> {
}
export {};
