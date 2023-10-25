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
        multipleOf?: number | undefined;
        force?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type IntegerControlProps = typeof __propDef.props;
export type IntegerControlEvents = typeof __propDef.events;
export type IntegerControlSlots = typeof __propDef.slots;
export default class IntegerControl extends SvelteComponentTyped<IntegerControlProps, IntegerControlEvents, IntegerControlSlots> {
}
export {};
