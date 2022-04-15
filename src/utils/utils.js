export function random_food(foodChoices=["chicken rice", "laksa", "prata", "pasta", "cai fan", "thai food", "KBBQ", "ramen", "mala xiang guo", "yong tau foo"]) {
    const randInt = Math.floor(Math.random()*foodChoices.length)
    const choice = foodChoices[randInt]
    return choice
}