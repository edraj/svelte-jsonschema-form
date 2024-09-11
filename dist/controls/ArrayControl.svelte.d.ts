import { SvelteComponentTyped } from "svelte";
import type { JSONSchema7 } from "json-schema";
import UISchema from "../UISchema";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: any[] | undefined;
        uischema?: UISchema | undefined;
        title?: string | undefined;
        description?: (string | null) | undefined;
        prefixItems?: JSONSchema7[] | undefined;
        items?: JSONSchema7 | JSONSchema7[] | undefined;
        additionalItems?: JSONSchema7 | undefined;
        minItems?: number | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ArrayControlProps = typeof __propDef.props;
export type ArrayControlEvents = typeof __propDef.events;
export type ArrayControlSlots = typeof __propDef.slots;
export default class ArrayControl extends SvelteComponentTyped<ArrayControlProps, ArrayControlEvents, ArrayControlSlots> {
}
export {};
