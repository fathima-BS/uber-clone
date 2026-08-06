# Backend API Documentation

## POST /users/register

### Description

Registers a new user and returns a JWT token.

### Request Body

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

### Validation Rules

* `fullname.firstname` is required and must contain at least 3 characters.
* `email` is required and must be a valid email address.
* `password` is required and must contain at least 6 characters.
* `fullname.lastname` is optional.

### Success Response

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

### Error Response

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

---

## POST /users/login

### Description

Authenticates a user using email and password and returns a JWT token.

### Request Body

```json
{
  "email": "fathima@example.com",
  "password": "123456"
}
```

### Validation Rules

* `email` is required and must be a valid email address.
* `password` is required and must contain at least 6 characters.

### Success Response

Status Code: `200 OK`

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

### Error Response

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

Status Code: `401 Unauthorized`

```json
{
  "message": "Invalid email or password"
}
```

---

## GET /users/profile

### Description

Returns the authenticated user's profile information.

### Authentication

A valid JWT token is required. It can be sent either as a cookie named `token` or in the `Authorization` header as a Bearer token.

### Success Response

Status Code: `200 OK`

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "Fathima",
    "lastname": "Sulaiman"
  },
  "email": "fathima@example.com"
}
```

### Error Response

Status Code: `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```

---

## GET /users/logout

### Description

Logs out the authenticated user by blacklisting the current token and clearing the auth cookie.

### Authentication

A valid JWT token is required. It can be sent either as a cookie named `token` or in the `Authorization` header as a Bearer token.

### Success Response

Status Code: `200 OK`

```json
{
  "message": "logged out"
}
```

### Error Response

Status Code: `401 Unauthorized`

```json
{
  "message": "Unauthorized"
}
```
