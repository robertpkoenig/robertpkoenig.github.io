import Constants from "../Constants"
import { Controller } from "../controller/Controller"
import { Canoe } from "./classes/Canoe"
import { CollisionDetector } from "./classes/CanoeCollisionDetector"
import { EquationGenerator } from "./managers/EquationGenerator"
import { NumberManager } from "./managers/NumberGenerator"
import { PointsManager } from "./managers/PointsManager"
import { Timer } from "./managers/Timer"
import { River } from "./classes/River"
import { EventManager } from "./managers/EventManager"
import SoundPlayer from "./managers/SoundPlayer"

// Manages all game objects, and their sub-manager classes
class Model {

    p5: p5
    canoe: Canoe
    river: River

    equationGenerator: EquationGenerator
    numberGenerator: NumberManager
    pointsManager: PointsManager
    controller: Controller
    collisionDetector: CollisionDetector
    timer: Timer
    soundPlayer: SoundPlayer
    eventManager: EventManager

    started: boolean
    ended: boolean
    ongoing: boolean
    crashed: boolean
    instructionsVisible: boolean

    timerDomElement: HTMLElement

    constructor(p5: p5) {
        this.p5 = p5
        this.setup()
    }

    // Creates all collaborating objects
    setup() {

        this.canoe = new Canoe()
        this.river = new River(this.canoe)

        this.equationGenerator = new EquationGenerator()
        this.numberGenerator = new NumberManager(this.equationGenerator, this.river, this.canoe)
        this.pointsManager = new PointsManager()
        this.collisionDetector = new CollisionDetector(this)
        this.timer = new Timer(this.p5, this)
        this.soundPlayer = new SoundPlayer()
        this.eventManager = new EventManager(this.p5, this, this.soundPlayer)

        this.started = false
        this.ongoing = false
        this.ended = false
        this.crashed = false
        this.instructionsVisible = true

        this.generateInitialScene()
        this.canoeSetup()
        this.equationGenerator.generateAndSetEquation()

    }

    // Draws the initial river course, which is then generated and pruned as the game
    // proceeds through procedural generation
    generateInitialScene() {

        this.river.generateInitialBankPoint()

        // Temporarily set canoe velocity to dummy rate to aid river construction
        this.canoe.velocity.y = Constants.FLOW_RATE

        while(this.river.bankLength < window.innerHeight + Constants.VERTICAL_OFFSET * 2) {
            this.river.applyPhysics()
            this.river.manageBanks()
        }

        // The river course is composed of linked lists of coordinates, and pointers to key
        // nodes in those linked lists are created here
        this.river.leftBankCollisionHead = this.river.getInitialCollisionHead(this.river.leftBank)
        this.river.rightBankCollisionHead = this.river.getInitialCollisionHead(this.river.rightBank)
        this.river.setVelocityNodeAtCanoePosition()

    }

    // The canoe must be adjusted after the river course is created. Here the entire scene
    // is shifted so that the canoe is both in the center of the screen, and the center
    // of the river. The collision polygons are then also created, and physics is applied so
    // that the canoe is initially tilted.
    canoeSetup() {
        this.canoe.centerCanoeInRiver(this.river)
        this.canoe.initializePolygons()
        this.canoe.applyPhysics()
    }

    // This is called by the p5 "draw" loop on each frame. This is where the procedural
    // river generation is triggered, and where most game state updates are triggered.
    process() {

        if (!this.ongoing) return
        
        this.river.applyPhysics()
        this.river.manageBanks()
        this.river.pruneBanks()

        this.collisionDetector.detectCollisions()

        this.numberGenerator.generateNumberWhenCountdownFinishes()
        this.numberGenerator.applyPhysics()

        this.canoe.applyPhysics()

        this.timer.updateTimer()
      
    }

}

export { Model }

