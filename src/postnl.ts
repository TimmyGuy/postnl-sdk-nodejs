import {Barcode} from "./barcode/barcode";
import {PostNLError} from "./error";
import {Confirm} from "./confirm/confirm";
import {Label} from "./label/label";
import {Shipment} from "./shipment/shipment";

const defaultBaseUrl = 'https://api.postnl.nl';
const sandboxBaseUrl = 'https://api-sandbox.postnl.nl';
const baseUrl = typeof process.env !== 'undefined' && process.env.NODE_ENV === 'production' ? defaultBaseUrl : sandboxBaseUrl;

export class PostNL {
    private readonly headers: Headers;

    readonly barcode = new Barcode(this);
    readonly confirm = new Confirm(this);
    readonly label = new Label(this);
    readonly shipment = new Shipment(this);

    constructor(readonly key?: string) {
        if (!key) {
            if (typeof process !== 'undefined' && process.env) {
                this.key = process.env.RESEND_API_KEY;
            }

            if (!this.key) {
                throw new Error(
                    'Missing API key. Pass it to the constructor `new PostNL("...")`',
                );
            }
        }

        this.headers = new Headers({
            'apiKey': `${this.key}`,
            'Content-Type': 'application/json',
        });
    }

    async fetchRequest<T>(
        path: string,
        options?: {}
    ): Promise<T> {
        const response = await fetch(`${baseUrl}${path}`, options);

        if (!response.ok) {
            const error = await response.json()
            // path without search params
            const cleanPath = path.split('?')[0];
            throw new PostNLError(cleanPath, error);
        }

        return await response.json();
    }

    async post<T>(path: string, entity?: unknown, options = {}) {
        const requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(entity),
            ...options,
        };

        return this.fetchRequest<T>(path, requestOptions);
    }

    async get<T>(path: string, options = {}) {
        const requestOptions = {
            method: 'GET',
            headers: this.headers,
            ...options,
        };

        return this.fetchRequest<T>(path, requestOptions);
    }
}