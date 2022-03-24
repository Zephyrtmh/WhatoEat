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
        'laksa',
        'f',
        't',
        't',
        't',
        'f',
        'f',
        'f'
    );