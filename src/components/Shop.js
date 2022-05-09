import React from 'react';

function Shop(props) {
    let openStatus = '';
    if (props.details['opening_hours']) {
        openStatus = props.details['opening_hours']['open_now'] ? "open" : "closed";
    } else {
        openStatus = "no info";
    }
    let shopRatings;
    if (props.details['user_ratings_total'] == 0) {
        shopRatings = <p>No reviews</p>
    } else {
        shopRatings = <p className="shop-ratings">Ratings: {props.details['rating']}/5 ({props.details['user_ratings_total']})</p>
    }
    console.log(props.details['name']);
    // let isOpenJson = JSON.parse(props.details['opening_hours'])
    // let isOpen = isOpenJson['open_now']
    // const openStatus = isOpen ? "open" : "closed";
    // console.log(isOpen);
    return (
        <div className="shopgrid">
            <h4 className="shopName">{props.name}</h4>
            {shopRatings}
            <p className="shop-address">{props.details['vicinity']}</p>
            <p>{openStatus}</p>
        </div>
    );
}

export default Shop;