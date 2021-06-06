

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
        _span: number;
        _wielding: boolean;
        _leftAnim: Image[];
        _leftSpan: number;
        _rightAnim: Image[];
        _rightSpan: number;

        constructor(target: Sprite, span: number) {
            this._target = target;
            this._span = span;
            this._sword = null;
        }


        _isWallAt(col:number, row:number) : boolean {
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

            let interval = 80;  // fix
            let time : number = 200;
            switch(direction) {
            case Direction.Left:
                animation.runImageAnimation(this._sword, this._leftAnim, interval, false);
                time = time * this._spanForHitWall(-1, this._leftSpan) / this._span;
                break;
            case Direction.Right:
                animation.runImageAnimation(this._sword, this._rightAnim, interval, false);
                time = time * this._spanForHitWall(1, this._rightSpan) / this._span;
                break;
            }
            timer.after(time, function () {
                this._sword.destroy();
                this._sword = null;
            });
        }

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

    //% block="set $target to equip weapon|left=$leftAnim=animation_editor|right=$rightAnim=animation_editor|span|$span"
    //% blockSetVariable=sword
    //% group="Sword"
    //% inlineInputMode=inline
    export function equipSword(target: Sprite, leftAnim: Image[], rightAnim: Image[], span: number): weapons.sword.Sword {
        let sword = new weapons.sword.Sword(target, span);
        sword.setAnimation(leftAnim, rightAnim);
        sword._run();
        return sword;
    }    
}
