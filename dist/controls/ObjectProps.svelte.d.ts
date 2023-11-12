import { SvelteComponentTyped } from "svelte";
import type { JSONSchema7Definition } from "json-schema";
import UISchema from "../UISchema";
declare const __propDef: {
    props: {
        data: {
            [prop: string]: any;
        } | undefined;
        title?: string | undefined;
        uischema?: UISchema | undefined;
        properties?: {
            [prop: string]: any;
        } | undefined;
        required?: string[] | undefined;
        anyOf?: JSONSchema7Definition[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ObjectPropsProps = typeof __propDef.props;
export type ObjectPropsEvents = typeof __propDef.events;
export type ObjectPropsSlots = typeof __propDef.slots;
export default class ObjectProps extends SvelteComponentTyped<ObjectPropsProps, ObjectPropsEvents, ObjectPropsSlots> {
}
export {};
