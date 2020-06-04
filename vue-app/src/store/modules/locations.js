////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE UBICACIONES
//
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//
// ⭐ CATÁLOGOS
//
////////////////////////////////////////////////////////////////////////////////
import zipCodes from '../../assets/codigos-postales-nl.csv'
import municipios from '../../assets/nombre-municipios.csv'
import mapas from '../../assets/municipios-topo.json'


/*
 * 👾 S T A T E
 * ----------------------------------------------------------------------
 */
const state = {
  zipCodes,
  municipios,
  mapas
};

/*
 * 👾 G E T T E R S
 * ----------------------------------------------------------------------
 */
const getters = {
    municipiosList(state, getters){
      let locations = getters.ProjectsList.map(p => {
                        return { project : p.id, locations : p.locations }
                      }).flat(),
          cities  = locations.map(loc => {
            if(!loc.locations) return null;
            let _cities = loc.locations.map(l => l.address).flat().filter(add => add).map(add => add.locality);
            return {project : loc.project, cities : _cities}
          }).filter(city => city),

          uniq = [...new Set(cities.filter(c => c).map(c => c.cities).flat() )].sort();
      return {cities, list : uniq};
    },

    locationsList(state, getters){
      let locations = getters.ProjectsList.map(p => {
                        return { project : p, locations : p.locations }
                      }).flat(),
         
          items  = locations.map(loc => {
            if(!loc.locations) return null;
            let _geometries = loc.locations.map(l => l.geometry).flat().filter(geo => geo).map(add => add.coordinates);
            return {project : loc.project, geometries : _geometries}
          }),

          points = [];

      items.forEach(item => {
        if(item){
          item.geometries.forEach(geo => {
            if(geo) points.push({project : item.project, point : geo});
          })
        }
      });

          
      return points;
    },

    filterProjectsByCity : (state, getters) => (projects, city) => {
      let items = getters.municipiosList.cities
      .filter(item => {
        return item.cities.indexOf(city) != -1;
      }), ids, response;
      

      console.log("yyy:", items, city, projects);

      if(!items.length) return [];

      ids = items.map(it => it.project);

      response = projects.filter(p => ids.indexOf(p.id) != -1);


      return response;
    }
};

/*
 * 👾 A C T I O N S
 * ----------------------------------------------------------------------
 */
const actions = {};

/*
 * 👾 M U T A T I O N S
 * ----------------------------------------------------------------------
 */
const mutations = {};


/*
 * ♥️ E X P O R T
 * ----------------------------------------------------------------------
 */
export default {
  //namespaced: true,
  state,
  getters,
  actions,
  mutations
}