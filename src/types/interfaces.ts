import {CurrencyLabellingApi, ShipmentType} from "./enums";
import {LabellingCustomsContent} from "../label/interfaces";

export interface HTTPError {
    message: string;
    http_status_code: number;
}

export interface Unauthorized extends HTTPError {
    http_status_code: 401;
}

export interface MethodNotAllowedOnlyGetPost extends HTTPError {
    http_status_code: 405;
}

export interface TooManyRequests extends HTTPError {
    http_status_code: 429;
}

export interface InternalServerError {
    fault: {
        faultstring: string;
        detail: {
            errorcode: string;
        };
    };
}

export type DefaultErrors = Unauthorized | MethodNotAllowedOnlyGetPost | TooManyRequests | InternalServerError;

export interface Address {
    AddressType: string;
    Area?: string;
    Buildingname?: string;
    City: string;
    CompanyName?: string;
    Countrycode: string;
    Department?: string;
    Doorcode?: string;
    FirstName?: string;
    Floor?: string;
    HouseNr?: string;
    HouseNrExt?: string;
    Name?: string;
    Street?: string;
    StreetHouseNrExt?: string;
    Zipcode?: string;
}

export interface CustomerAddress extends Address {}

export interface Customer {
    Address?: CustomerAddress
    CollectionLocation?: string;
    ContactPerson?: string;
    CustomerCode: string;
    CustomerNumber: string;
    Email?: string;
    Name?: string;
}

export interface Amount {
    AmountType: string;
    AccountName?: string;
    BIC?: string;
    Currency?: string;
    IBAN?: string;
    Reference?: string;
    TransactionNumber?: string;
    Value: number;
}

export interface Contact {
    ContactType: string;
    Email?: string;
    SMSNr?: string;
    TelNr?: string;
}

export interface Dimension {
    Height: number;
    Length: number;
    Volume?: number;
    Weight: number;
    Width: number;
}

export interface Group {
    GroupType: string;
    GroupSequence?: number;
    GroupCount?: number;
    MainBarcode: string;
}

export interface HazardousMaterial {
    ToxicSubstanceCode: string;
    AdditionalToxicSubstanceCode?: string[];
    ADRPoints?: string;
    TunnelCode?: string;
    PackagingGroupCode?: string;
    PackagingGroupDescription?: string;
    GrossWeight?: string;
    UNDGNumber?: string;
    TransportCategoryCode?: string;
    ChemicalTechnicalDescription?: string;
}

export interface ProductOption {
    Characteristic: string;
    Option: string;
}

export interface Warning {
    Code?: string;
    Description?: string;
}

export interface ExtraField {
    Key?: string;
    Value?: string;
}

export interface Customs {
    Certificate?: boolean;
    CertificateNr?: string;
    License?: boolean;
    LicenseNr?: string;
    Invoice?: boolean;
    InvoiceNr?: string;
    HandleAsNonDeliverable?: boolean;
    Currency: CurrencyLabellingApi;
    ShipmentType: ShipmentType;
    TrustedShipperID?: string;
    ImporterReferenceCode?: string;
    TransactionCode?: string;
    TransactionDescription?: string;
    Content: LabellingCustomsContent[];
}