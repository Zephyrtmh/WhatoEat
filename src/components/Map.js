import React, { useEffect } from "react";

function Map(props) {

    return (

        <div>
            {/* <iframe className="map-display" src= {`https://www.google.com/maps/embed/v1/search?key=AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA&q=${props.foodItem}`} width={1000} height={800} > */}
            {props.foodItem}
            {/* </iframe> */}
            
        </div>
        
    );
    
}

export default Map