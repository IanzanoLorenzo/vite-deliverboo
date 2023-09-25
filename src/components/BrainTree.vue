<script>
import 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.js';
import axios from 'axios';
import {store} from '../store'
export default {
    props:{
        formDataProp: Object
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
            if (this.formDataProp['name'] && this.formDataProp['surname'] && this.formDataProp['email'] && this.formDataProp['address'] && this.formDataProp['delivery_time'] && this.formDataProp) {
                let new_cart = this.cart;
                let rest_id = this.$route.params.cart;
                let formData = this.formDataProp;
                this.axios.get(this.store.basicUrl+'api/payments/token').then((risp)=>{
                    this.clientToken = risp.data.response.clientToken;
                    let button = document.querySelector('#submit-button');
                    braintree.dropin.create({
                        authorization: this.clientToken,
                        selector: '#dropin-container'
                    }, function (err, instance) {
                        if(err){
                            console.log(err)
                        }else{
                            button.addEventListener('click', function () {
                                instance.requestPaymentMethod(function (err, payload) {
                                    if(err){
                                        console.log(err)
                                    }else{
                                        axios.post(store.basicUrl+'api/payments/process', {
                                            'nonce' : payload.nonce,
                                            'cart' : new_cart,
                                            'order': {
                                                'resturant_id' : rest_id,
                                                'address':  'piero 22',
                                                'costumer_email' :  'piero@mail.com',
                                                'costumer_name':  'piero',
                                                'costumer_surname':  'piero',
                                                'delivery_time' :  '22:22',
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
        },
    },
}
</script>
<template>
    <div class="alert alert-warning" v-if="errorMessage">{{errorMessage}}</div>
    <a href="#" @click="createCheckoutForm">Inserisci il metodo di pagamento</a>
    <div id="dropin-container"></div>
    <button id="submit-button" class="button btn btn-primary">Purchase</button>
</template>
<style lang="scss" scoped>
</style>