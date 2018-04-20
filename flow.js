let flow, speed, diameter, sideA, sideB

const update = id => parseFloat(document.getElementById(id).value.replace(",", "."))
const history = []

const pushRectangle = () => {
    history.push({ Q: flow, v: speed, a: sideA, b: sideB })
    history.splice(9,1)
}

const pushCircle = () => {
    history.push({ Q: flow, v: speed, d: diameter })
    history.splice(10,1)
}

const renderSomething = () => {
    const historyDiv = document.getElementById("history")
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
    })
    historyDiv.innerHTML = template
}


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
    renderSomething()

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

const eraseValue = id => document.getElementById(id).value = null

const renderhistory = () => {
    let newDiv = document.createElement("div")
    let b = toString(history[0])
    document.createTextNode(b)
    newDiv.appendChild(b)
    document.body.appendChild(newDiv)
}
