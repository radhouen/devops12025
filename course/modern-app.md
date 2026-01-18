## 1. Understand and design service-based applications

### What it means

A **service-based application** is built as a set of **independent services** that communicate with each other over the network (usually via APIs).

Instead of one large application (monolith), functionality is split into services such as:

* User Service
* Payment Service
* Order Service
* Notification Service

Each service:

* Has a **single responsibility**
* Can be **developed, deployed, and scaled independently**

### Why it matters

* Easier maintenance
* Better scalability
* Teams can work independently
* Failures are isolated

### Example

In a NestJS backend:

* `auth-service` handles login & tokens
* `orders-service` handles orders
* `inventory-service` manages stock

They communicate via:

* HTTP (REST)
* gRPC
* Message queues (Kafka, RabbitMQ)

---

## 2. Understand common API concepts and standards

### What it means

APIs define **how services communicate**.

### Key API concepts

* **REST** (most common)
* **HTTP methods**

  * `GET` – read data
  * `POST` – create
  * `PUT/PATCH` – update
  * `DELETE` – delete
* **Status codes**

  * `200 OK`
  * `201 Created`
  * `400 Bad Request`
  * `401 Unauthorized`
  * `404 Not Found`
  * `500 Internal Server Error`

### Standards & formats

* **JSON** (most common)
* **OpenAPI / Swagger** – API documentation
* **Versioning** (e.g., `/api/v1/users`)
* **Authentication**

  * JWT
  * OAuth2

### Example

```http
GET /api/v1/orders/123
Authorization: Bearer <JWT>
```

---

## 3. Understand aspects of data storage, service status, and session handling

### Data storage

Services usually manage **their own data**:

* SQL (PostgreSQL, MySQL)
* NoSQL (MongoDB)
* Blob storage (files)

Key ideas:

* Data ownership per service
* Avoid shared databases across services

---

### Service status (stateless vs stateful)

#### Stateless services (preferred)

* No session data stored in memory
* Every request is independent
* Scales easily

Example:

* JWT token contains user info
* Service does not remember users

#### Stateful services

* Session stored in memory or local disk
* Harder to scale

---

### Session handling

Common approaches:

* **JWT tokens** (stateless)
* **Redis** for shared session storage
* Avoid in-memory sessions in containers

---

## 4. Understand the properties of cloud-native applications

### What “cloud-native” means

Applications designed **specifically for the cloud**, not just moved there.

### Key properties

* **Stateless**
* **Scalable horizontally**
* **Resilient** (handle failures)
* **Observable**

  * Logging
  * Metrics
  * Tracing
* **Automated deployment**

### Example

* Multiple instances behind a load balancer
* If one container dies, another replaces it automatically
* Logs sent to Azure Application Insights

---

## 5. Design software to be run in containers

### What it means

Designing software that runs well inside **Docker containers**.

### Key principles

* One process per container
* No reliance on local filesystem
* Configuration via environment variables
* Fast startup and shutdown

### Example

Good container design:

```bash
DATABASE_URL=...
PORT=3000
```

Bad container design:

* Writing files locally
* Hardcoded IP addresses
* Expecting persistent local storage

---

## 6. Design software to be deployed to cloud services

### What it means

Designing applications for platforms like:

* Azure App Service
* Kubernetes (AKS)
* AWS ECS / EKS

### Important considerations

* Load balancing
* Autoscaling
* Managed services (DB, cache, storage)
* Infrastructure as Code (Terraform)

### Example

Instead of running PostgreSQL yourself:

* Use **Azure PostgreSQL**
* Application just connects to it

---

## 7. Awareness of risks in migration and integration of monolithic legacy software

### What is a monolith?

A single large application:

* One codebase
* One database
* Tight coupling

### Risks when migrating

* Hidden dependencies
* Shared database tables
* Performance regressions
* Data consistency issues
* Long downtime

### Typical strategy

* **Strangler pattern**

  * Gradually replace parts with services
* Keep old and new systems running together
* Migrate feature by feature

---

## 8. Awareness of database schema updates and database migrations

### What it means

Databases change over time:

* New tables
* New columns
* Index changes

### Why it’s risky

* Breaking existing code
* Data loss
* Downtime

### Best practices

* Versioned migrations
* Backward-compatible changes
* Use migration tools:

  * Flyway
  * Liquibase
  * TypeORM migrations

### Example

1. Add nullable column
2. Deploy application
3. Populate data
4. Make column mandatory later

---

## 9. Understand the concept of agile software development

### What Agile is

A way of working that focuses on:

* Small iterations
* Continuous feedback
* Adaptability

### Core ideas

* Short cycles (sprints)
* Deliver working software frequently
* Collaboration with stakeholders
* Respond to change over following a fixed plan

### Common frameworks

* Scrum
* Kanban

### Example

* 2-week sprint
* Plan → Develop → Test → Review → Improve

---

## 10. Understand the concept of DevOps and its implications

### What DevOps is

DevOps combines:

* **Development**
* **Operations**

The goal:

> Build, test, deploy, and run software **continuously and reliably**

---

### Key DevOps practices

* CI/CD pipelines
* Infrastructure as Code
* Monitoring & alerting
* Automated testing
* Shared responsibility

### Impact on developers

* You own your code in production
* You care about:

  * Performance
  * Logging
  * Errors
* “You build it, you run it”

### Example

* Push code → CI builds Docker image → tests → deploys to Azure
* Alerts if something breaks

---

## Big Picture Summary

All these points together mean:

> Designing **modern, scalable, reliable, cloud-ready software** that can evolve safely over time and be operated efficiently.

If you want, I can:

* Map these concepts to **real Azure architecture**
* Show a **monolith → microservices migration example**
* Explain them from a **junior / interview perspective**
* Provide **diagrams or checklists**

Just tell me how deep you want to go 👍
