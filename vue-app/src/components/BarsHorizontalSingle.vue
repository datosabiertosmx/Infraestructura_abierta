<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
	export default{
		/*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["data", "color"],
		/*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      format(num){
        return this.$store.getters.formatNumber(num);
      },
    },
    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        colors : ["#1182f2"]
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
      <div v-for="(d, i) in data" class="row mb-3 mt-4" v-bind:key="`hbar-${i}`">
				<!-- la etiqueta -->
				<div class="col-3">
						<p class="ia_bars_label text-right">{{d.label}}</p>
				</div>
				<!-- las barras -->
        <div class="col">
          <div class="ia_hbar single" :style="{
            display: 'inline-block',
            background : colors[0],
            width : (d.percent > 100 ? 100 : d.percent) + '%'
          }"><p>{{format(d.value)}}</p></div>
        </div>
				<div class="col-12 pt-4">
					<div class="ia_separator bottom"></div>
				</div>
      </div>
  </div>
</template>
