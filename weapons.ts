

function _createEmptySprite_16x16(): Sprite {
    return sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Projectile)
}

//% blockNamespace=Weapons color="#FF6060"
namespace weapons.sword {
    export enum Direction {
        Left,
        Right
    }

    export class Sword {

        _target: Sprite;
        _sword: Sprite;
        _wielding: boolean;
        _leftAnim: Image[];
        _leftSpan: number;
        _rightAnim: Image[];
        _rightSpan: number;

        constructor(target: Sprite) {
            this._target = target;
            this._sword = null;
        }


        _isWallAt(col:number, row:number) : boolean {
            // let loc : tiles.Location = tiles.getTileLocation(x >> 4, y >> 4);
            // const tm = game.currentScene().tileMap;
            // return tm ? tm.isObstacle(loc.col, loc.row) : false;
            const tm = game.currentScene().tileMap;
            return tm ? tm.isObstacle(col, row) : false;
        }

        _spanForHitWall(signOfDirection: number, maxSpan: number) : number {
            let length;
            // control.assert(false, 0);
            let col = this._target.x >> 4; 
            let row = this._target.y >> 4; 
            for(let span=0; span<maxSpan; span++) {
                if( this._isWallAt(col + span * signOfDirection, row))
                    return span;
            }
            return maxSpan;
        }

        //% block="wield $this(sword) for $direction"
        //% group="Sword"
        wield(direction: Direction) {
            if( this._sword != null )
                return;

            this._sword = _createEmptySprite_16x16();
            this._sword.setPosition(this._target.x, this._target.y);

            // let col = this._target.x >> 4; 
            // let row = this._target.y >> 4; 
            // let n=0;
            // for(; n<this._rightLength; n++) {
            //     if( this._isWallAt(col + n, row))
            //         break;
            // }
            // console.log("ken n:" + n);
            let interval = 90;
            let span : number = 0;
            switch(direction) {
            case Direction.Left:
                animation.runImageAnimation(this._sword, this._leftAnim, interval, false);
                span = this._spanForHitWall(-1, this._leftSpan);
                break;
            case Direction.Right:
                animation.runImageAnimation(this._sword, this._rightAnim, interval, false);
                span = this._spanForHitWall(1, this._rightSpan);
                break;
            }
            timer.after(span*interval, function () {
                this._sword.destroy();
                this._sword = null;
            });
        }

        //% block="set animation left=$leftAnim=animation_editor right=$rightAnim=animation_editor to $this(sword)"
        //% group="Sword"
        setAnimation(leftAnim: Image[], rightAnim: Image[]) {
            this._leftAnim = leftAnim;
            this._leftSpan = leftAnim[0].width >> 4;
            this._rightAnim = rightAnim;
            this._rightSpan = rightAnim[0].width >> 4;
        }

        _run() {
            game.onUpdate(() => {
                if( this._sword )
                    this._sword.setPosition(this._target.x, this._target.y);
            });
        }
    }

    //% block="$target to equip sword and set animation left=$leftAnim=animation_editor right=$rightAnim=animation_editor"
    //% blockSetVariable=sword
    //% group="Sword"
    export function equipSword(target: Sprite, leftAnim: Image[], rightAnim: Image[]): weapons.sword.Sword {
        let sword = new weapons.sword.Sword(target);
        sword.setAnimation(leftAnim, rightAnim);
        sword._run();
        return sword;
    }    
}
