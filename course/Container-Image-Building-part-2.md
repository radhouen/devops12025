# 1. `docker image *`

This refers to **Docker image management commands**.

### Common `docker image` commands

```bash
docker image ls
```

Lists all local images.

```bash
docker image inspect nginx
```

Shows metadata (layers, env vars, entrypoint, etc.).

```bash
docker image rm myapp:1.0
```

Deletes an image.

```bash
docker image prune
```

Removes unused images.

### Why it matters

* Images are **immutable templates**
* Containers are **runtime instances** of images

---

# 2. `docker login`

Authenticates Docker with a container registry.

```bash
docker login
```

Login to a specific registry:

```bash
docker login myregistry.azurecr.io
```

### What happens

* Credentials stored in `~/.docker/config.json`
* Required before `docker push`

### Example

```bash
docker login
docker push myuser/myapp:1.0
```

---

# 3. `Dockerfile`

A **Dockerfile** defines **how an image is built**.

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Build it:

```bash
docker build -t myapp:1.0 .
```

---

# 4. `Containerfile`

A **Containerfile** is functionally identical to a Dockerfile.

* Used mainly by **Podman / Buildah**
* Docker also supports it

```bash
podman build -f Containerfile -t myapp .
```

### Why it exists

* Vendor-neutral naming
* OCI-friendly

---

# 5. `.dockerignore`

Prevents files from being sent to the build context.

```dockerignore
node_modules
.git
.env
*.log
```

### Why it matters

* Faster builds
* Smaller images
* Prevents secret leaks

---

# 6. `FROM`

Defines the **base image**.

```dockerfile
FROM python:3.12-slim
```

Multi-stage example:

```dockerfile
FROM golang:1.22 AS builder
RUN go build -o app

FROM gcr.io/distroless/base
COPY --from=builder /app /app
CMD ["/app"]
```

### Rules

* Must be first instruction
* Can appear multiple times

---

# 7. `COPY`

Copies files from **host → image**.

```dockerfile
COPY app.py /app/app.py
```

With directory:

```dockerfile
COPY src/ /app/src/
```

### Best practice

* Prefer `COPY` over `ADD`

---

# 8. `ADD`

Similar to COPY, but with **extra features**.

```dockerfile
ADD https://example.com/file.tar.gz /app/
```

Auto-extracts archives:

```dockerfile
ADD app.tar.gz /app/
```

### Why it’s discouraged

* Hidden behavior
* Less predictable

Use **COPY** unless you *need* these features.

---

# 9. `RUN`

Executes commands **during image build**.

```dockerfile
RUN apt-get update && apt-get install -y curl
```

Multiple commands:

```dockerfile
RUN mkdir /app && chmod 755 /app
```

### Creates a new image layer

* Fewer RUNs → smaller image

---

# 10. `VOLUME`

Declares a **mount point**.

```dockerfile
VOLUME /data
```

### What it does

* Data stored outside the container filesystem
* Persists after container deletion

Runtime usage:

```bash
docker run -v mydata:/data myapp
```

---

# 11. `EXPOSE`

Documents which port the container listens on.

```dockerfile
EXPOSE 8080
```

⚠️ **Does NOT publish ports**

Publish port:

```bash
docker run -p 8080:8080 myapp
```

---

# 12. `USER`

Sets the user inside the container.

```dockerfile
USER appuser
```

Create user:

```dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

### Security best practice

* Avoid running as root

---

# 13. `WORKDIR`

Sets the working directory.

```dockerfile
WORKDIR /app
```

Equivalent to:

```bash
cd /app
```

Auto-creates directory if missing.

---

# 14. `ENV`

Defines environment variables.

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

Used in app:

```js
process.env.PORT
```

Overrides at runtime:

```bash
docker run -e PORT=4000 myapp
```

---

# 15. `ARG`

Build-time variables only.

```dockerfile
ARG VERSION=1.0
RUN echo "Version $VERSION"
```

Pass value:

```bash
docker build --build-arg VERSION=2.0 .
```

### Difference from ENV

| ARG                    | ENV                    |
| ---------------------- | ---------------------- |
| Build-time only        | Build + runtime        |
| Not in final container | Available in container |

---

# 16. `CMD`

Default command **if none is provided**.

```dockerfile
CMD ["node", "server.js"]
```

Override:

```bash
docker run myapp node test.js
```

### Only one CMD allowed

Last CMD wins.

---

# 17. `ENTRYPOINT`

Defines the **main executable**.

```dockerfile
ENTRYPOINT ["python", "app.py"]
```

With CMD:

```dockerfile
ENTRYPOINT ["python", "app.py"]
CMD ["--help"]
```

Run:

```bash
docker run myapp --version
```

### CMD vs ENTRYPOINT

| ENTRYPOINT       | CMD               |
| ---------------- | ----------------- |
| Fixed executable | Default arguments |
| Hard to override | Easy to override  |

---

# Complete example Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ARG VERSION=1.0

COPY package*.json ./
RUN npm install --production

COPY . .

RUN adduser -D appuser
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
```

---

# Summary table (quick revision)

| Instruction | Purpose              |
| ----------- | -------------------- |
| FROM        | Base image           |
| COPY        | Copy files           |
| ADD         | Copy + extract       |
| RUN         | Build-time command   |
| VOLUME      | Persistent data      |
| EXPOSE      | Document ports       |
| USER        | Non-root execution   |
| WORKDIR     | Working directory    |
| ENV         | Runtime variables    |
| ARG         | Build-time variables |
| CMD         | Default command      |
| ENTRYPOINT  | Main process         |
