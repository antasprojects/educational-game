-- DROP TABLE IF EXISTS result;
-- DROP TABLE IF EXISTS question_bank;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE users (
--     id INT GENERATED ALWAYS AS IDENTITY,
--     email VARCHAR(25) NOT NULL UNIQUE,
--     password VARCHAR(70) NOT NULL,
--     admin BOOLEAN DEFAULT FALSE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE question_bank (
--     id INT GENERATED ALWAYS AS IDENTITY,
--     question TEXT NOT NULL,
--     option_1 VARCHAR(75) NOT NULL,
--     option_2 VARCHAR(75) NOT NULL,
--     option_3 VARCHAR(75) NOT NULL,
--     option_4 VARCHAR(75) NOT NULL,
--     answer VARCHAR(75) NOT NULL,
--     subject VARCHAR(30) NOT NULL,
--     level VARCHAR(30) NOT NULL,
--     group_num INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id)
-- ); 

-- CREATE TABLE result (
--     id INT GENERATED ALWAYS AS IDENTITY,
--     user_id INT NOT NULL,
--     score INT NOT NULL,
--     question_id INT NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (id),
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--     FOREIGN KEY (question_id) REFERENCES question_bank(id) ON DELETE CASCADE
-- );


-- -- ------------------------------------------------------------- SEED DATA --------------------------------------

-- INSERT INTO users (password, email, admin)
-- VALUES 
--     ('password123', 'john@email.com', FALSE),
--     ('securepass456', 'jane@email.com', TRUE),
--     ('wonderland789', 'alice@email.com', FALSE),
--     ('builditnow', 'bob@email.com', FALSE),
--     ('adminpass', 'admin@email.com', TRUE);


-- -- Question Bank
-- INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num) VALUES
-- ('What is 10 + 5?', '10', '15', '20', '25', '15', 'Math', 'Beginner', 1),
-- ('What is the capital of Germany?', 'Berlin', 'Paris', 'Madrid', 'Rome', 'Berlin', 'Geography', 'Beginner', 1),
-- ('What is 7 x 6?', '42', '36', '48', '54', '42', 'Math', 'Beginner', 1),
-- ('Who wrote Hamlet?', 'Shakespeare', 'Dickens', 'Hemingway', 'Tolkien', 'Shakespeare', 'Literature', 'Advanced', 1),
-- ('What is the square root of 16?', '2', '4', '8', '16', '4', 'Math', 'Beginner', 2),
-- ('What is the largest planet?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Jupiter', 'Science', 'Intermediate', 1),
-- ('What is 2 + 2?', '10', '15', '4', '25', '4', 'Math', 'Beginner', 1);


-- INSERT INTO result (user_id, score, question_id)
-- VALUES 
-- (1, 10, 1),  -- user 1, Math, Beginner, group 1
-- (1, 15, 5),  -- user 1, Math, Intermediate, group 2
-- (2, 20, 2),  -- user 2, Geography, Beginner, group 1
-- (2, 25, 4),  -- user 2, Literature, Advanced, group 1
-- (3, 30, 5),  -- user 3, Math, Beginner, group 2
-- (3, 35, 6), -- user 3, Science, Intermediate, group 1
-- (4, 40, 3), -- user 4, Math, Beginner, group 1
-- (5, 45, 7), -- user 5, Math, Beginner, group 1
-- (1, 20, 3), -- user 1, Math, Beginner, group 1
-- (1, 33, 7); -- user 1, Math, Beginner, group 1

-- 
-- 
-- 
-- 
-- 
DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS question_bank;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(70) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE question_bank (
    id INT GENERATED ALWAYS AS IDENTITY,
    question TEXT NOT NULL,
    option_1 VARCHAR(75) NOT NULL,
    option_2 VARCHAR(75) NOT NULL,
    option_3 VARCHAR(75) NOT NULL,
    option_4 VARCHAR(75) NOT NULL,
    answer VARCHAR(75) NOT NULL,
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
    question_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (question_id) REFERENCES question_bank(id)
);


-- ------------------------------------------------------------- SEED DATA --------------------------------------

INSERT INTO users (password, email, admin)
VALUES 
    ('password123', 'john@email.com', FALSE),
    ('securepass456', 'jane@email.com', TRUE),
    ('wonderland789', 'alice@email.com', FALSE),
    ('builditnow', 'bob@email.com', FALSE),
    ('adminpass', 'admin@email.com', TRUE);


INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    ('Who wrote "Pride and Prejudice"?', 'Jane Austen', 'Emily Brontë', 'Charles Dickens', 'Mark Twain', 'Jane Austen', 'History', 'Easy', 1),
    ('In what year did the Berlin Wall fall?', '1985', '1987', '1989', '1991', '1989', 'History', 'Easy', 1),
    ('Who painted the Mona Lisa?', 'Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet', 'Leonardo da Vinci', 'Art', 'Easy', 1),
    ('Which Shakespeare play features the characters Rosencrantz and Guildenstern?', 'Hamlet', 'Macbeth', 'Othello', 'King Lear', 'Hamlet', 'Literature', 'Medium', 2),
    ('What is the first name of the famous Spanish artist Picasso?', 'Juan', 'Francisco', 'Pablo', 'Luis', 'Pablo', 'Art', 'Easy', 3);


INSERT INTO result (user_id, score, question_id)
VALUES 
    (1, 10, 1),
    (2, 9, 2),
    (3, 8, 3),
    (4, 7, 4),
    (5, 10, 5),
    (1, 6, 2),
    (2, 7, 3),
    (3, 9, 1),
    (4, 5, 5),
    (5, 8, 4);