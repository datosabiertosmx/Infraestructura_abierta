<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import ProjectItem from "../components/ProjectItem.vue";
  import ProviderItem from "../components/ProviderItem.vue";
  import ProgramItem from "../components/ProgramItem.vue";
  import ContractItem from "../components/ContractItem.vue";
  import InstitutionItem from "../components/InstitutionItem.vue";
  export default {

    data(){
      return {
        str     : "",
        page    : 1,
        period  : null,
        sectors : [],
        status  : null,
        types   : []
      }
    },

    methods : {
      goto(page){
        this.page = page;
        this.$router.push({
          params : { page },
          query  : this.$route.query
        });
      }
    },

    mounted(){
      this.str     = this.$route.query.str;
      this.period  = this.$route.query.period;
      this.sectors = this.$route.query.sectors ? [this.$route.query.sectors].flat() : [];
      this.status  = this.$route.query.status;
      this.types   = this.$route.query.types ? [this.$route.query.types].flat(): [];
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {

      pages(){
        let pageSize = this.$store.state.pageSize,
            pages    = Math.ceil( this.results.length / pageSize );

        return pages;
      },

      pageItems(){
        let pageSize = this.$store.state.pageSize,
            from     = (this.page -1) * pageSize,
            to       = from + pageSize;

        return this.results.slice(from, to);
      },

      /*
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      /
      /  regresa los resultados de la búsqueda (/src/store/index.js)
      /
      /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
      */
      results(){

          let projects = this.$store.getters.simpleSearch(this.str, "projects")
                                          .map(item => { return {'type': 'project', item} }),
              programs = this.$store.getters.simpleSearch(this.str, "programs")
                                          .map(item => { return {'type': 'program', item} }),
              contracts = this.$store.getters.simpleSearch(this.str, "contracts")
                                          .map(item => { return {'type': 'contract', item} }),
              providers = this.$store.getters.simpleSearch(this.str, "providers")
                                          .map(item => { return {'type': 'provider', item} }),
           institutions = this.$store.getters.simpleSearch(this.str, "institutions")
                                          .map(item => { return {'type': 'institution', item} }),
            getters     = this.$store.getters;

        if(this.status){
          projects  = projects.filter(p => this.status == p.item.status );
          

        }

        if(this.types.length) projects   = projects.filter(p => this.types.indexOf(p.item.type) != -1 );

        if(this.sectors.length){
          projects = projects.filter(p => {
            return this.sectors.map(sector =>  p.item.sector.indexOf(sector) != -1 ).filter(s => s).length;
          });

          contracts = contracts.filter( c => {
            let ocid = c.item.ocid;
            return this.sectors.map(sector => getters.parentSectorsProject(ocid).indexOf(sector) != -1)
                               .filter(s => s).length;
          });

          programs = programs.filter( p => {
            return this.sectors.map(sector => getters.ProgramSectors(p.item.name, true).indexOf(sector) != -1  )
                               .filter(s => s).length;

          });

          providers = providers.filter( p => {
            return this.sectors.map(sector => getters.ProviderSectors(p.item).indexOf(sector) != -1  )
                               .filter(s => s).length;

          });

          institutions = institutions.filter( p => {
            return this.sectors.map(sector => getters.institutionSectors(p.item).indexOf(sector) != -1  )
                               .filter(s => s).length;

          });

          //console.log(  institutions.map(p =>  getters.institutionSectors(p.item) )  );
        }

        

        return [programs, projects, contracts, providers, institutions].flat();

      }
    },

    watch: {
      $route(to) {
        let q = to.query;

        this.str     = q.str;
        this.period  = q.period;
        this.sectors = q.sectors ? [q.sectors].flat() : [];
        this.status  = q.status;
        this.types   = q.types ? [q.types].flat(): [];
      }
    },

    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      ProgramItem,
      ProjectItem,
      ProviderItem,
      ContractItem,
      InstitutionItem
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
    <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="mb-4 pb-4">Resultados para: "<strong>{{str}}</strong>"</h1>
          <p v-if="!results.length">No hubo resultados ☹️</p>

    <!-- ❇️ la lista de programas -->
    <ul>
      <template v-for="(el, i) in pageItems">
        <program-item     v-if="el.type=='program'"       :program="el.item"     :key="i + '-result'" />
        <project-item     v-else-if="el.type=='project'"  :project="el.item"     :key="i + '-result'" />
        <contract-item    v-else-if="el.type=='contract'" :data="el.item"        :key="i + '-result'" />
        <provider-item    v-else-if="el.type=='provider'" :provider="el.item"    :key="i + '-result'" />
        <institution-item v-else                          :institution="el.item" :key="i + '-result'" />
      </template>
    </ul>

    <!-- ❇️ la paginación -->
    <ul class="ia_pagination">
      <li v-for="p in pages" v-bind:key="p + '-page-bottom'" :class="p == page ? 'current' : ''">
            <a :href="'busqueda/' + p" v-on:click.prevent="goto(p)">{{p}}</a>
      </li>
    </ul>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>
