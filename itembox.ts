

namespace SpriteKind {
    export const ItemsFrame = SpriteKind.create()
}

function createItemFrame2(): Sprite {
    return sprites.create(img`
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 . . . . . . . . . . . . . . 5 
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
        `, SpriteKind.ItemsFrame)
}


/**
 * Declare a class outside and attach to a namespace.
 */
//% blockNamespace=Items color="#FF8000"
class Item {
    _name: string;
    _sprite: Sprite;
    _frame: Sprite;
    _set_x: number;

    constructor(name: string, sprite: Sprite) {
        this._name = name;
        this._sprite = sprite;
        this._sprite.setFlag(SpriteFlag.RelativeToCamera, true);
        this._frame = createItemFrame2();
        this._frame.setFlag(SpriteFlag.RelativeToCamera, true);
    }

    setPosition(x: number, y: number) {
        this._set_x = x;
        this._sprite.setPosition(x, y);
        this._frame.setPosition(x-1, y);
    }

    getSprite() {
        return this._sprite;
    }

    debugPrint() {
        console.log("name:" + this._name);
        console.log("_x  :" + this._set_x);
        console.log("x   :" + this._sprite.x);
        console.log("y   :" + this._sprite.y);
    }
}


function createItemFocus(): Sprite {
    return sprites.create(img`
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 . . . . . . . . . . . . 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
        `, SpriteKind.Items)
}

/**
 * Declare a class outside and attach to a namespace.
 */
//% blockNamespace=Items color="#FF8000"
class ItemBox {
    _selected: number;
    _focus: Sprite;
    // _frame: Sprite;

    _items: Item[];

    constructor() {
        this._selected = 0;
        this._focus = createItemFocus();
        this._focus.z = 1;
        this._focus.setFlag(SpriteFlag.RelativeToCamera, true);


        this._items = [];
    }

    
    /**
     * Use "$this" to define a variable block that
     * references the "this" pointer.
     * @param name
     * @param sprite
     */
    //% block="ItemBox $this(ItemBox) add $name $sprite "    
    add(name:string, sprite: Sprite) {
        let item = new Item(name, sprite);
        this._items.push(item);

        for(let index=0; index<this._items.length; index++) {
            let _item = this._items[index];
            let pos = this._calcPos(_item.getSprite(), index);
            _item.setPosition(pos.x, pos.y);
        }

        this._updateFocus();
    }

    //% block="ItemBox $this(ItemBox) selected $name "    
    isSelected(name:string) : boolean {
        let item = this._items[this._selected];
        return item._name.compare(name) == 0;
    }
    
    //% block="next $this(ItemBox)"    
    next() {
        this._selected += 1;
        if( this._selected >= this._items.length )
            this._selected = 0;
        this._updateFocus();
    }

    //% block="prev $this(ItemBox)"    
    prev() {
        this._selected -= 1;
        if( this._selected < 0)
            this._selected = this._items.length - 1;
        this._updateFocus();
    }
    
    /**
     * Use "$this" to define a variable block that
     * references the "this" pointer.
     */
    //% block="Update $this(ItemBox)"    
    update() {
        this.debugPrint();
    }

    _calcPos(sprite: Sprite, index: number) {
        let iconSize = sprite.image.width;
        // let iconSize = 16;

        let center = scene.screenWidth() / 2.0; 
        let itemCenter = (this._items.length * iconSize) / 2.0;
        let start = center - itemCenter;
        let pos = {
            x: index * iconSize + start,
            y: scene.screenHeight() - iconSize
        }

        return pos;
    }

    _updateFocus() {
        let pos = this._calcPos(this._focus, this._selected);
        this._focus.setPosition(pos.x, pos.y);
    }

    debugPrint() {
        for (let item of this._items) {
            item.debugPrint();
        }

        console.log("this._items.length:" + this._items.length);
        console.log("this._selected:" + this._selected);
    }

}

/**
 * Widget namespace using en external class
 */
//% color="#FF8000"
namespace Items {


    /**
     * Create a ItemBox and automtically set it to a variable
     */
    //% block="empty ItemBox"
    //% blockSetVariable=ItemBox
    export function createEmptyItemBox(): ItemBox {
        return new ItemBox();
    }

}
