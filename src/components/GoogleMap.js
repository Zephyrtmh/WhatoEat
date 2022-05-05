import React, { useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, Size } from "google-maps-react";

function GoogleMap(props) {
    console.log(props.location)
    const style = {
        height: '100%',
        width: '100%'
    };
    

    const createMarkers = () => {
        const markers = props.places.map((shop)=> 
        <Marker 
        position={shop['geometry']['location']} 
        name={shop['name']}
        icon={{
            "url": require("../resources/images/marker.png"),
            "scaledSize": new props.google.maps.Size(64,64)
        }} />
        );
        return markers
    }

    

    return (
        
        <div>
            
            <Map google={props.google} initialCenter={props.location} zoom={16} style={style} streetViewControl={false} fullscreenControl={false} mapTypeControl={false}>
                {/* Maker for currect location */}
                <Marker />
                {/* {props.places.map(
                    shop => <Marker 
                    position={shop['geometry']['location']} 
                    name={shop['name']} 
                    icon={{
                        "url": require("../resources/images/marker.png"),
                        "scaledSize": new props.google.maps.Size(64,64)
                    }} />
                )} */}
                {createMarkers()}
            </Map>
            
        </div>
        
    );
    
}

export default GoogleApiWrapper({
    apiKey: ""
    // AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA
})(GoogleMap)