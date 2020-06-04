<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import VueCsvDownloader from 'vue-csv-downloader';
  // SVG
	import ProyectoSvg from "../svg/proyecto-svg.vue";
	import TimeSvg from "../svg/icons/time_svg.vue";
	import PeriodoSvg from "../svg/icons/periodo_svg.vue";
	/// SECTOR
	import AguaSvg from "../svg/sectores/agua-svg.vue";
	import AlumbradoSvg from "../svg/sectores/alumbradopublico-svg.vue";
	import ComunicacionesSvg from "../svg/sectores/comunicaciones-svg.vue";
	import CulturaSvg from "../svg/sectores/cultura-svg.vue";
	import DesarrolloagropecuarioSvg from "../svg/sectores/desarrolloagropecuario-svg.vue";
	import DesarrollosocialSvg from "../svg/sectores/desarrollosocial-svg.vue";
	import DrenajepluvialSvg from "../svg/sectores/drenajepluvial-svg.vue";
	import DrenajesanitarioSvg from "../svg/sectores/drenajesanitario-svg.vue";
	import EducacionSvg from "../svg/sectores/educacion-svg.vue";
	import EnergiaSvg from "../svg/sectores/energia-svg.vue";
	import HabitacionalSvg from "../svg/sectores/habitacional-svg.vue";
	import PavimentacionSvg from "../svg/sectores/pavimentacion-svg.vue";
	import PuentesycaminosSvg from "../svg/sectores/puentesycaminos-svg.vue";
	import ResiduosSvg from "../svg/sectores/residuos-svg.vue";
	import SaludSvg from "../svg/sectores/salud-svg.vue";
	import SeguridadpublicaSvg from "../svg/sectores/seguridadpublica-svg.vue";
	import TransporteSvg from "../svg/sectores/transporte-svg.vue";
	import TurismoSvg from "../svg/sectores/turismo-svg.vue";
	import VialidadesSvg from "../svg/sectores/vialidades-svg.vue";
	// TIPO
	import AmpliacionSvg from "../svg/tipo-proyectos/ampliacion-svg.vue";
	import ConstruccionSvg from "../svg/tipo-proyectos/construccion-svg.vue";
	import RehabilitacionSvg from "../svg/tipo-proyectos/rehabilitacion-svg.vue";
	import SustitucionSvg from "../svg/tipo-proyectos/sustitucion-svg.vue";
	// Fases proyecto
	import CompletadoSvg from "../svg/fases-proyecto/completado-svg.vue";
	import DesignSvg from "../svg/fases-proyecto/design-svg.vue";
	import FaseconstruccionSvg from "../svg/fases-proyecto/faseconstruccion-svg.vue";
  import IdentificacionSvg from "../svg/estatus-proyecto/identificacion-svg.vue";
  import PreparacionSvg from "../svg/estatus-proyecto/preparation-svg.vue";
  import ImplementacionSvg from "../svg/estatus-proyecto/implementacion-svg.vue";
  import TerminacionSvg from "../svg/estatus-proyecto/terminacion-svg.vue";
  import TerminadoSvg from "../svg/estatus-proyecto/completado-svg.vue";
  import CanceladoSvg from "../svg/estatus-proyecto/cancelado-svg.vue";

	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
		props : ['project'],

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
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  traduce una etiqueta del edca
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      translate(labels){
        return this.$store.getters.translate(labels).join(", ");
      }
    },

		mounted(){
      let button = document.querySelector(".get-json");
      this.$store.getters.enableJSONbutton(this.project, button, this.project.id, "proyecto");
		},

    computed : {
      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.project);
      },

      amounts(){
        return this.$store.getters.ProjectAmounts(this.project.id);
      },

      institution(){
        let buyer = this.project.parties.find(p => p.roles.indexOf("buyer") == -1 ),
            proc  = this.project.parties.find(p =>p.roles.indexOf("procuringEntity") == -1 );

        return buyer || proc;
      },

      sector(){
        return this.translate(this.project.sector);
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      /// svg
      ProyectoSvg,
      TimeSvg,
      PeriodoSvg,
      // SECTOR
      AguaSvg,
      AlumbradoSvg,
      ComunicacionesSvg,
      CulturaSvg,
      DesarrolloagropecuarioSvg,
      DesarrollosocialSvg,
      DrenajepluvialSvg,
      DrenajesanitarioSvg,
      EducacionSvg,
      EnergiaSvg,
      HabitacionalSvg,
      PavimentacionSvg,
      PuentesycaminosSvg,
      ResiduosSvg,
      SaludSvg,
      SeguridadpublicaSvg,
      TransporteSvg,
      TurismoSvg,
      VialidadesSvg,
      // TIPO
      AmpliacionSvg,
      ConstruccionSvg,
      RehabilitacionSvg,
      SustitucionSvg,
      // fases proyecto
      CompletadoSvg,
      DesignSvg,
      FaseconstruccionSvg,
      IdentificacionSvg,
      PreparacionSvg,
      ImplementacionSvg,
      TerminacionSvg,
      TerminadoSvg,
      CanceladoSvg
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
			<div class="col-sm-12 col-md-9 px-0">
				<p class="ai_box_top"><span class="ai_box_id">Identificador: {{project.id}}</span> <span class="ai_box_time"><time-svg /> Fecha de actualización: {{getDate(project.updated)}} </span></p>
				<div class="row">
					<div class="col-6 col-sm-6 col-md-2 mb-2">
						<div class="ia_box_icon purple">
						<proyecto-svg />
						</div>
						<h5 class="ia_label_item">Proyecto</h5>
					</div>
					<div class="col-6 col-sm-6 col-md-2 mb-2  mobile">
						<div class="ia_box_icon">
						<design-svg />
						</div>
						<h5 class="ia_label_item">{{project.status}}</h5>
					</div>
					<div class="col-sm-12 col-md-8">
						<h2><router-link :to="`/proyecto/${project.id}`">{{project.title}}</router-link></h2>
						<div class="ia_separator bottom"></div>
							<h5 class="ia_box_inst">
                <router-link :to="'/institucion/' + institution.id">
                  {{institution.name}}
                </router-link>
              </h5>
						<div class="row">
							<div class="col-sm-4 px-0">
								<h6 class="ai_label_box">SECTOR</h6>
                <p><span class="ai_box_link" v-if="project.sector.length">
                  <span v-if="project.sector[0] == 'water'"><agua-svg /></span>
                  <span v-if="project.sector[0] == 'lighting'"><alumbrado-svg /></span>
                  <span v-if="project.sector[0] == 'communications'"><comunicaciones-svg /></span>
                  <span v-if="project.sector[0] == 'culture'"><cultura-svg /></span>
                  <span v-if="project.sector[0] == 'agricultural development'"><desarrolloagropecuario-svg /></span>
                  <span v-if="project.sector[0] == 'social development'"><desarrollosocial-svg /></span>
                  <span v-if="project.sector[0] == 'storm drain'"><drenajepluvial-svg /></span>
                  <span v-if="project.sector[0] == 'sanitary drainage'"><drenajesanitario-svg /></span>
                  <span v-if="project.sector[0] == 'education'"><educacion-svg /></span>
                  <span v-if="project.sector[0] == 'energy'"><energia-svg /></span>
                  <span v-if="project.sector[0] == 'housing'"><habitacional-svg /></span>
                  <span v-if="project.sector[0] == 'paving'"><pavimentacion-svg /></span>
                  <span v-if="project.sector[0] == 'bridges and roads'"><puentesycaminos-svg /></span>
                  <span v-if="project.sector[0] == 'waste'"><residuos-svg /></span>
                  <span v-if="project.sector[0] == 'health'"><salud-svg /></span>
                  <span v-if="project.sector[0] == 'public security'"><seguridadpublica-svg /></span>
                  <span v-if="project.sector[0] == 'transport'"><transporte-svg /></span>
                  <span v-if="project.sector[0] == 'tourism'"><turismo-svg /></span>
                  <span v-if="project.sector[0] == 'roads'"><vialidades-svg /></span>
                  {{sector}}</span></p>
							</div>
							<div class="col-sm-4 px-0">
								<h6 class="ai_label_box">TIPO</h6>
                <p><span class="ai_box_link">
                  <span v-if="project.type == 'substitution'"><sustitucion-svg /></span>
                  <span v-if="project.type == 'rehabilitation'"><rehabilitacion-svg /></span>
                  <span v-if="project.type == 'extension'"><ampliacion-svg /></span>
                  <span v-if="project.type == 'construction'"><construccion-svg /></span>
                  {{translate(project.type)}}</span></p>
							</div>
							<div class="col-sm-4 px-0">
								<h6 class="ai_label_box">Período</h6>
								<p><span class="ai_box_link not_link"><periodo-svg /> {{getDate(project.period.startDate)}} - {{getDate(project.period.endDate)}}</span></p>
							</div>
						</div>
					</div>
					<div class="col-sm-2 mb-2  no-mobile">
						<div class="ia_box_icon">
              <span v-if="project.status == 'identification'"><identificacion-svg /></span>
              <span v-if="project.status == 'preparation'"><preparacion-svg /></span>
              <span v-if="project.status == 'implementation'"><implementacion-svg /></span>
              <span v-if="project.status == 'completion'"><terminacion-svg /></span>
              <span v-if="project.status == 'completed'"><terminado-svg /></span>
              <span v-if="project.status == 'cancelled'"><cancelado-svg /></span>
						</div>
						<h5 class="ia_label_item">{{translate(project.status)}}</h5>
					</div>
				</div>
			</div>
			<div class="col-sm-12 col-md-3 px-0 ai_box_amount">
				<p class="ai_label_box title">Monto ejercido</p>
				<h3>${{format(amounts.executed)}}
					<span class="currency">MXN</span>
				</h3>
				<div class="ai_dw">
				<p class="ai_label_box download">Descargar</p>
				<ul class="ai_box_download">
					<!--<li><a href="#">PDF</a></li>-->
					<li>
            <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'proyecto-' + project.id">CSV</vue-csv-downloader>
          </li>
					<li><a href="#" class="get-json">JSON</a></li>
				</ul>
			</div>
			</div>
		</div>
<!---<pre>{{project}}</pre>-->
  </div>
</template>
