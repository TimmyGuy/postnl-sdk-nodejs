import { Barcode } from './barcode';
import { PostNL } from '../postnl';
import { GenerateBarcodeOptions, BarcodeResponse } from './interfaces';
import { objectToSearchParams } from '../utils';
import {Type} from "../types/enums";

jest.mock('../postnl');
jest.mock('../utils');

describe('Barcode', () => {
    let postnl: PostNL;
    let barcode: Barcode;

    beforeEach(() => {
        postnl = new PostNL();
        barcode = new Barcode(postnl);
    });

    it('generates a barcode successfully with valid payload', async () => {
        const payload: GenerateBarcodeOptions = {
            CustomerCode: "DEVC",
            CustomerNumber: "11223344",
            Type: Type['3S'],
        };

        const response: BarcodeResponse = {
            "Barcode": "3SDEVC903942795"
        };

        (objectToSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(payload as unknown as Record<string, string>));
        (postnl.get as jest.Mock).mockResolvedValue(response);

        const result = await barcode.generate(payload);

        expect(objectToSearchParams).toHaveBeenCalledWith(payload);
        expect(postnl.get).toHaveBeenCalledWith('/shipment/v1_1/barcode?CustomerCode=DEVC&CustomerNumber=11223344&Type=3S');
        expect(result).toEqual(response);
    });

    it('throws an error when payload is invalid', async () => {
        const payload: Omit<GenerateBarcodeOptions, 'Type'> & {Type: string} = {
            CustomerCode: "DEVC",
            CustomerNumber: "11223344",
            Type: "Wrong Type",
        };
        (objectToSearchParams as jest.Mock).mockReturnValue(payload);
        (postnl.get as jest.Mock).mockRejectedValue(new Error('Invalid payload'));

        await expect(barcode.generate(payload as GenerateBarcodeOptions)).rejects.toThrow('Invalid payload');
    });

    it('handles network errors gracefully', async () => {
        const payload: GenerateBarcodeOptions =
            {
                CustomerCode: "DEVC",
                CustomerNumber: "11223344",
                Type: Type['3S'],
            };
        (objectToSearchParams as jest.Mock).mockReturnValue(payload);
        (postnl.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

        await expect(barcode.generate(payload)).rejects.toThrow('Network Error');
    });
});