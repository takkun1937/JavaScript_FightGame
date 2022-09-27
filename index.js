const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/ring.jpeg',
  scale: 2.14
})


//弾
const bullet1 = new Bullet({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  imageSrc: './img/tama.png',
  scale: 0.05,
  framesMax: 1
})

const bullet2 = new Bullet({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    imageSrc: './img/tama.png',
    scale: 0.05,
    framesMax: 1
  })

  //player 必殺技
  const bigTama1 = new Bullet({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    imageSrc: './img/satan_attack.png',
    scale: 0.25,
    framesMax: 1
  })

  //enemy 必殺技
  const bigTama2 = new Bullet({
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    imageSrc: './img/meiweza_attack.png',
    scale: 0.25,
    framesMax: 1
  })

const player = new Fighter({
  position: {
    x: 200,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/satan_idle.png',
  framesMax: 1,
  scale: 0.25,
  offset: {
    x: 70,
    y: 0
  },
  sprites: {
    idle: {
      imageSrc: './img/satan_idle.png',
      framesMax: 1
    },
    run: {
      imageSrc: './img/satan_idle.png',
      framesMax: 1
    },
    jump: {
      imageSrc: './img/satan_idle.png',
      framesMax: 1
    },
    fall: {
      imageSrc: './img/satan_idle.png',
      framesMax: 1
    },
    attack1: {
      imageSrc: './img/satan_attack.png',
      framesMax: 1
    },
    takeHit: {
      imageSrc: './img/satan_damage.png',
      framesMax: 1
    },
    death: {
      imageSrc: './img/satan_death.png',
      framesMax: 1,
    },
    gard: {
        imageSrc: './img/satan_gard.png',
        framesMax: 1
    },
    vic: {
      imageSrc: './img/satan_vic.png',
      framesMax: 1
  }
  },
  attackBox: {
    offset: {
      x: 0,
      y: 50
    },
    width: 140,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: 800,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/meiweza.png',
  framesMax: 1,
  scale: 0.22,
  offset: {
    x: 0,
    y: 0
  },
  sprites: {
    idle: {
      imageSrc: './img/meiweza.png',
      framesMax: 1
    },
    run: {
      imageSrc: './img/meiweza.png',
      framesMax: 1
    },
    jump: {
      imageSrc: './img/meiweza.png',
      framesMax: 1
    },
    fall: {
      imageSrc: './img/meiweza.png',
      framesMax: 1
    },
    attack1: {
      imageSrc: './img/meiweza_attack.png',
      framesMax: 1
    },
    takeHit: {
      imageSrc: './img/meiweza_damage.png',
      framesMax: 1
    },
    death: {
      imageSrc: './img/born.png',
      framesMax: 1
    },
    gard: {
      imageSrc: './img/meiweza_attack.png',
      framesMax: 1
  },
  vic: {
    imageSrc: './img/meiweza_attack.png',
    framesMax: 1
}
  },
  attackBox: {
    offset: {
      x: -90,
      y: 50
    },
    width: 140,
    height: 50
  }
})

console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  q: {
    pressed: false
  },
  z: {
    pressed: false
  },
  e: {
    pressed: false
  },
  k: {
    pressed: false
  },
  h: {
    pressed: false
  },
  i: {
    pressed: false
  },
  m: {
    pressed: false
  },
  y: {
    pressed: false
  }
}

let skill1 = 0
let skill2 = 0
let skill = document.getElementById('skill')

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  //player gard
  if(keys.e.pressed && player.lastKey === 'e') {
    player.isGard = true
    player.switchSprite('gard')
  } else {
    player.isGard = false
    player.switchSprite('idle')
  }

  // jumping
  let jump = document.getElementById('jump')
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
    jump.play()
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

    //player bullet1
    let bulletSd = document.getElementById('bullet')
    if(keys.q.pressed) {
        bullet1.update()
        bulletSd.play()
        bullet1.isAttacking = true
        bullet1.velocity.x = 15
        window.setTimeout(function() {
            keys.q.pressed = false
        },1000)
      }else {
        bullet1.position.x = player.position.x
        bullet1.position.y = player.position.y + 50
        bullet1.isAttacking = false
      }
    
       // bullet for collision & enemy gets hit
       if (
        bulletCollision({
            bullet: bullet1,
          rectangle: enemy
        }) &&
        bullet1.isAttacking /*&&
        player.framesCurrent === 4*/
      ) {
        enemy.takeHit()
        bullet1.isAttacking = false
        keys.q.pressed = false
    
        gsap.to('#enemyHealth', {
          width: enemy.health + '%'
        })
      }

          //player 必殺技
    if(keys.z.pressed && skill1 < 3 ) {
        player.velocity.x = 50
        player.velocity.y = 0

        bigTama1.update()
        bigTama1.isAttacking = true
        bigTama1.velocity.x = 50
        window.setTimeout(function() {
            keys.z.pressed = false

            player.position.x = 200
        },400)
      }else {
        bigTama1.position.x = player.position.x
        bigTama1.position.y = player.position.y 
        bigTama1.isAttacking = false
      }
    
       // 必殺技 for collision & enemy gets hit
       if (
        bulletCollision({
            bullet: bigTama1,
          rectangle: enemy
        }) &&
        bigTama1.isAttacking /*&&
        player.framesCurrent === 4*/
      ) {
        enemy.bigHit()
        bigTama1.isAttacking = false
        keys.z.pressed = false
    
        gsap.to('#enemyHealth', {
          width: enemy.health + '%'
        })
      }

//

        //enemy bullet2
  if(keys.i.pressed) {
    bullet2.update()
    bulletSd.play()
    bullet2.isAttacking = true
    bullet2.velocity.x = -15
    window.setTimeout(function() {
        keys.i.pressed = false
    },1000)
  }else {
    bullet2.position.x = enemy.position.x 
    bullet2.position.y = enemy.position.y + 50
    bullet2.isAttacking = false
  }

   // bullet2 for collision & player gets hit
   if (
    bulletCollision({
        bullet: bullet2,
      rectangle: player
    }) &&
    bullet2.isAttacking /*&&
    player.framesCurrent === 4*/
  ) {
    player.takeHit()
    bullet2.isAttacking = false
    keys.i.pressed = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

            //enemy 必殺技
    if(keys.m.pressed && skill2 < 3 ) {
        enemy.velocity.x = -50
        enemy.velocity.y = 0

        bigTama2.update()
        bigTama2.isAttacking = true
        bigTama2.velocity.x = -50
        window.setTimeout(function() {
            keys.m.pressed = false

            enemy.position.x = 800
        },400)
      }else {
        bigTama2.position.x = enemy.position.x
        bigTama2.position.y = enemy.position.y 
        bigTama2.isAttacking = false
      }
    
       // 必殺技 for collision & player gets hit
       if (
        bulletCollision({
            bullet: bigTama2,
          rectangle: player
        }) &&
        bigTama2.isAttacking /*&&
        player.framesCurrent === 4*/
      ) {
        player.bigHit()
        bigTama2.isAttacking = false
        keys.m.pressed = false
    
        gsap.to('#playerHealth', {
          width: player.health + '%'
        })
      }

  // Enemy movement
  if (keys.h.pressed && enemy.lastKey === 'h') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.k.pressed && enemy.lastKey === 'k') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

    //enemy gard
    if(keys.y.pressed && enemy.lastKey === 'y') {
      enemy.isGard = true
      enemy.switchSprite('gard')
    } else {
      enemy.isGard = false
      enemy.switchSprite('idle')
    }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
    jump.play()
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking /*&&
    player.framesCurrent === 4*/
  ) {
    enemy.takeHit()
    player.isAttacking = false

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  let noHit = document.getElementById('noHit')
  // if player misses
  if (player.isAttacking /*&& player.framesCurrent === 4*/) {
    player.isAttacking = false
    noHit.play()
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking /*&&
    enemy.framesCurrent === 2*/
  ) {
    player.takeHit()
    enemy.isAttacking = false

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking /*&& enemy.framesCurrent === 2*/) {
    enemy.isAttacking = false
    noHit.play()
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
       if(player.position.y === 350) {
        player.velocity.y = -20
       }
        break
      case 's':
        player.attack()
        break
    case 'q':
        keys.q.pressed = true
        break
    case 'z':  
        if(skill1 < 2) {
          skill.play()
        }
        window.setTimeout(function() {
            keys.z.pressed = true
            skill1 ++
        }, 1000)
        break
    case 'e':
        keys.e.pressed = true
        player.lastKey = 'e'
        break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'k':
        keys.k.pressed = true
        enemy.lastKey = 'k'
        break
      case 'h':
        keys.h.pressed = true
        enemy.lastKey = 'h'
        break
      case 'u':
        if(enemy.position.y === 350) {
            enemy.velocity.y = -20
           }
        break
      case 'j':
        enemy.attack()
        break
      case 'i':
        keys.i.pressed = true
        break
      case 'm':
        if(skill2 < 2) {
          skill.play()
        }
        window.setTimeout(function() {
            keys.m.pressed = true
            skill2 ++
        }, 1000)
        break
      case 'y':
        keys.y.pressed = true
        enemy.lastKey = 'y'
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'e':
      keys.e.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'k':
      keys.k.pressed = false
      break
    case 'h':
      keys.h.pressed = false
      break
    case 'y':
      keys.y.pressed = false
      break
  }
})