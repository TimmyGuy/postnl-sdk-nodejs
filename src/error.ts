import {HTTPError, InternalServerError} from "./types/interfaces";

export class PostNLError extends Error {
    public readonly object: any;
    static discriminators: {discriminator: (path: string) => boolean, handler: (error: any) => string}[] = [];

    constructor(path: string, error: unknown) {
        super();
        this.name = 'PostNLError';

        // Check for basic errors
        if (this.isHTTPError(error)) {
            this.message = error.message;
        }

        // Check for server errors
        if (this.isServerError(error)) {
            this.message = error.fault.faultstring;
        }

        // Check for custom errors
        for (const {discriminator, handler} of PostNLError.discriminators) {
            if (discriminator(path)) {
                this.message = path + ' - ' + handler(error);
                return;
            }
        }

        this.message = JSON.stringify(error);

    }

    private isHTTPError(error: unknown): error is HTTPError {
        return (error as HTTPError).http_status_code !== undefined;
    }

    private isServerError(error: unknown): error is InternalServerError {
        return (error as InternalServerError).fault !== undefined;
    }

    static registerDiscriminator<T>(discriminator: (path: string) => boolean, handler: (error: T) => string) {
        this.discriminators.push({discriminator, handler});
    }

    override toString() {
        return JSON.stringify({
            name: this.name,
            message: this.message,
            object: this.object,
        })
    }
}