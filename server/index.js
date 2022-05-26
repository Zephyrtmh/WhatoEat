const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const format = require('pg-format');
const https = require("https");
const axios = require('axios');

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//get all food choices
app.get("/food", async (req, res) => {
    try {
        const allFood = await pool.query("SELECT food_name FROM food_items");
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
        const { id } = req.params;
        const food = await pool.query("SELECT * FROM food_items WHERE food_id = $1", [id]);
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//get specific columns or filters for one food choice
app.get("/food/:id/:filter", async (req, res) => {
    try {
        const { id, filter } = req.params;

        const query = format("SELECT %I FROM food_items WHERE food_id=%s", filter, id)
        const food = await pool.query(query);
        res.json(food.rows);
    } catch (err) {
        console.log(err.message);
    }
});

//get food names based on filters
app.post("/submit", async (req, res) => {
    // format of req data
    // {
    //     "filters": ["soup", "halal", "spicy"],
    //     "values": [true, false, true]
    // }
    let query = ''
    try {
        if (typeof req.body.filters === 'undefined' || req.body.filters.length == 0) {
            query = "SELECT food_name FROM food_items";
        } else {
            query = "SELECT food_name FROM food_items WHERE ";
            const body = req.body;
            const filters = body.filters;
            const values = body.values;
    
            query += `${filters.shift()} = ${values.shift()}`
    
            if (filters.length > 0) {
                for (let [i, filter] of filters.entries()) {
                    query += ` AND ${filter} = ${values[i]}`;
                }
            }
        }

        
        query += ";"
        food_names = await pool.query(query);
        console.log("foodnames: ", food_names.rows)
        res.json(food_names.rows);
        
    } catch (err) {
        console.log(err.message)
    }
    
});

//get food filters
app.get("/filters", async (req, res) => {
    try {
        const allFilters = await pool.query("SELECT filter_name FROM food_filters")
        res.json(allFilters.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// //get maps iframe from google maps API 
// app.get("/map/:q", async (req, res) => {
//     try {
//         const { q } = req.params;
//         const google = "www.google.com/"
//         res = https.get(`https://www.google.com/maps/embed/v1/search?key=AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA&q=chickenrice`)
        
//         console.log(res)
//     } catch (err) {
//         console.log(err.message)
//     }
// })

app.post("/places", async (req, res) => {
    try {
        console.log("query received")
        let search = req.body.search
        console.log(req.body)
        console.log(search)
        
        let lat = req.body.lat;
        let lng = req.body.lng;
        console.log(lat, lng)
        let apiKey = "AIzaSyAYUkXE4WVRZmuwvNq-A7ecU5RYyuL-2IE";
        let httpLink = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${search}
        &location=${lat}%2C${lng}
        &type=restaurant
        &radius=1500
        &key=${apiKey}
        `
        console.log(httpLink)
        axios.get(httpLink)
        .then((response) => {
            
            const data = response.data
            const places = data.results
            res.json(places)
            
        }, (error) => {
            console.error(error);
        });

    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});