<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import Breadcrumb from "../components/Breadcrumb.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import MapaPuntos from "../components/MapaPuntos.vue";
  import Bubbles from "../components/Bubbles.vue";
  import ProgramItem from "../components/ProgramItem.vue";
  import ContractItem from "../components/ContractItem.vue";
  import ProjectItem from "../components/ProjectItem.vue";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";

  ///////////////////  svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import ProyectoSvg from "../svg/proyecto-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";

  export default{
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // el tab desplegado
        current : "contratos",
      }
    },

    methods : {
      format(num){
        return this.$store.getters.formatNumber(num);
      }
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      program(){
        return this.$store.getters.Program(this.$route.params.id);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa la lista de programas
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      programs(){
        return this.$store.getters.ProgramsList;
      },

      projects(){
        return this.$store.getters.ProgramProjects(this.program.name);
      },

      projectsList(){
        return this.projects.map( p => this.$store.getters.Project(p.projectId) );
      },

      contracts(){
        return this.$store.getters.ProgramContracts(this.program.id);
      },

      amounts(){
        return this.$store.getters.ProgramAmounts(this.program.name);
      },

      extendedProgram(){
        return this.$store.getters.extendProgramData(this.program);
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
      Breadcrumb,
      BuscadorAvanzado,
      MapaPuntos,
      VerGlosario,
      SocialSharing,
      Bubbles,
      ProgramItem,
      ContractItem,
      ProjectItem,
      ContratacionesSvg,
      ProyectoSvg,
      MoneySvg
    }
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ DEFINE EL TEMPLATE DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
  <div>

    <!--Breadcrumb-->
      <ul class="breadcrumb">
        <li><router-link :to="`/`">  Inicio</router-link></li>
        <li><router-link :to="`/programas`">  Programas</router-link></li>
        <li v-if="program">{{program.name}}</li>
        <li v-else>No se encontró programa</li>
      </ul>

    <div v-if="program">
      <div class="ai_social_sharing">
      <social-sharing :url="location"
                      :title="program.name"
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
        <div class="ia_pjid">
          <p>IDENTIFICADOR: <strong>{{program.id}}</strong></p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 mb-4">
              <h1 class="ia_title_hm profile mb-3 pb-3">{{program.name}}</h1>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-2 text-center">
              <div class="ia_svg white w_30">
              <money-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">
                ${{format(amounts.executed)}}
              </h3>
              <p>Monto Ejercido (MXN)</p>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-2 text-center">
              <div class="ia_svg white w_30">
              <proyecto-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{projects.length}}</h3>
              <p>Proyectos</p>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-2 text-center">
              <div class="ia_svg white w_30">
              <contrataciones-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{contracts.length}}</h3>
              <p>Contrataciones</p>
            </div>
          </div>
        </div>
      </section>
      <!-- ❇️ nav -->
      <section class="ia_hero nav">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <a href="#" :class="['ia_btn_hero_nav', current == 'contratos' ? 'current' : '']"
                          v-on:click.prevent="current= 'contratos'">
                Contratos Relacionados
              </a>
              <a href="#" :class="['ia_btn_hero_nav', current == 'proyectos' ? 'current' : '']"
                          v-on:click.prevent="current= 'proyectos'">
                Proyectos Relacionados
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container" v-if="current=='contratos'">
          <div class="row">
            <div class="col">
              <h2 class="mb-4">Contratos relacionados</h2>
              <div v-for="(contract, i) in contracts" :key="i + '-contract'">
                <contract-item :data="contract" />
              </div>
            </div>
          </div>
        </div>

        <div class="container" v-if="current=='proyectos'">
          <div class="row">
            <div class="col">
              <h2 class="mb-4">Proyectos relacionados</h2>
              <div v-for="(project, i) in projectsList" :key="i + '-project'">
                <project-item :project="project" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!--
    ////////////////////////////////////////////////////////////////////////////////
    ⭐ Descargar masiva
    ////////////////////////////////////////////////////////////////////////////////
    -->
    <div class="container">
    <div class="row">
      <div class="col">
        <div class="mt-4 pt-4">
          <div class="ia_download_items mt-4">
            <div class="row">
              <div class="col-sm-10">
                <p class="text-right">Descargar datos del programa</p>
              </div>

              <div class="col col-sm-2  pl-0">
                <a href="#">JSON</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- glosrio-->
    <ver-glosario />

  </div>
</template>
