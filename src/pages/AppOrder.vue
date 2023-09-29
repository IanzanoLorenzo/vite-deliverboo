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
        <div class="row text-center padding">
            <div class="col-12">
                <div class="card pt-5 pb-4">
                    <h2>Grazie per aver scelto il nostro sito, il tuo pagamento è andato a buon fine! <i class="fa-solid fa-circle-check" style="color: #11d432;"></i></h2>
                    <h2>A breve riceverai via e-mail il riepilogo del tuo ordine!</h2>
                    <h3>Torna alla home e procedi con un nuovo ordine!</h3>
                    <div class="p-3">
                        <router-link :to="'/'" class="btn btn-primary text white">
                            HOME
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .padding{
        padding-top: 200px;
        padding-bottom: 200px;
    }
</style>