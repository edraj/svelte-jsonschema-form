import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: number | undefined;
        title?: string | undefined;
        description?: string | undefined;
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
export type IntegerControlProps = typeof __propDef.props;
export type IntegerControlEvents = typeof __propDef.events;
export type IntegerControlSlots = typeof __propDef.slots;
export default class IntegerControl extends SvelteComponent<IntegerControlProps, IntegerControlEvents, IntegerControlSlots> {
}
export {};
