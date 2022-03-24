import React from 'react';
import Shop from './Shop.js';

function Shoplist(props) {
    const shopNames = props.shops.map((shop) => 
        <li key={shop}><Shop name={shop}/></li>
    );
    console.log(shopNames)
    return (
        <div>
            <ul className="shoplist">{shopNames}</ul>
        </div>
        
    );
}

export default Shoplist;