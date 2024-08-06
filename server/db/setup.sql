DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS question_bank;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(70) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE question_bank (
    id INT GENERATED ALWAYS AS IDENTITY,
    question TEXT NOT NULL,
    option_1 VARCHAR(5) NOT NULL,
    option_2 VARCHAR(5) NOT NULL,
    option_3 VARCHAR(5) NOT NULL,
    option_4 VARCHAR(5) NOT NULL,
    answer VARCHAR(5) NOT NULL,
    subject VARCHAR(30) NOT NULL,
    level VARCHAR(30) NOT NULL,
    group_num INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
); 

CREATE TABLE result (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    question_id INT NOT NULL,  -- Added missing comma here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES question_bank(id)  -- Fixed typo here
);