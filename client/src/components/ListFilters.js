import React, { useContext, useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import { FoodContext } from '../Context/FoodContext';
import { random_food, convertFiltersFormat } from '../utils/utils';

function ListFilters(props) {

    const [filterAllList, setFilterList] = useState([]);
    const [toFilter, setToFilter] = useState(true);
    const [activeFilters, setActiveFilters] = useState({"halal": 'either'});


    let context = useContext(FoodContext);




    const handleFilterSelection = (filterName, value) => {
        activeFilters[filterName] = value;
        setActiveFilters(activeFilters);
    }

    const handleNoFilter = () => {
        setToFilter(!toFilter);
        console.log("toFilter set to "+!toFilter);
    };

    const handleSubmit = async () => {
        try {
            const convertedActiveFilters = convertFiltersFormat(activeFilters);
            const response = await fetch("/submit", { method:'POST', headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, body: JSON.stringify(convertedActiveFilters)});
            let resJson = response.json();
            // let foodNames = resJson.map((foodName) => console.log(foodName));
            await resJson.then((data) => {
                let food_names = [];
                for (let food in data) {
                    food_names.push(data[food].food_name);
                }
                let rand_food = random_food(food_names);
                console.log(food_names);
                console.log(rand_food);
                random_food(food_names).then((food) => {
                    context.setFoodItem(food);
                })
            
            });
        } catch (err) {
            console.log(err.message)
        }
        
    }

    const foodContext = React.createContext('');

    let foodFilters = []
    

    useEffect(() => {
        const getFilters = async () => {
            try {
                // need to add check to prevent infinite loop
                
                const response = await fetch("/filters");
                const jsonData = await response.json();
                const filters = jsonData.map((filter) => 
                <li id={filter}><Filter filterName={filter.filter_name} toFilter={toFilter} handleFilterSelection={handleFilterSelection}/></li>
                );
                setFilterList(filters);
                let someObj = {}
                await jsonData.forEach(async (element) => {
                    someObj[element.filter_name] = 'either';
                    // activeFilters[element.food_name] = 'either';
                })
                // console.log(someObj);
                setActiveFilters(someObj);        
                
                
            } catch (err) {
                console.error(err);
            }
        };
        getFilters();
    }, [toFilter]);

    let noFilterClassName = toFilter ? "no-filter-button-unselected" : "no-filter-button-selected";

    return (
        <div id="filters-interface-container">
            <button className={noFilterClassName} onClick={handleNoFilter}>Remove filters</button>
            <ul id="filter-list">
                {filterAllList}
            </ul>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ListFilters