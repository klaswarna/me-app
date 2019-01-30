DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);

DROP TABLE reports;

CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    UNIQUE(id)
);