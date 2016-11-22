<template>

  <footer class="hero-foot">
    <div class="container has-text-centered">
      <p class="express-condolence">
        น้อมรำลึกถึงพระมหากรุณาธิคุณและร่วมถวายความอาลัย<br>
        พระบาทสมเด็จพระปรมินทรมหาภูมิพลอดุลยเดช
      </p>
      <div class="share-container">
        <div class="fb-share-button share-button" data-href="https://grief2grace.firebaseapp.com" data-layout="button_count" data-size="small" data-mobile-iframe="false"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgrief2grace.firebaseapp.com%2F&amp;src=sdkpreparse">Share</a></div>
        <a class="twitter-share-button"
          href="https://grief2grace.firebaseapp.com">
        Tweet</a>
        <div class="line-it-button share-button" style="display: none;" data-type="share-a" data-lang="en" ></div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'footer-comp',
  mounted () {
    const ua = window.navigator.userAgent
    const regex = /(iPhone|iPad|iPod)/g
    if (regex.test(ua)) {
      const footer = document.querySelector('footer.hero-foot')
      // footer.style.height = '100%'
      footer.style.overflowY = 'scroll'
      footer.style.WebkitOverflowScrolling = 'touch'
    }
  }
}
</script>

<style lang="scss">
footer {
  * {
    color: #EEE;
  }
}
.share-container {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
.share-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  * {
    margin-right: 8px;
    margin-left: 8px;
    &:first-child {
      margin-left: 0; 
    }
    &:last-child {
      margin-right: 0;
    }
  }
}

@media only screen
and (max-device-width: 320px) 
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: portrait) {
.express-condolence {
  font-size: 0.9rem;
}
}

@media only screen
and (max-device-width: 375px) 
and (-webkit-min-device-pixel-ratio: 2)
and (orientation: portrait) {
footer .container {
  margin-bottom: 88px;
}
}

@media only screen
and (max-device-width: 414px) 
and (-webkit-min-device-pixel-ratio: 3)
and (orientation: portrait) {
footer .container {
  margin-bottom: 132px;
}
}
</style>