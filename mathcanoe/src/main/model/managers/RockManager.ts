import Constants from "../../Constants";
import { Canoe } from "../classes/Canoe";
import { Drawable } from "../classes/Drawable";
import { River } from "../classes/River";

// This is unused code for managing rocks in the river. This was from
// a previous version of hte game, and may be re-introduced.
class RockManager {

    river: River
    canoe: Canoe
    countDown: number
    rocks: Drawable[]

    constructor(river: River, canoe: Canoe) {
        this.river = river
        this.countDown = 0
        this.rocks = []
        this.canoe = canoe
    }

    // add a rock to the head of the river every 30-60 cycles
    // so basically get the head position from the river
    // create a rock that is at the same Y level, and with x that is plus or minus 10
    // add it to the array
    // have a second method that removes the last rock if it is above a Y threshold
    generateRocks() {
        
        if (this.countDown > 0) {
            this.countDown--
            return
        }

        const riverHead = this.river.centerCoordinates.head.value
        const y = riverHead.y
        const xOffset = (Math.random() * Constants.RIVER_WIDTH) - Constants.RIVER_WIDTH / 2
        const x = riverHead.x + xOffset 
        const newRock = new Drawable(x, y, Constants.ROCK_W_H, "rock")
        this.rocks.push(newRock)

        // set the countdown somwhere between 30 and 60
        this.countDown = (Math.random() * 30) + 30

        this.removeRocksBelowScreen()
    }

    removeRocksBelowScreen() {
        if (this.rocks.length == 0) return
        const oldestRock = this.rocks[this.rocks.length - 1]
        if (oldestRock.position.y > window.innerHeight + Constants.ROCK_W_H) {
            this.rocks.pop()
        }
    }

    applyPhysics() {
        for (const rock of this.rocks) {
            rock.position.x -= this.canoe.velocity.x
            rock.position.y += this.canoe.velocity.y
        }
    }

}

export { RockManager }