


// namespace SpriteKind {
//     export const Items = SpriteKind.create()
// }


/**
 * Declare a class outside and attach to a namespace.
 */
//% blockNamespace=Items color="#FF8000"
class Item {
    _name: string;
    _sprite: Sprite;

    constructor(name: string, sprite: Sprite) {
        this._name = name;
        this._sprite = sprite;
    }
}

function createItemFrame(): Sprite {
    return sprites.create(img`
        55555555555555555555555555555555555555555555555555555555555555555555555555555555
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        5...............5...............5...............5...............5..............5
        55555555555555555555555555555555555555555555555555555555555555555555555555555555
        `, SpriteKind.Items)
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
    _frame: Sprite;

    _items: Item[];

    constructor() {
        this._selected = 0;
        this._frame = createItemFrame();
        this._frame.z = 0;
        this._focus = createItemFocus();
        this._focus.z = 1;

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
    }

    //% block="prev $this(ItemBox)"    
    prev() {
        this._selected -= 1;
        if( this._selected < 0)
            this._selected = this._items.length - 1;
    }
    
    /**
     * Use "$this" to define a variable block that
     * references the "this" pointer.
     */
    //% block="Update $this(ItemBox)"    
    update() {
        this._frame.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 1);
        this._focus.setPosition(scene.cameraProperty(CameraProperty.X) + this._selected * 16 - 32, scene.cameraProperty(CameraProperty.Y) + 1)
        for (let item of this._items) {
            item._sprite.setPosition(scene.cameraProperty(CameraProperty.X) + this._items.indexOf(item) * 16 - 32, scene.cameraProperty(CameraProperty.Y) + 1)
        }

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
