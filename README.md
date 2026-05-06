# 🚀 Fullstack AI News Microservices

---

## 📦 Installation
Finished project in Branch Design
First, install the Node.js dependencies:

```bash
npm install
```

---

## 🖥️ Start Node.js Backend

Navigate to the backend directory:

```bash
cd backend
```

▶️ Start the server:

```bash
node app.js
```

📌 Example output:

```
[dotenv@17.2.3] injecting env (6) from .env
heeelo CRONNNNN JOB Start
Nodejs Server running on port 3000
```

---

## 🐍 Start Python FastAPI Server

Navigate to the Python directory:

```bash
cd python
```

🔧 Activate virtual environment:

```bash
.\venv\Scripts\Activate
```

▶️ Start FastAPI server:

```bash
uvicorn fastApi:app --reload
```

📌 Example output:

```
INFO:     Will watch for changes in these directories
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

📡 Example request:

```
POST /classify HTTP/1.1
200 OK
```

---

## 🌐 View News in Browser

Open the following URL:

```
http://localhost:3000/alluser.html
```

---

## 🗄️ Database Setup (PostgreSQL)

Before running the project, create the required tables and configure your `.env` file.

---

### 👤 Table: users

```sql
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 📰 Table: messages

```sql
CREATE TABLE messages (
  messageid SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_user
    FOREIGN KEY (userid)
    REFERENCES users(userid)
    ON DELETE CASCADE
);
```

---

## 🔐 Admin User Registration (One-time Setup)

Since there is no UI form, the admin user must be created via terminal.

▶️ Test registration:

```bash
Invoke-RestMethod -Uri http://localhost:3000/auth/register -Method POST -Body '{"username":"testuser","password":"123456"}' -ContentType "application/json"
```

📌 Example output:

```
userid username
------ --------
     1 testuser
```
