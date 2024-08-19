# User API Specification

## Register User

Endpoint : /api/register

Method : POST

Request Body :

```json
{
  "username": "andi",
  "name": "andi bachtiar",
  "password": "password"
}
```

Response Body (success)

```json
{
  "data": {
    "username": "andi",
    "name": "andi bachtiar"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": ["username is required", ...]
}
```

## Sign-in User

Endpoint : /api/login

Method : POST

Request Body :

```json
{
  "username": "andi",
  "password": "password"
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "andi",
    "name": "andi bachtiar",
    "token": "UUID"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": ["user unauthorized", ...]
}
```

## Get Current User

Endpoint : /api/user

Method : GET

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": {
    "username": "andi",
    "name": "andi bachtiar"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": ["Unauthorized", ...]
}
```

## Update User

Endpoint : /api/user

Method : PATCH

Request Header :

- X-API-TOKEN : token

Request Body :

```json
{
  "name": "andi bachtiar", //optional
  "password": "password" //optional
}
```

Response Body (success) :

```json
{
  "data": {
    "username": "andi",
    "name": "andi bachtiar"
  }
}
```

Response Body (Failed) :

```json
{
  "errors": ["user unauthorized", ...]
}
```

## Sing-Out User

Endpoint : /api/logout

Method : DELETE

Request Header :

- X-API-TOKEN : token

Response Body (success) :

```json
{
  "data": "OK"
}
```

Response Body (Failed) :

```json
{
  "errors": ["user unauthorized", ...]
}
```
