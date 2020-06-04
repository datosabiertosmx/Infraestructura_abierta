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
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";

  export default {
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showcompletionCertificate: 0,
        showevaluationReport: 0,
        showfinalAudit: 0
      }
    },

    methods : {
      searchDocumentType(type){
        return this.project.documents.find(d => d.documentType == type);
      },
      print(){
        window.print();
      },
      getDate(date){
    		let d = this.$store.getters.getDateObject(date);
    		return d;
    	},
      format(num){
        return this.$store.getters.formatNumber(num);
      },
    },

    mounted(){
      let button = document.querySelector(".get-json");
      this.$store.getters.enableJSONbutton(this.project, button, this.project.id, "proyecto");
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
    <div class="row mb-4 pb-4">

      <div class="col text-center" v-if="project.completion">
        <div class="ia_svg h_35 w_30 min">
          <money-svg />
        </div>
        <p class="ia_amount_section">${{format(project.completion.finalValue.amount)}}</p>
        <p class="ia_amount_des">Monto Final</p>
      </div>
      <div class="col text-center" v-if="project.completion">
        <div class="ia_svg h_35 w_30 min">
          <periodo-svg />
        </div>
        <p class="ia_amount_section">{{getDate(project.completion.endDate)}}</p>
        <p class="ia_amount_des">Fecha de terminación</p>
      </div>
    </div>

    <!-- endDateDetails -->
    <div class="row mb-4 pb-4" v-if="project.completion.endDateDetails">
      <div class="col-12">
        <h2>Detalles de fecha de finalización</h2>
        <p>{{project.completion.endDateDetails}}</p>
      </div>
    </div>

    <!-- finalValueDetails -->
    <div class="row mb-4 pb-4" v-if="project.completion.finalValueDetails">
      <div class="col-12">
        <h2>Detalles del costo final</h2>
        <p>{{project.completion.finalValueDetails}}</p>
      </div>
    </div>


    <!-- finalScope -->
    <div class="row mb-4 pb-4" v-if="project.completion.finalScope">
      <div class="col-12">
        <h2>Alcance final</h2>
        <p>{{project.completion.finalScope}}</p>
      </div>
    </div>


    <!-- finalScopeDetails -->
    <div class="row mb-4 pb-4" v-if="project.completion.finalScopeDetails">
      <div class="col-12">
        <h2>Detalles del alcance final</h2>
        <p>{{project.completion.finalScopeDetails}}</p>
      </div>
    </div>





  <div class="row mb-4 pb-4">
    <div class="col-12">
      <h2>Documentación</h2>
      <div class="ia_separator bottom"></div>
    </div>
  </div>

  <!--Certificado de terminación (informe de conclusión)-->
  <div v-if="searchDocumentType('completionCertificate')">
  <div class="row">
    <div class="col-12 mb-4 pb-4">
      <h4 class="mt-4">
        <a v-on:click.prevent="showcompletionCertificate = !showcompletionCertificate"
              href="#"
              :class=" showcompletionCertificate ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Certificado de terminación (informe de conclusión)</a>
      </h4>
    </div>
  </div>
  <div class="row" v-if="showcompletionCertificate">
    <div class="col-12 mb-4 pb-4">
      <ul class="ia_docs _list">
      <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
        <div v-if="docuemntbudget.documentType == 'completionCertificate'">
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

  <!--Reporte de evaluación-->
  <div v-if="searchDocumentType('evaluationReport')">
  <div class="row">
    <div class="col-12 mb-4 pb-4">
      <div class="ia_separator bottom"></div>
      <h4 class="mt-4">
        <a v-on:click.prevent="showevaluationReport = !showevaluationReport"
              href="#"
              :class=" showevaluationReport ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Reporte de evaluación</a>
      </h4>
    </div>
  </div>
  <div class="row" v-if="showevaluationReport">
    <div class="col-12 mb-4 pb-4">

      <ul class="ia_docs _list">
      <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
        <div v-if="docuemntbudget.documentType == 'evaluationReport'">
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

  <!--Reportes de auditorías internas-->
  <div v-if="searchDocumentType('finalAudit')">
  <div class="row">
    <div class="col-12 mb-4 pb-4">
      <div class="ia_separator bottom"></div>
      <h4 class="mt-4">
        <a v-on:click.prevent="showfinalAudit = !showfinalAudit"
              href="#"
              :class=" showfinalAudit ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Reportes de auditorías internas</a>
      </h4>
    </div>
  </div>
  <div class="row" v-if="showfinalAudit">
    <div class="col-12 mb-4 pb-4">
      <ul class="ia_docs _list">
      <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
        <div v-if="docuemntbudget.documentType == 'finalAudit'">
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

  <!---Descargar datos de fase de terminación-->
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
