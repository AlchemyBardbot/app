DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS songs;

CREATE TABLE genres (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    genre TEXT NOT NULL
);

INSERT INTO genres (genre)
VALUES ('magic town'), ('battle'), ('tavern'), ('town'), ('travel');

CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    genre_id BIGINT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

`
INSERT INTO songs (title, url, genre_id)
VALUES 
('fantasy village', 'https://www.youtube.com/watch?v=K1vUA9NltVw', '1'), 
('elven tree city', 'https://www.youtube.com/watch?v=DO26ygk7rcU', '1'), 
('wizards tower', 'https://www.youtube.com/watch?v=TRKoQHRKKis', '1'),
('general combat', 'https://www.youtube.com/watch?v=pGw2ztHACxA', '2'), 
('desert combat', 'https://www.youtube.com/watch?v=0tfGjnV7g9U', '2'), 
('icy combat', 'https://www.youtube.com/watch?v=hEQThgfXT30', '2'),
('pub chatter with music', 'https://www.youtube.com/watch?v=EIuV7qGXmpk', '3'), 
('music only', 'https://www.youtube.com/watch?v=tNZXDUZu2To', '3'), 
('irish pub chatter with music', 'https://www.youtube.com/watch?v=s0dNpS0AAMQ', '3'),
('main square music only', 'https://www.youtube.com/watch?v=CBQshTNwP5w', '4'),
('coastal village with music', 'https://www.youtube.com/watch?v=iNPzc932cs8', '4'),
('ambient village with fauna sounds', 'https://www.youtube.com/watch?v=xFjpTF4-PgI', '4'),
('exciting new adventure', 'https://www.youtube.com/watch?v=x5l4Cc9TCC8', '5'),
('plains adventure with fauna sounds', 'https://www.youtube.com/watch?v=s9UdWnO4W4k', '5'),
('forest adventure', 'https://www.youtube.com/watch?v=JixpQ5o90Jg', '5');
`