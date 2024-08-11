import {PostNL} from "../postnl";
import {BarcodeResponse, BarcodeResponseInvalid, GenerateBarcodeOptions} from "./interfaces";
import {objectToSearchParams} from "../utils";
import {PostNLError} from "../error";
import {Endpoint} from "../endpoint";

/**
 * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/barcode/overview
 * @deprecated Prefer using the `Shipment` class instead.
 */
export class Barcode extends Endpoint {
    readonly path = '/shipment/v1_1/barcode'

    constructor(private readonly postnl: PostNL) {
        super();
    }

    async generate(
        payload: GenerateBarcodeOptions
    ) {
        const searchParams = objectToSearchParams(payload);
        return await this.postnl.get<BarcodeResponse>(`${this.path}?${searchParams.toString()}`);
    }

    registerDiscriminator(): void {
        PostNLError.registerDiscriminator<BarcodeResponseInvalid>(
            (path) => path === this.path,
            (error) => `(${error.errors.errorNumber}) ${error.errors.errorMsg}`
        )
    }
}