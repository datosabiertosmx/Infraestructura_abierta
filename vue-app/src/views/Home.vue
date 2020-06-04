<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import MapaGeneral from "../components/MapaGeneral.vue";
  import BuscadorHome from "../components/BuscadorHome.vue";
  import SocialSharing from "vue-social-sharing";
  /// svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import ProgramaSvg from "../svg/programas-svg.vue";
  import ProyectosSvg from "../svg/proyecto-svg.vue";
  import ContratistasSvg from "../svg/contratistas-svg.vue";
  import InstitucionesSvg from "../svg/instituciones-svg.vue";

  export default {
    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      programs(){
        return this.$store.getters.ProgramsList.length;
      },

      projects(){
        return this.$store.getters.ProjectsList.length;
      },

      contracts(){
        return this.$store.getters.Releases.length;
      },

      providers(){
        return this.$store.getters.ProvidersList.filter(p => p.awards).length;
      },

      tenderers(){
        return this.$store.getters.ProvidersList.filter(p => ! p.awards).length;
      },

      institutions(){
        return this.$store.getters.InstitutionsList.length;
      },

      location(){
        return window.location.href;
      }

    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      MapaGeneral,
      BuscadorHome,
      SocialSharing,
      /// svg
      ContratacionesSvg,
      ProgramaSvg,
      ProyectosSvg,
      ContratistasSvg,
      InstitucionesSvg
    }
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL TEMPLATE DEL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
  -->
<template>
  <div>
    <div class="ai_social_sharing">
    <social-sharing :url="location"
                    title="Infraestructura Abierta"
                    description=""
                    quote=""
                    hashtags="InfraestructuraAbierta"
                    inline-template>
       <!-- twitter-user="vuejs"-->
       <div>

         <network network="facebook">
           <span class="sm fb">Facebook</span>
         </network>
        <network network="twitter">
          <span class="sm tw">Twitter</span>
          </network>
        <network network="telegram">
          <span class="sm tl">Telegram</span>
        </network>
      </div>
    </social-sharing>
    </div>
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <h1 class="ia_title_hm">Infraestructura Abierta</h1>
          </div>
          <div class="col-sm-6">
            <p class="ia_lead">Portal de publicación de información de proyectos de infraestructura.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="ia_search_hm home">
      <!-- ❇️ el buscador avanzado -->
      <buscador-home />
      <!-- ❇️ el mapa -->
      <!--<mapa-general />-->
    </section>

    <section class="mb-0 pb-0">
    <div class="container">
      <div class="row mb-4 pb-4">
        <div class="col-12">
          <h1 class="text-center">Explora más <strong>Infraestructura Abierta</strong></h1>
        </div>
      </div>
      <div class="row mt-4 pt-4">
        <!--programas-->
        <div class="col">
          <router-link to="/programas" class="ia_icons">
          <contrataciones-svg />
            <span class="count">{{programs}}</span>
            <span class="des">Programas de Obra Pública</span>
          </router-link>
        </div>
        <!--proyectos-->
        <div class="col">
          <router-link to="/proyectos" class="ia_icons">
          <proyectos-svg />
            <span class="count">{{projects}}</span>
            <span class="des">Proyectos de infraestructura</span>
          </router-link>
        </div>
        <!--contrataciones-->
        <div class="col">
          <router-link to="/contrataciones" class="ia_icons">
          <programa-svg />
            <span class="count">{{contracts}}</span>
            <span class="des">Contrataciones</span>
          </router-link>
        </div>
        <!--contratistas : proveedores-->
        <div class="col">
          <router-link to="/contratistas" class="ia_icons">
          <contratistas-svg />
            <span class="count">{{providers}}</span>
            <span class="des">Contratistas</span>
          </router-link>
        </div>

        <!--contratistas : licitantes -->
        <div class="col">
          <router-link to="/contratistas" class="ia_icons">
          <contratistas-svg />
            <span class="count">{{tenderers}}</span>
            <span class="des">Licitantes</span>
          </router-link>
        </div>
        <!--instituciones-->
        <div class="col">
          <router-link to="/instituciones" class="ia_icons last">
          <instituciones-svg />
            <span class="count">{{institutions}}</span>
            <span class="des">Instituciones Públicas</span>
          </router-link>
        </div>
      </div>
      <div class="row mt-4 pt-4">
        <div class="col">
        <p class="text-center"><router-link :to="'acerca-del-proyecto'" class="ia_btn">Conoce más sobre el proyecto</router-link></p>
        </div>
      </div>
    </div>
  </section>


  </div>
</template>
