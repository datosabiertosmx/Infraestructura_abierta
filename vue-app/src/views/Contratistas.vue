<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import BarsHorizontalStack from "../components/BarsHorizontalStack.vue";
  import BubblesProvider from "../components/BubblesProvider.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import ProviderItem from "../components/ProviderItem.vue";
  import navigation from "../mixins/navigation";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";
  //svg
  import ContratistaSvg from "../svg/contratistas-svg.vue";

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
        page : 1,
        search     : "",
        searchType : "providers",
        topProvidersNum : 10,
        method : "",
        sector : ""
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

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      if(this.$route.params.page){
        this.page = this.$route.params.page;
      }

      let    button = document.querySelector(".get-all-json"),
          providers = this.listItems.map(_item => {
            let item = Object.assign({}, _item);
            item.projectsAsSupplier  = item.projectsAsSupplier.map( p => p.id);
            item.projectsAsTenderer  = item.projectsAsTenderer.map( p => p.id);
            item.ContractsAsSupplier = item.ContractsAsSupplier.map( p => p.ocid);

            return item;
          });

      this.$store.getters.enableJSONbutton(providers, button, "00", "contratistas");
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
      listItems(){
        return this.$store.getters.ProvidersList;
      },

      bubblesListItems(){
        let items    = this.listItems.filter(p => p.awards),
            filtered = this.$store.getters.filterProvider(this.search, items);
        return filtered;
      },

      sectors(){
        return this.$store.getters.ProjectSectors;
      },

      procurementMethods(){
        return this.$store.getters.TenderProcurementMethods;
      },

      topProviders(){
        let providers = this.listItems.filter(p => p.amount).slice(0, this.topProvidersNum);

        if(this.sector){
          providers = providers.filter(p => p.sectors.indexOf(this.sector) != -1 );
        }

        if(this.method){
          providers = providers.filter(p => p.procurementMethods.indexOf(this.method) != -1 );
        }

        return providers;
      },

      providers(){
        return this.$store.getters.ProvidersList.filter(p => p.awards).length;
      },

      tenderers(){
        return this.$store.getters.ProvidersList.filter(p => ! p.awards).length;
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
      BarsHorizontalStack,
      BubblesProvider,
      BuscadorAvanzado,
      ProviderItem,
      ContratistaSvg,
      VerGlosario,
      SocialSharing
    }
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // INICIA EL TEMPLATE DEL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
  -->
<template>
  <div>
    <div class="ai_social_sharing">
    <social-sharing :url="location"
                    title="Contratistas"
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
      <li>Contratistas</li>
    </ul>
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-4 pb-2">
            <h1 class="ia_title_hm mb-4 pb-2">Contratistas</h1>
            <p>Personas o empresas que fueron contratadas para la construcción o entrega de un servicio. Aquí también encontrarás
              las empresas que han competido en licitaciones públicas por algún contrato relacionado a los proyectos de infraestructura disponibles en la plataforma.</p>
          </div>

          <div class="col-6 col-md-6 col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <contratista-svg />
            </div>
            <h2 class="mb-1">{{format(providers)}}</h2>
            <p>Contratatistas</p>
          </div>

          <div class="col-6 col-md-6 col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <contratista-svg />
            </div>
            <h2 class="mb-1">{{format(tenderers)}}</h2>
            <p>Licitantes</p>
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
              Contratistas
            </a>
            <a href="#" :class="['ia_btn_hero_nav', current == 'principales' ? 'current' : '']"
                        v-on:click.prevent="current= 'principales'">
              Principales Contratistas
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
            <h1 class="ia_title">Contratistas</h1>
            <div class="ia_bubbles">
              <!-- ❇️ las burbujas de proveedores -->
              <bubbles-provider
                :items="bubblesListItems"
                :baseurl="'contratista'"
                :idurl="'id'" />
            </div>
          </div>
        </div>

        <form class="form">
          <div class="ia_form_hm ia_form_global">
          <input type="text" placeholder="Buscar palabra clave" class="ia_search" v-model="search">
          <button type="submit" v-on:click.prevent><i class="ia_search_i"></i></button>
          <div class="clearfix"></div>
        </div>
        </form>

        <!-- ❇️ la lisa de proveedores -->
        <provider-item v-for="provider in pageItems" :provider="provider" v-bind:key="provider.id"></provider-item>

        <!-- ❇️ la paginación -->
        <ul class="ia_pagination">
          <li v-for="p in pages" v-bind:key="p + '-page-bottom'" :class="p == page ? 'current' : ''">
            <a :href="'contratistas/' + p" v-on:click.prevent="goto(p)">{{p}}</a>
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
                    <p class="text-right">Descargar todos los contratistas</p>
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


      <!---
      //////////////////////////////////
      //////////////////////////////////
      //////////////////////////////////

       principales contratistas

      //////////////////////////////////
      //////////////////////////////////
      //////////////////////////////////
      -->


      <div class="container" v-if="current=='principales'">
        <div class="row">
          <div class="col mb-4">
              <h1 class="ia_title">Principales Contratistas</h1>
          </div>
        </div>

        <div class="row mb-4 pb-4">
          <div class="col-12">
              <div class="row mb-4">
                <div class="col-12">
                  <form class="form">
                    <div class="ia_form_hm ia_form_global">
                      <div class="row">
                        <div class="col">
                          <select class="ia_select_hm" v-model="method">
                            <option value="">Todas los métodos</option>
                            <option v-for="(method,i) in procurementMethods" :key="i+ '-method-opt'" :value="method.tag">
                              {{method.name}}
                            </option>
                          </select>
                        </div>
                        <div class="col">
                          <select class="ia_select_hm" v-model="sector">
                            <option value="">Todos los sectores</option>
                            <option v-for="(sector,i) in sectors" :key="i+ '-sector-opt'" :value="sector.tag">
                              {{sector.name}}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </form>

                  <!-- ❇️ la lisa de proveedores principales -->
                  <provider-item v-for="provider in topProviders" :provider="provider" v-bind:key="provider.id">
                  </provider-item>
                </div>
              </div>

          </div>
        </div>

      </div>

    </section>


    <!-- glosrio-->
    <ver-glosario />


  </div>
</template>
