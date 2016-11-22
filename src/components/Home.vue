<template>
  <div class="hero-body main-background">
    <div class="container has-text-centered">
      <div class="columns is-mobile">
        <div class="column"></div>
        <div class="column is-two-thirds-mobile is-half-tablet is-one-quarter-desktop">
          <figure id="main_image" class="image">
            <img :src="displayImage" v-if="displayImage">
            <img src="/static/img/9.svg" v-else>
          </figure>
        </div>
        <div class="column"></div>
      </div>
      <p class="instruction" v-html="instructionMessage"></p>
      <a class="button is-light is-medium file-upload">
        <span>{{ uploadButtonMessage }}</span>
        <input type="file" id="file_picker" accept="image/*" @change="uploadHandler">
      </a>
      <router-link to="/small-images" class="button is-primary is-medium" v-if="mainImage">Go to Step 2</router-link>
    </div>
  </div>
</template>

<script>
/* global FileReader */
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      cropper: {}
    }
  },
  computed: {
    ...mapGetters({
      'mainImage': 'mainImage',
      'displayImage': 'displayImage'
    }),
    checkCropImage () {
      if (!this.mainImage) return false
      return true
    },
    uploadButtonMessage () {
      if (!this.mainImage) return 'Upload an Image'
      return 'Reupload'
    },
    instructionMessage () {
      if (!this.mainImage) return '<strong>Step 1.</strong> Upload Your Big Image'
      return ''
    }
  },
  methods: {
    uploadHandler (e) {
      console.log('uploadHandler')
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      console.log('createImage')
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        const img = e.target.result
        vm.$store.commit('setBeforeCropImage', img)
        const image = {
          mode: 'home',
          src: img
        }
        this.$events.fire('displayModal', image)
      }
      reader.readAsDataURL(file)
    }
  },
  mounted () {
    this.$store.commit('setAnimatingMode', false)
  }
}
</script>

<style lang="scss">
figure.image {
  overflow: hidden;
  border-radius: 16px;
}
</style>
