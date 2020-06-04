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
  import DocumentacionSvg from "../svg/icons/documentacion-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import VersionSvg from "../svg/icons/version-svg.vue";
  import ClavepresupuestariaSvg from "../svg/icons/clavepresupuestaria-svg.vue";
  import FechainicioSvg from "../svg/icons/fechadeinicio-svg.vue";
  import FechafinSvg from "../svg/icons/fechadetermino-svg.vue";
  import FechaaperturaSvg from "../svg/icons/fechadeapertura-svg.vue";
  import FuenteSvg from "../svg/icons/fuente-svg.vue";
  import HacexmesesSvg from "../svg/icons/hacexmeses-svg.vue";
  import NombreSvg from "../svg/icons/nombreorazonsocial-svg.vue";
  import RfcSvg from "../svg/icons/rfc-svg.vue";

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
        showAwardSuppliers : 1,
        showAwardContractPeriod:0,
        showAwardDocuments: 0,
        showAwardAmendments: 0,
        showAwardItems: 0
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
      DocumentacionSvg,
      PeriodoSvg,
      MoneySvg,
      VersionSvg,
      ClavepresupuestariaSvg,
      FechainicioSvg,
      FechafinSvg,
      FechaaperturaSvg,
      FuenteSvg,
      HacexmesesSvg,
      NombreSvg,
      RfcSvg
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

      <div v-if="contract.awards">
        <div v-for="(award, i) in contract.awards" :key="i + 'award'">
          <div class="row">
            <div class="col mobile">
              <p class="text-right"><span :class="'ia_opc_status ' + award.status ">{{translate(award.status)}}</span></p>
            </div>
            <div class="col-sm-10">
              <h2>{{award.title}}</h2>
              <h4 class="ia_opc_id_label">ID: {{award.id}}</h4>
            </div>
            <!--ends title-->
            <div class="col-2 no-mobile">
              <p class="text-right"><span :class="'ia_opc_status ' + award.status ">{{translate(award.status)}}</span></p>
            </div>
            <div class="col">
              <div class="ia_separator bottom"></div>
                <p><strong>Descripción:</strong> {{award.description}}</p>
            </div>
          </div>

          <div class="row mt-4 pt-4 mb-4 pb-4">
            <!-- date-->
            <div class="col text-center">
                <p>Monto</p>
                <p class="ia_amount_section">${{format(award.value.amount)}} {{award.value.currency}}</p>
            </div>
            <!-- date-->
            <div class="col text-center">
              <p>Fecha de la adjudicación</p>
              <p class="ia_amount_section">{{getDate(award.date)}}</p>
            </div>
          </div>
          <!--
          ////////////////////////////////////////////////////////////////////////////////
          ⭐Proveedores o contratistas
          ////////////////////////////////////////////////////////////////////////////////
          -->
          <div v-if="award.suppliers">
            <div class="row">
              <div class="col mb-4 pb-4">
                <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showAwardSuppliers = !showAwardSuppliers"
                        href="#"
                        :class=" showAwardSuppliers ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                      Contratistas</a>
                </h4>
              </div>
            </div>
            <div v-if="showAwardSuppliers">
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
                    <tr v-for="(supplier, i) in award.suppliers" :key="i + 'supplier'">
                      <td><h5><router-link :to="`/contratista/MX-RFC-${supplier.id}`">{{supplier.name}}</router-link></h5></td>
                      <td>{{supplier.id}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
          <!--ends award.suppliers-->

          <!--
          ////////////////////////////////////////////////////////////////////////////////
          ⭐Período del contrato
          ////////////////////////////////////////////////////////////////////////////////
          -->

          <div v-if="award.contractPeriod">
            <div class="row">
              <div class="col-12 mb-4 pb-4">
                <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showAwardContractPeriod = !showAwardContractPeriod"
                        href="#"
                        :class=" showAwardContractPeriod ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                      Período del contrato</a>
                </h4>
              </div>
            </div>
            <div v-if="showAwardContractPeriod">
            <div class="row">
            <!-- startDate-->
            <div class="col text-center">
              <p class="ia_amount_des"><span>Fecha de inicio</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(award.contractPeriod.startDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <fechainicio-svg />
              </div>

            </div>
            <!-- endDate-->
            <div class="col text-center">
              <p class="ia_amount_des"><span>Fecha de cierre</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(award.contractPeriod.endDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <fechafin-svg />
              </div>
            </div>
            <!-- maxExtentDate
            <div v-if="award.contractPeriod.maxExtentDate" class="col text-center">
              <p class="ia_amount_des"><span>Extensión máxima</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{getDate(award.contractPeriod.maxExtentDate)}}</span></p>
              <div class="ia_svg h_25 w_20 min">
                <periodo-svg />
              </div>
            </div>-->
            <!-- durationInDays-->
            <div v-if="award.contractPeriod.durationInDays >= 0" class="col text-center">
              <p class="ia_amount_des"><span>Duración (días)</span></p>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{award.contractPeriod.durationInDays}}</span></p>

              <div class="ia_svg purple h_25 w_20 min">
                <hacexmeses-svg />
              </div>

            </div>
          </div>
        </div>
        </div>


          <!--
          ////////////////////////////////////////////////////////////////////////////////
          ⭐Ítems del contrato
          ////////////////////////////////////////////////////////////////////////////////
          -->
          <div v-if="award.items">
            <div class="row mb-4 pb-4">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showAwardItems = !showAwardItems"
                        href="#"
                        :class=" showAwardItems ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                      Ítems de la adjudicación ({{award.items.length}})</a>
                </h4>
              </div>
            </div>
            <div v-if="showAwardItems">
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
                    <tr v-for="(awarditem, i) in award.items" :key="i + 'award-item'">
                      <td>{{awarditem.id}}</td>
                      <td><h5>{{awarditem.description}}</h5>
                        <div v-if="awarditem.classification.uri">
                        <a :href="`${awarditem.classification.uri}`">{{awarditem.classification.description}}</a>
                        </div>
                        <div v-else>
                        {{awarditem.classification.description}}
                        </div>
                      </td>
                      <td>{{awarditem.quantity}}</td>
                      <td>
                        <div v-if="awarditem.classification.uri">
                        <a :href="`${awarditem.unit.uri}`">{{awarditem.unit.name}}</a>
                        </div>
                        <div v-else>
                          {{awarditem.unit.name}}
                        </div>
                      </td>
                      <td v-if="awarditem.unit.value">
                        ${{format(awarditem.unit.value.amount)}} {{awarditem.unit.value.currency}}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              </div>
            </div>
          </div>
          </div>
          <!-- award.items ends-->

          <!--
          ////////////////////////////////////////////////////////////////////////////////
          ⭐⭐Modificaciones
          ////////////////////////////////////////////////////////////////////////////////
          -->
        <div v-if="award.amendments">
          <div class="row">
            <div class="col-12 mb-4 pb-4">
              <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showAwardAmendments = !showAwardAmendments"
                      href="#"
                      :class=" showAwardAmendments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                    Modificaciones ({{award.amendments.length}})</a>
                  </h4>
            </div>
          </div>
          <div v-if="showAwardAmendments">
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
                    <tr v-for="(amendment, i) in award.amendments" :key="i + '-award-amendment'">
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
          ⭐Documentos
          ////////////////////////////////////////////////////////////////////////////////
          -->
          <div v-if="award.documents">
            <div class="row">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
                <h4 class="mt-4">
                  <a v-on:click.prevent="showAwardDocuments = !showAwardDocuments"
                        href="#"
                        :class=" showAwardDocuments ? 'ia_opc_id_sub_nav dis' : 'ia_opc_id_sub_nav'">
                      Documentos ({{award.documents.length}})</a>
                </h4>
              </div>
            </div>
            <div v-if="showAwardDocuments">
            <div class="row">
            <div class="col mt-4 pt-4">
              <ul class="ia_docs _list pb-4">
                <li v-for="(awarddocument, i) in award.documents" :key="i + 'award-doc'">
                  <span class="row">
                    <span class="col-sm-12 col-md-6 mb-4">
                      <h4><span class="_svg"><documentacion-svg /></span> <a :href="`${awarddocument.url}`">{{awarddocument.title}}</a></h4>
                      {{awarddocument.description}}
                      <!-- <br> Idioma: {{document.language}}-->
                    </span>
                    <span class="col-6 col-sm-4 col-md-2">
                      <span class="ia_label _docs">Formato</span>
                      <span class="_svg"><version-svg /></span> {{awarddocument.format}}
                    </span>
                    <span class="col-6 col-sm-4 col-md-2">
                      <span class="ia_label _docs">Fecha</span>
                      <span class="_svg"><periodo-svg /> </span> {{getDate(awarddocument.datePublished)}}<br>
                      <span v-if="awarddocument.dateModified">Modidicado: {{getDate(awarddocument.dateModified)}}</span>
                    </span>
                    <span class="col-sm-4 col-md-2 mb-3">
                      <a :href="`${awarddocument.url}`" class="ia_btn">Descargar</a>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
          <!-- ends award.documents -->

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
    </div>
    <!--ends contract.awards-->

  </div>
</template>
