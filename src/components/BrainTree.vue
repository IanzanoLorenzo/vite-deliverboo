<script>
import 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.js';
import axios from 'axios';
import {store} from '../store'
export default {
    data() {
        return {
            axios,
            store,
            clientToken: '',
            errorMessage: false,
        }
    },
    mounted() {
        this.createCheckoutForm();
    },
    methods: {
        createCheckoutForm(){
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
                                    let deviceData = payload.deviceData
                                    axios.post(store.basicUrl+'api/payments/process', {
                                        'nonce' : payload.nonce,
                                    }).then((risp)=>{
                                       console.log(risp.data.response)
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                                }
                            });
                        })
                    }
                });
            })
        },
    },
}
</script>
<template>
    <div id="dropin-container"></div>
    <button id="submit-button" class="button button--small button--green">Purchase</button>
</template>
<style lang="scss" scoped>
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    //-webkit-appearance: none;
    //-moz-appearance: none;
    display: inline-block;
  }
  
  .button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
  }
  
  .button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
  }
  
  .button--green:hover {
    background-color: #8bdda8;
    color: white;
  }
</style>