## Standard Components and Platforms for Software
---

## 1. Object Storage – features & concepts

**What it is**
Object storage stores **files as objects**, not as files in folders or rows in tables.

**Key features**

* Stores **unstructured data** (images, videos, PDFs, backups)
* Each object = **data + metadata + unique ID**
* Virtually **unlimited scale**
* High durability (e.g. “11 nines” durability)
* Accessed via **HTTP/REST APIs**

**Concepts**

* Flat namespace (no real folders, just prefixes)
* Objects are immutable (you replace, not modify)
* Optimized for **throughput**, not low latency

**Examples**

* AWS S3
* Azure Blob Storage
* Google Cloud Storage

**Use cases**

* File uploads (images, contracts)
* Backups & archives
* Data lakes
* Static website hosting

---

## 2. Relational & NoSQL Databases – features & concepts

### Relational Databases (SQL)

**What they are**

* Structured data stored in **tables with rows & columns**
* Strong relationships via foreign keys

**Key features**

* ACID transactions (consistency & reliability)
* Fixed schema
* SQL query language
* Strong data integrity

**Examples**

* PostgreSQL
* MySQL
* SQL Server
* Azure SQL / Amazon RDS

**Use cases**

* Financial systems
* ERP, CRM
* Any data with strong relationships

---

### NoSQL Databases

**What they are**

* Designed for **scale and flexibility**
* Schema-less or semi-structured

**Types**

* Key–Value (Redis)
* Document (MongoDB)
* Column (Cassandra)
* Graph (Neo4j)

**Key features**

* Horizontal scaling
* High availability
* Eventual consistency (often)
* Flexible schema

**Use cases**

* Real-time apps
* User profiles
* IoT data
* Large-scale web apps

---

## 3. Message Brokers & Message Queues – features & concepts

**What they are**

* Systems that **decouple services** by passing messages asynchronously

**Core concepts**

* Producer → Broker → Consumer
* Messages stored until processed
* Acknowledgements & retries

**Message Queues**

* Point-to-point
* Each message consumed **once**
* Order matters

**Message Brokers / Streaming**

* Pub/Sub
* Multiple consumers can read the same message
* Event-driven systems

**Examples**

* RabbitMQ
* Azure Service Bus
* AWS SQS (queue)
* Kafka / Azure Event Hubs (streaming)

**Use cases**

* Microservices communication
* Background jobs
* Event-driven architectures
* Load leveling

---

## 4. Big Data Services – features & concepts

**What they are**

* Tools for processing **huge volumes of data** (TBs–PBs)

**Core concepts**

* Distributed storage
* Parallel processing
* Batch & stream processing

**Features**

* Fault tolerance
* Scalability
* Data partitioning
* ETL / ELT pipelines

**Examples**

* Hadoop
* Spark
* Azure Databricks
* BigQuery
* Azure Synapse Analytics

**Use cases**

* Analytics & reporting
* Machine learning
* Log analysis
* Data lakes

---

## 5. Computing Services / IaaS (Infrastructure as a Service)

**What it is**

* You rent **virtual machines & infrastructure**
* You manage OS, runtime, security patches

**Features**

* Full control
* Flexible configurations
* Pay-as-you-go

**Concepts**

* Virtual machines
* Virtual networks
* Load balancers
* Storage disks

**Examples**

* AWS EC2
* Azure Virtual Machines
* Google Compute Engine

**Use cases**

* Legacy apps
* Custom system configurations
* Full control environments

---

## 6. Application Runtimes / PaaS (Platform as a Service)

**What it is**

* You deploy code, platform manages everything else

**Features**

* No OS management
* Built-in scaling
* Integrated logging & monitoring
* CI/CD friendly

**Concepts**

* App runtime (Node, Java, .NET, Python)
* Managed infrastructure
* Environment-based config

**Examples**

* Azure App Service
* AWS Elastic Beanstalk
* Google App Engine

**Use cases**

* Web APIs
* Backend services
* Business applications

---

## 7. Hosted Applications / SaaS (Software as a Service)

**What it is**

* Fully managed software delivered via the internet

**Features**

* No infrastructure management
* Subscription-based
* Accessible via browser/API

**Concepts**

* Multi-tenancy
* Continuous updates
* Data isolation

**Examples**

* Microsoft 365
* Salesforce
* GitHub
* Jira

**Use cases**

* Email
* CRM
* Project management
* Collaboration tools

---

## 8. Function Applications / FaaS (Function as a Service)

**What it is**

* Run **small pieces of code** in response to events

**Features**

* No servers to manage
* Automatic scaling
* Pay per execution

**Concepts**

* Stateless functions
* Event-driven triggers
* Short execution time

**Examples**

* AWS Lambda
* Azure Functions
* Google Cloud Functions

**Use cases**

* Event processing
* File processing
* API endpoints
* Automation

---

## 9. Content Delivery Networks (CDN) – features & concepts

**What it is**

* Globally distributed servers that **cache content close to users**

**Features**

* Low latency
* High availability
* Reduced load on origin servers

**Concepts**

* Edge locations
* Caching
* Origin server
* Cache invalidation

**Examples**

* CloudFront
* Azure CDN
* Cloudflare

**Use cases**

* Websites
* Video streaming
* Static assets
* APIs

---

## 10. Identity & Access Management (IAM) – cloud awareness

**What it is**

* Controls **who can access what**

**Core concepts**

* Identity (user, service, app)
* Authentication (who you are)
* Authorization (what you can do)

**Features**

* Role-based access control (RBAC)
* Least privilege principle
* Federation (SSO)
* Managed identities

**Examples**

* Azure Active Directory (Entra ID)
* AWS IAM
* Google IAM

**Why it matters**

* Security
* Compliance
* Prevents data leaks
* Zero Trust architectures

---

## One-sentence mental model 🧠

> **Cloud services range from raw infrastructure (IaaS), to managed platforms (PaaS), to full applications (SaaS), with data, messaging, security, and scaling services supporting everything in between.**

If you want, I can also:

* Map these to **AWS vs Azure vs GCP**
* Explain them **from an architecture diagram**
* Help you **prepare for a cloud certification**
* Explain using **real-world system examples**

Just tell me 👍
