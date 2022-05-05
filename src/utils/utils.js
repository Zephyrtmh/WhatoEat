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

export function filterShops(filterBy, shopsList) {
    shopsList.sort((first, second) => {
        return second[filterBy] - first[filterBy]
    })
    console.log("new list")
    console.log(shopsList)
    return shopsList
}