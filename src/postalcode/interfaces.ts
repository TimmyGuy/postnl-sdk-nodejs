export interface PostalcodeCheckAddress {
    city?: string;
    postalCode?: string;
    streetName?: string;
    houseNumber?: number;
    houseNumberAddition?: string;
    formattedAddress?: string[];
}

export interface PostalcodeCheckError {
    status?: string;
    title?: string;
    detail?: string;
}

export interface PostalcodeCheckResponseInvalid {
    Errors?: PostalcodeCheckError[];
}