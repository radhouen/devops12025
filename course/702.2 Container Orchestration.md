## 1️⃣ Understand the application model of Docker Compose and Podman Compose

### What “application model” means

Docker Compose (and Podman Compose) model an **application as a set of cooperating containers**, not as individual containers.

An application typically consists of:

* Multiple services (e.g. API, database, frontend)
* Networks to allow services to talk to each other
* Volumes to persist data

All of this is described **declaratively** in a single file:
📄 `docker-compose.yml`

### Example mental model

Instead of thinking:

> “Run a container for PostgreSQL, then one for my API, then connect them…”

Compose thinks:

> “This application consists of a database service and an API service that run together.”

### Docker Compose vs Podman Compose

| Aspect           | Docker Compose            | Podman Compose      |
| ---------------- | ------------------------- | ------------------- |
| Container engine | Docker                    | Podman (daemonless) |
| Compose file     | Same `docker-compose.yml` | Same format         |
| CLI              | `docker compose`          | `podman-compose`    |
| Rootless support | Limited                   | Native              |

👉 **Key point:**
**The Compose file is portable** — both tools use the same application model.

---

## 2️⃣ Create and run Docker Compose files (version 3 or later)

### Compose file version

Version **3+** is the modern standard and commonly used in:

* Docker Compose
* Docker Swarm
* Podman Compose

```yaml
version: "3.9"
services:
  app:
    image: nginx:latest
```

### Running a Compose application

```bash
docker compose up
```

Or in detached mode:

```bash
docker compose up -d
```

With Podman:

```bash
podman-compose up -d
```

### What happens when you run `up`

* Networks are created
* Volumes are created
* Containers are started **in dependency order**
* Services can resolve each other by **service name (DNS)**

---

## 3️⃣ Define services, networks, and volumes (with common properties)

### 🔹 Services

A **service** defines how a container runs.

Common service properties:

```yaml
services:
  api:
    image: my-api:1.0
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
    depends_on:
      - db
    restart: always
```

Key properties to know:

| Property      | Purpose               |
| ------------- | --------------------- |
| `image`       | Container image       |
| `build`       | Build from Dockerfile |
| `ports`       | Port mapping          |
| `environment` | Environment variables |
| `depends_on`  | Startup order         |
| `volumes`     | Attach storage        |
| `restart`     | Restart policy        |

---

### 🔹 Networks

Networks allow services to communicate.

```yaml
networks:
  backend:
    driver: bridge
```

Attach services to networks:

```yaml
services:
  api:
    networks:
      - backend
  db:
    networks:
      - backend
```

✔ Services on the same network can reach each other via:

```
http://service-name:port
```

Example:

```
db:5432
```

---

### 🔹 Volumes

Volumes persist data outside the container lifecycle.

```yaml
volumes:
  db-data:
```

Attach volume to a service:

```yaml
services:
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
```

✔ Container can be deleted and recreated
✔ Data stays intact

---

### Full example (API + DB)

```yaml
version: "3.9"

services:
  api:
    image: my-api:1.0
    ports:
      - "8080:8080"
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

## 4️⃣ Use Docker Compose to update running containers to newer images

This is a **very important real-world skill**.

### Step 1: Update the image tag

```yaml
services:
  api:
    image: my-api:2.0
```

### Step 2: Pull the new image

```bash
docker compose pull
```

### Step 3: Recreate containers

```bash
docker compose up -d
```

✔ Compose will:

* Stop the old container
* Create a new one with the new image
* Reuse networks and volumes

### Alternative (force recreation)

```bash
docker compose up -d --force-recreate
```

### What does **not** change

* Volumes
* Networks
* Other services not affected

---

## 🧠 Summary (Exam / Interview Ready)

You should be able to explain that:

* Docker Compose models an application as **multiple related services**
* A single YAML file defines:

  * Services (containers)
  * Networks (communication)
  * Volumes (persistent data)
* Compose v3+ is the standard format
* Services communicate using **service names**
* Updating containers means:

  1. Change image tag
  2. Pull image
  3. Recreate containers with `compose up`

