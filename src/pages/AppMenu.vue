<script>
import axios from 'axios';
import { store } from '../store';

export default {
    data() {
        return {
            store, // Oggetto di configurazione (assumendo che sia un oggetto di configurazione globale)
            axios, // Oggetto Axios per le richieste HTTP
            dishes: '', // Conserva i piatti recuperati dalla chiamata API
            cart: [], // Array per memorizzare gli elementi nel carrello
            priceTotal: 0 // Prezzo totale degli elementi nel carrello
        }
    },
    mounted() {
        // Recupera i dati del carrello dalla memoria locale, se presenti
        const storedCart = localStorage.getItem('cart');

        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }

        // Effettua una chiamata API per ottenere i piatti in base al parametro del percorso (slug)
        this.getDishes(this.$route.params.slug);

        // Calcola il prezzo totale iniziale
        this.totalPrice();
    },
    methods: {
        getDishes(slug){
            // Effettua una richiesta GET all'API per ottenere i piatti in base allo slug
            axios.get(this.store.basicUrl + 'api/resturants/' + slug).then((response) =>{
                // Memorizza i piatti recuperati nella variabile 'dishes'
                this.dishes = response.data.response;
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
            localStorage.setItem('cart', JSON.stringify(this.cart));

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

            // Salva il carrello aggiornato nella memoria locale
            localStorage.setItem('cart', JSON.stringify(this.cart));

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
    <div>
        <div class="d-flex" v-for="dish in dishes" :key="dish.id">
            <p>{{ dish.name }}</p>
            <p>{{ dish.price }}€</p>
            <button @click="addToCart(dish)">Aggiungi al carrello</button>
        </div>
    </div>
    <div>
        <h2>Carrello</h2>
        <div class="d-flex" v-for="(item, index) in cart" :key="item.id">
            <p>{{ item.name }}</p>
            <p>{{ item.price }}€</p>
            <p>Quantità: {{ item.quantity }}</p>
            <button @click="removeFromCart(item , index)">Rimuovi</button>
        </div>
        <div>
          Prezzo Totale:  {{ priceTotal }}€
        </div>
    </div>
</template>
<style lang="scss">
    
</style>