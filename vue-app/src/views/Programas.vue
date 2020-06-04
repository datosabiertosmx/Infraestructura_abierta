<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import Breadcrumb from "../components/Breadcrumb.vue";
  import ProgramItem from "../components/ProgramItem.vue";
  import Treemap from "../components/TreeMap.vue";
  import BuscadorGeneral from "../components/BuscadorGeneral.vue";
  import BuscadorAvanzado from "../components/BuscadorAvanzado.vue";
  import navigation from "../mixins/navigation";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";
  ///////////////////  svg
  import ProgramasSvg from "../svg/icons/programas_svg.vue";
  import ProyectoSvg from "../svg/proyecto-svg.vue";
  //icons
  import TimeSvg from "../svg/icons/time_svg.vue";
  import PeriodoSvg from "../svg/icons/periodo_svg.vue";
  import VigenteSvg from "../svg/icons/vigente-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";

  export default{
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
        current    : "listado",
        page       : 1,
        search     : this.$route.query.busqueda,//"",
        searchType : "programs"
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
      this.$store.getters.enableJSONbutton(this.listItems, button, "00", "programas");
    },

    updated(){
      if(this.search && this.$route.query.busqueda != this.search){
        this.$router.push({query : {busqueda : this.search}});
      }
    },


    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa la lista de programas
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      listItems(){
        return this.$store.getters.ProgramsList;
      },

      ProgramDistribution(){
        let data = this.$store.getters.ProgramDistribution;

        return data.map(d => {
          return {
            name :`${ d.program.name} : $${d.amounts.amount}`,
            title : d.program.name,
            value : d.amounts.executed,//d.amounts.amount,
            id    : d.program.id,
            url   : { name : "programa", params : {id : d.program.id}}
          }
        });
      },

      ProgramAmountTotal(){
        return this.$store.getters.ProgramAmountTotal;
      },

      ProgramProjectsMean(){
        return this.$store.getters.ProgramProjectsMean;
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
      Breadcrumb,
      ProgramItem,
      Treemap,
      BuscadorGeneral,
      BuscadorAvanzado,
      VerGlosario,
      SocialSharing,
      /// svg
      ProgramasSvg,
      ProyectoSvg,
      TimeSvg,
      PeriodoSvg,
      VigenteSvg,
      MoneySvg
    }
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
                    title="Programas de Obra Pública"
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
    <div>
      <ul class="breadcrumb">
        <li>
          <router-link :to="`/`">Inicio</router-link>
        </li>
        <li>Programas</li>
      </ul>
    </div>
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-12 col-lg-6">
            <h1 class="ia_title_hm mb-4 pb-2">Programas de Obra Pública</h1>
            <p>Son los recursos del Gobierno federal y del estado con qué se financian los distintos proyectos de obra pública disponibles a visualizar en la plataforma.</p>
          </div>
          <div class="col-sm-4 col-md-4  col-lg-2  text-center">
            <div class="ia_svg white w_30">
            <money-svg />
            </div>
            <h2 class="mb-1">${{format(ProgramAmountTotal)}}</h2>
            <p>Monto total programado (MXN)</p>
          </div>
          <div class="col-6 col-sm-4 col-md-4 col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <programas-svg />
            </div>
            <h2 class="mb-1">{{format(listItems.length)}}</h2>
            <p>Programas de Obra Pública</p>
          </div>
          <div class="col-6 col-sm-4 col-md-4  col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <proyecto-svg />
            </div>
            <h2 class="mb-1">{{format(ProgramProjectsMean)}}</h2>
            <p>Promedio de Proyectos</p>
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
              Programas
            </a>
            <a href="#" :class="['ia_btn_hero_nav', current == 'distribucion' ? 'current' : '']"
                        v-on:click.prevent="current= 'distribucion'">
              Distribución de programas
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
            <h1 class="ia_title">Programas</h1>
          </div>
        </div>


          <form class="form">
            <div class="ia_form_hm ia_form_global">
              <div class="row">
                <div class="col">
                  <input type="text" placeholder="Buscar palabra clave" class="ia_search" v-model="search">
                  <button type="submit" v-on:click.prevent><i class="ia_search_i"></i></button>
                </div>
                <!--
                <div class="col-3">
                  <select class="ia_select_hm">
                    <option>Todas las vigencias</option>
                  </select>
                </div>-->
              </div>
            </div>
          </form>

        <!-- ❇️ la lista de programas -->
        <ul>
          <program-item v-for="(program, i) in pageItems" :program="program" v-bind:key="i + '-program'" />
        </ul>

        <!-- ❇️ la paginación -->
        <ul class="ia_pagination">
          <li v-for="p in pages" v-bind:key="p + '-page-bottom'" :class="p == page ? 'current' : ''">
            <a :href="'programas/' + p" v-on:click.prevent="goto(p)">{{p}}</a>
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
                    <p class="text-right">Descargar todos los programas</p>
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

     distribucion

    //////////////////////////////////
    //////////////////////////////////
    //////////////////////////////////
    -->
    <div class="container" v-if="current=='distribucion'">
      <div class="row">
        <div class="col mb-4">
            <h1 class="ia_title mb-2">Distribución de programas por monto aprobado </h1>
            <p>Cifras en pesos mexicanos (MXN).</p>
        </div>
      </div>

      <!-- ❇️ la gráfica de cuadritos -->
      <treemap :data="ProgramDistribution" :title="'programas'" />
    </div>



    </section>

    <!-- glosrio-->
    <ver-glosario />
  </div>
</template>
