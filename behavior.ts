//% color="#40B080"
namespace behavior {

    export enum Gravity {
        Zero,
        Bottom
    }

    export enum Pattern {
        TurnWhenHitWall,
        Jump
    }

    //% block="set $gravity gravity of $sprite=variables_get(aEnemy)"
    export function setGravity(sprite: Sprite, gravity: Gravity) {
        sprites.setDataNumber(sprite, "gravity", gravity);
    }

    game.onUpdate(function () {
        for (let target of sprites.allOfKind(SpriteKind.Enemy)) {
            if (sprites.readDataNumber(target, "gravity") == Gravity.Bottom) {
                target.vy = 200
            }
        }
    })

    //% block="set $pattern pattern of $sprite=variables_get(aEnemy)"
    export function setPattern(sprite: Sprite, pattern: Pattern) {

        sprites.setDataNumber(sprite, "pattern", pattern);
        sprite.vx = 20;

        let kind = sprite.kind();

        scene.onHitWall(kind, (target, location) => {
            if (sprites.readDataNumber(target, "pattern") == Pattern.TurnWhenHitWall) {
                if (target.isHittingTile(CollisionDirection.Left)) {
                    target.vx = 20
                } else if (target.isHittingTile(CollisionDirection.Right)) {
                    target.vx = -20
                }
            }
        });
    }

    // export class Jumpable {

    //     _target: Sprite;
    //     _grabbableTiles: Image[];
    //     _speed: number;

    //     constructor(target: Sprite) {
    //         this._target = target;
    //         this._grabbableTiles = [];
    //         this._speed = 200;
    //     }


    //     _run() {
    //         game.onUpdate(() => {
    //         });
    //     }
    // }

    // //% block="$target to be jumpable"
    // //% blockSetVariable=jumper
    // export function setToBeJumpable(target: Sprite): jumpable.Jumpable {
    //     let instance = new jumpable.Jumpable(target);
    //     instance._run();
    //     return instance;
    // }    
}

