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
  import InstitucionesSvg from "../svg/instituciones-svg.vue";
  import TitularSvg from "../svg/icons/titular-svg.vue";
  import UrlSvg from "../svg/icons/url-svg.vue";

  export default{

    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['institution'],

    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      format(num){
        return this.$store.getters.formatNumber(num);
      },
    },

    mounted(){
      let button = this.$el.querySelector('.get-json'),
          json   = this.institution;

      this.$store.getters.enableJSONbutton(json, button, json.id, "institucion");
    },

    /*
     * C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      projects(){
        return this.$store.getters.institutionProjects(this.institution);
      },

      contracts(){
        return this.$store.getters.institutionContracts(this.institution);
      },

      csvData(){
        return this.$store.getters.mapInstitutionCSV(this.institution);
      },

      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.institution);
      },
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      /// svg
      InstitucionesSvg,
      TitularSvg,
      UrlSvg
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
  <!-- box-->
  <div class="ai_box_item">
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-9 px-0">
        <p class="ai_box_top">
          <!-- cambié "RFC" por "identficador" -->
          <span class="ai_box_id">identificador: <strong>{{institution.id}}</strong></span></p>
        <div class="row">
          <div class="col mb-4">
            <div class="ia_box_icon purple">
            <instituciones-svg />
            </div>
            <h5 class="ia_label_item">Institución</h5>
          </div>
          <div class="col mobile tablet">
            <p class="ia_amount_section center">{{projects.length}}</p>
            <h5 class="ia_label_item">Proyectos</h5>
          </div>
          <div class="col mobile tablet">
            <p class="ia_amount_section center">{{contracts.length}}</p>
            <h5 class="ia_label_item">Contrataciones</h5>
          </div>
          <div class="col-md-12 col-lg-6">
            <h2><router-link :to="`/institucion/${institution.id}`">{{institution.name}}</router-link></h2>
            <div class="ia_separator bottom"></div>
            <div class="row">
              <div class="col px-0" v-if="institution.contactPoint && institution.contactPoint.name">
                <!-- cambié "titular" por "contacto" -->
                <h6 class="ai_label_box">Contacto</h6>
                <p><span class="ai_box_link not_link"><titular-svg /> {{institution.contactPoint.name}}</span></p>
              </div>
              <div class="col px-0" v-if="institution.contactPoint && institution.contactPoint.url">
                <h6 class="ai_label_box">URL</h6>
                <p v-if="institution.contactPoint.url"><a :href="institution.contactPoint.url" class="ai_box_link"><url-svg /> {{institution.contactPoint.url}}</a></p>
                <p v-else><span class="ai_box_link"><url-svg /> No disponible</span></p>
              </div>

            </div>
          </div>
          <div class="col-2 no-mobile no-tablet">
            <p class="ia_amount_section center">{{projects.length}}</p>
            <h5 class="ia_label_item">Proyectos</h5>
          </div>
          <div class="col-2 no-mobile no-tablet">
            <p class="ia_amount_section center">{{contracts.length}}</p>
            <h5 class="ia_label_item">Contrataciones</h5>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-3 px-0 ai_box_amount">
        <p class="ai_label_box title">Monto ejercido</p>
        <h3>${{format(institution.executedBudget)}}
            <span class="currency">MXN</span>
        </h3>
        <div class="ai_dw">
          <p class="ai_label_box download">Descargar</p>
          <ul class="ai_box_download">
        <!--  <li><a href="#">PDF</a></li>-->
          <li>
            <!--<a href="#">CSV</a>-->
            <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'institucion-' + institution.id">CSV</vue-csv-downloader>
          </li>
          <li><a class="get-json" href="#">JSON</a></li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
