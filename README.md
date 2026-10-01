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



export const deleteComment = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string, 10);

        const deletedComment = await commentService.deleteComment(id);

        if (!deletedComment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            message: "Comment deleted successfully",
            comment: deletedComment
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting comment"
        });
    }
};

