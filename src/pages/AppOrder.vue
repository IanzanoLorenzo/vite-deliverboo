<script>
    export default {
        data() {
            return {
                cart : [],
            }
        },
        created() {
            this.cart = localStorage.getItem(this.$route.params.slug);
            console.log();
            localStorage.removeItem(this.$route.params.slug);
        },
    }
</script>
<template lang="">
    <div class="container">
        <div class="row text-center text-white">
            <div class="col-12">
                <div class="card">
                    <h2>Grazie per aver scelto il nostro sito, il tuo pagamento è andato a buon fine! <i class="fa-solid fa-circle-check" style="color: #11d432;"></i></h2>
                    <h3>Qui trovi il riepilogo del tuo ordine</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="">
    
</style>