import {PostNL} from "../postnl";
import {ConfirmingRequest, ConfirmingResponse} from "./interfaces";

/**
 * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/shipment/confirm
 * @deprecated Prefer using the `Shipment` class instead.
 */
export class Confirm {
    readonly path = '/shipment/v2/confirm'

    constructor(private readonly postnl: PostNL) {}

    async confirmShipment(
        payload: ConfirmingRequest
    ) {
        return await this.postnl.post<ConfirmingResponse>(`${this.path}`, payload);
    }
}