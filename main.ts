enum ItemKind {
    Hammer,
    Wall,
    Ladder,
    Gun,
    Sword
}
namespace SpriteKind {
    export const Items = SpriteKind.create()
}
function 剣更新 () {
    if (剣振中) {
        剣.setPosition(冒険者.x, 冒険者.y)
    }
}
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    controller.moveSprite(冒険者, 0, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    itemBox.action()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        itemBox.prev()
    }
})
function 道具箱生成 () {
    itemBox = Items.createEmptyItemBox()
    itemBox.add(ItemKind.Hammer, assets.image`ハンマー`)
    itemBox.add(ItemKind.Wall, assets.tile`壁タイル`)
    itemBox.add(ItemKind.Ladder, assets.tile`ハシゴタイル`)
    itemBox.add(ItemKind.Gun, assets.image`ハンドガン`)
    itemBox.add(ItemKind.Sword, assets.image`myImage`)
}
Items.onEvent(ItemKind.Sword, function () {
    剣を振る()
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        itemBox.next()
    }
})
Items.onEvent(ItemKind.Hammer, function () {
    if (controller.up.isPressed()) {
        creator.putTile(冒険者, creator.Direction.TopCenter, myTiles.transparency16)
    } else if (controller.down.isPressed()) {
        creator.putTile(冒険者, creator.Direction.BottomCenter, myTiles.transparency16)
    } else if (冒険者の向き == "左") {
        creator.putTile(冒険者, creator.Direction.CenterLeft, myTiles.transparency16)
    } else if (冒険者の向き == "右") {
        creator.putTile(冒険者, creator.Direction.CenterRight, myTiles.transparency16)
    }
})
Items.onEvent(ItemKind.Gun, function () {
    if (冒険者の向き == "左") {
        if (controller.up.isPressed()) {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸1`, 冒険者, -80, -80)
        } else if (controller.down.isPressed()) {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸2`, 冒険者, -80, 80)
        } else {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, -100, 0)
        }
    } else if (冒険者の向き == "右") {
        if (controller.up.isPressed()) {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸2`, 冒険者, 80, -80)
        } else if (controller.down.isPressed()) {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸1`, 冒険者, 80, 80)
        } else {
            弾丸 = sprites.createProjectileFromSprite(assets.image`弾丸`, 冒険者, 100, 0)
        }
    }
})
function 剣を振る () {
    if (剣振中) {
        return
    }
    剣 = sprites.create(img`
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
    剣振中 = true
    剣.setPosition(冒険者.x, 冒険者.y)
    if (冒険者の向き == "左") {
        animation.runImageAnimation(
        剣,
        assets.animation`sword_left_anim`,
        100,
        false
        )
    } else if (冒険者の向き == "右") {
        animation.runImageAnimation(
        剣,
        assets.animation`sword_right_anim`,
        100,
        false
        )
    }
    timer.after(300, function () {
        剣.destroy()
        剣振中 = false
    })
}
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    controller.moveSprite(冒険者, 100, 0)
})
Items.onEvent(ItemKind.Wall, function () {
    if (controller.up.isPressed()) {
        creator.putTileWithWall(冒険者, creator.Direction.TopCenter, myTiles.tile1)
    } else if (controller.down.isPressed()) {
        creator.putTileWithWall(冒険者, creator.Direction.BottomCenter, myTiles.tile1)
    } else if (冒険者の向き == "左") {
        creator.putTileWithWall(冒険者, creator.Direction.CenterLeft, myTiles.tile1)
    } else if (冒険者の向き == "右") {
        creator.putTileWithWall(冒険者, creator.Direction.CenterRight, myTiles.tile1)
    }
})
function キャラクタ移動 (sprite: Sprite) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
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
Items.onEvent(ItemKind.Ladder, function () {
    if (controller.up.isPressed()) {
        creator.putTile(冒険者, creator.Direction.TopCenter, myTiles.tile2)
    } else if (controller.down.isPressed()) {
        creator.putTile(冒険者, creator.Direction.BottomCenter, myTiles.tile2)
    } else if (冒険者の向き == "左") {
        creator.putTile(冒険者, creator.Direction.CenterLeft, myTiles.tile2)
    } else if (冒険者の向き == "右") {
        creator.putTile(冒険者, creator.Direction.CenterRight, myTiles.tile2)
    }
})
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
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    モンスター作成()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
})
let 弾丸: Sprite = null
let 冒険者の向き = ""
let itemBox: ItemBox = null
let モンスター: Sprite = null
let 剣: Sprite = null
let 剣振中 = false
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
for (let index = 0; index < 3; index++) {
    モンスター作成()
}
剣振中 = false
game.onUpdate(function () {
    キャラクタアニメーション(冒険者)
    冒険者.vy = キャラクタ移動(冒険者)
    剣更新()
})
