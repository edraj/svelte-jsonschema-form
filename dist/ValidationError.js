export default class ValidationError extends Error {
    errors;
    constructor(errors) {
        super("Data is invalid for JSON schema");
        this.errors = errors || [];
    }
}
