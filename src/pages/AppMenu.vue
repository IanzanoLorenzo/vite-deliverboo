<script>
import axios from 'axios';
import { store } from '../store';
export default {
    data() {
        return {
            store,
            axios,
            dishes: '',
            cart: [],
            priceTotal: 0
        }
    },
    mounted() {
        const storedCart = localStorage.getItem('cart');

        if (storedCart) {
            this.cart = JSON.parse(storedCart);
        }

        this.getDishes(this.$route.params.slug);

        this.getDishes(this.$route.params.slug);

        this.totalPrice()
    },
    methods: {
        getDishes(slug){
            axios.get(this.store.basicUrl+'api/resturants/'+slug).then((response) =>{
                this.dishes = response.data.response;
            }
            )
        },
        addToCart(dish) {
        // Verifica se il piatto è già nel carrello
        const existingDish = this.cart.find(item => item.id === dish.id);

        if (existingDish) {
            // Se il piatto è già nel carrello, incrementa la quantità
            existingDish.quantity++;
        } else {
            // Se il piatto non è nel carrello, aggiungilo
            this.cart.push({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                quantity: 1, // Inizia con una quantità di 1
            });
        }

        // Salva il carrello in localStorage per la persistenza
        localStorage.setItem('cart', JSON.stringify(this.cart));

        this.totalPrice();
        },

        removeFromCart(dish , index){

            // Verifica se il piatto è già nel carrello
            const existingDish = this.cart.find(item => item.id === dish.id);

            if(existingDish && existingDish.quantity > 1){
                // Se il piatto è già nel carrello e non è l'ultimo piatto, decrementa la quantità
                existingDish.quantity--;
            }else if (existingDish && existingDish.quantity === 1){
                // Se il piatto è l'ultimo nel carrello cancella il piatto
                this.cart.splice(index, 1)
            }
            // Salva il carrello il localStorage
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.totalPrice();
        },
        totalPrice(){
            this.priceTotal = 0
            this.cart.forEach(dish => {
                const totalDishPrice = dish.price * dish.quantity
                this.priceTotal += totalDishPrice 
            });
            this.priceTotal = Math.round((this.priceTotal) * 100) / 100
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