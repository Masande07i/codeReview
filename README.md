# Code Collaborative Review

## Project image

<img src="https://socialify.git.ci/Masande07i/codeReview/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="codeReview" width="640" height="320" />

## Project Description

```The Collaborative Code Review Platform is an API-driven application that allows developers and teams to submit code, request reviews, provide feedback, and manage the review process.Users can register and log in securely using JWT authentication. The platform supports different user roles, including Submitters and Reviewers. Users can create projects, add members to projects, submit code for review, add comments, and manage the review status of their submissions.Reviewers can review submitted code, add comments, approve submissions, or request changes. The platform also keeps a history of reviews and provides notifications and project statistics.The project was built to demonstrate the use of Node.js, Express, TypeScript, PostgreSQL, JWT authentication, role-based authorization, REST APIs, and WebSockets to create a secure API-driven code review platform.```

## Installation and Set-up

Clone the repository:

git clone https://github.com/Masande07i/codeReview.git

cd codeReview

Create a .env file in the root of the project and add your PostgreSQL and JWT configuration:

PORT=3000
DB_HOST=your_database_host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret


## Run App

Install the project dependencies:

npm install

Start the development server:

npm run dev

The API will run on:

http://localhost:3000


## Tech Stack
1. Node.js
Node.js is used to run the backend application.
2. Express
Express is used to create the REST API and handle routes and HTTP requests.
3. TypeScript
TypeScript is used to provide type safety and structure to the application.
4. PostgreSQL
PostgreSQL is used as the relational database for storing users, projects, submissions, comments, reviews, and notifications.
5. JWT
JSON Web Tokens are used for authentication and protecting API endpoints.
6. bcryptjs
bcryptjs is used to securely hash user passwords before storing them in the database.
7. Postman
Postman is used to test the API endpoints.
8. WebSockets
WebSockets are used for real-time communication and notifications.


## Main Features
### User Authentication

Users can:

Register an account
Log in
Receive a JWT token
Access protected endpoints
Manage their profile
Update their profile information
Delete their account
User Roles

### The platform supports two roles:

Submitter
Reviewer

Submitters can create projects and submit code for review.

Reviewers can review submissions, add comments, approve submissions, and request changes.

### Projects

Users can:

Create projects
View projects
Add members to projects
Remove members from projects

Only the project owner can assign or remove project members.

### Code Submissions

Users can:

Create code submissions
View submissions belonging to a project
View individual submissions
Update submission status
Delete submissions

Submission statuses include:

pending
in_review
approved
changes_requested
Comments

Reviewers can:

Add comments to submissions
Add line-specific comments
View comments
Update comments
Delete comments

Submitters cannot add review comments.

### Reviews

Reviewers can:

Approve submissions
Request changes
View review history

The platform stores each review so that previous review decisions can be viewed.

### Notifications

The notification system provides users with an activity feed.

Users can retrieve their notifications using:

GET /api/users/:id/notifications

Notifications contain:

Notification ID
User ID
Message
Creation date
Read status
Project Statistics


## API Endpoints
### Authentication

POST /api/auth/register
POST /api/auth/login
### Users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

### Projects

POST /api/projects
GET /api/projects
POST /api/projects/:id/members
DELETE /api/projects/:id/members/:userId

### Submissions
POST /api/submissions
GET /api/projects/:id/submissions
GET /api/submissions/:id
PUT /api/submissions/:id/status
DELETE /api/submissions/:id


### Comments

POST /api/submissions/:id/comments
GET /api/submissions/:id/comments
PUT /api/comments/:id
DELETE /api/comments/:id

### Reviews

POST /api/submissions/:id/approve
POST /api/submissions/:id/request-changes
GET /api/submissions/:id/reviews

### Notifications
GET /api/users/:id/notifications


The project uses PostgreSQL.

The main database tables are:

users
projects
submissions
comments
reviews
notifications




CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


{
   "email" : "zonke@gmail.com",
   "password" : "12354",
   "name" : "Zonke"


   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJlbWFpbCI6InpvbmtlQGdtYWlsLmNvbSIsImlhdCI6MTc5MDc2NzcxNSwiZXhwIjoxNzkwNzcxMzE1fQ.dLPpVACd-fCI24BMpGBq6M1DCNY-ybpsvcL0NmBTnCw

}

http://localhost:3000/api/auth/login

{
   "name" : "Updated Collaborative Code Review",
   "description" : "Updated project description"

}


SELECT * FROM public.users
ORDER BY id ASC 

ALTER TABLE users
ALTER COLUMN name SET NOT NULL;

UPDATE users
SET role = 'Reviewer'
WHERE id = 4;

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_members (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    UNIQUE(project_id, user_id)
);

SELECT * FROM projects;

SELECT * FROM users;

DROP TABLE IF EXISTS project_members;

ALTER TABLE projects
ADD COLUMN member_ids INT[] DEFAULT '{}';

CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    code TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    line_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

{
    "project_id": 2,
    "title": "User Login",
    "code": "const login = (email, password) => {\n    return authenticate(email, password);\n};"
}

ALTER TABLE submissions
ADD CONSTRAINT submissions_status_check
CHECK (
    status IN (
        'pending',
        'in_review',
        'approved',
        'changes_requested'
    )
);


CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    reviewer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL CHECK (
        status IN ('approved', 'changes_requested')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


Database connection successful
Server is running on http://localhost:3000
2. Log in as a Reviewer

Use:

POST http://localhost:3000/api/auth/login

Use the credentials of a user whose role is:

Reviewer

Copy the new JWT token from the response.

3. Test approve

In Thunder Client/Postman:

POST http://localhost:3000/api/submissions/1/approve

Replace 1 with an existing submission ID.

Go to Headers:

Authorization: Bearer YOUR_NEW_TOKEN

You don't need a body.

4. Expected response

If everything works, you should get something similar to:

{
    "id": 1,
    "submission_id": 1,
    "reviewer_id": 2,
    "status": "approved",
    "created_at": "2026-10-02T..."
}
5. Check the submission

Run:

SELECT * FROM submissions
WHERE id = 1;

The submission should now have:

status = approved

And check the review history:

SELECT * FROM reviews
WHERE submission_id = 1;

You should see the new review with:

status = approved




. Endpoint

In Thunder Client/Postman:

POST http://localhost:3000/api/submissions/1/request-changes

Replace 1 with your submission ID.

2. Header

Use the fresh JWT from your Reviewer login:

Authorization: Bearer YOUR_NEW_TOKEN

No body is needed.

3. Expected response

You should get something like:

{
    "id": 2,
    "submission_id": 1,
    "reviewer_id": 2,
    "status": "changes_requested",
    "created_at": "2026-10-02T..."
}
4. Check the submission

Run:

SELECT * FROM submissions
WHERE id = 1;

You should see:

status = changes_requested
5. Check the review history

Run:

SELECT * FROM reviews
WHERE submission_id = 1
ORDER BY created_at DESC;



CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);