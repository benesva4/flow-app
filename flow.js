// eraseValue() is used for deleting the value of the input field.
// In this project, it is used to delete input value of the sides
// when something is typed in the diameter field and vice versa.
const eraseValue = id => document.getElementById(id).value = null

// update() is used for updating the variables of the continuity
// equation, which are kept in the file scope.
const update = id => parseFloat(document.getElementById(id).value.replace(",", "."))

// variables of the continuity equation
let flow, speed, diameter, sideA, sideB

// history Array is used as an archive of last computed variables.
// The history is rendered as the part of the webpage.
const history = []

// pushCircle() pushes values of the rectangular duct to the historry array.
// splice() makes max array length 9, while deleteing the oldest entry.
const pushRectangle = () => {
    history.push({ Q: flow, v: speed, a: sideA, b: sideB })
    history.splice(0, history.length - 9)
}

// pushCircle() pushes values of the rectangular duct to the historry array.
// splice() makes max array length 9, while deleteing the oldest entry.
const pushCircle = () => {
    history.push({ Q: flow, v: speed, d: diameter })
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
        template =
        `<div class="historyCard" >
        <ul>
        <li>Q = ${card.Q} m3/h </li>
        <li>v = ${card.v} m/s </li>
        ${card.d ? `<li>d = ${card.d} mm </li>` : ""}
        ${card.a ? `<li>a = ${card.a} mm </li>` : ""}
        ${card.b ? `<li>b = ${card.b} mm </li>` : ""}
        </ul>
        </div>
        ` + template
        // adding old template on the end so the cards are mapped
        // newest to oldes
    })
    document.getElementById("history").innerHTML = template
}

// COMPUTING FUNCTIONS: 
// Those functions all follows similar pattern:
// 1) Update known variables.
// 2) On the findings of what variables are updated make the right math.
// 3) Update the field wanted by the user.
// 4) Push all the relevant variables to the history array.
// 5) Render history.

//TODO: Put rendering of the history to the every function.
//TODO: Put the pushing to every function.
//TODO: Try to find out way to render and push without writing again and again. 
const computeFlow = () => {
    speed = update("speed")
    diameter = update("diameter")
    if (diameter) {
        flow = (speed * ((diameter ** 2) * 0.25 * Math.PI * 3600 / 1000000)).toFixed(1)
        pushCircle()
    } else {
        sideA = update("sideA")
        sideB = update("sideA")
        flow = speed * sideA * sideB * 3600 / 1000000
        pushRectangle()
    }
    document.getElementById("flow").value = flow
    renderHistory()
}

const computeSpeed = () => {
    flow = update("flow")
    diameter = update("diameter")
    if (diameter) {
        speed = (flow / ((diameter ** 2) * 0.25 * Math.PI * 3600 / 1000000).toFixed(1))
        pushCircle()
    } else {
        sideA = update("sideA")
        sideB = update("sideA")
        speed = (flow / (sideA * sideB * 3600 / 1000000)).toFixed(1)
        pushRectangle()
    }
    document.getElementById("speed").value = speed
}

const computeDiameter = () => {
    flow = update("flow")
    speed = update("speed")
    diameter = Math.sqrt(flow / (speed * 0.25 * Math.PI * 3600 / 1000000))
    pushCircle()
    document.getElementById("diameter").value = diameter.toFixed(1)
}

const computeSideA = () => {
    flow = update("flow")
    speed = update("speed")
    sideB = update("sideB")
    sideA = flow / (speed * sideB * 3600 / 1000000)
    pushRectangle()
    document.getElementById("sideA").value = sideA.toFixed(1)
}

const computeSideB = () => {
    flow = update("flow")
    speed = update("speed")
    sideA = update("sideA")
    sideB = flow / (speed * sideA * 3600 / 1000000)
    pushRectangle()
    document.getElementById("sideB").value = sideB.toFixed(1)
}