import { Constants } from "../Constants"
import { Controller } from "../controller/Controller"
import { Canoe } from "./classes/Canoe"
import { CollisionDetector } from "./classes/CanoeCollisionDetector"
import { EquationGenerator } from "./managers/EquationGenerator"
import { NumberGenerator } from "./managers/NumberGenerator"
import { PointsManager } from "./managers/PointsManager"
import { RockManager } from "./managers/RockManager"
import { Timer } from "./managers/Timer"
import { River } from "./classes/River"
import { EventManager } from "./managers/EventManager"


class Model {

    canoe: Canoe
    river: River
    equationGenerator: EquationGenerator
    numberGenerator: NumberGenerator
    pointsManager: PointsManager
    rockManager: RockManager
    controller: Controller
    collisionDetector: CollisionDetector
    timer: Timer
    eventManager: EventManager

    started: boolean
    ended: boolean
    ongoing: boolean
    crashed: boolean
    instructionsVisible: boolean

    constructor(p5: p5) {
        this.canoe = new Canoe()
        this.river = new River(this.canoe)
        this.equationGenerator = new EquationGenerator()
        this.numberGenerator = new NumberGenerator(this.equationGenerator, this.river, this.canoe)
        this.pointsManager = new PointsManager(this.equationGenerator, this.numberGenerator)
        this.rockManager = new RockManager(this.river, this.canoe)
        this.collisionDetector = new CollisionDetector(this)
        this.timer = new Timer(p5)
        this.eventManager = new EventManager(this)

        this.started = false
        this.ongoing = false
        this.ended = false
        this.crashed = false
        this.instructionsVisible = true

        this.generateInitialRiverBanks()
        this.setupCanoe()
        this.equationGenerator.generateAndSetEquation()
    }

    generateInitialRiverBanks() {

        this.river.generateInitialBankPoint()

        // Temporarily set canoe velocity to dummy rate
        this.canoe.velocity.y = Constants.flowRate
        while(this.river.bankLength < window.innerHeight + Constants.verticalOffset * 2) {
            this.river.applyPhysics()
            this.river.manageBanks()
        }

        this.river.leftBankCollisionHead = this.river.getInitialCollisionHead(this.river.leftBank)
        this.river.rightBankCollisionHead = this.river.getInitialCollisionHead(this.river.rightBank)
        this.river.setVelocityNodeAtCanoePosition()

    }

    setupCanoe() {
        this.canoe.centerCanoeInRiver(this.river)
        this.canoe.initializePolygons()
        this.canoe.applyPhysics()
    }

    process() {

        if (this.timer.getCurrentMillis() <= 0) {
            this.eventManager.handleTimerRunOut()
        }
        if (!this.ongoing) return
        

        this.river.applyPhysics()
        this.river.manageBanks()
        this.river.pruneBanks()

        this.collisionDetector.detectCollisions()

        this.numberGenerator.generateNumberAtRandomInterval()
        this.numberGenerator.applyPhysics()

        this.canoe.applyPhysics()
        
    }

}

export { Model }

