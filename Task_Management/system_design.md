
---

## 4. System Components

### 4.1 Client
- Web or mobile frontend
- Communicates with backend via REST APIs

### 4.2 API Gateway
- Handles authentication (JWT)
- Rate limiting
- Request routing

### 4.3 Application Server
Contains core business logic:
- Task management
- Project management
- User authorization

Modules:
- User Service
- Task Service
- Project Service

---

## 5. Database Design

### 5.1 Users Table
| Field           | Type   |
|----------------|--------|
| id (PK)        | UUID   |
| name           | String |
| email          | String |
| password_hash  | String |

---

### 5.2 Projects Table
| Field           | Type   |
|----------------|--------|
| id (PK)        | UUID   |
| name           | String |
| owner_id (FK)  | UUID   |

---

### 5.3 Tasks Table
| Field        | Type      |
|-------------|-----------|
| id (PK)     | UUID      |
| title       | String    |
| description | Text      |
| status      | Enum      |
| priority    | Enum      |
| due_date    | Timestamp |
| project_id  | UUID      |
| created_by  | UUID      |

---

### 5.4 Task_Assignees Table
| Field   | Type |
|---------|------|
| task_id | UUID |
| user_id | UUID |

---

### 5.5 Indexing Strategy
- Index on `user_id`
- Index on `project_id`
- Index on `due_date`

---

## 6. API Design

### Authentication
- `POST /register`
- `POST /login`

### Tasks
- `POST /tasks`
- `GET /tasks?user_id=`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`

### Projects
- `POST /projects`
- `GET /projects`

---

## 7. Caching (Redis)
Used for:
- Frequently accessed tasks
- User sessions

Example:
