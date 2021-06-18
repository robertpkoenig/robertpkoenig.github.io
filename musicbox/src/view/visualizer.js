const CANVAS_X = -150
const CANVAS_Y = -100
const CANVAS_Z = -175

// Main music cylinder
const CYL_RADIUS = 175
const CYL_HEIGHT = 500

// Box
const BOX_WH = 30
const BOX_DIST_FROM_CENTER = CYL_RADIUS + BOX_WH / 2 - 10

// Canons
const CANON_W = 20
const CANON_H = 40
const CANON_R = 15
const CANON_TR = 5

// Projectile
const NUM_PROJ_SLOTS = 6
const PROJ_GAP = (CYL_HEIGHT - CANON_W * 2) / (NUM_PROJ_SLOTS - 1)
const PROJ_R = 10
const PROJ_H = 30
const PROJ_DIST_FROM_CENTER = BOX_DIST_FROM_CENTER + BOX_WH / 2 + PROJ_H / 2
// When the projectiles are fired they start 5px away to add to the effect fo firing
const PROJ_OFFSET = 5

// Arc
const ARC_R = 300

// Helps determine where boxes are along cylinder
const Z_OFFSET = - CYL_HEIGHT / 2 + CANON_W

// Suspendor
const SUS_W = 30
const SUS_H = 1000
const SUS_D = 30
const SUS_OFFSET = 20

//  Plane
const PIPE_X_OFFSET = -505
const PIPE_Y_OFFSET = -225
const PIPE_Z_OFFSET = 10

// Torus
const TOR_R = 25
const TOR_H = 10

//  Bottom cylinder height
const B_CYL_H = 1000

// Uses P5 WebGL functions to render the 3D animation
class Visualizer {

    circleSizes

    visualize() {

        push()

            const proportionThroughSong = window.clock.currentFrame.count / Constants.numFramesInSong
            const cylinderAngle = TWO_PI * proportionThroughSong

            // Transformations for entire canvas reference
            translate(CANVAS_X, CANVAS_Y, CANVAS_Z)
            rotateY(TWO_PI * 0.38)

            this.drawPipes() 
            this.drawSuspendors(cylinderAngle)
            this.drawCylinder(cylinderAngle)
            this.drawAllSounds(cylinderAngle, proportionThroughSong)

        pop()
        
    }

    // This calls methods to draw the canons and projectiles
    drawAllSounds(cylinderAngle, proportionThroughSong) {

        for (let i = 0; i < window.song.hits.length; i++) {

            // The window.song is segemented into 'hit slots', each of which can
            // hold multiple 'hits', which is to say, 'sounds'
            const hitSlot = window.song.hits[i]

            for (let j = 0; j < hitSlot.length; j++) {

                const canonAngle = -TWO_PI * (i / window.song.hits.length)
                const totalAngle = canonAngle + cylinderAngle
                const soundName = hitSlot[j]["sound"]
                const level = nameLevelMap[soundName]["level"]

                // Color values for the projectile for this sound
                const r = levelColorMap[level]["r"]
                const g = levelColorMap[level]["g"]
                const b = levelColorMap[level]["b"]

                this.drawCanons(canonAngle, level)
                this.drawProjectileLaunching(totalAngle, canonAngle, level, r, g, b)
                this.drawProjectiles(totalAngle, proportionThroughSong, canonAngle, level, r, g, b)

            }
        }

    }

    // This is the projectile before it leaves the canon
    drawProjectileLaunching(totalAngle, canonAngle, level, r, g, b) {

        if (totalAngle >= -1 && totalAngle <= 0 || totalAngle >= 5.28) {
            push()
            // const scaler = map(totalAngle, -0.5, 0, -0.5, 0.25)
            let scaler
            if (totalAngle <= 0)
                scaler = totalAngle
            else {
                scaler = (TWO_PI - totalAngle) * -1
            }
            const offset = PROJ_H * scaler
            const px = -(PROJ_DIST_FROM_CENTER + offset) * cos(canonAngle)
            const py = -(PROJ_DIST_FROM_CENTER + offset) * sin(canonAngle)
            translate(px, py, level * PROJ_GAP + Z_OFFSET)
            // rotateZ(0.5*PI)
            rotateZ(canonAngle + 0.5 * PI)
            specularMaterial(r, g, b)
            cylinder(PROJ_R, PROJ_H)
            pop()
        }

    }

    // This is the projectile as it sores through the air
    drawProjectiles(totalAngle, proportionThroughSong, canonAngle, level, r, g, b) {

        push()
        if (totalAngle >= 0 && totalAngle <= 2 || totalAngle <= -4.28) {
            // Reverse the spin put on the whole scene
            rotateZ(-TWO_PI * proportionThroughSong)
            // Move the center of the arc below the music cylinder
            translate(-(CYL_RADIUS + BOX_WH / 2 + PROJ_H / 2), ARC_R, PROJ_OFFSET)
            // Put spin in the opposite direction to the whole scene
            rotateZ(-TWO_PI * proportionThroughSong)
            // Rotate the drawing plane so that the Y axis is in the
            // in the direction that this cylinder will be drawn
            rotateZ(-canonAngle)
            // Move the drawing plane to the point where the cylinder will be drawn
            translate(0, -ARC_R, level * PROJ_GAP + Z_OFFSET)
            // rotate the cylinder to face the right direction
            rotateY(-PI * 0.5)
            rotateX(PI * 0.5)
            specularMaterial(r, g, b)
            cylinder(PROJ_R, PROJ_H)
        }
        pop()

    }

    drawCanons(boxAngle, level) {

        push()
        const x = -BOX_DIST_FROM_CENTER * cos(boxAngle)
        const y = -BOX_DIST_FROM_CENTER * sin(boxAngle)

        translate(x, y, level * PROJ_GAP + Z_OFFSET)
        rotateZ(boxAngle + HALF_PI)
        specularMaterial('blue')
        cylinder(CANON_W, CANON_H, 24, 1, false, false)
        cylinder(CANON_W - CANON_TR * 2, CANON_H, 24, 1, false, false)
        translate(0, CANON_H / 2, 0)
        rotateX(HALF_PI)
        torus(CANON_R, CANON_TR)
        pop()

    }

    drawCylinder(cylinderAngle) {
        rotateZ(cylinderAngle)
        push()
        rotateX(0.5 * PI)
        specularMaterial('blue')
        cylinder(CYL_RADIUS, CYL_HEIGHT, 50, 0)
        pop()
    }

    drawPipes() {
            // These are the pipes into which projectiles dissappear
            push()
                translate(0, ARC_R, 0)
                rotateX(HALF_PI)
                translate(PIPE_X_OFFSET, PIPE_Y_OFFSET, PIPE_Z_OFFSET)
                for (let i = 0 ; i < NUM_PROJ_SLOTS ; i++) {
                    const x = i * PROJ_GAP
                    push()
                    specularMaterial('blue')
                    translate(0, x, 0)
                    torus(25, 10)
                    pop()
                }
                translate(0, 0, -500)
                for (let i = 0 ; i < NUM_PROJ_SLOTS ; i++) {
                    const x = i * PROJ_GAP
                    push()
                        specularMaterial('blue')
                        translate(0, x, 0)
                        rotateX(-HALF_PI)
                        cylinder(TOR_R + TOR_H, B_CYL_H, 60, 1, false, false)
                    pop()
                }
            pop()
    }

    drawSuspendors(cylinderAngle) {

                // Suspender left
                push()
                    specularMaterial('gold')
                    translate(0, -SUS_H / 2, - CYL_HEIGHT / 2 - SUS_D / 2)
                    box(SUS_W, SUS_H, SUS_D)
                pop()
    
                // Knob for suspender left (no knob for right)
                push()
                specularMaterial('gold')
                    translate(0, 0, - CYL_HEIGHT / 2 - SUS_D / 2)
                    rotateX(HALF_PI)
                    cylinder(SUS_W / 2, SUS_D)
    
                    // Screw over suspender left for rotation visual
                    specularMaterial('silver')
                    translate(0, -SUS_D / 2 - 1, 0)
                    rotateX(HALF_PI)
                    rotateZ(-cylinderAngle)
                    box(15)
                    rotateZ(0.25 * PI)
                    box(15)
                pop()
    
                // Suspender right
                push()
                    specularMaterial('gold')
                    translate(0, -SUS_H / 2 + SUS_OFFSET, + CYL_HEIGHT / 2 + SUS_D / 2)
                    box(SUS_W, SUS_H, SUS_D)
                pop()  

    }

}
