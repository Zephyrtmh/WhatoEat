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
        console.log("marker clicked");
        console.log(marker);
        setActiveMarker(marker);
        if (props.shop) {
            setActiveShop(props.shop)
        } else {
            setActiveShop({"name":"Your location"})
        }
    }

    function handleMarkerDragEnd(props, marker, e) {
        console.log(e.latLng.lat(), e.latLng.lng())
        props.setCurrLoc( { "lat": e.latLng.lat(), "lng": e.latLng.lng() })
    }

    const createMarkers = () => {
        const markers = props.places.map((shop)=> 
        <Marker 
        onClick={onMarkerClick}
        position={shop['geometry']['location']} 
        title={shop['name']} 
        name={shop['name']}
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
            
            <Map 
            google={props.google} 
            initialCenter= {props.location.lat != '' ? props.location : {"lat": 1.3521, "lng": 103.8198}} 
            zoom={16} 
            style={style} 
            streetViewControl={false} 
            fullscreenControl={false} 
            mapTypeControl={false}>
                {/* Marker for currect location */}
                <Marker 
                onClick={onMarkerClick} 
                draggable={true} 
                position={props.mapCenter} 
                onDragend={handleMarkerDragEnd} 
                setCurrLoc={props.setCurrLoc}>
                    <InfoWindow visible={true} position={props.mapCenter}>
                        <div>
                            <p>Drag me to your location or enable location access!</p>
                        </div>
                    </InfoWindow>
                </Marker>
                
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
    apiKey: process.env.REACT_APP_API_KEY
    // AIzaSyCopFWv0YMtXgVgDtt5ujO_v_3xbPV-LCA
})(GoogleMap)