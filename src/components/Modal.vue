<template>
  
  <div id="myModal" class="modal" :class="{'is-active': showModal}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Crop your image</p>
        <button class="delete" @click="showModal = false"></button>
      </header>
      <section class="modal-card-body has-text-centered">
        <div class="container">
          <div class="cropper-area"></div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <center>
          <a class="button is-primary" @click="showResult">Save changes</a>
          <a class="button" @click="showModal = false">Cancel</a>
        </center>
      </footer>
    </div>
  </div>

</template>

<script>
// require('exif-js')
import EXIF from '../customLibs/exif'
window.EXIF = EXIF
import Croppie from '../customLibs/croppie'
import { mapActions } from 'vuex'

export default {
  name: 'modal',
  data () {
    return {
      cropper: {},
      showModal: false,
      mode: '',
      imageSrc: ''
    }
  },
  computed: {
    cropElement () {
      return document.querySelector('.cropper-area')
    }
  },
  methods: {
    ...mapActions({
      'setBeforeCropImage': 'setBeforeCropImage'
    }),
    init () {
      const indVar = (window.screen.width > window.screen.height) ? window.screen.height : window.screen.width
      const factor = (window.screen.width > window.screen.height) ? 0.4 : 0.6666
      const displayImageWidth = Math.round(indVar * factor)
      // console.log(`clientWidth => ${displayImageWidth}`)
      this.cropper = new Croppie(this.cropElement, {
        enableExif: true,
        viewport: {
          width: displayImageWidth - 20,
          height: displayImageWidth - 20,
          type: 'square'
        },
        boundary: {
          width: displayImageWidth,
          height: displayImageWidth
        }
      })
    },
    initEvents () {
      this.$events.listen('displayModal', this.displayModal)
    },
    displayModal (image) {
      this.mode = image.mode
      this.showModal = true
      const that = this
      if (this.imageSrc !== image.src) {
        this.imageSrc = image.src
        setTimeout(function () {
          that.cropper.bind({
            url: image.src,
            zoom: 0
          }).then(function () {
            console.log('bind complete')
          })
        }, 100)
      }
    },
    showResult () {
      const that = this
      var size = 0
      if (this.mode === 'home') {
        size = 1200
      } else if (this.mode === 'small-images') {
        size = 256
      }
      this.cropper.result({
        type: 'base64',
        size: { width: size, height: size },
        format: 'jpeg'
      }).then(function (response) {
        setTimeout(function () {
          // console.log('crop result => %o', response)
          that.showModal = false
          const canvas = response
          const dataURL = canvas // canvas.toDataURL('image/jpeg')
          if (that.mode === 'home') {
            that.$store.commit('setMainImage', dataURL)
          } else if (that.mode === 'small-images') {
            that.$store.commit('addSmallImages', dataURL)
          }
          that.cropper.bind({ url: '', zoom: 0 })
        }, 100)
      })
    }
  },
  mounted () {
    this.init()
    this.initEvents()
  }
}
</script>

<style lang="scss"></style>