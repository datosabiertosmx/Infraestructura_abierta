<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////

  ‼️ NOTAS:
  * qué es eso de calificación general del proveedor
  * a qué se refiera la gráfica de relaciones
  * de dónde sale la "región"?
  * type en contactPoint existe?
-->
<script>
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import RelationGraphProvider from "../components/RelationGraphProvider.vue";
  import ContractItem from "../components/ContractItem.vue";
  import TablaSimple from "../components/TablaSimple.vue";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";

  //// _svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import EmailSvg from "../svg/icons/email-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import PhoneSvg from "../svg/icons/telefono-svg.vue";
  import UbicacionSvg from "../svg/icons/ubicacion-svg.vue";
  import UrlSvg from "../svg/icons/url-svg.vue";

  export default{
    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      getDate(date){
        let d = this.$store.getters.getDateObject(date);
        return d;
      },
      format(num){
        return this.$store.getters.formatNumber(num);
      },
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  traduce una etiqueta del edca
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      translate(labels){
        return this.$store.getters.translate(labels).join(", ");
      },
    },

    /*
     * C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa la lista de proveedores (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      provider(){
        return this.$store.getters.Provider(this.$route.params.id);
      },

      awards(){
        return this.$store.getters.providerContractAwards(this.provider);
      },

      contractsAmount(){
        // return this.$store.getters.providerContractAwardsAmount(this.awards);
        //console.log("contracts:", this.contracts.map(c => c.contracts ).flat());
        let con = this.contracts.map(c => c.awards /*c.contracts*/ ).flat();
         return this.$store.getters.providerContractAwardsAmount(con);
      },

      sectors(){
        return this.translate(this.$store.getters.ProviderSectors(this.provider));
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa los procesosde contratación en los
      /  que participa (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      contracts(){
        return this.$store.getters.ContractsAsSupplier(this.provider);
      },

      institutions(){
        let institutions =  this.contracts.map(contract => {
          return this.$store.getters.ContractInstitutions(contract);
        });

        return [...new Set(institutions)]
      },

      location(){
        return window.location.href;
      }


    },

    /*
     * C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      TablaSimple,
      BuscadorAvanzado,
      ContractItem,
      RelationGraphProvider,
      VerGlosario,
      ///_svg
      ContratacionesSvg,
      MoneySvg,
      UbicacionSvg,
      EmailSvg,
      PhoneSvg,
      UrlSvg,
      SocialSharing
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

    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li><router-link :to="`/contratistas`">  Contratistas</router-link></li>
      <li v-if="provider">{{provider.name}}</li>
      <li v-else>No se encontró contratista</li>
    </ul>
    <div v-if="provider">
      <div class="ai_social_sharing">
      <social-sharing :url="location"
                      :title="provider.name"
                      description=""
                      quote=""
                      hashtags="InfraestructuraAbierta"
                      inline-template>
         <!-- twitter-user="vuejs"-->
         <div>

           <network network="facebook">
             <span class="sm fb">Facebook</span>
           </network>
          <network network="twitter">
            <span class="sm tw">Twitter</span>
            </network>
          <network network="telegram">
            <span class="sm tl">Telegram</span>
          </network>
        </div>
      </social-sharing>
      </div>
      <section class="ia_hero">
        <div class="ia_pjid">
          <p>RFC: <strong>{{provider.identifier.id}}</strong></p>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-lg-6 mb-4">
              <h1 class="ia_title_hm profile mb-3 pb-3">{{provider.name}}</h1>
              <p><strong>Contacto:</strong> {{provider.contactPoint.name}} <br>
                <strong>Dirección:</strong>
                {{provider.address.streetAddress ? provider.address.streetAddress + ', ' : ''}} {{provider.address.locality ?  provider.address.locality +', ' : ''}}
                {{provider.address.region ?  provider.address.region + ', '  : ''}}
                {{provider.address.postalCode ? 'C.P.  ' + provider.address.postalCode + ', '  : ''}} {{provider.address.countryName}}
              </p>
              <p><strong>Sector:</strong> {{sectors ? sectors : "Sin información"}}</p>
            </div>
            <div class="col text-center">
              <div class="ia_svg white w_30">
              <money-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">${{format(contractsAmount)}}</h3>
              <p>Monto Recibido</p>
            </div>
            <div class="col text-center">
              <div class="ia_svg white w_30">
              <contrataciones-svg />
              </div>
              <h3 class="ia_amount_section white mb-1">{{awards.length}}</h3>
              <p>Contratos</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <div class="row">
            <!-- CORREO ELECTRÓNICO-->
            <div class="col col-sm-6 col-md-6 col-lg-4 text-center">
                <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Correo Electrónico</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <email-svg />
                </div>
                <p class="ia_amount_section">
                  <span class="ia_currency _gray">{{provider.contactPoint.email}}</span>
                </p>

            </div>
            <!-- TELÉFONO-->
            <div class="col col-md-6 col-lg-4 text-center">
                <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Teléfono</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <phone-svg />
                </div>
                <p class="ia_amount_section"><span class="ia_currency _gray">{{provider.contactPoint.telephone}}</span></p>

            </div>
            <!-- URL-->
            <div class="col col-md-6 col-lg-4 text-center">
                <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Web</span></p>
                <div class="ia_svg h_25 w_20 min">
                  <url-svg />
                </div>
                <p class="ia_amount_section">
                  <span class="ia_currency _gray" v-if="provider.identifier.uri">
                    <a :href="`${provider.identifier.uri}`">{{provider.identifier.uri}}</a>
                  </span>
                  <span class="ia_currency _gray" v-else>
                    Sin dato
                  </span>
                </p>

            </div>
          </div>

          <!-- mapa de relaciones-->
          <div class="row mt-4 pt-4 mb-4 pb-4">
            <div class="col">
            <h2>Mapa de relaciones</h2>
            <ul class="ia_bars_color_guide mt-4 pt-4">
              <li><b class="ia_color_guide_circle second"></b> <strong>Contratista</strong> </li>
              <li><b class="ia_color_guide_circle contract"></b> <strong>Contratación</strong></li>
              <li><b class="ia_color_guide_circle"></b> <strong>Institución</strong> </li>
            </ul>
            <relation-graph-provider :institutions="institutions" :contracts="contracts" :provider="provider" />
            </div>
          </div>

          <div class="row mt-4 mb-4">
            <div class="col">
              <div class="ia_separator bottom"></div>
            </div>
          </div>

        <!-- Contrataciones en las que participa-->
        <div class="row mt-4 mb-4">
          <div class="col">
            <h2>Contrataciones en las que participa</h2>
            <form class="form">
              <div class="ia_form_hm ia_form_global">
                <div class="row">
                  <div class="col">
                    <input type="text" placeholder="Buscar palabra clave" class="ia_search sm_i">
                    <button type="submit" class="sm_i"><i class="ia_search_i"></i></button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- ❇️ la lista de contrataciones -->
        <contract-item v-for="(contract, key) in contracts" :key="key" :data="contract" />

        <!--
        ////////////////////////////////////////////////////////////////////////////////
        ⭐ Descargar masiva
        ////////////////////////////////////////////////////////////////////////////////
        -->
        <div class="row">
          <div class="col">
            <div class="mt-4 pt-4">
              <div class="ia_download_items mt-4">
                <div class="row">
                  <div class="col-sm-10">
                    <p class="text-right">Descargar información del contratista</p>
                  </div>

                  <div class="col col-sm-2  pl-0">
                    <a href="#">JSON</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div><!--container ends-->

      </section>

    </div>


    <!-- glosrio-->
    <ver-glosario />

  </div>
</template>
