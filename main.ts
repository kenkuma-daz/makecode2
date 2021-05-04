namespace SpriteKind {
    export const Items = SpriteKind.create()
}
function タイル生成 (sprite: Sprite, x: number, y: number, tile: Image) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), tile)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), false)
}
Items.onEvent("ハシゴ", function () {
    if (controller.up.isPressed()) {
        タイル生成(冒険者, 0, -1, assets.tile`ハシゴタイル`)
    } else if (controller.down.isPressed()) {
        タイル生成(冒険者, 0, 1, assets.tile`ハシゴタイル`)
    } else if (冒険者の向き == "左") {
        タイル生成(冒険者, -1, 0, assets.tile`ハシゴタイル`)
    } else if (冒険者の向き == "右") {
        タイル生成(冒険者, 1, 0, assets.tile`ハシゴタイル`)
    }
})
function モンスター作成 () {
    モンスター = sprites.create(img`
        . . f f f . . . . . . . . f f f 
        . f f c c . . . . . . f c b b c 
        f f c c . . . . . . f c b b c . 
        f c f c . . . . . . f b c c c . 
        f f f c c . c c . f c b b c c . 
        f f c 3 c c 3 c c f b c b b c . 
        f f b 3 b c 3 b c f b c c b c . 
        . c b b b b b b c b b c c c . . 
        . c 1 b b b 1 b b c c c c . . . 
        c b b b b b b b b b c c . . . . 
        c b c b b b c b b b b f . . . . 
        f b 1 f f f 1 b b b b f c . . . 
        f b b b b b b b b b b f c c . . 
        . f b b b b b b b b c f . . . . 
        . . f b b b b b b c f . . . . . 
        . . . f f f f f f f . . . . . . 
        `, SpriteKind.Enemy)
    モンスター.setPosition(randint(0, 1600), randint(0, 10))
    モンスター.follow(冒険者, 20)
}
Items.onEvent("壁", function () {
    if (controller.up.isPressed()) {
        壁生成(冒険者, 0, -1, assets.tile`壁タイル`)
    } else if (controller.down.isPressed()) {
        壁生成(冒険者, 0, 1, assets.tile`壁タイル`)
    } else if (冒険者の向き == "左") {
        壁生成(冒険者, -1, 0, assets.tile`壁タイル`)
    } else if (冒険者の向き == "右") {
        壁生成(冒険者, 1, 0, assets.tile`壁タイル`)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(冒険者, 0, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    itemBox.action()
})
Items.onEvent("重力操作", function () {
    if (controller.up.isPressed()) {
        tiles.setTilemap(tilemap`level10`)
    } else if (controller.down.isPressed()) {
        tiles.setTilemap(tilemap`level1`)
    } else if (controller.right.isPressed()) {
        tiles.setTilemap(tilemap`level12`)
    } else if (controller.left.isPressed()) {
        tiles.setTilemap(tilemap`level15`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        itemBox.prev()
    }
})
function 道具箱生成 () {
    itemBox = Items.createEmptyItemBox()
    itemBox.add("ハンマー", assets.image`ハンマー`)
    itemBox.add("壁", assets.tile`壁タイル`)
    itemBox.add("ハシゴ", assets.tile`ハシゴタイル`)
    itemBox.add("銃", assets.image`ハンドガン`)
    itemBox.add("ジェットパック", assets.image`myImage0`)
    itemBox.add("時計", assets.image`myImage1`)
    itemBox.add("破壊装置", img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e e e . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . f f f f f f f . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f 1 f f f 1 f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f 1 f f f f f 1 f f . . . 
        . . f f 1 1 1 1 1 1 1 f f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f f f f f f f . . . . 
        . . . . f f f f f f f . . . . . 
        `)
    itemBox.add("重力操作", img`
        . . . . . . f . . . . . . . . . 
        . . . . . f f f . . . . . . . . 
        . . . . f 1 f 1 f . . . . . . . 
        . . . f 1 1 f 1 1 f . . . . . . 
        . . f 1 1 1 f 1 1 1 f . . . . . 
        . f 1 1 1 1 f 1 1 1 1 f . . . . 
        f f f f f f f f f f f f f . . . 
        . f 1 1 1 1 f 1 1 1 1 f . . . . 
        . . f 1 1 1 f 1 1 1 f . . . . . 
        . . . f 1 1 f 1 1 f . . . . . . 
        . . . . f 1 f 1 f . . . . . . . 
        . . . . . f f f . . . . . . . . 
        . . . . . . f . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
Items.onEvent("銃", function () {
    if (冒険者の向き == "左") {
        弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, -200, 0)
    } else if (冒険者の向き == "右") {
        弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, 200, 0)
    }
})
Items.onEvent("ハンマー", function () {
    if (controller.up.isPressed()) {
        壁タイル破壊(冒険者, 0, -1)
    } else if (controller.down.isPressed()) {
        壁タイル破壊(冒険者, 0, 1)
    } else if (冒険者の向き == "左") {
        壁タイル破壊(冒険者, -1, 0)
    } else if (冒険者の向き == "右") {
        壁タイル破壊(冒険者, 1, 0)
    }
})
Items.onEvent("破壊装置", function () {
    if (controller.A.isPressed()) {
        壁タイル破壊(冒険者, 0, -1)
        壁タイル破壊(冒険者, -1, 0)
        壁タイル破壊(冒険者, 0, 1)
        壁タイル破壊(冒険者, 1, 0)
        壁タイル破壊(冒険者, 1, -1)
        壁タイル破壊(冒険者, 1, 1)
        壁タイル破壊(冒険者, -1, -1)
        壁タイル破壊(冒険者, -1, 1)
    }
})
function キャラクタ更新 (sprite: Sprite) {
    キャラクタアニメーション(sprite)
    sprite.vy = キャラクタ移動(sprite)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        itemBox.next()
    }
})
Items.onEvent("時計", function () {
    if (controller.A.isPressed()) {
        info.setLife(info.life() + 1)
        pause(100)
        info.changeScoreBy(-1)
    }
})
function 壁生成 (sprite: Sprite, x: number, y: number, tile: Image) {
    tiles.setTileAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), tile)
    tiles.setWallAt(tiles.getTileLocation(sprite.x / 16 + x, sprite.y / 16 + y), true)
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(冒険者, 100, 0)
})
function キャラクタ移動 (sprite: Sprite) {
    if (itemBox.isSelected("ジェットパック") && controller.A.isPressed()) {
        return -80
    }
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.baDing.play()
    otherSprite.destroy(effects.fire, 500)
    モンスター作成()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.playMelody("C5 B A G F E D C ", 1000)
    info.changeLifeBy(-1)
    pause(3000)
})
let 弾丸: Sprite = null
let itemBox: ItemBox = null
let モンスター: Sprite = null
let 冒険者の向き = ""
let 冒険者: Sprite = null
道具箱生成()
tiles.setTilemap(tilemap`level1`)
scene.setBackgroundColor(9)
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
info.setLife(8)
controller.moveSprite(冒険者, 100, 0)
scene.cameraFollowSprite(冒険者)
tiles.placeOnTile(冒険者, tiles.getTileLocation(2, 8))
for (let index = 0; index < 5; index++) {
    モンスター作成()
}
game.onUpdate(function () {
    キャラクタ更新(冒険者)
})
game.onUpdate(function () {
    if (info.score() == -1) {
        game.over(false)
    }
})
forever(function () {
	
})
forever(function () {
	
})
