import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: number | undefined;
        title?: string | undefined;
        description?: string | undefined;
        format?: string | undefined;
        isRequired?: boolean | undefined;
        minimum?: number | undefined;
        maximum?: number | undefined;
        force?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type NumberControlProps = typeof __propDef.props;
export type NumberControlEvents = typeof __propDef.events;
export type NumberControlSlots = typeof __propDef.slots;
export default class NumberControl extends SvelteComponentTyped<NumberControlProps, NumberControlEvents, NumberControlSlots> {
}
export {};
