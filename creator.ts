

// namespace ext {
//     //% block
//     //% blockNamespace=sprites 
//     //% group="ext"
//     export function hoge() {

//     }

// }

//% color="#FF8080"
namespace creator {
    export enum Direction {
        TopLeft,
        TopCenter,
        TopRight,
        CenterLeft,
        Center,
        CenterRight,
        BottomLeft,
        BottomCenter,
        BottomRight
    }

    //% block="$direction of $sprite=variables_get(mySprite)"
    export function getTileLocation(sprite: Sprite, direction: Direction) : tiles.Location {
        let x=0, y=0;
        switch(direction) {
        case Direction.TopLeft: x=-1; y=-1; break;
        case Direction.TopCenter: x=0; y=-1; break;
        case Direction.TopRight: x=1; y=-1; break;
        case Direction.CenterLeft: x=-1; y=0; break;
        case Direction.Center: x=0; y=0; break;
        case Direction.CenterRight: x=1; y=0; break;
        case Direction.BottomLeft: x=-1; y=1; break;
        case Direction.BottomCenter: x=0; y=1; break;
        case Direction.BottomRight: x=1; y=1; break;
        }
        return tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y);
    }


    //% block="put $tile at $direction of $sprite=variables_get(mySprite)"
    export function putTile(sprite: Sprite, direction: Direction, tile: Image) {
        let loc = getTileLocation(sprite, direction);
        tiles.setTileAt(loc, tile);
        tiles.setWallAt(loc, false);
    }

    //% block="put $tile with wall at $direction of $sprite=variables_get(mySprite)"
    export function putTileWithWall(sprite: Sprite, direction: Direction, tile: Image) {
        let loc = getTileLocation(sprite, direction);
        tiles.setTileAt(loc, tile);
        tiles.setWallAt(loc, true);
    }

}