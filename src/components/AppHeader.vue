<script>
export default {
    
}
</script>
<template>
    <header class="p-1 bg-light" >
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <!-- HEADER SINISTRA -->
                <ul class="text-dark nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <!-- LOGO -->
                    <li class="d-flex align-items-center">
                        <router-link :to="'/'" class="nav-link px-2 ">
                            <img src="../assets/img/logo-deliveboo.png" class="logo_delive" alt="logo-deliveboo">
                            
                            <!-- ****** INSERIRE SCRITTA DELIVEBOO VICINO AL LOGO ******-->
                        </router-link>
                    </li>
                    <li class="d-flex align-items-center">
                        <router-link :to="'/'" class="nav-link px-2 ">
                            Home
                        </router-link>
                    </li>
                    <li class="d-flex align-items-center">
                        <a href="#" class="nav-link px-2">
                            FAQs
                        </a>
                    </li>
                    <li class="d-flex align-items-center">
                        <a href="#" class="nav-link px-2">
                            About
                        </a>
                    </li>
                </ul>
                <!-- HEADER DESTRA -->
                <div class="text-end">
                    <span class="text-dark">
                        Sei un ristoratore?
                    </span>
                    <a type="button" class=" text-dark mx-3" href="http://127.0.0.1:8000/login">
                        Accedi
                    </a>
                    <a type="button" class="btn btn-warning"  href="http://127.0.0.1:8000/register">
                        Registrati
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>
<style lang="scss">

header{
    //box-shadow: 2 2px 4px rgba(2, 2, 2, 1);
    //position:fixed
    //background-color: $light !important;
    box-shadow: 0px 0px 6.5px 0.5px rgb(33, 24, 53)
}

.logo_delive{
    width: 100px;
}

.shadow_title {
    text-shadow: 3px 3px white;
}
    
</style>