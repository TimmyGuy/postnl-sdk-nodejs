# Unofficial PostNL Node.js SDK

[![npm version](https://badge.fury.io/js/postnl-sdk.svg)](https://badge.fury.io/js/postnl-sdk)

This is an unofficial Node.js SDK for the PostNL API. It is a wrapper around the PostNL API, which is a RESTful API that
allows you to create shipments, request shipping labels, and track shipments.

_This SDK is not affiliated with PostNL._

Refer to [PostNL API documentation](https://developer.postnl.nl/docs/#/http/getting-started/how-to-get-started) for more information.

## Installation

```bash
npm install postnl-sdk
```

## Usage

```typescript
import { PostNL } from 'postnl-sdk';

const postnl = new PostNL('your-api-key');
```

The api key is _optional_. If not provided, it will search for the `POSTNL_API_KEY` environment variable.

## Example
Generate a barcode of type 3S:
```typescript
const payload: GenerateBarcodeOptions = {
    CustomerCode: "DEVC",
    CustomerNumber: "11223344",
    Type: '3S',
};

const barcode = await postnl.barcode.generate(payload);
// Output: { Barcode: '3SDEVC903942795' }
```

## Roadmap
- [ ] Send & Track
  - [x] Barcode
    - [x] Generate barcode
    - [x] Tests
  - [ ] Confirming
    - [x] Confirm shipment
    - [ ] Tests
  - [ ] Labelling
    - [x] Generate label
    - [ ] Tests
  - [ ] Shipment
    - [x] Generate shipment label
    - [x] Tests
  - [ ] Shipping Status
    - [ ] Get status by barcode
    - [ ] Get status by reference
    - [ ] Get shipment signature
    - [ ] Get updated status by customer number
    - [ ] Tests
- [ ] Checkout & Delivery options
  - [ ] Checkout
    - [ ] Checkout
    - [ ] Tests
  - [ ] Locations
    - [ ] Get pickup locations by address
    - [ ] Get pickup locations by coordinates
    - [ ] Get pickup locations within area
    - [ ] Get pickup location
    - [ ] Tests
  - [x] Postalcode check
    - [x] Checkout postalcode check
    - [x] Tests
  - [ ] Timeframes
    - [ ] Retrieve delivery timeframes
    - [ ] Tests
