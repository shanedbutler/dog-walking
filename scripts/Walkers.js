import { getCities, getPets, getWalkerCities, getWalkers } from "./database.js"

const walkerCities = getWalkerCities()
const cities = getCities()
const walkers = getWalkers()
const pets = getPets()


export const findCities = (walker) => {
    let cityAssignments = []

    for (const city of walkerCities) {
        if (city.walkerId === walker.id) {
            cityAssignments.push(city)  
        }
    }

    return cityAssignments
}

export const assignCityNames = (assignments) => {
    let citiesString = null

    for (const assignment of assignments) {
        for (const city of cities) {
            if (city.id === assignment.cityId && !citiesString) {
                citiesString = ` ${city.name}`
            }
            else if (city.id === assignment.cityId && citiesString != null) {
                citiesString = `${citiesString} and ${city.name}`
            }

        }
    }

    return citiesString
}

const walkerCityAlert = (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("walker")) {
        const [,walkerId] = itemClicked.id.split("--")

        for (const walker of walkers) {
            if (walker.id === parseInt(walkerId)) {
                const assignments =  findCities(walker)
                const assignedCities = assignCityNames(assignments)
                window.alert(`${walker.name} services${assignedCities}`)
            }
        }
    }
}

document.addEventListener("click", (clickEvent) => walkerCityAlert(clickEvent))

const petWalkerAlert = (clickEvent) => {
    const itemClicked = clickEvent.target
    if (itemClicked.id.startsWith("pet")) {
        const [,petId] = itemClicked.id.split("--")
        for (const pet of pets) {
            const walker = walkers.find(walker => walker.id === pet.walkerId)
            if (pet.id === parseInt(petId)) {
                window.alert(`${pet.name} is walked by ${walker.name}`)
            }
        }
    }
}

document.addEventListener("click", (clickEvent) => petWalkerAlert(clickEvent))


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"

    return walkerHTML

}

