# Store Management API

## Authentication Endpoints

### Register a New User
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:** `202 Accepted`

---

### Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Using the JWT Token

After successful login, include the JWT token in the `Authorization` header for all protected endpoints:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Important Notes

1. **Default User Role:** Before registering users, you need to create a USER role in the database:
   ```sql
   INSERT INTO role (id, name, created_date) VALUES (1, 'USER', NOW());
   ```

2. **JWT Configuration:**
   - Token expiration: 24 hours (86400000 ms)
   - Secret key is configured in `application.properties`

3. **Password Requirements:**
   - Minimum 8 characters
   - Passwords are encrypted using BCrypt

4. **Database:**
   - PostgreSQL on localhost:5432
   - Database name: `store_management`

---

## Running the Application

1. Make sure PostgreSQL is running
2. Create the database if it doesn't exist:
   ```sql
   CREATE DATABASE store_management;
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
4. The API will be available at: `http://localhost:8081`
