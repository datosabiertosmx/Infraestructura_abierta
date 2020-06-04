<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BarsHorizontalSingle from "../components/BarsHorizontalSingle.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import PhotoSlider from "../components/PhotoSlider.vue";
  import MapaPunto from "../components/MapaPunto.vue";
  import Timeline from "../components/Timeline.vue";
  import Bubbles from "../components/Bubbles.vue";
  import ProjectItem from "../components/ProjectItem.vue";
  import ContractItem from "../components/ContractItem.vue";
  import ProviderItem from "../components/ProviderItem.vue";
  import BubblesContracts from "../components/BubblesContracts.vue";
  import SocialSharing from "vue-social-sharing";

  import VerGlosario from "../components/VerGlosario.vue";

  ///////////////////  svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import FaseconstruccionSvg from "../svg/fases-proyecto/faseconstruccion-svg.vue";
  import FasedesignSvg from "../svg/fases-proyecto/design-svg.vue";
  import FaseterminacionSvg from "../svg/fases-proyecto/terminacion-svg.vue";
  import ProgramasSvg from "../svg/icons/programas_svg.vue";
  import IdentificacionSvg from "../svg/estatus-proyecto/identificacion-svg.vue";
  import PreparacionSvg from "../svg/estatus-proyecto/preparation-svg.vue";
  import ImplementacionSvg from "../svg/estatus-proyecto/implementacion-svg.vue";
  import TerminacionSvg from "../svg/estatus-proyecto/terminacion-svg.vue";
  import TerminadoSvg from "../svg/estatus-proyecto/completado-svg.vue";
  import CanceladoSvg from "../svg/estatus-proyecto/cancelado-svg.vue";
  import TimeSvg from "../svg/icons/time_svg.vue";

  /// SECTOR
	import AguaSvg from "../svg/sectores/agua-svg.vue";
	import AlumbradoSvg from "../svg/sectores/alumbradopublico-svg.vue";
	import ComunicacionesSvg from "../svg/sectores/comunicaciones-svg.vue";
	import CulturaSvg from "../svg/sectores/cultura-svg.vue";
	import DesarrolloagropecuarioSvg from "../svg/sectores/desarrolloagropecuario-svg.vue";
	import DesarrollosocialSvg from "../svg/sectores/desarrollosocial-svg.vue";
	import DrenajepluvialSvg from "../svg/sectores/drenajepluvial-svg.vue";
	import DrenajesanitarioSvg from "../svg/sectores/drenajesanitario-svg.vue";
	import EducacionSvg from "../svg/sectores/educacion-svg.vue";
	import EnergiaSvg from "../svg/sectores/energia-svg.vue";
	import HabitacionalSvg from "../svg/sectores/habitacional-svg.vue";
	import PavimentacionSvg from "../svg/sectores/pavimentacion-svg.vue";
	import PuentesycaminosSvg from "../svg/sectores/puentesycaminos-svg.vue";
	import ResiduosSvg from "../svg/sectores/residuos-svg.vue";
	import SaludSvg from "../svg/sectores/salud-svg.vue";
	import SeguridadpublicaSvg from "../svg/sectores/seguridadpublica-svg.vue";
	import TransporteSvg from "../svg/sectores/transporte-svg.vue";
	import TurismoSvg from "../svg/sectores/turismo-svg.vue";
	import VialidadesSvg from "../svg/sectores/vialidades-svg.vue";
  // TIPO
	import AmpliacionSvg from "../svg/tipo-proyectos/ampliacion-svg.vue";
	import ConstruccionSvg from "../svg/tipo-proyectos/construccion-svg.vue";
	import RehabilitacionSvg from "../svg/tipo-proyectos/rehabilitacion-svg.vue";
	import SustitucionSvg from "../svg/tipo-proyectos/sustitucion-svg.vue";

  export default {

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // el tab desplegado
        current : "info",
        bcurrent : "design",
        currentC: "contrataciones",
        showinvestmentProgramsAndProjectsPortfolio: 0,
        showinfrastructureProgramme: 0,
        search : ""
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

      searchDocumentType(type){
        return this.project.documents.find(d => d.documentType == type);
      }
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa los proyectos relacionados (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      relatedProjects(){
        if(this.project.relatedProjects){
          let ids   = this.project.relatedProjects.map(rel => rel.identifier),
              items = ids.map(id => this.$root.$store.getters.Project( id ) );

          return items;
        }
        else{
          return [];
        }
        //this.$root.$store.getters.RelatedProgramsList( this.$route.params.id );
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el proyecto según el id
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      project(){
        return this.$root.$store.getters.Project(this.$route.params.id);
      },

      contractsLength(){
        return this.$store.getters.Releases.length;
      },

      contracts(){
        let contracts =  this.$store.getters.ProjectContractReleases(this.project.id),
            filtered  = this.$store.getters.filterContract(this.search, contracts);

        return filtered;
      },


      providers(){
        return this.$store.getters.ProjectProviders(this.project.id);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa los puntos geográficos del proyecto
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      locations(){
        return this.project.locations;
      },

      amounts(){
        return this.$store.getters.ProjectAmounts(this.project.id);
      },

      bubbleItems(){
        return this.contracts.filter(d => d.tender);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa los datos de avance para la gráfica
      /  de barras horizontal
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      advance(){
        let am       = this.amounts,
            max      = Math.max(am.amount, am.modified, am.executed),
            amount   = (am.amount / max) * 100,
            modified = (am.modified / max) * 100,
            executed = (am.executed / max) * 100;

        return [
          {label : "Original", value : am.amount, percent : amount},
          {label : "Modificado", value : am.modified, percent : modified},
          {label : "Ejercido", value : am.executed, percent : executed},
        ]
      },

      timelineItems(){

        let contracts  = this.contracts,
            tenders    = contracts.map(con => this.$store.getters.TimeLineTender(con) ).flat(),
            awards     = contracts.map(con => this.$store.getters.TimeLineAwards(con) ).flat(),
            _contracts = contracts.map(con => this.$store.getters.TimeLineContracts(con) ).flat(),
            amendments = contracts.map(con => this.$store.getters.TimeLineAmendments(con) ).flat();


        return [tenders, awards, _contracts, amendments].flat().sort((a, b) => a.date.getTime() - b.date.getTime());
        // .getTime()
        /*
        return [
          {
            type : "tender",
            date : "2019-05-10T00:00:00-05:00",
            tenderers : 13,
            title : "Mejoras..."
          },
          {
            type : "award",
            date : "2019-07-19T00:00:00-05:00",
            provider : "SERVICIOS PRIMARIOS GUERRA",
            title : "MEJORAS A LA RED...",
            value : 5000
          },

          {
            type : "contract",
            date : "2019-08-07T00:00:00-05:00",
            provider : "SERVICIOS PRIMARIOS GUERRA",
            title : "MEJORAS A LA RED..."
          }
          //
        ];
        */
      },

      photos(){
        return this.$store.getters.ProjectPhotos(this.project);
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
      BubblesContracts,
      BarsHorizontalSingle,
      BuscadorAvanzado,
      PhotoSlider,
      MapaPunto,
      Timeline,
      Bubbles,
      ProjectItem,
      ContractItem,
      ProviderItem,
      SocialSharing,
      VerGlosario,
      ///// svg
      ContratacionesSvg,
      PeriodoSvg,
      FaseconstruccionSvg,
      FasedesignSvg,
      FaseterminacionSvg,
      ProgramasSvg,
      MoneySvg,
      IdentificacionSvg,
      PreparacionSvg,
      ImplementacionSvg,
      TerminacionSvg,
      TerminadoSvg,
      CanceladoSvg,
      TimeSvg,
      // SECTOR
      AguaSvg,
      AlumbradoSvg,
      ComunicacionesSvg,
      CulturaSvg,
      DesarrolloagropecuarioSvg,
      DesarrollosocialSvg,
      DrenajepluvialSvg,
      DrenajesanitarioSvg,
      EducacionSvg,
      EnergiaSvg,
      HabitacionalSvg,
      PavimentacionSvg,
      PuentesycaminosSvg,
      ResiduosSvg,
      SaludSvg,
      SeguridadpublicaSvg,
      TransporteSvg,
      TurismoSvg,
      VialidadesSvg,
      // TIPO
      AmpliacionSvg,
      ConstruccionSvg,
      RehabilitacionSvg,
      SustitucionSvg,
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
      <li><router-link :to="`/proyectos`">  Proyectos</router-link></li>
      <li v-if="project">{{project.title}}</li>
      <li v-else>No se encontró proyecto</li>
    </ul>

    <!-- no se encontró el proyecto -->
    <p v-if="!project">  😱 😱 😱 😱 😱  </p>

    <div v-if="project">
      <div class="ai_social_sharing">
      <social-sharing :url="location"
                      :title="project.title"
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
          <p>IDENTIFICADOR: <strong>{{project.id}}</strong></p>
        </div>
        <div class="ia_pjid date">
          <p><span class="ai_box_time"><time-svg /> Fecha de actualización: {{getDate(project.updated)}} </span></p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 mb-2">
              <h1 class="ia_title_hm profile mb-3 pb-3">{{project.title}}</h1>
              <p><strong>Descripción:</strong> {{project.description}}</p>
            </div>
            <div class="col-sm-4 col-md-4  col-lg-2">
              <div class="ia_svg white w_30">
              <money-svg />
              </div>
              <h2 class="ia_amount_section white mb-1">${{format(amounts.executed)}}</h2>
              <p>Monto Ejercido (MXN)</p>
            </div>
            <div class="col-6 col-sm-4 col-md-4 col-lg-2 text-center">
              <div class="ia_svg white w_30">
              <programas-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{format(amounts.advance.toFixed( 2 ))}}%</h3>
              <p>Porcentaje de Avance Global</p>
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
              <a href="#" :class="['ia_btn_hero_nav items_3', current == 'info' ? 'current' : '']"
                          v-on:click.prevent="current= 'info'">
                 Información General
              </a>
              <a href="#" :class="['ia_btn_hero_nav items_3', current == 'fases' ? 'current' : '']"
                          v-on:click.prevent="current= 'fases'">
                Fases del Proyecto
              </a>
              <a href="#" :class="['ia_btn_hero_nav items_3', current == 'avance' ? 'current' : '']"
                          v-on:click.prevent="current= 'avance'">
                Avance
              </a>
            </div>
          </div>
        </div>
      </section>



      <section>
        <div class="container" v-if="current=='info'">
          <div class="row mb-4 pb-4">
            <!--sector-->
            <div class="col text-center">
              <p class="ia_amount_label">Sector</p>
              <div class="ia_svg h_35 w_30 min" v-if="project.sector.length > 1">
                <span v-if="project.sector[0] == 'water'"><agua-svg /></span>
                <span v-if="project.sector[0] == 'lighting'"><alumbrado-svg /></span>
                <span v-if="project.sector[0] == 'communications'"><comunicaciones-svg /></span>
                <span v-if="project.sector[0] == 'culture'"><cultura-svg /></span>
                <span v-if="project.sector[0] == 'agricultural development'"><desarrolloagropecuario-svg /></span>
                <span v-if="project.sector[0] == 'social development'"><desarrollosocial-svg /></span>
                <span v-if="project.sector[0] == 'storm drain'"><drenajepluvial-svg /></span>
                <span v-if="project.sector[0] == 'sanitary drainage'"><drenajesanitario-svg /></span>
                <span v-if="project.sector[0] == 'education'"><educacion-svg /></span>
                <span v-if="project.sector[0] == 'energy'"><energia-svg /></span>
                <span v-if="project.sector[0] == 'housing'"><habitacional-svg /></span>
                <span v-if="project.sector[0] == 'paving'"><pavimentacion-svg /></span>
                <span v-if="project.sector[0] == 'bridges and roads'"><puentesycaminos-svg /></span>
                <span v-if="project.sector[0] == 'waste'"><residuos-svg /></span>
                <span v-if="project.sector[0] == 'health'"><salud-svg /></span>
                <span v-if="project.sector[0] == 'public security'"><seguridadpublica-svg /></span>
                <span v-if="project.sector[0] == 'transport'"><transporte-svg /></span>
                <span v-if="project.sector[0].search('transport') != -1"><transporte-svg /></span>
                <span v-if="project.sector[0] == 'tourism'"><turismo-svg /></span>
                <span v-if="project.sector[0] == 'roads'"><vialidades-svg /></span>
              </div>
              <p class="ia_amount_des">{{translate(project.sector)}}</p>
            </div>
            <!--tipo-->
            <div class="col text-center">
              <p class="ia_amount_label">Tipo</p>
              <div class="ia_svg h_35 w_30 min">
                <span v-if="project.type == 'substitution'"><sustitucion-svg /></span>
                <span v-if="project.type == 'rehabilitation'"><rehabilitacion-svg /></span>
                <span v-if="project.type == 'extension'"><ampliacion-svg /></span>
                <span v-if="project.type == 'construction'"><construccion-svg /></span>
              </div>
              <p class="ia_amount_des">{{translate(project.type)}}</p>
            </div>
            <!--período-->
            <div class="col text-center">
              <p class="ia_amount_label">Período</p>
              <div class="ia_svg h_35 w_30 min">
                <periodo-svg />
              </div>
              <p class="ia_amount_des">{{getDate(project.period.startDate)}} - {{getDate(project.period.endDate)}}<br>
              Duración en días: <strong>{{project.period.durationInDays}}</strong></p>
            </div>
            <!--fase-->
            <div class="col text-center">
              <p class="ia_amount_label">Estatus</p>
              <div class="ia_svg h_35 w_30 min">
                <span v-if="project.status == 'identification'"><identificacion-svg /></span>
                <span v-if="project.status == 'preparation'"><preparacion-svg /></span>
                <span v-if="project.status == 'implementation'"><implementacion-svg /></span>
                <span v-if="project.status == 'completion'"><terminacion-svg /></span>
                <span v-if="project.status == 'completed'"><terminado-svg /></span>
                <span v-if="project.status == 'cancelled'"><cancelado-svg /></span>
              </div>
              <p class="ia_amount_des">{{translate(project.status)}}</p>
            </div>

          </div><!-- row ends-->

          <div v-if="project.locations">
          <div class="row mb-1 pb-1">
            <div class="col">
              <!-- ❇️ el mapa -->
              <h5>Ubicación</h5>
              <p>
                <span v-for="(location, i) in project.locations" :key="i + 'loc' ">{{location.address.locality}}, {{location.address.region}}, {{location.address.countryName}} <br></span>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <!-- ❇️ el mapa -->
              <mapa-punto :locations="locations" />
            </div>
          </div><!-- row ends-->
          </div>

          <div v-else>
            <div class="row mb-1 pb-1">
              <div class="col">
                <h5>El proyecto no cuenta con información de ubicación.</h5>
                <div class="ia_separator bottom"></div>
              </div>
            </div>
          </div>

          <div class="row mb-4 pb-4">
            <div class="col">
              <!-- ❇️ el carrusle de fotos -->
              <photo-slider :photos="photos" />
            </div>
          </div><!-- row ends-->







          <div class="row mt-4 pt-4 mb-4 pb-4">
            <div class="col">
              <!-- ❇️ las bolitas -->
              <h2>Información general de contratos y contratistas</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
            <!--  <div class="ai_box_item py-3"> -->
                <div class="row">
                  <div class="col-12">
                    <a href="#" :class="['ia_btn_hero_nav', currentC == 'contrataciones' ? 'current' : '']"
                                v-on:click.prevent="currentC= 'contrataciones'">
                       Contrataciones del Proyecto
                    </a>
                    <a href="#" :class="['ia_btn_hero_nav', currentC == 'proveedores' ? 'current' : '']"
                                v-on:click.prevent="currentC= 'proveedores'">
                      Contratistas del Proyecto
                    </a>
                  </div>
                </div>


                <div v-if="currentC=='contrataciones'">
                  <div class="row mt-4 mb-4 pb-4">
                    <div class="col">
                      <form class="form">
                        <div class="ia_form_hm ia_form_global">
                          <div class="row">
                            <div class="col-6 col-sm-4 mb-2">
                              <input type="text" placeholder="Buscar palabra clave" class="ia_search sm_i" v-model="search">
                              <button type="submit" class="sm_i"><i class="ia_search_i"></i></button>
                            </div>
                            <div class="col-6 col-sm-4">
              						      <select class="ia_select_hm">
              							             <option value="">Todos los métodos de adquisición</option>
              						      </select>
              					    </div>
                            <div class="col-6 col-sm-4">
              						         <select class="ia_select_hm">
              							                <option value="">Todas las etapas</option>
              						         </select>
              					    </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <!-- ❇️ las burbujas de contrataciones -->
    <div class="ia_bubbles">
    <bubbles-contracts
           :items="bubbleItems"
           :baseurl="'contratacion'"
           :idurl="'ocid'" />
    </div>


                  <div class="row mb-4 pb-4">
                    <div class="col">

                      <contract-item
                    v-for="(contract, i) in contracts"
                    :data="contract"
                    :key="i+ '-contract'"
                     />
                     <!--
                     🚨 AQUÍ VA LA INFO DE CONTRATOS en cada bolita  -->
                    </div>
                  </div><!-- row ends-->
                </div><!-- contrataciones ends-->

                <div v-if="currentC=='proveedores'">
                  <div class="row mt-4">
                    <div class="col">

                      <form class="form">
                        <div class="ia_form_hm ia_form_global">
                          <div class="row">
                            <div class="col mb-2">
                              <input type="text" placeholder="Buscar palabra clave" class="ia_search sm_i" v-model="search">
                              <button type="submit" class="sm_i"><i class="ia_search_i"></i></button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div class="row mb-4 pb-4">
                    <div class="col">
                  <provider-item
                v-for="(provider, i) in providers"
                :provider="provider"
                :key="i+ '-provider'"
                 />
                    <!--
                    🚨 AQUÍ VA LA INFO DE CONTRATOS en cada bolita  -->
                      <bubbles />
                    </div>
                  </div><!-- row ends-->
                </div><!-- proveedores ends-->

            <!--  </div> ai_box_item ends-->
            </div>
          </div>
        </div>




        <div class="container" v-if="current=='avance'">
          <div class="row mb-4 pb-4">
            <div class="col">
              <!-- ❇️ la línea de tiempo -->
              <h1 class="ia_title">Línea de tiempo</h1>
              <div class="row">
                <!--fase-->
                <div class="col text-center">
                  <p class="ia_amount_label">Estatus del proyecto</p>
                  <div class="ia_svg h_35 w_30 min">
                    <span v-if="project.status == 'identification'"><identificacion-svg /></span>
                    <span v-if="project.status == 'preparation'"><preparacion-svg /></span>
                    <span v-if="project.status == 'implementation'"><implementacion-svg /></span>
                    <span v-if="project.status == 'completion'"><terminacion-svg /></span>
                    <span v-if="project.status == 'completed'"><terminado-svg /></span>
                    <span v-if="project.status == 'cancelled'"><cancelado-svg /></span>
                  </div>
                  <p class="ia_amount_des">{{translate(project.status)}} {{ project.status ==  'completed' ? '(' + getDate(project.period.endDate) + ')' : ''}} </p>

                  <div class="ia_separator bottom"></div>

                </div>
              </div>
              <p class="ai_box_top text-right"><span class="ai_box_time"><time-svg /> Fecha de actualización: {{getDate(project.updated)}} </span></p>

              <timeline :data="timelineItems" :project="project" />
            </div>
          </div>
          <!-- ❇️ las gráfica de barras -->
          <div class="row mt-4 pt-4">
            <div class="col">
              <h1 class="ia_title mb-4">Avance Financiero (MXN)</h1>
              <p class="ai_box_top text-right"><span class="ai_box_time"><time-svg /> Fecha de actualización: {{getDate(project.updated)}} </span></p>
            </div>
          </div>
          <div class="row mb-4 pb-4">
            <div class="col">
              <div class="ai_box_item py-3 pt-4">

                <bars-horizontal-single :data="advance" />
              </div>
            </div>
          </div>

        </div>

        <div class="container" v-if="current=='fases'">
          <div class="row mb-2 pb-2">
            <div class="col">
              <h1 class="ia_title">Fases del proyecto</h1>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="ai_box_item py-3">

                  <!-- 👯‍♀️ los tabs del proceso del proyecto -->
                  <div class="row mb-4">
                    <div class="col-12">
                      <div class="row">
                      <router-link :to="`/proyecto/${project.id}`"
                                    :class="['ia_btn_hero_nav col', bcurrent == '' || bcurrent == 'design' ? 'current' : '']"
                                    v-on:click.prevent="bcurrent= 'design'">
                              <span :class="['_svg', bcurrent == 'design' ? '' : 'path_white']"><fasedesign-svg /></span>
                              Diseño
                      </router-link>

                      <router-link :to="`/proyecto/${project.id}/construccion`"
                                    :class="['ia_btn_hero_nav col', bcurrent == 'construccion' ? 'current' : '']"
                                    v-on:click.prevent="bcurrent= 'construccion'">
                        <span :class="['_svg', bcurrent == 'construccion' ? '' : 'path_white']"><faseconstruccion-svg /></span>
                        Construcción
                      </router-link>

                      <router-link :to="`/proyecto/${project.id}/terminacion`"
                                    :class="['ia_btn_hero_nav col', bcurrent == 'terminacion' ? 'current' : '']"
                                    v-on:click.prevent="bcurrent= 'terminacion'">
                        <span :class="['_svg', bcurrent == 'terminacion' ? '' : 'path_white']"><faseterminacion-svg /></span>
                        Terminación
                      </router-link>
                      </div>
                    </div>
                  </div>
                  <!---nav-->
                  <div class="row pt-4 pl-4 pr-4">
                    <router-view :project="project"></router-view>
                  </div>
              </div>
            </div>
          </div>

        </div>

      </section> <!-- section ends-->

      <!-- glosrio-->
      <ver-glosario />



      <section class="ia_gray _bottom">
        <div class="container">
          <div class="row mb-4">
            <div class="col">
              <h2>Proyectos relacionados</h2>
            </div>
          </div>
          <!-- ❇️ el proyecto relacionado -->
          <project-item :project="project" />
        </div>
      </section>

    </div>
  </div>
</template>
