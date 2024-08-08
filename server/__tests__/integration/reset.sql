-- Truncate all tables with CASCADE to handle foreign key dependencies
TRUNCATE result, question_bank, users RESTART IDENTITY CASCADE;

INSERT INTO users (password, email, admin)
VALUES 
    ('password123', 'john@email.com', FALSE),
    ('adminpass', 'admin@email.com', TRUE);

INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    ('Q1 Answer A', 'A', 'B', 'C', 'D', 'A', 'Art', 'Easy', 1),
    ('Q2 Answer B', 'A', 'B', 'C', 'D', 'B', 'Art', 'Medium', 2),
    ('Q3 Answer C', 'A', 'B', 'C', 'D', 'C', 'Art', 'Easy', 1),
    ('Q4 Answer D', 'A', 'B', 'C', 'D', 'D', 'Art', 'Easy', 1);



INSERT INTO result (user_id, score, question_id)
VALUES 
    (1, 1, 1),
    (1, 1, 3),
    (1, 1, 4),
    (2, 1, 2),
    (2, 0, 1),
    (2, 1, 3),
    (2, 1, 4);

