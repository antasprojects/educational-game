DROP TABLE IF EXISTS result;
DROP TABLE IF EXISTS question_bank;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(25) NOT NULL UNIQUE,
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

INSERT INTO users (username, password, email, admin)
VALUES 
    ('john_doe', 'password123', 'john@email.com', FALSE),
    ('jane_smith', 'securepass456', 'jane@email.com', TRUE),
    ('alice_wonder', 'wonderland789', 'alice@email.com', FALSE),
    ('bob_builder', 'builditnow', 'bob@email.com', FALSE),
    ('admin_user', 'adminpass', 'admin@email.com', TRUE);


INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    ('Who wrote "Pride and Prejudice"?', 'Jane Austen', 'Emily Brontë', 'Charles Dickens', 'Mark Twain', 'Jane Austen', 'Literature', 'Easy', 1),
    ('In what year did the Berlin Wall fall?', '1985', '1987', '1989', '1991', '1989', 'History', 'Medium', 2),
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