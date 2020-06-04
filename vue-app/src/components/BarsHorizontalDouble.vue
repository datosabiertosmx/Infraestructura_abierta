<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
	import ProyectoSvg from "../svg/proyecto-svg.vue";
	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
		props : ["data"],

		/*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
			/// svg
			ProyectoSvg,
		},
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        colors     : ["#1182f2", "#5232c2"],
        textColors : ["#5232c2", "#1182f2"]
      }
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
    <!-- el contenedor de la gráfica -->
    <div>
      <div v-for="(d, i) in data" class="row mb-3" v-bind:key="`bar-${i}`">
        <!-- la etiqueta -->
        <div class="col-3">
					<div class="row">
						<div class="col-3">
							<div class="ia_svg purple"><proyecto-svg /></div>
						</div>
						<div class="col-9">
							<p class="ia_bars_label">{{d.label}}</p>
						</div>
					</div>
				</div>

        <!-- las barras -->
        <div class="col">
          <div v-for="(b, j) in d.values"
               class="ia_hbar"
               v-bind:key="`bar-${i}-${j}`"
               :style="{background : colors[j], width : b + '%'}">
               <p :style="{color : textColors[j]}">{{d.labels[j]}}</p>
          </div>
        </div>
				<div class="col-12 pt-4">
					<div class="ia_separator bottom"></div>
				</div>
      </div>
    </div>
  </div>
</template>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ DEFINE EL ESTILO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<style scoped>

</style>
