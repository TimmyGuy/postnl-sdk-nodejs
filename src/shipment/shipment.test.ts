import { Shipment } from './shipment';
import { PostNL } from '../postnl';
import { LabellingRequest, LabellingResponse } from '../label/interfaces';

jest.mock('../postnl');

const correctPayload: LabellingRequest = {
    "Customer": {
        "Address": {
            "AddressType": "02",
            "City": "Den Haag",
            "CompanyName": "PostNL",
            "Countrycode": "NL",
            "HouseNr": "3",
            "Street": "Waldorpstraat",
            "Zipcode": "2521CA"
        },
        "CollectionLocation": "123456",
        "ContactPerson": "Janssen",
        "CustomerCode": "DEVC",
        "CustomerNumber": "11223344",
        "Email": "email@company.com",
        "Name": "Janssen"
    },
    "Message": {
        "MessageID": "1",
        "MessageTimeStamp": "08-09-2022 12:00:00",
        "Printertype": "GraphicFile|PDF"
    },
    "Shipments": [
        {
            "Addresses": [
                {
                    "AddressType": "01",
                    "City": "Utrecht",
                    "Countrycode": "NL",
                    "FirstName": "Peter",
                    "HouseNr": "9",
                    "HouseNrExt": "a bis",
                    "Name": "de Ruiter",
                    "Street": "Bilderdijkstraat",
                    "Zipcode": "3532VA"
                }
            ],
            "Barcode": "3SDEVC748859096",
            "Contacts": [
                {
                    "ContactType": "01",
                    "Email": "receiver@email.com",
                    "SMSNr": "+31612345678",
                    "TelNr": "+31301234567"
                }
            ],
            "Dimension": {
                "Weight": 2000
            },
            "ProductCodeDelivery": "3085"
        }
    ]
}

describe('Shipment', () => {
    let postnl: PostNL;
    let shipment: Shipment;

    beforeEach(() => {
        postnl = new PostNL();
        shipment = new Shipment(postnl);
    });

    it('generates a shipment label successfully with valid payload and confirm flag', async () => {
        const payload: LabellingRequest = correctPayload;
        const response: LabellingResponse = {
            "MergedLabels": [],
            "ResponseShipments": [
                {
                    "Barcode": "3SDEVC272730803",
                    "Errors": [],
                    "Warnings": [],
                    "Labels": [
                        {
                            "Content": "JVBERi0xLjMKJeLjz9MKNSAwIG9iago8PAovQ29udGVudHMg[TRUNCATED]",
                            "Labeltype": "Label",
                            "OutputType": "PDF"
                        }
                    ],
                    "ProductCodeDelivery": "3085"
                }
            ]
        };
        (postnl.post as jest.Mock).mockResolvedValue(response);

        const result = await shipment.generateLabel(payload, true);

        expect(postnl.post).toHaveBeenCalledWith('/shipment/v2_2/label?confirm=true', payload);
        expect(result).toEqual(response);
    });

    it('generates a shipment label successfully with valid payload without confirm flag', async () => {
        const payload: LabellingRequest = correctPayload;

        const response: LabellingResponse = {
            "MergedLabels": [],
            "ResponseShipments": [
                {
                    "Barcode": "3SDEVC272730803",
                    "Errors": [],
                    "Warnings": [],
                    "Labels": [
                        {
                            "Content": "JVBERi0xLjMKJeLjz9MKNSAwIG9iago8PAovQ29udGVudHMg[TRUNCATED]",
                            "Labeltype": "Label",
                            "OutputType": "PDF"
                        }
                    ],
                    "ProductCodeDelivery": "3085"
                }
            ]
        };
        (postnl.post as jest.Mock).mockResolvedValue(response);

        const result = await shipment.generateLabel(payload);

        expect(postnl.post).toHaveBeenCalledWith('/shipment/v2_2/label', payload);
        expect(result).toEqual(response);
    });
});