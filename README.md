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