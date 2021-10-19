DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS songs;

CREATE TABLE genres (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    genre TEXT NOT NULL
);

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    genre_id BIGINT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

INSERT INTO genres (genre)
VALUES ('magic city'), ('battle');

INSERT INTO songs (title, url, genre_id)
VALUES ('track1', 'https://www.youtube.com/watch?v=K1vUA9NltVw', '1'), ('track2', 'https://www.youtube.com/watch?v=DFppStNpssI&list=PLvTniKF5s36przsVOM4vxKSfZRMz7kP7c&index=1', '2'), ('track3', 'https://www.youtube.com/watch?v=F7ifBaPNmz4&list=PLvTniKF5s36przsVOM4vxKSfZRMz7kP7c&index=8', '2')