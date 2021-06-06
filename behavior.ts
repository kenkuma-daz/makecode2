//% color="#40B080"
namespace behavior {

    export interface Behavior {
        update() : void
    }

    export enum MovePattern {
        Bounce,
        TurnOnSideWall,
        BounceAndTurnOnSideWall,
        FlyAndTurnOnSideWall,
    }

    namespace move {

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

        export function createBehavior(sprite: Sprite, pattern: MovePattern) : Behavior {
            switch(pattern) {
            case MovePattern.Bounce:
                return new BounceBehavior(sprite);
            case MovePattern.TurnOnSideWall:
                return new TurnOnSideWallBehavior(sprite);
            case MovePattern.BounceAndTurnOnSideWall:
                return new BounceAndTurnOnSideWallBehavior(sprite);
            case MovePattern.FlyAndTurnOnSideWall:
                return new FlyAndTurnOnSideWallBehavior(sprite);
            default:
                return null;
            }
        }
    }

    // let _items: {sprite:Sprite, behavior:Behavior}[] = [];
    let _items: {sprite:Sprite, behavior:Behavior}[] = [];
    game.onUpdate(function () {
        _items.forEach(function(item: {sprite:Sprite, behavior:Behavior}, index: number) {
            item.behavior.update();
        })
    })

    //% block="set $pattern pattern of $sprite=variables_get(aEnemy)"
    export function setPattern(sprite: Sprite, pattern: MovePattern) {
        sprite.onDestroyed(() => {
            let found = _items.find((item: {sprite:Sprite, behavior:Behavior}, index: number) => {
                return item.sprite == sprite;
            });
            _items.removeElement(found);
        });
        _items.push({sprite,behavior:move.createBehavior(sprite, pattern)});
    }
}