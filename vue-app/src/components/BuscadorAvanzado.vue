<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
	export default{
		data(){
			return {
				str : "",
				period : "",
				status_ : "",
				sectorList : [],
				typeList : [],

			}
		},

		methods : {
			submit(){
				let query = {};

				if(this.str) query.str                   = this.str;
				if(this.period) query.period             = this.period;
				if(this.status_) query.status            = this.status_;
				if(this.sectorList.length) query.sectors = this.sectorList;
				if(this.typeList.length) query.types     = this.typeList;

				this.$router.push({ path: 'busqueda', query })
			}
		},

		computed : {
			sectors(){
				return this.$store.getters.ProjectSectors;
			},

			types(){
				return this.$store.getters.ProjectTypes;
			},

			status(){
				return this.$store.getters.ProjectStatus;
			},

			periods(){
				return this.$store.getters.ProjectPeriods;
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
		<div class="ia_form_hm ia_form_global">
		<form @submit="submit">
			<div class="row">
				<div class="col-sm-4 offset-sm-1 mbb-4">
					<input type="text" placeholder="Buscar palabra clave" class="ia_search sm_i" v-model="str">
					<button type="submit" class="sm_i" v-on:click.prevent="submit"><i class="ia_search_i"></i></button>
				</div>
				<div class="col-sm-3">
					<select class="ia_select_hm" v-model="status_">
						<option value="">Todos los proyectos</option>
						<option v-for="(st, i) in status" :key="i + '_status'" :value="st.tag">
							{{st.name}}
						</option>
					</select>
				</div>
				<div class="col-sm-3">
					<select class="ia_select_hm" v-model="period">
						<option value="">Todos los períodos</option>
						<option v-for="(pr, i) in periods" :key="i + '_periods'" :value="pr">
							{{pr}}
						</option>
					</select>
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-sm-10 offset-sm-1">
				<div class="ia_box_labels">
					<div class="row">
						<div class="col-sm-1">
							<h5>SECTOR</h5>
						</div>
						<div class="col-sm-10">
									<label class="ia_checkbox_container" v-for="(sector, i) in sectors" :key="i + '_sector'">
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
						<div class="col-sm-1">
							<h5>TIPO</h5>
						</div>
						<div class="col-sm-10">
									<label class="ia_checkbox_container" v-for="(type, i) in types" :key="i + '_type'">
										<input type="checkbox" :value="type.tag" v-model="typeList">
										<span class="ia_checkbox_checkmark"></span>
										<span class="ia_checkbox_text">{{type.name}}</span>
									</label>
									


						</div>
					</div><!-- row ends-->
				</div>
			</div>
			</div>
			</form>
			</div>
	</div>
</template>
