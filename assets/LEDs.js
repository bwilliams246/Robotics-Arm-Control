const GPIO = require("onoff").Gpio

const blueLight = new GPIO(3 , 'out')
const redLight = new GPIO(4 , 'out')
const greenLight = new GPIO(17 , 'out')

function lightOn (data) {
    /* decreasing LED lights */
    /* decreasing base slider*/
    if (data.baseSlider )
}

function lightOff() {
    clearInterval(turnOn)
    blueLight.writeSync(0)
    blueLight.unexport()
}
