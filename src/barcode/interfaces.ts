import {Type} from "../types/enums";

export interface GenerateBarcodeOptions {
    CustomerCode: string,
    CustomerNumber: string,
    Type: Type,
    serie?: string,
    range?: string,
}

export interface BarcodeResponse {
    Barcode: string;
}

export interface BarcodeResponseInvalid {
    errors: {
        errorMsg: string;
        errorNumber: string;
    }
}