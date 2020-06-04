<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import RelationGraph from "../components/RelationGraphInstitution.vue";
  import ContractItem from "../components/ContractItem.vue";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";
  //// _svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import EmailSvg from "../svg/icons/email-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";
  import PhoneSvg from "../svg/icons/telefono-svg.vue";
  import ProyectoSvg from "../svg/proyecto-svg.vue";
  import UbicacionSvg from "../svg/icons/ubicacion-svg.vue";
  import UrlSvg from "../svg/icons/url-svg.vue";

  export default {
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
      /  regresa el proveedor (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      institution(){
        return this.$store.getters.getInstitution(this.$route.params.id);
      },

      projects(){
        return this.$store.getters.institutionProjects(this.institution);
      },

      providers(){
        return this.$store.getters.institutionProviders(this.institution);
      },

      contracts(){
        return this.$store.getters.institutionContracts(this.institution);
      },

      executedBudget(){
        let contracts = this.$store.getters.institutionContractsAsPayer(this.institution);
        return this.$store.getters.contractsExecutedBudget(contracts);
      },

      location(){
        return window.location.href;
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      BuscadorAvanzado,
      RelationGraph,
      ContractItem,
      VerGlosario,
      SocialSharing,
      ///_svg
      ContratacionesSvg,
      MoneySvg,
      UbicacionSvg,
      EmailSvg,
      PhoneSvg,
      UrlSvg,
      ProyectoSvg
    },
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL TEMPLATE DEL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
  -->
<template>
  <div>

    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li><router-link :to="`/instituciones`">  Instituciones</router-link></li>
      <li v-if="institution">{{institution.name}}</li>
      <li v-else>No se encontró institución</li>
    </ul>
  <div v-if="institution">
    <div class="ai_social_sharing">
    <social-sharing :url="location"
                    :title="institution.name"
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
        <p>RFC: <strong>{{institution.id}}</strong></p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-2">
            <h1 class="ia_title_hm profile mb-3 pb-3">{{institution.name}}</h1>
            <p><strong>Razón social:</strong> {{institution.identifier.legalName}}<br>
              <strong>Contacto:</strong> {{institution.contactPoint.name}}<br>
              <strong>Dirección:</strong> {{institution.address.streetAddress ? institution.address.streetAddress + ', ' : '' }}
              {{institution.address.locality ? institution.address.locality + ', ' : ''}}
              {{institution.address.region ?  institution.address.region + ', ': ''}}
              {{institution.address.postalCode ? 'C.P. ' + institution.address.postalCode  + ', ': ''}} <br>
              {{institution.address.countryName}}
            </p>
          </div>
          <div class="col-12 col-sm-4 text-center">
            <div class="ia_svg white w_30">
            <money-svg />
            </div>
            <h3 class="ia_amount_section white mb-1">${{format(executedBudget)}}</h3>
            <p>Monto Ejercido (MXN)</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg white w_30">
            <proyecto-svg />
            </div>
            <h3 class="ia_amount_section white mb-1">{{projects.length}}</h3>
            <p>Proyectos</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg white w_30">
            <contrataciones-svg />
            </div>
            <h3 class="ia_amount_section white mb-1">{{contracts.length}}</h3>
            <p>Contratos</p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row">

          <!-- CORREO ELECTRÓNICO-->
          <div class="col col-sm-6 col-md-4 text-center">
              <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Correo Electrónico</span></p>
              <div class="ia_svg h_25 w_20 min">
                <email-svg />
              </div>
              <p class="ia_amount_section">
                <span class="ia_currency _gray" v-if="institution.contactPoint.email">
                  <a :href="`${institution.contactPoint.uri}`">{{institution.contactPoint.email}}</a>
                </span>
                <span class="ia_currency _gray" v-else>
                  Sin dato
                </span>
              </p>

          </div>
          <!-- TELÉFONO-->
          <div class="col text-center">
              <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Teléfono</span></p>
              <div class="ia_svg h_25 w_20 min">
                <phone-svg />
              </div>
              <p class="ia_amount_section"><span class="ia_currency _gray">{{institution.contactPoint.telephone}}</span></p>

          </div>
          <!-- URL-->
          <div class="col text-center">
              <p class="ia_amount_des mb-3"><span class="ia_amount_sub">Web</span></p>
              <div class="ia_svg h_25 w_20 min">
                <url-svg />
              </div>
              <p class="ia_amount_section">
                <span class="ia_currency _gray" v-if="institution.identifier.uri">
                  <a :href="`${institution.identifier.uri}`">{{institution.identifier.uri}}</a>
                </span>
                <span class="ia_currency _gray" v-else>
                  Sin dato
                </span>
              </p>

          </div>
        </div>

        <!-- ❇️ mapa de relaciones-->
        <div class="row mt-4 pt-4 mb-4 pb-4">
          <div class="col">
          <h2>Mapa de relaciones</h2>
          <ul class="ia_bars_color_guide mt-4 pt-4">
            <li><b class="ia_color_guide_circle second"></b> <strong>Institución</strong> </li>
            <li><b class="ia_color_guide_circle contract"></b> <strong>Proyecto</strong></li>
            <li><b class="ia_color_guide_circle"></b> <strong>Contratista</strong> </li>
          </ul>
          <!-- ❇️ el mapa de relaciones -->
          <relation-graph :institution="institution" :projects="projects" :providers="providers" />
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
        <div class="row">
          <div class="col">
          <contract-item v-for="(item, i) in contracts" :data="item" :key="i + 'des'" />
          </div>
        </div>
    </div><!--container ends-->

    </section>
    </div>
    <ver-glosario />
  </div>
</template>
