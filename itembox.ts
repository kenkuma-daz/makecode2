

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
        `, SpriteKind.ItemsFrame)
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
    _listeners : Listener[];


    constructor() {
        this._selected = 0;
        this._focus = createItemFocus();
        this._focus.z = 1;
        this._focus.setFlag(SpriteFlag.RelativeToCamera, true);


        this._items = [];
        this._listeners = null;
    }

    attach(listeners : Listener[]) {
        this._listeners = listeners;
    }


    _findListenerByName(name: string) {
        let _listener = this._listeners.find((listener: Listener, index: number) => {
            return listener._name.compare(name) == 0;
        });
        if( _listener == undefined )
            return null;
        return _listener;
    }
    
    /**
     * Use "$this" to define a variable block that
     * references the "this" pointer.
     * @param name
     * @param Image
     */
    //% block="ItemBox $this(itemBox) add $name $img=screen_image_picker "    
    add(name:string, img: Image) {
        let sprite = sprites.create(img, SpriteKind.ItemsFrame);
        let item = new Item(name, sprite);
        this._items.push(item);

        for(let index=0; index<this._items.length; index++) {
            let _item = this._items[index];
            let pos = this._calcPos(_item.getSprite(), index);
            _item.setPosition(pos.x, pos.y);
        }

        this._updateFocus();
    }

    //% block="ItemBox $this(itemBox) add $itemKind $img"    
    //% itemKind.shadow="item_kind_enum_shim"
    //% img.shadow="screen_image_picker"
    add2(itemKind:number, img: Image) {
        let sprite = sprites.create(img, SpriteKind.ItemsFrame);
        let item = new Item(itemKind.toString(), sprite);
        this._items.push(item);

        for(let index=0; index<this._items.length; index++) {
            let _item = this._items[index];
            let pos = this._calcPos(_item.getSprite(), index);
            _item.setPosition(pos.x, pos.y);
        }

        this._updateFocus();
    }



    //% block="action $this(itemBox)"    
    action() {
        let item = this._items[this._selected];
        if( !item )
            return;
        let listener = this._findListenerByName(item._name);
        if( !listener )
            return;
        listener._handler();

    }

    //% block="ItemBox $this(itemBox) selected $name "    
    isSelected(name:string) : boolean {
        let item = this._items[this._selected];
        return item._name.compare(name) == 0;
    }
    
    //% block="next $this(itemBox)"    
    next() {
        this._selected += 1;
        if( this._selected >= this._items.length )
            this._selected = 0;
        this._updateFocus();
    }

    //% block="prev $this(itemBox)"    
    prev() {
        this._selected -= 1;
        if( this._selected < 0)
            this._selected = this._items.length - 1;
        this._updateFocus();
    }
    

    _calcPos(sprite: Sprite, index: number) {
        let iconSize = sprite.image.width;

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
        this._focus.setPosition(pos.x-1, pos.y);
    }

    debugPrint() {
        for (let item of this._items) {
            item.debugPrint();
        }

        console.log("this._items.length:" + this._items.length);
        console.log("this._selected:" + this._selected);
    }

}



class Listener {
    _name: string;
    _handler: () => void;

    constructor() {
    }
}


/**
 * Widget namespace using en external class
 */
//% color="#FF8000"
namespace Items {
    let _listeners : Listener[] = [];

    /**
     * Create a ItemBox and automtically set it to a variable
     */
    //% block="empty ItemBox"
    //% blockSetVariable=ItemBox
    export function createEmptyItemBox(): ItemBox {
        let itemBox = new ItemBox();
        itemBox.attach(_listeners);
        return itemBox;
    }

    //% block="on event $name executed"
    export function onEvent(name: string, handler: () => void) {
        let listener = new Listener();
        listener._name = name;
        listener._handler = handler;
        _listeners.push(listener);
    }

    //% shim=ENUM_GET
    //% blockId=item_kind_enum_shim
    //% block="Item $arg"
    //% enumName="ItemKind"
    //% enumMemberName="itemKind"
    //% enumPromptHint="e.g. Green, Orange, ..."
    //% enumInitialMembers="Hammer, Wall, Ladder, Gun, Sword"
    export function _itemKindEnumShim(arg: number) {
        // This function should do nothing, but must take in a single
        // argument of type number and return a number value.
        return arg;
    }

    //% blockId=on_event_with_item_kind
    //% block="on event $itemKind executed 2"
    //% itemKind.shadow="item_kind_enum_shim"
    export function onEvent2(itemKind: number, handler: () => void) {
        let listener = new Listener();
        listener._name = itemKind.toString();
        listener._handler = handler;
        _listeners.push(listener);
    }    



}
