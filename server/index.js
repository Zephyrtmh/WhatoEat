const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const format = require('pg-format')

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//get all food choices
app.get("/food", async (req, res) => {
    try {
        const allFood = await pool.query("SELECT food_name FROM food_filters");
        res.json(allFood.rows);
    } catch (err) {
        console.log(err.message);
    }
    
    //
    //res.json(allFood.rows[0])
});

//get one food choice
app.get("/food/:id", async (req, res) => {
    try {
        // console.log(req.params.id)
        //const id = req.params.id
        const { id } = req.params;
        // console.log(req.params)
        const food = await pool.query("SELECT * FROM food_filters WHERE food_id = $1", [id]);
        res.json(food.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get filters for one food choice
app.get("/food/:id/:filter", async (req, res) => {
    try {
        const { id, filter } = req.params;

        const query = format("SELECT %I FROM food_filters WHERE food_id=%s", filter, id)
        const food = await pool.query(query);
        res.json(food.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});