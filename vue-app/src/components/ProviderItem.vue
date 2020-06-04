<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import VueCsvDownloader from 'vue-csv-downloader';
  // SVG
  import ContratistaSvg from "../svg/contratistas-svg.vue";
  export default{
    props : ['provider'],

    methods : {
      money(amount){
        return this.$store.getters.formatNumber(amount);
      },
      translate(labels){
        return this.$store.getters.translate(labels).join(", ");
      }
    },

    mounted(){
      let button = this.$el.querySelector('.get-json'),
          json   = this.provider;

      this.$store.getters.enableJSONbutton(json, button, json.id, "proveedor");
    },

    computed : {
      makeCSVobject(){
        return this.$store.getters.makeCSVobject(this.provider);
      },

      sectors(){
        return this.translate(this.$store.getters.ProviderSectors(this.provider));
      },

      contractsAmount(){
        // return this.$store.getters.providerContractAwardsAmount(this.awards);
        //console.log("contracts:", this.contracts.map(c => c.contracts ).flat());

        //console.log( this.provider.ContractsAsSupplier );
        let con = this.provider.ContractsAsSupplier.map(c => c.contracts ).flat()
        return this.$store.getters.providerContractAwardsAmount(con);
      },
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      VueCsvDownloader,
      /// svg
      ContratistaSvg,
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
  <!-- box-->
  <div class="ai_box_item">
    <div class="row">
      <div class="col-sm-12 col-md-8 col-lg-9 px-0">
        <p class="ai_box_top">
          <span v-if="provider.identifier.scheme == 'RFC'" class="ai_box_id">RFC: <strong>{{provider.identifier.id}}</strong></span></p>
        <div class="row">
					<div class="col col-sm-2 mb-4">
						<div class="ia_box_icon purple">
						<contratista-svg />
						</div>
						<h5 class="ia_label_item">Contratista</h5>
					</div>
					<div class="col-sm-10 col-md-10 col-lg-8">
						<h2><router-link :to="`/contratista/${provider.id}`">{{provider.name}}</router-link></h2>
						<div class="ia_separator bottom"></div>
						<div class="row">
							<div class="col-sm-4 px-0">
								<h6 class="ai_label_box">URL</h6>
								<p><a :href="`${provider.identifier.uri}`" class="ai_box_link">{{provider.identifier.uri}}</a></p>
							</div>
              <div class="col-sm-4 px-0">
								<h6 class="ai_label_box">Localidad</h6>
								<p><span class="ai_box_link not_link">{{provider.address.locality}}</span><br>
                <span class="ai_box_link not_link">{{provider.address.postalCode}}</span></p>
							</div>
              <div class="col-sm-4 px-0">
								<h6 class="ai_label_box">Sector</h6>
								<p><span class="ai_box_link not_link">{{sectors ? sectors : "Sin información"}}</span></p>
							</div>

						</div>
					</div>

					<div class="col-2">

						<p class="ia_amount_section center">{{provider.awards}}</p>
						<h5 class="ia_label_item">Adjudicaciones</h5>
					</div>
				</div>
      </div>
      <div class="col-sm-12 col-md-4 col-lg-3 px-0 ai_box_amount">
        <p class="ai_label_box title">Monto adjudicado</p>
        <h3>${{money(contractsAmount)}}
            <span class="currency">MXN</span>
        </h3>
        <div class="ai_dw">
          <p class="ai_label_box download">Descargar</p>
          <ul class="ai_box_download">
        <!--  <li><a href="#">PDF</a></li>-->
          <li>
            <vue-csv-downloader
                 :data="[makeCSVobject]"
                 :download-name="'proveedor-' + provider.id">CSV</vue-csv-downloader>
          </li>
          <li><a href="#" class="get-json">JSON</a></li>
          </ul>
        </div>
      </div>
    </div>

  </div>

</template>
