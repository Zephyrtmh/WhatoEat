export function random_food(foodChoices=["chicken rice", "laksa", "prata", "pasta", "cai fan", "thai food", "KBBQ", "ramen", "mala xiang guo", "yong tau foo"]) {
    const randInt = Math.floor(Math.random()*foodChoices.length)
    const choice = foodChoices[randInt]
    return choice
}

export function convertFilters(filters) {
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



    }