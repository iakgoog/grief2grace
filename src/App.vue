<template>
  <section class="hero is-fullheight main-background">
    <router-view></router-view>
    <footer-comp v-show="!isAnimatingMode"></footer-comp>
    <modal></modal>
  </section>
</template>

<script>
import Home from './components/Home'
import Modal from './components/Modal'
import FooterComp from './components/Footer-comp'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters({
      'isAnimatingMode': 'isAnimatingMode'
    })
  },
  components: {
    Home,
    FooterComp,
    Modal
  },
  mounted () {
    // const ua = window.navigator.userAgent
    // const regex = /(iPhone|iPad|iPod)/g
    // if (regex.test(ua)) {
    //   setTimeout(function () {
    //     window.scrollTo(0, document.body.scrollHeight)
    //   }, 10)
    // }
  }
}
</script>

<style lang="scss">
$main-background: #111;
$main-color: #FEE95C;

$body-background: $main-background;

.main-background {
  background-color: transparent !important;
}

.file-upload {
  transition: background-color 0.5s ease;
  & > span {
    user-select: none;
  }
  input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  &:hover {
    background-color: $main-color !important;
  }
}

.instruction {
  color: $main-color;
  margin: 1em 0;
  & > span {
    font-size: 0.8em;
    font-weight: bold;
    color: darken($main-color, 20%);
  }
}

.hide {
  display: none;
}

.controller {
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 1em 1em 0 0;
}

@import 'node_modules/bulma/bulma';
@import 'node_modules/croppie/croppie';

body, html {
  height: 100%;
  max-height: 100%;
}

strong {
  color: darken($main-color, 20%);
}

@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px) {
.hero {
  min-height: 100%;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
}

</style>
