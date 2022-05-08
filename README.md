# Node Express JWT Authentication / Authorization - example UT - Thanh - NodeJS Developer - May 2022

An example project implementing JWT authentication and role based authorization.
- Create an API where the administration can sign up an account 
- Create an API where the administrator can sign in an account 
- Create an API where the customer can sign in an account
- Create an API where the customer can sign up an account
- Create a middleware Authorization header that can determine if the client accessing the API is an admin or a user
- Create an API where it returns hello world using authorization header with JWT Token and this API can only be access by admin
- Create an API where it returns hello world using authorization header with JWT Token and this API can only be access by the customer
- Database must use a sqlite locally when run
- Document your API using swagger

### Demo Setup
1. Clone the repository with `git clone https://github.com/thanhth85/node-express-jwt-sample.git`
2. Generate RSA256 public private keys and place them in the `config` folder with file names `public.key` and `private.key`.  A 512bit key size should be fine.
    - [Online RSA Key Generator][1]
3. Install dependencies with `npm install`.
4. Run migrations and seed that Sqlite database with `sequelize db:migrate` and `sequelize db:seed:all`.
5. Run the project with `npm run dev`.

### Default Credentials

| Username | Password | Description |
| - | - | - |
| admin | admin | User with `ADMIN` roles. |
| user | user | User with only `USER` role. |

### Default Routes

| Path | Method | Description |
| - | - | - |
| `/signin` | `POST` | Authenticate user, returns JWT token.  Jwt token can the be place in `Authorization` header prefixed with `Bearer`|
| `/signup` | `POST` | Create new user|
| `/api/v1/admin` | `GET` | Users only path |
| `/api/v1/customer` | `GET` | Admin only path |


### Middleware Methods

| Method | Description |
| - | - |
| `verify()` | Verifies token passed in `Authorization` request header.  Token prefixed with `Bearer` |
| `hasRole(role)` | Ensures the authenticated user has appropriate role |
| `hasAnyRole([role, role])` | Ensures the authenticated user has ANY of the appropriate roles |
| `hasAllRoles([role, role])` | Ensures the authenticated user has ALL the appropriate roles |

### Doc Swaager ( integration)
[Doc Swaager](http://localhost:3000/docs/): http://localhost:3000/docs/

# Testing:
```
curl --request POST 'localhost:3000/signup' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "username": "admin1",
                "password": "admin1",
                "role": "ADMIN"
            }'
```

```
curl --request POST 'localhost:3000/signin' \
            --header 'Content-Type: application/json' \
            --data-raw '{
                "username": "admin1",
                "password": "admin1"
            }'
```

```
curl --request GET 'localhost:3000/api/v1/admin' \                
                --header 'Content-Type: application/json'

curl --request GET 'localhost:3000/api/v1/customer' \                
                --header 'Content-Type: application/json'
```