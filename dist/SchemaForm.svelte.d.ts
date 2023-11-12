import { SvelteComponentTyped } from "svelte";
import 'core-js/actual/structured-clone';
import type { JSONSchema7 } from "json-schema";
import DownloadOptions, { type DataTransform } from './DowloadOptions';
import UISchema from "./UISchema";
declare const __propDef: {
    props: {
        ref: any;
        schema?: JSONSchema7 | undefined;
        data?: {
            [prop: string]: any;
        } | undefined;
        uischema?: UISchema | undefined;
        validate?: (() => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[]) | undefined;
        getBlob?: ((transform?: DataTransform) => Blob) | undefined;
        getUrl?: ((transform?: DataTransform) => string) | undefined;
        download?: {
            (options?: DownloadOptions): void;
            (filename: string, options?: DownloadOptions): void;
        } | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            actions: {
                readonly blob: Blob;
                readonly url: string;
                validate: () => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
                download: {
                    (options?: DownloadOptions): void;
                    (filename: string, options?: DownloadOptions): void;
                };
            };
        };
    };
};
export type SchemaFormProps = typeof __propDef.props;
export type SchemaFormEvents = typeof __propDef.events;
export type SchemaFormSlots = typeof __propDef.slots;
export default class SchemaForm extends SvelteComponentTyped<SchemaFormProps, SchemaFormEvents, SchemaFormSlots> {
    get validate(): () => boolean | import("ajv").ErrorObject<string, Record<string, any>, unknown>[];
    get getBlob(): (transform?: DataTransform | undefined) => Blob;
    get getUrl(): (transform?: DataTransform | undefined) => string;
    get download(): {
        (options?: DownloadOptions | undefined): void;
        (filename: string, options?: DownloadOptions | undefined): void;
    };
}
export {};
