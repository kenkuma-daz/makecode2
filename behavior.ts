//% color="#40B080"
namespace behavior {


    export enum Pattern {
        Bounce,
        TurnOnSideWall,
        BounceAndTurnOnSideWall,
        FlyAndTurnOnSideWall,
    }

    interface Behavior {
        update() : void
    }


    class BounceBehavior implements Behavior {
        _target: Sprite;
        constructor(sprite: Sprite) {
            this._target = sprite;
            this._target.vy = 200;
        }
        update() : void {
            let vy = this._target.vy;
            this._target.vy = Math.min(vy+8, 200);

            if (this._target.isHittingTile(CollisionDirection.Bottom)) {
                this._target.vy = -200;
            }
        }
    }

    class TurnOnSideWallBehavior implements Behavior {
        _target: Sprite;
        constructor(sprite: Sprite) {
            this._target = sprite;
            this._target.vx = 30;
            this._target.vy = 200;
        }
        update() : void {
            let vy = this._target.vy;
            this._target.vy = Math.min(vy+10, 200);

            if (this._target.isHittingTile(CollisionDirection.Left)) {
                this._target.vx = 30;
            } else if (this._target.isHittingTile(CollisionDirection.Right)) {
                this._target.vx = -30;
            }
        }
    }

    class BounceAndTurnOnSideWallBehavior implements Behavior {
        _target: Sprite;
        constructor(sprite: Sprite) {
            this._target = sprite;
            this._target.vx = 50;
            this._target.vy = 200;
        }
        update() : void {
            let vy = this._target.vy;
            this._target.vy = Math.min(vy+6, 200);

            if (this._target.isHittingTile(CollisionDirection.Bottom)) {
                this._target.vy = -120;
            }

            if (this._target.isHittingTile(CollisionDirection.Left)) {
                this._target.vx = 50;
            } else if (this._target.isHittingTile(CollisionDirection.Right)) {
                this._target.vx = -50;
            }
        }
    }

    class FlyAndTurnOnSideWallBehavior implements Behavior {
        _target: Sprite;
        constructor(sprite: Sprite) {
            this._target = sprite;
            this._target.vx = 40;
        }
        update() : void {
            if (this._target.isHittingTile(CollisionDirection.Left)) {
                this._target.vx = 40;
            } else if (this._target.isHittingTile(CollisionDirection.Right)) {
                this._target.vx = -40;
            }
        }
    }


    // let _items: {sprite:Sprite, behavior:Behavior}[] = [];
    let _items: Behavior[] = [];
    game.onUpdate(function () {
        _items.forEach(function(_behavior: Behavior, index: number) {
            _behavior.update();
        })
    })

    //% block="set $pattern pattern of $sprite=variables_get(aEnemy)"
    export function setPattern(sprite: Sprite, pattern: Pattern) {

        let _behavior: Behavior = null;
        switch(pattern) {
        case Pattern.Bounce:
            _behavior = new BounceBehavior(sprite);
            break;
        case Pattern.TurnOnSideWall:
            _behavior = new TurnOnSideWallBehavior(sprite);
            break;
        case Pattern.BounceAndTurnOnSideWall:
            _behavior = new BounceAndTurnOnSideWallBehavior(sprite);
            break;
        case Pattern.FlyAndTurnOnSideWall:
            _behavior = new FlyAndTurnOnSideWallBehavior(sprite);
            break;
        }
        if( !_behavior )
            return;


        _items.push(_behavior);
    }

}

