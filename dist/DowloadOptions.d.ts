import type { JSONSchema7Definition } from "json-schema";
export type DataTransform = (data: {
    [prop: string]: any;
}, schema: JSONSchema7Definition) => any;
type DownloadOptions = {
    validate?: boolean;
    transform?: DataTransform;
};
declare namespace DownloadOptions {
    const Default: {
        validate: boolean;
    };
    function withDefaults(options: DownloadOptions | undefined): {
        validate: boolean;
    } & DownloadOptions;
}
export default DownloadOptions;
