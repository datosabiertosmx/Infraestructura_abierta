<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  const d3 = Object.assign({}, require("d3-force"));
  export default{

    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["institutions", "contracts", "provider"],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        items      : [],
        linesLv1   : [],
        linesLv2   : [],
        width      : 400,
        height     : 400,
        simulation : null,
        colors : ["#5232c2","#30bcc5", "#1182f2", "#4FB0C6", "#038bbb"],
      }
    },

    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      showpopup(data, event){
        let html = `
          <h4>${data.title}</h4>
          <p>(${data.type})</p>
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

      updateLines(){
        //console.log(this.items);
        this.linesLv1 = this.itemsLv1.map( item => {
          return {
            from : [item.x, item.y],
            to : [this.center.x, this.center.y]
          }
        });

        this.linesLv2 = this.itemsLv1.map(item => {
          //return [];

          let institution = this.itemsLv2.filter(sup => item.institutions.indexOf(sup.id) != -1 );

          return institution.map(sup => {
            return {
              from : [item.x, item.y],
              to : [sup.x, sup.y]
            }

          });
        }).flat();
      }
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      this.items   = [this.center, this.itemsLv1, this.itemsLv2].flat();

      this.simulation = d3.forceSimulation(this.items)
                          .force("charge", d3.forceManyBody().strength(10) )
                          .force("collide", d3.forceCollide().radius(function(d) { return d.r + 5 }) )

      this.simulation.on("tick", this.updateLines);
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      center(){
        return {
          title : this.provider.name,
          color : this.colors[0],
          x     : this.width/8,
          y     : this.height/2,
          r     : 50,
          type  : "provider"
        }
      },

      itemsLv1(){
        let pr = this.contracts,
            items = pr.map(p => {
              return {
                title : p.tender.description,
                color : this.colors[1],
                x     : this.width/2,
                y     : this.height/2,
                r     : 30,
                type  : "contract",
                id    : p.ocid,
                institutions : p.parties
                                .filter(pt => pt.roles.indexOf("buyer") != -1 ||
                                              pt.roles.indexOf("payer") != -1 ||
                                              pt.roles.indexOf("procuringEntity") != -1)
                                .map(pr => pr.id),
                url    : {path : `/contratacion/${p.ocid}`  }
              }
            });

        return items;
      },

      itemsLv2(){
        let pr = this.institutions,
            items = pr.map(p => {
              return {
                title : p.name,
                color : this.colors[2],
                x     : this.width/1,
                y     : this.height/2,
                r     : 15,
                type  : "institution",
                id    : p.id,
                url   : {path : `/institucion/${p.id}`  }
              }
            });

        return items;
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
  <div class="ia_bubbles_relation">
    <svg width="auto" :height="height" :viewBox="`0 0 ${width} ${height}`">

      <line v-for="(l, i) in linesLv1"
        :x1="l.from[0]"
        :y1="l.from[1]"
        :x2="l.to[0]"
        :y2="l.to[1]"
        :style="{'stroke':colors[1],'stroke-width':1.5}"
        :key="i + '-some-line'" />

      <line v-for="(l, i) in linesLv2"
        :x1="l.from[0]"
        :y1="l.from[1]"
        :x2="l.to[0]"
        :y2="l.to[1]"
        :style="{'stroke':colors[4],'stroke-width':1.5}"
        :key="i + '-some-line-b'" />

      <circle v-for="(item, i) in items" :key="i+'-circle'"
             v-on:mouseover="showpopup(item, $event)"
             v-on:mouseout="hidepopup"
             v-on:mousemove="updatepopup(item, $event)"
             v-on:click="gotoURL(item)"
             :r="item.r"
             :cx="item.x"
             :cy="item.y"
             :fill="item.color"  />
    </svg>
  </div>
</template>
