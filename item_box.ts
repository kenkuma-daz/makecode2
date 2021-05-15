

namespace SpriteKind {
    export const ItemBox = SpriteKind.create()
}

namespace itembox.sprite {
    export function createFrame(): Sprite {
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
            `, SpriteKind.ItemBox)
    }

    export function createFocus(): Sprite {
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
            `, SpriteKind.ItemBox)
    }
}


namespace itembox.listeners {
    export class Listener {
        _kind: number;
        _focus: () => void;
        _action: () => void;
        _blur: () => void;

        constructor() {
            this._focus = null;
            this._action = null;
            this._blur = null;
        }
    }

    export function findListenerByKind(listeners: Listener[], itemKind: number) {
        let listener = listeners.find((listener: itembox.listeners.Listener, index: number) => {
            return listener._kind == itemKind;
        });
        if( listener == undefined )
            return null;
        return listener;
    }
}

/**
 * ItemBox namespace using en external class
 */
//% blockNamespace=Itembox color="#FF8000"
namespace itembox.items {
    export class Item {
        _kind: number;
        _sprite: Sprite;
        _frame: Sprite;

        constructor(kind: number, sprite: Sprite) {
            this._kind = kind;
            this._sprite = sprite;
            this._sprite.setFlag(SpriteFlag.RelativeToCamera, true);
            this._frame = itembox.sprite.createFrame();
            this._frame.setFlag(SpriteFlag.RelativeToCamera, true);
        }

        setPosition(x: number, y: number) {
            this._sprite.setPosition(x, y);
            this._frame.setPosition(x-1, y);
        }

        getSprite() {
            return this._sprite;
        }

        debugPrint() {
            console.log("x   :" + this._sprite.x);
            console.log("y   :" + this._sprite.y);
        }
    }

    export class ItemBox {
        _previous: number;
        _current: number;
        _focus: Sprite;

        _items: Item[];
        _listeners : itembox.listeners.Listener[];


        constructor() {
            this._previous = -1;
            this._current = 0;
            this._focus = itembox.sprite.createFocus();
            this._focus.z = 1;
            this._focus.setFlag(SpriteFlag.RelativeToCamera, true);


            this._items = [];
            this._listeners = null;
        }

        attach(listeners : itembox.listeners.Listener[]) {
            this._listeners = listeners;
        }
        
        //% block="ItemBox $this(itemBox) add $itemKind $img"    
        //% itemKind.shadow="item_kind_enum_shim"
        //% img.shadow="screen_image_picker"
        add(itemKind:number, img: Image) {

            let found = this._items.some((_item: Item, index: number) => {
                return _item._kind == itemKind;
            });
            if( found )
                return;

            // this._findListenerByKind(itemKind)

            console.log("add() kind:" + itemKind);


            let sprite = sprites.create(img, SpriteKind.ItemBox);
            let item = new Item(itemKind, sprite);
            this._items.push(item);

            for(let index=0; index<this._items.length; index++) {
                let _item = this._items[index];
                let pos = this._calcPos(_item.getSprite(), index);
                _item.setPosition(pos.x, pos.y);
            }

            this._updateFocus();
        }

        //% block="ItemBox $this(itemBox) selected $itemKind "    
        //% itemKind.shadow="item_kind_enum_shim"
        isSelected(itemKind:number) : boolean {
            let item = this._items[this._current];
            return item._kind == itemKind;
        }

        //% block="action $this(itemBox)"    
        action() {
            this._onAction(this._current);
        }

        //% block="next $this(itemBox)"    
        next() {
            this._current += 1;
            if( this._current >= this._items.length )
                this._current = 0;
            this._updateFocus();
            this._onBlur(this._previous);
            this._onFocus(this._current);
            this._previous = this._current;
        }

        //% block="prev $this(itemBox)"    
        prev() {
            this._current -= 1;
            if( this._current < 0)
                this._current = this._items.length - 1;
            this._updateFocus();
            this._onBlur(this._previous);
            this._onFocus(this._current);
            this._previous = this._current;
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
            let pos = this._calcPos(this._focus, this._current);
            this._focus.setPosition(pos.x-1, pos.y);
        }

        _onFocus(index: number) {
            let listener = this._findListenerByIndex(index);
            if( listener && listener._focus)
                listener._focus();
        }

        _onAction(index: number) {
            let listener = this._findListenerByIndex(index);
            if( listener && listener._action)
                listener._action();
        }

        _onBlur(index: number) {
            let listener = this._findListenerByIndex(index);
            if( listener && listener._blur)
                listener._blur();
        }

        _findListenerByIndex(index: number) : itembox.listeners.Listener {
            if( index == -1)
                return null;
            let item = this._items[index];
            return itembox.listeners.findListenerByKind(this._listeners, item._kind);
        }

        debugPrint() {
            for (let item of this._items) {
                item.debugPrint();
            }

            console.log("this._items.length:" + this._items.length);
            console.log("this._current:" + this._current);
        }

    }
}



/**
 * Itembox namespace using en external class
 */
//% blockNamespace=Itembox color="#FF8000"
namespace itembox.util {
    let _listeners : itembox.listeners.Listener[] = [];


    /**
     * Create a ItemBox and automtically set it to a variable
     */
    //% block="empty ItemBox"
    //% blockSetVariable=itemBox
    export function createEmptyItemBox(): itembox.items.ItemBox {
        let itemBox = new itembox.items.ItemBox();
        itemBox.attach(_listeners);
        return itemBox;
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

    //% blockId=on_focus_with_item_kind
    //% block="on $itemKind focus event"
    //% itemKind.shadow="item_kind_enum_shim"
    export function onFocus(itemKind: number, handler: () => void) {
        let listener = itembox.listeners.findListenerByKind(_listeners, itemKind);
        if( !listener ) {
            listener = new itembox.listeners.Listener();
            listener._kind = itemKind;
            _listeners.push(listener);
        }
        listener._focus = handler;
    }

    //% blockId=on_event_with_item_kind
    //% block="on $itemKind action event"
    //% itemKind.shadow="item_kind_enum_shim"
    export function onEvent(itemKind: number, handler: () => void) {
        let listener = itembox.listeners.findListenerByKind(_listeners, itemKind);
        if( !listener ) {
            console.log("add listener kind:" + itemKind);
            listener = new itembox.listeners.Listener();
            listener._kind = itemKind;
            _listeners.push(listener);
        }
        listener._action = handler;
    }

    //% blockId=on_blur_with_item_kind
    //% block="on $itemKind blur event"
    //% itemKind.shadow="item_kind_enum_shim"
    export function onBlur(itemKind: number, handler: () => void) {
        let listener = itembox.listeners.findListenerByKind(_listeners, itemKind);
        if( !listener ) {
            listener = new itembox.listeners.Listener();
            listener._kind = itemKind;
            _listeners.push(listener);
        }
        listener._blur = handler;
    }
}



