/*
 * I N I C I A   V U E
 * ----------------------------------------------------------------------
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    // habilita los releases de NL
    let contractReleases = store.dispatch("getReleases")
                                .then( () => store.commit('setReleasesReady') ),
    // habilita los record packages del INAI
          recordPackages = store.dispatch("getRecordPackages")
                                .then( () => store.commit('setRecordPackagesReady') ),
    // habilita los proyectos de obra de NL
                projects = store.dispatch('getProjects') 
                                .then( () => store.commit('setProjectsReady') ),
         projectPackages = store.dispatch('getProjectPackages') 
                                .then( () => store.commit('setProjectPackagesReady') );

    Promise.all([contractReleases, recordPackages, projects, projectPackages]).then( () => {
      //console.log(store.state);
      store.state.Projects.projects.forEach( project => store.dispatch('createExtendedProject', project));
      
      // aquí hace algo cuando toda la info está lista. 
      // por ahora todo carga desde el inicio, pero es
      // posible modificar eso en el store.
    });
  }
}).$mount('#app')
