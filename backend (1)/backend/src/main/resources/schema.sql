CREATE TABLE IF NOT EXISTS movies (
    id BIGINT NOT NULL AUTO_INCREMENT,
    preview_img_path LONGBLOB NOT NULL,
    bg_img_path LONGBLOB NOT NULL,
    trailer VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    release_year INT NOT NULL,
    length VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS seats(
    id BIGINT NOT NULL AUTO_INCREMENT,
    row_number VARCHAR(255) NOT NULL,
    column_number INT NOT NULL,
    is_occupied BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id)
    );
CREATE TABLE IF NOT EXISTS favorite_movies (
    user_id VARCHAR(255),  -- This is the Keycloak user ID
    movie_id BIGINT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tickets(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    movie_id BIGINT,
    user_id VARCHAR(255), --This is the keycloak user ID
    selected_seats BIGINT,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);
