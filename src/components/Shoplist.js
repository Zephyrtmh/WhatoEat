import React from 'react';
import Shop from './Shop.js';

function Shoplist(props) {
    const shopNames = props.shops.map((shop) => 
        <li key={shop}><Shop name={shop}/></li>
    );

    let className = "shoplist-hidden"

    if (props.extended === true) {
        console.log("it's extended!")
        className = "shoplist-extended"
    }

    return (
        <div className={className}>
            <ul className="shoplist-list">{shopNames}</ul>
        </div>
        
    );
}

export default Shoplist;