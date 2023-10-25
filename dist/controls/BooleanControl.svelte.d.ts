import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: boolean | undefined;
        title?: string | undefined;
        description?: string | undefined;
        force?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BooleanControlProps = typeof __propDef.props;
export type BooleanControlEvents = typeof __propDef.events;
export type BooleanControlSlots = typeof __propDef.slots;
export default class BooleanControl extends SvelteComponentTyped<BooleanControlProps, BooleanControlEvents, BooleanControlSlots> {
}
export {};
