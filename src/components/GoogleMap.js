import React, { useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

function GoogleMap(props) {
    console.log(props.location)
    const location = {"lat": 40.854885, "lng": -88.081807};
    const style = {
        height: '100%',
        width: '100%'};

    const markers = props.places.map((shop)=> 
        <Marker 
        position={shop['geometry']['location']} 
        name={shop['name']} />
    );

    return (
        
        <div>
            {/* <iframe className="map-display" src= {`https://www.google.com/maps/embed/v1/search?key=AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA&q=${props.foodItem}`} width={1000} height={800} > */}
            {/* {props.foodItem} */}
            {/* </iframe> */}
            
            <Map google={props.google} initialCenter={props.location} zoom={16} style={style}>
                <Marker />
                {markers}
            </Map>
            
        </div>
        
    );
    
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA"
})(GoogleMap)