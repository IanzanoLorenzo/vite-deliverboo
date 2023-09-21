<script>
export default {
    
}
</script>
<template>
    <header class="p-3 text-bg-dark">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link :to="'/'" class="nav-link px-2 text-white">Home</router-link></li>
                    <li><router-link :to="'/resturants'" class="nav-link px-2 text-white">Ristoranti</router-link></li>
                    <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
                    <li><a href="#" class="nav-link px-2 text-white">About</a></li>
                </ul>
        
                <div class="text-end">
                    <span class="text-white">Sei un ristoratore?</span>
                    <a type="button" class=" text-white mx-3" href="http://127.0.0.1:8000/login">Accedi</a>
                    <a type="button" class="btn btn-warning"  href="http://127.0.0.1:8000/register">Registrati</a>
                </div>
            </div>
        </div>
    </header>
</template>
<style lang="scss">
    
</style>