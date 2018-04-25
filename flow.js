
// variables of the continuity equation
let flow, speed, diameter, sideA, sideB

// history Array is used as an archive of last computed variables.
// The history is rendered as the part of the webpage.
const history = []

// eraseValue() is used for deleting the value of the input field.
// In this project, it is used to delete input value of the sides
// when something is typed in the diameter field and vice versa.
const eraseValue = id => document.getElementById(id).value = null

// update() is used for updating the variables of the continuity
// equation, which are kept in the file scope.
const update = id => parseFloat(document.getElementById(id).value.replace(",", "."))

const makeHistory = () => {
    pushHistory()
    renderHistory()
}

// pushCircle() pushes values of the rectangular duct to the historry array.
// splice() makes max array length 9, while deleteing the oldest entry.
const pushHistory = () => {
    history.push({ Q: flow, v: speed, a: sideA, b: sideB, d: diameter })
    history.splice(0, history.length - 9)
}

// renderHistory() maps the data from history array to the card divs.
// Every time renderHistory() is called, the whole history div is rerendered.
// It is like this, so rendering of the history div can be changed just by 
// changing the array.
//TODO: make sure that input fields are allways number and nothing else!
const renderHistory = () => {
    let template = ""
    const wholeDiv = history.map(card => {
        template = template +
            `<div class="historyCard" >
        <ul>
        <li>Q = ${card.Q} m3/h </li>
        <li>v = ${card.v} m/s </li>
        ${card.d ? `<li>d = ${card.d} mm </li>` : ""}
        ${card.a ? `<li>a = ${card.a} mm </li>` : ""}
        ${card.b ? `<li>b = ${card.b} mm </li>` : ""}
        </ul>
        </div>
        `
    })
    document.getElementById("history").innerHTML = template
}


// COMPUTING FUNCTIONS: 
// Those functions all follows similar pattern:
// 1) Update known variables of the equation.
// 2) On the findings of what variables are updated make the right math.
// 3) Update the field wanted by the user.
// 4) Push all the relevant variables to the history array and render it.

const computeFlow = () => {
    updateAll()
    if (diameter) {
        flow = (speed * ((diameter ** 2) * 0.25 * Math.PI * 3600 / 1000000)).toFixed(1)
    } else {
        sideA = update("sideA")
        sideB = update("sideA")
        flow = (speed * sideA * sideB * 3600 / 1000000).toFixed(1)
    }
    document.getElementById("flow").value = flow
    makeHistory()
}

const computeSpeed = () => {
    updateAll()
    if (diameter) {
        speed = (flow / ((diameter ** 2) * 0.25 * Math.PI * 3600 / 1000000)).toFixed(1)
    } else {
        sideA = update("sideA")
        sideB = update("sideA")
        speed = (flow / (sideA * sideB * 3600 / 1000000)).toFixed(1)
    }
    document.getElementById("speed").value = speed
    makeHistory()
}

const computeDiameter = () => {
    eraseValue("sideA")
    eraseValue("sideB") // erasing sides so they're not present when computing diameter
    updateAll()
    diameter = (Math.sqrt(flow / (speed * 0.25 * Math.PI * 3600 / 1000000))).toFixed(1)
    document.getElementById("diameter").value = diameter
    makeHistory()
}

const computeSideA = () => {
    eraseValue("diameter")  // erasing diameter so it's not present when computing sides
    updateAll()
    sideA = (flow / (speed * sideB * 3600 / 1000000)).toFixed(1)
    document.getElementById("sideA").value = sideA
    makeHistory()
}

const computeSideB = () => {
    eraseValue("diameter")  // erasing diameter so it's not present when computing sides
    updateAll()
    sideB = (flow / (speed * sideA * 3600 / 1000000)).toFixed(1)
    document.getElementById("sideB").value = sideB
    makeHistory()
}

// updateAll() just update all the variables of the equation at once
/*TODO: make all the variables object with name, value and units
    so they can be mappable, and there can be possibility for cheanging
    units*/
const updateAll = () => {
    flow = update("flow")
    speed = update("speed")
    sideA = update("sideA")
    sideB = update("sideB")
    diameter = update("diameter")
}