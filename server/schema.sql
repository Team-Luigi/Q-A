CREATE TABLE Question List (
 id BIGSERIAL,
 product_id INTEGER,
 question_id INTEGER,
 body VARCHAR(1000),
 date TIMESTAMP,
 name VARCHAR(50),
 helpful INTEGER,
 reported BOOLEAN,
 UNIQUE (product_id, question_id)
);


ALTER TABLE Question List ADD CONSTRAINT Question List_pkey PRIMARY KEY (id);

CREATE TABLE Answer List (
 id BIGSERIAL,
 answer_id INTEGER,
 body VARCHAR(1000),
 date TIMESTAMP,
 name VARCHAR(50),
 helpful INTEGER,
 id_Question List INTEGER,
 UNIQUE (answer_id)
);


ALTER TABLE Answer List ADD CONSTRAINT Answer List_pkey PRIMARY KEY (id);

CREATE TABLE Photos (
 id BIGSERIAL,
 url VARCHAR(100),
 photo_id INTEGER,
 id_Answer List INTEGER,
 UNIQUE (photo_id)
);


ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (id);

ALTER TABLE Answer List ADD CONSTRAINT Answer List_id_Question List_fkey FOREIGN KEY (id_Question List) REFERENCES Question List(id);
ALTER TABLE Photos ADD CONSTRAINT Photos_id_Answer List_fkey FOREIGN KEY (id_Answer List) REFERENCES Answer List(id);