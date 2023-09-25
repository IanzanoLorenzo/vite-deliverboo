<script>
import 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.js';
import axios from 'axios';
import {store} from '../store'
export default {
    props:{
        form: Object
    },
    data() {
        return {
            axios,
            store,
            clientToken: '',
            errorMessage: false,
            cart: null
        }
    },
    mounted() {
        this.getCart(this.$route.params.cart);
    },
    methods: {
        createCheckoutForm(){
            let new_cart = this.cart;
            let rest_id = this.$route.params.cart;
            if (this.form['name'] && this.form['surname'] && this.form['email'] && this.form['address'] && this.form['deliverytime'] && this.form) {
                this.axios.get(this.store.basicUrl+'api/payments/token').then((risp)=>{
                    this.clientToken = risp.data.response.clientToken;
                    let button = document.querySelector('#submit-button');
                    braintree.dropin.create({
                        authorization: this.clientToken,
                        selector: '#dropin-container'
                    }, function (err, instance) {
                        if(err){
                            //errore
                        }else{
                            button.addEventListener('click', function () {
                                instance.requestPaymentMethod(function (err, payload) {
                                    if(err){
                                        //errore
                                    }else{
                                        axios.post(store.basicUrl+'api/payments/process', {
                                            'nonce' : payload.nonce,
                                            'cart' :new_cart,
                                            'order': {
                                                'resturant_id' : rest_id,
                                                'address': 'Via Gaudi, 5',
                                                'costumer_email' : 'costumer'+rest_id+'@mail.com',
                                                'costumer_name': 'Piero',
                                                'costumer_surname': 'Pierozzi',
                                                'delivery_time' : '22:50:00',
                                                'total_price': '20.00'
                                            }
                                        }).then((risp)=>{
                                            console.log(risp.data.response);
                                            localStorage.removeItem(rest_id);
                                        }).catch((error) => {
                                            //errore
                                        })
                                    }
                                });
                            })
                        }
                    });
                })
            } else {
                this.errorMessage = 'Inserisci i tuoi dati prima di pagare.'    
            }
        },
        getCart(cart){
            let storedCart = localStorage.getItem(cart);
            if (storedCart) {
                this.cart = JSON.parse(storedCart);
            }
            console.log(this.cart)
        },
    },
}
</script>
<template>
    <div class="alert alert-warning" v-if="errorMessage">{{errorMessage}}</div>
    <a href="#" @click="createCheckoutForm">Inserisci il metodo di pagamento</a>
    <div id="dropin-container"></div>
    <button id="submit-button" class="btn btn-primary">Purchase</button>
</template>
<style lang="scss" scoped>
</style>