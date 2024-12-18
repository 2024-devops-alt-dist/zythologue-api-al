CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	username VARCHAR(255),
	firstname VARCHAR(255),
	lastname VARCHAR(255)
);

CREATE TABLE brewery (
    brewery_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    description TEXT,
    link VARCHAR(255),
    email VARCHAR(255)
);

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE beer (
    beer_id SERIAL PRIMARY KEY,
    brewery_id INT,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    abv DECIMAL(4, 2),
    ibu INT,
    CONSTRAINT fk_brewery FOREIGN KEY(brewery_id) REFERENCES brewery(brewery_id),
    CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES category(category_id),
    CONSTRAINT abv_interval CHECK (abv >= 0 AND abv <= 20),
    CONSTRAINT ibu_interval CHECK (ibu >= 0 AND ibu <= 150)
);

CREATE TABLE photo (
    photo_id SERIAL PRIMARY KEY,
    beer_id INT NOT NULL,
    url VARCHAR(2048),
    CONSTRAINT fk_beer FOREIGN KEY(beer_id) REFERENCES beer(beer_id) ON DELETE CASCADE
);

CREATE TABLE favorite (
    favorite_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    beer_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_beer FOREIGN KEY(beer_id) REFERENCES beer(beer_id) ON DELETE CASCADE
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    user_id INT,
    beer_id INT,
    rate INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT fk_beer FOREIGN KEY(beer_id) REFERENCES beer(beer_id),
    CONSTRAINT rate_interval CHECK (rate >= 0 AND rate <= 5)
);

CREATE TABLE ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE beer_ingredient (
    beer_ingredient_id SERIAL PRIMARY KEY,
    beer_id INT,
    ingredient_id INT,
    CONSTRAINT fk_beer FOREIGN KEY(beer_id) REFERENCES beer(beer_id),
    CONSTRAINT fk_ingredient FOREIGN KEY(ingredient_id) REFERENCES ingredient(ingredient_id)
);
