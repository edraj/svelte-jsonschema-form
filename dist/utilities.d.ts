import type { JSONSchema7, JSONSchema7TypeName } from "json-schema";
export declare function toClasses(classObj: {
    [cls: string]: boolean;
}): string;
export declare function isSchemaType(type: JSONSchema7TypeName, { type: types }: JSONSchema7): boolean;
export declare function isObjectSchema(schema: JSONSchema7): boolean;
export declare function isArraySchema(schema: JSONSchema7): boolean;
export declare function hasRequired(schema: JSONSchema7): boolean;
export declare function isBoolean(arg: any): arg is boolean;
export declare function isString(arg: any): arg is string;
export declare function omit<T extends Record<any, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export declare function isDefined<T>(value: T | undefined): value is T;
export declare function isEmpty(obj: {
    [key: string]: any;
}): boolean;
