<script>
export default {
    
}
</script>
<template>
    <footer class="nb-footer">
        <div class="container">
            <!-- LOGO -->
            <div class="d-flex justify-content-center mt-5">
                <img src="../assets/logo/logo-deliveboo.png" class="logo_delive" alt="logo-deliveboo">
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="about">
                        <!-- About -->
                        <p>"Ci fa piacere che tu abbia scelto il nostro servizio di consegna.
                            Ti invitiamo a seguirci sui social per rimanere aggiornato sulle nostre 
                            offerte speciali e le ultime novità. <span class="text-warning">Buon appetito!</span> "
                        </p>
                        <!-- SOCIAL MEDIA -->
                        <div class="social-media">
                            <ul class="list-inline d-flex justify-content-center">
                                <li><a href="#"><i class="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-whatsapp"></i></a></li>
                                <li><a href="#"><i class="fa-brands fa-telegram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <!--SCOPRI DELIVEROO  -->
                        <h2 class="title fw-bold">Scopri Deliveroo</h2>
                        <ul class="list-unstyled">
                            <li><a href="#">Chi siamo</a></li>
                            <li><a href="#">Ristoranti</a></li>
                            <li><a href="#">Altro</a></li>
                            <li><a href="#">Lavora con noi</a></li>
                            <li><a href="#">Diventa nostro partner</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <!-- > NOTE LEGALI -->
                        <h2 class="title fw-bold">Note legali</h2>
                        <ul class="list-unstyled">
                            <li><a href="#">Termini &amp; Condizioni</a></li>
                            <li><a href="#">Informativa sulla privacy</a></li>
                            <li><a href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Aiuto</h2>
                        <ul class="list-unstyled">
                            <li><a href="#">Contatti</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Tipi di cucina</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Porta DeliverBoo con te </h2>
                        <ul class="list-unstyled">
                            <li><a href="#"><img src="../assets/img/download-android.png" alt=""></a> </li>
                            <li><a href="#"><img src="../assets/img/download-ios.png" alt=""></a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="col-md-3 col-sm-6 d-flex justify-content-center">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">metodi di Pagamento </h2>
                    </div>
                </div>
                <div class="col-12">
                    <div class="social-media">
                        <ul class="list-inline pt-4 d-md-flex">
                            <li class="px-2"><a href="#" class="text-decoration-none"><i class="fa-brands fa-cc-paypal fa-2xl text-warning py-4 px-2"></i><span class=" text-white">PayPal</span></a></li>
                            <li class="px-2"><a href="#" class="text-decoration-none"><i class="fa-brands fa-cc-apple-pay fa-2xl text-warning py-4 px-2"></i><span class=" text-white">AppPay</span></a></li>
                            <li class="px-2"><a href="#" class="text-decoration-none"><i class="fa-brands fa-cc-amazon-pay fa-2xl text-warning py-4 px-2"></i><span class=" text-white">AmazonPay</span></a></li>
                            <li class="px-2"><a href="#" class="text-decoration-none"><i class="fa-brands fa-cc-visa fa-2xl text-warning py-4 px-2"></i><span class=" text-white">Visa</span></a></li>
                            <li class="px-2"><a href="#" class="text-decoration-none"><i class="fa-brands fa-cc-mastercard fa-2xl text-warning py-4 px-2"></i><span class=" text-white">Mastercard</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <section class="copyright">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <p>Copyright © 2023 DeliveBoo.</p>
                    </div>
                </div>
            </div>
        </section>
    </footer>

</template>
<style lang="scss" scoped>
    @import '../styles/_variables.scss';
    @import '../styles/generals.scss';
    .span-or {
        display: block;
        position: absolute;
        left: 50%;
        top: -2px;
        margin-left: -25px;
        background-color: #fff;
        width: 50px;
        text-align: center;
    }
    .hr-or {
        background-color: #cdcdcd;
        height: 1px;
        margin-top: 0px !important;
        margin-bottom: 0px !important;
    }
    footer.nb-footer {
        background: #222;
        border-top: 4px solid $warning;
    }
    footer.nb-footer .about {
        margin: 0 auto;
        margin-top: 40px;
        max-width: 1170px;
        text-align: center;
    }
    footer.nb-footer .about p {
        font-size: 13px;
        color: #999;
        margin-top: 5px;
    }
    footer.nb-footer .about .social-media {
        margin-top: 15px;
    }
    footer.nb-footer .about .social-media ul li a {
        display: inline-block;
        width: 45px;
        height: 45px;
        line-height: 45px;
        border-radius: 50%;
        font-size: 16px;
        color: $warning;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    footer.nb-footer .about .social-media ul li a:hover {
        background: $warning;
        color: #fff;
        border-color: $warning;
    }
    footer.nb-footer .footer-info-single {
        margin-top: 30px;
    }
    footer.nb-footer .footer-info-single .title {
        color: #aaa;
        text-transform: uppercase;
        font-size: 16px;
        border-left: 4px solid $warning;
        padding-left: 5px;
    }
    footer.nb-footer .footer-info-single ul li a {
        display: block;
        color: #aaa;
        padding: 2px 0;
        text-decoration: none;
    }
    footer.nb-footer .footer-info-single ul li a:hover {
        color: $warning;
    }
     
    footer.nb-footer .footer-info-single p {
        font-size: 13px;
        line-height: 20px;
        color: #aaa;
    }
    footer.nb-footer .copyright {
        margin-top: 15px;
        background: #111;
        padding: 7px 0;
        color: #999;
    }
    footer.nb-footer .copyright p {
        margin: 0;
        padding: 0;
    }
    img{
        width: 60%;
    }
</style>