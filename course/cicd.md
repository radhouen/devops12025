# 1️⃣ Continuous Integration (CI) & Continuous Delivery (CD)

## Continuous Integration (CI)

**What it is**

* Developers merge code frequently
* Every change is **automatically built and tested**

**Goal**

> Detect problems early and keep the codebase healthy

**Example**

* You push code → tests run → build succeeds or fails

---

## Continuous Delivery (CD)

**What it is**

* After CI succeeds, the app is always **ready to deploy**

**Goal**

> Deployment is safe, repeatable, and boring

**Important**

* Delivery ≠ automatic production release
* A human may still approve deployment

---

# 2️⃣ Components of a CI/CD Pipeline

A pipeline is a **sequence of automated steps**

```
Commit → Build → Test → Package → Deliver → Deploy
```

---

## 🔨 Build

**Purpose**

* Turn source code into something runnable

**Examples**

* Compile Go code
* Build a Docker image
* Bundle a frontend app

---

## 🧪 Unit Tests

**What they test**

* Small, isolated pieces of code

**Characteristics**

* Fast
* No external dependencies

**Example**

* Testing a single function

---

## 🔗 Integration Tests

**What they test**

* How components work together

**Example**

* API + database interaction

---

## ✅ Acceptance Tests

**What they test**

* Does the system meet business requirements?

**Example**

* “User can log in and see dashboard”

These are slower and often run later in the pipeline.

---

## 📦 Artifact Management

**What is an artifact?**

> A built output that can be reused

**Examples**

* `.jar`, `.zip`
* Docker image
* Compiled binary

Artifacts are:

* Versioned
* Stored
* Reused across environments

---

## 🚚 Delivery

* Move artifacts to a registry
* Prepare for deployment

Example:

* Push Docker image to registry

---

## 🚀 Deployment

* Run the artifact in an environment

Examples:

* Deploy to staging
* Deploy to production

---

# 3️⃣ GitOps

## What is GitOps?

> Git is the **single source of truth** for infrastructure and deployments

### Key ideas

* Everything is defined in Git (config, infra, deployment)
* Changes happen via pull requests
* The system reconciles the real state with Git

---

## Example GitOps Flow

1. Change Kubernetes YAML in Git
2. Merge PR
3. Tool detects change
4. Cluster updates automatically

---

## Benefits

✔ Auditable
✔ Rollback is easy
✔ Clear history

---

# 4️⃣ Build Artifacts and Caches

## Build Artifacts

**Definition**

* Output produced by a build

**Why they matter**

* Build once
* Deploy the same artifact everywhere

✔ Consistency
✔ Reliability

---

## Caches

**What they are**

* Stored dependencies or build results

**Why**

* Speed up pipelines

**Examples**

* Node modules cache
* Docker layer cache

---

# 5️⃣ Deployment Best Practices

### 🔹 Deploy the same artifact everywhere

Never rebuild per environment.

---

### 🔹 Use environments

* Dev
* Staging
* Production

---

### 🔹 Use rollback strategies

* Blue-Green deployments
* Canary deployments

---

### 🔹 Automate everything

Manual steps = risk.

---

### 🔹 Configuration ≠ code

Use environment variables or secrets.

---

# 6️⃣ Semantic Versioning (SemVer)

Format:

```
MAJOR.MINOR.PATCH
```

Example:

```
2.4.1
```

### Meaning

| Part  | When it changes  |
| ----- | ---------------- |
| MAJOR | Breaking changes |
| MINOR | New features     |
| PATCH | Bug fixes        |

### Why it matters in CI/CD

* Predictable upgrades
* Artifact versioning
* Dependency management

---

# 7️⃣ Jenkins (Awareness)

## What it is

* One of the oldest CI tools
* Highly customizable

## Key traits

✔ Plugin-based
✔ Self-hosted
❌ Requires maintenance

Used heavily in legacy and enterprise systems.

---

# 8️⃣ GitLab CI (Awareness)

## What it is

* CI/CD built directly into GitLab

## Key traits

✔ Simple YAML configuration
✔ Integrated with Git
✔ Easy to start

Very popular for modern pipelines.

---

# 9️⃣ Artifactory & Nexus (Awareness)

## What are they?

**Artifact repositories**

They store:

* Build outputs
* Libraries
* Docker images

---

## Why they matter

* Central storage
* Version control for binaries
* Secure dependency management

---

## Artifactory vs Nexus

| Tool        | Notes                           |
| ----------- | ------------------------------- |
| Artifactory | Enterprise-grade, very powerful |
| Nexus       | Popular, lighter setup          |

---

# 🧠 How all of this fits together

```
Git Commit
   ↓
CI Pipeline
   → Build
   → Test
   → Package
   ↓
Artifact Repository
   ↓
CD Pipeline
   → Deliver
   → Deploy
```

---

# 🎯 You’re learning this the RIGHT way

This checklist matches:

* DevOps interviews
* Cloud certifications
* Real-world CI/CD systems