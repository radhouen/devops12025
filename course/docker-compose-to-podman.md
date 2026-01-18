Below is a **clear, practical guide to convert `docker-compose.yml` to Podman**, including **multiple approaches**, **examples**, and **gotchas**. This is the most common pain point when moving from Docker to Podman.

---

# 🐳 docker-compose → 🦭 Podman

Podman **does NOT natively run `docker-compose.yml`**, but there are **3 supported ways** to do it.

---

## ✅ OPTION 1 (Recommended): `podman-compose`

**Best for dev environments**

### Install

```bash
pip install podman-compose
```

(or via package manager on some distros)

### Usage

```bash
podman-compose up -d
podman-compose down
```

### Example

**docker-compose.yml**

```yaml
version: "3.9"
services:
  api:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
```

✅ **Works unchanged** with `podman-compose`

### Pros

✔ Minimal changes
✔ Familiar workflow
✔ Supports most Compose features

### Cons

✘ Slightly slower
✘ Python dependency
✘ Not ideal for production

---

## ✅ OPTION 2: Podman Native Kubernetes YAML (Best for Production)

Podman can **generate and run Kubernetes YAML**, which is **production-grade**.

---

### Step 1: Create containers (once)

```bash
podman run -d --name web nginx
```

### Step 2: Generate K8s YAML

```bash
podman generate kube web > pod.yaml
```

### Step 3: Run it

```bash
podman play kube pod.yaml
```

### Pros

✔ Native Podman
✔ systemd-compatible
✔ Kubernetes-aligned

### Cons

✘ YAML differs from Compose
✘ Learning curve

---

## ✅ OPTION 3: Convert Compose → K8s YAML Automatically

### Tool: `kompose`

```bash
kompose convert -f docker-compose.yml
```

Then:

```bash
podman play kube pod.yaml
```

### Pros

✔ Automatic conversion
✔ Kubernetes-ready

### Cons

✘ Needs cleanup
✘ Complex Compose files may break

---

## 🔄 Example Conversion (Compose → Podman Kube)

### docker-compose.yml

```yaml
services:
  app:
    image: my-api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - data:/app/data

volumes:
  data:
```

---

### pod.yaml (simplified)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
    - name: app
      image: my-api
      ports:
        - containerPort: 3000
      env:
        - name: NODE_ENV
          value: production
      volumeMounts:
        - mountPath: /app/data
          name: data
  volumes:
    - name: data
      persistentVolumeClaim:
        claimName: data-pvc
```

---

## ⚠️ Common Differences & Gotchas

| Compose Feature  | Podman Behavior      |
| ---------------- | -------------------- |
| `depends_on`     | Not enforced         |
| `restart:`       | Use systemd          |
| `container_name` | Optional             |
| `links`          | Deprecated           |
| Root access      | Rootless by default  |
| Networking       | Pod = shared network |

---

## 🛠 systemd (Podman Superpower)

Generate services:

```bash
podman generate systemd --new web > web.service
```

Enable:

```bash
systemctl --user enable web
systemctl --user start web
```

---

## 🧠 Recommended Path

| Scenario      | Recommendation     |
| ------------- | ------------------ |
| Local dev     | `podman-compose`   |
| Server / Prod | `podman play kube` |
| K8s future    | `kompose + podman` |

