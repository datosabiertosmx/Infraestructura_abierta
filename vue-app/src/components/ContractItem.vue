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
  import TimeSvg from "../svg/icons/time_svg.vue";
  import ContratistaSvg from "../svg/icons/contratista_svg.vue";
  import ProgramasSvg from "../svg/icons/programas_svg.vue";
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import PlaneacionSvg from "../svg/etapascontratacion/planeacion-svg.vue";
  import LicitacionSvg from "../svg/etapascontratacion/licitacion-svg.vue";
  import AdjudicacionSvg from "../svg/etapascontratacion/adjudicacion-svg.vue";
  import ContratacionSvg from "../svg/etapascontratacion/contratacion-svg.vue";
  import ImplementacionSvg from "../svg/etapascontratacion/implementacion-svg.vue";
  import TerminadoSvg from "../svg/estatus-proyecto/completado-svg.vue";

  export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["data"],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        descriptionDefault : "planeación"
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
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      let button = this.$el.querySelector('.get-json'),
          json   = this.data;

      this.$store.getters.enableJSONbutton(json, button, json.ocid, "contrato");
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      description(){
        let tender = this.data.tender;
        if(tender && tender.description){
          return tender.description;
        }
        else{
          return this.descriptionDefault;
        }
      },
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el proyecto relacionado
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      project(){
        return this.$store.getters.parentProject(this.data.ocid) || this.$store.getters.ProjectsList[0];
      },
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa el estado del contrato en clave numérica
      /  1 = planeación
      /  2 = licitación
      /  3 = adjudicación
      /  4 = contratación
      /  5 = implementación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      state(){
        return this.$store.getters.contractState(this.data);
      },
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  la suma de la suma de todos los contratos
      /  del proceso de contratación
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      procuringEntity(){
        return this.$store.getters.contractProcuringEntity(this.data);
      },

      buyer(){
        return this.$store.getters.contractBuyer(this.data);
      },

      localBudget(){
        if(this.state < 4) return 0;
        return this.$store.getters.contractTotalBudget(this.data.contracts);
      },

      providers(){
        let prov = this.$store.getters.contractProviders(this.data);
        return prov;
      },

      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.data);
      },
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      TimeSvg,
      ContratacionesSvg,
      ProgramasSvg,
      PlaneacionSvg,
      ContratistaSvg,
      LicitacionSvg,
      AdjudicacionSvg,
      ContratacionSvg,
      ImplementacionSvg,
      TerminadoSvg
    },
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ DEFINE EL TEMPLATE DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
  <div class="ai_box_item">
  <div class="row">
        <div class="col-md-12 col-lg-9  px-0">
          <p class="ai_box_top"><span class="ai_box_id">Identificador: {{data.ocid}}</span> <span class="ai_box_time"><time-svg /> Fecha de publicación: {{getDate(data.date)}}</span></p>
          <div class="row">
            <div class="col-6 col-sm-6 col-md-6 col-lg-2 mb-4">
              <div class="ia_box_icon">
              <contrataciones-svg />
              </div>
              <h5 class="ia_label_item">Contratación</h5>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-2 tablet mobile">
              <div class="ia_box_icon">
                <span v-if="state == 1"><planeacion-svg /></span>
                <span v-if="state == 2"><licitacion-svg /></span>
                <span v-if="state == 3"><adjudicacion-svg /></span>
                <span v-if="state == 4"><contratacion-svg /></span>
                <span v-if="state == 5"><implementacion-svg /></span>
                <span v-if="state == 6"><terminado-svg /></span>
              </div>
              <h5 class="ia_label_item">
                <span v-if="state == 1">Planeación</span>
                <span v-if="state == 2">Licitación</span>
                <span v-if="state == 3">Adjudicación</span>
                <span v-if="state == 4">Contratación</span>
                <span v-if="state == 5">Ejecución</span>
                <span v-if="state == 6">Terminado</span>
              </h5>
            </div>
            <div class="col-md-12 col-lg-8">
              <h2>
                <router-link :to="`/contratacion/${data.ocid}`">{{description}}</router-link>
              </h2>
              <div class="ia_separator bottom"></div>
                <h5 class="ia_box_inst"><a href="#">{{procuringEntity}}</a></h5>
              <div class="row">
                <div class="col-sm-6 px-0">
                  <h6 class="ai_label_box">PROYECTO</h6>
                  <p>
                    <router-link :to="`/proyecto/${project.id}`"
                    class="ai_box_link">
                      <programas-svg /> {{project.title}}
                    </router-link>
                  </p>
                </div>
                <div class="col-sm-6 px-0">
                  <h6 class="ai_label_box">CONTRATISTA</h6>
                  <p v-if="providers.length">
                    <router-link v-for="(p, i) in providers"
                                 :to="'/contratista/' + p.id"
                                 class="ai_box_link"
                                 :key="i + 'p-link'">
                      <contratista-svg /> {{p.name}}
                    </router-link>
                  </p>
                  <p v-else><span class="ai_box_link"><contratista-svg /> Sin información</span></p>
                </div>
              </div>
            </div>
            <div class="col-sm-2 no-mobile no-tablet">
              <div class="ia_box_icon">
                <span v-if="state == 1"><planeacion-svg /></span>
                <span v-if="state == 2"><licitacion-svg /></span>
                <span v-if="state == 3"><adjudicacion-svg /></span>
                <span v-if="state == 4"><contratacion-svg /></span>
                <span v-if="state == 5"><implementacion-svg /></span>
                <span v-if="state == 6"><terminado-svg /></span>
              </div>
              <h5 class="ia_label_item">
                <span v-if="state == 1">Planeación</span>
                <span v-if="state == 2">Licitación</span>
                <span v-if="state == 3">Adjudicación</span>
                <span v-if="state == 4">Contratación</span>
                <span v-if="state == 5">Implementación</span>
                <span v-if="state == 6">Terminado</span>
              </h5>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-3 px-0 ai_box_amount">
          <p class="ai_label_box title">Monto contratado <br>(con convenios)</p>
          <h3>${{format(localBudget)}}
            <span class="currency">MXN</span>
          </h3>
          <div class="ai_dw">
          <p class="ai_label_box download">Descargar</p>
          <ul class="ai_box_download">
            <!--<li><a href="#">PDF</a></li>-->
            <li>
              <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'contracto-' + data.ocid">CSV</vue-csv-downloader>
            </li>
            <li><a href="#"  class="get-json">JSON</a></li>
          </ul>
        </div>
        </div>
      </div>
  </div>
</template>
