## 1. Create Dockerfiles and build images from Dockerfiles

### What is a Dockerfile?

A **Dockerfile** is a plain-text file that contains **instructions to build a container image**.

Example:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Key Dockerfile instructions

| Instruction          | Purpose                       |
| -------------------- | ----------------------------- |
| `FROM`               | Base image (mandatory)        |
| `RUN`                | Execute commands during build |
| `COPY` / `ADD`       | Copy files into the image     |
| `WORKDIR`            | Set working directory         |
| `ENV`                | Environment variables         |
| `EXPOSE`             | Document port                 |
| `CMD` / `ENTRYPOINT` | Default container command     |

### Building an image

```bash
docker build -t myapp:1.0 .
```

* `-t` → tag (name + version)
* `.` → build context (current directory)

**Best practices**

* Use **small base images** (`alpine`, `distroless`)
* Use **multi-stage builds**
* Minimize layers
* Avoid secrets in Dockerfiles

---

## 2. Understand OCI image names

OCI = **Open Container Initiative** (open standard for container images)

### Image name structure

```
[registry]/[namespace]/[image]:[tag]
```

Example:

```
docker.io/library/nginx:1.25
```

Breakdown:

| Part        | Meaning                       |
| ----------- | ----------------------------- |
| `docker.io` | Registry                      |
| `library`   | Namespace (organization/user) |
| `nginx`     | Image name                    |
| `1.25`      | Tag (version)                 |

### Common defaults

* Registry omitted → `docker.io`
* Namespace omitted → `library`
* Tag omitted → `latest` (not recommended in prod)

Example:

```bash
docker pull nginx
```

Is actually:

```bash
docker pull docker.io/library/nginx:latest
```

### Digest (immutable reference)

```bash
nginx@sha256:abc123...
```

* Safer than tags
* Guarantees exact image

---

## 3. Upload images to a Docker registry

A **registry** stores and distributes container images.

### Common registries

* Docker Hub
* Azure Container Registry (ACR)
* AWS ECR
* GitHub Container Registry
* Google Artifact Registry

### Steps to push an image

```bash
docker login
docker tag myapp:1.0 myregistry/myapp:1.0
docker push myregistry/myapp:1.0
```

Example (Azure ACR):

```bash
docker tag myapp acrname.azurecr.io/myapp:1.0
docker push acrname.azurecr.io/myapp:1.0
```

### Private vs public registries

* **Public** → open access
* **Private** → authentication required

---

## 4. Understand the principles of image scanners

### What is image scanning?

Image scanners analyze container images for:

* Known vulnerabilities (CVEs)
* Outdated libraries
* Misconfigurations
* Embedded secrets

### How scanners work

1. Read image layers
2. Detect OS & packages
3. Compare versions against CVE databases
4. Produce a severity report

### Popular scanners

* Trivy
* Grype
* Clair
* Docker Scout
* Azure Defender for Containers

### Example (Trivy)

```bash
trivy image nginx:1.25
```

### Why it matters

* Containers ship **entire OS stacks**
* One vulnerable package → exploitable container
* Required for compliance (DevSecOps)

---

## 5. Understand security risks of container virtualization and container images and how to mitigate them

### Key security risks

#### 1. Running as root

* Containers often run as root by default
* If compromised → higher impact

**Mitigation**

```dockerfile
RUN adduser -D appuser
USER appuser
```

---

#### 2. Vulnerable base images

* Old images = unpatched CVEs

**Mitigation**

* Use minimal images
* Scan images
* Regular rebuilds

---

#### 3. Image poisoning

* Pulling images from untrusted sources

**Mitigation**

* Use trusted registries
* Image signing (Cosign, Notary)
* Use digests instead of tags

---

#### 4. Secrets inside images

* Hardcoded passwords, API keys

**Mitigation**

* Use environment variables
* Use secret managers (K8s Secrets, Vault)

---

#### 5. Container escape

* Kernel-level vulnerabilities allow breaking out

**Mitigation**

* Keep host OS patched
* Use seccomp, AppArmor, SELinux
* Avoid `--privileged`

---

## 6. Awareness: Docker buildx, Docker BuildKit, Podman build and Buildah

### Docker BuildKit

**Next-gen build engine** for Docker

Benefits:

* Faster builds
* Better caching
* Parallel execution
* Secret mounting

Enable:

```bash
export DOCKER_BUILDKIT=1
```

---

### Docker buildx

Extended build command using BuildKit

Key features:

* Multi-platform builds (amd64, arm64)
* Remote builders
* Better cache control

Example:

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t myapp:1.0 .
```

Used heavily in **CI/CD pipelines**.

---

### Podman build

* Docker-compatible but **daemonless**
* Rootless by default
* Better security model

```bash
podman build -t myapp .
```

Used often in:

* RHEL / Fedora
* Secure environments

---

### Buildah

* Low-level image building tool
* Scriptable
* No Dockerfile required

```bash
buildah from alpine
buildah run alpine-container apk add curl
```

Used for:

* Advanced pipelines
* Custom image creation logic

---

## Quick mental map (exam/interview-friendly)

* **Dockerfile** → how images are built
* **OCI image names** → how images are identified
* **Registries** → where images live
* **Scanners** → find vulnerabilities
* **Security risks** → least privilege, trusted images, scanning
* **Build tools** → faster, safer, multi-platform builds

