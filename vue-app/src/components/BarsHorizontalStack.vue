<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
	export default{
		/*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["data", "money"],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        //colors : ["#1182f2", "#5232c2", "#f25136", "#1182f2", "#5232c2", "#1182f2"],
      }
    },

    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      showpopup(data, event){
        let html = `
          <p>${this.money ? "$" : ""} ${this.format(data.value)}</p>
        `,

        settings = {html, event}
        this.$store.commit("showPopup",settings);
      },

      hidepopup(){
        this.$store.commit("hidePopup");
      },

      format(num){
        return this.$store.getters.formatNumber(num);
      }
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      items(){
        let elements = [];
        this.data.values.forEach( (d,i) => {
          if(d){
            elements.push({
              value : d.value,
              percent : d.percent,
              color : this.colors[i]
            });
          }
        });

        return elements;
      },

      colors(){
        return this.$store.state.colors;
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
    <div class="row">
        <div class="ia_stack-item"
             v-for="(d, i) in items"
             v-on:mouseover="showpopup(d, $event)"
             v-on:mouseout="hidepopup"
             :style="{background : d.color, width : d.percent + '%'}"
             v-bind:key="`stackitem-${i}`"><p>{{money ? "$" : ""}} {{format(d.value)}}</p></div>
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
  .stack-item{
    display: inline-block;
    height: 2em;
    color: white;
  }
</style>
