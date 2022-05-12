CREATE DATABASE food;

CREATE TABLE food_items(
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

CREATE TABLE food_filters(
    filter_id SERIAL PRIMARY KEY,
    filter_name VARCHAR(50)
);

INSERT INTO food_filters(
    filter_name
    )
    VALUES (
        'spicy'
);

INSERT INTO food_items (
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
\copy food_filters TO 'C:\Users\Ionicon\Documents\Zepyhyr\Code\WhatoEat\food_filters.csv' DELIMITER ',' CSV HEADER;

-- copy csv file into table in database (reverse of ^ command)
\copy food_filters FROM '\food_filters.csv' DELIMITER ',' CSV HEADER;

SELECT food_name 
FROM food_items
WHERE halal = false
AND spicy = true
AND soup = true;