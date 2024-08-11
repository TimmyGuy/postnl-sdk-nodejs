import {PostNL} from "../postnl";
import {BarcodeResponse, GenerateBarcodeOptions} from "./interfaces";
import {objectToSearchParams} from "../utils";

/**
 * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/barcode/overview
 * @deprecated Prefer using the `Shipment` class instead.
 */
export class Barcode {
    readonly path = '/shipment/v1_1/barcode'

    constructor(private readonly postnl: PostNL) {}

    async generate(
        payload: GenerateBarcodeOptions
    ) {
        const searchParams = objectToSearchParams(payload);
        return await this.postnl.get<BarcodeResponse>(`${this.path}?${searchParams.toString()}`);
    }
}