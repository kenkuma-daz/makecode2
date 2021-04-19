// /**
//  * Functions that create objects should store them in variables.
//  */
// //% color="#AA278D"
// namespace language {
//     //%
//     export class Robot { }

//     /**
//      * Creates a robot and automtically set it to a variable
//      */
//     //% block="create robot"
//     //% blockSetVariable=robot
//     export function createRobot(): Robot {
//         return undefined;
//     }
// }


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

    /**
     * Set a name to the Item
     * @param name
     */
    //% block="turn %Items(ItemBox) %active"
    setName(name: string) {
        this._name = name;
    }
    
}


// function 道具箱生成 () {
//     道具リスト = []
//     for (let 道具 of [assets.image`ハンマー`, assets.tile`壁タイル`, assets.tile`ハシゴタイル`, assets.image`ハンドガン`]) {
//         道具リスト.push(sprites.create(道具, SpriteKind.Items))
//     }
//     道具インデックス = 0
//     道具箱 = sprites.create(img`
//         55555555555555555555555555555555555555555555555555555555555555555555555555555555
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         5...............5...............5...............5...............5..............5
//         55555555555555555555555555555555555555555555555555555555555555555555555555555555
//         `, SpriteKind.Items)
//     道具選択枠 = sprites.create(img`
//         3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
//         3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 . . . . . . . . . . . . 3 3 
//         3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
//         3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
//         `, SpriteKind.Items)
// }

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
        this._focus = createItemFocus();

        this._items = [];
        // this._items.push(new Item("ハンマー", sprites.create(assets.image`ハンマー`, SpriteKind.Items)));
        // this._items.push(new Item("壁タイル", sprites.create(assets.image`壁タイル`, SpriteKind.Items)));
        // this._items.push(new Item("ハシゴタイル", sprites.create(assets.image`ハシゴタイル`, SpriteKind.Items)));
        // this._items.push(new Item("ハンドガン", sprites.create(assets.image`ハンドガン`, SpriteKind.Items)));

    }

    // /**
    //  * Use "$this" to define a variable block that
    //  * references the "this" pointer.
    //  */
    // //% block="ItemBox $this(ItemBox) add $item"    
    // addItem(item: Item) {
    //     this._items.push(item);
    // }

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
