<script>
import BrainTree from '../components/BrainTree.vue';
export default {
    components:{
        BrainTree
    },
    data() {
        return {
            customerName: '',
            customerSurname: '',
            customerEmail: '',
            adderss: '',
            deliveryTime: ''
        }
    },
    methods: {
        dataForm(){
            return {
                'name' : this.customerName,
                'surname' : this.customerSurname,
                'email' : this.customerEmail,
                'address' : this.adderss,
                'deliveryTime' : this.deliveryTime
            }
        }
    },
}
</script>
<template>
    <div class="container card mt-5">
        <h2 class="text-center mt-3">Checkout</h2>
        <div class="row">
            <div class="col-6 pt-4">
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" v-model="customerName">
                </div>
                <div class="mb-3">
                    <label class="form-label">Cognome</label>
                    <input type="text" class="form-control" v-model="customerSurname">
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="customerEmail">
                </div>
                <div class="mb-3">
                    <label class="form-label">Indirizzo</label>
                    <input type="text" class="form-control" v-model="adderss">
                </div>
                <div class="mb-3">
                    <label class="form-label">Orario</label>
                    <input type="time" class="form-control" v-model="deliveryTime">
                </div>
            </div>
            <div class="col-6">
                <BrainTree :form="dataForm()"/>   
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>