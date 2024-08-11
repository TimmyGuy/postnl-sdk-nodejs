import {PostNL} from "../postnl";
import {LabellingRequest, LabellingResponse, LabellingResponseInvalid} from "../label/interfaces";
import {PostNLError} from "../error";
import {Endpoint} from "../endpoint";


export class Shipment extends Endpoint {
    readonly path = '/shipment/v2_2/label'

    constructor(private readonly postnl: PostNL) {
        super();
    }

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

    registerDiscriminator(): void {
        PostNLError.registerDiscriminator<LabellingResponseInvalid>(
            (path) => path === this.path,
            (error) => JSON.stringify(error.Errors)
        )
    }
}