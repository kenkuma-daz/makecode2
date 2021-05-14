//% blockNamespace=Jumpable color="#40B080"
namespace jumpable {

    export class Jumpable {

        _target: Sprite;
        _grabbableTiles: Image[];

        constructor(target: Sprite) {
            this._target = target;
            this._grabbableTiles = [];
        }

        //% block="$this(jumper) can grab $tile"
        //% tile.shadow="screen_image_picker"
        canGrabTile(tile: Image) {
            this._grabbableTiles.push(tile);
        }

        _isOnTile() : boolean {
            let loc = tiles.getTileLocation(this._target.x / 16, this._target.y / 16);
            let tile = tiles.getTileImage(loc);

            let found = this._grabbableTiles.find((grabbableTile) => {
                return grabbableTile.equals(tile);
            });
            if( found == undefined || found == null)
                return false;
            return true;
        }

        _calcPosition() : number {
            if( this._isOnTile() ) {
                if (controller.up.isPressed()) {
                    return -100
                } else if (controller.down.isPressed()) {
                    return 100
                }
                return 0
            }
            
            let canJump = this._target.isHittingTile(CollisionDirection.Bottom);
            if (canJump && controller.up.isPressed()) {
                return -200
            }
            
            if (!(controller.up.isPressed())) {
                return 200
            }

            return Math.min(this._target.vy + 8, 200)
        }

        _run() {
            game.onUpdate(() => {
                this._target.vy = this._calcPosition();
            });
        }
    }

    //% block="$target to be jumpable"
    //% blockSetVariable=jumper
    export function setToBeJumpable(target: Sprite): jumpable.Jumpable {
        let instance = new jumpable.Jumpable(target);
        instance._run();
        return instance;
    }    
}
