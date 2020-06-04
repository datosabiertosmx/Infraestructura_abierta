<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BarsHorizontalSingle from "../components/BarsHorizontalSingle.vue";
  import BarsHorizontalStack from "../components/BarsHorizontalStack.vue";
  import BarsVerticalSingle from "../components/BarsVerticalSingle.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import DonutHalfGraph from "../components/DonutHalfGraph.vue";
  import Donut from "../components/Donut.vue";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";

  export default {
    methods : {
      translate(text){
        return this.$store.getters.translate(text)
      }
    },

    computed : {
      projectsByStatus(){
        let data = this.$store.getters.ProjectsByStatus;
        return data.map(d => {
          return {
            total : d.total,
            type : d.status,
            value : d.total
          }
        });
      },

      ProjectsBudgetByStatus(){
        return this.$store.getters.ProjectsBudgetByStatus;
      },

      ProjectsInfrastructure(){
        return this.$store.getters.ProjectsInfrastructurePercent.map(data => {
          return {
            year : data.year,
            values : [
              {value: data.fin, percent :data.finished},
              {value: data.on, percent :data.ongoing}
            ]
          }
        }).sort( (a,b) => a.year - b.year  );
      },

      ProjectsInfrastructurePercent(){
        return this.$store.getters.ProjectsInfrastructurePercent.map(data => {
          return {
            year : data.year,
            values : [
              {value: data.finished, percent :data.finished},
              {value: data.ongoing, percent :data.ongoing}
            ]
          }
        }).sort( (a,b) => a.year - b.year  );
      },

      ContractsByStage(){
        let data = this.$store.getters.ContractsByStage;

        return data.map(d => {
          return {
            total : d.total,
            type  : d.stage,
            value : d.total
          }
        });
      },

      ContractsAmountByTenderMethod(){
        return this.$store.getters.ContractsAmountByTenderMethod;
      },

      ContractsTotalByTenderMethod(){
        return this.$store.getters.ContractsAmountByTenderMethod.map(item => {
          return {
            value : item.total,
            percent : item._percent,
            label : item.label
          }
        });
      },

      colors(){
        return this.$store.state.colors;
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
      BarsHorizontalSingle,
      BarsHorizontalStack,
      BarsVerticalSingle,
      BuscadorAvanzado,
      DonutHalfGraph,
      Donut,
      VerGlosario,
      SocialSharing
    },
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
                    title="Indicadores"
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
    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li>Indicadores</li>
    </ul>
    <section class="ia_hero mb-4">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="ia_title_hm">Indicadores</h1>
          </div>
        </div>
      </div>
    </section>
    <div class="container pt-4 mt-4">
      <!-- número de proyectos-->
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Número de proyectos</h2>
          <!-- ❇️ dona -->
          <donut :data="projectsByStatus" />
          <ul class="ia_bars_color_guide mt-2">
            <li v-for="(item, i) in projectsByStatus" :key="i + '-lb'">
              <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
              {{translate(item.type)[0]}} : {{item.total}}
            </li>
          </ul>
        </div>
        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
      </div>


      <!-- Presupuesto de proyectos según estatus-->
      <div class="row mt-4">
        <div class="col-12">
          <h2 class="mb-4 pb-2">Presupuesto de proyectos según estatus</h2>
          <p class="pb-4">Cifras en pesos mexicanos (MXN).</p>

          <!-- ❇️ barras verticales -->
          <bars-horizontal-single :data="ProjectsBudgetByStatus" />
        </div>
      </div>
<!--
    <h2>Gasto de inversión en infraestructura por población beneficiada</h2>
     ❇️ barras horizontales
    <bars-horizontal-single /> -->
<!--
    <h2>Porcentaje de proyectos integrales de infraestructura autorizados</h2>
     ❇️ barras horizontales stacked
    <bars-horizontal-stack />-->


    <!-- Proyectos de infraestructura construidos-->
    <div class="row mt-4">
      <div class="col-12 mb-4 pb-4">
        <h2 class="mb-4 pb-4">Proyectos de infraestructura construidos</h2>
        <h4>Porcentaje</h4>
        <!-- ❇️ barras horizontales stacked -->
        <div v-for="(item, i) in ProjectsInfrastructurePercent" :key="i + '-pipp'" class="row">
          <div class="col-12">
            <p>{{item.year}}</p>
          </div>
          <div class="col-10 offset-1">
            <bars-horizontal-stack :data="item" />
          </div>
        </div>
      </div>

      <div class="col-12">
        <h4>Número</h4>
        <div v-for="(item, i) in ProjectsInfrastructure" :key="i + '-pip'" class="row">
          <div class="col-12">
            <p>{{item.year}}</p>
          </div>
          <div class="col-10 offset-1">
            <bars-horizontal-stack :data="item" />
          </div>
        </div>
      </div>

      <div class="col mt-4 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
      </div>
    </div>
<!--
    <h2>Número de proyectos con asignación de clave de cartera y PEI (de los enviados a terceros)</h2>
     ❇️ barras horizontales stacked
    <bars-horizontal-stack />-->

    <!-- Porcentaje de procesos de contratación terminados-->
    <div class="row mt-4">
      <div class="col-12 mb-4 pb-4">
        <h2 class="mb-4">Número de procesos de contratación terminados</h2>
        <!-- ❇️ dona -->
        <donut :data="ContractsByStage" />
        <ul class="ia_bars_color_guide mt-2">
          <li v-for="(item, i) in ContractsByStage" :key="i + '-lbt'">
            <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
            {{translate(item.type)[0]}} : {{item.total}}
          </li>
        </ul>
      </div>
      <div class="col mt-4 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
      </div>
    </div>
    <!--<h2>Monto total de los proyectos por método 2017-2023</h2>
     ❇️ barras verticales -->

    <!-- Situación de los contratos de obra pública y relacionados
    <div class="row mt-4">
      <div class="col-12 mb-4 pb-4">
        <h2 class="mb-4">Situación de los contratos de obra pública y relacionados</h2>-->
        <!-- ❇️ barras horizontales stacked
        <bars-horizontal-stack />
      </div>
      <div class="col mt-4 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
      </div>
    </div>-->


    <!-- SMonto total de los contratos por método 2017-2023<-->
    <div class="row mt-4">
      <div class="col-12 mb-4 pb-4">
        <h2 class="mb-2">Monto total de los contratos por método<!-- 2017-2023--></h2>
        <p class="pb-4">Cifras en pesos mexicanos (MXN).</p>

        <!-- ❇️ barras verticales -->
        <bars-horizontal-single :data="ContractsAmountByTenderMethod" />
      </div>
    </div>

    <!-- SMonto total de los contratos por método 2017-2023<-->
    <div class="row mt-4">
      <div class="col-12 mb-4 pb-4">
        <h2 class="mb-4">Total de contratos por método<!-- 2017-2023--></h2>
        <!-- ❇️ barras verticales -->
        <bars-horizontal-single :data="ContractsTotalByTenderMethod" />
      </div>
    </div>

<ver-glosario />

  </div>
  </div>
</template>
