<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import Siema from 'siema';
  // Fases
  import PlaneacionSvg from "../svg/etapascontratacion/planeacion-svg.vue";
  import LicitacionSvg from "../svg/etapascontratacion/licitacion-svg.vue";
  import AdjudicacionSvg from "../svg/etapascontratacion/adjudicacion-svg.vue";
  import ContratacionSvg from "../svg/etapascontratacion/contratacion-svg.vue";
  import ImplementacionSvg from "../svg/etapascontratacion/implementacion-svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import FechainicioSvg from "../svg/icons/fechadeinicio-svg.vue";
  import FechaterminoSvg from "../svg/icons/fechadetermino-svg.vue";
  import TerminadoSvg from "../svg/estatus-proyecto/completado-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";

	export default{
    props : ["data", "project"],
    data(){
      return {
        slider : null
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

      next(){
        this.slider.next();
      },

      prev(){
        this.slider.prev();
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
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      // _svg
      PeriodoSvg,
      PlaneacionSvg,
      LicitacionSvg,
      AdjudicacionSvg,
      ContratacionSvg,
      ImplementacionSvg,
      FechainicioSvg,
      TerminadoSvg,
      MoneySvg,
      FechaterminoSvg
    },
    mounted(){
      this.slider = new Siema({
        perPage: 3
      });
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
  <div>
    <!-- LOS BOTONES DE LA LÍNEA DE TIEMPO  -->
    <button class="prev ia_img_project_btn timeline" v-on:click="prev">&lt;</button>
    <button class="next ia_img_project_btn timeline"  v-on:click="next">&gt;</button>

    <div class="siema">

      <!--fecha de inicio-->
      <div class="col">
        <!--fecha-->
        <div class="row">
          <div class="col">
            <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(project.period.startDate)}}</p>
          </div>
        </div>
        <!--box-->
        <div class="ai_box_item tender ia_timeline_box">
            <!--title-->
          <div class="row mt-0 pt-3 mb-0 pb-0">
            <div class="col">
              <h5>Inicia proyecto</h5>
              <p>{{project.title}}</p>
            </div>
          </div>
          <!--fase-->
          <div class="row">
            <div class="col-12">
              <div class="ia_separator bottom"></div>
            </div>
            <div class="col-3">
              <div class="ia_box_icon _purple">
                <fechainicio-svg />
              </div>
            </div>
            <div class="col-9">
              <p class="pt-3"> <strong>Inicio de proyecto</strong></p>
            </div>
          </div>
        </div>
        <!--box ends-->
      </div>

      <!--aprobación presupuesto-->
      <div class="col" v-if="project.budget.approvalDate">
        <!--fecha-->
        <div class="row">
          <div class="col">
            <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(project.budget.approvalDate)}}</p>
          </div>
        </div>
        <!--box-->
        <div class="ai_box_item tender ia_timeline_box">
            <!--title-->
          <div class="row mt-0 pt-3 mb-0 pb-0">
            <div class="col">
              <h5>Aprobación del presupuesto</h5>
              <p>Se aprueba el presupuesto del proyecto</p>
              <p><strong>${{format(project.budget.amount.amount)}}</strong> ({{project.budget.amount.currency ? project.budget.amount.currency : 'MXN'}})</p>
            </div>
          </div>
          <!--fase-->
          <div class="row">
            <div class="col-12">
              <div class="ia_separator bottom"></div>
            </div>
            <div class="col-3">
              <div class="ia_box_icon">
                <money-svg />
              </div>
            </div>
            <div class="col-9">
              <p class="pt-3"> <strong>Presupuesto aprobado</strong></p>
            </div>
          </div>
        </div>
        <!--box ends-->
      </div>


      <div v-for="(item, i) in data" :key="i + '-timeline-item'">
        <!--tender-->
        <div v-if="item.type== 'tender'" >
          <!--fecha-->
          <div class="row">
            <div class="col">
              <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(item.date)}}</p>
            </div>
          </div>
          <!--box-->
          <div class="ai_box_item tender ia_timeline_box">
              <!--title-->
            <div class="row mt-0 pt-3 mb-0 pb-0">
              <div class="col">

                <h5>{{item.title}}</h5>
                <p>{{item.description}}</p>
                <p>Licitantes: {{item.tenderers}}</p>
              </div>
            </div>
            <!--fase-->
            <div class="row">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
              </div>
              <div class="col-3">
                <div class="ia_box_icon">
                  <licitacion-svg />
                </div>
              </div>
              <div class="col-9">
                <p class="pt-3"> <strong>{{translate(item.type)}}</strong></p>
              </div>
            </div>
          </div>
          <!--box ends-->
        </div>

        <!--award-->
        <div v-if="item.type== 'award'">
          <!--fecha-->
          <div class="row">
            <div class="col">
              <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(item.date)}}</p>
            </div>
          </div>
          <!--box-->
          <div class="ai_box_item tender ia_timeline_box">
              <!--title-->
            <div class="row mt-0 pt-3 mb-0 pb-0">
              <div class="col">
<!--
                <h5>{{item.title}}</h5>
                <p>{{item.description}}</p>
                <p>{{item.providers}}</p>
                <p><strong>${{format(item.amount)}} MXN</strong></p>
-->
                <h5>Contratista adjudicado</h5>
                <p>{{item.providers}}</p>
                <p><strong>${{format(item.amount)}}</strong> ({{item.amount.currency ? item.amount.currency : 'MXN'}})</p>
              </div>
            </div>
            <!--fase-->
            <div class="row">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
              </div>
              <div class="col-3">
                <div class="ia_box_icon">
                  <adjudicacion-svg />
                </div>
              </div>
              <div class="col-9">
                <p class="pt-3"> <strong>{{translate(item.type)}}</strong></p>
              </div>
            </div>
          </div>
          <!--box ends-->
        </div>

        <!--contract-->
        <div v-if="item.type== 'contract'">
          <!--fecha-->
          <div class="row">
            <div class="col">
              <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(item.date)}}</p>
            </div>
          </div>
          <!--box-->
          <div class="ai_box_item tender ia_timeline_box">
              <!--title-->
            <div class="row mt-0 pt-3 mb-0 pb-0">
              <div class="col">
                <h5>{{item.title}}</h5>
                <p>{{item.description}}</p>
                <p>{{item.providers}}</p>
                <p><strong>${{format(item.amount)}}</strong>(MXN)</p>
              </div>
            </div>
            <!--fase-->
            <div class="row">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
              </div>
              <div class="col-3">
                <div class="ia_box_icon">
                  <contratacion-svg />
                </div>
              </div>
              <div class="col-9">
                <p class="pt-3"> <strong>{{translate(item.type)}}</strong></p>
              </div>
            </div>
          </div>
          <!--box ends-->
        </div>

        <!--amendment-->
        <div v-if="item.type== 'amendment'">
          <!--fecha-->
          <div class="row">
            <div class="col">
              <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(item.date)}}</p>
            </div>
          </div>
          <!--box-->
          <div class="ai_box_item tender ia_timeline_box">
              <!--title-->
            <div class="row mt-0 pt-3 mb-0 pb-0">
              <div class="col">
                <h5>{{item.title}}</h5>
                <p>{{item.description}}</p>
                <p v-if="item.description.search('Monto') != -1"><strong>${{format(item.amount)}} MXN</strong></p>
                <p  v-if="item.description.search('Tiempo') != -1"><strong>{{format(item.days)}} días</strong></p>
              </div>
            </div>
            <!--fase-->
            <div class="row">
              <div class="col-12">
                <div class="ia_separator bottom"></div>
              </div>
              <div class="col-3">
                <div class="ia_box_icon">
                  <contratacion-svg />
                </div>
              </div>
              <div class="col-9">
                <p class="pt-3"> <strong>Modificación al contrato</strong></p>
              </div>
            </div>
          </div>
          <!--box ends-->
        </div>

      </div>
      <!-- v-for ends -->

      <!-- fecha de terminación-->
      <div v-if="project.completion.endDate">
      <!--fecha de inicio-->
      <div class="col">
        <!--fecha-->
        <div class="row">
          <div class="col">
            <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(project.completion.endDate)}}</p>
          </div>
        </div>
        <!--box-->
        <div class="ai_box_item tender ia_timeline_box">
            <!--title-->
          <div class="row mt-0 pt-3 mb-0 pb-0">
            <div class="col">
              <h5>Fin de ejecución<!--Finalización del proyecto--></h5>
              <p>{{project.completion.finalScope ? project.completion.finalScope : project.title}}</p>
              <p><strong>${{format(project.completion.finalValue.amount)}}</strong> ({{project.completion.finalValue.currency ? project.completion.finalValue.currency : 'MXN'}})</p>
            </div>
          </div>
          <!--fase-->
          <div class="row">
            <div class="col-12">
              <div class="ia_separator bottom"></div>
            </div>
            <div class="col-3">
              <div class="ia_box_icon _purple">
                <fechatermino-svg />
              </div>
            </div>
            <div class="col-9">
              <p class="pt-3"> <strong>Finalización del proyecto</strong></p>
            </div>
            </div>
          </div>
        <!--box ends-->
        </div>
      </div>

      <!-- completed-->
      <div v-if="project.status == 'completed'">
      <!--fecha de inicio-->
      <div class="col">
        <!--fecha-->
        <div class="row">
          <div class="col">
            <p class="text-center ia_timeline_date"><span class="_svg"><periodo-svg /> </span> {{getDate(project.period.endDate)}}</p>
          </div>
        </div>
        <!--box-->
        <div class="ai_box_item tender ia_timeline_box">
            <!--title-->
          <div class="row mt-0 pt-3 mb-0 pb-0">
            <div class="col">
              <h5>Cierre administrativo</h5>
              <p>{{project.title}}</p>
            </div>
          </div>
          <!--fase-->
          <div class="row">
            <div class="col-12">
              <div class="ia_separator bottom"></div>
            </div>
            <div class="col-3">
              <div class="ia_box_icon _purple">
                <terminado-svg />
              </div>
            </div>
            <div class="col-9">
              <p class="pt-3"> <strong>Proyecto terminado</strong></p>
            </div>
            </div>
          </div>
        <!--box ends-->
        </div>
      </div>

    </div>
    <!--siema ends-->
  </div>
</template>
