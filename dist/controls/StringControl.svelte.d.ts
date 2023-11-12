import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        data?: string | undefined;
        title?: string | undefined;
        description?: string | undefined;
        format?: string | undefined;
        minLength?: number | undefined;
        maxLength?: number | undefined;
        pattern?: string | undefined;
        isRequired?: boolean | undefined;
        force?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type StringControlProps = typeof __propDef.props;
export type StringControlEvents = typeof __propDef.events;
export type StringControlSlots = typeof __propDef.slots;
export default class StringControl extends SvelteComponentTyped<StringControlProps, StringControlEvents, StringControlSlots> {
}
export {};
