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
  import VersionSvg from "../svg/icons/version-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import IdentificadorSvg from "../svg/icons/identificador-svg.vue";
  import ProyectoSvg from "../svg/proyecto-svg.vue";

  export default {
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['contract', 'project'],

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
      print(){
        window.print();
      }
    },
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showPlanningMilestones : 1,
      }
    },
    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      let button = this.$el.querySelector('.get-json'),
          json   = this.contract;

      this.$store.getters.enableJSONbutton(json, button, json.ocid, "contrato");
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      amount(){
        let budget = this.contract.planning.budget.amount;
        return budget//this.$store.getters.contractBudgetAmounts(budget);
      },

      budgetSource(){
        let budget = this.contract.planning.budget;
        return this.$store.getters.contractBudgetSources(budget);
      },

      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.contract);
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      DocumentacionSvg,
      PeriodoSvg,
      VersionSvg,
      MoneySvg,
      ProyectoSvg,
      IdentificadorSvg
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
    <div class="row">
      <div class="col">
        <h2 class="mb-4">Número de beneficiarios</h2>
        <p>{{contract.planning.rationale}}</p>
        <div class="ia_separator bottom"></div>

        <div class="row mt-4 pt-4 mb-4 pb-4">

          <div class="col text-center">
            <p>Monto Presupuestado</p>
            <p class="ia_amount_section">
              ${{format(amount.amount)}} <span class="ia_currency">{{amount.currency}}</span>
            </p>
            <div class="ia_svg h_25 w_20 min">
              <money-svg />
            </div>
          </div>
          <div class="col text-center">
            <p>Fuente de presupuesto</p>

            <p class="ia_amount_section" v-if="contract.planning.budget.description">
              <a :href="`${contract.planning.budget.uri}`">
                {{contract.planning.budget.description}}
              </a>
            </p>

            <p class="ia_amount_section" v-else v-for="(bs,i) in budgetSource" :key="i + '-bl'">
                {{bs}}
            </p>

            <div class="ia_svg h_25 w_20 min">
              <identificador-svg />
            </div>
          </div>
          <div v-if="contract.planning.budget.projectID" class="col text-center">
            <p>Proyecto ID</p>
            <p class="ia_amount_section">{{contract.planning.budget.projectID}}</p>
            <div class="ia_svg h_25 w_20 min purple">
              <proyecto-svg />
            </div>
          </div>
        </div>
        <p v-if="contract.planning.budget.projectID"><strong>Proyecto</strong>: {{contract.planning.budget.project}}</p>



        <div v-if="contract.planning.documents">
          <div class="ia_separator bottom"></div>
          <h2 class="mt-4 pt-4">Documentos</h2>

          <ul class="ia_docs _list pb-4">
            <li v-for="(document, i) in contract.planning.documents" :key="i+'document'">

            <!--  <p>documentType: {{document.documentType}}</p>-->


              <span class="row">
                <span class="col-sm-12 col-md-6 mb-3">
                  <h4><span class="_svg"><documentacion-svg /></span> <a :href="`${document.url}`">{{document.title}}</a></h4>
                  {{document.description}}
                <!-- <br> Idioma: {{document.language}}-->
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{document.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span>
                  {{document.datePublished ? getDate(document.datePublished) : '-'}} <br>
                  Modificado: {{document.dateModified ? getDate(document.dateModified) : ''}}
                </span>
                <span class="col-sm-4 col-md-2">
                  <a :href="`${document.url}`" class="ia_btn" download>Descargar</a>
                </span>
              </span>
            </li>
          </ul>
        </div>


          <!--
          ////////////////////////////////////////////////////////////////////////////////
          Planificación
          ////////////////////////////////////////////////////////////////////////////////
          -->
        <div v-if="contract.planning.milestones && contract.planning.milestones.length">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showPlanningMilestones = !showPlanningMilestones"
                      href="#"
                      :class=" showPlanningMilestones ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Planificación ({{contract.planning.milestones.length}})</a>
                  </h4>
            </div>
          </div>
          <div v-if="showPlanningMilestones" class="row">
              <div class="col">
                <div class="table_overflow">
                <table class="table">
                  <thead>
                    <tr>
                      <th><div class="_svg"><descripcion-svg /></div> Título</th>
                      <th><div class="_svg _white"><identificador-svg /></div> Tipo </th>
                      <th><div class="_svg"><fuente-svg /></div> Código del hito  </th>
                      <th><div class="_svg _white"><periodo-svg /></div> Fecha de vencimiento</th>
                      <th><div class="_svg _white"><periodo-svg /></div> Fecha de cumplimiento</th>
                      <th><div class="_svg _white"><periodo-svg /></div> Fecha de modificación</th>
                      <th><div class="_svg"><estatus-svg /></div> Estatus</th>
                      <!--  <th v-if="milestone.documents"><div class="_svg"><fuente-svg /></div> Documentos</th>-->
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(planningmilestone, i) in contract.planning.milestones" :key="i + 'planningmilestone' ">
                      <td><h5>{{planningmilestone.title}}</h5>
                        {{planningmilestone.description}}</td>
                        <td>{{translate(planningmilestone.type)}}</td>
                        <td>{{translate(planningmilestone.code)}}</td>
                        <td>{{getDate(planningmilestone.dueDate)}}</td>
                        <td>{{getDate(planningmilestone.dateMet)}}</td>
                        <td>{{getDate(planningmilestone.dateModified)}}</td>
                        <td>{{translate(planningmilestone.status)}}</td>
                        <td v-for="milestoneDocument in planningmilestone.documents" :key="milestoneDocument">
                          {{milestoneDocument.title}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
          </div>

          <div class="mt-4 pt-4">
          <div class="ia_download_items mt-4">
            <div class="row">
              <div class="col-sm-9">
                <p class="text-right">Descargar datos de proceso de contratación</p>
              </div>
              <div class="col col-sm-1 pr-0 pl-0">
                <a href="#" v-on:click.prevent="print">IMPRIMIR</a>
              </div>
              <div class="col col-sm-1 pr-0 pl-0">
                <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'contracto-' + contract.ocid">CSV</vue-csv-downloader>
              </div>
              <div class="col col-sm-1 pr-0 pl-0">
                <a href="#" class="get-json">JSON</a>
              </div>
            </div>
          </div>
          </div>


<!--
        <pre>
          {{contract.planning}}
        </pre>-->
      </div>

    </div>
  </div>
</template>
