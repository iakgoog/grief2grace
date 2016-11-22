<template>
  <div class="animated-area">
    <section class="hero is-fullheight main-background" v-if="!mainImage">
      <div class="hero-body">
        <div class="container">
          <center>
            <p class="instruction warning-message">Main image has not been selected!</p>
            <router-link to="/" class="button is-danger is-medium">Back</router-link>
          </center>
        </div>
      </div>
    </section>
    <canvas id="canvas"></canvas>
    <canvas id="helper"></canvas>
    <div id="particle_wrapper" v-show="isAnimating"></div>
    <img id="final_image" v-show="showFinal">
    <div class="button-wrapper" v-show="showButtons">
      <center v-if="isMobile">
        <p class="instruction">Touch and hold to save image</p>
      </center>
      <center>
        <a class="button is-light is-medium" @click="setupParticleWrapper">Replay</a>
        <a class="button is-success is-medium" download="mosaic.png" id="download_button" v-if="!isMobile">Download</a>
        <router-link to="/" class="button is-danger is-medium">Restart</router-link>
      </center>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'

const w = window
const d = document
const e = d.documentElement
const g = d.getElementsByTagName('body')[0]

var mainImage
var smallImages = []
var pWrapper
var finalImage

var canvas
var ctx
var hCanvas
var hCtx

var sx = 0
var sy = 0
var sWidth = 0
var sHeight = 0
var dx = 0
var dy = 0
var dWidth = 0
var dHeight = 0

const period = 8000

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default {
  name: 'play-animation',
  data () {
    return {
      isAnimating: true,
      showFinal: false,
      showButtons: false,
      finalDataImage: ''
    }
  },
  computed: {
    ...mapGetters({
      'mainImage': 'mainImage',
      'smallImages': 'smallImages'
    }),
    screenWidth () {
      return w.innerWidth || e.clientWidth || g.clientWidth
    },
    screenHeight () {
      return w.innerHeight || e.clientHeight || g.clientHeight
    },
    detectedSize () {
      const minSize = Math.min(this.screenWidth, this.screenHeight)
      const result = minSize - (minSize % this.grid)
      return result
    },
    grid () {
      if (this.screenWidth <= 480) {
        return 24
      } else if (this.screenWidth <= 800) {
        return 36
      }
      return 48
    },
    gridColumn () {
      return this.detectedSize / this.grid
    },
    getFinalImage () {
      return this.finalDataImage
    },
    isMobile () {
      const ua = window.navigator.userAgent
      return (/mobile/ig.test(ua))
    }
  },
  methods: {
    init () {
      this.isAnimating = true
      this.showFinal = false
      this.showButtons = false
      // console.log(`detectedSize => ${this.detectedSize}`)

      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      hCanvas = document.getElementById('helper')
      hCtx = hCanvas.getContext('2d')

      pWrapper = document.getElementById('particle_wrapper')
      finalImage = document.getElementById('final_image')

      var that = this

      this.loadSmallImages(this.smallImages, (images) => {
        // console.log('loadSmallImages with {' + images + '}')
        smallImages = images
        mainImage = new Image()
        mainImage.src = that.mainImage
        mainImage.onload = that.drawImage
      })
    },
    loadSmallImages (sources, callback) {
      var images = []
      var loadedImages = 0
      var numImages = sources.length
      // console.log('trigger loadSmallImages numImages => ' + numImages)
      for (let i = 0; i < numImages; i++) {
        images[i] = new Image()
        images[i].onload = function () {
          if (++loadedImages >= numImages) {
            // console.log('COMPLETE loadSmallImages')
            callback(images)
          }
        }
        images[i].src = sources[i]
      }
    },
    drawImage () {
      sWidth = mainImage.width
      sHeight = mainImage.height
      dWidth = this.detectedSize
      dHeight = dWidth

      console.log(`sWidth => [${sWidth}] | sHeight => [${sHeight}]`)

      canvas.width = dWidth
      canvas.height = dHeight

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(mainImage,
                    sx,
                    sy,
                    sWidth,
                    sHeight,
                    dx,
                    dy,
                    dWidth,
                    dHeight)

      ctx.globalAlpha = 0.3333

      for (let i = 0; i < this.gridColumn; i++) {
        for (let j = 0; j < this.gridColumn; j++) {
          const rand = getRandomInt(0, smallImages.length - 1)
          ctx.drawImage(smallImages[rand], this.grid * j, this.grid * i, this.grid, this.grid)
        }
      }

      this.finalDataImage = canvas.toDataURL('image/jpg')

      this.setupParticleWrapper()
    },
    setupParticleWrapper () {
      this.isAnimating = true
      this.showFinal = false
      this.showButtons = false

      finalImage.removeAttribute('style')

      while (pWrapper.hasChildNodes()) {
        pWrapper.removeChild(pWrapper.lastChild)
      }
      pWrapper.removeAttribute('style')

      pWrapper.style.width = canvas.width + 'px'
      pWrapper.style.height = canvas.height + 'px'

      this.generateParticles()
    },
    generateParticles () {
      const total = this.gridColumn * this.gridColumn
      let i = 0
      let j = 0

      for (let n = 0; n < total; n++) {
        if (j >= this.gridColumn) { j = 0; i++ }
        const iData = ctx.getImageData(this.grid * j, this.grid * i, this.grid, this.grid)
        hCanvas.width = hCanvas.height = this.grid
        hCtx.putImageData(iData, 0, 0)
        const randomHeight = getRandomInt(200, 400)
        const img = new Image()
        img.src = hCanvas.toDataURL('image/jpg')
        img.width = img.height = this.grid
        img.style.transform = 'translateZ(' + randomHeight + 'px)'

        pWrapper.appendChild(img)

        j++
      }

      const rand = getRandomInt(1, total)
      let count = 0
      const particles = pWrapper.querySelectorAll('img')

      const that = this

      /**
       * Start Animation
       */
      setTimeout(() => {
        for (var particle of particles) {
          const seconds = (count++ === rand) ? period + 1000 : getRandomInt(1000, period)
          particle.style.transitionDuration = seconds + 'ms'
          particle.style.transitionTimingFunction = 'ease-out'
          particle.style.transform = 'translateZ(0px)'
        }
      }, 1000)

      /**
       * Step after Animation
       */
      setTimeout(() => {
        that.isAnimating = false
        that.showFinal = true
        if (finalImage.src !== that.getFinalImage) {
          finalImage.src = that.getFinalImage
          finalImage.onload = endingAnimate
        } else {
          endingAnimate()
        }
        function endingAnimate () {
          if (that.screenWidth > that.screenHeight) {
            Velocity(finalImage,
              {
                width: '*=0.8',
                height: '*=0.8',
                top: '-=10%'
              },
              { duration: '300ms' })
          } else {
            const offsetLeft = Math.round(canvas.width / 2)
            const offsetTop = Math.round(canvas.height / 2)
            finalImage.style.marginTop = -offsetTop + 'px'
            finalImage.style.marginLeft = -offsetLeft + 'px'

            Velocity(finalImage,
              { top: '-=10%' },
              { duration: '300ms' })
          }
          setTimeout(() => {
            that.showButtons = true
            const downloadBtn = document.getElementById('download_button')
            downloadBtn.href = canvas.toDataURL('image/jpeg')
          }, 200)
        }
      }, period + 3000)
    }
  },
  mounted () {
    this.$store.commit('setAnimatingMode', true)
    if (this.mainImage) {
      this.init()
    } else {
      // this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.animated-area {
  min-height: 100vh;
}

#canvas, #particle_wrapper, #final_image {
  position: absolute;
  left: 50%;
  top: 50%;
}

#canvas, #particle_wrapper {
  transform: translate(-50%, -50%);
}

#canvas, #helper, .suppress {
  display: none;
}

.suppress {
  border-radius: 5%;
}

#particle_wrapper {
  -webkit-perspective: 200px;
  -webkit-perspective-origin: 50% 50%;
  -webkit-transform-style: preserve-3d;
}

.button-wrapper {
  position: absolute;
  width: 100%;
  bottom: 6%;
}

.warning-message {
  font-size: 2rem;
}

#particle_wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
}

@media only screen and (min-width : 1224px) {
  #final_image {
    transform: translate(-50%, -50%);
  }
}

</style>