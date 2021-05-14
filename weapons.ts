

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
        _rightAnim: Image[];

        constructor(target: Sprite) {
            this._target = target;
            this._sword = null;
        }

        //% block="wield $this(sword) for $direction"
        //% group="Sword"
        wield(direction: Direction) {
            if( this._sword != null )
                return;

            this._sword = _createEmptySprite_16x16();
            this._sword.setPosition(this._target.x, this._target.y);

            switch(direction) {
            case Direction.Left:
                animation.runImageAnimation(this._sword, this._leftAnim, 100, false);
                break;
            case Direction.Right:
                animation.runImageAnimation(this._sword, this._rightAnim, 100, false);
                break;
            }
            timer.after(300, function () {
                this._sword.destroy();
                this._sword = null;
            });
        }

        //% block="set animation left=$leftAnim=animation_editor right=$rightAnim=animation_editor to $this(sword)"
        //% group="Sword"
        setAnimation(leftAnim: Image[], rightAnim: Image[]) {
            this._leftAnim = leftAnim;
            this._rightAnim = rightAnim;
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
