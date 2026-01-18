Perfect! I’ll give you a **step-by-step guide to creating a Kubernetes cluster using `kubeadm` on Ubuntu VMs**. This will cover **control plane (master) and worker nodes** with all necessary commands. I’ll assume you have at least **2 VMs**: 1 master and 1 worker (can scale to more workers).

---

# **Prerequisites**

* Ubuntu 20.04+ or 22.04 on all nodes
* Minimum:

  * Master: 2 CPU, 2GB RAM
  * Worker: 1 CPU, 2GB RAM
* Swap must be **disabled**
* Internet connectivity for downloading packages
* `sudo` privileges on all nodes

---

# **Step 0: Prepare all VMs**

On **all nodes** (master + workers):

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Disable swap (required by kubelet)
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Load kernel modules
sudo modprobe br_netfilter
echo '1' | sudo tee /proc/sys/net/bridge/bridge-nf-call-iptables

# Enable netfilter for bridging
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
sudo sysctl --system
```

---

# **Step 1: Install container runtime**

Kubernetes supports **containerd** or Docker. I’ll use **containerd** (modern default).

```bash
sudo apt install -y containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml
sudo systemctl restart containerd
sudo systemctl enable containerd
```

---

# **Step 2: Install kubeadm, kubelet, kubectl**

On **all nodes**:

```bash
# Add Kubernetes repo
sudo apt update && sudo apt install -y apt-transport-https curl
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt update

# Install packages
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

---

# **Step 3: Initialize the control plane (master node)**

On **master node only**:

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

* `--pod-network-cidr` → required for Flannel CNI (or change per your CNI)
* Sample output will include **kubeconfig setup instructions** and **worker join command**.

---

# **Step 4: Set up kubectl for the master**

On **master node**:

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
kubectl get nodes
```

* You should see the master node in **NotReady** state until the CNI is installed.

---

# **Step 5: Install Pod network (CNI)**

Example: **Flannel**:

```bash
kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml
```

* Wait a few seconds and check:

```bash
kubectl get pods -A
kubectl get nodes
```

* Node should now be **Ready**.

---

# **Step 6: Join worker nodes**

On **each worker node**, run the command from **Step 3 output**. It looks like:

```bash
sudo kubeadm join <MASTER_IP>:6443 --token <TOKEN> --discovery-token-ca-cert-hash sha256:<HASH>
```

* After joining, check from master:

```bash
kubectl get nodes
```

* You should see **master + worker(s)** in **Ready** state.

---

# **Step 7: Test your cluster**

Deploy a test Pod:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pods
kubectl get svc
```

* Use the worker node IP + NodePort to access nginx:

```bash
curl <worker-node-ip>:<node-port>
```

---

# **Optional Step 8: Cluster Management**

* Upgrade cluster:

```bash
sudo kubeadm upgrade plan
sudo kubeadm upgrade apply v1.28.2
```

* Reset node:

```bash
sudo kubeadm reset
```

* Remove node from cluster:

```bash
kubectl drain <node-name> --delete-local-data --force --ignore-daemonsets
kubectl delete node <node-name>
```

---

# ✅ **Summary**

1. Prepare Ubuntu nodes (disable swap, configure sysctl)
2. Install container runtime (containerd)
3. Install `kubeadm`, `kubelet`, `kubectl`
4. Initialize master node (`kubeadm init`)
5. Configure `kubectl`
6. Install CNI (Flannel)
7. Join worker nodes (`kubeadm join`)
8. Deploy/test Pods