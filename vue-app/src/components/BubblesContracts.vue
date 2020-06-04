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
        maxRadius : 70,

      }
    },

    methods : {

      budget(item){
        let state = this.$store.getters.contractState(item),
            getters = this.$store.getters;

        if(state >= 4){
           return getters.contractTotalBudget(item.contracts);
        }

        else if(state == 3){
           return getters.contractTotalBudget(item.awards);
        }
        else{
          return 0;
        }
      },

      mapItems(){

        return this.contracts.map(p => {
          return {
            budget : p.budget,
            //status : p.status,
            //sectors : p.sectors,
            //awards : p.awards,
            title  : p.title,
            r      : this.scale( p.budget ),
            x      : this.width / 2,
            y      : this.height / 2,
            color  : "#796de8",
            stroke : "#5232c2",
            id     : p.id,
            url    : {path : `/${this.baseurl}/${p[this.idurl]}`  }
          }
        });
      },

      showpopup(data, event){
        let html = `
          <h4>${data.title}</h4>
          <p>Monto adjudicado: <strong>\$${this.format(data.budget)}</strong></p>
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
      this.nodes = this.mapItems(this.contracts);
      this.force = d3.forceSimulation(this.nodes)
                     .velocityDecay(0.6)
                     .force("charge", d3.forceManyBody().strength(8))
                     .force("collide", d3.forceCollide().radius(function(d) { return d.r + 1; }));

    },

    computed : {
      scale(){
        return d3.scaleLinear()
                 .domain([0, d3.max(this.contracts, d => d.budget)])
                 .range([this.minRadius, this.maxRadius]);
      },

      contracts(){
        if(!this.items) return [];

        return this.items.map( contract => {
          return {
            title   : contract.tender.description,
            //status  : contract.status,
            //awards  : contract.awards,
            budget  : this.budget(contract),
            id      : contract.ocid,
            ocid      : contract.ocid,
            //sectors : contract.sectors
          }
        });
      },
    },

    watch: {
      items: function(/*newVal, oldVal */) { // watch it
        //let visible = newVal.map(p => p.id);

        this.nodes = this.mapItems(this.contracts);
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
