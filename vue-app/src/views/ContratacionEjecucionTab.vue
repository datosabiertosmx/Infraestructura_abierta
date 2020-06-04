<!--
  /////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import VueCsvDownloader from 'vue-csv-downloader';
  // svg
  import ClavepresupuestariaSvg from "../svg/icons/clavepresupuestaria-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import FuenteSvg from "../svg/icons/fuente-svg.vue";
  import IdentificadorSvg from "../svg/icons/identificador-svg.vue";
  import MontoSvg from "../svg/icons/monto-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import ReceptorSvg from "../svg/icons/receptor-svg.vue";
  import RfcSvg from "../svg/icons/rfc-svg.vue";
  import NombreSvg from "../svg/icons/nombreorazonsocial-svg.vue";
  import VersionSvg from "../svg/icons/version-svg.vue";

  export default {
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['contract', 'project'],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        showAgreementImplementationTransactions : 1,
        showImplementationMilestones:0
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
      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.contract);
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
      IdentificadorSvg,
      PeriodoSvg,
      MontoSvg,
      ReceptorSvg,
      RfcSvg,
      NombreSvg,
      DocumentacionSvg,
      VersionSvg
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
    <div v-for="(agreement, i) in contract.contracts" :key="i">
      <div class="row">
        <div class="col mobile">
          <p class="text-right"><span :class="'ia_opc_status ' + agreement.status ">{{translate(agreement.status)}}</span></p>
        </div>
        <div class="col-sm-10">
          <h2>{{agreement.title}}</h2>
          <h4 class="ia_opc_id_label">ID: {{agreement.id}}</h4>
        </div>
        <!--ends title-->
        <div class="col-2 no-mobile">
          <p class="text-right"><span :class="'ia_opc_status ' + agreement.status ">{{translate(agreement.status)}}</span></p>
        </div>
        <div class="col">
          <div class="ia_separator bottom"></div>
        </div>
      </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Transacciones relacionadas con los pagos
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <!--transactions-->
      <div v-if="agreement.implementation.transactions">
        <div class="row mt-4 mb-3 pb-3">
          <div class="col-12">
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementImplementationTransactions = !showAgreementImplementationTransactions"
                    href="#"
                    :class=" showAgreementImplementationTransactions ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Transacciones relacionadas con los pagos ({{agreement.implementation.transactions.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showAgreementImplementationTransactions">
        <div class="row">
          <div class="col">
            <div class="table_overflow">
            <table class="table">
              <thead>
              <tr>
                <th><div class="_svg"><receptor-svg /></div> Beneficiario</th>
                <th><div class="_svg"><rfc-svg /></div> RFC</th>
                <th><div class="_svg"><monto-svg /></div> Monto</th>
                <th><div class="_svg _white"><periodo-svg /></div> Fecha de la transacción </th>
                <th><div class="_svg _white"><identificador-svg /></div> Identificador </th>
                <th><div class="_svg"><nombre-svg /></div> Pagador</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(imp, i) in agreement.implementation.transactions" :key="i + 'implementation-trans'">
                <td><h5>{{imp.payee ? imp.payee.name : ""}}</h5></td>
                <td>{{imp.payee ? imp.payee.id : ""}}</td>
                <td class="text-right">${{format(imp.value.amount)}} {{imp.value.currency}}</td>
                <td>{{getDate(imp.date)}}</td>
                <td>
                  <div v-if="imp.uri">
                    <a :href="`${imp.uri}`">{{imp.id}}</a>
                  </div>
                  <div v-else>
                    {{imp.id}}
                  </div>
                  <div v-if="imp.source">
                  <br>
                  Fuente: {{imp.source}}
                  </div>
                  </td>
                <td><h5>{{imp.payer ? imp.payer.name : ""}}</h5>
                  {{imp.payer ? imp.payer.id : ""}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        </div>
      </div>
      </div>
      <div v-else class="row mt-4 pt-4">
        <div class="col">
          <h2>Aún no existen transacciones relacionadas con los pagos.</h2>
        </div>
      </div>
      <!--transactions ends-->



      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐⭐Hitos
      ////////////////////////////////////////////////////////////////////////////////
      -->
    <div v-if="agreement.implementation.milestones  && agreement.implementation.milestones.length">
      <div class="row">
        <div class="col-12 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showImplementationMilestones = !showImplementationMilestones"
                  href="#"
                  :class=" showImplementationMilestones ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                Hitos ({{agreement.implementation.milestones.length}})</a>
              </h4>
        </div>
      </div>
      <div v-if="showImplementationMilestones" class="row">
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
                <tr v-for="(implementationmilestone, i) in agreement.implementation.milestones" :key="i + 'implementationmilestone' ">
                  <td><h5>{{implementationmilestone.title}}</h5>
                    {{implementationmilestone.description}}</td>
                    <td>{{translate(implementationmilestone.type)}}</td>
                    <td>{{translate(implementationmilestone.code)}}</td>
                    <td>{{getDate(implementationmilestone.dueDate)}}</td>
                    <td>{{getDate(implementationmilestone.dateMet)}}</td>
                    <td>{{getDate(implementationmilestone.dateModified)}}</td>
                    <td>{{translate(implementationmilestone.status)}}</td>
                    <td v-for="milestoneDocument in implementationmilestone.documents" :key="milestoneDocument">
                      {{milestoneDocument.title}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>
      </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Documentos
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <div v-if="agreement.implementation.documents && agreement.implementation.documents.length">
        <div class="row">
          <div class="col mb-4 pb-4">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementImplementationDocuments = !showAgreementImplementationDocuments"
                    href="#"
                    :class=" showAgreementImplementationDocuments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Documentos ({{agreement.implementation.documents.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showAgreementImplementationDocuments">
        <div class="row">
          <div class="col">
            <h2></h2>
            <ul class="ia_docs _list pb-4">
            <li v-for="(agreementimplementationdoc, i) in agreement.implementation.documents" :key="i + 'agreementimplementation-doc'">
              <span class="row">
                <span class="col-sm-12 col-md-6 mb-2">
                  <h4><span class="_svg"><documentacion-svg /></span> <a :href="`${agreementimplementationdoc.url}`">{{agreementimplementationdoc.title}}</a></h4>
                  {{agreementimplementationdoc.description}}
                  <!-- <br> Idioma: {{document.language}}-->
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{agreementimplementationdoc.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span> {{getDate(agreementimplementationdoc.datePublished)}}<br>
                  <span v-if="agreementimplementationdoc.dateModified">Modidicado: {{getDate(agreementimplementationdoc.dateModified)}}</span>
                </span>
                <span class="col-sm-4 col-md-2 mb-2">
                  <a :href="`${agreementimplementationdoc.url}`" class="ia_btn">Descargar</a>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Descargar
      ////////////////////////////////////////////////////////////////////////////////
      -->
<div class="row">
  <div class="col">
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
            <a href="#"  class="get-json">JSON</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- ends pagination-->
    </div>
    <!-- ends contract.contracts-->
  </div>
</template>
