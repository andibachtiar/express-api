# Address API Specification

## Get List of Addresses

Endpoint: api/address

Method : GET

#### Request Header :

- X-API-TOKEN: token

#### Query parameter :

- page : number = default = 1
- size : number = default = 10

#### Response Body (success) :

```json
{
  "data": [
    {
      "street": "jl. abc 123",
      "city": "City A",
      "province": "Province I",
      "country": "Indonesia",
      "postal_code": "12345"
    },
    {
      "street": "jl. def 456",
      "city": "City B",
      "province": "Province II",
      "country": "Indonesia",
      "postal_code": "67890"
    },
    ...
  ],
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "size": 10
  }
}
```

## Get Single Address

Endpoint: api/address/:id

Method : GET

Request Header :

- X-API-TOKEN: token

#### Response Body (success) :

```json
{
  "data": {
    "street": "jl. abc 123",
    "city": "City A",
    "province": "Province I",
    "country": "Indonesia",
    "postal_code": "12345"
  }
}
```

#### Response Body (failed)

```json
{
    "errors": ["Unauthorized", ...]
}
```

## Create Address

Endpoint: api/address/:id

Method : POST

#### Request Header :

- X-API-TOKEN: token

#### Request Body :

```json
{
  "street": "jl. abc 123",
  "city": "City A",
  "province": "Province I",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

#### Response Body :

```json
{
  "street": "jl. abc 123",
  "city": "City A",
  "province": "Province I",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

#### Response Body (failed)

```json
{
    "errors": ["street is required", ...]
}
```

## Update Address

Endpoint: api/address/:id

Method : PUT

#### Request Header :

- X-API-TOKEN: token

#### Request Body :

```json
{
  "street": "jl. abc 123", //optional
  "city": "City A", //optional
  "province": "Province I", //optional
  "country": "Indonesia", //optional
  "postal_code": "12345" //optional
}
```

#### Response Body :

```json
{
  "street": "jl. abc 123",
  "city": "City A",
  "province": "Province I",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

#### Response Body (failed)

```json
{
    "errors": ["Unauthorized", ...]
}
```

## Delete Address

Endpoint: api/address/:id

Method : DELETE

#### Request Header :

- X-API-TOKEN: token

#### Response body (success) :

```json
{
  "data": "OK"
}
```

#### Response Body (failed) :

```json
{
  "errors": ["address is not found", ...]
}
```
