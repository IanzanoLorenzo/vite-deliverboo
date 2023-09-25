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
            resturant: null,
        }
    },
    mounted() {
        //localStorage.clear();
        // Effettua una chiamata API per ottenere i piatti in base al parametro del percorso (slug)
        this.getDishes(this.$route.params.slug);
        
        // Calcola il prezzo totale iniziale
        this.totalPrice();
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
                // Recupera i dati del carrello dalla memoria locale, se presenti
                const storedCart = localStorage.getItem(this.resturant.id);
            
                if (storedCart) {
                    this.cart = JSON.parse(storedCart);
                }
                
                this.store.loading = false;
            });
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

            // Salva il carrello aggiornato nella memoria locale per la persistenza
            localStorage.setItem(this.resturant.id, JSON.stringify(this.cart));

            // Ricalcola il prezzo totale
            this.totalPrice();
        },
        removeFromCart(dish, index){
            // Verifica se il piatto è presente nel carrello
            const existingDish = this.cart.find(item => item.id === dish.id);

            if(existingDish && existingDish.quantity > 1){
                // Se il piatto è nel carrello e ce ne sono più di uno, decrementa la quantità
                existingDish.quantity--;
            } else if (existingDish && existingDish.quantity === 1){
                // Se il piatto è l'ultimo nel carrello, rimuovilo
                this.cart.splice(index, 1)
            }

            if(this.cart.length > 0){
                // Salva il carrello aggiornato nella memoria locale
                localStorage.setItem(this.resturant.id, JSON.stringify(this.cart));
            } else {
                localStorage.removeItem(this.resturant.id);
            }

            // Ricalcola il prezzo totale
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
        }
    },
}
</script>
<template>
    <AppLoader  v-if="store.loading"/>

    <!-- Inizia il contenitore principale -->
    <div v-else class="container pt-5 padd-b">
        <div class="row padd-b d-flex">
            <div class="col-8 ">
                <!-- Lista dei piatti disponibili -->
                <ul class="list-group list-group-flush">
                    <!-- Titolo del menu -->
                    <li class="list-group-item bg-primary">
                        <h1 class="text-white fw-bold fnt-write text-center">MENU'</h1>
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
            <div class="col-4">
                <!-- Lista dei piatti nel carrello -->
                <ul class="list-group list-group-flush">
                    <!-- Titolo del carrello -->
                    <li class="list-group-item bg-primary">
                        <h2 class="text-center fnt-write fw-bold text-white">CARRELLO</h2>
                    </li>
                    <!-- Iterazione sugli elementi nel carrello -->
                    <li class="list-group-item" v-for="(item, index) in cart" :key="item.id">
                        <!-- Nome del piatto nel carrello -->
                        <h3 class="text-primary fw-bold">{{ item.name }}</h3>
                        <!-- Prezzo del piatto nel carrello -->
                        <span class="fw-bold">{{ item.price }}€</span>
                        <!-- Visualizzazione della quantità e pulsante "Rimuovi" -->
                        <div class="d-flex justify-content-between">
                            <span>Quantità: <span class="text-danger fw-bold">{{ item.quantity }}</span></span>
                            <button class="btn btn-sm rounded-circle button_delive_two" @click="removeFromCart(item, index)"><i class="fa-solid fa-minus fs-6"></i></button>
                        </div>
                    </li>
                    <!-- Riepilogo dell'ordine -->
                    <div class="card">
                        <h2 class="bg-primary text-white text-center p-3 fw-bold">RIEPILOGO ORDINE</h2>
                        <!-- Visualizzazione del prezzo totale -->
                        <h3 class="text-warning fw-bold">Prezzo Totale: {{ priceTotal }}€</h3>
                        <router-link v-if="cart.length > 0" :to="{name: 'checkout', params :{ 'cart' : resturant.id } }" class="btn btn-primary">Procedi al Pagamento</router-link>
                    </div>
                </ul>
                <!-- Fine lista del carrello -->
            </div>
        </div>
    </div>
    <!-- Fine del contenitore principale -->
</template>
<style lang="scss">
    .padd-b{
        padding-bottom: 100px;
    }

    .fnt-write{
        font-size: 50px;
    }

    
</style>