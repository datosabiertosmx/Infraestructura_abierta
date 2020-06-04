import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index';
import flatten from 'flat';

let d3     = Object.assign({}, require("d3-format"));
let format = d3.format(",.0f");


////////////////////////////////////////////////////////////////////////////////
//
// ⭐ MÓDULOS
//
////////////////////////////////////////////////////////////////////////////////
import Contracts from './modules/contracts'
import Institutions from './modules/institutions'
import Providers from './modules/providers'
import Programs from './modules/programs'
import Projects from './modules/projects'
import SearchResults from './modules/search'
import Translate from './modules/translations'
import Locations from './modules/locations'
import Indices from './modules/indices'


Vue.use(Vuex)


////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE PRINCIPAL
//
////////////////////////////////////////////////////////////////////////////////

export default new Vuex.Store({
  /*
   * 👾 S T A T E
   * ----------------------------------------------------------------------
   */
  state: {
    projectsEndpoint : "http://si.nl.gob.mx/acceso/datosabiertos/ListadoProyectos.json",
    ProjectDocs : "https://standard.open-contracting.org/infrastructure/latest/en/",
    pageSize : 5,

    // popup stuff,
    popup : false,
    popupData : {html : null, x :0, y : 0},
    popupAdjust : {top : 10, left : 10},

    // design stuff
    colors : ["#5232c2","#6C49B8", "#4F86C6", "#4FB0C6","#038bbb", "#30F2F2", "#30bcc5", "#C5E99B", "#8FBC94", "#548687", "#56445D"]
  },

  /*
   * 👾 M U T A T I O N S
   * ----------------------------------------------------------------------
   */
  mutations: {
    showPopup(state, settings){
      state.popupData = {
                          html : settings.html,
                          y : settings.event.clientY + state.popupAdjust.top,
                          x : settings.event.clientX + state.popupAdjust.left
                        };

      state.popup = true;
    },

    updatePopup(state, event){
      state.popupData.y = event.clientY  + state.popupAdjust.top;
      state.popupData.x = event.clientX  + state.popupAdjust.left;
    },

    hidePopup(state){
      state.popup = false;
    }
  },

  /*
   * 👾 A C T I O N S
   * ----------------------------------------------------------------------
   */
  actions: {
  },

  /*
   * 👾 M O D U L E S
   * ----------------------------------------------------------------------
   */
  modules: {
    Programs,
    Providers,
    Projects,
    SearchResults,
    Contracts,
    Institutions,
    Translate,
    Locations,
    Indices
  },

  /*
   * 👾 G E T T E R S
   * ----------------------------------------------------------------------
   */
  getters : {

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el html del popup de las gráficas
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    getPopupHTML(state){
      return state.popupData.html;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el clientX del popup de las gráficas
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    getPopupX(state){
      return state.popupData.x;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el clientY del popup de las gráficas
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    getPopupY(state){
      return state.popupData.y;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el objeto de info del popup 
  /  de las gráficas
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    getPopupData(state){
      return state.popupData;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 función genérica que recibe un path y lo 
  /     completa con el host y el basepath para
  /     formar un URL
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    makeURL : () => (url) => {
      let protocol = window.location.protocol,
          path = window.location.host,
          base = router.options.base;

      return  protocol + "//" + path + base + url;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 función genérica que recibe un objeto, un
  /     anchor, un id y un prefijo, y habilita 
  /     el anchor para que descargue el objeto 
  /     recibido con el formato json, usando el id
  /     y el prefijo para ponerle nombre
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    enableJSONbutton : ( ) => (json, button, id, prefix) => {
      let str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));

      button.setAttribute("href", str );
      button.setAttribute("download", `${prefix}-${id}.json`);

      return button;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 utiliza la librería flat para aplanar un
  /     json y lo regresa como un objeto plano
  /     (para luego pasarlo a convertidor de CSV)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    makeCSVobject : () => (json) => {
      return flatten(json);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 habilita la búsqueda en todas las secciones
        del sitio
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    simpleSearch : (state, getters) => (str, type) =>{
      if(type == "programs"){
        return getters.filterProgram(str);
      }
      else if(type == "providers"){
        return getters.filterProvider(str);
      }

      else if(type == "institutions"){
        return getters.filterInstitution(str);
      }

      else if(type == "projects"){
        return getters.filterProject(str);
      }

      else if(type == "contracts"){
        return getters.filterContract(str);
      }

      else{
        return [];
      }
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 le da formato a una fecha del estándar
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    getDateObject: () => strDate => {
      let d = new Date( Date.parse(strDate) ) ;

      return `${d.getDate()}/${1+d.getMonth()}/${d.getFullYear()}`
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 toma la lista de objetos (como proveedores),
  /     y elimina los elementos que tienen id repetido
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    makePartyListUniq : () => items => {
      // filtra los resultados para omitir repetidos.
      const result = [];
      const map    = new Map();
      for (const item of items) {
        if(!map.has(item.id)){
          map.set(item.id, true);
          result.push(item);
        }
      }

      return result;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 toma un número y le quita decimales y
  /     divide con comas cada tres dígitos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    formatNumber : () => num => {
      return format(num);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🎲 toma el nombre de los programas y los 
  /     convierte en formato de slug, para que 
  /     sea el id del mismo
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    // source:
    // https://medium.com/@mhagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
    slugify : () => (string) => {
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
      const p = new RegExp(a.split('').join('|'), 'g');

      return string.toString().toLowerCase()
                   .replace(/\s+/g, '-') // Replace spaces with -
                   .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
                   .replace(/&/g, '-and-') // Replace & with 'and'
                   .replace(/[^\w\-]+/g, '') // Remove all non-word characters
                   .replace(/\-\-+/g, '-') // Replace multiple - with single -
                   .replace(/^-+/, '') // Trim - from start of text
                   .replace(/-+$/, '') // Trim - from end of text
    }
  }
});
