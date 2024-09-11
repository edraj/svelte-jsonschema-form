import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: boolean | undefined;
        title?: string | undefined;
        description?: string | undefined;
        force?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type BooleanControlProps = typeof __propDef.props;
export type BooleanControlEvents = typeof __propDef.events;
export type BooleanControlSlots = typeof __propDef.slots;
export default class BooleanControl extends SvelteComponent<BooleanControlProps, BooleanControlEvents, BooleanControlSlots> {
}
export {};
