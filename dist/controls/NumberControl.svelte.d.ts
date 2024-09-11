import { SvelteComponent } from "svelte";
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
        force?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type NumberControlProps = typeof __propDef.props;
export type NumberControlEvents = typeof __propDef.events;
export type NumberControlSlots = typeof __propDef.slots;
export default class NumberControl extends SvelteComponent<NumberControlProps, NumberControlEvents, NumberControlSlots> {
}
export {};
