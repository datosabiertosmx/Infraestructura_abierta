<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  let d3 = Object.assign({}, require("d3-force"), require("d3-scale"), require("d3-array"), require("d3-selection"));

	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ['items', 'baseurl', 'idurl'],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // items
        force : null,
        nodes : [],

        // svg CONF
        width : 500,
        height : 500,

        // force CONF

        // items CONG
        minRadius : 0,
        maxRadius : 90,

      }
    },

    methods : {
      mapItems(){

        return this.projects.map(p => {
          return {
            budget : p.budget,
            status : p.status,
            title  : p.title,
            r      : this.scale(p.budget),
            x      : this.width / 2,
            y      : this.height / 2,
            color  : "#796de8",
            stroke : "#5232c2",
            id     : p.id,
            url    : {path : `${this.baseurl}/${p[this.idurl]}`  }
          }
        });
      },

      showpopup(data, event){
        let providers = this.$store.getters
                            .ProjectProviders(data.id).map(p => p.name)
        let html = `
          <h4>${data.title}</h4>
          <p>Monto ejercido: <strong>\$${this.format(data.budget)}</strong></p>
          <p>Etapa: <strong>${this.$store.getters.translate(data.status)}</strong></p>
          <p>${providers.length > 1 ? 'Proveedores' : 'Proveedor'} :
          <strong>${providers}</strong></p>
        `,

        settings = {html, event}
        this.$store.commit("showPopup",settings);
      },

      hidepopup(){
        this.$store.commit("hidePopup");
      },

      updatepopup(data, event){
        this.$store.commit("updatePopup", event)
      },

      gotoURL(data){
        this.$store.commit("hidePopup");
        this.$router.push(data.url);
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
      this.nodes = this.mapItems(this.projects);
      this.force = d3.forceSimulation(this.nodes)
                     .velocityDecay(0.6)
                     .force("charge", d3.forceManyBody().strength(8))
                     .force("collide", d3.forceCollide().radius(function(d) { return d.r + 1; }));

    },

    computed : {
      scale(){
        return d3.scaleLinear()
                 .domain([0, d3.max(this.projects, d => d.budget)])
                 .range([this.minRadius, this.maxRadius]);
      },

      projects(){
        if(!this.items) return [];

        return this.items.map( project => {
          return {
            title  : project.title,
            status : project.status,
            budget : this.$store.getters.ProjectAmounts(project.id).executed, //project.budget.amount.amount,
            id     : project.id
          }
        });
      },
    },

    watch: {
      items: function(/*newVal, oldVal */) { // watch it
        //let visible = newVal.map(p => p.id);

        this.nodes = this.mapItems(this.projects);
        this.force = d3.forceSimulation(this.nodes)
                     .velocityDecay(0.6)
                     .force("charge", d3.forceManyBody().strength(8))
                     .force("collide", d3.forceCollide().radius(function(d) { return d.r + 1; }));
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
    <svg width="auto" :height="height" :viewBox="`0 0 ${width} ${height}`">
      <circle v-for="(item, i) in nodes" :key="i+'-circle'"
             v-on:mouseover="showpopup(item, $event)"
             v-on:mouseout="hidepopup"
             v-on:mousemove="updatepopup(item, $event)"
             v-on:click="gotoURL(item)"
             :fill="item.color"
             :stroke="item.stroke"
             :r="item.r"
             :cx="item.x"
             :cy="item.y" />
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
