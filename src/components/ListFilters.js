import React, { useContext, useEffect, useState } from 'react';
import Filter from './Filter';
import { FoodContext } from '../Context/FoodContext';

function ListFilters(props) {

    const [filterAllList, setFilterList] = useState([]);
    const [toFilter, setToFilter] = useState(true);
    const [activeFilters, setActiveFilters] = useState({ "filters": ["soup", "halal"], "values": [false, false] });
    const [possibleFoodItems, setPossibleFoodItems] = useState([])


    let context = useContext(FoodContext);

    const getFilters = async () => {
        try {
            const response = await fetch("http://localhost:5000/filters/");
            const jsonData = await response.json();
            const filters = jsonData.map((filter) => 
            <li id={filter}><Filter filterName={filter.filter_name} toFilter={toFilter}/></li>
            );
            setFilterList(filters);
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleNoFilter = () => {
        setToFilter(!toFilter);
        console.log("toFilter set to"+!toFilter);
    }

    const handleSubmit = async () => {
        try {
            // console.log(activeFilters)
            const response = await fetch("http://localhost:5000/submit", { method:'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(activeFilters)});
            let resJson = response.json();
            // let foodNames = resJson.map((foodName) => console.log(foodName));
            resJson.then((data) => {
                let food_names = [];
                for (let food in data) {
                    food_names.push(data[food].food_name);
                }
                setPossibleFoodItems(food_names);
                
                console.log(context);
                context.setFoodItem(possibleFoodItems);
            });
        } catch (err) {
            console.log(err.message)
        }
        
    }

    const foodContext = React.createContext('');

    

    useEffect(() => {
        getFilters();
    });

    let noFilterClassName = toFilter ? "no-filter-button-unselected" : "no-filter-button-selected"

    return (
        <div id="filters-interface-container">
            <p>something {props.something}</p>
            <button className={noFilterClassName} onClick={handleNoFilter}>No filter</button>
            <ul id="filter-list">
                {filterAllList}
            </ul>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ListFilters