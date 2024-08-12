import { Postalcode } from './postalcode';
import { PostNL } from '../postnl';
import { PostalcodeCheckAddress } from './interfaces';

jest.mock('../postnl');

describe('Postalcode', () => {
    let postnl: PostNL;
    let postalcode: Postalcode;

    beforeEach(() => {
        postnl = new PostNL();
        postalcode = new Postalcode(postnl);
    });

    it('returns a single address when only one result is found', async () => {
        const response: PostalcodeCheckAddress[] = [
            {
                "city": "UTRECHT",
                "postalCode": "3571ZZ",
                "streetName": "Molengraaffplantsoen",
                "houseNumber": 74,
                "formattedAddress": [
                    "Molengraaffplantsoen 74",
                    "3571ZZ UTRECHT"
                ]
            }
        ];
        (postnl.get as jest.Mock).mockResolvedValue(response);

        const result = await postalcode.check('3571ZZ', '74');

        expect(postnl.get).toHaveBeenCalledWith('/shipment/checkout/v1/postalcodecheck?postalcode=3571ZZ&housenumber=74');
        expect(result).toEqual(response[0]);
    });

    it('returns multiple addresses when more than one result is found', async () => {
        const response: PostalcodeCheckAddress[] = [
            {
                "city": "UTRECHT",
                "postalCode": "3532VA",
                "streetName": "Bilderdijkstraat",
                "houseNumber": 9,
                "formattedAddress": [
                    "Bilderdijkstraat 9",
                    "3532VA UTRECHT"
                ]
            },
            {
                "city": "UTRECHT",
                "postalCode": "3532VA",
                "streetName": "Bilderdijkstraat",
                "houseNumber": 9,
                "houseNumberAddition": "A",
                "formattedAddress": [
                    "Bilderdijkstraat 9 A",
                    "3532VA UTRECHT"
                ]
            },
            {
                "city": "UTRECHT",
                "postalCode": "3532VA",
                "streetName": "Bilderdijkstraat",
                "houseNumber": 9,
                "houseNumberAddition": "ABS",
                "formattedAddress": [
                    "Bilderdijkstraat 9 ABS",
                    "3532VA UTRECHT"
                ]
            }
        ];
        (postnl.get as jest.Mock).mockResolvedValue(response);

        const result = await postalcode.check('3532VA', '9');

        expect(postnl.get).toHaveBeenCalledWith('/shipment/checkout/v1/postalcodecheck?postalcode=3532VA&housenumber=9');
        expect(result).toEqual(response);
    });

    it('includes housenumber addition in the request if provided', async () => {
        const response: PostalcodeCheckAddress[] = [
            {
                "city": "UTRECHT",
                "postalCode": "3571ZZ",
                "streetName": "Molengraaffplantsoen",
                "houseNumber": 74,
                "houseNumberAddition": "bis",
                "formattedAddress": [
                    "Molengraaffplantsoen 74 bis",
                    "3571ZZ UTRECHT"
                ]
            }
        ];
        (postnl.get as jest.Mock).mockResolvedValue(response);

        const result = await postalcode.check('3571ZZ', '74', 'bis');

        expect(postnl.get).toHaveBeenCalledWith('/shipment/checkout/v1/postalcodecheck?postalcode=3571ZZ&housenumber=74&housenumberaddition=bis');
        expect(result).toEqual(response[0]);
    });
});