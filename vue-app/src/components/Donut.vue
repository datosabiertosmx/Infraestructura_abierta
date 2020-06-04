<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  let d3 = Object.assign({}, require("d3-selection"), require("d3-shape"));
	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['data'],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
		data(){
      return {
        // el radio de la gráfica
        outerRadius : 150,
        // el radio del bújero
        innerRadius : 90,
        // el color del texto
        text : "white",
        // los colores de cada segmento
        //colors : ["#5232c2","#6C49B8", "#4F86C6", "#4FB0C6","#038bbb", "#30F2F2", "#30bcc5"],

        items : null,
        arc : null
      }
    },

    methods : {
      showpopup(data, event){
        let html = `
          <h4>${this.$store.getters.translate(data.data.type)[0]}</h4>
          <p>${data.data.value}</p>
        `,

        settings = {html, event}
        this.$store.commit("showPopup",settings);
      },

      hidepopup(){
        this.$store.commit("hidePopup");
      },
      updatepopup(data, event){
        this.$store.commit("updatePopup", event)
      }
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      let pie = d3.pie().value(d => d.value),
          arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius),
          data = pie(this.data);

      this.items = data;
      this.arc = arc;
    },

    computed : {
      colors(){
        return this.$store.state.colors;
      }
    },

    watch: { 
        data: function(newVal, oldVal) { // watch it
          let pie = d3.pie().value(d => d.value),
          arc = d3.arc().innerRadius(this.innerRadius).outerRadius(this.outerRadius),
          data = pie(newVal);
          this.items = data;
          this.arc = arc;
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
    <svg :width="outerRadius*2" :height="outerRadius*2">
      <g :transform="`translate(${outerRadius}, ${outerRadius})`">
        <path v-for="(item, i) in items"
           v-on:mouseover="showpopup(item, $event)"
           v-on:mouseout="hidepopup"
           v-on:mousemove="updatepopup(item, $event)"
           :d="arc(item)"
           :fill="colors[i]"
           :key="i + '-slice'" />

        <g v-for="(item, i) in items" :key="i + '-d-labels'">
          <text v-if="item.value" :transform="`translate(${arc.centroid(item)})`" :fill="text">
            {{item.value}}
          </text>
        </g>
      </g>
    </svg>
  </div>
</template>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ DEFINE EL ESTILO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
