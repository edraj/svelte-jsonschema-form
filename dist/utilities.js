import traverse from "json-schema-traverse";
export function toClasses(classObj) {
    return Object.entries(classObj)
        .filter(([cls, val]) => val)
        .map(([cls, val]) => cls)
        .join(" ");
}
export function isSchemaType(type, { type: types }) {
    return (Array.isArray(types) ? types[0] : types) === type;
}
export function isObjectSchema(schema) {
    return isSchemaType("object", schema);
}
export function isArraySchema(schema) {
    return isSchemaType("array", schema);
}
export function hasRequired(schema) {
    let hasRequired = false;
    traverse(schema, schemaOrSubschema => {
        hasRequired ||= schemaOrSubschema.required?.length > 0;
    });
    return hasRequired;
}
export function isBoolean(arg) {
    return typeof arg === "boolean";
}
export function isString(arg) {
    return typeof arg === "string";
}
export function omit(obj, keys) {
    return Object.keys(obj)
        .filter(key => !keys.includes(key))
        .reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}
export function isDefined(value) {
    return (value != null) || (value === null);
}
export function isEmpty(obj) {
    return Object.entries(obj)
        .filter(([_, val]) => isDefined(val))
        .length === 0;
}
