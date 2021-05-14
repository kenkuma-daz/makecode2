//% blockNamespace=Jumpable color="#40B080"
namespace jumpable {

    export class Jumpable {

        _target: Sprite;
        _grabbableTiles: Image[];
        _speed: number;

        constructor(target: Sprite) {
            this._target = target;
            this._grabbableTiles = [];
            this._speed = 200;
        }

        //% block="$this(jumper) can grab $tile"
        //% tile.shadow="screen_image_picker"
        canGrabTile(tile: Image) {
            this._grabbableTiles.push(tile);
        }


        //% block="jump $speed of $this(jumper)"
        setSpeed(speed: number) {
            this._speed = Math.abs(speed);
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
                return this._speed * -1;
            }
            
            if (!(controller.up.isPressed())) {
                return this._speed;
            }

            return Math.min(this._target.vy + 8, this._speed)
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
