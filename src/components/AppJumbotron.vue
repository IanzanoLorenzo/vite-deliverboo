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
    
    <div class="carbojumbotron container-fluid">
        <div class="container h-100">
            <div class="row h-100 ">
                <div class="col-12 d-flex align-items-center">
                    <div class="text-center transbox">
                        <!-- SLOGAN -->
                        <h1> Portiamo il sapore del mondo direttamente alla tua porta!</h1>
                        <!-- PARAGRAFO -->
                        <h4>
                            Che tu stia cercando i sapori autentici della cucina italiana, l'esotismo delle spezie orientali 
                            o la comodità di un hamburger americano classico, siamo qui per soddisfare ogni tuo desiderio gastronomico.
                        </h4>
                    </div>
                    
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
        padding: 30px;
        margin: 30px;
        border-radius: 20px,
    }
}
    
</style>