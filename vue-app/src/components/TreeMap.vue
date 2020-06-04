<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  let d3 = Object.assign({}, require("d3-hierarchy"));
	export default{
    props : ['data', 'title'],

    data(){
      return {
        colors : ["white", "#5232c2","#6C49B8", "#4F86C6", "#4FB0C6","#038bbb", "#30F2F2", "#30bcc5", "#C5E99B", "#8FBC94", "#548687", "#56445D"],
        width  : 900,
        height : 500,
        nodes  : []
      }
    },

    methods : {
      showpopup(data, event){
        if(!data.depth) return;

        let html = `
          <h4>${data.data.title}</h4>
          <p>\$${this.format(data.data.value)}</p>
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
        this.$router.push(data.data.url);
      },

      format(num){
        return this.$store.getters.formatNumber(num);
      },
    },

		mounted(){
      let treemap = d3.treemap().size([this.width, this.height]).padding(2).paddingOuter(10),
            data  = d3.hierarchy({
              name     : this.title,
              children : this.data
            });

      this.nodes = treemap(data.sum( d => d.value)).descendants();


    },

    computed : {
      popup(){
        return this.$store.getters.getPopupData;
      },

      labels(){
        return this.nodes.filter(n => n.depth)
      }
    }
  }
</script>

<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE EL TEMPLATE DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
  <div>
    <svg width="auto" :height="height" :viewBox="`0 0 ${width} ${height}`" class="svg_treemap">
    <!--<svg :width="width" :height="height" class="svg_treemap">-->
      <rect v-for="(rect, i) in nodes"
      v-on:mouseover="showpopup(rect, $event)"
      v-on:mouseout="hidepopup"
      v-on:mousemove="updatepopup(rect, $event)"
      v-on:click="gotoURL(rect)"
      :x="rect.x0" :y="rect.y0"
      :width="rect.x1 - rect.x0" :height="rect.y1 - rect.y0"
      :fill="colors[i]" :key="i + '-nodes'" />

      <!--<text v-for="(text, i) in nodes"
      v-on:mouseover="showpopup(text, $event)"
      v-on:mouseout="hidepopup"
      v-on:mousemove="updatepopup(text, $event)"
      v-on:click="gotoURL(text)"
      :x="text.x0 + 12" :y="text.y0 + 22"  class="labels"
      :key="i + '-labels'">
        {{text.data.name}}
      </text>-->

    </svg>

    <ul class="ia_bars_color_guide mt-2">
      <li v-for="(text, i) in labels" :key="i + '-lis'">
        <span class="ia_color_label" :style="{display : 'inline-block', background: colors[i+1], width: '1em', height: '1em'}"></span>
        <a href="#" v-on:click="gotoURL(text)"><strong>{{text.data.title}}</strong> <span class="ia_guide_label">(${{format(text.value)}})</span></a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .labels{
    fill : white;
  }
</style>
