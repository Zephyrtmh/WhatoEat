import React, { useContext, useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import { FoodContext } from '../Context/FoodContext';

function ListFilters(props) {

    const [filterAllList, setFilterList] = useState([]);
    const [toFilter, setToFilter] = useState(true);
    const [activeFilters, setActiveFilters] = useState({ "filters": ["soup", "halal"], "values": [false, false] });
    const [activeFilters2, setActiveFilters2] = useState({"halal": 'either'});
    const [possibleFoodItems, setPossibleFoodItems] = useState([]);


    let context = useContext(FoodContext);


    const getFilters = async () => {
        try {
            // need to add check to prevent infinite loop
            
            const response = await fetch("http://localhost:5000/filters/");
            const jsonData = await response.json();
            const filters = jsonData.map((filter) => 
            <li id={filter}><Filter filterName={filter.filter_name} toFilter={toFilter} handleFilterSelection={handleFilterSelection}/></li>
            );
            setFilterList(filters);
            let someObj = {}
            await jsonData.forEach(async (element) => {
                someObj[element.filter_name] = 'either';
                // activeFilters2[element.food_name] = 'either';
            })
            // console.log(someObj);
            setActiveFilters2(someObj);        
            
            
        } catch (err) {
            console.error(err);
        }
    };
    const setActiveFilter = () => {
        setActiveFilters2({})
    }

    const handleFilterSelection = (filterName, value) => {
        activeFilters2[filterName] = value;
        setActiveFilters2(activeFilters2);
    }

    const handleNoFilter = () => {
        setToFilter(!toFilter);
        console.log("toFilter set to "+!toFilter);
    };

    const handleSubmit = async () => {
        try {
            console.log(activeFilters2)
            const response = await fetch("http://localhost:5000/submit", { method:'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(activeFilters)});
            let resJson = response.json();
            // let foodNames = resJson.map((foodName) => console.log(foodName));
            resJson.then((data) => {
                let food_names = [];
                for (let food in data) {
                    food_names.push(data[food].food_name);
                }
                setPossibleFoodItems(food_names);
                context.setFoodItem(possibleFoodItems);
                console.log(possibleFoodItems)
            });
        } catch (err) {
            console.log(err.message)
        }
        
    }

    const foodContext = React.createContext('');

    let foodFilters = []
    

    useEffect(() => {
        getFilters();
    }, []);

    let noFilterClassName = toFilter ? "no-filter-button-unselected" : "no-filter-button-selected";

    return (
        <div id="filters-interface-container">
            <button className={noFilterClassName} onClick={handleNoFilter}>No filter</button>
            <ul id="filter-list">
                {filterAllList}
            </ul>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ListFilters