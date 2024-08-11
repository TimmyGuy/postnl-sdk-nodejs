import {PostNL} from "../postnl";
import {LabellingRequest, LabellingResponse} from "./interfaces";

/**
 * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/labelling/overview
 * @deprecated Prefer using the `Shipment` class instead.
 */
export class Label {
    readonly path = '/shipment/v2_2/label'

    constructor(private readonly postnl: PostNL) {}

    /**
     *
     * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/labelling/generate-label
     * @see https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/shipment/generate-shipment-label
     */
    async generate(
        payload: LabellingRequest,
        confirm?: boolean
    ) {
        const path = confirm ? `${this.path}?confirm=true` : this.path;
        return await this.postnl.post<LabellingResponse>(`${path}`, payload);
    }
}