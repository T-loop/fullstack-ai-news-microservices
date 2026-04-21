# Fullstack AI News Microservices

## Installation

Zuerst müssen die Node.js Abhängigkeiten installiert werden.

```bash
npm install
```

---

## Node.js Backend starten

In das Backend-Verzeichnis wechseln:

```bash
cd backend
```

Server starten:

```bash
node app.js
```

Beispielausgabe im Terminal:

```
[dotenv@17.2.3] injecting env (6) from .env
heeelo CRONNNNN JOB Start
Nodejs Server läuft auf Port 3000
```

---

## Python FastAPI Server starten

Zum Python-Verzeichnis wechseln:

```bash
cd python
```

Virtual Environment aktivieren:

```bash
.\venv\Scripts\Activate
```

Dann den FastAPI Server starten:

```bash
uvicorn fastApi:app --reload
```

Beispielausgabe:

```
INFO:     Will watch for changes in these directories
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

Beispiel Request:

```
POST /classify HTTP/1.1
200 OK
```

---

## Nachrichten anzeigen

Die Nachrichten können im Browser unter folgender Adresse angezeigt werden:

```
http://localhost:3000/alluser.html
```

---

## Datenbank Setup (PostgreSQL)

Am Anfang müssen die Tabellen in PostgreSQL erstellt werden und die `.env` Datei mit der Datenbankkonfiguration angepasst werden.

### Tabelle: users

```sql
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabelle: messages

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

## Admin Benutzer Registrierung (einmalig)

Der Admin Benutzer muss einmal über das Terminal registriert werden, da es kein Formular im GUI Web Interface gibt.

Test Registrierung:

```bash
Invoke-RestMethod -Uri http://localhost:3000/auth/register -Method POST -Body '{"username":"testuser","password":"123456"}' -ContentType "application/json"
```

Beispiel Ausgabe:

```
userid username
------ --------
     1 testuser
```
