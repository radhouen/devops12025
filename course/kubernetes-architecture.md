# **1. Kubernetes Architecture**

Kubernetes can be visualized as a **control plane (brain)** + **worker nodes (muscles)**.

---

## **A) Control Plane (Master Node)**

This manages the **desired state** of the cluster.

### **Key components:**

| Component                    | Role                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **kube-apiserver**           | The “front door” of the cluster. All `kubectl` requests go here. Exposes REST API.                                                |
| **etcd**                     | Distributed key-value store. Stores all cluster state (Pods, Deployments, Secrets).                                               |
| **kube-scheduler**           | Decides which node will run a Pod based on resources, labels, affinity, taints.                                                   |
| **kube-controller-manager**  | Runs controllers that ensure the **desired state** is maintained (Deployment controller, ReplicaSet controller, Node controller). |
| **cloud-controller-manager** | If running in cloud, integrates cloud-specific logic (load balancers, volumes, etc.)                                              |

**Analogy:**

* kube-apiserver = receptionist
* etcd = filing cabinet
* kube-scheduler = HR assigning work
* kube-controller-manager = maintenance staff

---

## **B) Worker Nodes**

Worker nodes run the actual **containers**.

### **Components:**

| Component             | Role                                                                          |
| --------------------- | ----------------------------------------------------------------------------- |
| **kubelet**           | Agent running on each node. Talks to API server and ensures Pods are running. |
| **Container Runtime** | Runs containers (Docker, containerd, CRI-O).                                  |
| **kube-proxy**        | Maintains networking rules to allow Pods & Services to communicate.           |
| **Pods**              | Smallest deployable units, can have one or more containers.                   |

**Analogy:**

* kubelet = floor manager
* container runtime = machinery
* kube-proxy = office wiring
* Pods = employees doing work

---

## **C) Networking & Services**

* **Pod-to-Pod communication:** Kubernetes provides **flat network** across nodes.
* **Services** expose pods:

  * ClusterIP → internal only
  * NodePort → accessible via node IP
  * LoadBalancer → cloud LB
* **Ingress** → HTTP routing from outside cluster

---

### **Cluster Overview Diagram**

```
              Control Plane (Master)
   ----------------------------------------
   | kube-apiserver  |  etcd  | scheduler |
   | controller-manager | cloud-controller |
   ----------------------------------------
                 |
            API calls
                 |
      --------------------------------
      |           |                  |
  Worker Node1  Worker Node2       Worker Node3
  -----------------------------------------------
  kubelet       kubelet            kubelet
  kube-proxy    kube-proxy         kube-proxy
  containerd    containerd         containerd
  Pod A         Pod B              Pod C
```

---

# **2. How to Create a Kubernetes Cluster**

There are **multiple ways** depending on your use case.

---

## **A) Local Development Cluster**

### **1. Minikube**

* Simple single-node cluster on your laptop
* Supports Windows/Mac/Linux

```bash
# Install minikube
brew install minikube    # Mac
# Start cluster
minikube start --driver=docker
# Check nodes
kubectl get nodes
```

---

### **2. Kind (Kubernetes in Docker)**

* Runs clusters as Docker containers
* Great for CI/CD pipelines

```bash
# Install kind
brew install kind
# Create cluster
kind create cluster --name mycluster
# Verify
kubectl cluster-info
kubectl get nodes
```

---

## **B) Cloud Managed Clusters**

### **1. Google Kubernetes Engine (GKE)**

```bash
gcloud container clusters create mycluster \
    --zone us-central1-a \
    --num-nodes 3
# Get credentials
gcloud container clusters get-credentials mycluster
kubectl get nodes
```

---

### **2. Azure Kubernetes Service (AKS)**

```bash
az aks create \
    --resource-group myRG \
    --name mycluster \
    --node-count 3 \
    --enable-managed-identity
# Configure kubectl
az aks get-credentials --resource-group myRG --name mycluster
kubectl get nodes
```

---

### **3. AWS Elastic Kubernetes Service (EKS)**

```bash
eksctl create cluster --name mycluster --region us-east-1 --nodes 3
kubectl get nodes
```

---

## **C) On-Prem / DIY Cluster**

If you want a fully manual setup (useful for learning):

1. Install **kubeadm, kubelet, kubectl** on all machines.
2. Initialize control plane:

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

3. Set up kubeconfig:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

4. Install Pod network (e.g., Flannel):

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

5. Join worker nodes:

```bash
kubeadm join <control-plane-ip>:6443 --token <token> --discovery-token-ca-cert-hash sha256:<hash>
```

---

## **D) Verify Cluster**

```bash
kubectl get nodes
kubectl get pods -A
kubectl cluster-info
```

---

# **3. Mental Model for Kubernetes Cluster Creation**

| Type            | Use Case             | Complexity | Example                    |
| --------------- | -------------------- | ---------- | -------------------------- |
| Minikube / Kind | Local dev            | Low        | Testing manifests          |
| Managed Cloud   | Production / staging | Medium     | GKE, EKS, AKS              |
| kubeadm manual  | Learning / on-prem   | High       | Custom network, multi-node |