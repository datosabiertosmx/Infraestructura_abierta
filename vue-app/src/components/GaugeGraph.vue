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
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      let svg = d3.select(this.$el.querySelector('svg'))
                  .append('g').attr('transform', `translate(200, 200)`),
          slices       = Array(10).fill(10),
          arcGenerator = d3.arc().innerRadius(130).outerRadius(150),
          pieGenerator = d3.pie().startAngle(-.7 * Math.PI).endAngle(.7 * Math.PI),
          data         = pieGenerator(slices);

      svg.selectAll('slices')
         .data(data)
         .enter()
         .append('path')
         .attr('d', arcGenerator)
         .attr('fill', (d, i) => {
          if(i < 3) return 'red';
          if(i < 7) return 'orange';
          return 'green';
         })
         .attr('stroke', 'white')
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
   <svg width="400" height="400">
     <circle cx="200" cy="200" r="20" fill="black" />
     <polygon points="0 0, 8 0, 4 200" fill="black" transform="translate(196, 120) rotate(120 4 80)" />
   </svg> 
  </div>
</template>