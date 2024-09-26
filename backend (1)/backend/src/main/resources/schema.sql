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
    is_active BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);
