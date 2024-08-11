import {
    Address,
    Amount,
    Contact,
    CustomerAddress, Customs,
    Dimension, ExtraField,
    Group,
    HazardousMaterial,
    ProductOption, Warning
} from "../types/interfaces";

export interface LabellingRequest {
    Customer: LabellingCustomer;
    LabelSignature?: string;
    Message: LabellingCustomerMessage;
    Shipments: LabellingCustomerShipment[];
}

export interface LabellingCustomer {
    Address?: CustomerAddress;
    CollectionLocation?: string;
    ContactPerson?: string;
    CustomerCode: string;
    CustomerNumber: string;
    Email?: string;
    Name?: string;
}

export interface LabellingCustomerMessage {
    MessageID: string;
    MessageTimeStamp: string;
    Printertype: string;
}

export interface LabellingCustomerShipment {
    Addresses: Address[];
    Amounts?: Amount[];
    Barcode?: string;
    CodingText?: string;
    CollectionTimeStampStart?: string;
    CollectionTimeStampEnd?: string;
    Contacts?: Contact[];
    Content?: string;
    CostCenter?: string;
    CustomerOrderNumber?: string;
    Customs?: Customs;
    DeliveryAddress?: string;
    DeliveryDate?: string;
    Dimension: Dimension;
    DownPartnerBarcode?: string;
    DownPartnerID?: string;
    DownPartnerLocation?: string;
    Groups?: Group[];
    HazardousMaterial?: HazardousMaterial[];
    ProductCodeCollect?: string;
    ProductCodeDelivery?: string;
    ProductOptions?: ProductOption[];
    ReceiverDateOfBirth?: string;
    Reference?: string;
    ReferenceCollect?: string;
    Remark?: string;
    ReturnBarcode?: string;
    ReturnReference?: string;
    TimeslotID?: string;
    ExtraFields?: ExtraField[];
}

export interface LabellingCustomsContent {
    Description: string;
    Quantity: number;
    Weight: number;
    Value: number;
    HSTariffNr?: string;
    CountryOfOrigin?: string;
}

export interface LabellingResponse {
    MergedLabels: LabellingMergedLabel[];
    ResponseShipments: LabellingResponseShipment[];
}

export interface LabellingMergedLabel {
    Barcodes: string[];
    Labels: LabellingLabel[];
}

export interface LabellingLabel {
    Content: string;
    Label: string;
    LabelType: string;
}

export interface LabellingResponseShipment {
    ProductCodeDelivery?: string;
    Labels?: LabellingLabel[];
    Barcode?: string;
    Errors?: Object[];
    Warnings?: Warning[];
}