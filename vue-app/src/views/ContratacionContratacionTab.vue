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
  // periodo_svg.vue
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import CantidadSvg from "../svg/icons/cantidad-svg.vue";
  import ClavepresupuestariaSvg from "../svg/icons/clavepresupuestaria-svg.vue";
  import DescripcionSvg from "../svg/icons/descripcion-svg.vue";
  import FechainicioSvg from "../svg/icons/fechadeinicio-svg.vue";
  import FechafinSvg from "../svg/icons/fechadetermino-svg.vue";
  import HacexmesesSvg from "../svg/icons/hacexmeses-svg.vue";
  import FuenteSvg from "../svg/icons/fuente-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import MontoSvg from "../svg/icons/monto-svg.vue";
  import UnidadSvg from "../svg/icons/unidaddemedida-svg.vue";
  import VersionSvg from "../svg/icons/version-svg.vue";
  import IdentificadorSvg from "../svg/icons/identificador-svg.vue";

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
        showAgreementItems : 1,
        showAgreementDocuments: 0,
        showAgreementMilestones: 0,
        showAgreementAmendments: 0,
        showrelatedProcesses: 0
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
      CantidadSvg,
      ClavepresupuestariaSvg,
      DescripcionSvg,
      DocumentacionSvg,
      FechainicioSvg,
      FechafinSvg,
      FuenteSvg,
      HacexmesesSvg,
      MontoSvg,
      MoneySvg,
      PeriodoSvg,
      UnidadSvg,
      VersionSvg,
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
    <div v-for="(agreement, i) in contract.contracts" :key="i + 'agreement'">
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
            <p><strong>Objeto del contrato:</strong> {{agreement.description}}</p>
        </div>
      </div>

      <div class="row mt-4 pt-4 mb-4 pb-4">
        <!-- value.amount-->
        <div class="col text-center">
            <p>Monto actualizado del contrato</p>
            <p class="ia_amount_section">${{format(agreement.value.amount)}} {{agreement.value.currency}}</p>
        </div>
        <!-- dateSigned-->
        <div class="col text-center">
          <p>Fecha de firma del contrato</p>
          <p class="ia_amount_section">{{getDate(agreement.dateSigned)}}</p>
        </div>
      </div>

      <div class="row mb-4 pb-4">
        <div class="col-12">
          <div class="ia_separator bottom"></div>
        </div>
      </div>

      <!--period-->
      <div class="row mb-4 pb-4">
        <!-- startDate-->
        <div class="col-6 col-sm-3 text-center">
          <p class="ia_amount_des"><span>Fecha de inicio</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(agreement.period.startDate)}}</span></p>
            <div class="ia_svg h_25 w_20 min">
              <fechainicio-svg />
            </div>
        </div>
        <!-- endDate-->
        <div class="col text-center">
          <p class="ia_amount_des"><span>Fecha fin</span></p>
          <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(agreement.period.endDate)}}</span></p>
          <div class="ia_svg h_25 w_20 min">
              <fechafin-svg />
            </div>


        </div>
        <!-- endDate-->
        <div v-if="agreement.period.maxExtentDate" class="col text-center">
          <p class="ia_amount_des"><span>Extensión máxima</span></p>
          <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(agreement.period.maxExtentDate)}}</span></p>
          <div class="ia_svg h_25 w_20 min">
              <periodo-svg />
            </div>
        </div>
        <!-- endDate-->
        <div v-if="agreement.period.durationInDays >= 0" class="col text-center">
          <p class="ia_amount_des"><span>Duración (días)</span></p>
          <p class="ia_amount_section"><span class="ia_currency _gray">{{agreement.period.durationInDays}}</span></p>
          <div class="ia_svg purple h_25 w_20 min">
              <hacexmeses-svg />
            </div>
        </div>
      </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐Ítems del contrato
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <div v-if="agreement.items">
        <div class="row mb-4 pb-4">
          <div class="col-12">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementItems = !showAgreementItems"
                    href="#"
                    :class=" showAgreementItems ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Ítems del contrato ({{agreement.items.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showAgreementItems">
        <div class="row">
          <div class="col">
            <div class="table_overflow">
            <table class="table">
              <thead>
                <tr>
                  <th><div class="_svg _white"><identificador-svg /></div> ID</th>
                  <th><div class="_svg"><descripcion-svg /></div> Descripción </th>
                  <th><div class="_svg "><cantidad-svg /></div> Cantidad</th>
                  <th><div class="_svg"><unidad-svg /></div> Unidad</th>
                  <th><div class="_svg"><monto-svg /></div> Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(agreementitem, i) in agreement.items" :key="i + 'agreement-item'">
                  <td>{{agreementitem.id}}</td>
                  <td><h5>{{agreementitem.description}}</h5>
                    <div v-if="agreementitem.classification.uri">
                    <a :href="`${agreementitem.classification.uri}`">{{agreementitem.classification.description}}</a>
                    </div>
                    <div v-else>
                    {{agreementitem.classification.description}}
                    </div>
                  </td>
                  <td>{{agreementitem.quantity}}</td>
                  <td>
                    <div v-if="agreementitem.classification.uri">
                    <a :href="`${agreementitem.unit.uri}`">{{agreementitem.unit.name}}</a>
                    </div>
                    <div v-else>
                      {{agreementitem.unit.name}}
                    </div>
                  </td>
                  <td v-if="agreementitem.unit.value">
                    ${{format(agreementitem.unit.value.amount)}} {{agreementitem.unit.value.currency}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
      </div>
      <!-- agreement.items ends-->

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Documentos
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <div v-if="agreement.documents">
        <div class="row">
          <div class="col-12">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementDocuments = !showAgreementDocuments"
                    href="#"
                    :class=" showAgreementDocuments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Documentos ({{agreement.documents.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showAgreementDocuments">
        <div class="row">
          <div class="col mt-4 pt-4">
            <ul class="ia_docs _list pb-4">
              <li v-for="(agreementdocument, i) in agreement.documents" :key="i + 'agreement-doc'">
              <span class="row">
                <span class="col-sm-12 col-md-6 mb-4">
                  <h4><span class="_svg"><documentacion-svg /></span> <a :href="`${agreementdocument.url}`">{{agreementdocument.title}}</a></h4>
                  {{agreementdocument.description}}
                  <!-- <br> Idioma: {{document.language}}-->
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Formato</span>
                  <span class="_svg"><version-svg /></span> {{agreementdocument.format}}
                </span>
                <span class="col-6 col-sm-4 col-md-2">
                  <span class="ia_label _docs">Fecha</span>
                  <span class="_svg"><periodo-svg /> </span> {{getDate(agreementdocument.datePublished)}}<br>
                  <span v-if="agreementdocument.dateModified">Modidicado: {{getDate(agreementdocument.dateModified)}}</span>
                </span>
                <span class="col-sm-4 col-md-2 mb-2">
                  <a :href="`${agreementdocument.url}`" class="ia_btn">Descargar</a>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
      <!-- ends agreement.documents -->

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Procedimientos relacionados
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <div class="row" v-if="agreement.relatedProcesses && agreement.relatedProcesses.length">
        <div class="row mt-4">
          <div class="col-12">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showrelatedProcesses = !showrelatedProcesses"
                    href="#"
                    :class=" showrelatedProcesses ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Procedimientos relacionados ({{agreement.relatedProcesses.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showrelatedProcesses">
          <div class="row">
            <div class="col mt-4 pt-4">
              <div class="table_overflow">
              <table class="table">
                <thead>
                  <tr>
                    <th><div class="_svg"><identificador-svg /></div> ID</th>
                    <th><div class="_svg _white"><rfc-svg /></div> Relación </th>
                    <th><div class="_svg"><rfc-svg /></div> Título del procedimiento relacionado </th>
                    <th><div class="_svg _white"><rfc-svg /></div> Esquema</th>
                    <th><div class="_svg _white"><identificador-svg /></div> Identificador</th>
                    <th><div class="_svg _white"><rfc-svg /></div> URI del procedimiento relacionado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(relatedProcesses, i) in agreement.relatedProcesses" :key="i + 'agreementrelatedProcesses' ">
                    <td>{{relatedProcesses.id}}</td>
                    <td>{{relatedProcesses.relationship}}</td>
                    <td>{{relatedProcesses.title}}</td>
                    <td>{{relatedProcesses.scheme}}</td>
                    <td>{{relatedProcesses.identifier}}</td>
                    <td><span v-if="relatedProcesses.uri"><a :href="`${relatedProcesses.uri}`">{{relatedProcesses.uri}}</a></span>
                    <span v-else>No disponible</span>
                  </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐ Hitos
      ////////////////////////////////////////////////////////////////////////////////
      -->
      <div v-if="agreement.milestones && agreement.milestones.length">
        <div class="row mt-4">
          <div class="col-12">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementMilestones = !showAgreementMilestones"
                    href="#"
                    :class=" showAgreementMilestones ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Hitos ({{agreement.milestones.length}})</a>
            </h4>
          </div>
        </div>
        <div v-if="showAgreementMilestones">
          <div class="row">
            <div class="col mt-4 pt-4">
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
                  <tr v-for="(agreementmilestone, i) in agreement.milestones" :key="i + 'agreementmilestone' ">
                    <td><h5>{{agreementmilestone.title}}</h5>
                      {{agreementmilestone.description}}</td>
                      <td>{{translate(agreementmilestone.type)}}</td>
                      <td>{{translate(agreementmilestone.code)}}</td>
                      <td>{{getDate(agreementmilestone.dueDate)}}</td>
                      <td>{{getDate(agreementmilestone.dateMet)}}</td>
                      <td>{{agreementmilestone.dateModified ? getDate(agreementmilestone.dateModified) : ""}}</td>
                      <td>{{translate(agreementmilestone.status)}}</td>
                      <td v-for="milestoneDocument in agreementmilestone.documents" :key="milestoneDocument">
                        {{milestoneDocument.title}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>



      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐⭐Modificaciones
      ////////////////////////////////////////////////////////////////////////////////
      -->
    <div v-if="agreement.amendments">
      <div class="row">
        <div class="col-12 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAgreementAmendments = !showAgreementAmendments"
                  href="#"
                  :class=" showAgreementAmendments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                Modificaciones ({{agreement.amendments.length}})</a>
              </h4>
        </div>
      </div>
      <div v-if="showAgreementAmendments">
        <div class="row">
          <div class="col">
            <table class="table">
              <thead>
                <tr>
                  <th><div class="_svg"><nombre-svg /></div> Fecha en que se realiza la modificación / Identificador</th>
                  <th><div class="_svg"><rfc-svg /></div> Justificación</th>
                  <th><div class="_svg"><rfc-svg /></div> Descripción</th>
                  <th><div class="_svg"><rfc-svg /></div> Publicación de la modificación (identificador)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(amendment, i) in agreement.amendments" :key="i + '-award-amendment'">
                  <td><h5>{{getDate(amendment.date)}}</h5>
                  ID: {{amendment.id}}</td>
                  <td>{{amendment.rationale}}</td>
                  <td>{{amendment.description}}</td>
                  <td>{{amendment.releaseID}}</td>
                </tr>
              </tbody>
            </table>
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
                  <a href="#" class="get-json">JSON</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- ends pagination-->
    </div>

  </div>
</template>
