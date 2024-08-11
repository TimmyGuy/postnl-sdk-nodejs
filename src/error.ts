export class PostNLError extends Error {
    public readonly object: any;

    constructor(message?: string, object?: any) {
        super(message);
        this.name = 'PostNLError';
        this.object = object;
    }

    override toString() {
        return JSON.stringify({
            name: this.name,
            message: this.message,
            object: this.object,
        })
    }
}