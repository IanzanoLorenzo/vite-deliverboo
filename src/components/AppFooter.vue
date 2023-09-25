<script>
export default {
    
}
</script>
<template>
    <footer class="nb-footer">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="about">
                        <img src="images/logo.png" class="img-responsive center-block" alt="">
                        <p>Bootstrap Footer example snippets with CSS, Javascript and HTML. Code example of bootstrap-3 footer using HTML, Javascript, jQuery, and CSS. 5 Beautiful and Responsive Footer Templates. Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS.</p>

                        <div class="social-media">
                            <ul class="list-inline d-flex justify-content-center">
                                <li><a href="#" title=""><i class="fa-brands fa-facebook"></i></a></li>
                                <li><a href="#" title=""><i class="fa-brands fa-twitter"></i></a></li>
                                <li><a href="#" title=""><i class="fa-brands fa-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Scopri Deliveroo</h2>
                        <ul class="list-unstyled">
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Chi siamo</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Ristoranti</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Altro</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Lavora con noi</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Diventa nostro partner</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Note legali</h2>
                        <ul class="list-unstyled">
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Termini & Condizioni</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Informativa sulla privacy</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Cookies</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Aiuto</h2>
                        <ul class="list-unstyled">
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Contatti</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> FAQ</a></li>
                            <li><a href="#" title=""><i class="fa-solid fa-pizza-slice"></i> Tipi di cucina</a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="footer-info-single">
                        <h2 class="title fw-bold">Porta DeliverBoo con te </h2>
                        <ul class="list-unstyled">
                            <li><a href="#" title=""><img src="../assets/img/download-android.png" alt=""></a> </li>
                            <li><a href="#" title=""><img src="../assets/img/download-ios.png" alt=""></a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-12">
                    <div class="row  d-flex justify-content-center">
                        <div class="col-5">
                            <div class="footer-info-single">
                                <h2 class="title fw-bold">Metodi di Pagamento</h2>
                                <p>Sample HTML page with Twitter's Bootstrap. Code example of Easy Sticky Footer using HTML, Javascript, jQuery, and CSS. This bootstrap tutorial covers all the major elements of responsive</p>
                            </div>
                        </div>
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
<style lang="scss">
    @use '../styles/_variables.scss';
    @use '../styles/generals.scss';
    $dark: #0e0a0a;
    $primary: #ac0a55;

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
        border-top: 4px solid $primary;
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
        margin-top: 30px;
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
        color: $primary;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    footer.nb-footer .about .social-media ul li a:hover {
        background: $primary;
        color: #fff;
        border-color: $primary;
    }
    footer.nb-footer .footer-info-single {
        margin-top: 30px;
    }
    footer.nb-footer .footer-info-single .title {
        color: #aaa;
        text-transform: uppercase;
        font-size: 16px;
        border-left: 4px solid $primary;
        padding-left: 5px;
    }
    footer.nb-footer .footer-info-single ul li a {
        display: block;
        color: #aaa;
        padding: 2px 0;
        text-decoration: none;
    }
    footer.nb-footer .footer-info-single ul li a:hover {
        color: $primary;
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
        width: 50%;
    }
</style>