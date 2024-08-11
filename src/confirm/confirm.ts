import {PostNL} from "../postnl";
import {ConfirmingRequest, ConfirmingResponse} from "./interfaces";
import {PostNLError} from "../error";
import {Endpoint} from "../endpoint";

/**
 * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/shipment/confirm
 * @deprecated Prefer using the `Shipment` class instead.
 */
export class Confirm extends Endpoint {
    readonly path = '/shipment/v2/confirm'

    constructor(private readonly postnl: PostNL) {
        super();
    }

    async confirmShipment(
        payload: ConfirmingRequest
    ) {
        return await this.postnl.post<ConfirmingResponse>(`${this.path}`, payload);
    }

    registerDiscriminator(): void {
        PostNLError.registerDiscriminator<ConfirmingResponse>(
            (path) => path === this.path,
            (error) => `(${error.ResponseShipments[0].Errors?.[0].Code}) ${error.ResponseShipments[0].Errors?.[0].Description}}`
        )
    }
}