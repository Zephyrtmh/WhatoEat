import React, { useEffect, useState } from 'react';
import { filterShops } from '../utils/utils.js';
import Shop from './Shop.js';

function Shoplist(props) {

    const [activeShops, setActiveShops] = useState([]);
    const [distanceFilter, setDistanceFilter] = useState("shoplist-filter-button-unselected");
    const [ratingFilter, setRatingFilter] = useState("shoplist-filter-button-unselected")

    const onDistanceSortClick = () => {
        console.log("Distance filter clicked")
        props.handleSortButton("distance")
    }

    const onRatingSortClick = () => {
        console.log("Rating filter clicked")
        props.handleSortButton("rating")
    }
    
    const shopNames = props.shops.map((shop) => 
        <li key={shop['place_id']}><Shop name={shop['name']} details ={shop}/></li>
    );

    let extended = "shoplist-hidden"
    
    if (props.extended === true) {
        extended = "shoplist-extended"

    }

    let hideFilter = "shoplist-filter-container"
    if (extended === "shoplist-extended" && props.shops.length == 0) {
        hideFilter = "shoplist-filter-container-hidden"
    }

    useEffect(() => {
        setActiveShops(props.shops)
        console.log(activeShops)
    });

    
    return (
        <div className={extended}>

            {props.shops.length==0 ?

            <p>No shops loaded.</p> : 

            <div className={hideFilter}>
                <p>Sort by: </p>
                <button className={ratingFilter} onClick = {onRatingSortClick}>Rating</button>
                <button className={distanceFilter} onClick = {onDistanceSortClick}>Distance</button>
            </div>
            }
            

            <ul className="shoplist-list">{shopNames}</ul>
            
        </div>
        
    );
}

export default Shoplist;