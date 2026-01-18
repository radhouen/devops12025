---

## 1. Docker and Podman architecture

### Core idea

Both **Docker** and **Podman** are tools to:

> Build, run, and manage **containers** using OCI standards

They share the same container concepts but differ in architecture.

---

### Docker architecture (client–server)

```
+-------------------+
|   Docker Client   |
|   (docker CLI)    |
+---------+---------+
          |
          v
+-------------------+
|   Docker Daemon   |  ← runs as root
|   (dockerd)      |
+---------+---------+
          |
          v
+-------------------+
| Containers &      |
| Images            |
+-------------------+
```

* `dockerd` runs **in the background**
* Requires **root privileges**
* Client talks to the daemon via REST API
* Centralized control

---

### Podman architecture (daemonless)

```
+-------------------+
| Podman CLI        |
+---------+---------+
          |
          v
+-------------------+
| OCI Runtime       | (runc / crun)
+---------+---------+
          |
          v
+-------------------+
| Containers        |
+-------------------+
```

* **No daemon**
* Each container is launched directly
* Designed for **rootless containers**
* Better security model by default

➡️ **Key takeaway**
Docker = daemon-based
Podman = daemonless, more secure by design

---

## 2. Using existing images from an OCI registry

### OCI images

Both Docker and Podman use **OCI-compliant images**.

### Registries

Common registries:

* Docker Hub
* Quay
* GitHub Container Registry
* Azure Container Registry

### Example

```bash
docker pull nginx
podman pull nginx
```

What happens:

1. Image layers are downloaded
2. Cached locally
3. Ready to run

➡️ Images are **read-only templates** for containers

---

## 3. Operating and accessing containers

### Basic container lifecycle

```
Image → Container → Running Process
```

### Common operations

```bash
docker run nginx
docker ps
docker stop nginx
docker rm nginx
```

### Accessing a running container

```bash
docker exec -it mycontainer /bin/sh
```

This:

* Attaches a terminal
* Lets you inspect processes, files, logs

---

## 4. Docker networking concepts

### Default networking (bridge)

```
+-----------------------+
| Host                  |
|                        |
|  docker0 bridge       |
|  +-----------------+  |
|  | Container A     |  |
|  | 172.17.0.2      |  |
|  +-----------------+  |
|  +-----------------+  |
|  | Container B     |  |
|  | 172.17.0.3      |  |
|  +-----------------+  |
+-----------------------+
```

* Containers get private IPs
* NAT used for external access
* Port mapping exposes services

```bash
docker run -p 8080:80 nginx
```

---

### User-defined bridge networks (important)

```
docker network create app-net
```

Containers on the same network:

* Can talk directly
* Get **automatic DNS**

---

## 5. Overlay networks (multi-host networking)

Overlay networks are used when containers run on **multiple hosts** (e.g. Docker Swarm).

```
+-------------+        +-------------+
| Host A      |        | Host B      |
|             |        |             |
| Container A | <----> | Container B |
| (overlay)   |        | (overlay)   |
+-------------+        +-------------+
```

* Virtual network over multiple machines
* Uses VXLAN under the hood
* Enables **service-to-service communication**

➡️ Mostly used in orchestration (Swarm, Kubernetes)

---

## 6. DNS service discovery (key concept)

### Problem

Container IPs change:

* On restart
* On scale up/down

### Solution: DNS-based discovery

```
http://database:5432
```

Instead of:

```
http://172.18.0.4:5432
```

Docker provides:

* Embedded DNS server
* Resolves container names → IPs

---

## 7. Connecting containers and using DNS

### Example

```bash
docker network create backend
```

```bash
docker run -d --name db --network backend postgres
docker run -d --name api --network backend my-api
```

Inside `api` container:

```
db → resolves to the DB container IP
```

No configuration required.

➡️ This is how **microservices talk to each other**

---

## 8. Docker storage concepts

### Problem

Containers are **ephemeral**

* Delete container → data lost

### Storage types

| Type                 | Use case           |
| -------------------- | ------------------ |
| Container filesystem | Temporary          |
| Volumes              | Persistent, shared |
| Bind mounts          | Host-specific      |

---

## 9. Docker volumes (persistent & shared storage)

### Volume mental model

```
+--------------------+
| Docker Volume      |
| (Managed by Docker)|
+----------+---------+
           |
    +------+------+
    | Container A |
    +-------------+
    | Container B |
    +-------------+
```

### Example

```bash
docker volume create db-data
```

```bash
docker run -v db-data:/var/lib/postgresql/data postgres
```

Benefits:

* Survives container deletion
* Can be shared
* Portable

---

## 10. Rootless containers (security concept)

### Traditional containers

* Run as **root**
* Breakout risk if compromised

### Rootless containers

* Run as **normal user**
* No root privileges
* Uses user namespaces

Podman:

* Rootless by default

Docker:

* Supports rootless mode (newer versions)

➡️ Huge security improvement, especially in CI/CD and shared environments

---

## 🧠 Final mental model

```
OCI Image
   ↓
Container Runtime
   ↓
Container (process + FS + network)
   ↓
Network (bridge / overlay + DNS)
   ↓
Storage (volumes)
   ↓
Security (rootless vs root)
```

---

## One-sentence summary

> Docker and Podman run OCI containers using images from registries, connect them through virtual networks with DNS-based service discovery, persist data via volumes, and increasingly favor rootless execution for security.
