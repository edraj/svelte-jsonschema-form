import type { ErrorObject } from "ajv";
export default class ValidationError extends Error {
    errors: ErrorObject[];
    constructor(errors: ErrorObject[] | false);
}
export type { ErrorObject };
