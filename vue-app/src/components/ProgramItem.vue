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
  import ProgramasSvg from "../svg/icons/programas_svg.vue";
  import ContratistaSvg from "../svg/contratistas-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import VigenteSvg from "../svg/icons/vigente-svg.vue";
  export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['program'],

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
      let button = document.querySelector(".get-json"),
          json = this.$store.getters.extendProgramData(this.program);

      this.$store.getters.enableJSONbutton(json, button, json.id, "programa");
    },

    computed : {
      projects(){
        return this.$store.getters.ProgramProjects(this.program.name);
      },

      amounts(){
        return this.$store.getters.ProgramAmounts(this.program.name);
      },

      sectors(){
        return this.$store.getters.ProgramSectors(this.program.name);
      },

      types(){
        return this.$store.getters.ProgramTypes(this.program.name);
      },

      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.extendedProgram);
      },

      extendedProgram(){
        return this.$store.getters.extendProgramData(this.program);
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      ProgramasSvg,
      ContratistaSvg,
      PeriodoSvg,
      VigenteSvg
    }
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
              <div class="col-sm-12 col-md-8 col-lg-9 px-0">
                <p class="ai_box_top"><span class="ai_box_id">Identificador: <strong>{{program.id}}</strong></span> </p>
                <div class="row">
                  <div class="col-2">
                    <div class="ia_box_icon">
                    <programas-svg />
                    </div>
                    <h5 class="ia_label_item">Programa</h5>
                  </div>
                  <div class="col-sm-10 col-md-12 col-lg-10">
                    <h2><router-link :to="`/programa/${program.id}`">{{program.name}}</router-link></h2>
                    <div class="ia_separator bottom"></div>
                      <h5 class="ia_box_inst"><a href=""> </a></h5>
                    <div class="row">
                      <div class="col px-0">
                        <h6 class="ai_label_box">Sector</h6>
                        <p><a href="#" class="ai_box_link"><programas-svg />
                          {{sectors.length ? sectors.join(', ') : 'Sin información'}}
                        </a></p>
                      </div>
                      <div class="col px-0">
                        <h6 class="ai_label_box">Tipo</h6>
                        <p><a href="#" class="ai_box_link"><contratista-svg />
                          {{types.length ? types.join(', ') : 'Sin información'}}
                        </a></p>
                      </div>
                      <!--
                      <div class="col px-0">
                        <h6 class="ai_label_box">Período</h6>
                        <p><span class="ai_box_link not_link"><periodo-svg /> Sin información</span></p>
                      </div>-->
                    </div>
                  </div>
                  <!--
                  <div class="col-2">
                    <div class="ia_box_icon">
                    <vigente-svg />
                    </div>
                    <h5 class="ia_label_item"></h5>
                  </div>-->
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-3 px-0 ai_box_amount">
                <p class="ai_label_box title">Monto ejercido</p>
                <h3>${{format(amounts.executed)}}
                  <span class="currency">MXN</span>
                </h3>
                <div class="ai_dw">
                <p class="ai_label_box download">Descargar</p>
                <ul class="ai_box_download">
                  <li>
                    <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'programa-' + program.id">CSV</vue-csv-downloader>
                  </li>
                  <li><a href="#" class="get-json">JSON</a></li>
                </ul>
              </div>
              </div>
            </div>
          </div><!-- box ends-->
</template>
