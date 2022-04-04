CREATE DATABASE food;

CREATE TABLE food_filters(
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR(50),
    halal BOOLEAN,
    spicy BOOLEAN,
    soup BOOLEAN,
    hot BOOLEAN,
    vegetarian BOOLEAN,
    shared BOOLEAN,
    fried BOOLEAN
);

INSERT INTO food_filters (
    food_name,
    halal,
    spicy,
    soup,
    hot,
    vegetarian,
    shared,
    fried
    )
    VALUES (
        'burgers',
        'f',
        'f',
        'f',
        't',
        'f',
        'f',
        'f'
    );

-- copy table in database as csv file in local directory
\copy food_filters TO 'C:\Users\Zephy\OneDrive\Documents\Personal\Coding\Coding Projects\WhatoEat\food_filters.csv' DELIMITER ',' CSV HEADER;

-- copy csv file into table in database (reverse of ^ command)
\copy food_filters FROM 'C:\Users\Zephy\OneDrive\Documents\Personal\Coding\Coding Projects\WhatoEat\food_filters.csv' DELIMITER ',' CSV HEADER;