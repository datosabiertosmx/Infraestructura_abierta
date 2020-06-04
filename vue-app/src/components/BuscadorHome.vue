<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import L from "leaflet";

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl : require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl       : require('leaflet/dist/images/marker-icon.png'),
    shadowUrl     : require('leaflet/dist/images/marker-shadow.png')
  });

	export default{
		/*
		 * 👾 D A T A
		 * ----------------------------------------------------------------------
		 */
		data(){
			return {
				showFilter : 1,
				str     : "",
				type    : "",
				city    : "",
				colonia : "",
				sectorList : [],
				typeList : [],
				// leaflet
				map         : null,
				group       : null,
				basePoint   : [25, -99],
				tileServer  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        //"https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png",
				//"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
				//"https://{s}.tile.openstreetmap.se/hydda/base/{z}/{x}/{y}.png",
        attribution : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        //'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}
		},

		methods : {
			updateMarkers(){
				if(this.group) this.map.removeLayer(this.group);
			  this.group = L.featureGroup(this.markers).addTo(this.map);
			  this.map.fitBounds(this.group.getBounds());
			},

      translate(labels){
        return this.$store.getters.translate(labels).join(", ");
      },

			format(num){
				return this.$store.getters.formatNumber(num);
			},

			makeMarkerPopup(project){
        let getters = this.$store.getters,
				        url = getters.makeURL("proyecto/" + project.id),
         _providers = this.$store.getters
                            .ProjectProviders(project.id),
          providers = _providers.map(p => {
            let url = getters.makeURL("contratista/" + p.id);
            return `<a href="${url}" class="ia_btn_map_provider">${p.name}</a>`;
          });

				return `
        <div class="row ia_pop_ficha">
          <div class="col-12">
				      <h4>${project.title}</h4>
          </div>
          <div class="col-6">
          <p><span>Monto</span> <strong>$${this.format(project.budget.amount.amount)}</strong>
          </p>
          </div>
          <div class="col-6">
          <p><span>ESTATUS</span> <strong>${this.translate(project.status)}</strong>
          </p>
          </div>
          <div class="col-6">
            <p><span>Sector</span> <strong>${this.translate(project.sector)}</strong></p>
          </div>
          <div class="col-6">
            <p><span>Tipo</span> <strong>${this.translate(project.type)}</strong></p>
          </div>
          <!--
          <div class="col-12">
            <p><span>${providers.length > 1 ? 'Proveedores' : 'Proveedor'}</span>  <strong>${providers}</strong></p>
          </div>-->
          <div class="col-12">
				      <a href="${url}" class="ia_btn_map">Ver proyecto</a>
          </div>
        </div>
				`;
			}
		},

		mounted(){
			document.getElementById("map").innerHTML = "";

			this.map = L.map('map', {
                   scrollWheelZoom: false
                 }).setView(this.basePoint, 13);

			L.tileLayer(this.tileServer, { attribution: this.attribution }).addTo(this.map);

			if(this.filteredLocations.length) this.updateMarkers();
		},

		updated(){
			this.updateMarkers();
		},


		computed : {
			sectors(){
				return this.$store.getters.ProjectSectors;
			},

			types(){
				return this.$store.getters.ProjectTypes;
			},

			cities(){
				return this.$store.getters.municipiosList;
			},

			status(){
				return this.$store.getters.ProjectStatus;
			},

			locations(){
				return this.$store.getters.locationsList;
			},

			filteredLocations(){
				let projects = this.$store.getters.ProjectsList,
				    ids;

				if(this.str) projects = this.$store.getters.simpleSearch(this.str, 'projects');

				// posible bug aquí abajo
				if(this.type) projects = projects.filter(p => p.status == this.type);

				if(this.city) projects = this.$store.getters.filterProjectsByCity(projects, this.city);

				if(this.sectorList.length){
          projects = projects.filter(p => {
            return this.sectorList.map(sector =>  p.sector.indexOf(sector) != -1 ).filter(s => s).length;
          });
        }

				if(this.typeList.length) projects = projects.filter(p => this.typeList.indexOf(p.type) != -1 );

				ids = projects.map(p => p.id);

				return this.locations.filter(loc =>  ids.indexOf(loc.project.id) != -1 );
			},

			markers(){
				return this.filteredLocations.map(loc => {
					let m = L.marker(loc.point);

					m.bindPopup( this.makeMarkerPopup(loc.project) );
					m.on('mouseover', function () {
            this.openPopup();
          });
          /*
          m.on('mouseout', function () {
            this.closePopup();
          });
          */

			 	  return m;
			  });
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

		<div class="ia_form_hm test ">

			<form>
				<div class="row">
					<div class="col-sm-3 mbb-4">
						<input type="text" placeholder="Buscar palabra clave" class="ia_search" v-model="str">
						<button type="submit"><i class="ia_search_i"></i></button>
					</div>
					<div class="col-sm-3">
						<select class="ia_select_hm" v-model="type">
							<option value="">Todos los proyectos</option>
							<option v-for="(status, i) in status" :value="status.tag" :key="i + '-status'">{{status.name}}</option>
						</select>
					</div>
					<div class="col-sm-3">
						<select class="ia_select_hm" v-model="city">
							<option value="">Todos los municipios</option>
							<option v-for="(city, i) in cities.list" :value="city" :key="i + '-city'">{{city}}</option>

						</select>
					</div>
					<div class="col-sm-3">
						<select class="ia_select_hm" disabled v-model="colonia">
							<option value="">Todas las colonias</option>
						</select>
					</div>
				</div>
			</form>
		</div>


		<div class="ia_map">
			<!--
			<iframe width="100%" height="710" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-120.36621093750001%2C14.519780046326085%2C-90.26367187500001%2C32.713355353177555&amp;layer=mapnik" ></iframe>
		-->
			<div id="map" style="width: 100%; height: 650px; background: grey;"></div>
		</div>
    <div class="ia_filtercontainer">
    <div class="ia_filters">
      <a href="#" class="ia_btn_filter" v-on:click.prevent="showFilter = !showFilter" >Filtrar por &darr;</a>
      <transition name="fade">
      <div class="ia_box_labels" v-if="showFilter">
        <div class="row">
          <div class="col-2 col-sm-1">
            <h5>SECTOR</h5>
          </div>
          <div class="col-10 col-sm-10">
                <label class="ia_checkbox_container" v-for="(sector, i) in sectors" :key="i + '_sector_b'">
                  <input type="checkbox" :value="sector.tag" v-model="sectorList">
                  <span class="ia_checkbox_checkmark"></span>
                  <span class="ia_checkbox_text">{{sector.name}}</span>
                </label>
          </div>
          <div class="col-12">
            <div class="ia_separator bottom"></div>
          </div>
        </div><!-- row ends-->

        <div class="row">
          <div class="col-2 col-sm-1">
            <h5>TIPO</h5>
          </div>
          <div class="col-10 col-sm-10">
                <label class="ia_checkbox_container" v-for="(type, i) in types" :key="i + '_type_b'">
                    <input type="checkbox" :value="type.tag" v-model="typeList">
                    <span class="ia_checkbox_checkmark"></span>
                    <span class="ia_checkbox_text">{{type.name}}</span>
                  </label>


          </div>
        </div><!-- row ends-->
      </div>

    </transition>
      </div>
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
<style>
@import '../../node_modules/leaflet/dist/leaflet.css';
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
