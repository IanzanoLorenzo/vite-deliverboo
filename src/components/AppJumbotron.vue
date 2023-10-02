<script>
export default {
  data() {
    return {
      activeSlide: 0,
      autoplaySlide: false,
      slide: null,
    };
  },
  methods: {},
};
</script>
<template>
  <!-- IMMAGINE CARBONARA SFONDO -->
  <div class="carbojumbotron container-fluid">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <!-- BOX BLUR -->
          <div class="text-center trans_box">
            <!-- SLOGAN -->
            <h2 class="text_gradient fw-bold">
              Portiamo il sapore del mondo direttamente a casa tua!
            </h2>
          </div>
          <!-- FINE BOX BLUR -->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../styles/_variables.scss";
@import "../styles/generals.scss";
.carbojumbotron {
  background-image: url(../assets/img/carbojumbotron.jpg);
  height: 600px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .trans_box {
    background-color: rgba(255, 255, 255, 0.675);
    backdrop-filter: blur(3px);
    padding: 30px;
    margin: 30px;
    border-radius: 10px;
    box-shadow: 0px 3px 8px 3px rgba(56, 55, 52, 0.285);

    position: relative;
    top: 275px;
  }

  .text_gradient {
    background: linear-gradient(83deg, #920505 40%, #e307a1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>