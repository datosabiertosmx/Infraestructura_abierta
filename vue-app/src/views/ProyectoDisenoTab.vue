<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import VueCsvDownloader from 'vue-csv-downloader';
  ///////////////////  svg
  import ClavepresupuestariaSvg from "../svg/icons/clavepresupuestaria-svg.vue";
  import FuenteSvg from "../svg/icons/fuente-svg.vue";
  import EstatusSvg from "../svg/icons/estatus-svg.vue";
  import MontoSvg from "../svg/icons/monto-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import VersionSvg from "../svg/icons/version-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";

  export default {
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showfeasibilityStudy: 0,
        showimpactoAmbiental: 0,
        showevaluacionSuelos: 0,
        showcompensacionReubicacion: 0,
        showplanFinanciero: 0,
        showdictamenAprobacion: 0,
        showprojectPlanUpdate: 0,
        showinfrastructureProgramme: 0,
        showinvestmentProgramsAndProjectsPortfolio: 0
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
      ClavepresupuestariaSvg,
      FuenteSvg,
      EstatusSvg,
      DocumentacionSvg,
      PeriodoSvg,
      MontoSvg,
      VersionSvg,
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
  <div class="col">
    <div class="row mb-4 pb-4">

      <div class="col text-center">
        <div class="ia_svg h_35 w_30 min">
          <money-svg />
        </div>
        <p class="ia_amount_section">${{format(project.budget.amount.amount)}} {{project.budget.amount.currency}}</p>
        <p class="ia_amount_des">Monto Presupuestado</p>
      </div>
      <div class="col text-center">
        <div class="ia_svg h_35 w_30 min">
          <periodo-svg />
        </div>
        <p class="ia_amount_section">{{getDate(project.budget.approvalDate)}}</p>
        <p class="ia_amount_des">Fecha de aprobación</p>
      </div>
    </div>

    <div class="row">
      <div class="col">
    <h2>Propósito del proyecto</h2>
    <p>{{project.purpose}}</p>
    <div class="ia_separator bottom"></div>

    <div v-if="project.budget.budgetBreakdown">
    <h2 class="mt-4 pt-4">Desglose Presupuestario</h2>
    <table class="table">
      <thead>
        <tr>
          <th><div class="_svg"><clavepresupuestaria-svg /></div> Clave presupuestaria</th>
          <th><div class="_svg"><fuente-svg /></div> Fuente</th>
          <th><div class="_svg"><monto-svg /></div> Monto</th>
        <!--  <th><div class="_svg"><estatus-svg /></div> Estatus</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(projectbudgetBreakdown, i) in project.budget.budgetBreakdown" :key="i + '-pbb'">
          <td>{{projectbudgetBreakdown.id}}</td>
          <td>{{projectbudgetBreakdown.sourceParty.name}}</td>
          <td>${{format(projectbudgetBreakdown.amount.amount)}}</td>
      <!--    <td><strong>DEVENGADO</strong></td>-->
        </tr>
      </tbody>
    </table>
  </div>
</div>
</div>


    <div v-if="project.documents">
      <div class="row">
        <div class="col">
          <h2>Documentación</h2>
          <div class="ia_separator bottom"></div>
        </div>
      </div>

<!-- showfeasibilityStudy-->
<div v-if="searchDocumentType('feasibilityStudy')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <h4 class="mt-4">
          <a v-on:click.prevent="showfeasibilityStudy = !showfeasibilityStudy"
            href="#"
            :class=" showfeasibilityStudy ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Resumen de proyecto o estudio de factibilidad</a>
        </h4>
      </div>
    </div>
</div>
<div class="row" v-if="showfeasibilityStudy">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'feasibilityStudy'">
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

<!-- Evaluación de Impacto Ambiental -->
<div v-if="searchDocumentType('environmentalImpact')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
          <h4 class="mt-4">
            <a v-on:click.prevent="showimpactoAmbiental = !showimpactoAmbiental"
            href="#"
            :class=" showimpactoAmbiental ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Evaluación de Impacto Ambiental </a>
        </h4>
      </div>
    </div>
</div>
<div class="row" v-if="showimpactoAmbiental">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'environmentalImpact'">
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

<!-- Evaluación de suelos y de asentamientos-->
<div v-if="searchDocumentType('landAndSettlementEvaluation')">
<div class="row">
  <div class="col-12 mb-4 pb-4">
    <div class="ia_separator bottom"></div>
    <h4 class="mt-4">
      <a v-on:click.prevent="showevaluacionSuelos = !showevaluacionSuelos"
            href="#"
            :class=" showevaluacionSuelos ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Evaluación de suelos y de asentamientos </a>
    </h4>
  </div>
</div>
</div>
<div class="row" v-if="showevaluacionSuelos">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'landAndSettlementEvaluation'">
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

<!-- Plan de compensación y de reubicación -->
<div v-if="searchDocumentType('landAndSettlementImpact')">
<div class="row">
  <div class="col-12 mb-4 pb-4">
    <div class="ia_separator bottom"></div>
    <h4 class="mt-4">
      <a v-on:click.prevent="showcompensacionReubicacion = !showcompensacionReubicacion"
            href="#"
            :class=" showcompensacionReubicacion ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Plan de compensación y de reubicación </a>
    </h4>
  </div>
</div>
</div>
<div class="row" v-if="showcompensacionReubicacion">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'landAndSettlementImpact'">
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

<!-- Plan financiero -->
  <div v-if="searchDocumentType('projectPlan')">
    <div class="row">
      <div class="col-12 mb-4 pb-4">
        <div class="ia_separator bottom"></div>
        <h4 class="mt-4">
          <a v-on:click.prevent="showplanFinanciero = !showplanFinanciero"
            href="#"
            :class=" showplanFinanciero ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Plan financiero</a>
        </h4>
      </div>
    </div>
  </div>


  <div class="row" v-if="showplanFinanciero">
    <div class="col-12 mb-4 pb-4">
      <ul class="ia_docs _list">
        <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget-'">
          <div v-if="docuemntbudget.documentType == 'projectPlan'">
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

<!-- Actualización al Plan Financiero-->
<div v-if="searchDocumentType('projectPlanUpdate')">
<div class="row">
  <div class="col-12 mb-4 pb-4">
    <div class="ia_separator bottom"></div>
    <h4 class="mt-4">
      <a v-on:click.prevent="showprojectPlanUpdate = !showprojectPlanUpdate"
            href="#"
            :class=" showprojectPlanUpdate ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
        Actualización al Plan Financiero</a>
    </h4>
  </div>
</div>
</div>
<div class="row" v-if="showprojectPlanUpdate">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'projectPlanUpdate'">
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

<!--Dictamen de aprobación del proyecto-->
<div v-if="searchDocumentType('projectApprovalOpinion')">
<div class="row">
  <div class="col-12 mb-4 pb-4">
    <div class="ia_separator bottom"></div>
    <h4 class="mt-4">
      <a v-on:click.prevent="showdictamenAprobacion = !showdictamenAprobacion"
            href="#"
            :class=" showdictamenAprobacion ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
        Dictamen de aprobación del proyecto</a>
    </h4>
  </div>
</div>
</div>
<div class="row" v-if="showdictamenAprobacion">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'projectApprovalOpinion'">
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

<!-- showfeasibilityStudy-->
<div v-if="searchDocumentType('investmentProgramsAndProjectsPortfolio')">
<div class="row">
  <div class="col-12 mb-4 pb-4">
    <div class="ia_separator bottom"></div>
    <h4 class="mt-4">
      <a v-on:click.prevent="showinvestmentProgramsAndProjectsPortfolio = !showinvestmentProgramsAndProjectsPortfolio"
            href="#"
            :class=" showinvestmentProgramsAndProjectsPortfolio ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
          Cartera de programas y proyectos de inversión</a>
    </h4>
  </div>
</div>
<div class="row" v-if="showinvestmentProgramsAndProjectsPortfolio">
  <div class="col-12 mb-4 pb-4">
    <ul class="ia_docs _list">
    <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
      <div v-if="docuemntbudget.documentType == 'investmentProgramsAndProjectsPortfolio'">
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

<!--showinfrastructureProgramme-->
<div v-if="searchDocumentType('infrastructureProgramme')">
<div class="row">
 <div class="col-12 mb-4 pb-4">
   <div class="ia_separator bottom"></div>
   <h4 class="mt-4">
     <a v-on:click.prevent="showinfrastructureProgramme = !showinfrastructureProgramme"
           href="#"
           :class="showinfrastructureProgramme ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
         Programa de Infraestructura</a>
   </h4>
 </div>
</div>
<div class="row" v-if="showinfrastructureProgramme">
 <div class="col-12 mb-4 pb-4">
   <ul class="ia_docs _list">
   <div v-for="(docuemntbudget, i) in project.documents" :key="i + 'docuemntbudget'">
     <div v-if="docuemntbudget.documentType == 'infrastructureProgramme'">
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
          <a href="#" class="get-json">JSON</a>
        </div>
      </div>
    </div>
  </div>
</template>
