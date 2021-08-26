import p5 from "p5";
import { Controller } from "./controller/Controller";
import { Model } from "./model/Model";
import { View } from "./view/View";

// This is the entry point for the wider codebase.
// The P5 canvas and all collaborating objects are created.
// This code structure is dictated by the P5.js library,
// in particular the 'instance mode' configuration:
// https://p5js.org/reference/#/p5/p5

function sketch(p5: p5) {

    let model: Model
    let view: View
    let controller: Controller

    // This is automatically called on page load by p5
    p5.setup = () => {

        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight)
        canvas.parent('#canvas')

        model = new Model(p5)
        view = new View(p5, model)
        controller = new Controller(p5, model)

        document.getElementById("loading-screen").style.visibility = "hidden"

    }

    // This is automatically called by p5 on each frame
    p5.draw = () => {
        p5.background(255)
        model.process()
        view.render()
    }

    // P5.js is used to pass keyboard events to the controller class
    p5.keyPressed = () => {            
        controller.routeKeyPress(p5.key)
    }
    p5.keyReleased = () => {
        controller.routeKeyRelease(p5.key)
    }
    p5.mousePressed = () => {
        controller.handleMousePressed()
    }
    
}

// This simply triggers the above logic
new p5(sketch)