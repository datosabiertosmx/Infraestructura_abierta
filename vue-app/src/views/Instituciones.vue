<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import InstitutionItem from "../components/InstitutionItem.vue";
  import Treemap from "../components/TreeMap.vue";
  import navigation from "../mixins/navigation";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";
  ///////////////////  svg
  import InstitucionesSvg from "../svg/instituciones-svg.vue";

  export default {
    /*
     * 👾 M I X I N S
     * ----------------------------------------------------------------------
     */
    mixins : [navigation],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // el tab desplegado
        current : "listado",
        page    : 1,
        search     : "",
        searchType : "institutions"
      }
    },

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

    mounted(){
      let button = document.querySelector(".get-all-json");
      this.$store.getters.enableJSONbutton(this.listItems, button, "00", "instituciones");
    },

    /*
     * 👾 C O M P U T E D
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
      listItems(){
        return this.$root.$store.getters.InstitutionsList;
      },

      institutionDistribution(){
        let data = this.listItems;
        console.log(data);
        return data.map(d => {
          return {
            name :`${ d.name} : $${d.executedBudget}`,
            title : d.name,
            value : d.executedBudget,
            id    : d.id,
            url   : { name : "institucion", params : {id : d.id}}
          }
        });
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
      InstitutionItem,
      Treemap,
      VerGlosario,
      SocialSharing,
      /// svg
      InstitucionesSvg
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
    <div class="ai_social_sharing">
    <social-sharing :url="location"
                    title="Instituciones Públicas"
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
    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li>Instituciones</li>
    </ul>
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-4 pb-2">
            <h1 class="ia_title_hm mb-4 pb-2">Instituciones Públicas</h1>
            <p>Lista de instituciones, municipios o secretarías que solicitan a la Secretaría de Infraestructura construir un proyecto de infraestructura. La Secretaría de Infraestructura construye, no opera dichos proyectos una vez terminados.</p>
          </div>

          <div class="col-sm-12 col-md-12 col-lg-2 lg-offset-2 text-center">
            <div class="ia_svg white w_30">
            <instituciones-svg />
            </div>
            <h2 class="mb-1">{{format(listItems.length)}}</h2>
            <p>Instituciones Públicas</p>
          </div>

        </div>
      </div>
    </section>

    <!-- ❇️ nav -->
    <section class="ia_hero nav">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <a href="#" :class="['ia_btn_hero_nav', current == 'listado' ? 'current' : '']"
                        v-on:click.prevent="current= 'listado'">
              Instituciones
            </a>
            <a href="#" :class="['ia_btn_hero_nav', current == 'distribucion' ? 'current' : '']"
                        v-on:click.prevent="current= 'distribucion'">
              Distribución de Instituciones
            </a>
          </div>
        </div>
      </div>
    </section>


    <section>
      <!--- listado -->
      <div class="container" v-if="current == 'listado'">
        <div class="row">
          <div class="col">
            <h1 class="ia_title">Instituciones Públicas</h1>
          </div>
        </div>

        <form class="form">
          <div class="ia_form_hm ia_form_global">
          <input type="text" placeholder="Buscar palabra clave" class="ia_search"  v-model="search">
          <button type="submit" v-on:click.prevent><i class="ia_search_i"></i></button>
          <div class="clearfix"></div>
          </div>
        </form>

        <!-- ❇️ la lista de instituciones -->
        <institution-item v-for="institution in pageItems" :institution="institution" v-bind:key="institution.id" />

        <!-- ❇️ la paginación -->
        <ul class="ia_pagination">
          <li v-for="p in pages" v-bind:key="p + '-page-bottom'" :class="p == page ? 'current' : ''">
            <a :href="'instituciones/' + p" v-on:click.prevent="goto(p)">{{p}}</a>
          </li>
        </ul>
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
                    <p class="text-right">Descargar todas los instituciones</p>
                  </div>

                  <div class="col col-sm-2  pl-0">
                    <a class="get-all-json" href="#">JSON</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--- distribucion -->
      <div class="container" v-if="current == 'distribucion'">
        <div class="row">
          <div class="col mb-4">
          <h1 class="ia_title mb-2">Distribución de Instituciones</h1>
          <p>Cifras en pesos mexicanos (MXN).</p>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <!-- ❇️ la gráfica de cuadritos -->
            <treemap :data="institutionDistribution" :title="'instituciones'" />
          </div>
        </div>
      </div>
    </section>

    <!-- glosrio-->
    <ver-glosario />

  </div>
</template>
