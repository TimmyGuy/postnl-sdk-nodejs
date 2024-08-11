import {PostNL} from "../postnl";
import {LabellingRequest, LabellingResponse} from "../label/interfaces";


export class Shipment {
    readonly path = '/shipment/v2_2/label'

    constructor(private readonly postnl: PostNL) {}

    /**
     * @link https://developer.postnl.nl/docs/#/http/api-endpoints/send-track/shipment/generate-shipment-label
     */
    async generateLabel(
        payload: LabellingRequest,
        confirm?: boolean
    ) {
        const path = confirm ? `${this.path}?confirm=true` : this.path;
        return await this.postnl.post<LabellingResponse>(`${path}`, payload);
    }
}