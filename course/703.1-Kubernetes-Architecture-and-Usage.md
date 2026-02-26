# 1. Understand the major components and services in a Kubernetes cluster

Think of Kubernetes as **two big parts**:

## A) Control Plane (the “brain”)

### 1. `kube-apiserver`

* **Front door** to the cluster
* All requests (kubectl, controllers, nodes) go through it
* Exposes the Kubernetes API (REST)

📌 Example:

```bash
kubectl get pods
```

→ kubectl → API Server → etcd / scheduler

---

### 2. `etcd`

* Distributed **key-value database**
* Stores **entire cluster state**

  * Pods, Deployments, Secrets, ConfigMaps, etc.

⚠️ If etcd is lost → cluster state is lost

---

### 3. `kube-scheduler`

* Decides **which node** runs a Pod
* Considers:

  * CPU / memory
  * Node affinity
  * Taints & tolerations

📌 It **does NOT run containers**, it only assigns Pods to nodes.

---

### 4. `kube-controller-manager`

Runs multiple **controllers**, such as:

* Deployment controller
* ReplicaSet controller
* Node controller

📌 Controllers **watch desired state vs actual state** and fix differences.

Example:

```yaml
replicas: 3
```

If 1 pod dies → controller creates a new one.

---

## B) Node components (the “workers”)

### 5. `kubelet`

* Runs on every node
* Talks to API server
* Ensures Pods are running as expected

---

### 6. Container Runtime

* Actually runs containers
* Examples:

  * containerd (most common)
  * CRI-O

---

### 7. `kube-proxy`

* Manages **network rules**
* Enables **Services** (ClusterIP, NodePort, LoadBalancer)

---

## Kubernetes Services (not system services)

| Service      | Purpose             |
| ------------ | ------------------- |
| ClusterIP    | Internal access     |
| NodePort     | Exposes via node IP |
| LoadBalancer | Cloud load balancer |
| ExternalName | DNS alias           |

---

# 2. Configure `kubectl` to use an existing Kubernetes cluster

`kubectl` uses a **kubeconfig file**.

### Default location

```bash
~/.kube/config
```

### Typical configuration methods

#### A) Managed clusters (EKS, AKS, GKE)

AKS example:

```bash
az aks get-credentials --resource-group rg --name cluster
```

EKS example:

```bash
aws eks update-kubeconfig --name cluster
```

---

#### B) Manual kubeconfig

```yaml
clusters:
- name: my-cluster
  cluster:
    server: https://1.2.3.4:6443
    certificate-authority-data: ...
```

---

### Check connection

```bash
kubectl cluster-info
kubectl get nodes
```

---

### Switch clusters / contexts

```bash
kubectl config get-contexts
kubectl config use-context my-context
```

---

# 3. Use `kubectl` to get information about Kubernetes resources

### Basic read commands

```bash
kubectl get pods
kubectl get svc
kubectl get nodes
kubectl get deployments
```

All namespaces:

```bash
kubectl get pods -A
```

Specific namespace:

```bash
kubectl get pods -n kube-system
```

---

### Output formats

```bash
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods -o json
```

---

### Describe resources (very important)

```bash
kubectl describe pod mypod
kubectl describe node node1
```

Shows:

* Events
* Errors
* Scheduling issues

---

### Logs & exec

```bash
kubectl logs mypod
kubectl logs mypod -c container1
kubectl exec -it mypod -- /bin/sh
```

---

# 4. Use `kubectl` to create, modify, and delete resources

## Create resources

From YAML:

```bash
kubectl apply -f deployment.yaml
```

Imperative:

```bash
kubectl create deployment nginx --image=nginx
```

---

## Modify resources

### Edit live

```bash
kubectl edit deployment nginx
```

### Patch

```bash
kubectl patch deployment nginx \
  -p '{"spec":{"replicas":5}}'
```

### Scale

```bash
kubectl scale deployment nginx --replicas=3
```

---

## Delete resources

```bash
kubectl delete pod mypod
kubectl delete deployment nginx
kubectl delete -f deployment.yaml
```

Delete namespace:

```bash
kubectl delete ns dev
```

---

## Declarative vs Imperative

| Style                     | Command                         |
| ------------------------- | ------------------------------- |
| Declarative (recommended) | `kubectl apply`                 |
| Imperative                | `kubectl create`, `kubectl run` |

---

# 5. Awareness of Kubernetes Operators

### What is an Operator?

An **Operator** is a **custom controller** that manages **complex applications** in Kubernetes.

> “Operator = Human operator knowledge encoded in software”

---

### Why Operators exist

Some apps need more than:

* `Deployment`
* `Service`

Examples:

* Databases
* Message brokers
* Elasticsearch
* Kafka

---

### How Operators work

1. Define a **Custom Resource (CRD)**
2. Watch that resource
3. Reconcile desired vs actual state

Example CR:

```yaml
apiVersion: postgresql.example.com/v1
kind: PostgreSQL
spec:
  replicas: 3
  version: "15"
```

Operator actions:

* Create StatefulSets
* Handle backups
* Perform upgrades
* Recover failures

---

### Popular Operators

* Prometheus Operator
* Strimzi (Kafka)
* PostgreSQL Operator
* Elastic Operator
* ArgoCD Operator

---

### Operator vs Helm

| Helm              | Operator              |
| ----------------- | --------------------- |
| Install-time only | Continuous management |
| No logic          | Custom logic          |
| Static templates  | Smart reconciliation  |

---

# Mental model (interview-ready)

* **Control plane** decides *what should happen*
* **Nodes** make it *actually happen*
* **kubectl** is your CLI to the API server
* **YAML** defines desired state
* **Operators** automate complex apps

---

# Common interview traps ⚠️

* Scheduler does **not** start containers
* EXPOSE ≠ publish port
* `kubectl apply` ≠ `kubectl create`
* Operators ≠ Helm charts
