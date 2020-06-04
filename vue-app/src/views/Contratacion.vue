<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import ProjectItem from "../components/ProjectItem.vue";
  import GaugeGraph from "../components/GaugeGraph.vue";
  import DonutPercentGraph from "../components/DonutPercent.vue";
  import SocialSharing from "vue-social-sharing";
  import VerGlosario from "../components/VerGlosario.vue";
  //// _svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import ContratistasSvg from "../svg/contratistas-svg.vue";
  import EntidadcompradoraSvg from "../svg/icons/entidadcompradora-svg.vue";
  import EntidadcontratanteSvg from "../svg/icons/entidadcontratante-svg.vue";
  import FechainicioSvg from "../svg/icons/fechadeinicio-svg.vue";
  import FechaterminoSvg from "../svg/icons/fechadetermino-svg.vue";
  import TimeSvg from "../svg/icons/time_svg.vue";

  // Fases
  import PlaneacionSvg from "../svg/etapascontratacion/planeacion-svg.vue";
  import LicitacionSvg from "../svg/etapascontratacion/licitacion-svg.vue";
  import AdjudicacionSvg from "../svg/etapascontratacion/adjudicacion-svg.vue";
  import ContratacionSvg from "../svg/etapascontratacion/contratacion-svg.vue";
  import ImplementacionSvg from "../svg/etapascontratacion/implementacion-svg.vue";

  export default {

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
        return {
          // el tab desplegado
          current : "info",
          bcurrent : "planeacion"
        }
    },

    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      getDate(date){
    		let d = this.$store.getters.getDateObject(date);
    		return d;
    	},
      format(num){
        return this.$store.getters.formatNumber(num);
      },
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  traduce una etiqueta del edca
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      translate(labels){
        return this.$store.getters.translate(labels).join(", ");
      },
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      this.bcurrent = this.$route.name;
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regrese el contrato seleccionado
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      contract(){
        return this.$store.getters.Contract(this.$route.params.id);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el proyecto relacionado
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      project(){
        return this.$store.getters.parentProject(this.contract.ocid) || this.$store.getters.ProjectsList[0];
      },

      title(){
        let cs = this.$store.getters.contractState;
        return cs(this.contract) >= 2 ? this.contract.tender.description :  this.project.title;
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el estado del contrato en clave numérica
      /  1 = planeación
      /  2 = licitación
      /  3 = adjudicación
      /  4 = contratación
      /  5 = implementación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      state(){
        return this.$store.getters.contractState(this.contract);
      },

      procuringEntity(){
        return this.$store.getters.contractProcuringEntity(this.contract);
      },

      buyer(){
        return this.$store.getters.contractBuyer(this.contract);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  la suma de todas las transacciones de los
      /  contratos del proceso de contratación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      localExecutedBudget(){
        if(this.state < 5) return 0;
        return this.$store.getters.contractExecutedBudget(this.contract.contracts);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  la suma de la suma de todos los contratos
      /  del proceso de contratación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      localBudget(){
        if(this.state < 4) return 0;
        return this.$store.getters.contractTotalBudget(this.contract.contracts);
      },

      executedPercent(){
        if(this.state < 5) return 0;

        let percent =this.localExecutedBudget / this.localBudget;

        console.log("test:",percent,this.localExecutedBudget,this.localBudget);
        return percent >= 1 ? 100 : percent * 100;
      },

      providersNum(){
        return this.$store.getters.contractProviders(this.contract).length;
      },
      providers(){
        return this.$store.getters.contractProviders(this.contract);
      },

      tenderersNum(){
        return this.$store.getters.contractTenderers(this.contract).length;
      },

      physicalAdvance(){
        return this.$store.getters.physicalAdvance(this.contract);

      },

      financialAdvance(){
        return this.$store.getters.financialAdvance(this.contract);
      },

      location(){
        return window.location.href;
      }
    },

    /*
     * 👾 W A T C H
     * ----------------------------------------------------------------------
     */
    watch: {
      $route(to) {
        this.bcurrent = to.name;
      }
    },


    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      SocialSharing,
      BuscadorAvanzado,
      ProjectItem,
      GaugeGraph,
      DonutPercentGraph,
      VerGlosario,
      // _svg
      TimeSvg,
      ContratistasSvg,
      ContratacionesSvg,
      EntidadcompradoraSvg,
      EntidadcontratanteSvg,
      FechainicioSvg,
      FechaterminoSvg,
      PlaneacionSvg,
      LicitacionSvg,
      AdjudicacionSvg,
      ContratacionSvg,
      ImplementacionSvg
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

    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li><router-link :to="`/contrataciones`">  Contrataciones</router-link></li>
      <li v-if="contract">{{title}}</li>
      <li v-else>No se encontró el contrato</li>
    </ul>
    <!-- no se encontró el contract -->
    <p v-if="!contract">  😱 😱 😱 😱 😱  </p>

    <div v-if="contract">
      <div class="ai_social_sharing">
      <social-sharing :url="location"
                      :title="title"
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
          <p>IDENTIFICADOR: <strong>{{contract.ocid}}</strong></p>
        </div>
        <div class="ia_pjid date">
          <p><span class="ai_box_time"><time-svg /> Fecha de publicación: {{getDate(contract.date)}} </span></p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-6 mb-2">
              <h1 class="ia_title_hm profile mb-3 pb-3">{{title}}</h1>
              <p><strong>Descripción:</strong> {{project.description}}</p>
              <p v-if="providers.length"><strong>{{ providers.length == 1 ? 'Contratista' : 'Contratistas' }}:</strong><br>
                <span v-for="(provider, i) in providers" :key="i + 'provider'">
                  <router-link :to="`/contratista/` + provider.id " class="ia_linkprovider">{{provider.name}}</router-link><br>
                </span>
              </p>
            </div>
            <div class="col-sm-4 col-md-4 col-lg-2">
              <div class="ia_bar_container">
                <div class="ia_bar" :style="{width: executedPercent + '%'}"></div>
              </div>
              <h2 class="ia_amount_section white mb-1">${{format(localExecutedBudget)}}</h2>
              <p>Monto Ejercido (MXN)</p>
            </div>

            <div class="col text-center">
              <div class="ia_svg white w_30">
              <contrataciones-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{state >= 4 ? contract.contracts.length : 0}}</h3>
              <p>Contratos</p>
            </div>

            <div class="col text-center">
              <div class="ia_svg white w_30">
              <contratistas-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{tenderersNum}}</h3>
              <p>Licitantes</p>
            </div>
          </div>



        </div>
      </section>

      <!-- ❇️ nav
      <section class="ia_hero nav">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <a href="#" :class="['ia_btn_hero_nav', current == 'info' ? 'current' : '']"
                          v-on:click.prevent="current= 'info'">
                 Información General
              </a>
              <a href="#" :class="['ia_btn_hero_nav', current == 'etapas' ? 'current' : '']"
                          v-on:click.prevent="current= 'etapas'">
                Etapas de la Contratación
              </a>

            </div>
          </div>
        </div>
      </section>-->

      <section>
        <div class="container"> <!-- v-if="current=='info'"-->
          <div class="row mb-4 pb-4">
            <!--compradora-->
            <div class="col-6 col-sm-3 text-center">
              <p class="ia_amount_label">Entidad compradora</p>
              <div class="ia_svg h_35 w_30 min">
                <entidadcompradora-svg />
              </div>
              <p class="ia_amount_des">{{buyer}}</p>
            </div>
            <!--contratante-->
            <div class="col text-center">
              <p class="ia_amount_label">Entidad contratante</p>
              <div class="ia_svg h_35 w_30 min">
                <entidadcontratante-svg />
              </div>
              <p class="ia_amount_des">{{procuringEntity}}</p>
            </div>
            <!--inicio-->
            <div class="col text-center">
              <p class="ia_amount_label">Fecha de inicio</p>
              <div class="ia_svg h_35 w_30 min">
                <fechainicio-svg />
              </div>
              <p class="ia_amount_des">{{getDate(project.period.startDate)}}</p>
            </div>
            <!--termino-->
            <div class="col text-center">
              <p class="ia_amount_label">Fecha de término</p>
              <div class="ia_svg h_35 w_30 min">
                <fechatermino-svg />
              </div>
              <p class="ia_amount_des">{{getDate(project.period.endDate)}}</p>
            </div>
          </div>

          <div class="row mb-4 pb-4">
            <div class="ia_separator bottom"></div>
            <!-- ❇️ las gráficas de aguja -->
            <!--
            <div class="col-4 text-center">
            <h3>Proposiciones solventes</h3>
            <gauge-graph />
            </div>
            -->
            <div class="col-12 col-sm-6 text-center mt-4">
              <h3>Avance físico</h3>
            <!-- <gauge-graph /> -->
            <donut-percent-graph :title="'100%'" :percent="physicalAdvance" />
            </div>
            <div class="col-12  col-sm-6 text-center  mt-4">
            <h3>Avance financiero</h3>
            <!-- <gauge-graph /> -->
            <donut-percent-graph :title="'100%'" :percent="financialAdvance" />
            </div>
          </div>


          <div class="row mb-4 pb-4">
            <div class="col-12">
              <div class="ai_box_item py-3">
                <div class="row mb-4">
                  <div class="col-12">

                    <!-- 👯‍♀️ los tabs del proceso de contratación -->
                    <div class="row mb-4 pb-4">

                    <router-link :to="`/contratacion/${contract.ocid}`"
                                :class="['ia_btn_hero_nav col', bcurrent == 'planeacion' ? 'current' : '']">
                                <span :class="['_svg', bcurrent == 'planeacion' ? '' : 'path_white']"><planeacion-svg /></span>
                                Planeación
                    </router-link>

                    <router-link v-if="state >= 2" :to="`/contratacion/${contract.ocid}/invitacion`"
                                 :class="['ia_btn_hero_nav col', bcurrent == 'invitacion' ? 'current' : '']">
                                 <span :class="['_svg', bcurrent == 'invitacion' ? '' : 'path_white']"><licitacion-svg /></span>
                                 Licitación
                    </router-link>

                    <router-link v-if="state >= 3" :to="`/contratacion/${contract.ocid}/adjudicacion`"
                                 :class="['ia_btn_hero_nav col', bcurrent == 'adjudicacion' ? 'current' : '']">
                                 <span :class="['_svg', bcurrent == 'adjudicacion' ? '' : 'path_white']"><adjudicacion-svg /></span>
                                 Adjudicación
                    </router-link>

                    <router-link v-if="state >= 4" :to="`/contratacion/${contract.ocid}/contratacion`"
                                 :class="['ia_btn_hero_nav col', bcurrent == 'contratacion' ? 'current' : '']">
                                 <span :class="['_svg', bcurrent == 'contratacion' ? '' : 'path_white']"><contratacion-svg /></span>
                                 Contratación
                    </router-link>

                    <router-link v-if="state>= 5" :to="`/contratacion/${contract.ocid}/ejecucion`"
                                 :class="['ia_btn_hero_nav col', bcurrent == 'ejecucion' ? 'current' : '']">
                                 <span :class="['_svg', bcurrent == 'ejecucion' ? '' : 'path_white']"><implementacion-svg /></span>
                                 Ejecución
                    </router-link>
                    </div>
                  </div>
                </div>
                <!--- sub nav ends-->

                <div class="row pt-4">
                <router-view :contract="contract" :project="project"></router-view>
                </div>
              </div>
            </div>
            <div class="col-12">
              <p class="ai_box_top text-right"><span class="ai_box_time"><time-svg /> Fecha de publicación: {{getDate(contract.date)}} </span></p>
            </div>
          </div>

        </div>
      </section>

      <!-- glosrio-->
      <ver-glosario />

      <section class="ia_gray _bottom">
        <div class="container">
          <div class="row mb-4 pb-4">
            <div class="col">
            <h2>Proyecto relacionado al proceso de contratación</h2>
            </div>
          </div>

            <!-- ❇️ el proyecto relacionado -->
            <project-item :project="project" />
        </div>
      </section>


    </div>
    <!--if contract ends-->
  </div>
</template>
