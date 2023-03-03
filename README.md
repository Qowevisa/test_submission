# Hapi test submission

## Installation
To get the service run this inside your terminal emulator of choise

```bash
git clone https://github.com/qowevisa/test_submission
```
```bash
cd test_submission
```
```bash
npm i
```

---

## Run

```bash
npm run start
```

---

## Structure

Here's a brief overview of folders and files and their purpose:

`src`: contains the source code for the service:
- `controllers`: contains REST API controllers, which handle requests and responses.
- `routes`: contains the route definitions for REST API, which map HTTP requests to controller actions.
- `utils`: contains utility functions and helper modules.
- `app.js`: contains the main application setup.
- `index.js`: contains the entry point of server.
- `.env`: contains environment variables for the service.

---

## Endpoints

### GET /stats

Example request:

```
GET /stats
```

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
[
    {
        "id": 1,
        "endpoint": "/stats",
        "method": "GET",
        "uses": 57
    },
    {
        "id": 2,
        "endpoint": "/notes",
        "method": "GET",
        "uses": 26
    }
```

### GET /notes

Example request:

```
GET /notes
```

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
[
  {
    "id": 1,
    "text": "test2"
  },
  {
    "id": 2,
    "text": "Note"
  },
  ...
]
```

### GET /notes/{id}

Example request:

```
GET /notes/2
```

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": 2,
  "text": "Note"
}
```

### POST /notes

Example request:

```
POST /notes/
Content-Type: application/json
{
  "text": "Sample Text"
}
```

Example response:

```
HTTP/1.1 201 Created
Content-Type: application/json
{
  "id": 16,
  "message": "Note was created!"
}
```

### POST(PUT) /notes/{id}

Example request:

```
POST /notes/
Content-Type: application/json
{
  "text": "New Changed text"
}
```

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "id": {id},
  "message": "Note was changed!"
}
```

### GET /api

Accepts params: `<string>open`, `<string>high`, `<string>low`, `<string>close`, `<string>volume`

```
GET /api?volume=12135
```

Example response:

```
HTTP/1.1 200 OK
Content-Type: application/json
[
  {
      "1. open": "128.1126",
      "2. high": "128.1126",
      "3. low": "128.1126",
      "4. close": "128.1126",
      "5. volume": "100",
      "time": "2023-03-01 16:20:00"
  },
  {
      "1. open": "128.4881",
      "2. high": "128.4881",
      "3. low": "128.4881",
      "4. close": "128.4881",
      "5. volume": "100",
      "time": "2023-03-01 17:10:00"
  },
  ...
]
```