<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BarsHorizontalStack from "../components/BarsHorizontalStack.vue";
  import BarsHorizontalDoubleGeneric from "../components/BarsHorizontalDoubleGeneric.vue";
  import BarsVerticalSingle from "../components/BarsVerticalSingle.vue";
  import BarsHorizontalSingle from "../components/BarsHorizontalSingle.vue";
  import BubblesContracts from "../components/BubblesContracts.vue";
  import ContractItemSmall from "../components/ContractItemSmall.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import LineAreaGraph from "../components/LineAreaGraph.vue";
  import ContractItem from "../components/ContractItem.vue";
  import Donut from "../components/Donut.vue";
  import navigation from "../mixins/navigation";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";

  ///////////////////  svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  //etapas
  // import PlaneacionSvg from "../svg/etapascontratacion/planeacion-svg.vue";
  import AdjudicacionSvg from "../svg/etapascontratacion/adjudicacion-svg.vue";
  import ContratacionSvg from "../svg/etapascontratacion/contratacion-svg.vue";
  import ImplementacionSvg from "../svg/etapascontratacion/implementacion-svg.vue";
  import LicitacionSvg from "../svg/etapascontratacion/licitacion-svg.vue";
  //icons
  // import TimeSvg from "../svg/icons/time_svg.vue";
  //import ContratistaSvg from "../svg/icons/contratista_svg.vue";
  // import ProgramasSvg from "../svg/icons/programas_svg.vue";
  import DiversidadSvg from "../svg/icons/diversidad_svg.vue";
  import IncrementoSvg from "../svg/icons/incremento_svg.vue";
  import ConvenioSvg from "../svg/icons/convenio_svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  //tipo adjudicacion
  import LicitacionpublicaSvg from "../svg/tipo-adjudicacion/licitacion-svg.vue";
  import InvitacionatresSvg from "../svg/tipo-adjudicacion/invitacionatres-svg.vue";
  import AdjudicaciondirectaSvg from "../svg/tipo-adjudicacion/adjudicaciondirecta-svg.vue";

  export default{
    /*
     * 👾 M I X I N S
     * ----------------------------------------------------------------------
     */
    mixins : [navigation],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // el tab desplegado
        current : "listado",
        ccurrent : "metodos",
        page : 1,
        search     : "",
        searchType : "contracts",
        year : ""
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

      url(base){
        return this.$store.getters.makeURL(base);
      }
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      if(this.$route.params.page){
        this.page = this.$route.params.page;
      }
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      donutData(){
        if(this.ccurrent == "metodos"){
          return this.ContractsAmountByTenderMethod;
        }

        else if(this.ccurrent == "destinos"){
          return this.ContractsByMainProcurementCategory;
        }

        else{
          return this.ContractsAmountByApplyMedium;
        }

      },

      contractDiversity(){
        let providers = this.$store.getters.ProvidersList.filter(p => p.awards).length,
            contracts = this.$store.getters.Releases.length;
        return (providers / contracts) * 100;
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa la lista de contratos (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      listItems(){
        return this.$store.getters.Releases;
      },

      bubbleItems(){
        return this.$store.getters.filterContract(this.search).filter(d => d.tender);
      },

      allAwardsTotal(){
        return this.$store.getters.allAwardsTotal;
      },

      executed(){
        return this.$store.getters.contractsExecutedBudgetTotal;
      },

      budgetBehavior(){
        let max = Math.max(this.allAwardsTotal, this.executed),
            exectuedPercent = (this.executed / max) * 100,
            budgetPercent   = (this.allAwardsTotal/ max) * 100,
            executedLabel   = "$" + this.format(this.executed),
            budgetLabel     = "$" + this.format(this.allAwardsTotal);

        console.log(max, this.executed, this.allAwardsTotal);
        return [{
          label : "ejecutado / presupuestado",
          values : [exectuedPercent, budgetPercent],
          labels : [executedLabel, budgetLabel]
        }]
      },

      /*
AvanceProyectosEstrategicosFisicoData(){

        return this.$store.getters.ProjectsPhysicalAdvance.map(data => {
          return {
            label : data.name,
            values : [data.estimated, data.observed],
            labels : [data.estimated + "%", data.observed + "%"]
          }
        });
      },
      */

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa la lista de contratos en concurso(/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      openContracts(){
        return this.$root.$store.getters.OpenContractsList;
      },

      years(){
        return this.$store.getters.ContractsDateYear;
      },

      contractsByProcurementMethod(){
        return this.$store.getters.ContractsByProcurementMethod;
      },

      contractsByStatus(){
        let contracts = this.year ? this.$store.getters.ContractsByYear(this.year) : this.listItems,
            statusList = this.$store.getters.ContractStatusList,
            data      =
                          {
                            label : "Estatus",
                            values : statusList.map(status => {
                              let value = contracts
                                          .filter(c => this.$store.getters.contractState(c) == status.value ).length,
                                  percent = (value/contracts.length) * 100;
                              return {
                                value,
                                percent,
                                title : status.name
                              }
                            })
                          }
        return data;
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el total de contratos por cada
      /  tipo de licitación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      ContractsAmountByTenderMethod(){
        return this.$store.getters.ContractsAmountByTenderMethod.map(data => {
          return {
            type : data.name,
            value : data.total,
            total : data.amount
          }
        });
      },

      ContractsByMainProcurementCategory(){
        return this.$store.getters.ContractsByMainProcurementCategory.map(data => {
          return {
            type : data.name,
            value : data.total,
            total : data.total
          }
        });
      },

      ContractsAmountByApplyMedium(){
        return this.$store.getters.ContractsAmountByApplyMedium.map(data => {
          return {
            type : data.name,
            value : data.total,
            total : data.total
          }
        });
      },

      executedIncrement(){
        return this.format(this.$store.getters.executedIncrement);
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
      BubblesContracts,
      BarsHorizontalStack,
      BarsHorizontalSingle,
      BarsVerticalSingle,
      BarsHorizontalDoubleGeneric,
      ContractItemSmall,
      BuscadorAvanzado,
      LineAreaGraph,
      ContractItem,
      Donut,
      VerGlosario,
      SocialSharing,
      /// svg
      ContratacionesSvg,
      // PlaneacionSvg,
      ContratacionSvg,
      AdjudicacionSvg,
      ImplementacionSvg,
      LicitacionSvg,
      // TimeSvg,
      // ContratistaSvg,
      // ProgramasSvg,
      DiversidadSvg,
      IncrementoSvg,
      ConvenioSvg,
      LicitacionpublicaSvg,
      InvitacionatresSvg,
      AdjudicaciondirectaSvg,
      MoneySvg
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
                    title="Contrataciones Públicas"
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
      <li>Contrataciones</li>
    </ul>
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-4 pb-2">
            <h1 class="ia_title_hm mb-4 pb-2">Contrataciones Públicas</h1>
            <p>Cada obra, remodelación y/o ampliación requiere generar un contrato. Aquí encontrarás las contrataciones realizados por la Secretaría de Infraestructura para generar los proyectos disponibles en la plataforma.</p>
          </div>
          <div class="col-6 col-sm-6 col-md-6 col-lg-3  text-center">

            <div class="ia_svg white w_30">
            <money-svg />
            </div>
            <h2 class="mb-1">${{format(allAwardsTotal)}}</h2>
            <p>Monto total programado (MXN)</p>
          </div>
          <div class="col-6 col-sm-6 col-md-6 col-lg-3  text-center">
            <div class="ia_svg white w_30">
            <contrataciones-svg />
            </div>
            <h2 class="mb-1">{{format(listItems.length)}}</h2>
            <p>Contrataciones</p>
          </div>
        </div>
      </div>
    </section>
    <section class="ia_hero nav">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <a href="#" :class="['ia_btn_hero_nav', current == 'listado' ? 'current' : '']"
                        v-on:click.prevent="current= 'listado'">
              Listado de Contrataciones
            </a>
            <a href="#" :class="['ia_btn_hero_nav', current == 'numeralia' ? 'current' : '']"
                        v-on:click.prevent="current= 'numeralia'">
              Numeralia
            </a>
          </div>
        </div>
      </div>
    </section>


<section>
  <div class="container" v-if="current == 'listado'">
    <h1 class="ia_title">Listado de contrataciones</h1>
    <!-- ❇️ las burbujas de contrataciones -->
    <div class="ia_bubbles">
    <bubbles-contracts
           :items="bubbleItems"
           :baseurl="'contratacion'"
           :idurl="'ocid'" />
    </div>

    <form class="form">
      <div class="ia_form_hm ia_form_global">
      <input type="text" placeholder="Buscar palabra clave" class="ia_search"  v-model="search">
      <button type="submit" v-on:click.prevent><i class="ia_search_i"></i></button>
      <div class="clearfix"></div>
    </div>
    </form>

    <!-- ❇️ la lista de contrataciones -->
    <contract-item v-for="(contract, key) in pageItems" :key="key" :data="contract" />

    <!-- ❇️ la paginación -->
    <ul class="ia_pagination">
      <li v-for="p in pages" v-bind:key="p + '-page-bottom'" :class="p == page ? 'current' : ''">
        <a :href="'contrataciones/' + p" v-on:click.prevent="goto(p)">{{p}}</a>
      </li>
    </ul>

    <!--
    ////////////////////////////////////////////////////////////////////////////////
    ⭐ Descargar masiva
    ////////////////////////////////////////////////////////////////////////////////
    -->
    <div class="row">
      <div class="col">
        <div class="mt-4 pt-4">
          <div class="ia_download_items mt-4">
            <div class="row">
              <div class="col-sm-10">
                <p class="text-right">Descargar todos los procesos de contratación</p>
              </div>

              <div class="col col-sm-2  pl-0">
                <!--<a href="/downloads/contrataciones.zip">JSON</a>-->
                 <a href="http://si.nl.gob.mx/acceso/datosabiertos/JSON_SIASI.rar">JSON</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>

  <div class="container" v-if="current=='numeralia'">
    <div class="row mb-4 pb-4">
      <div class="col-4 text-center">
        <div class="ia_svg h_35 w_30 min">
          <diversidad-svg />
        </div>
        <h2 class="ia_amount_section">{{format(contractDiversity)}}%</h2>
        <p class="ia_amount_des">Diversidad de Empresas Ganadoras <span>(por cada 100)</span></p>
      </div>
      <div class="col-4 text-center">
        <div class="ia_svg h_35 w_30 min">
          <convenio-svg />
        </div>
        <h2 class="ia_amount_section">{{format(0)}}%</h2>
        <p class="ia_amount_des">Procedimiento con Convenio <span>(Promedio)</span></p>
      </div>
      <div class="col-4 text-center">
        <div class="ia_svg h_35 w_30 min">
          <incremento-svg />
        </div>
        <h2 class="ia_amount_section">{{format(executedIncrement)}}%</h2>
        <p class="ia_amount_des">Incremento ejecutado<!--Presupuestado--> <span>(Promedio)</span></p>
      </div>
    </div>

    <!-- ❇️ la gráfica de stack -->
    <div class="row mb-4 pb-4">
      <div class="col-12">
        <h2 class="mb-4 pb-2">Estatus general de las contrataciones</h2>
          <div class="ai_box_item pa">
            <form class="form mt-4">
              <div class="ia_form_hm ia_form_global">
              <div class="row">
                <div class="col-3">
                  <select class="ia_select_hm" v-model="year">
                    <option value="">Año</option>
                    <option v-for="(y, i) in years" :key="i+ '-years'" :value="y">{{y}}</option>
                  </select>
                </div>
              </div>
              </div>
            </form>
            <div class="row">
              <div class="col">
            <!-- ❇️ la gráfica de barra stack -->
            <bars-horizontal-stack :data="contractsByStatus" />
            <ul class="ia_bars_color_guide mt-2">
              <li v-for="(item, i) in contractsByStatus.values" :key="i+ 'xcr'">
                <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
                {{translate(item.title)}} : {{item.value}}
              </li>
            </ul>
            </div>
          </div>
          </div>
      </div>
    </div>


    <!-- ❇️ la gráfica de barras verticales -->
    <div class="row mb-4 pb-4">
      <div class="col-12">
        <h2>Número de proposiciones</h2>
        <h3 class="mb-4 pb-2">(Promedio)</h3>
          <div class="ai_box_item pa">
<!--
            <div class="row">
              <div class="col-4">
                <p class="ia_icon_text"><span><licitacionpublica-svg /></span> Licitación Pública</p>
              </div>
              <div class="col-4">
                <p class="ia_icon_text"><span><invitacionatres-svg /></span> Invitación a Tres</p>
              </div>
              <div class="col-4">
                <p class="ia_icon_text"><span><adjudicaciondirecta-svg /></span> Adjudicación Directa</p>
              </div>
            </div>-->
          <bars-horizontal-single :data="contractsByProcurementMethod" />
          </div>
      </div>
    </div>


    <div class="row mb-4 pb-4">
      <div class="col-12">
        <h2>Métodos, medios y destinos</h2>
      </div>
    </div>

    <div class="row mb-4 pb-4">
      <div class="col-12">
        <div class="ai_box_item py-3">
          <div class="row mb-4">
            <div class="col-12">
              <a href="#" :class="['ia_btn_hero_nav items_3', ccurrent == 'metodos' ? 'current' : '']"
                          v-on:click.prevent="ccurrent= 'metodos'">
                Métodos
              </a>
              <a href="#" :class="['ia_btn_hero_nav items_3', ccurrent == 'medios' ? 'current' : '']"
                          v-on:click.prevent="ccurrent= 'medios'">
                Medios
              </a>
              <a href="#" :class="['ia_btn_hero_nav items_3', ccurrent == 'destinos' ? 'current' : '']"
                          v-on:click.prevent="ccurrent= 'destinos'">
                Destinos
              </a>
            </div>
          </div>


          <div v-if="ccurrent=='metodos'" class="row mt-4">
            <div class="col">
              <ul class="ia_bars_color_guide">
                <li v-for="(d, i) in ContractsAmountByTenderMethod" :key="i + 'tender-label'">
                  <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
                  {{d.type}}: ${{format(d.total)}} ({{d.value}})
                </li>
              </ul>
            <!-- ❇️ la gráfica de donita (método)
            <donut :data="donutData" id="donut-xx" />-->

            </div>
          </div>

          <div v-if="ccurrent=='medios'" class="row mt-4">
            <div class="col">
              <ul class="ia_bars_color_guide">
                <li v-for="(d, i) in ContractsAmountByApplyMedium" :key="i + 'medium-label'">
                    <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
                    {{d.type}}: {{format(d.total)}}
                  </li>
                </ul>
            <!-- ❇️ la gráfica de donita (medios)
            <donut :data="donutData" id="" />-->

            </div>
          </div>

          <div v-if="ccurrent=='destinos'" class="row mt-4">
            <div class="col">
            <ul class="ia_bars_color_guide">
              <li v-for="(d, i) in ContractsByMainProcurementCategory" :key="i + 'procurement-label'">
                <span><b class="ia_color_guide_circle" :style="{background : colors[i]}"></b></span>
                {{d.type}}: {{format(d.total)}}
              </li>
            </ul>
            <!-- ❇️ la gráfica de donita (destino)
            <donut :data="donutData" id="donut-x" />-->
          </div>
          </div>
          <donut :data="donutData" id="donut-xx" />


        </div>
      </div>
    </div>








<!-- ❇️ //////// esto puede quedar en la lista de contratos con los filtros
    <h2>Concursos vigentes</h2>

    los contratos en concurso
    <ul>
      <li v-for="(contract, key) in openContracts" :key="key">
        <contract-item-small />
      </li>
    </ul>
-->


    <!-- ❇️ la gráfica de línea -->
    <div class="row mb-4 pb-4">
      <div class="col-12 mb-4">
    <h2>Comportamiento presupuestario de las contrataciones</h2>
      </div>
      <div class="col-12">
        <div class="ai_box_item py-3">
    <!--<line-area-graph /> -->
        <bars-horizontal-double-generic :data="budgetBehavior" />
      </div>
      </div>
    </div>

  </div>
</section>

<!-- glosrio-->
<ver-glosario />


  </div>
</template>
