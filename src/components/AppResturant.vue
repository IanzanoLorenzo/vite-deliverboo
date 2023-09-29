<script>
import axios from 'axios';
import { store } from '../store';
import ResturantCard from './ResturantCard.vue';
import AppPagination from './AppPagination.vue';

export default {
  components: {
    ResturantCard,
    AppPagination
  },
  data() {
    return {
      store,
      axios,
      selected_type: [],
      currentPage: 1, // Inizializza la pagina corrente
      totalPages: 0,
    }
  },
  mounted() {
    try {
      this.getResturants();
    } catch (error) {
      console.error('c\'è stato un problema con la chiamata api')
    }
  },
  methods: {
    // Funzione per ottenere i ristoranti tramite una chiamata Axios
    getResturants(page) {
      if (this.selected_type.length === 0) {
        axios.get(this.store.basicUrl + 'api/resturants?page='+page).then((risp) => {
          // Memorizza i ristoranti e i tipi di ristoranti nello store
          this.store.resturants = risp.data.response.resturants.data;
          this.store.types = risp.data.response.types;
          this.currentPage = risp.data.response.resturants.current_page;
          this.totalPages = risp.data.response.resturants.last_page;
        })
      } else {
        let search = this.selected_type.join('-');
        axios.get(this.store.basicUrl + 'api/resturants/search/'+search+'?page='+page).then((risp) => {
          // Memorizza i ristoranti e i tipi di ristoranti nello store
          this.store.resturants = risp.data.response.resturants.data;
          this.store.types = risp.data.response.types;
          this.currentPage = risp.data.response.resturants.current_page;
          this.totalPages = risp.data.response.resturants.last_page;
        })
      }
    },
  },
}
</script>

<template>
    <div class="container pad_bot">
         <!-- PARAGRAFO -->
        <p class="text-white fs-5 lh-lg mb-3 pad_top_extra">
        Che tu stia cercando i sapori autentici della cucina italiana, l'esotismo delle spezie orientali
        o un gustoso hamburger americano classico, siamo qui per soddisfare ogni tuo desiderio gastronomico.
        </p>

        <!-- CITAZIONE -->
        <figure class="text-center pt-5"><!--- NON TOCCARE QUESTE MISURE! se lo fai chiedi a Silvia :3 -->
            <blockquote class="blockquote">
                <p>"Ogni piatto è un viaggio in un luogo, in una cultura, in una tradizione."</p>
            </blockquote>
            <figcaption class="blockquote-footer">Alice Waters</figcaption>
        </figure>

        <p class="text-white display-6 mb-3 pt-5">
        E tu, quale tradizione vorresti scoprire questa volta?
        </p>
        <div class="row mt-2">
        <!-- RICERCA PER TIPOLOGIA -->
            <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <!-- CHECKBOX -->
                <div class="form-check form-check-inline" v-for="type in store.types" :key="type.id">
                    <input class="form-check-input" type="checkbox" :id="type.name+'_type'" :value="type.id" v-model="selected_type">
                    <!-- TIPOLOGIA -->
                    <label class="form-check-label" :for="type.name+'_type'">
                        <i :class="['fas', type.icon]"></i> {{ type.name }}
                    </label>
                </div>
                <!-- PULSANTE FILTRA -->
                <button class="btn btn-primary" @click="getResturants(1)">
                Filtra
                </button>
            </div>

            <div class="trans_box">
                <div class="row">
                    <!-- Controllo se ci sono ristoranti -->
                    <div class="fs-3 text-white text-center" v-if="store.resturants.length === 0">
                        Nessun ristorante trovato con il seguente filtraggio, prova a cambiare i filtri e cercare nuovamente
                    </div>
                    <!-- Iterazione sui ristoranti e visualizzazione del componente ResturantCard -->
                    <div v-else class="col-12 col-md-6 mb-5" v-for="resturant in store.resturants" :key="resturant.id">
                        <!--***** RESTURANT CARD ***** -->
                        <ResturantCard :resturant="resturant"/>
                        <!--**** FINE RESTURANT CARD **** -->                      
                    </div>

                    <app-pagination :current-page="currentPage" :total-pages="totalPages" @page-change="getResturants"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
  @import '../styles/_variables.scss';
  @import '../styles/generals.scss';

  .pad_bot{
      padding-bottom: 100px;
  }
  .pad_top_extra{
      padding-top: 80px;
  }
  //CITAZIONE
  figure{
      .blockquote, .blockquote-footer{
          color: $dark;
            
      }
  }  
  //RESTURANT CARD
  .trans_box{
    background-color: rgba(28, 13, 43, 0.64);
    backdrop-filter: blur(3px);
    border-radius: 10px;
    padding: 25px 20px 25px 20px;
    margin-top: 30px;
    box-shadow: 1px 2px 14px 5px #00000070;
  }
</style>
