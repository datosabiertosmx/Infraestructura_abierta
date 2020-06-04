<script>
  import BuscadorAvanzado from "./components/BuscadorAvanzado.vue";

  import BuscadorSvg from "./svg/icons/buscador-svg.vue";
  import CloseSvg from "./svg/icons/close-svg.vue";

  export default {
    /*
     * 👾 D A T
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showSearch : 0,
        menu : false
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      BuscadorAvanzado,
      BuscadorSvg,
      CloseSvg
    }
  }
</script>


<!--
  ////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE EL TEMPLATE DEL COMPONENTE DE VUE PRINCIPAL
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
  <div>
    <header class="ia_header">
      <div class="row">
      <div class="col-4 pt-3 pb-3">
        <h1>
          <!--<a href="/" class="infa_abierta">Infraestructura Abierta</a>-->
          <router-link to="/" class="infa_abierta">Infraestructura Abierta</router-link>
          <b class="ia_separator no-mobile no-tablet"></b>
          <a href="http://www.nl.gob.mx/" class="nl_logo">Gobierno de Nuevo León</a>
        </h1>
      </div>

      <div class="col-7">
        <input class="toggle-menu" id="toggle-menu" type="checkbox" v-model="menu" />
               <label class="button-toggle-menu" for="toggle-menu">
                 <span class="burger">
                     <span class="bar">
                            <span class="visuallyhidden"></span>
                     </span>
                  </span>
               </label>
               <label class="overlay"  for="toggle-menu">  </label>
        <nav class="h_nav" for="toggle-menu">
    <!-- los links del router
    <router-link to="/">inicio</router-link>-->
     <b v-on:click="menu = false"><router-link to="/programas">Programas</router-link></b>
     <b v-on:click="menu = false"><router-link to="/proyectos">Proyectos</router-link></b>
     <b v-on:click="menu = false"><router-link to="/contrataciones">Contrataciones</router-link></b>
     <b v-on:click="menu = false"><router-link to="/contratistas">Contratistas</router-link></b>
     <b v-on:click="menu = false"><router-link to="/instituciones">Instituciones</router-link></b>
     <b v-on:click="menu = false"><router-link to="/indicadores">Indicadores</router-link></b>

        </nav>

      </div>
      <div class="col-1">
        <a href="#" v-on:click.prevent="showSearch = !showSearch" class="ia_svg h_25 w_20 min ia_search_btn">
          <span v-if="!showSearch">
          <buscador-svg/>
          </span>
          <span v-else>
          <close-svg/>
          </span>
        </a>
      </div>
    </div>
    <div v-if="showSearch">
      <buscador-avanzado />
    </div>
  </header>
<div class="ai_beta">
  <p>
  <span>VERSIÓN BETA</span>
</p>
</div>
  <!-- el contenido que se despliega -->
  <router-view />

    <div id="the-popup"
         v-if="$store.state.popup"
         v-html="$store.getters.getPopupHTML"
         :style="{
          position : 'fixed',
          top : $store.getters.getPopupY + 'px',
          left : $store.getters.getPopupX + 'px'
        }" >
    </div>

    <section class="ia_aliados">
      <div class="container">
        <p class="text-center">Con la participación de</p>
        <div class="row">
          <div class="col">
            <a href="http://inicio.inai.org.mx/" class="inai">INAI</a>
          </div>
          <div class="col">
            <a href="https://www.mexicoevalua.org/" class="mexicoevalua">México Evalúa</a>
          </div>
          <div class="col">
            <a href="https://www.cmicnl.mx/" class="cmic">CMIC Nuevo León</a>
          </div>
          <div class="col">
            <a href="http://www.comovamosnl.org/" class="comovamosnl">Cómo vamos</a>
          </div>
          <div class="col">
            <a href="http://arquitectura.uanl.mx/" class="farq">FARQ</a>
          </div>
          <div class="col">
            <a href="http://www.ctainl.org.mx/quees.php" class="cotai">COTAI</a>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="container">
        <div class="footer-top">
          <div class="row">
            <div class="col">
            <a href="tel:911">
              <span class="footer-top__title">911</span>
              <span>Emergencias</span>
            </a>
            </div>
            <div class="col">
              <a href="tel:089">
                <span class="footer-top__title">089</span>
                <span>Denuncia anónima</span>
              </a>
            </div>
          <div class="col">
            <a href="tel:070">
              <span class="footer-top__title">070</span>
              <span>Informatel y Locatel</span>
            </a>
          </div>
          <div class="col">
            <a href="tel:073">
              <span class="footer-top__title">073</span>
              <span>Agua y drenaje</span>
            </a>
          </div>
          <div class="col">
            <a href="http://aire.nl.gob.mx/" title="Ir a portal de Monitoreo ambiental" target="_blank">
              <span class="footer-top__title"><b class="i_seedling"></b></span>
              <span>Monitoreo ambiental</span>
            </a>
          </div>
            </div><!--row-->
          </div><!--footer-top-->

          <div class="row">
            <div class="col-sm-6">
              <h3 class="nl_logofooter">Nuevo León, siempre ascendiendo</h3>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <div class="col-7">
                  <div class="footer__separator-block">
                      <ul class="menu nav">
                        <li class="first leaf"><a href="http://nl.gob.mx/gobierno" title="Gobierno" class="btn_footer">Gobierno</a></li>
                        <li class="leaf"><a href="http://nl.gob.mx/tramites-y-servicios" title="Trámites y servicios" class="btn_footer">Trámites y servicios</a></li>
                        <li class="leaf"><a href="http://nl.gob.mx/actualidad" title="Actualidad" class="btn_footer">Actualidad</a></li>
                        <li class="last leaf"><a href="http://nl.gob.mx/transparencia" title="Transparencia" class="btn_footer">Transparencia</a></li>
                      </ul>

                    </div>
                </div>
                <div class="col-5">
                  <div class="social-media">
                    <a class="sm fb" target="_blank" href="https://www.facebook.com/gobiernonuevoleon/">Facebook></a>
                    <a class="sm tw" target="_blank" href="https://twitter.com/nuevoleon">Twitter</a>
                    <a class="sm ig" target="_blank" href="https://www.instagram.com/nuevoleonmx/">Instagram</a>
                    <a class="sm yt" target="_blank" href="https://www.youtube.com/user/GobiernoNuevoLeon">Youtube</a>
                    <a class="sm tl" target="_blank" href="https://t.me/gobnl">Telegram</a>
                  </div><!--social-media-->
                  <a class="btn_footer" href="http://nl.gob.mx/campanas/codigo-de-etica-del-gobierno-del-estado-de-nuevo-leon" title="">Código de Ética</a>
                </div><!--col-6-->
              </div><!--row-->

            </div><!--col-6-->
          </div><!--row-->

          <div class="row">
            <div class="col-12">
              <ul class="menu nav_bottom row">
                <li class="col-6">
                  <a href="https://nl.gob.mx/sobre-tratamiento-datos-personales" title="">Sobre el tratamiento de los datos personales</a>
                </li>
                <li class="col-3">
                  <a href="https://beta.nl.gob.mx/dinos-tu-opinion-sobre-este-sitio" title="">Dinos tu opinión</a>
                </li>
                <li class="col-3">
                  <a href="https://beta.nl.gob.mx/contactanos" title="">Contáctanos</a></li>
              </ul>
            </div>
          </div>
      </div>
    </footer>
  </div>
</template>
