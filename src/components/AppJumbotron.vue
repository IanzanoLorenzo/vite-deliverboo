<script>
export default {
    data() {
        return {
            activeSlide: 0,
            autoplaySlide: false,
            slide: null,
        }
    },
    methods: {
        
    },
}
</script>
<template>
    <!-- IMMAGINE CARBONARA SFONDO -->
    <div class="carbojumbotron container-fluid">
        <div class="container h-100">
            <div class="row h-100 ">
                <div class="col-12 d-flex align-items-center justify-content-center">
                    <!-- BOX BLUR -->
                    <div class="text-center transbox">
                        <!-- SLOGAN -->
                        <h1> Portiamo il sapore del mondo direttamente a casa tua!</h1>

                        <figure class="text-center">
                            <blockquote class="blockquote fs-4">
                                <p>"Ogni piatto è un viaggio in un luogo, in una cultura, in una tradizione."</p>
                            </blockquote>
                            <figcaption class="blockquote-footert">
                                <cite title="Source Title quote_cit">Alice Waters</cite>
                            </figcaption>
                        </figure>
                    </div>
                    <!-- FINE BOX BLUR -->
                </div>
            </div>
        </div>
    </div>
    
</template>
<style lang="scss">

.carbojumbotron{
    background-image: url(../assets/img/carbojumbotron.jpg);
    height: 600px;
    background-position: center;
    backdrop-filter: blur(2px);
    
    .transbox{
        background-color: rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(2.5px);
        padding: 50px;
        margin: 30px;
        border-radius: 20px;

        .quote_cit{
            color:red !important;

        }
    }
}
    
</style>