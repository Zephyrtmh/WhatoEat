import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper, Size } from "google-maps-react";

function GoogleMap(props) {
    console.log(props.location)
    const style = {
        height: '100%',
        width: '100%'
    };
    
    const [activeMarker, setActiveMarker] = useState('')
    const [activeShop, setActiveShop] = useState('')

    function onMarkerClick(props, marker, e) {
        console.log("marker clicked")
        setActiveMarker(marker)
        if (props.shop) {
            setActiveShop(props.shop)
        } else {
            setActiveShop({"name":"Your location"})
        }
        
        console.log(props.shop.name)
    }

    const createMarkers = () => {
        const markers = props.places.map((shop)=> 
        <Marker 
        onClick={onMarkerClick}
        position={shop['geometry']['location']} 
        title={shop['name']}
        icon={{
            "url": require("../resources/images/marker.png"),
            "scaledSize": new props.google.maps.Size(64,64)
        }}
        // add shop details as prop into marker
        shop={shop} />
        
        );
        return markers
    }

    

    return (
        
        <div>
            
            <Map google={props.google} initialCenter={props.location} zoom={16} style={style} streetViewControl={false} fullscreenControl={false} mapTypeControl={false}>
                {/* Marker for currect location */}
                <Marker onClick={onMarkerClick}/>
                
                {/* Markers for shops in shopslist */}
                {createMarkers()}
                <InfoWindow visible={true} marker={activeMarker}>
                    <div className="info-window">
                        <p>{activeShop.name}</p>
                    </div>
                </InfoWindow>
            </Map>
            
        </div>
        
    );
    
}

export default GoogleApiWrapper({
    apiKey: ""
    // AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA
})(GoogleMap)