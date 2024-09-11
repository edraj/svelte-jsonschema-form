import { SvelteComponent } from "svelte";
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
        force?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export type StringControlProps = typeof __propDef.props;
export type StringControlEvents = typeof __propDef.events;
export type StringControlSlots = typeof __propDef.slots;
export default class StringControl extends SvelteComponent<StringControlProps, StringControlEvents, StringControlSlots> {
}
export {};
