<template>
  <div class="hero-body main-background">
    <div class="container has-text-centered">
      <div class="columns is-mobile">
        <div class="column"></div>
        <div class="column is-11-mobile is-two-thirds-tablet is-half-desktop">
          <div class="collection-container">
            <a class="image-container" v-for="image in smallImages" @click="confirmRemoveImage(image)">
              <img :src="image" alt="" class="image-display" />
            </a>
          </div>
        </div>
        <div class="column"></div>
      </div>
      <p v-html="instructionMessage" class="instruction"></p>
      <router-link to="/" class="button is-warning is-medium">Back</router-link>
      <a class="button is-light is-medium file-upload" v-if="smallImages.length < maximumImage">
        <span>{{ uploadButtonMessage }}</span>
        <input type="file" id="file_picker" accept="image/*" @change="uploadHandler">
      </a>
      <router-link to="/play-animation" class="button is-primary is-medium" v-if="smallImages.length">Create Mosaic</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'small-images',
  data () {
    return {
      maximumImage: 16
    }
  },
  computed: {
    ...mapGetters({
      'smallImages': 'smallImages'
    }),
    uploadButtonMessage () {
      if (!this.smallImages.length) return 'Upload an Image'
      return 'Add More Image'
    },
    instructionMessage () {
      if (!this.smallImages.length) return '<strong>Step 2.</strong> Add Your Small Images (up to 16 images)'
      return `${this.smallImages.length} of ${this.maximumImage}<br>Click Any Image to Remove`
    }
  },
  methods: {
    uploadHandler (e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      const reader = new FileReader()
      const vm = this
      reader.onload = (e) => {
        const img = e.target.result
        vm.$store.commit('setBeforeCropImage', img)
        const image = {
          mode: 'small-images',
          src: img
        }
        this.$events.fire('displayModal', image)
      }
      reader.readAsDataURL(file)
    },
    confirmRemoveImage (image) {
      if (window.confirm('Do you really want to remove this image?')) {
        this.$store.commit('removeSmallImage', image)
      }
    }
  },
  mounted () {
    this.$store.commit('setAnimatingMode', false)
  }
}
</script>

<style lang="scss">
.collection-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
.image-container {
  position: relative;
  width: 30%;
  margin: 0.1em;
  border-radius: 8px;
  overflow: hidden;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  .image-display {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: lightpink;
  }
}
.collection-flex {
  align-items: stretch;
}
a {
  margin: .25rem .25rem;
}

@media only screen and (min-device-width: 1200px) {
  .image-container {
    width: 22.5%;
    margin: 0.25em;
  }
}
</style>
