namespace SpriteKind {
    export const Items = SpriteKind.create()
}
function タイル生成 (sprite: Sprite, x: number, y: number, tile: Image) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), tile)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), false)
}
function モンスター作成 () {
    for (let index = 0; index < 4; index++) {
        モンスター = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        モンスター.setPosition(randint(0, 1600), randint(0, 10))
        モンスター.follow(冒険者, 100)
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(冒険者, 0, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (道具リスト[道具インデックス].image.equals(assets.image`ハンマー`)) {
        if (controller.up.isPressed()) {
            壁タイル破壊(冒険者, 0, -1)
        } else if (controller.down.isPressed()) {
            壁タイル破壊(冒険者, 0, 1)
        } else if (冒険者の向き == "左") {
            壁タイル破壊(冒険者, -1, 0)
        } else if (冒険者の向き == "右") {
            壁タイル破壊(冒険者, 1, 0)
        }
    } else if (道具リスト[道具インデックス].image.equals(assets.tile`壁タイル`)) {
        if (controller.up.isPressed()) {
            壁生成(冒険者, 0, -1, assets.tile`壁タイル`)
        } else if (controller.down.isPressed()) {
            壁生成(冒険者, 0, 1, assets.tile`壁タイル`)
        } else if (冒険者の向き == "左") {
            壁生成(冒険者, -1, 0, assets.tile`壁タイル`)
        } else if (冒険者の向き == "右") {
            壁生成(冒険者, 1, 0, assets.tile`壁タイル`)
        }
    } else if (道具リスト[道具インデックス].image.equals(assets.tile`ハシゴタイル`)) {
        if (controller.up.isPressed()) {
            タイル生成(冒険者, 0, -1, assets.tile`ハシゴタイル`)
        } else if (controller.down.isPressed()) {
            タイル生成(冒険者, 0, 1, assets.tile`ハシゴタイル`)
        } else if (冒険者の向き == "左") {
            タイル生成(冒険者, -1, 0, assets.tile`ハシゴタイル`)
        } else if (冒険者の向き == "右") {
            タイル生成(冒険者, 1, 0, assets.tile`ハシゴタイル`)
        }
    } else if (道具リスト[道具インデックス].image.equals(assets.image`ハンドガン`)) {
        if (冒険者の向き == "左") {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, -200, 0)
        } else if (冒険者の向き == "右") {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, 200, 0)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        道具インデックス = (道具インデックス + (道具リスト.length - 1)) % 道具リスト.length
    }
})
function 道具箱生成 () {
    道具リスト = []
    for (let 道具 of [assets.image`ハンマー`, assets.tile`壁タイル`, assets.tile`ハシゴタイル`, assets.image`ハンドガン`]) {
        道具リスト.push(sprites.create(道具, SpriteKind.Items))
    }
    道具インデックス = 0
    道具箱 = sprites.create(img`
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
    道具選択枠 = sprites.create(img`
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
function キャラクタ更新 (sprite: Sprite) {
    キャラクタアニメーション(sprite)
    sprite.vy = キャラクタ移動(sprite)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        道具インデックス = (道具インデックス + (道具リスト.length + 1)) % 道具リスト.length
    }
})
function 壁生成 (sprite: Sprite, x: number, y: number, tile: Image) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), tile)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), true)
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(冒険者, 100, 0)
})
function 道具箱更新 (sprite: Sprite) {
    道具箱.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 48)
    道具選択枠.setPosition(scene.cameraProperty(CameraProperty.X) + 道具インデックス * 16 - 32, scene.cameraProperty(CameraProperty.Y) + 48)
    for (let 道具 of 道具リスト) {
        道具.setPosition(scene.cameraProperty(CameraProperty.X) + 道具リスト.indexOf(道具) * 16 - 32, scene.cameraProperty(CameraProperty.Y) + 48)
    }
}
function キャラクタ移動 (sprite: Sprite) {
    if (キャラクタ壁接触(sprite, "下")) {
        if (controller.up.isPressed()) {
            return -200
        }
    } else {
        if (sprite.tileKindAt(TileDirection.Center, assets.tile`ハシゴタイル`)) {
            if (controller.up.isPressed()) {
                return -100
            } else if (controller.down.isPressed()) {
                return 100
            } else {
                return 0
            }
        } else if (!(controller.up.isPressed())) {
            sprite.vy = 200
            return 200
        }
    }
    return Math.min(sprite.vy + 8, 200)
}
function 壁タイル破壊 (sprite: Sprite, x: number, y: number) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), assets.tile`transparency16`)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), false)
}
function キャラクタアニメーション (sprite: Sprite) {
    if (!(controller.left.isPressed()) && !(controller.right.isPressed())) {
        animation.stopAnimation(animation.AnimationTypes.All, sprite)
    } else if (controller.left.isPressed()) {
        if (!(冒険者の向き == "左")) {
            animation.runImageAnimation(
            冒険者,
            [img`
                . . . . f f f f f f . . . . . . 
                . . . f 2 f e e e e f f . . . . 
                . . f 2 2 2 f e e e e f f . . . 
                . . f e e e e f f e e e f . . . 
                . f e 2 2 2 2 e e f f f f . . . 
                . f 2 e f f f f 2 2 2 e f . . . 
                . f f f e e e f f f f f f f . . 
                . f e e 4 4 f b e 4 4 e f f . . 
                . . f e d d f 1 4 d 4 e e f . . 
                . . . f d d d d 4 e e e f . . . 
                . . . f e 4 4 4 e e f f . . . . 
                . . . f 2 2 2 e d d 4 . . . . . 
                . . . f 2 2 2 e d d e . . . . . 
                . . . f 5 5 4 f e e f . . . . . 
                . . . . f f f f f f . . . . . . 
                . . . . . . f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . . f 2 f e e e e f f . . . . 
                . . f 2 2 2 f e e e e f f . . . 
                . . f e e e e f f e e e f . . . 
                . f e 2 2 2 2 e e f f f f . . . 
                . f 2 e f f f f 2 2 2 e f . . . 
                . f f f e e e f f f f f f f . . 
                . f e e 4 4 f b e 4 4 e f f . . 
                . . f e d d f 1 4 d 4 e e f . . 
                . . . f d d d e e e e e f . . . 
                . . . f e 4 e d d 4 f . . . . . 
                . . . f 2 2 e d d e f . . . . . 
                . . f f 5 5 f e e f f f . . . . 
                . . f f f f f f f f f f . . . . 
                . . . f f f . . . f f . . . . . 
                `,img`
                . . . . f f f f f f . . . . . . 
                . . . f 2 f e e e e f f . . . . 
                . . f 2 2 2 f e e e e f f . . . 
                . . f e e e e f f e e e f . . . 
                . f e 2 2 2 2 e e f f f f . . . 
                . f 2 e f f f f 2 2 2 e f . . . 
                . f f f e e e f f f f f f f . . 
                . f e e 4 4 f b e 4 4 e f f . . 
                . . f e d d f 1 4 d 4 e e f . . 
                . . . f d d d d 4 e e e f . . . 
                . . . f e 4 4 4 e e f f . . . . 
                . . . f 2 2 2 e d d 4 . . . . . 
                . . . f 2 2 2 e d d e . . . . . 
                . . . f 5 5 4 f e e f . . . . . 
                . . . . f f f f f f . . . . . . 
                . . . . . . f f f . . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . . f 2 f e e e e f f . . . . 
                . . f 2 2 2 f e e e e f f . . . 
                . . f e e e e f f e e e f . . . 
                . f e 2 2 2 2 e e f f f f . . . 
                . f 2 e f f f f 2 2 2 e f . . . 
                . f f f e e e f f f f f f f . . 
                . f e e 4 4 f b e 4 4 e f f . . 
                . . f e d d f 1 4 d 4 e e f . . 
                . . . f d d d d 4 e e e f . . . 
                . . . f e 4 4 4 e d d 4 . . . . 
                . . . f 2 2 2 2 e d d e . . . . 
                . . f f 5 5 4 4 f e e f . . . . 
                . . f f f f f f f f f f . . . . 
                . . . f f f . . . f f . . . . . 
                `],
            100,
            true
            )
        }
        冒険者の向き = "左"
    } else if (controller.right.isPressed()) {
        if (!(冒険者の向き == "右")) {
            animation.runImageAnimation(
            冒険者,
            [img`
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e 4 d d d d f . . . 
                . . . . f f e e 4 4 4 e f . . . 
                . . . . . 4 d d e 2 2 2 f . . . 
                . . . . . e d d e 2 2 2 f . . . 
                . . . . . f e e f 4 5 5 f . . . 
                . . . . . . f f f f f f . . . . 
                . . . . . . . f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e e e d d d f . . . 
                . . . . . f 4 d d e 4 e f . . . 
                . . . . . f e d d e 2 2 f . . . 
                . . . . f f f e e f 5 5 f f . . 
                . . . . f f f f f f f f f f . . 
                . . . . . f f . . . f f f . . . 
                `,img`
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e 4 d d d d f . . . 
                . . . . f f e e 4 4 4 e f . . . 
                . . . . . 4 d d e 2 2 2 f . . . 
                . . . . . e d d e 2 2 2 f . . . 
                . . . . . f e e f 4 5 5 f . . . 
                . . . . . . f f f f f f . . . . 
                . . . . . . . f f f . . . . . . 
                `,img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e 4 d d d d f . . . 
                . . . . 4 d d e 4 4 4 e f . . . 
                . . . . e d d e 2 2 2 2 f . . . 
                . . . . f e e f 4 4 5 5 f f . . 
                . . . . f f f f f f f f f f . . 
                . . . . . f f . . . f f f . . . 
                `],
            100,
            true
            )
        }
        冒険者の向き = "右"
    } else {
    	
    }
}
function キャラクタ壁接触 (sprite: Sprite, 向き: string) {
    if (sprite.isHittingTile(CollisionDirection.Left) && 向き == 冒険者の向き) {
    	
    } else if (sprite.isHittingTile(CollisionDirection.Right) && 向き == 冒険者の向き) {
    	
    } else if (sprite.isHittingTile(CollisionDirection.Bottom) && 向き == "下") {
    	
    } else {
        return false
    }
    return true
}
let 道具選択枠: Sprite = null
let 道具箱: Sprite = null
let 弾丸: Sprite = null
let 冒険者の向き = ""
let 道具インデックス = 0
let 道具リスト: Sprite[] = []
let モンスター: Sprite = null
let 冒険者: Sprite = null
道具箱生成()
tiles.setTilemap(tilemap`level1`)
冒険者 = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(冒険者, 100, 0)
scene.cameraFollowSprite(冒険者)
tiles.placeOnTile(冒険者, tiles.getTileLocation(2, 8))
モンスター作成()
game.onUpdate(function () {
    キャラクタ更新(冒険者)
    道具箱更新(冒険者)
})
