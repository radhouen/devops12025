### **1️⃣ Understanding the use of YAML files to declare Kubernetes resources**

Kubernetes resources (like Pods, Deployments, Services, etc.) are defined using **YAML files**. YAML is a human-readable format that Kubernetes uses to know what you want to create.

**Example: A simple Pod YAML**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-first-pod
  labels:
    app: my-app
spec:
  containers:
    - name: my-container
      image: nginx:latest
      ports:
        - containerPort: 80
```

* `apiVersion`: version of Kubernetes API used.
* `kind`: type of resource (Pod, Deployment, Service…).
* `metadata`: name, labels, annotations.
* `spec`: specification of the resource (containers, images, ports…).

💡 **Key idea:** YAML files are declarative — you tell Kubernetes **what you want**, not **how to do it**.

---

### **2️⃣ Understanding the principle of a Pod**

A **Pod** is the **smallest deployable unit in Kubernetes**. It can contain **one or more containers** that share:

* Network (IP address and port space)
* Storage volumes
* Specification for how to run containers

**Example:** A Pod with two containers sharing a volume:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
    - name: app-container
      image: nginx
    - name: sidecar-container
      image: busybox
      command: ["sh", "-c", "echo Hello from sidecar"]
```

💡 **Key idea:** Pods are ephemeral — they can be created and destroyed. That’s why we often use **Deployments** for durability.

---

### **3️⃣ Understanding how to use Deployments (scaling & rolling updates)**

A **Deployment** manages Pods for you. It can:

* Ensure a specific number of Pods are running (**replicas**)
* Roll out updates **without downtime** (**rolling updates**)
* Automatically replace crashed Pods

**Example: Deployment YAML**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.24
          ports:
            - containerPort: 80
```

* **Scaling:** `replicas: 3` → Kubernetes ensures 3 Pods always run. You can scale:

```bash
kubectl scale deployment nginx-deployment --replicas=5
```

* **Rolling update:** change `image: nginx:1.25` → Kubernetes gradually updates Pods without downtime.

---

### **4️⃣ Understanding how to make services accessible using Services and Ingress**

Pods have ephemeral IPs. To expose them, Kubernetes uses **Services** and **Ingress**:

#### **Service**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80       # exposed port
      targetPort: 80 # container port
  type: LoadBalancer # Exposes service externally
```

* `ClusterIP`: accessible only inside cluster (default)
* `NodePort`: accessible on each node’s IP
* `LoadBalancer`: uses cloud LB (e.g., Azure, AWS)

#### **Ingress**

Ingress manages external HTTP/S access with routing rules:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nginx-ingress
spec:
  rules:
    - host: myapp.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nginx-service
                port:
                  number: 80
```

💡 **Key idea:** Services expose Pods; Ingress manages HTTP/S traffic, routes multiple apps.

---

### **5️⃣ Understanding how to use storage using PersistentVolumeClaims (PVC)**

Pods are ephemeral — their storage disappears if they die. **PersistentVolumeClaims (PVCs)** allow Pods to use **persistent storage**.

**Example: PVC & Pod using it**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-storage
spec:
  containers:
    - name: app
      image: nginx
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: storage
  volumes:
    - name: storage
      persistentVolumeClaim:
        claimName: my-pvc
```

💡 **Key idea:** PVC abstracts the storage, letting Pods remain stateless while data persists.

---

### **6️⃣ Awareness of other Kubernetes orchestration resources**

Kubernetes has more specialized resources:

| Resource        | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| **DaemonSet**   | Ensures a Pod runs on **every node** (good for logging/monitoring) |
| **StatefulSet** | Manages Pods with **persistent identity** (databases like MySQL)   |
| **Job**         | Runs a Pod **to completion** (batch jobs)                          |
| **CronJob**     | Runs a Job **on a schedule** (like cron in Linux)                  |

**Examples:**

**DaemonSet**

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-logger
spec:
  selector:
    matchLabels:
      app: logger
  template:
    metadata:
      labels:
        app: logger
    spec:
      containers:
        - name: logger
          image: busybox
          command: ["sh", "-c", "echo Logging node info; sleep 3600"]
```

**CronJob**

```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello-cron
spec:
  schedule: "*/1 * * * *"  # every minute
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: hello
              image: busybox
              command: ["echo", "Hello from CronJob"]
          restartPolicy: OnFailure
```

---

✅ **Summary**:

* YAML files = declarative configuration
* Pod = smallest unit
* Deployment = manage Pods, scaling & rolling updates
* Service/Ingress = expose Pods
* PVC = persistent storage
* DaemonSet, StatefulSet, Job, CronJob = specialized orchestration tools
