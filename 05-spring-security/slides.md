---
marp: true
title: "Spring Security"
version: "1.0"
paginate: true
---

<!-- _class: lead -->
# Spring Security introduction
### 3rd semester @ Erhvervsakademi København
<style>
section.lead h1 {
    text-align: center;
    font-size: 2.5em;
}
section.lead h3 {
    text-align: center;
    opacity: 0.6;
}
</style>
---

# Outline

---
## Authentication vs Authorization

**Authentication**:
Verifying the identity of a user or system (e.g., login process). We are going to implement JWT based authentication in our application.

**Authorization**:
Determining what an authenticated user or system is allowed to do (e.g., access control). We will use role-based authorization to restrict access to certain endpoints based on user roles.

---

# Role-based vs Permission-based Authorization

**Role-based Authorization**:
Access is granted based on predefined roles assigned to users (e.g., ADMIN, USER).

**Permission-based Authorization**:
Access is granted based on specific permissions assigned to users (e.g., READ, WRITE).

**Example**
An ADMIN role can have multiple permissions like READ, WRITE, DELETE, etc.

---

# Different types of authentication

- Form-based authentication
- Basic authentication
- **Token-based authentication (e.g., JWT)**
- OAuth2 / OpenID Connect

---

# JSON Web Tokens (JWT)

- A JSON Web Token (JWT) is a compact way to securely transmit information between parties as a JSON object.
- The information can be verified and trusted because it is digitally signed.
- JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.


---

# JWT Structure

A JWT is composed of three parts:
```
header.payload.signature
```

1. Header: Contains the type of token (JWT) and the signing algorithm being used.
2. Payload: Contains the claims or the information being transmitted (e.g., user ID, expiration time).
3. Signature: Used to verify the authenticity of the token and ensure it hasn't been tampered with.

> **Claim:** A claim is a piece of information about an entity (typically, the user) and additional data.

---

# Using HMAC SHA-256 to sign a JWT

When we use HMAC SHA-256 to sign a JWT, we follow these steps:
1. Create the Header and Payload as JSON objects.
2. Base64Url encode the Header and Payload.
3. Concatenate the encoded Header and Payload with a period (`.`) separator.
4. Create the Signature by applying the HMAC SHA-256 algorithm to the concatenated string using a secret key.
5. Base64Url encode the Signature.
6. Concatenate the encoded Header, Payload, and Signature with period (`.`) separators to form the final JWT.

---

# Spring Security Architecture

In Spring Security, the architecture is designed around a few key components:
1. **Security Filter Chain**: A series of filters that process incoming requests and outgoing responses.
2. **Authentication Manager**: Responsible for authenticating users based on provided credentials.
3. **UserDetailsService**: A service that retrieves user-related data, typically from a database.
4. **Security Context**: Holds the security information (like authentication details) for the current execution thread.


---

## Filter Chain
The filter chain is a series of filters that are applied to incoming requests and outgoing responses.


<!-- _class: img-50 -->

![alt text](assets/filter-chain.png)

<style>
  section.img-50 img {
    max-width: 50%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
</style>

---

# Multiple Security filter chains


<!-- _class: img-50 -->

![alt text](assets/multi-filter-chain.png)

<style>
  section.img-50 img {
    max-width: 50%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
</style>

---

<!-- _class: img-80 -->

![alt text](assets/filter-architecture.png)

<style>
  section.img-80 img {
    max-width: 80%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
</style>

---

![alt text](assets/auth-provider.png)
