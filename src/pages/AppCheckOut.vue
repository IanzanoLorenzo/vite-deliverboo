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
            address: '',
            deliveryTime: '',
            note: null
        }
    },
    methods: {
        dataForm(){
            if (this.customerName && this.customerSurname && this.customerEmail && this.address && this.deliveryTime) {
            return {
                'name' : this.customerName,
                'surname' : this.customerSurname,
                'email' : this.customerEmail,
                'address' : this.address,
                'delivery_time' : this.deliveryTime,
                'note':this.note
            }}else{
                return null
            }
        }
    },
}
</script>
<template>
    <div class="container margin card mt-5">
        <h2 class="text-center mt-3">Checkout</h2>
        <form>
            <div class="row">
                <div class="col-12 col-md-6 pt-4">
    
                    <div class="mb-3">
                        <label class="form-label">Nome*</label>
                        <input type="text" class="form-control" v-model="customerName" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Cognome*</label>
                        <input type="text" class="form-control" v-model="customerSurname" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Email*</label>
                        <input type="email" class="form-control" v-model="customerEmail" autocomplete="email" required pattern=".+@.+\..+" placeholder="mario@mail.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Indirizzo*</label>
                        <input type="text" class="form-control" v-model="address" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Orario*</label>
                        <input type="time" class="form-control" v-model="deliveryTime" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Note dell'ordine</label>
                        <textarea class="form-control" cols="30" rows="3" v-model="note"></textarea>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <BrainTree :formDataProp="dataForm()"/>   
                </div>
            </div>
        </form>
    </div>
</template>
<style lang="scss" scoped>
    .margin{
        margin-bottom: 100px;
    }
</style>