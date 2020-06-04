////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE INSTITUCIONES
//
////////////////////////////////////////////////////////////////////////////////

const sortByExecutedBudget = (a, b) => b.executedBudget - a.executedBudget;

const sortByName = (a, b) =>{
  let x = a.name.toLowerCase(),
      y = b.name.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
};

/*
 * 👾 S T A T E
 * ----------------------------------------------------------------------
 */
const state = {};

/*
 * 👾 G E T T E R S
 * ----------------------------------------------------------------------
 */
const getters = {
    /*
     *
     * Una vez que se tienen los proyectos, se genera
     * una lista de instituciones
     *
     * -------------------------------------------------------------------------
     *
     */
    InstitutionsList(state, getters){
      // si no hay proyectos, se regresa una lista vacía
      if(!getters.ProjectsList.length) return [];

      // se genera la lista a partir de que rol sea "procuringEntity" o "payer"
      // en la lista de "parties"
      let _parties = getters.ProjectsList.map(pr => pr.parties).flat()
                     .filter(pr => pr.roles.indexOf("procuringEntity") != -1 || pr.roles.indexOf("payer") != -1 || pr.roles.indexOf("buyer") != -1),
          parties  = _parties.map(p => {
            let institution = Object.assign({}, p),
                projects    = getters.institutionProjects(institution),
                contracts   = getters.institutionContracts(institution),
                //contAsPayer = getters.institutionContractsAsProcuringEntity(institution);
                contAsBuyer = getters.institutionContractsAsBuyer(institution);

            institution.projectsNum    = projects.length;
            institution.contractsNum   = contracts.length;
            institution.executedBudget = getters.contractsExecutedBudget(contAsBuyer);

            return institution;
          });
      
      // regresa una lista con valores únicos basados en el id
      return getters.makePartyListUniq(parties).sort(sortByName).sort(sortByExecutedBudget);
    },

    getInstitution : (state, getters) => id =>{
      return getters.InstitutionsList.find(inst => inst.id == id);
    },

    institutionProjects : (state, getters) => institution => {
      let id        = institution.id,
          projects  = getters.ProjectsList.filter(prj => {
            let parties = prj.parties;
            return parties.find(party => party.id == id);
          });

      return projects;
    },

    institutionSectors : (state, getters) => institution => {
      let projects = getters.institutionProjects(institution);

      return [...new Set(projects.map(p => p.sector ).flat())];
    },

    institutionProviders : (state, getters) => institution => {
      let institutions = getters.institutionProjects(institution),
          _providers   = institutions.map(inst => getters.ProjectProviders(inst.id) ).flat(),
           providers   = getters.makePartyListUniq(_providers);

      return providers;
    },

    enableInstitutionJSON : () => (institution, item) => {
      let str = "data:text/json;charset=utf-8,"  + encodeURIComponent(JSON.stringify(institution));

      item.setAttribute("href", str );
      item.setAttribute("download", `institucion-${institution.id}.json`);

      return item;
    },

    filterInstitution : (state, getters) => _str => {
      let institutions = getters.InstitutionsList,
          filtered, str;

      if(!_str) return institutions;

      str = _str.toLowerCase();

      filtered = institutions.filter(inst => {
        let ide = inst.identifier,
            add = inst.address,
            con = inst.contractPoint;

        // check id
        if(inst.id.toLowerCase().search(str) != -1 ) return 1;

        // check name
        if(inst.name.toLowerCase().search(str) != -1 ) return 1;

        // check rfc
        //if(ide && ide.id && ide.id.toLowerCase().search(str) != -1 ) return 1;

        // legal name
        if(ide && ide.legalName && ide.legalName.toLowerCase().search(str) != -1 ) return 1;

        // check address
        if(add && add.streetAddress && add.streetAddress.toLowerCase().search(str) != -1 ) return 1;

        // check locality
        if(add && add.locality && add.locality.toLowerCase().search(str) != -1 ) return 1;

        // check postalcode
        if(add && add.postalCode && add.postalCode.toLowerCase().search(str) != -1 ) return 1;

        // check contact name
        if(con && con.name && con.name.toLowerCase().search(str) != -1 ) return 1;
      });

      return filtered;
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