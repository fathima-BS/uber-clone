# User Registration API

## Endpoint

POST /users/register

## Description

Registers a new user and returns a JWT token.

## Request Body

```json
{
  "fullname": {
    "firstname": "Fathima",
    "lastname": "Sulaiman"
  },
  "email": "fathima@example.com",
  "password": "123456"
}
```

## Validation Rules

- `fullname.firstname` is required and must contain at least 3 characters.
- `email` is required and must be a valid email address.
- `password` is required and must contain at least 6 characters.
- `fullname.lastname` is optional.

## Success Response

Status Code: `201 Created`

```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "Fathima",
      "lastname": "Sulaiman"
    },
    "email": "fathima@example.com"
  }
}
```

## Error Response

Status Code: `400 Bad Request`

```json
{
  "errors": [
    {
      "msg": "Invalid email"
    }
  ]
}
```