## 1. REST & JSON

### REST (Representational State Transfer)

REST is a **style for designing web APIs**.

Key ideas:

* Uses **HTTP** methods:

  * `GET` → read data
  * `POST` → create
  * `PUT/PATCH` → update
  * `DELETE` → remove
* Resources are identified by URLs:

  * `/users`
  * `/orders/123`
* Stateless: every request contains all needed information

Example:

```
GET /api/users/42
```

### JSON (JavaScript Object Notation)

JSON is a **data format**, not an architecture.

Example response:

```json
{
  "id": 42,
  "name": "Alice",
  "email": "alice@example.com"
}
```

👉 **REST defines how APIs behave**, **JSON defines how data is exchanged**.

---

## 2. Service-Oriented Architecture (SOA)

SOA is an architectural style where a system is built from **independent services**.

Characteristics:

* Services represent **business capabilities**
* Services communicate over a network (often HTTP or messaging)
* Often share infrastructure like:

  * ESB (Enterprise Service Bus)
  * Central authentication
* Common in **large enterprises**

Example services:

* User Service
* Billing Service
* Inventory Service

⚠️ Traditional SOA often became:

* Heavy
* Centralized
* Slow to change

---

## 3. Microservices

Microservices are an **evolution of SOA**, with stricter rules.

Key principles:

* Each service is **small and focused**
* Owns its **own database**
* Independently deployable
* Communicates via lightweight protocols (HTTP/REST, gRPC, events)

Example:

* Auth Service
* Order Service
* Payment Service

Benefits:

* Scale individual services
* Faster deployments
* Teams can work independently

Trade-offs:

* More operational complexity
* Needs good DevOps and monitoring

👉 **SOA = services**
👉 **Microservices = small, autonomous services**

---

## 4. Immutable Servers

An immutable server **never changes after it’s deployed**.

Instead of:

* SSH into a server
* Install updates
* Change config

You:

* Build a new server image (VM or container)
* Deploy it
* Destroy the old one

Common with:

* Docker containers
* Kubernetes
* Cloud infrastructure (Azure, AWS)

Benefits:

* Consistent environments
* Easy rollbacks
* Fewer “works on my machine” bugs

---

## 5. Loose Coupling

Loose coupling means **components know as little about each other as possible**.

Tightly coupled ❌:

* Services share databases
* Hardcoded service URLs
* One change breaks everything

Loosely coupled ✅:

* Communicate via well-defined APIs
* Use events/messages when possible
* No shared state

Example:

* Order Service emits `OrderCreated`
* Email Service listens and sends email
* Order Service doesn’t know Email Service exists

Benefits:

* Easier changes
* Better scalability
* More resilient systems

---

## 6. Test-Driven Development (TDD)

TDD is a **development process**, not a testing tool.

Cycle:

1. **Write a failing test**
2. **Write minimal code to pass**
3. **Refactor**

Example:

* Write a test for `calculateTotal()`
* Implement the function
* Improve code structure

Benefits:

* Better design
* Fewer bugs
* Safe refactoring

In microservices, TDD often includes:

* Unit tests
* Integration tests
* Contract tests (API expectations)

---

## How These Concepts Fit Together

In a modern backend system (like NestJS + Angular or Go services):

* APIs are **RESTful** and exchange **JSON**
* System is built with **microservices**
* Services are **loosely coupled**
* Deployed using **immutable servers** (containers)
* Developed using **TDD**

Together, they enable:

* Scalability
* Reliability
* Fast development

