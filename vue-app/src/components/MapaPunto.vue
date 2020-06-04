<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  // importa leaflet y se configura la ruta para el marker
  import L from "leaflet";

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["locations"],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
     data(){
      return {
        tileServer : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
     },

		/*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      /*
        por ahora solo tomará el primer punto. En la versión final,
        tomará todas las geometrías
      */
      let point = this.locations[0].geometry.coordinates,
          map   = L.map('map', {
            scrollWheelZoom: false
          }).setView(point, 13);

      L.tileLayer(this.tileServer, { attribution: this.attribution }).addTo(map);
      L.marker(point).addTo(map)
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
   <div id="map" style="width: 100%; height: 500px; background: grey;"></div>
  </div>
</template>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ DEFINE EL ESTILO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<style>
  @import '../../node_modules/leaflet/dist/leaflet.css';
</style>
