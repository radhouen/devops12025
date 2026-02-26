## 🐳 Docker Concepts

### **Docker Container**

A **container** is a **running instance of a Docker image**.

**Key points**

* Lightweight, isolated process (uses Linux namespaces & cgroups)
* Shares the host OS kernel (unlike VMs)
* Ephemeral by default (data is lost unless stored in volumes)

**Lifecycle**

```
Image → Container → Running process
```

**Example**

```bash
docker run -d --name api nginx
```

**Use case**

* Run applications consistently across environments

---

### **Docker Image**

An **image** is an **immutable blueprint** used to create containers.

**Key points**

* Built from a `Dockerfile`
* Layered filesystem (each instruction adds a layer)
* Read-only
* Stored locally or in registries (Docker Hub, ACR, ECR)

**Example**

```bash
docker build -t my-api:1.0 .
```

**Use case**

* Package application + dependencies

---

### **Docker Network**

A **network** enables **container-to-container communication**.

**Types**

| Type    | Description                |
| ------- | -------------------------- |
| bridge  | Default, private network   |
| host    | Uses host network directly |
| none    | No networking              |
| overlay | Multi-host (Swarm/K8s)     |
| macvlan | Container gets LAN IP      |

**Example**

```bash
docker network create backend-net
```

**Use case**

* Secure service-to-service communication

---

### **Docker Volume**

A **volume** is **persistent storage** outside the container filesystem.

**Key points**

* Survives container deletion
* Managed by Docker
* Faster & safer than bind mounts

**Example**

```bash
docker volume create db-data
```

**Use case**

* Databases, uploads, logs

---

## 🦭 Podman Concepts

Podman is **daemonless** and **rootless-first**, but conceptually very similar.

---

### **Podman Container**

A **Podman container** is a **running instance of a Podman image**.

**Key differences from Docker**

* No central daemon
* Can run **rootless**
* Each container is a child process of your shell

**Example**

```bash
podman run -d nginx
```

**Use case**

* Secure container execution (especially on servers)

---

### **Podman Image**

Same concept as Docker images.

**Key points**

* OCI-compliant
* Compatible with Docker registries
* Built with `Dockerfile` or `Containerfile`

**Example**

```bash
podman build -t my-api .
```

**Bonus**

```bash
alias docker=podman
```

---

### **Podman Network**

Handles container networking similarly to Docker but **implemented differently**.

**Key points**

* Uses CNI (Container Network Interface)
* Rootless networking uses `slirp4netns`
* Default bridge created automatically

**Example**

```bash
podman network create backend-net
```

**Use case**

* Microservices communication without root access

---

### **Podman Volume**

Persistent storage for Podman containers.

**Key points**

* Same concept as Docker volumes
* Stored under user’s home directory when rootless
* Supports local, NFS, and plugins

**Example**

```bash
podman volume create db-data
```

---

## 🔍 Docker vs Podman (Quick Comparison)

| Feature                  | Docker  | Podman                     |
| ------------------------ | ------- | -------------------------- |
| Daemon                   | Yes     | ❌ No                       |
| Rootless                 | Limited | ✅ Native                   |
| Docker CLI compatibility | Native  | High                       |
| Kubernetes YAML support  | ❌       | ✅ (`podman generate kube`) |
| Security                 | Good    | **Better (no daemon)**     |

---

## 🧠 Mental Model (Applies to Both)

```
IMAGE → CONTAINER
   |
   ├── Network (communication)
   └── Volume (persistent data)
```

