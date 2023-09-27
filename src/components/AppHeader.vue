<script>
export default {
    
}
</script>
<template>
    <header class="p-1 bg-light" >
        <!-- NAVBAR BOOTSTRAP -->
        <nav class="navbar navbar-expand-md">
            <div class="container">
                <!--*-- MOBILE  --*-->
                    <!-- LOGO -->
                    <router-link :to="'/'" class="navbar-brand d-flex align-items-center">
                        <img src="../assets/img/logo-deliveboo.png" class="logo_delive" alt="logo-deliveboo">
                        <!-- ****** INSERIRE SCRITTA DELIVEBOO VICINO AL LOGO ******-->
                    </router-link>
                    <!-- HAMBURGER MENU -->
                    <button class="navbar-toggler hamburger_menu" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <!--*-- MOBILE  --*-->
                <!--*-- TABLET -- *-->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <!-- NAV SINISTRA -->
                    <ul class="navbar-nav me-auto ">
                        <!-- home  -->                        
                        <li class="nav-item nav_item_hover">
                            <router-link :to="'/'" class="nav-link text-dark fs-5 p-1">
                                Home
                            </router-link>
                        </li>
                    </ul>
                    <!-- NAV DESTRA -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item nav_item_hover">
                            <!-- Accedi -->
                            <a class="nav-link text-dark fs-5 p-1" href="http://127.0.0.1:8000/login">
                                Accedi
                            </a>
                        </li>
                        <li class="nav-item nav_item_hover">
                            <!-- Registrati -->
                            <a class="nav-link text-dark fs-5 p-1" href="http://127.0.0.1:8000/register">
                                Registrati
                            </a>
                        </li>
                    </ul>
                </div>
                <!--*-- TABLET -- *-->
            </div>
        </nav>
        <!--FINE NAVBAR BOOTSTRAP -->
    </header>
</template>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
@import '../styles/generals.scss';

.hamburger_menu {
    padding: 3px !important;
    box-shadow: none !important;
}
.hamburger_menu:hover {
    background: linear-gradient(60deg, #ffffff76 40%, $warning 100%) !important;
}

.nav_item_hover:hover {
    font-weight: 900;
    border-bottom: 1px solid $primary;
    border-width: thin;
}
.nav_auth_hover:hover {
    color: $primary !important;
    border-top: 1px solid $primary;
    border-width: thin;
}
.nav_itemdrop_hover:hover {
    background-color: $primary !important;
    color: white;
}
.nav_drop_menu {
    background-color: rgba(245, 222, 179, 0.5);
}

header{
    box-shadow: 0px 0px 8px 3px rgb(95, 77, 42);
    z-index: 1;
}
.logo_delive{
    width: 100px;
}
.shadow_title {
    text-shadow: 3px 3px white;
}  
</style>