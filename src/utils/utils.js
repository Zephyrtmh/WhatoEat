export function random_food() {
    const food = ["chicken rice", "laksa", "prata", "pasta", "cai fan", "thai food", "KBBQ", "ramen", "mala xiang guo", "yong tau foo"]
    const randInt = Math.floor(Math.random()*food.length)
    const choice = food[randInt]
    console.log(choice)
    return choice
}