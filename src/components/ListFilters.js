import React, { useEffect, useState } from 'react';
import Filter from './Filter';

function ListFilters() {

    const [filterList, setFilterList] = useState([])

    const getFilters = async () => {
        try {
            const response = await fetch("http://localhost:5000/filters/");
            const jsonData = await response.json();
            const filters = jsonData.map((filter) => 
            <li id={filter}><Filter filter={filter.filter_name}/></li>
            );
            setFilterList(filters)
            
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getFilters();
    });

    return (
    
        <div>
            <ul id="filter-list">
                {filterList}
            </ul>
        </div>
    )
}

export default ListFilters