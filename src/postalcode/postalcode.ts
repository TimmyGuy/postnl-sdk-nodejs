import {Endpoint} from "../endpoint";
import {PostNL} from "../postnl";
import {PostalcodeCheckAddress, PostalcodeCheckResponseInvalid} from "./interfaces";
import {PostNLError} from "../error";

export class Postalcode extends Endpoint {
    readonly path = '/shipment/checkout/v1/postalcodecheck'

    constructor(private readonly postnl: PostNL) {
        super();
    }

    /**
     * @warning This endpoint doesn't work on the sandbox environment.
     * @link https://developer.postnl.nl/docs/#/http/api-endpoints/checkout-delivery-options/postalcode-check/checkout-postalcode-check
     */
    async check(
        postalcode: string,
        housenumber: string,
        housenumberaddition?: string
    ): Promise<PostalcodeCheckAddress[] | PostalcodeCheckAddress> {
        const searchParams = new URLSearchParams();
        searchParams.append('postalcode', postalcode);
        searchParams.append('housenumber', housenumber.toString());
        if (housenumberaddition) {
            searchParams.append('housenumberaddition', housenumberaddition);
        }
        const response = await this.postnl.get<PostalcodeCheckAddress[]>(`${this.path}?${searchParams.toString()}`);
        if (response.length === 1) {
            return response[0];
        }
        return response
    }

    registerDiscriminator(): void {
        PostNLError.registerDiscriminator<PostalcodeCheckResponseInvalid>(
            (path) => path === this.path,
            (error) => JSON.stringify(error.Errors)
        )
    }
}