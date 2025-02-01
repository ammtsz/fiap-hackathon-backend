CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE "year" (
  id VARCHAR(10) UNIQUE PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE grade (
  id VARCHAR(10) UNIQUE PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE subject (
  id VARCHAR(10) UNIQUE PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE class (
  id VARCHAR(10) UNIQUE PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE questionnaire (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year_id VARCHAR(10) NOT NULL,
  grade_id VARCHAR(10) NOT NULL,
  subject_id VARCHAR(10) NOT NULL,
  author_id INT NOT NULL,
  content TEXT NOT NULL,
  questions_amount INT,
  FOREIGN KEY (year_id) REFERENCES "year" (id) ON DELETE CASCADE,
  FOREIGN KEY (grade_id) REFERENCES grade (id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE questionnaire_class (
  questionnaire_id INT NOT NULL,
  class_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (questionnaire_id, class_id),
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES class (id) ON DELETE CASCADE
);

CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE,
  grade_id VARCHAR(10) NOT NULL,
  class_id VARCHAR(10) NOT NULL,
  year_id VARCHAR(10) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
  FOREIGN KEY (grade_id) REFERENCES grade (id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES class (id) ON DELETE CASCADE,
  FOREIGN KEY (year_id) REFERENCES "year" (id) ON DELETE CASCADE
);

CREATE TABLE teacher_subject (
  teacher_id INT NOT NULL,
  subject_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (teacher_id, subject_id),
  FOREIGN KEY (teacher_id) REFERENCES "user" (id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE
);

CREATE TABLE teacher_grade (
  teacher_id INT NOT NULL,
  grade_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (teacher_id, grade_id),
  FOREIGN KEY (teacher_id) REFERENCES "user" (id) ON DELETE CASCADE,
  FOREIGN KEY (grade_id) REFERENCES grade (id) ON DELETE CASCADE
);

CREATE TABLE question (
  id SERIAL PRIMARY KEY,
  questionnaire_id INT NOT NULL,
  question TEXT NOT NULL,
  answer BOOLEAN NOT NULL,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  questionnaire_id INT NOT NULL,
  question_id INT NOT NULL,
  user_id INT NOT NULL,
  answer BOOLEAN,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE
);

CREATE TABLE student_questionnaire (
  user_id INT NOT NULL,
  questionnaire_id INT NOT NULL,
  PRIMARY KEY (user_id, questionnaire_id),
  FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE,
  FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id) ON DELETE CASCADE,
  subject_id VARCHAR(10) NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE CASCADE,
  score VARCHAR(10) NOT NULL,
  date TIMESTAMP NOT NULL
);

INSERT INTO "user" (name, role, password, email) VALUES
('John Doe', 'teacher', 'password123', 'john.doe@example.com'),
('Jane Smith', 'teacher', 'password123', 'jane.smith@example.com'),
('Alice Johnson', 'teacher', 'password123', 'alice.johnson@example.com'),
('Bob Brown', 'student', 'password123', 'bob.brown@example.com'),
('Carlos Silva', 'teacher', 'password123', 'carlos.silva@example.com'),
('Maria Oliveira', 'teacher', 'password123', 'maria.oliveira@example.com'),
('Pedro Santos', 'student', 'password123', 'pedro.santos@example.com'),
('Ana Costa', 'student', 'password123', 'ana.costa@example.com'),
('Lucas Pereira', 'teacher', 'password123', 'lucas.pereira@example.com'),
('Fernanda Lima', 'teacher', 'password123', 'fernanda.lima@example.com'),
('Rafael Souza', 'student', 'password123', 'rafael.souza@example.com'),
('Juliana Rocha', 'student', 'password123', 'juliana.rocha@example.com'),
('Gabriel Almeida', 'teacher', 'password123', 'gabriel.almeida@example.com'),
('Larissa Mendes', 'teacher', 'password123', 'larissa.mendes@example.com'),
('Bruno Ferreira', 'student', 'password123', 'bruno.ferreira@example.com'),
('Camila Souza', 'student', 'password123', 'camila.souza@example.com'),
('Daniel Costa', 'student', 'password123', 'daniel.costa@example.com'),
('Elisa Martins', 'student', 'password123', 'elisa.martins@example.com'),
('Felipe Lima', 'student', 'password123', 'felipe.lima@example.com'),
('Gabriela Rocha', 'student', 'password123', 'gabriela.rocha@example.com'),
('Henrique Alves', 'student', 'password123', 'henrique.alves@example.com'),
('Isabela Mendes', 'student', 'password123', 'isabela.mendes@example.com'),
('João Pereira', 'student', 'password123', 'joao.pereira@example.com'),
('Karina Silva', 'student', 'password123', 'karina.silva@example.com'),
('Leonardo Santos', 'student', 'password123', 'leonardo.santos@example.com'),
('Mariana Oliveira', 'student', 'password123', 'mariana.oliveira@example.com'),
('Nicolas Ribeiro', 'student', 'password123', 'nicolas.ribeiro@example.com'),
('Olivia Costa', 'student', 'password123', 'olivia.costa@example.com'),
('Paulo Fernandes', 'student', 'password123', 'paulo.fernandes@example.com'),
('Quintino Gomes', 'student', 'password123', 'quintino.gomes@example.com'),
('Renata Almeida', 'student', 'password123', 'renata.almeida@example.com'),
('Sofia Lima', 'student', 'password123', 'sofia.lima@example.com'),
('Thiago Barbosa', 'student', 'password123', 'thiago.barbosa@example.com'),
('Vanessa Cardoso', 'student', 'password123', 'vanessa.cardoso@example.com');

INSERT INTO "year" (id, label) VALUES
('2024', '2024'),
('2025', '2025'),
('2026', '2026');

INSERT INTO grade (id, label) VALUES
('8EF', '8º Ano - EF'),
('9EF', '9º Ano - EF'),
('1EM', '1º Ano - EM'),
('2EM', '2º Ano - EM'),
('3EM', '3º Ano - EM');

INSERT INTO subject (id, label) VALUES
('PORT', 'Português'),
('MAT', 'Matemática'),
('HIS', 'História'),
('GEO', 'Geografia'),
('BIO', 'Biologia'),
('CIE', 'Ciências'),
('FIS', 'Física');

INSERT INTO class (id, label) VALUES
('A', 'Turma A'),
('B', 'Turma B'),
('C', 'Turma C');

INSERT INTO teacher_subject (teacher_id, subject_id) VALUES
(1, 'MAT'), (1, 'CIE'),
(2, 'MAT'), (2, 'BIO'), (2, 'FIS'),
(3, 'PORT'), (3, 'HIS'), (3, 'GEO'),
(5, 'HIS'), (5, 'GEO'),
(6, 'BIO'),
(9, 'FIS'),
(10, 'PORT'),
(13, 'MAT'),
(14, 'HIS'), (14, 'PORT');

INSERT INTO teacher_grade (teacher_id, grade_id) VALUES
(1, '8EF'), (1, '9EF'),
(2, '8EF'), (2, '9EF'),
(3, '8EF'), (3, '9EF'),
(5, '1EM'), (5, '2EM'),
(6, '1EM'), (6, '2EM'), (6, '3EM'),
(9, '1EM'), (9, '2EM'), (9, '3EM'),
(10, '1EM'), (10, '2EM'), (10, '3EM'),
(13, '1EM'), (13, '2EM'), (13, '3EM'),
(14, '2EM'), (14, '3EM');

INSERT INTO student (user_id, grade_id, class_id, year_id) VALUES
(4, '8EF', 'A', '2024'),
(7, '9EF', 'A', '2024'),
(8, '8EF', 'A', '2025'),
(11, '8EF', 'B', '2025'),
(12, '8EF', 'C', '2025'),
(15, '8EF', 'A', '2025'),
(16, '8EF', 'A', '2025'),
(17, '9EF', 'A', '2025'),
(18, '9EF', 'B', '2025'),
(19, '9EF', 'C', '2025'),
(20, '9EF', 'A', '2025'),
(21, '1EM', 'A', '2025'),
(22, '1EM', 'B', '2025'),
(23, '1EM', 'C', '2025'),
(24, '1EM', 'A', '2025'),
(25, '1EM', 'A', '2025'),
(26, '2EM', 'A', '2025'),
(27, '2EM', 'A', '2025'),
(28, '2EM', 'B', '2025'),
(29, '2EM', 'B', '2025'),
(30, '3EM', 'A', '2025'),
(31, '3EM', 'A', '2025'),
(32, '3EM', 'A', '2025'),
(33, '3EM', 'B', '2025'),
(34, '3EM', 'B', '2025');

INSERT INTO questionnaire (title, year_id, grade_id, subject_id, author_id, content, questions_amount) VALUES
('Teste de Geometria', '2025', '8EF', 'MAT', 1, 'Math questions content...', 4),
('Quiz - História do Brasil', '2025', '9EF', 'HIS', 3, 'History questions content...', 2);

INSERT INTO questionnaire_class (questionnaire_id, class_id) VALUES
(1, 'A'),
(1, 'B'),
(1, 'C'),
(2, 'A'),
(2, 'B');

INSERT INTO question (questionnaire_id, question, answer) VALUES
(1, '2+2=4?', true),
(1, '3+3=6?', true),
(1, '2+2=5?', false),
(1, '3+3=4?', false),
(2, 'A independência do Brasil foi proclamada por Dom Pedro I em 7 de setembro de 1822.', true),
(2, 'A abolição da escravatura no Brasil ocorreu em 1888, com a assinatura da Lei Áurea pela Princesa Isabel.', true);

INSERT INTO answers (questionnaire_id, question_id, user_id, answer) VALUES
(1, 1, 8, true), (1, 2, 8, true), (1, 3, 8, true), (1, 4, 8, true), 
(1, 1, 11, true), (1, 2, 11, true), (1, 3, 11, false), (1, 4, 11, false);

INSERT INTO student_questionnaire (user_id, questionnaire_id, subject_id, score, date) VALUES
(8, 1, 'MAT', '5', '2025-01-01 10:00:00'),
(11, 1, 'MAT', '10', '2025-01-02 11:00:00');
