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

    <!-- Inizia il contenitore principale -->
    <div v-else class="container pt-5 padd-b">
        <div class="row padd-b">
            <div class="card col-12 col-lg-8 offset-lg-2 p-0 mb-5">
                <img v-if="resturant.cover_image === null" src="../assets/img/default-vite.png" class="img-fluid">
                <img v-else :src="`${store.basicUrl}storage/${resturant.cover_image}`" class="img-fluid">
                <div class="card-body">
                    <h2 class="card-title ">{{ resturant.name }}</h2>
                    <div class="card-text pb-2">
                        <em>
                            {{ resturant.address }}
                        </em>
                    </div>
                    <div class="badge bg-primary mx-1" v-for="type in resturant.types" :key="type.id">
                    {{ type.name }}
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-8 card p-0 mb-5">
                <!-- Lista dei piatti disponibili -->
                <ul class="list-group list-group-flush">
                    <!-- Titolo del menu -->
                    <li class="list-group-item bg-primary">
                        <h2 class="text-white fw-bold text-center">MENU'</h2>
                    </li>
                    <!-- Iterazione sui piatti nel menu -->
                    <li class="list-group-item" v-for="dish in dishes" :key="dish.id">
                        <!-- Nome del piatto -->
                        <h2 class="text-primary fw-bold">{{ dish.name }}</h2>
                        <!-- Ingredienti del piatto -->
                        <span><em>{{ dish.ingredients }}</em></span>
                        <!-- Prezzo del piatto e pulsante "Aggiungi al carrello" -->
                        <div class="d-flex justify-content-between">
                            <span class="fw-bold">{{ dish.price }}€</span>
                            <button class="btn btn-sm rounded-circle button_delive_two" @click="addToCart(dish)"><i class="fa-solid fa-plus fs-6"></i></button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-12 col-lg-4">
                <!-- Lista dei piatti nel carrello -->
                <ul class="list-group list-group-flush">
                    <!-- Titolo del carrello -->
                    <li class="list-group-item bg-primary">
                        <h2 class="text-center fw-bold text-white text-uppercase">CARRELLO <br> "{{ resturant.name }}" </h2>
                    </li>
                    <!-- Iterazione sugli elementi nel carrello -->
                    <li class="list-group-item" v-for="(item, index) in cart" :key="item.id">
                        <!-- Nome del piatto nel carrello -->
                        <h3 class="text-primary fw-bold">{{ item.name }}</h3>
                        <!-- Prezzo del piatto nel carrello -->
                        <span class="fw-bold">{{ item.price.toFixed(2) }}€</span>
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
                    <div class="text-center bg-white pb-3">
                        <h2 class="bg-primary text-white fw-bold text-center p-2">RIEPILOGO ORDINE</h2>
                        <!-- Visualizzazione del prezzo totale -->
                        <h3 class="fw-bold">Prezzo Totale: {{ priceTotal.toFixed(2) }}€</h3>
                        <router-link v-if="cart.length > 0" :to="{name: 'checkout', params :{ 'cart' : resturant.slug } }" class="btn btn-primary">Procedi al Pagamento</router-link>
                        <button  v-if="cart.length > 0" class="btn btn-dark" @click="deleteCart()">Svuota Carrello</button>
                    </div>
                </ul>
                <!-- Fine lista del carrello -->
            </div>
        </div>
    </div>
    <!-- Fine del contenitore principale -->
</template>
<style lang="scss" scoped>
    @import '../styles/_variables.scss';
    @import '../styles/generals.scss';
    .padd-b{
        padding-bottom: 50px;
    }

    // .fnt-write{
    //     font-size: 30px;
    // }

    .card {
        overflow: hidden;
        border-radius: 15px !important;
        border: none;
        .img-fluid{
            height: 200px;
            object-fit: cover;
        }
        p.card-text{
        height: 100px;
        overflow: hidden;
        }
        h5.card-title{
            height: 40px;
            overflow: hidden;
        }
        img{
            width: 100%;
        }
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
        background: $warning;
        border: 1px solid $danger;
        color: white;
    }
    
</style>