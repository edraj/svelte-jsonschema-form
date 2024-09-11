import { SvelteComponent } from "svelte";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import type UISchema from "../UISchema";
declare const __propDef: {
    props: {
        type?: JSONSchema7["type"];
        data: any;
        title?: string | undefined;
        uischema?: UISchema;
        anyOf?: JSONSchema7Definition[];
        isRequired?: boolean | undefined;
        force?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type AnyOfControlProps = typeof __propDef.props;
export type AnyOfControlEvents = typeof __propDef.events;
export type AnyOfControlSlots = typeof __propDef.slots;
export default class AnyOfControl extends SvelteComponent<AnyOfControlProps, AnyOfControlEvents, AnyOfControlSlots> {
}
export {};
