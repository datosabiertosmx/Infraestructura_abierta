<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  let d3 = Object.assign({}, require("d3-selection"), require("d3-shape"), require("d3-scale"));

  export default {
    props : ["percent", "title"],

    data(){
      return {
        width  : 250,
        height : 250,
        spineColor : "#bdb7b7",
        contentColor : "#5edbe1",
        contentArcRange : [0, 360],
        dummyPercent : 50,
        dummyTitle : "porcentaje de cosas graficadas"
      }
    },

    methods : {
      degrees(percent){
        return this.scale(percent);
      }
    },

    mounted(){

    },

    computed : {
      svg(){
        return d3.select(this.$el.querySelector('svg'))
                  .append('g').attr('transform', `translate(${this.width/2}, ${this.height/2})`);
      },

      baseArc(){
       let arc = d3.arc()
                   .innerRadius(80) //140
                   .outerRadius(90) //160
                   .startAngle(0)
                   .endAngle(Math.PI * 2);

        return arc();
      },

      contentArc(){
        // 90 * Math.PI / 180
        let arc = d3.arc()
                   .innerRadius(70) //130
                   .outerRadius(100) //170
                   .startAngle( (this.degrees(0) + 180) * Math.PI / 180 )
                   .endAngle( (this.degrees(this.percent) + 180 )    * Math.PI / 180 );

        return arc();
      },

      scale(){
        return d3.scaleLinear().domain([0, 100]).range(this.contentArcRange);
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
    <svg :width="width" :height="height" class="shadow">
      <!-- qué cosa más rara para los filtros o__o -->
      <defs>
        <filter id="f2" x="0" y="0" width="200%" height="200%">
          <feOffset result="offOut" in="SourceGraphic" dx="10" dy="10" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="20" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>

      <path :d="baseArc" :fill="spineColor" :transform="`translate(${this.width/2}, ${this.height/2})`" filter="url(#f2)" />
      <path :d="contentArc" :fill="contentColor" :transform="`translate(${this.width/2}, ${this.height/2})`" />
    </svg>
    <h4 class="ia_donut_percent">{{percent}}%</h4>
  </div>
</template>
