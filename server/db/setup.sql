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


-- Insert questions into the question_bank table

-- Easy Level Questions (10 per group)
INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    -- Group 1
    ('Who was the first president of the United States?', 'Abraham Lincoln', 'George Washington', 'Thomas Jefferson', 'John Adams', 'George Washington', 'History', 'Easy', 1),
    ('What is the capital of France?', 'Berlin', 'Madrid', 'Paris', 'Lisbon', 'Paris', 'Geography', 'Easy', 1),
    ('Which language is primarily spoken in Brazil?', 'Spanish', 'Portuguese', 'French', 'English', 'Portuguese', 'Language', 'Easy', 1),
    ('Who discovered America?', 'Christopher Columbus', 'Marco Polo', 'Vasco da Gama', 'Leif Erikson', 'Christopher Columbus', 'History', 'Easy', 1),
    ('What is the capital of Japan?', 'Beijing', 'Seoul', 'Tokyo', 'Bangkok', 'Tokyo', 'Geography', 'Easy', 1),
    ('Which language is primarily spoken in Canada?', 'French', 'English', 'Spanish', 'German', 'English', 'Language', 'Easy', 1),
    ('Who was the famous emperor of the Roman Empire?', 'Julius Caesar', 'Alexander the Great', 'Genghis Khan', 'Cleopatra', 'Julius Caesar', 'History', 'Easy', 1),
    ('What is the capital of Canada?', 'Ottawa', 'Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Geography', 'Easy', 1),
    ('Which language is the most widely spoken in the world?', 'Spanish', 'English', 'Mandarin', 'Hindi', 'Mandarin', 'Language', 'Easy', 1),
    ('Who wrote the national anthem of the United States?', 'Francis Scott Key', 'George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'Francis Scott Key', 'History', 'Easy', 1),

    -- Group 2
    ('Which country gifted the Statue of Liberty to the United States?', 'France', 'Italy', 'Spain', 'Germany', 'France', 'History', 'Easy', 2),
    ('What is the capital of Australia?', 'Sydney', 'Melbourne', 'Canberra', 'Perth', 'Canberra', 'Geography', 'Easy', 2),
    ('What language is primarily spoken in Egypt?', 'Arabic', 'Hebrew', 'English', 'French', 'Arabic', 'Language', 'Easy', 2),
    ('Who was the first President of South Africa after apartheid?', 'Nelson Mandela', 'Desmond Tutu', 'Thabo Mbeki', 'Jacob Zuma', 'Nelson Mandela', 'History', 'Easy', 2),
    ('Which is the smallest continent?', 'Europe', 'Australia', 'Antarctica', 'South America', 'Australia', 'Geography', 'Easy', 2),
    ('What is the capital city of Italy?', 'Milan', 'Venice', 'Rome', 'Naples', 'Rome', 'Geography', 'Easy', 2),
    ('Who invented the light bulb?', 'Nikola Tesla', 'Thomas Edison', 'Alexander Graham Bell', 'Henry Ford', 'Thomas Edison', 'History', 'Easy', 2),
    ('Which river flows through London?', 'Thames', 'Seine', 'Danube', 'Volga', 'Thames', 'Geography', 'Easy', 2),
    ('What is the primary language spoken in Argentina?', 'Spanish', 'Portuguese', 'Italian', 'English', 'Spanish', 'Language', 'Easy', 2),
    ('Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'Mark Twain', 'William Shakespeare', 'Jane Austen', 'William Shakespeare', 'History', 'Easy', 2),

    -- Group 3
    ('Who painted the Mona Lisa?', 'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet', 'Leonardo da Vinci', 'History', 'Easy', 3),
    ('What is the capital of Germany?', 'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Berlin', 'Geography', 'Easy', 3),
    ('Which language is primarily spoken in Mexico?', 'English', 'French', 'Spanish', 'Portuguese', 'Spanish', 'Language', 'Easy', 3),
    ('Who was the first man on the moon?', 'Neil Armstrong', 'Buzz Aldrin', 'Yuri Gagarin', 'John Glenn', 'Neil Armstrong', 'History', 'Easy', 3),
    ('What is the capital of Russia?', 'Moscow', 'Saint Petersburg', 'Novosibirsk', 'Kazan', 'Moscow', 'Geography', 'Easy', 3),
    ('Which country is known as the Land of the Rising Sun?', 'China', 'South Korea', 'Japan', 'Thailand', 'Japan', 'Geography', 'Easy', 3),
    ('Who wrote "The Odyssey"?', 'Homer', 'Virgil', 'Sophocles', 'Euripides', 'Homer', 'History', 'Easy', 3),
    ('Which river is the longest in the world?', 'Amazon', 'Nile', 'Yangtze', 'Mississippi', 'Nile', 'Geography', 'Easy', 3),
    ('What is the primary language spoken in Greece?', 'Greek', 'Turkish', 'Italian', 'French', 'Greek', 'Language', 'Easy', 3),
    ('What year did the Titanic sink?', '1912', '1915', '1905', '1918', '1912', 'History', 'Easy', 3);

-- Medium Level Questions (10 per group)
INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    -- Group 1
    ('In which year did the American Civil War end?', '1865', '1870', '1850', '1900', '1865', 'History', 'Medium', 1),
    ('What is the longest river in Africa?', 'Nile', 'Congo', 'Zambezi', 'Niger', 'Nile', 'Geography', 'Medium', 1),
    ('Which language uses the Cyrillic alphabet?', 'French', 'German', 'Russian', 'Spanish', 'Russian', 'Language', 'Medium', 1),
    ('In which year did World War II end?', '1945', '1939', '1918', '1965', '1945', 'History', 'Medium', 1),
    ('What is the largest ocean in the world?', 'Atlantic', 'Indian', 'Arctic', 'Pacific', 'Pacific', 'Geography', 'Medium', 1),
    ('Which language is known as the language of love?', 'Spanish', 'Italian', 'French', 'German', 'French', 'Language', 'Medium', 1),
    ('Who was the first female Prime Minister of the United Kingdom?', 'Margaret Thatcher', 'Angela Merkel', 'Indira Gandhi', 'Golda Meir', 'Margaret Thatcher', 'History', 'Medium', 1),
    ('Which is the smallest continent?', 'Europe', 'Australia', 'Antarctica', 'South America', 'Australia', 'Geography', 'Medium', 1),
    ('What is the official language of China?', 'Mandarin', 'Cantonese', 'English', 'Korean', 'Mandarin', 'Language', 'Medium', 1),
    ('Which event started the French Revolution?', 'Storming of the Bastille', 'The Reign of Terror', 'The Congress of Vienna', 'The Tennis Court Oath', 'Storming of the Bastille', 'History', 'Medium', 1),

    -- Group 2
    ('What year did the Berlin Wall fall?', '1989', '1990', '1987', '1985', '1989', 'History', 'Medium', 2),
    ('Which desert is the largest in the world?', 'Sahara', 'Arabian', 'Gobi', 'Kalahari', 'Sahara', 'Geography', 'Medium', 2),
    ('What is the official language of Egypt?', 'Arabic', 'Hebrew', 'English', 'French', 'Arabic', 'Language', 'Medium', 2),
    ('Which war was fought between the North and South regions in the United States?', 'World War I', 'World War II', 'The Civil War', 'The Revolutionary War', 'The Civil War', 'History', 'Medium', 2),
    ('What is the smallest country in the world?', 'Monaco', 'Vatican City', 'Nauru', 'Malta', 'Vatican City', 'Geography', 'Medium', 2),
    ('Which language is known as the language of diplomacy?', 'Spanish', 'Arabic', 'English', 'French', 'French', 'Language', 'Medium', 2),
    ('Which river is known as the longest in Asia?', 'Ganges', 'Yangtze', 'Yellow', 'Mekong', 'Yangtze', 'Geography', 'Medium', 2),
    ('What year did World War I begin?', '1914', '1918', '1920', '1939', '1914', 'History', 'Medium', 2),
    ('What is the main language spoken in Switzerland?', 'German', 'French', 'Italian', 'Romansh', 'German', 'Language', 'Medium', 2),
    ('Who was the second President of the United States?', 'John Adams', 'Thomas Jefferson', 'James Madison', 'George Washington', 'John Adams', 'History', 'Medium', 2),

    -- Group 3
    ('What is the largest country in the world by area?', 'Canada', 'United States', 'China', 'Russia', 'Russia', 'Geography', 'Medium', 3),
    ('What is the primary language spoken in Brazil?', 'Spanish', 'Portuguese', 'French', 'English', 'Portuguese', 'Language', 'Medium', 3),
    ('Who was the 16th President of the United States?', 'George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'Theodore Roosevelt', 'Abraham Lincoln', 'History', 'Medium', 3),
    ('What is the longest river in South America?', 'Amazon', 'Parana', 'Orinoco', 'Magdalena', 'Amazon', 'Geography', 'Medium', 3),
    ('Which language is primarily spoken in India?', 'Hindi', 'Bengali', 'Tamil', 'English', 'Hindi', 'Language', 'Medium', 3),
    ('Who was the first emperor of China?', 'Qin Shi Huang', 'Kublai Khan', 'Sun Yat-sen', 'Liu Bang', 'Qin Shi Huang', 'History', 'Medium', 3),
    ('Which river flows through Egypt?', 'Nile', 'Amazon', 'Yangtze', 'Mississippi', 'Nile', 'Geography', 'Medium', 3),
    ('What is the primary language spoken in Italy?', 'Italian', 'Spanish', 'French', 'Portuguese', 'Italian', 'Language', 'Medium', 3),
    ('Who was the last Tsar of Russia?', 'Nicholas I', 'Nicholas II', 'Alexander III', 'Peter the Great', 'Nicholas II', 'History', 'Medium', 3),
    ('Which river is the longest in North America?', 'Mississippi', 'Missouri', 'Colorado', 'Yukon', 'Missouri', 'Geography', 'Medium', 3);

-- Hard Level Questions (10 per group)
INSERT INTO question_bank (question, option_1, option_2, option_3, option_4, answer, subject, level, group_num)
VALUES 
    -- Group 1
    ('What was the main language of the Roman Empire?', 'Greek', 'Latin', 'Romanian', 'Italian', 'Latin', 'Language', 'Hard', 1),
    ('What is the second longest river in the world?', 'Nile', 'Amazon', 'Yangtze', 'Mississippi', 'Amazon', 'Geography', 'Hard', 1),
    ('Which ancient civilization built Machu Picchu?', 'Inca', 'Maya', 'Aztec', 'Olmec', 'Inca', 'History', 'Hard', 1),
    ('What is the primary language spoken in Iran?', 'Arabic', 'Persian', 'Turkish', 'Kurdish', 'Persian', 'Language', 'Hard', 1),
    ('Which is the largest desert in Asia?', 'Gobi', 'Karakum', 'Thar', 'Arabian', 'Gobi', 'Geography', 'Hard', 1),
    ('Who was the last Emperor of India?', 'George VI', 'Edward VIII', 'George V', 'William IV', 'George VI', 'History', 'Hard', 1),
    ('What language is primarily spoken in Austria?', 'German', 'Dutch', 'Italian', 'French', 'German', 'Language', 'Hard', 1),
    ('What is the capital of Saudi Arabia?', 'Riyadh', 'Mecca', 'Jeddah', 'Medina', 'Riyadh', 'Geography', 'Hard', 1),
    ('Who was the first President of the United States?', 'George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin', 'George Washington', 'History', 'Hard', 1),
    ('What is the official language of Vatican City?', 'Latin', 'Italian', 'English', 'Spanish', 'Latin', 'Language', 'Hard', 1),

    -- Group 2
    ('What year did the fall of Constantinople occur?', '1453', '1492', '1521', '1648', '1453', 'History', 'Hard', 2),
    ('What is the highest mountain in the world?', 'K2', 'Everest', 'Kangchenjunga', 'Lhotse', 'Everest', 'Geography', 'Hard', 2),
    ('What is the primary language spoken in Saudi Arabia?', 'Arabic', 'Hebrew', 'Farsi', 'Urdu', 'Arabic', 'Language', 'Hard', 2),
    ('Who was the first female Pharaoh of Egypt?', 'Nefertiti', 'Hatshepsut', 'Cleopatra', 'Nefertari', 'Hatshepsut', 'History', 'Hard', 2),
    ('Which country has the most natural lakes?', 'Canada', 'United States', 'Russia', 'Brazil', 'Canada', 'Geography', 'Hard', 2),
    ('Which language is primarily spoken in Norway?', 'Norwegian', 'Swedish', 'Danish', 'Finnish', 'Norwegian', 'Language', 'Hard', 2),
    ('What is the capital of Mongolia?', 'Ulaanbaatar', 'Beijing', 'Seoul', 'Tokyo', 'Ulaanbaatar', 'Geography', 'Hard', 2),
    ('Who was the Roman god of war?', 'Jupiter', 'Neptune', 'Mars', 'Apollo', 'Mars', 'History', 'Hard', 2),
    ('What is the primary language spoken in the Netherlands?', 'Dutch', 'German', 'French', 'English', 'Dutch', 'Language', 'Hard', 2),
    ('Which European city is known as the City of Seven Hills?', 'Athens', 'Rome', 'Lisbon', 'Istanbul', 'Rome', 'Geography', 'Hard', 2),

    -- Group 3
    ('Who wrote the "I Have a Dream" speech?', 'Malcolm X', 'Martin Luther King Jr.', 'Frederick Douglass', 'Rosa Parks', 'Martin Luther King Jr.', 'History', 'Hard', 3),
    ('What is the primary language spoken in Kenya?', 'Swahili', 'English', 'French', 'Portuguese', 'Swahili', 'Language', 'Hard', 3),
    ('Which sea is the saltiest in the world?', 'Dead Sea', 'Red Sea', 'Mediterranean Sea', 'Black Sea', 'Dead Sea', 'Geography', 'Hard', 3),
    ('Who was the first person to circumnavigate the globe?', 'Christopher Columbus', 'Ferdinand Magellan', 'James Cook', 'Marco Polo', 'Ferdinand Magellan', 'History', 'Hard', 3),
    ('What is the primary language spoken in Israel?', 'Hebrew', 'Arabic', 'English', 'Yiddish', 'Hebrew', 'Language', 'Hard', 3),
    ('What is the deepest part of the ocean?', 'Mariana Trench', 'Tonga Trench', 'Puerto Rico Trench', 'Java Trench', 'Mariana Trench', 'Geography', 'Hard', 3),
    ('Who was the first Emperor of Japan?', 'Jimmu', 'Meiji', 'Showa', 'Taisho', 'Jimmu', 'History', 'Hard', 3),
    ('What language is primarily spoken in the Philippines?', 'Tagalog', 'English', 'Spanish', 'Chinese', 'Tagalog', 'Language', 'Hard', 3),
    ('What is the largest island in the world?', 'Greenland', 'Madagascar', 'Borneo', 'New Guinea', 'Greenland', 'Geography', 'Hard', 3),
    ('Who was the king of England during the American Revolution?', 'George I', 'George II', 'George III', 'George IV', 'George III', 'History', 'Hard', 3);
