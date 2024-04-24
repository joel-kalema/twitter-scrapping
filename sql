CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    content TEXT,
    image_url TEXT,
    video_url TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
