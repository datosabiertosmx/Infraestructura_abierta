<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import Bubbles from "../components/Bubbles.vue";
  import ProjectItem from "../components/ProjectItem.vue";
  import BarsHorizontalDouble from "../components/BarsHorizontalDouble.vue";
  import BarsHorizontalStack from "../components/BarsHorizontalStack.vue";
  import navigation from "../mixins/navigation";
  import commonMethods from "../mixins/common-methods";
  import VerGlosario from "../components/VerGlosario.vue";
  import SocialSharing from "vue-social-sharing";
  ///////////////////  svg
  import ContratacionesSvg from "../svg/contrataciones.vue";
  import ProyectoSvg from "../svg/proyecto-svg.vue";
  import AvanceSvg from "../svg/icons/avance-svg.vue";
  import EnpreparacionSvg from "../svg/icons/proyectosenpreparacion-svg.vue";
  import EnlicitacionSvg from "../svg/icons/proyectosenlicitacion-svg.vue";
  import EnejecucionSvg from "../svg/icons/proyectosenejecucion-svg.vue";
  import TerminadosSvg from "../svg/icons/proyectosterminados-svg.vue";
  import CanceladosSvg from "../svg/icons/proyectoscancelados-svg.vue";
  import MoneySvg from "../svg/icons/dinerosimbolo-svg.vue";


  //let d3 = Object.assign({}, require("d3-scale"));
  export default {
    /*
     * 👾 M I X I N S
     * ----------------------------------------------------------------------
     */
    mixins : [navigation, commonMethods],

    /*
     * 👾 D A T A
     * ----------------------------------------------------------------------
     */
    data(){
      return {
        // el tab desplegado
        current : "listado",
        bcurrent : "fisico",
        competencia_current: "monto",
        page : 1,
        search     : "",
        searchType : "projects",

        sector  : "",
        type    : "",
        status_ : ""
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

      url(base){
        return this.$store.getters.makeURL(base);
      }
    },

    /*
     * 👾 M O U N T E D
     * ----------------------------------------------------------------------
     */
    mounted(){
      if(this.$route.params.page){
        this.page = this.$route.params.page;
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
      /  regresa la lista de proyectos (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      listItems(){
        let items = this.$store.getters.ProjectsList;
        return items.sort( (a, b) => {
          // ordena por presupuesto ejecutado
          let amounts = this.$store.getters.ProjectAmounts;
            return amounts(b.id).executed - amounts(a.id).executed;
        } );
      },

      contractsLength(){
        return this.$store.getters.Releases.length;
      },

      ProjectsByStatus(){
        return this.$store.getters.ProjectsByStatus;
      },

      totalAmount(){
        return this.$store.getters.ProjectsBudgetTotal;
      },

      sectors(){
        return this.$store.getters.ProjectSectors;
      },

      types(){
        return this.$store.getters.ProjectTypes;
      },

      status(){
        return this.$store.getters.ProjectStatus;
      },

      searchItems(){
        let items = this.listItems;
        if(this.search){
          items = this.$store.getters.simpleSearch(this.search, this.searchType);
        }
        if(this.sector){
          items = items.filter(item => item.sector.indexOf(this.sector) != -1 );
        }

        if(this.type){
          items = items.filter(item => item.type.indexOf(this.type) != -1 );
        }

        if(this.status_){
          items = items.filter(item => item.status.indexOf(this.status_) != -1 );
        }

        /*
        sector  : "",
        type    : "",
        status_ : ""
        */

        return items;
      },

      CompetenciaEnLosProcedimientosMonto(){
        let contracts = this.$store.getters.ContractsByCompetition,
            data      = [
              {
                label : "Monto",
                values : contracts.map(c => {
                  return {
                    value : c.amount,
                    percent : c.percentAmount,
                    title : c.title
                  }
                })
              }
            ];
        return data;
      },

      CompetenciaEnLosProcedimientosTotalContratos(){
        let contracts = this.$store.getters.ContractsByCompetition,
            data      = [
              {
                label : "Monto",
                values : contracts.map(c => {
                  return {
                    value : c.total,
                    percent : c.percent,
                    title : c.title
                  }
                })
              }
            ];
        return data;
      },

      AvanceProyectosEstrategicosFisicoData(){

        return this.$store.getters.ProjectsPhysicalAdvance.map(data => {
          return {
            label : data.name,
            values : [data.estimated, data.observed],
            labels : [data.estimated + "%", data.observed + "%"]
          }
        });
      },

      AvanceProyectosEstrategicosFinancieroData(){
        let projects = this.listItems,
            amounts  = projects.map(p =>{
              return {
                title : p.title,
                amounts : this.$store.getters.ProjectAmounts(p.id)
              }
            }),
            items = amounts.map(__amount => {
              let am        = __amount.amounts,
                  max       = Math.max(am.amount, am.modified, am.executed),
                  _amount   = (am.amount / max) * 100,
                  _modified = (am.modified / max) * 100,
                  _executed = (am.executed / max) * 100,
                  amount    = Number.isInteger(_amount) ? _amount : _amount.toFixed(2),
                  modified  = Number.isInteger(_modified) ? _modified : _modified.toFixed(2),
                  executed  = Number.isInteger(_executed) ? _executed : _executed.toFixed(2);

              return {
                label : __amount.title,
                values : [modified || amount, executed],
                labels : [(modified || amount) + "%", executed + "%"]
              }
            })

        return items;
      },

      location(){
        return window.location.href;
      },

      AvanceProyectosEstrategicosFinancieroDataAmount(){
        let projects = this.listItems,
            amounts  = projects.map(p =>{
              return {
                title : p.title,
                amounts : this.$store.getters.ProjectAmounts(p.id)
              }
            }),
            items = amounts.map(__amount => {
              let am        = __amount.amounts,
                  max       = Math.max(am.amount, am.modified, am.executed),
                  _amount   = (am.amount / max) * 100,
                  _modified = (am.modified / max) * 100,
                  _executed = (am.executed / max) * 100,
                  amount    = Number.isInteger(_amount) ? _amount : _amount.toFixed(2),
                  modified  = Number.isInteger(_modified) ? _modified : _modified.toFixed(2),
                  executed  = Number.isInteger(_executed) ? _executed : _executed.toFixed(2);

              return {
                label : __amount.title,
                values : [modified || amount, executed],
                labels : ["$" + this.format(am.modified || am.amount) , "$" + this.format(am.executed) ]
              }
            })

        return items;
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      Bubbles,
      ProjectItem,
      BarsHorizontalDouble,
      BarsHorizontalStack,
      VerGlosario,
      SocialSharing,
      /// svg
      ContratacionesSvg,
      ProyectoSvg,
      AvanceSvg,
      EnpreparacionSvg,
      EnlicitacionSvg,
      EnejecucionSvg,
      TerminadosSvg,
      CanceladosSvg,
      MoneySvg
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
                    title="Proyectos de Infraestructura"
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
      <li>Proyectos</li>
    </ul>
    <!-- ❇️ ia_hero -->
    <section class="ia_hero">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-lg-6">
            <h1 class="ia_title_hm mb-4 pb-2">Proyectos de infraestructura</h1>
            <p>Son las distintas obras, remodelaciones y ampliaciones que realiza la Secretaría de Infraestructura disponibles en la plataforma.</p>
          </div>
          <div class="col-sm-4 col-md-4  col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <money-svg />
            </div>
            <h2 class="mb-1">${{format(totalAmount)}}</h2>
            <p>Monto total programado (MXN)</p>
          </div>
          <div class="col-6 col-sm-4 col-md-4 col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <proyecto-svg />
            </div>
            <h2 class="mb-1">{{format(listItems.length)}}</h2>
            <p>Proyectos de Infraestructura</p>
          </div>
          <div class="col-6 col-sm-4 col-md-4  col-lg-2 text-center">
            <div class="ia_svg white w_30">
            <contrataciones-svg />
            </div>
            <h2 class="mb-1">{{format(contractsLength/listItems.length)}}</h2>
            <p>Promedio de Contratos</p>
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
              Listado de Proyectos
            </a>
            <a href="#" :class="['ia_btn_hero_nav', current == 'numeralia' ? 'current' : '']"
                        v-on:click.prevent="current= 'numeralia'">
              Numeralia
            </a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <!--- listado -->
      <div class="container" v-if="current == 'listado'">
        <h1 class="ia_title">Listado de Proyectos</h1>

        <form class="form">
          <div class="ia_form_hm ia_form_global">
            <div class="row">
              <div class="col-6 mb-2">
                <input type="text" placeholder="Buscar palabra clave" class="ia_search sm_i" v-model="search">
                <button type="submit" class="sm_i" v-on:click.prevent><i class="ia_search_i"></i></button>
              </div>
          <div class="col-6">
						<select class="ia_select_hm" v-model="type">
							<option value="">Todos los tipos</option>
              <option v-for="(t, i) in types" :key="i+ '-t-opt'" :value="t.tag">
                {{t.name}}
              </option>
						</select>
					</div>
					<div class="col-6">
						<select class="ia_select_hm" v-model="status_">
							<option value="">Todas los fases</option>
              <option v-for="(st, i) in status" :key="i+ '-st-opt'" :value="st.tag">
                {{st.name}}
              </option>
						</select>
					</div>
					<div class="col-6">
						<select class="ia_select_hm" v-model="sector">
							<option value="">Todos los sectores</option>
              <option v-for="(sector, i) in sectors" :key="i+ '-sector-opt'" :value="sector.tag">
                {{sector.name}}
              </option>
						</select>
					</div>
          <!--
          <div class="col col-auto">
						<select class="ia_select_hm">
							<option>Todas las distribuciones</option>
						</select>
					</div>-->
          </div>
        </div>
        </form>
        <div class="mb-4 pb-4">
        <!-- ❇️ las burbujitas -->
        <div class="ia_bubbles">
          <bubbles :items="searchItems" :baseurl="'proyecto'" :idurl="'id'" />
        </div>
        </div>
        <!-- ❇️ la lista de proyectos -->
        <project-item v-for="project in pageItems" :project="project" v-bind:key="project.id" />

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
                    <p class="text-right">Descargar todos los proyectos</p>
                  </div>

                  <div class="col col-sm-2  pl-0">
                    <!--<a :href="url('downloads/proyectos.zip')" download>JSON</a>-->
                    <!-- <a href="/downloads/proyectos.zip" download>JSON</a>-->
                    <a href="http://si.nl.gob.mx/acceso/datosabiertos/JSON_SIASI.rar" download>JSON</a>
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

       numeralia

      //////////////////////////////////
      //////////////////////////////////
      //////////////////////////////////
      -->
      <div class="container" v-if="current=='numeralia'">
        <div class="row mb-4 pb-4">
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <enpreparacion-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[0].total}}</p>
            <p class="ia_amount_des">Proyectos en identificación</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <enpreparacion-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[1].total}}</p>
            <p class="ia_amount_des">Proyectos en preparación</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <enlicitacion-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[2].total}}</p>
            <p class="ia_amount_des">Proyectos en implementación</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <enejecucion-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[3].total}}</p>
            <p class="ia_amount_des">Proyectos en terminación</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <terminados-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[4].total}}</p>
            <p class="ia_amount_des">Proyectos terminados</p>
          </div>
          <div class="col text-center">
            <div class="ia_svg h_35 w_30 min">
              <cancelados-svg />
            </div>
            <p class="ia_amount_section">{{ProjectsByStatus[5].total}}</p>
            <p class="ia_amount_des">Proyectos cancelados</p>
          </div>
        </div>


      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Avances de proyectos</h2>
        </div>
      </div>
      <div class="row mb-4 pb-4">
        <div class="col-12">
          <div class="ai_box_item py-3">
            <div class="row mb-4">
              <div class="col-12">
                <a href="#" :class="['ia_btn_hero_nav items_3', bcurrent == 'fisico' ? 'current' : '']"
                            v-on:click.prevent="bcurrent= 'fisico'">
                  Avance Físico
                </a>
                <a href="#" :class="['ia_btn_hero_nav items_3', bcurrent == 'financiero' ? 'current' : '']"
                            v-on:click.prevent="bcurrent= 'financiero'">
                  Avance Financiero
                </a>

                <a href="#" :class="['ia_btn_hero_nav items_3', bcurrent == 'presupuesto' ? 'current' : '']"
                            v-on:click.prevent="bcurrent= 'presupuesto'">
                  Presupuesto
                </a>
              </div>
            </div>


            <div v-if="bcurrent=='fisico'">
              <!--- sub nav ends-->
              <ul class="ia_bars_color_guide">
                <li><b class="ia_color_guide_circle double"></b> Estimado</li>
                <li><b class="ia_color_guide_circle double second"></b> Observado</li>
              </ul>
              <!-- ❇️ la gráfica de barras horizontal doble (Físico) -->
              <bars-horizontal-double :data="AvanceProyectosEstrategicosFisicoData" />
            </div>

            <div v-if="bcurrent=='financiero'">
              <!--- sub nav ends-->
              <ul class="ia_bars_color_guide">
                <li><b class="ia_color_guide_circle double"></b> Presupuestado</li>
                <li><b class="ia_color_guide_circle double second"></b> Ejecutado</li>
              </ul>
              <!-- ❇️ la gráfica de barras horizontal doble (Financiero) -->
              <bars-horizontal-double :data="AvanceProyectosEstrategicosFinancieroData" />
            </div>


            <div v-if="bcurrent=='presupuesto'">
              <!--- sub nav ends-->
              <ul class="ia_bars_color_guide">
                <li><b class="ia_color_guide_circle double"></b> Presupuestado</li>
                <li><b class="ia_color_guide_circle double second"></b> Ejecutado</li>
              </ul>
              <p class="text-center">Cifras en pesos mexicanos (MXN).</p>
              <!-- ❇️ la gráfica de barras horizontal doble (Presupuesto de proyectos estratégicos) -->
              <bars-horizontal-double :data="AvanceProyectosEstrategicosFinancieroDataAmount" />
            </div>



          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Competencia en los procedimientos de contratación de los proyectos estratégicos</h2>
        </div>
      </div>
      <div class="row mb-4 pb-4">
        <div class="col-12">
          <div class="ai_box_item py-3">
            <div class="row mb-4">
              <div class="col-12">
                <a href="#" :class="['ia_btn_hero_nav', competencia_current == 'monto' ? 'current' : '']"
                            v-on:click.prevent="competencia_current= 'monto'">
                  Monto
                </a>
                <a href="#" :class="['ia_btn_hero_nav', competencia_current == 'contratos' ? 'current' : '']"
                            v-on:click.prevent="competencia_current= 'contratos'">
                  Contratos
                </a>

              </div>
            </div>
            <!--- sub nav ends-->
            <div class="row">
              <div class="col">
            <ul class="ia_bars_color_guide">
              <li><b class="ia_color_guide_circle cps"></b> <strong>Alta</strong> (más de 5 licitantes)</li>
              <li><b class="ia_color_guide_circle cps2"></b> <strong>Normal</strong> (entre 2 y 5 licitantes)</li>
              <li><b class="ia_color_guide_circle cps3"></b> <strong>Baja</strong> (1 licitante)</li>
            </ul>


              </div>
            </div>

            <div v-if="competencia_current=='monto'" class="row">
              <div class="col mb-4 pb-4">
                <p class="text-center mb-4 pb-4">Cifras en pesos mexicanos (MXN).</p>
              <!-- ❇️ la gráfica de barras horizontal stacked (Monto) -->
              <bars-horizontal-stack
                v-for="(d,i) in CompetenciaEnLosProcedimientosMonto"
                :data="d"
                :money="1"
                v-bind:key="`stack-${i}-m`" />
              </div>
            </div>

            <div v-if="competencia_current=='contratos'">
              <div class="col mb-4 pb-4">
              <!-- ❇️ la gráfica de barras horizontal stacked (Contratos) -->
              <bars-horizontal-stack
                v-for="(d,i) in CompetenciaEnLosProcedimientosTotalContratos"
                :data="d"
                v-bind:key="`stack-${i}-mt`" />
              </div>
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
