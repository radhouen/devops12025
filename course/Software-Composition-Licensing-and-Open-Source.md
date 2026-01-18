## 1. An application is built from multiple software components

Modern applications are **not written from scratch**.

Instead, they are composed of:

* **Your own code** (business logic, UI, APIs, etc.)
* **Libraries and frameworks** written by others
* **System components** (databases, runtimes, OS libraries)

### Example (web application)

An Angular + NestJS app (similar to what you’ve worked with):

* **Frontend**

  * Angular framework
  * UI component libraries (Material, Bootstrap)
  * Utility libraries (date handling, validation, charts)

* **Backend**

  * NestJS framework
  * Express/Fastify
  * Database drivers (MongoDB, PostgreSQL)
  * Auth libraries (JWT, OAuth)

Each of these is a **software component**, often developed by a different team or organization.

➡️ Your application is essentially a **composition of many independent pieces**.

---

## 2. Dependency managers (NPM, Gradle, Composer)

Because applications rely on many components, we need tools to **manage dependencies**.

A **dependency manager**:

* Downloads libraries
* Tracks versions
* Resolves conflicts
* Ensures reproducible builds

### Common examples

| Ecosystem            | Dependency Manager  |
| -------------------- | ------------------- |
| JavaScript / Node.js | **NPM**, Yarn, PNPM |
| Java                 | **Gradle**, Maven   |
| PHP                  | **Composer**        |
| Go                   | Go Modules          |
| Python               | Pip, Poetry         |

### Example (NPM)

```json
{
  "dependencies": {
    "@nestjs/core": "^10.0.0",
    "rxjs": "^7.8.0"
  }
}
```

This tells NPM:

* What components your app depends on
* Which versions are acceptable

➡️ Dependency managers make it possible to **reuse software safely and efficiently**.

---

## 3. Proprietary vs Open Source software

### Proprietary software

* Source code is **closed**
* You only get the compiled product
* Usage is restricted by a license

Examples:

* Windows
* Oracle Database
* Microsoft Office

You typically **cannot**:

* See the source code
* Modify it
* Redistribute it freely

---

### Open Source software

* Source code is **public**
* Anyone can inspect, modify, and redistribute it
* Governed by an **open source license**

Examples:

* Linux
* Angular, NestJS
* PostgreSQL
* Kubernetes

➡️ Most modern applications heavily depend on **open source software**.

---

## 4. Open source licenses (why they exist)

Open source does **not** mean “no rules”.

An **open source license** defines:

* What you are allowed to do
* What obligations you have
* How the software can be redistributed

Licenses answer questions like:

* Can I use this commercially?
* Do I have to share my source code?
* Can I modify it?
* Can I combine it with proprietary software?

---

## 5. Common open source licenses (high-level view)

### Permissive licenses (very flexible)

#### MIT License

* Do almost anything
* Just keep the copyright notice
* Very popular

Used by:

* Angular
* React
* Many JS libraries

#### BSD License

* Similar to MIT
* Slight variations (2-clause, 3-clause)

#### Apache License 2.0

* Like MIT, but:

  * Explicit patent protection
  * Requires notice of changes

Used by:

* Kubernetes
* Spring Framework

➡️ **Easy to use in commercial and proprietary software**

---

### Copyleft licenses (more restrictive)

#### GPL (General Public License)

* If you distribute software that includes GPL code:

  * Your entire software must also be GPL
* Forces source code sharing

#### LGPL (Lesser GPL)

* Weaker version of GPL
* Allows linking to proprietary software (under conditions)

#### AGPL (Affero GPL)

* Like GPL, but:

  * Also applies when software is used over a network (e.g. SaaS)

➡️ Designed to **ensure software remains open**.

---

## 6. License compatibility

**License compatibility** means:

> Can I legally combine two components with different licenses?

### Example problems

* MIT + Apache → ✅ usually compatible
* MIT + GPL → ✅ but final product must be GPL
* Apache 2.0 + GPLv2 → ❌ incompatible
* GPL + proprietary → ❌ (unless special exception)

➡️ This is critical when:

* Building commercial products
* Distributing software
* Mixing many open source libraries

---

## 7. Multi-licensing

**Multi-licensing** means software is released under **more than one license**.

### Why it exists

* Give users flexibility
* Allow both open source and commercial use

### Example

A library might be:

* **GPL** for open source projects
* **Commercial license** for proprietary products

You choose the license that fits your use case.

➡️ Common in databases and developer tools.

---

## 8. Why all of this matters in practice

When you build an application:

1. You **pull in many dependencies**
2. Each dependency has a **license**
3. Licenses impose **legal obligations**
4. Some combinations are **not allowed**

This is why companies:

* Audit dependencies
* Use tools like Dependabot, Snyk, FOSSA
* Maintain open source policies

---

### One-sentence summary

> A modern application is a collection of software components managed by dependency tools, and understanding proprietary vs open source licenses — and how they interact — is essential to legally and safely build, distribute, and maintain software.
