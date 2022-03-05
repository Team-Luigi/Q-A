DROP DATABASE IF EXISTS qna;
CREATE DATABASE qna;
\c qna;
DROP TABLE IF EXISTS question_list, answer_list, photos;

CREATE TABLE question_list (
 id BIGSERIAL,
 product_id INTEGER,
 body VARCHAR(1000),
 date_written BIGINT,
 asker_name VARCHAR(50),
 asker_email VARCHAR(50),
 reported BOOLEAN,
 helpful INTEGER
);


ALTER TABLE question_list ADD CONSTRAINT question_list_pkey PRIMARY KEY (id);

CREATE TABLE answer_list (
 id BIGSERIAL,
 question_id INTEGER,
 body VARCHAR(1000),
 date_written BIGINT,
 answerer_name VARCHAR(50),
 answerer_email VARCHAR(50),
 reported INTEGER,
 helpful INTEGER
);


ALTER TABLE answer_list ADD CONSTRAINT answer_list_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL,
 answer_id INTEGER,
 url VARCHAR(500)
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answer_list ADD CONSTRAINT answer_list_question_id_fkey FOREIGN KEY (question_id) REFERENCES question_list(id);
ALTER TABLE photos ADD CONSTRAINT photos_answer_id_fkey FOREIGN KEY (answer_id) REFERENCES answer_list(id);