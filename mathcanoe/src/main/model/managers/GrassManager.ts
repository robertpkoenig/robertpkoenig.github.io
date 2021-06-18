import { Vector } from "sat";
import { Constants } from "../../Constants";
import { LinkedList } from "../../helper/LinkedList";
import { GrassBlade, GrassBladeDirection } from "../classes/GrassBlade";
import { Model } from "../Model";

class GrassManager {

    model: Model
    p5: p5

    grassGenerations: LinkedList<LinkedList<GrassBlade>>

    constructor(model: Model, p5: p5) {

        this.model = model
        this.p5 = p5

        this.grassGenerations = new LinkedList<LinkedList<GrassBlade>>()

    }

    generateGrassIfNeededNoPrune() {
        if (this.grassGenerations.head.value.head.value.pos.y > - Constants.verticalOffset) {
            this.generateGrassGeneration()
        }
    }

    generateAndPruneGrassIfNeeded() {

        if (this.grassGenerations.head.value.head.value.pos.y > - Constants.verticalOffset) {
            this.generateGrassGeneration()
            this.pruneGrass()
        }

    }

    generateGrassGeneration() {

        const newGeneration = new LinkedList<GrassBlade>()

        const y = - Constants.verticalOffset

        for (let x = 0 ; x < this.p5.width ; x+=Constants.GRASS_GAP) {
            newGeneration.addFirst(this.generateGrassBlade(x, y))
        }

        this.grassGenerations.addFirst(newGeneration)

        console.log(this.grassGenerations);
        

    }

    generateGrassBlade(x: number, y: number): GrassBlade {
        const coordinate = this.generateRandomCoordinateAroundPoint(x, y)
        const direction = this.generateRandomDirection()
        return new GrassBlade(direction, coordinate)
    }

    generateRandomCoordinateAroundPoint(x: number, y: number): Vector {
        x += Math.floor(this.p5.random(0, Constants.GRASS_GAP))
             - (Constants.GRASS_GAP / 2)
        y += Math.floor(this.p5.random(0, Constants.GRASS_GAP))
             - (Constants.GRASS_GAP / 2)
        return new Vector(x,y)
    }

    generateRandomDirection(): GrassBladeDirection {
        let randomIndex = this.p5.random(0, Object.keys(GrassBladeDirection).length / 2)
        randomIndex = Math.floor(randomIndex)
        return randomIndex
    }

    pruneGrass() {
        this.grassGenerations.removeLast()
    }

    applyPhysics() {

        for (const generation of this.grassGenerations) {
            for (const grass of generation) {
                grass.pos.x -= this.model.canoe.velocity.x
                grass.pos.y += this.model.canoe.velocity.y
            }
        }

    }

}

export default GrassManager