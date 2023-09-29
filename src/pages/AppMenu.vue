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
        <!--RISTORANTE SCELTO  -->
        <div class="container trans_box mb-5">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <!-- Immagine risto -->
                    <img v-if="resturant.cover_image === null" src="../assets/img/default-vite.png" class="img-fluid w-50">
                    <img v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" class="img-fluid">
                </div>
                <div class="col-12 col-lg-6">
                     <!-- Dati risto -->
                    <div class="">
                        <h2 class="text-white mt-4">
                            {{ resturant.name }}
                        </h2>
                        <div class="text-white mb-5">
                            <em>
                                {{ resturant.address }}
                            </em>
                        </div>
                        <div class="fs-5 badge bg-primary mx-2 mt-3" v-for="type in resturant.types" :key="type.id">
                            {{ type.name }}
                        </div>
                    </div>
                </div>    
            </div>
        </div>
        <!--FINE RISTORANTE SCELTO  -->

        <div class="container">
            <div class="row">
                <!-- MENU -->
                <div class="col-12 col-lg-8 p-0 mb-4">
                    <!-- Lista dei piatti disponibili -->
                    <ul class="list-group list-group-flush rounded-0">
                        <!-- Titolo del menu -->
                        <li class="list-group-item bg-primary">
                            <h2 class="text-white text-center mt-2">
                                MENU'
                            </h2>
                        </li>
                        <!-- Iterazione sui piatti nel menu -->
                        <li class="list-group-item" v-for="dish in dishes" :key="dish.id">
                            <!-- Nome del piatto -->
                            <h2 class="text-primary fw-bold">
                                {{ dish.name }}
                            </h2>
                            <!-- Ingredienti del piatto -->
                            <span><em>{{ dish.ingredients }}</em></span>
                            <!-- Prezzo del piatto e pulsante "Aggiungi al carrello" -->
                            <div class="d-flex justify-content-between">
                                <span class="fw-bold">
                                    {{ dish.price }}€
                                </span>
                                <button class="btn btn-sm rounded-circle button_delive_two" @click="addToCart(dish)"><i class="fa-solid fa-plus fs-6"></i></button>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- FINE MENU -->

                <!-- CARRELLO --> 
                    <div class="col-12 col-lg-4">
                        <div class="cart-wrapper">
                            <!-- Lista dei piatti nel carrello -->
                            <ul class="list-group list-group-flush pt-3 trans_box">
                                <!-- Titolo del carrello -->
                                <li class="list-group-item ">
                                    <div class="text-center">
                                        <span class="fs-3"> {{resturant.name}} </span>
                                        <br>
                                        <i class="fa-solid fa-cart-shopping fs-1 p-3"></i> 
                                        
                                    </div>
                                </li>
                                <!-- Iterazione sugli elementi nel carrello -->
                                <li class="list-group-item" v-for="(item, index) in cart" :key="item.id">
                                    <!-- Nome del piatto nel carrello -->
                                    <h3 class="text-primary fw-bold">
                                        {{ item.name }}
                                    </h3>
                                    <!-- Prezzo del piatto nel carrello -->
                                    <div class="fw-bold p-2 mb-2">
                                        {{ item.price.toFixed(2) }}€
                                    </div>
                                    <!-- Visualizzazione della quantità e pulsante "Rimuovi" -->
                                    <div class="d-flex justify-content-between align-items-center">
                                        <button class="btn btn-sm rounded-circle button_delive_two" @click="removeFromCart(item, index)"><i class="fa-solid fa-minus fs-6"></i></button>
                                        <span>Quantità: <span class="text-danger fw-bold">{{ item.quantity }}</span></span>
                                        <button class="btn btn-sm rounded-circle button_delive_two" @click="addToCart(item)"><i class="fa-solid fa-plus fs-6"></i></button>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <button class="btn btn-primary" @click="removeDishFromCart(index)">Rimuovi piatto</button>
                                    </div>
                                </li>
                                <!-- Riepilogo dell'ordine -->
                                <div class="text-center pb-3 pt-3">
                                    <h4 class="text-white text-center p-2">
                                        Riepilogo ordine
                                    </h4>
                                    <!-- Visualizzazione del prezzo totale -->
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

    .button_delive_two {
        background-color: $primary;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
    }
    
    .button_delive_two:hover {
        background: white;
        color: $primary;
        border: 1px solid $primary;
    }
    
</style>