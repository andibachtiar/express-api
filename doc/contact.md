# Contact API Specification

## Get List of Contacts

Endpoint : api/contact

Method : GET

Query parameter :

- name? : string = contact first name or last name
- phone? : string = contact phone number
- email? : string = contact email
- page : number = default = 1
- size : number = default = 10

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john_doe@example.com",
      "phone": "089999999999"
    },
    {
      "id": 2,
      "first_name": "John",
      "last_name": "Doe",
      "email": "john_doe@example.com",
      "phone": "089999999999"
    },
    ...
  ]
  "pagination": {
    "current_page": 1,
    "total_page": 5,
    "size": 10
  }
}
```

Response Body (failed) :

```json
{
  "errors": ["Unauthorized", ...]
}
```

## Get Single Contact

Endpoint : api/contact/:id

Method : GET

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john_doe@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (failed) :

```json
{
  "errors": ["Contact is not found", ...]
}
```

## Create Contact

Endpoint : api/contact

Method : POST

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john_doe@example.com",
  "phone": "089999999999"
}
```

Response Body (success) :

```json
{
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john_doe@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (failed) :

```json
{
  "errors": ["first_name is required", ...]
}
```

## Update Contact

Endpoint : api/contact/:id

Method : PUT

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "first_name": "John", // optional
  "last_name": "Doe", // optional
  "email": "john_doe@example.com", // optional
  "phone": "089999999999" // optional
}
```

Response Body (success) :

```json
{
  "data": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john_doe@example.com",
    "phone": "089999999999"
  }
}
```

Response Body (failed) :

```json
{
  "errors": ["contact is not found", ...]
}
```

## Delete Contact

Endpoint : api/contact/:id

Method : DELETE

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "OK"
}
```

Response Body (failed) :

```json
{
  "errors": ["contact is not found", ...]
}
```
