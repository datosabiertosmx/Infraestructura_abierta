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
  import CategoriaSvg from "../svg/icons/categoria-svg.vue";
  import ClavepresupuestariaSvg from "../svg/icons/clavepresupuestaria-svg.vue";
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import DescripcionSvg from "../svg/icons/descripcion-svg.vue";
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import EntidadcontratanteSvg from "../svg/icons/entidadcontratante-svg.vue";
  import EstatusSvg from "../svg/icons/estatus-svg.vue";
  import FechainicioSvg from "../svg/icons/fechadeinicio-svg.vue";
  import FechafinSvg from "../svg/icons/fechadetermino-svg.vue";
  import FechaaperturaSvg from "../svg/icons/fechadeapertura-svg.vue";
  import FuenteSvg from "../svg/icons/fuente-svg.vue";
  import HacexmesesSvg from "../svg/icons/hacexmeses-svg.vue";
  import IdentificadorSvg from "../svg/icons/identificador-svg.vue";
  import MetodoSvg from "../svg/icons/invitacionatres-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import NombreSvg from "../svg/icons/nombreorazonsocial-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import RfcSvg from "../svg/icons/rfc-svg.vue";
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
        showProcurementMethod : 1,
        showAwardCriteria: 0,
        showTenderPeriod: 0,
        showEnquiryPeriod:0,
        showAwardPeriod:0,
        showContractPeriod:0,
        showTenderers:0,
        showTenderDocuments:0,
        showTenderMilestones:0,
        showTenderAmendments:0
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
      DescripcionSvg,
      FechaaperturaSvg,
      DocumentacionSvg,
      PeriodoSvg,
      VersionSvg,
      MoneySvg,
      EntidadcontratanteSvg,
      ClavepresupuestariaSvg,
      FuenteSvg,
      MetodoSvg,
      CategoriaSvg,
      ContratacionesSvg,
      HacexmesesSvg,
      FechainicioSvg,
      EstatusSvg,
      FechafinSvg,
      NombreSvg,
      RfcSvg,
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
      <div class="col mobile">
        <p class="text-right"><span :class="'ia_opc_status ' + contract.tender.status ">{{contract.tender.status}}</span></p>
      </div>
      <div class="col-sm-10">
        <h2>{{contract.tender.title}}</h2>
        <h4 class="ia_opc_id_label">ID: {{contract.tender.id}}</h4>
      </div>
      <div class="col-2 no-mobile">
        <p class="text-right"><span :class="'ia_opc_status ' + contract.tender.status ">{{translate(contract.tender.status)}}</span></p>
      </div>
      <div class="col">
        <div class="ia_separator bottom"></div>
          <p><strong>Objeto del procedimiento de contratación:</strong> {{contract.tender.description}}</p>
      </div>
    </div>
    <!--ends title-->

        <div class="row mt-4 pt-4 mb-4 pb-4">
          <!-- value-->
          <div class="col-sm-6 col-md-4 text-center">
            <p>Valor Estimado</p>
            <p class="ia_amount_section">${{format(contract.tender.value.amount)}} <span class="ia_currency">{{contract.tender.value.currency}}</span></p>
          <!--  <p class="ia_amount_des">Valor Estimado</p>-->
          </div>
          <!-- min value
          <div class="col-sm-6 col-md-4 text-center">
            <p>Valor Mínimo Estimado</p>
            <p class="ia_amount_section">${{format(contract.tender.minValue.amount)}} <span class="ia_currency">{{contract.tender.minValue.currency}}</span></p>
          </div>
          -->
          <!--procuringEntity-->
          <div class="col-sm-6 col-md-4 text-center">
            <p>Entidad Contratante</p>
            <p class="ia_amount_section">{{contract.tender.procuringEntity.name}}</p>
          </div>
        </div>
        <!--<p>procuringEntity id: {{contract.tender.procuringEntity.id}}</p>-->

        <!--items-->
        <div class="row" v-if="contract.tender.items">
          <div class="col mt-4 pt-4">
              <h4>Ítems</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th><div class="_svg _white"><identificador-svg /></div> ID</th>
                    <th><div class="_svg"><nombre-svg /></div> Descripción</th>
                    <th><div class="_svg"><rfc-svg /></div> Clasificación aplicable al bien, servicio u obra pública</th>
                    <th><div class="_svg"><rfc-svg /></div> Cantidad</th>
                    <th><div class="_svg"><rfc-svg /></div> Unidad de medida</th>
                    <th><div class="_svg"><rfc-svg /></div> Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in contract.tender.items" :key="i + '-tender-item'">
                    <td>{{item.id}}</td>
                    <td><h5>{{item.description}}</h5></td>
                    <td>{{item.classification.description}}<br>
                    Esquema: {{item.classification.scheme}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.unit.name}}</td>
                    <td v-if="item.unit.value">${{item.unit.value.amount}} {{item.unit.value.currency}}</td>
                  </tr>
                </tbody>
              </table>


          </div>
        </div>
        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐Método de contratación
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- procurementMethod-->
        <div class="row">
          <div class="col-12 mb-4 pb-4">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showProcurementMethod = !showProcurementMethod"
                    href="#"
                    :class=" showProcurementMethod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Método de contratación</a>
            </h4>
          </div>
        </div>
          <div v-if="showProcurementMethod" class="col">
          <div class="row">
            <!-- procurementMethod-->
            <div class="col text-center">
              <p class="ia_amount_des mb-1"><span class="ia_amount_sub">Método de contratación</span></p>

              <p class="ia_amount_section"><span class="ia_currency _gray">{{translate(contract.tender.procurementMethod)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <contrataciones-svg />
              </div>
            </div>
            <!-- procurementMethodDetails-->
            <div class="col text-center">
              <p class="ia_amount_des mb-1"><span>Detalles del método de contratación</span></p>

              <p class="ia_amount_section"><span class="ia_currency _gray">{{translate(contract.tender.procurementMethodDetails)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <contrataciones-svg />
              </div>
            </div>
            <!--mainProcurementCategory-->
            <div class="col text-center">
              <p class="ia_amount_des mb-1"><span>Categoría principal de contratación</span></p>

              <p class="ia_amount_section"><span class="ia_currency _gray">{{translate(contract.tender.mainProcurementCategory)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <categoria-svg />
              </div>
            </div>
        </div>
        <div class="row pt-3 mt-3 pb-4 mb-4">
          <div class="col-10 offset-1 pb-3">
            <div class="ia_separator bottom"></div>
          </div>
            <!--additionalProcurementCategories-->
            <div class="col-5 offset-1">

              <h4 class="mb-2">Justificación del método de contratación</h4>
              <p>{{contract.tender.procurementMethodRationale}}</p>

            </div>
            <!--
            <div class="col-5">
              <h4 class="mb-2">Categorías adicionales de contratación</h4>
              <ol class="numb_list">
                <li v-for="(additionalProcurementCategory, i) in contract.tender.additionalProcurementCategories" :key="i +'aditional-procurement-cat' ">
                  {{additionalProcurementCategory}}
                </li>
              </ol>
            </div>
          -->
        </div>
      </div>
        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐Criterio de evaluación de proposiciones
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- awardCriteria-->
        <div class="row">
          <div class="col-12 mb-4 pb-4">
            <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showAwardCriteria = !showAwardCriteria"
                    href="#"
                    :class=" showAwardCriteria ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                  Criterio de evaluación de proposiciones</a>
            </h4>
          </div>
        </div>
        <div v-if="showAwardCriteria">
          <div class="row">
            <!-- awardCriteria-->
            <div class="col text-center">
              <p class="ia_amount_des mb-1"><span>Criterio de evaluación de proposiciones</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{translate(contract.tender.awardCriteria)}}</span></p>
              <div class="ia_svg purple h_25 w_20 min">
                <fechaapertura-svg />
              </div>
            </div>
          </div>
          <div class="row pt-3 mt-3 pb-4 mb-4">
            <div class="col-10 offset-1 pb-3">
              <div class="ia_separator bottom"></div>
            </div>
          <div class="col-5 offset-1">
            <h4 class="mb-2">Detalles sobre el criterio de evaluación de proposiciones</h4>
            <p>{{contract.tender.awardCriteriaDetails}}</p>
          </div>
          <!--eligibilityCriteria-->
          <div class="col-5">
            <h4 class="mb-2">Criterios de elegibilidad</h4>
            <p>{{contract.tender.eligibilityCriteria}}</p>
          </div>
        </div>
      </div>
        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐⭐Periodo de entrega de proposicione
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- tenderPeriod-->
        <div v-if="contract.tender.tenderPeriod">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showTenderPeriod = !showTenderPeriod"
                    href="#"
                    :class=" showTenderPeriod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Período de entrega de proposiciones</a>
                </h4>
            </div>
          </div>
          <div v-if="showTenderPeriod">
            <div class="row">
          <!-- startDate-->
          <div class="col text-center">
            <p class="ia_amount_des"><span>Fecha de inicio</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.tenderPeriod.startDate)}}</span></p>
            <div class="ia_svg h_25 w_20 min">
                <fechainicio-svg />
              </div>
          </div>
          <!-- endDate-->
          <div class="col text-center">
              <p class="ia_amount_des"><span>Fecha de cierre</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.tenderPeriod.endDate)}}</span></p>

              <div class="ia_svg h_25 w_20 min">
                <fechafin-svg />
              </div>
          </div>
          <!-- maxExtentDate
          <div v-if="contract.tender.tenderPeriod.maxExtentDate" class="col text-center">
            <p class="ia_amount_des"><span>Extensión máxima</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.tenderPeriod.maxExtentDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                  <periodo-svg />
                </div>
          </div>-->

          <!-- durationInDays-->
          <div v-if="contract.tender.tenderPeriod.durationInDays" class="col text-center">
            <p class="ia_amount_des"><span>Duración (días)</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{contract.tender.tenderPeriod.durationInDays}}</span></p>
            <div class="ia_svg purple h_25 w_20 min">
                <hacexmeses-svg />
              </div>
          </div>
        </div>

        <div class="row pt-3 mt-3 pb-4 mb-4">
          <div class="col-10 offset-1 pb-3">
            <div class="ia_separator bottom"></div>
          </div>
          <!-- submissionMethod-->
          <div class="col-5 offset-1">
            <h4 class="mb-2">Medios para la recepción de las proposiciones</h4>
            <p>{{translate(contract.tender.submissionMethod)}}</p>
          </div>
          <div class="col-5">
            <h4 class="mb-2">Descripción de los medios para la recepción de las proposiciones</h4>
            <p>{{contract.tender.submissionMethodDetails}}</p>
          </div>
        </div>
        </div>
      </div>

        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐⭐Periodo para presentar solicitudes de aclaración
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- enquiryPeriod-->
        <div v-if="contract.tender.enquiryPeriod">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
              <h4 class="mt-4">
                <a v-on:click.prevent="showEnquiryPeriod = !showEnquiryPeriod"
                      href="#"
                      :class=" showEnquiryPeriod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Período para presentar solicitudes de aclaración</a>
              </h4>
            </div>
          </div>
          <div v-if="showEnquiryPeriod">
            <div class="row">
              <!-- startDate-->
              <div class="col text-center">
                <p class="ia_amount_des"><span>Fecha de inicio</span></p>
                <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.enquiryPeriod.startDate)}}</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <fechainicio-svg />
                </div>
              </div>
              <!-- endDate-->
              <div class="col text-center">
                <p class="ia_amount_des"><span>Fecha de cierre</span></p>
                <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.enquiryPeriod.endDate)}}</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <fechafin-svg />
                </div>
              </div>
              <!-- maxExtentDate
              <div v-if="contract.tender.enquiryPeriod.maxExtentDate" class="col text-center">
                <p class="ia_amount_des"><span>Extensión máxima</span></p>
                <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.enquiryPeriod.maxExtentDate)}}</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <periodo-svg />
                </div>
              </div>-->
              <!-- durationInDays-->
              <div v-if="contract.tender.enquiryPeriod.durationInDays >= 0" class="col text-center">
                <p  class="ia_amount_des"><span>Duración (días)</span></p>
                <p class="ia_amount_section"><span class="ia_currency _gray">{{contract.tender.enquiryPeriod.durationInDays}}</span></p>
                <div class="ia_svg purple h_25 w_20 min">
                  <hacexmeses-svg />
                </div>
              </div>
            </div>

            <div class="row pt-3 mt-3 pb-4 mb-4">
              <div class="col-10 offset-1 pb-3">
                <div class="ia_separator bottom"></div>
              </div>
              <!-- contract.tender.hasEnquiries-->
              <div class="col-5 offset-1">
                <h4 class="mb-2">¿Hubo solicitudes de aclaración?</h4>
                <p>{{contract.tender.hasEnquiries == false ? "No":"Sí"}}</p>
              </div>
            </div>
          </div>
        </div>
        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐⭐Periodo de evaluación y adjudicación
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- awardPeriod-->
        <div v-if="contract.tender.awardPeriod">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
              <h4 class="mt-4">
                <a v-on:click.prevent="showAwardPeriod = !showAwardPeriod"
                      href="#"
                      :class=" showAwardPeriod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Período de evaluación y adjudicación</a>
              </h4>
            </div>
          </div>
          <div v-if="showAwardPeriod">
          <div class="row">
          <!-- startDate-->
          <div class="col text-center">
            <p class="ia_amount_des"><span>Fecha de inicio</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.awardPeriod.startDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <fechainicio-svg />
              </div>
          </div>
          <!-- endDate-->
          <div class="col text-center">
              <p class="ia_amount_des"><span>Fecha de cierre</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.awardPeriod.endDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <fechafin-svg />
              </div>
          </div>
          <!-- maxExtentDate
          <div v-if="contract.tender.awardPeriod.maxExtentDate" class="col text-center">
              <p class="ia_amount_des"><span>Extensión máxima</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.awardPeriod.maxExtentDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <periodo-svg />
              </div>
          </div>-->
          <!-- durationInDays-->
          <div v-if="contract.tender.awardPeriod.durationInDays >= 0" class="col text-center">
              <p class="ia_amount_des"><span>Duración (días)</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{contract.tender.awardPeriod.durationInDays}}</span></p>
              <div class="ia_svg purple h_25 w_20 min">
                <hacexmeses-svg />
              </div>
          </div>
        </div>
      </div><!--v-if="showAwardPeriod"-->
    </div><!--v-if="contract.tender.awardPeriod"-->

        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐⭐Periodo del contrato
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <!-- contractPeriod-->
        <div v-if="contract.tender.contractPeriod">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
              <h4 class="mt-4">
                <a v-on:click.prevent="showContractPeriod = !showContractPeriod"
                      href="#"
                      :class=" showContractPeriod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Período del contrato</a>
              </h4>
            </div>
          </div>
          <div v-if="showContractPeriod">
          <div class="row">
          <!-- startDate-->
          <div class="col text-center">
              <p class="ia_amount_des"><span>Fecha de inicio</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.contractPeriod.startDate)}}</span></p>

              <div class="ia_svg h_25 w_20 min">
                <fechainicio-svg />
              </div>

          </div>
          <!-- endDate-->
          <div class="col text-center">
            <p class="ia_amount_des"><span>Fecha de cierre</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.contractPeriod.endDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <fechafin-svg />
              </div>
          </div>
          <!-- maxExtentDate
          <div v-if="contract.tender.contractPeriod.maxExtentDate" class="col text-center">
              <p class="ia_amount_des"><span>Extensión máxima</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(contract.tender.contractPeriod.maxExtentDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <periodo-svg />
              </div>
          </div>-->
          
          <!-- durationInDays-->
          <div v-if="contract.tender.contractPeriod.durationInDays >= 0" class="col text-center">
            <p class="ia_amount_des"><span>Duración (días)</span></p>
            <p class="ia_amount_section"><span class="ia_currency _gray">{{contract.tender.contractPeriod.durationInDays}}</span></p>
              <div class="ia_svg purple h_25 w_20 min">
                <hacexmeses-svg />
              </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    ////////////////////////////////////////////////////////////////////////////////
    ⭐⭐Licitantes
    ////////////////////////////////////////////////////////////////////////////////
    -->
        <div v-if="contract.tender.tenderers">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
              <h4 class="mt-4">
                <a v-on:click.prevent="showTenderers = !showTenderers"
                      href="#"
                      :class=" showTenderers ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Licitantes ({{contract.tender.numberOfTenderers}})</a>
              </h4>
            </div>
          </div>
          <div v-if="showTenderers">
            <div class="row">
              <div class="col">
                <table class="table">
                <thead>
                  <tr>
                  <th><div class="_svg"><nombre-svg /></div> Nombre o Razón Social</th>
                  <th><div class="_svg"><rfc-svg /></div> RFC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(tenderer, i) in contract.tender.tenderers" :key="i + 'contract-tenderer' ">
                    <td><h5>{{tenderer.name}}</h5></td>
                    <td>{{tenderer.id}}</td>
                  </tr>
                </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐⭐Documentos
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <div v-if="contract.tender.documents">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
              <h4 class="mt-4">
                <a v-on:click.prevent="showTenderDocuments = !showTenderDocuments"
                      href="#"
                      :class=" showTenderDocuments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Documentos ({{contract.tender.documents.length}})</a>
              </h4>
            </div>
          </div>
          <div v-if="showTenderDocuments">
            <div class="row">
              <div class="col">
                <ul class="ia_docs _list pb-4">
                  <li v-for="(document, i) in contract.tender.documents" :key="i + 'tender-doc' ">
          <!--  <p>documentType: {{document.documentType}}</p>-->
                  <span class="row">
                    <span class="col-sm-12 col-md-6 mb-4">
                      <h4><span class="_svg"><documentacion-svg /></span> <a :href="`${document.url}`">{{document.title}}</a></h4>
                      {{document.description}}
                      <!-- <br> Idioma: {{document.language}}-->
                    </span>
                    <span class="col-6 col-sm-4 col-md-2">
                      <span class="ia_label _docs">Formato</span>
                      <span class="_svg"><version-svg /></span> {{translate(document.format)}}
                    </span>
                    <span class="col-6 col-sm-4 col-md-2">
                      <span class="ia_label _docs">Fecha</span>
                      <span class="_svg"><periodo-svg /> </span> {{getDate(document.datePublished)}}<br>
                      <span v-if="document.dateModified">Modidicado: {{getDate(document.dateModified)}}</span>
                    </span>
                    <span class="col-sm-4 col-md-2 mb-2">
                      <a :href="`${document.url}`" class="ia_btn">Descargar</a>
                    </span>
                  </span>
                  </li>
                </ul>
              </div>
            </div>
          </div><!-- ends showTenderDocuments-->
      </div>

      <!--
      ////////////////////////////////////////////////////////////////////////////////
      ⭐⭐Hitos
      ////////////////////////////////////////////////////////////////////////////////
      -->
    <div v-if="contract.tender.milestones">
      <div class="row">
        <div class="col-12 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showTenderMilestones = !showTenderMilestones"
                  href="#"
                  :class=" showTenderMilestones ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                Hitos ({{contract.tender.milestones.length}})</a>
              </h4>
        </div>
      </div>
      <div v-if="showTenderMilestones" class="row">
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
                <tr v-for="(milestone, i) in contract.tender.milestones" :key="i + 'milestone' ">
                  <td><h5>{{milestone.title}}</h5>
                    {{milestone.description}}</td>
                    <td>{{translate(milestone.type)}}</td>
                    <td>{{translate(milestone.code)}}</td>
                    <td>{{getDate(milestone.dueDate)}}</td>
                    <td>{{getDate(milestone.dateMet)}}</td>
                    <td>{{getDate(milestone.dateModified)}}</td>
                    <td>{{translate(milestone.status)}}</td>
                    <td v-for="milestoneDocument in milestone.documents" :key="milestoneDocument">
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
      ⭐⭐Enmiendas
      ////////////////////////////////////////////////////////////////////////////////
      -->
    <div v-if="contract.tender.amendments">
      <div class="row">
        <div class="col-12 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
            <h4 class="mt-4">
              <a v-on:click.prevent="showTenderAmendments = !showTenderAmendments"
                  href="#"
                  :class=" showTenderAmendments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                Modificaciones ({{contract.tender.amendments.length}})</a>
              </h4>
        </div>
      </div>
      <div v-if="showTenderAmendments">
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
                <tr v-for="(amendment, i) in contract.tender.amendment" :key="i + '-award-amendment'">
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
</template>
