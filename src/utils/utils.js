export function random_food(foodChoices=["chicken rice", "laksa", "prata", "pasta", "cai fan", "thai food", "KBBQ", "ramen", "mala xiang guo", "yong tau foo"]) {
    const randInt = Math.floor(Math.random()*foodChoices.length)
    const choice = foodChoices[randInt]
    return choice
}

export function convertFiltersFormat(filters) {
    //example format of input:
    // {
    //     fried: "yes"
    //     halal: "either"
    //     hot: "either"
    //     shared: "yes"
    //     soup: "either"
    //     spicy: "either"
    //     vegetarian: "either"
    // }

    //example format of output:
    // format of req data
    // {
    //     "filters": ["soup", "halal", "spicy"],
    //     "values": [true, false, true]
    // }
    
    for (let key of Object.keys(filters)) {
        if (filters[key] === 'either') {
            delete filters[key];
        }
    }
    return {"filters": Object.keys(filters), "values": Object.values(filters)}
}

export async function getPlaces(keyword, lat, lng) {
    try {
        let req = {"search": keyword, "lat": lat, "lng": lng}
        // console.log(req)
        const response = await fetch("http://localhost:5000/places", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(req)});
        const body = await response.json()
        let places = []
        for (let place in body) {
            places.push(body[place])
        }
        console.log(places)
        return places
    }
    catch (err) {
        console.error(err.message)
    }
    
}

export function filterShops(filterBy="default", shopsList, currLoc) {
    switch(filterBy) {
        case "default":
            console.log("filter shops by default")
            break;

        case "rating":
            console.log("filter shops by ratings")
            shopsList.sort((first, second) => {
                return second["rating"] - first["rating"]
            })
            console.log("new list")
            console.log(shopsList)
            break;

        case "distance":
            console.log("filter shops by distance")
            console.log(currLoc)
            shopsList.sort((first, second) => {
                console.log(second['geometry']['location'], first['geometry']['location'])
                let dist2 = calcDist(currLoc, second['geometry']['location']);
                let dist1 = calcDist(currLoc, first['geometry']['location']);
                console.log(dist2, dist1)
                return dist1 - dist2
            })
            console.log("new list")
            console.log(shopsList)
            break;
    } 
    
    return shopsList
}



export function calcDist(curr, dest) {
    let currLat = curr.lat;
    let currLng = curr.lng;
    let destLat = dest.lat;
    let destLng = dest.lng;
    //convert to Radians
    currLat = currLat/(180/Math.PI);
    destLat = destLat/(180/Math.PI);
    currLng = currLng/(180/Math.PI);
    destLng = destLng/(180/Math.PI);

    const diffLat = destLat - currLat;
    const diffLng = destLng - currLng;
    //radius of Earth in KM = 6371
    //Very loooooong formula to calculate distance that I definitely did not google for
    const distance = 6371 * 2* Math.asin(Math.sqrt(Math.pow(Math.sin(diffLat/2),2) + Math.cos(currLat) * Math.cos(destLat) * Math.pow(Math.sin(diffLng / 2), 2)));
    return distance
}   