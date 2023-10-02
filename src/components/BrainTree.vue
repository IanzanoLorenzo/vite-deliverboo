<script>
import 'https://js.braintreegateway.com/web/dropin/1.40.2/js/dropin.js';
import axios from 'axios';
import { store } from '../store';

export default {
  props: {
    formDataProp: Object
  },
  data() {
    return {
      axios,
      store,
      clientToken: '',
      errorMessage: false,
      cart: null,
      fatalError: false,
      total_price: 0,
      paymentProcessing: false
    };
  },
  mounted() {
    this.getCart(this.$route.params.cart);
  },
  methods: {
    createCheckoutForm() {
      if (
        this.formDataProp &&
        this.formDataProp['name'] &&
        this.formDataProp['surname'] &&
        this.formDataProp['email'] &&
        this.formDataProp['address'] &&
        this.formDataProp['delivery_time']
      ) {
        let new_cart = this.cart;
        let rest_slug = this.$route.params.cart;
        let price_total = this.total_price;
        let formData = this.formDataProp;
        let router = this.$router;
        this.axios.get(this.store.basicUrl + 'api/payments/token').then((risp) => {
          this.clientToken = risp.data.response.clientToken;
          let button = document.querySelector('#submit-button');
          let self = this; // Cattura il riferimento a this
          braintree.dropin.create(
            {
              authorization: this.clientToken,
              selector: '#dropin-container',
              locale: 'it_IT'
            },
            function (err, instance) {
              if (err) {
                console.log(err);
              } else {
                button.addEventListener('click', function () {
                  instance.requestPaymentMethod(function (err, payload) {
                    if (err) {
                      console.log(err);
                    } else {
                      // Imposta il loader quando l'utente ha cliccato su "Paga"
                      self.paymentProcessing = true;
                      axios
                        .post(store.basicUrl + 'api/payments/process', {
                          nonce: payload.nonce,
                          cart: new_cart,
                          order: {
                            resturant_slug: rest_slug,
                            address: formData['address'],
                            costumer_email: formData['email'],
                            costumer_name: formData['name'],
                            costumer_surname: formData['surname'],
                            delivery_time: formData['delivery_time'],
                            total_price: price_total,
                            note: formData['note']
                          }
                        })
                        .then((risp) => {
                          router.push({ name: 'order', params: { slug: rest_slug } });
                        })
                        .catch((error) => {
                          console.log('ziopera');
                        })
                        .finally(() => {
                          // Disattiva il loader quando il pagamento è stato completato
                          self.paymentProcessing = false;
                        });
                    }
                  });
                });
              }
            }
          );
        });
      } else {
        this.errorMessage = 'Inserisci i tuoi dati prima di pagare.';
      }
    },
    getCart(cart) {
      let storedCart = localStorage.getItem(cart);
      if (storedCart) {
        this.cart = JSON.parse(storedCart);
        this.cart.forEach((dish) => {
          this.total_price += dish.price * dish.quantity;
        });
      } else {
        this.fatalError = true;
        this.errorMessage =
          'Ops sembra che il carrello selezionato non abbia nulla al suo interno, prova ad inserire dei prodotti o a cambiare carrello';
      }
    }
  }
};
</script>
<template>
    <div v-if="fatalError">
        <div class="alert alert-warning">
            {{ errorMessage }}
        </div>
    </div>
    <div v-else>
        <div class="alert alert-warning" v-if="errorMessage">{{ errorMessage }}</div>
        <div id="dropin-container"></div>
        <button @click="createCheckoutForm" id="submit-button" class="button btn btn-primary mt-3" :disabled="paymentProcessing">
        {{ paymentProcessing ? 'Pagamento in corso...' : 'Paga:' }}<strong v-if="paymentProcessing">&euro;{{ total_price.toFixed(2) }} </strong>
        </button>
    </div>
</template>
<style lang="scss" scoped>
</style>
