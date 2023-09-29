<script>
import AppLoader from '../components/AppLoader.vue';
import axios from 'axios';
import { store } from '../store';


export default {
    components:{
        AppLoader,
    },

    data() {
        return {
            store, // Oggetto di configurazione (assumendo che sia un oggetto di configurazione globale)
            axios, // Oggetto Axios per le richieste HTTP
            dishes: '', // Conserva i piatti recuperati dalla chiamata API
            cart: [], // Array per memorizzare gli elementi nel carrello
            priceTotal: 0, // Prezzo totale degli elementi nel carrello
            resturant: '',
        }
    },
    mounted() {
        //localStorage.clear();
        // Effettua una chiamata API per ottenere i piatti in base al parametro del percorso (slug)
        this.getDishes(this.$route.params.slug);

    },
    methods: {
        getDishes(slug){

            this.store.loading = true;

            // Effettua una richiesta GET all'API per ottenere i piatti in base allo slug
            axios.get(this.store.basicUrl + 'api/resturants/' + slug).then((response) =>{
                // Memorizza i piatti recuperati nella variabile 'dishes'
                this.dishes = response.data.response.dishes;
                //memorizzo l'id del ristorante
                this.resturant = response.data.response.resturant;
                this.getCart();
                this.store.loading = false;
            });
        },
        getCart(){
            // Recupera i dati del carrello dalla memoria locale, se presenti
            const storedCart = localStorage.getItem(this.resturant.slug);
            
            if (storedCart) {
                this.cart = JSON.parse(storedCart);
            }else{
                this.cart = []
            }
            this.totalPrice();
        },
        addToCart(dish) {
            // Verifica se il piatto è già presente nel carrello
            const existingDish = this.cart.find(item => item.id === dish.id);

            if (existingDish) {
                // Se il piatto è già nel carrello, incrementa la quantità
                existingDish.quantity++;
            } else {
                // Se il piatto non è nel carrello, aggiungilo con una quantità di 1
                this.cart.push({
                    id: dish.id,
                    name: dish.name,
                    price: dish.price,
                    quantity: 1,
                });
            }

           this.updateCart();
        },
        removeFromCart(dish, index){
            // Verifica se il piatto è presente nel carrello
            const existingDish = this.cart.find(item => item.id === dish.id);

            if(existingDish && existingDish.quantity > 1){
                // Se il piatto è nel carrello e ce ne sono più di uno, decrementa la quantità
                existingDish.quantity--;
            } else if (existingDish && existingDish.quantity === 1){
                // Se il piatto è l'ultimo nel carrello, rimuovilo
                this.removeDishFromCart(index);
            }

            this.updateCart();
        },
        removeDishFromCart(index){
            this.cart.splice(index, 1)
            this.updateCart();
        },
        updateCart(){
            if(this.cart.length > 0){
                // Salva il carrello aggiornato nella memoria locale
                localStorage.setItem(this.resturant.slug, JSON.stringify(this.cart));
            } else {
                this.deleteCart();
            }
            this.totalPrice();
        },
        totalPrice(){
            // Inizializza il prezzo totale a zero
            this.priceTotal = 0;

            // Calcola il prezzo totale in base agli elementi nel carrello
            this.cart.forEach(dish => {
                const totalDishPrice = dish.price * dish.quantity;
                this.priceTotal += totalDishPrice;
            });

            // Arrotonda il prezzo totale a due decimali
            this.priceTotal = Math.round(this.priceTotal * 100) / 100;
        },
        deleteCart(){
            localStorage.removeItem(this.resturant.slug);
            this.getCart();
        }
    },
}
</script>
<template>
    <AppLoader  v-if="store.loading"/>  
    <div v-else class="pt-5 pb-5">
        <div class="container">
            <h1 class="mb-5 text-center text-white">
                Benvenuto nel ristorante che hai appena selezionato! 
            </h1> 
        </div>
        <!--RISTORANTE SCELTO  -->
        <div class="container trans_box mb-5">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <!-- Immagine risto -->
                    <img v-if="resturant.cover_image === null" src="../assets/img/default-vite.png" class="img-fluid w-100">
                    <img v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" class="img-fluid">
                </div>
                <div class="col-12 col-lg-6">
                    <!-- Dati risto -->
                    <div class="">
                        <h4 class="mb-4 mt-4 mt-lg-0 text-white">
                            Hai scelto di ordinare da
                            <strong class="text-warning mt-4">
                                {{ resturant.name }}
                            </strong>
                        </h4>                       
                        <h6 class="text-white mb-5"> 
                            <i class="fa-solid fa-location-dot text-warning fs-2 me-2"></i>
                            <em>
                                {{ resturant.address }}
                            </em>
                        </h6>
                        <div class="fs-5 badge bg-primary mx-2 mt-3" v-for="type in resturant.types" :key="type.id">
                            {{ type.name }}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        <!--FINE RISTORANTE SCELTO  -->
        <!-- PARAGRAFO -->
        <div class="bg-warning mb-5 p-5">
            <div class="container">
                <p class="text-white">
                    Qui in basso nel <span class="text-primary text-uppercase">menù</span> 
                    hai una vasta selezione di piatti deliziosi tra cui scegliere.
                    Aggiungi i tuoi piatti preferiti al <span class="text-primary text-uppercase">carrello</span> 
                    e preparati per un'esperienza culinaria
                    straordinaria a domicilio. <br>
                    <br>
                    Quando hai finito di selezionare tutte le pietanze ti invitiamo a dare  
                    un'ultima occhiata nella sezione <span class="text-primary"> Riepilogo ordine</span> 
                    che si trova nel carrello. In questo modo, prima di procedere al pagamento,
                    sarai sicuro di avere tutto ciò di cui hai bisogno. 
                    Se desideri apportare modifiche o hai richieste speciali, non esitare a farcele 
                    sapere.
                    <br>
                    <br>
                    Il tuo pasto perfetto è solo a un click di distanza. Grazie per aver scelto 
                    <span class="fw-bold text-white">
                        DeliveBoo
                    </span>
                    per il tuo cibo a domicilio.
                </p>
                <div class="text-center text-white fs-4">
                    Buon appetito!
                </div>
            </div>
        </div>
        <!-- FINE PARAGRAFO -->
        <div class="container">
            <div class="row">
                <!-- MENU -->
                <div class="col-12 col-lg-8 p-0 mb-4">
                    <!-- Lista dei piatti disponibili -->
                    <ul class="list-group list-group-flush rounded-0">
                        <!-- TITOLO MENU-->
                        <li class="list-group-item bg-primary">
                            <h2 class="text-white text-center mt-2">
                                <i class="fa-solid fa-kitchen-set me-5"></i>
                                MENU'
                                <i class="fa-solid fa-kitchen-set  ms-5"></i>
                            </h2>
                        </li>
                        <!-- PIATTI DEL MENU -->
                        <li class="list-group-item" v-for="dish in dishes" :key="dish.id">
                            <div class="row">
                                <div class="col-10 d-flex flex-column">
                                    <!-- NOME PIATTO-->
                                    <h4 class="text-primary fw-bold mt-2">
                                        {{ dish.name }}
                                    </h4>
                                    <!-- INGREDIENT -->
                                    <span class="">
                                        <em>{{ dish.ingredients }}</em>
                                    </span>
                                    <!-- PREZZO-->                                    
                                    <span class="fw-bold fs-5 pt-2 pb-2 mt-3">
                                       &euro; {{ dish.price }} 
                                    </span>                                   
                                </div>
                                <div class="col-2 d-flex justify-content-end align-items-center">
                                    <!-- PULSANTE NEL MENU -->
                                    <button class="rounded-circle button_menu" @click="addToCart(dish)">
                                        <i class="fa-solid fa-plus fs-6"></i>
                                    </button>
                                </div>   
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- FINE MENU -->

                <!-- CARRELLO --> 
                    <div class="col-12 col-lg-4">
                        <div class="cart-wrapper rounded-3">                           
                            <ul class="pt-3 trans_box">                             
                                <li class="list-group-item ">
                                    <div class="text-center">
                                        <!-- NOME RISTO -->
                                        <span class="fs-3 text-warning">
                                             {{resturant.name}}
                                        </span>
                                        <br>
                                        <!-- ICONA CARRELLO -->
                                        <i class="fa-solid fa-cart-shopping fs-1 p-3 text-warning"></i>                               
                                    </div>
                                </li>
                                <!-- Iterazione sugli elementi nel carrello -->
                                <li class="list-group-item mt-4" v-for="(item, index) in cart" :key="item.id">
                                    <div class="row mb-4">
                                        <div class="col-9 p-2 p-lg-0">
                                            <!-- NOME PIATTO NEL CARRELLO -->
                                            <span class="fs-5 text-white text-decoration-underline">
                                                {{ item.name }}
                                            </span>                                       
                                        </div>
                                        <div class="col-3 p-1 p-lg-0 d-flex justify-content-end">
                                            <!-- PREZZO PIATTO -->
                                            <span class="fs-5 text-white fw-bold text-decoration-underline">
                                                &euro; {{ item.price.toFixed(2) }}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div class="d-flex justify-content-around align-items-center">
                                        <!-- PULSANTE DIMINUISCI QUANTITA-->
                                        <button class="rounded-circle button_cart" @click="removeFromCart(item, index)">

                                            <i class="fa-solid fa-minus fs-6"></i>
                                        </button>
                                        <!-- QUANTITA -->
                                        <span class="text-white">
                                            Quantità: 
                                            <span class="text-warning fw-bold fs-1 ms-1">
                                             {{ item.quantity }}
                                            </span>
                                        </span>
                                        <!-- PULSANTE AUMENTA QUANTITA-->
                                        <button class=" rounded-circle button_cart" @click="addToCart(item)">
                                            <i class="fa-solid fa-plus fs-6"></i>
                                        </button>
                                    </div>

                                    <div class="d-flex justify-content-center align-items-center">
                                        <button class="btn btn-primary" @click="removeDishFromCart(index)">
                                            Rimuovi piatto
                                        </button>
                                    </div>
                                    <hr class="text-warning">
                                </li>
                                <!-- RIEPILOGO ORDINE-->
                                <div class="riepilogo text-center pb-3 pt-3">
                                    <h4 class="text-white text-center p-2">
                                        Riepilogo ordine
                                    </h4>
                                    <!-- PREZZO TOTALE -->
                                    <h3 class="fw-bold text-white">
                                        Prezzo Totale: {{ priceTotal.toFixed(2) }}€
                                    </h3>
                                    <router-link v-if="cart.length > 0" :to="{name: 'checkout', params :{ 'cart' : resturant.slug } }" class="btn btn-primary">
                                        Procedi al Pagamento
                                    </router-link>
                                    <button  v-if="cart.length > 0" class="btn btn-dark" @click="deleteCart()">
                                        Svuota Carrello
                                    </button>
                                </div>
                            </ul>
                            <!-- Fine lista del carrello -->
                        </div>
                    </div>              
                <!-- CARRELLO -->
            </div>
        </div>
    </div>
    <!-- Fine del contenitore principale -->
</template>
<style lang="scss" scoped>
    @import '../styles/_variables.scss';
    @import '../styles/generals.scss';

    .trans_box{
        background-color: rgba(28, 13, 43, 0.64);
        backdrop-filter: blur(3px);
        border-radius: 10px;
        padding: 25px 20px 25px 20px;
        box-shadow: 1px 2px 14px 5px #00000070;
    }

    .cart-wrapper {
        position: -webkit-sticky;
        position: sticky;
        top:0;
        box-shadow: 1px 2px 14px 5px #00000070;
    }

    .button_menu {
        color: $primary;
        background-color: white;
        border: 1px solid $primary;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;

    }
    
    .button_menu:hover {
        background-color: $primary;
        color: white;
        border: 1px solid $primary;
    }
    
    .button_cart{
        color: $white;
        background-color: $primary;
        border: 1px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 25px;
        width: 25px
    }

    .button_cart:hover {
        background-color: $warning;
        color: $dark;
        border: 1px solid $warning;
    }
</style>