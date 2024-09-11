import { SvelteComponentTyped } from "svelte";
import type { JSONSchema7 } from "json-schema";
import type UISchema from "./UISchema";
declare const __propDef: {
    props: {
        schema: JSONSchema7 | null;
        data?: any;
        uischema?: UISchema;
        force?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ControlProps = typeof __propDef.props;
export type ControlEvents = typeof __propDef.events;
export type ControlSlots = typeof __propDef.slots;
export default class Control extends SvelteComponentTyped<ControlProps, ControlEvents, ControlSlots> {
}
export {};
