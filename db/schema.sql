DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS media;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    profile_pic VARCHAR(300),
    bio VARCHAR(1000),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id),
    reciever_id INT REFERENCES users(id),
    status INT DEFAULT 1,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media(
    id SERIAL PRIMARY KEY,
    userid INT NOT NULL UNIQUE,
    spotifyurl VARCHAR(300),
    youtubeurl VARCHAR(600),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
