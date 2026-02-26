# **1. Kubernetes Core Components**

These are the main “brains” of Kubernetes.

---

### **A) API Server (`kube-apiserver`)**

* **Role:** Front door to Kubernetes. All commands, UI tools, controllers, and nodes communicate through it.
* **Analogy:** Receptionist / API gateway.
* **Example:** When you run `kubectl get pods`, kubectl talks to the API server.

```text
kubectl get pods
# kubectl → kube-apiserver → etcd (for cluster state)
```

---

### **B) etcd**

* **Role:** Distributed key-value store for **all cluster state** (Pods, Deployments, ConfigMaps, Secrets).
* **Analogy:** Cluster “database” / filing cabinet.
* Losing etcd = losing the cluster state.

---

### **C) Controller Manager (`kube-controller-manager`)**

* **Role:** Maintains the **desired state** of the cluster.
* Runs controllers like:

  * Deployment controller
  * ReplicaSet controller
  * Node controller
* **Analogy:** Maintenance crew that fixes problems automatically.

**Example:**
If a Pod in a Deployment crashes, the controller creates a replacement Pod.

---

### **D) Scheduler (`kube-scheduler`)**

* **Role:** Assigns Pods to Nodes based on:

  * Resource requests (CPU/memory)
  * Affinity/anti-affinity rules
  * Taints and tolerations
* **Analogy:** HR assigning employees to offices.

---

# **2. `~/.kube/config`**

* **Role:** kubectl configuration file. Contains:

  * Cluster info
  * User credentials
  * Contexts
* **Location:** `~/.kube/config` (default)
* **Example:** Switch between clusters:

```bash
kubectl config get-contexts
kubectl config use-context my-cluster
```

---

# **3. `kubectl` Commands**

Let’s go **category by category**, with examples.

---

### **A) Get resources**

```bash
kubectl get nodes
kubectl get pods
kubectl get svc
kubectl get deployments -n kube-system
kubectl get pods -o wide
kubectl get pods -A   # all namespaces
```

* Shows **summary info** about resources.
* Good for quick cluster overview.

---

### **B) Describe resources**

```bash
kubectl describe pod nginx-xxxx
kubectl describe node node1
kubectl describe svc myservice
```

* Shows **detailed info** + events
* Useful for debugging scheduling issues, failures, or network problems.

---

### **C) Create / Apply resources**

**Imperative (`create`)**:

```bash
kubectl create deployment nginx --image=nginx
kubectl create service clusterip nginx --tcp=80:80
```

**Declarative (`apply`)**:

```bash
kubectl apply -f deployment.yaml
```

* `apply` is preferred in **production / GitOps workflows**
* Keeps resources **declaratively managed**

---

### **D) Run a pod or deployment**

```bash
kubectl run myapp --image=nginx --port=80
```

* Quick way to create a Pod or Deployment
* Useful for testing or ad-hoc containers

---

### **E) Expose a resource as a service**

```bash
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get svc
```

* Creates a Service to make your Pods accessible

---

### **F) Scale deployments**

```bash
kubectl scale deployment nginx --replicas=3
kubectl get pods
```

* Adjust the number of Pods dynamically

---

### **G) Update resources (`set`)**

```bash
# Change image of a deployment
kubectl set image deployment/nginx nginx=nginx:1.25
```

* Useful for rolling updates

---

### **H) Edit resources live**

```bash
kubectl edit deployment nginx
```

* Opens the resource in your default editor
* Changes are **applied immediately**

---

### **I) Explain resources**

```bash
kubectl explain pod
kubectl explain pod.spec.containers
```

* Shows documentation for fields in YAML
* Great for learning object structure

---

### **J) Manage kubectl config**

```bash
kubectl config view
kubectl config get-contexts
kubectl config use-context my-cluster
```

* Switch clusters
* Inspect current kubeconfig

---

### **K) Inspect logs**

```bash
kubectl logs nginx-xxxx
kubectl logs nginx-xxxx -c container1
```

* View stdout of containers
* Debug runtime issues

---

### **L) Exec into containers**

```bash
kubectl exec -it nginx-xxxx -- /bin/sh
kubectl exec -it nginx-xxxx -- bash
```

* Run commands inside the container
* Great for troubleshooting inside the Pod

---

# **4. Quick Example Workflow**

1. Create a deployment:

```bash
kubectl create deployment nginx --image=nginx
```

2. Expose it:

```bash
kubectl expose deployment nginx --port=80 --type=NodePort
```

3. Check status:

```bash
kubectl get pods
kubectl describe pod nginx-xxxx
```

4. Update image:

```bash
kubectl set image deployment/nginx nginx=nginx:1.25
```

5. Scale deployment:

```bash
kubectl scale deployment nginx --replicas=3
```

6. Check logs and exec:

```bash
kubectl logs nginx-xxxx
kubectl exec -it nginx-xxxx -- /bin/sh
```

---

# **5. Mental Models**

* **API Server** → Front door / receptionist
* **etcd** → Cluster’s database / filing cabinet
* **Controller Manager** → Maintenance staff, keeps things as desired
* **Scheduler** → HR assigning Pods to Nodes
* **kubectl get / describe** → Inspect cluster
* **kubectl create / apply / run / expose / scale / set / edit** → Change cluster state
* **kubectl logs / exec** → Debug container runtime
