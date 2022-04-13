import React, { useEffect, useState } from 'react';
import Filter from './Filter';

function ListFilters() {

    const [filterList, setFilterList] = useState([]);
    const [toFilter, setToFilter] = useState(true);

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

    useEffect(() => {
        getFilters();
    });

    let noFilterClassName = toFilter ? "no-filter-button-unselected" : "no-filter-button-selected"

    return (
        <div id="filters-interface-container">
            <button className={noFilterClassName} onClick={handleNoFilter}>No filter</button>
            <ul id="filter-list">
                {filterList}
            </ul>
        </div>
    )
}

export default ListFilters