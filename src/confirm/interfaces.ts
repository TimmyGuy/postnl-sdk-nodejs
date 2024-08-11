import {
    Address,
    Amount,
    Contact,
    Customer,
    Dimension,
    Group,
    HazardousMaterial,
    ProductOption, Warning
} from "../types/interfaces";

export interface ConfirmingRequest {
    Customer: Customer;
    Message: ConfirmingMessage;
    Shipments: ConfirmingShipment[];
}

export interface ConfirmingMessage {
    MessageID: string;
    MessageTimeStamp: string;
}

export interface ConfirmingShipment {
    Addresses: Address[];
    Amounts?: Amount[];
    Barcode: string;
    CodingText?: string;
    CollectionTimeStampStart?: string;
    CollectionTimeStampEnd?: string;
    Contacts?: Contact[];
    Content?: string;
    CostCenter?: string;
    CustomerOrderNumber?: string;
    Customs?: ConfirmingCustom[];
    DeliveryAddress?: string;
    Dimension?: Dimension;
    DownPartnerBarcode?: string;
    DownPartnerID?: string;
    DownPartnerLocation?: string;
    Groups?: Group[];
    HazardousMaterial?: HazardousMaterial[];
    ProductCodeCollect?: string;
    ProductCodeDelivery: string;
    ProductOptions?: ProductOption[];
    ReceiverDateOfBirth?: string;
    Reference?: string;
    ReferenceCollect?: string;
    Remark?: string;
    ReturnBarcode?: string;
    ReturnReference?: string;
    TimeslotID?: string;
}

export interface ConfirmingCustom {
    Certificate?: boolean;
    CertificateNr?: string;
    License?: boolean;
    LicenseNr?: string;
    Invoice?: boolean;
    InvoiceNr?: string;
    HandleAsNonDeliverable?: boolean;
    Currency: string;
    ShipmentType: string;
    TrustedShipperID?: string;
    ImporterReferenceCode?: string;
    TransactionCode?: string;
    TransactionDescription?: string;
    Content: ConfirmingCustomContent[];
}

export interface ConfirmingCustomContent {
    Description: string;
    Quantity: number;
    Weight: number;
    Value: number;
    HSTariffNr?: string;
    CountryOfOrigin?: string;
}

export interface ConfirmingResponse {
    ResponseShipments: ConfirmingResponseShipment[];
}

export interface ConfirmingResponseShipment {
    Errors?: ConfirmingError[];
    Warnings?: Warning[];
    Barcode: string;
}

export interface ConfirmingError {
    Code: string;
    Description: string;
}