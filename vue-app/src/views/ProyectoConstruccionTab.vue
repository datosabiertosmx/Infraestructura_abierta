<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import VueCsvDownloader from 'vue-csv-downloader';
  // svg
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import EstatusSvg from "../svg/icons/avance-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import VersionSvg from "../svg/icons/version-svg.vue";

  export default {

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showInformeEjecucion: 0,
        showsocialEnvironmentalImpactAssessment: 0,
        showprogressionReport: 0
      }
    },

    mounted(){
      let button = document.querySelector(".get-json");
      this.$store.getters.enableJSONbutton(this.project, button, this.project.id, "proyecto");
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

      searchDocumentType(type){
        return this.project.documents.find(d => d.documentType == type);
      },

      print(){
        window.print();
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
		 * 👾 C O M P U T E D
		 * ----------------------------------------------------------------------
		 */
		computed : {


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

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa un objeto con el json aplanado del
      /  estándar de obra pública
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.project);
      },
		},

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      EstatusSvg,
      PeriodoSvg,
      VersionSvg,
      DocumentacionSvg
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
  <div class="col">
  <!--  <div class="row mb-4 pb-4">

      <div class="col text-center">
        <div class="ia_svg h_35 w_30 min">
          <money-svg />
        </div>
        <p class="ia_amount_section"></p>
        <p class="ia_amount_des">Monto Ejercido en la Construcción</p>
      </div>
      <div class="col text-center">
        <div class="ia_svg h_35 w_30 min">
          <periodo-svg />
        </div>
        <p class="ia_amount_section">30/11/2018</p>
        <p class="ia_amount_des">Fecha de Inicio de la Construcción</p>
      </div>
      <div class="col text-center">
        <div class="ia_svg h_35 w_30 min">
          <estatus-svg />
        </div>
        <p class="ia_amount_section">Vigente</p>
        <p class="ia_amount_des">Estatus</p>
      </div>
    </div>-->

    <div class="row mb-4 pb-4">
      <div class="col-12">
        <h2>Documentación</h2>
        <div class="ia_separator bottom"></div>
      </div>
    </div>

    <!--Reportes de progreso-->
    <div v-if="searchDocumentType('progressionReport')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <h4 class="mt-4">
          <a v-on:click.prevent="showprogressionReport = !showprogressionReport"
                href="#"
                :class=" showInformeEjecucion ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
            Reportes de progreso</a>
        </h4>
      </div>
    </div>
    <div class="row" v-if="showprogressionReport">
      <div class="col-12 mb-4 pb-4">
        <ul class="ia_docs _list">
        <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
          <div v-if="docuemntbudget.documentType == 'progressionReport'">
            <li>
              <span class="row">
                <span class="col-sm-12 col-md-6 mb-4">
                  <h4><span class="_svg"><documentacion-svg /></span> {{docuemntbudget.title}}</h4>
                  {{docuemntbudget.description}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{docuemntbudget.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span> {{getDate(docuemntbudget.datePublished)}}<br>
                  <span v-if="docuemntbudget.dateModified">
                  Modificado: {{getDate(docuemntbudget.dateModified)}}
                  </span>
                </span>
                <span class="col-sm-4 col-md-2 mb-2">
                  <span v-if="docuemntbudget.url">
                  <a :href="`${docuemntbudget.url}`" class="ia_btn">Descargar</a>
                  </span>
                  <span v-else>
                    Próximamente
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
        </ul>
      </div>
    </div>
  </div>

    <!--Informe ejecutivo de la ejecución de los contratos-->
    <div v-if="searchDocumentType('executiveContractReport')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
        <h4 class="mt-4">
          <a v-on:click.prevent="showInformeEjecucion = !showInformeEjecucion"
                href="#"
                :class=" showInformeEjecucion ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
            Informe ejecutivo de la ejecución de los contratos</a>
        </h4>
      </div>
    </div>
    <div class="row" v-if="showInformeEjecucion">
      <div class="col-12 mb-4 pb-4">
        <ul class="ia_docs _list">
        <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
          <div v-if="docuemntbudget.documentType == 'executiveContractReport'">
            <li>
              <span class="row">
                <span class="col-sm-12 col-md-6 mb-4">
                  <h4><span class="_svg"><documentacion-svg /></span> {{docuemntbudget.title}}</h4>
                  {{docuemntbudget.description}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{docuemntbudget.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span> {{getDate(docuemntbudget.datePublished)}}<br>
                  <span v-if="docuemntbudget.dateModified">
                  Modificado: {{getDate(docuemntbudget.dateModified)}}
                  </span>
                </span>
                <span class="col-sm-4 col-md-2 mb-2">
                  <span v-if="docuemntbudget.url">
                  <a :href="`${docuemntbudget.url}`" class="ia_btn">Descargar</a>
                  </span>
                  <span v-else>
                    Próximamente
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
        </ul>
      </div>
    </div>
    </div>

    <!--Evaluaciones de impacto social y ambiental-->
    <div v-if="searchDocumentType('socialEnvironmentalImpactAssessment')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
        <h4 class="mt-4">
          <a v-on:click.prevent="showsocialEnvironmentalImpactAssessment = !showsocialEnvironmentalImpactAssessment"
                href="#"
                :class=" showsocialEnvironmentalImpactAssessment ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
            Evaluaciones de impacto social y ambiental</a>
        </h4>
      </div>
    </div>
    <div class="row" v-if="showsocialEnvironmentalImpactAssessment">
      <div class="col-12 mb-4 pb-4">
        <ul class="ia_docs _list">
        <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
          <div v-if="docuemntbudget.documentType == 'socialEnvironmentalImpactAssessment'">
            <li>
              <span class="row">
                <span class="col-sm-12 col-md-6 mb-4">
                  <h4><span class="_svg"><documentacion-svg /></span> {{docuemntbudget.title}}</h4>
                  {{docuemntbudget.description}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{docuemntbudget.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span> {{getDate(docuemntbudget.datePublished)}}<br>
                  <span v-if="docuemntbudget.dateModified">
                  Modificado: {{getDate(docuemntbudget.dateModified)}}
                  </span>
                </span>
                <span class="col-sm-4 col-md-2 mb-2">
                  <span v-if="docuemntbudget.url">
                  <a :href="`${docuemntbudget.url}`" class="ia_btn">Descargar</a>
                  </span>
                  <span v-else>
                    Próximamente
                  </span>
                </span>
              </span>
            </li>
          </div>
        </div>
        </ul>
      </div>
    </div>
  </div>

    <div class="row mb-4 pb-4">
      <div class="col">
        <div class="ia_download_items">
        <div class="row">
          <div class="col-sm-9">
            <p class="text-right">Descargar datos del proyecto</p>
          </div>
          <div class="col-4 col-sm-1 pr-0 pl-0">
            <a href="#" v-on:click.prevent="print">IMPRIMIR</a>
          </div>
          <div class="col-4 col-sm-1 pr-0 pl-0">
            <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'proyecto-' + project.id">CSV</vue-csv-downloader>
          </div>
          <div class="col-4 col-sm-1 pr-0 pl-0">
            <a href="#"  class="get-json">JSON</a>
          </div>
        </div>
      </div>
      </div>
    </div>

  </div>
</template>
