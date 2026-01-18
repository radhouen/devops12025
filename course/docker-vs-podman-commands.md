Here’s a **practical, side-by-side comparison of Docker vs Podman commands**.
Podman intentionally mirrors Docker’s CLI, so most commands are **1:1 compatible**.

---

## 🧱 Basic Container Management

| Action                  | Docker                        | Podman                        |
| ----------------------- | ----------------------------- | ----------------------------- |
| Run a container         | `docker run nginx`            | `podman run nginx`            |
| Run in background       | `docker run -d nginx`         | `podman run -d nginx`         |
| Name a container        | `docker run --name web nginx` | `podman run --name web nginx` |
| List running containers | `docker ps`                   | `podman ps`                   |
| List all containers     | `docker ps -a`                | `podman ps -a`                |
| Stop container          | `docker stop web`             | `podman stop web`             |
| Start container         | `docker start web`            | `podman start web`            |
| Remove container        | `docker rm web`               | `podman rm web`               |
| Exec into container     | `docker exec -it web sh`      | `podman exec -it web sh`      |
| View logs               | `docker logs web`             | `podman logs web`             |

---

## 📦 Image Management

| Action        | Docker                  | Podman                  |
| ------------- | ----------------------- | ----------------------- |
| List images   | `docker images`         | `podman images`         |
| Pull image    | `docker pull nginx`     | `podman pull nginx`     |
| Build image   | `docker build -t app .` | `podman build -t app .` |
| Remove image  | `docker rmi app`        | `podman rmi app`        |
| Tag image     | `docker tag app v1`     | `podman tag app v1`     |
| Push image    | `docker push app`       | `podman push app`       |
| Image history | `docker history app`    | `podman history app`    |

📌 **Note:** Podman prefers `Containerfile`, but `Dockerfile` works unchanged.

---

## 🌐 Networking

| Action           | Docker                            | Podman                            |
| ---------------- | --------------------------------- | --------------------------------- |
| List networks    | `docker network ls`               | `podman network ls`               |
| Create network   | `docker network create net1`      | `podman network create net1`      |
| Inspect network  | `docker network inspect net1`     | `podman network inspect net1`     |
| Remove network   | `docker network rm net1`          | `podman network rm net1`          |
| Run with network | `docker run --network net1 nginx` | `podman run --network net1 nginx` |

📌 Podman uses **CNI** under the hood instead of Docker’s bridge driver.

---

## 💾 Volumes & Storage

| Action         | Docker                       | Podman                       |
| -------------- | ---------------------------- | ---------------------------- |
| List volumes   | `docker volume ls`           | `podman volume ls`           |
| Create volume  | `docker volume create data`  | `podman volume create data`  |
| Inspect volume | `docker volume inspect data` | `podman volume inspect data` |
| Remove volume  | `docker volume rm data`      | `podman volume rm data`      |
| Use volume     | `-v data:/app`               | `-v data:/app`               |

📌 Rootless Podman volumes live in the **user’s home directory**.

---

## 🧹 Cleanup

| Action                    | Docker                   | Podman                   |
| ------------------------- | ------------------------ | ------------------------ |
| Remove stopped containers | `docker container prune` | `podman container prune` |
| Remove unused images      | `docker image prune`     | `podman image prune`     |
| Remove unused volumes     | `docker volume prune`    | `podman volume prune`    |
| System cleanup            | `docker system prune`    | `podman system prune`    |

---

## 🔐 Rootless & Daemon Differences

| Feature             | Docker         | Podman      |
| ------------------- | -------------- | ----------- |
| Requires daemon     | ✅ Yes          | ❌ No        |
| Rootless by default | ❌              | ✅           |
| Uses systemd        | ❌              | ✅           |
| SELinux support     | Limited        | Native      |
| Security model      | Central daemon | Per-process |

---

## 📄 Kubernetes Integration (Podman Advantage)

| Action            | Docker | Podman                      |
| ----------------- | ------ | --------------------------- |
| Generate K8s YAML | ❌      | `podman generate kube ctr`  |
| Run K8s YAML      | ❌      | `podman play kube pod.yaml` |

---

## 🔄 Docker → Podman Migration Trick

You can **replace Docker transparently**:

```bash
alias docker=podman
```

Or install:

```bash
sudo dnf install podman-docker
```

This creates a `docker` wrapper pointing to Podman.

---

## 🧠 Summary

* **90% of commands are identical**
* Podman is **drop-in compatible**
* Podman adds **rootless security & Kubernetes friendliness**
* Docker still dominates **CI/CD and tooling ecosystems**
