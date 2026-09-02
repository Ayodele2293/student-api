# Student Management REST API

A simple Node.js/Express REST API for managing students using an in-memory JavaScript array instead of a real database.

## Requirements covered

- Add a new student
- Get all students
- Get a student by ID
- Update student information
- Delete a student

## Run locally

1. Install Node.js.
2. Open this project folder in a terminal.
3. Run:

```bash
npm install
npm start
```

The API will run on:

http://localhost:3000

## Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get one student |
| POST | `/students` | Add a student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

## POST example

Send JSON to `POST /students`:

```json
{
  "name": "Peter James",
  "age": 22,
  "course": "Software Engineering"
}
```

## PUT example

Send JSON to `PUT /students/1`:

```json
{
  "name": "John Updated",
  "age": 23,
  "course": "Information Technology"
}
```

## Important

This project uses an in-memory array. Data will reset to the original sample students whenever the server restarts.
