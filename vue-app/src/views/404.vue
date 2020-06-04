<script>
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
        return this.$store.getters.ProvidersList.length;
      },

      institutions(){
        return this.$store.getters.InstitutionsList.length;
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      /// svg
      ContratacionesSvg,
      ProgramaSvg,
      ProyectosSvg,
      ContratistasSvg,
      InstitucionesSvg
    }
  }
</script>

<template>
  <div>
    <section>
      <div class="container">
        <div class="row">

        <h1 class="mb-4">Página no encontrada.</h1>
        <p>Lo sentimos, la página que buscas no se encuentra en el servidor, intenta explorando <strong>Infraestructura Abierta</strong>:</p>
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
          <!--contratistas-->
          <div class="col">
            <router-link to="/contratistas" class="ia_icons">
            <contratistas-svg />
              <span class="count">{{providers}}</span>
              <span class="des">Contratistas</span>
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
      </div>
  </section>
  </div>
</template>
