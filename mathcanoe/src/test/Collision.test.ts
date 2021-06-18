import { assert } from "chai"
import { Vector } from "sat"
import SAT from "sat"
import { Canoe } from "../main/model/classes/Canoe"

describe('Collision detection tests', function() {

    it('should detect a point inside a triangle', function() {
        var V = Vector;
        var P = SAT.Polygon;

        var triangle = new P(new V(30,0), [
        new V(0,0), new V(30, 0), new V(0, 30)
        ]);

        assert.isFalse(SAT.pointInPolygon(new V(0,0), triangle)) // false
        assert.isTrue(SAT.pointInPolygon(new V(35, 5), triangle)) // true
    })

    it('Should detect points inside canoe polygon', function() {
        const pointOne = new Vector(5, 2)
        const pointTwo = new Vector(10, -5)
        const pointThree = new Vector(-15, 3)
        const pointFour = new Vector(0, -40)
        const pointFive = new Vector(100, 100)
        const pointSix = new Vector(17, 0)
        const pointSeven = new Vector(0, 51)

        const canoe = new Canoe()
        canoe.initializePolygons()

        // console.log(canoe.canoePolygon);

        assert.isTrue(SAT.pointInPolygon(pointOne, canoe.polygon))
        assert.isTrue(SAT.pointInPolygon(pointTwo, canoe.polygon))
        assert.isTrue(SAT.pointInPolygon(pointThree, canoe.polygon))
        assert.isTrue(SAT.pointInPolygon(pointFour, canoe.polygon))
        assert.isFalse(SAT.pointInPolygon(pointFive, canoe.polygon))
        assert.isFalse(SAT.pointInPolygon(pointSix, canoe.polygon))
        assert.isFalse(SAT.pointInPolygon(pointSeven, canoe.polygon))
        
    })

    it('SAT Should detect points inside only after rotating', function() {
        const pointOne = new Vector(40, 0)
        const pointTwo = new Vector(-40, 0)
        
        const canoe = new Canoe()
        canoe.initializePolygons()

        // console.log(canoe.canoePolygon);

        assert.isFalse(SAT.pointInPolygon(pointOne, canoe.polygon))
        assert.isFalse(SAT.pointInPolygon(pointTwo, canoe.polygon))

        canoe.polygon.setAngle(Math.PI / 2)

        assert.isTrue(SAT.pointInPolygon(pointOne, canoe.polygon))
        assert.isTrue(SAT.pointInPolygon(pointTwo, canoe.polygon))
        
    })

    // it('Collision detector should detect basic collisions')

})