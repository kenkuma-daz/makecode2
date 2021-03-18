controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        壁破壊(冒険者, 0, -1)
    } else if (controller.down.isPressed()) {
        壁破壊(冒険者, 0, 1)
    } else if (冒険者の向き == "左") {
        壁破壊(冒険者, -1, 0)
    } else if (冒険者の向き == "右") {
        壁破壊(冒険者, 1, 0)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.up.isPressed()) {
        壁生成(冒険者, 0, -1)
    } else if (controller.down.isPressed()) {
        壁生成(冒険者, 0, 1)
    } else if (冒険者の向き == "左") {
        壁生成(冒険者, -1, 0)
    } else if (冒険者の向き == "右") {
        壁生成(冒険者, 1, 0)
    }
})
function キャラクタ更新 (sprite: Sprite) {
    キャラクタアニメーション(sprite)
    sprite.vy = キャラクタ移動(sprite)
}
function 壁破壊 (sprite: Sprite, x: number, y: number) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), assets.tile`transparency16`)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), false)
}
function 壁生成 (sprite: Sprite, x: number, y: number) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), sprites.castle.tilePath5)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), true)
}
function キャラクタ移動 (sprite: Sprite) {
    if (キャラクタ壁接触(sprite, "下")) {
        if (controller.up.isPressed()) {
            return -200
        }
    } else {
        if (キャラクタ壁接触(sprite, "左") || キャラクタ壁接触(sprite, "右")) {
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
let 冒険者の向き = ""
let 冒険者: Sprite = null
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
game.onUpdate(function () {
    キャラクタ更新(冒険者)
})
