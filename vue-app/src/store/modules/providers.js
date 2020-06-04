////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE PROVEEDORES
//
////////////////////////////////////////////////////////////////////////////////
const AWARD          = 3;

const sort = (a, b) => b.amount - a.amount;
const sortByName = (a, b) =>{
  let x = a.name.toLowerCase(),
      y = b.name.toLowerCase();
  if (x < y) {return -1;}
  if (x > y) {return 1;}
  return 0;
};
const reducer = (accumulator, currentValue) => accumulator + currentValue;

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
  Provider : (state, getters) => id => {
    return getters.ProvidersList.find(d => getters.replacePrefix(d.id) == getters.replacePrefix(id) );
  },

    /*
     *
     * Una vez que se tienen los proyectos, se genera
     * una lista de proveedores
     *
     * -------------------------------------------------------------------------
     *
     */
    ProvidersList(state, getters){
      // si no hay proyectos, se regresa una lista vacía
      if(!getters.ProjectsList.length) return [];

      // se genera la lista a partir de que rol sea "supplier"
      // en la lista de "parties"
      let _parties = getters.ProjectsList.map(pr => pr.parties).flat()
                            .filter(pr => pr.roles.indexOf("supplier") != -1 || pr.roles.indexOf("tenderer") != -1),
          parties = _parties.map(p => {
            let provider                 = Object.assign({}, p);
            provider.awards              = getters.providerContractAwards(provider).length;
            provider.amount              = getters.ProviderAmountAwarded(provider);
            // let con = this.contracts.map(c => c.contracts ).flat()
            provider.projectsAsSupplier  = getters.ProjectsAsSupplier(provider);
            provider.projectsAsTenderer  = getters.ProjectsAsTenderer(provider);
            provider.ContractsAsSupplier = getters.ContractsAsSupplier(provider);
            provider.sectors             = getters.ProviderSectors(provider);
            provider.procurementMethods  = getters.ProviderProcurementMethods(provider);

            return provider;
          });


      return getters.makePartyListUniq(parties)
                    .sort(sortByName)
                    .sort(sort);
    },

  ContractsAsSupplier : (state, getters) => provider => {
    let         id = getters.replacePrefix(provider.id), //provider.id.replace("MX-RFC-", ""),
         _releases = getters.Releases.filter(rel => getters.contractState(rel) >= AWARD ),
         releases;

    releases = _releases.filter(rel => {
                 let awards    = rel.awards,
                     suppliers = awards.map(aw => aw.suppliers).flat(),
                     ids       = suppliers.map(sup => getters.replacePrefix(sup.id) );

                  return ids.indexOf(id) != -1;
               });

    return releases;
  },

  ProviderProcurementMethods : (state, getters) => provider => {
    let contracts = getters.ContractsAsSupplier(provider),
        methods   = contracts.map(c => c.tender.procurementMethod);
    
    return [...new Set(methods)];
  },

  ProviderAmountAwarded : (state, getters) => provider => {
    let awards = getters.providerContractAwards(provider),
      amount = getters.providerContractAwardsAmount(awards);
    return amount;
  },

  providerContractAwards : (state, getters) => provider => {
    let id     = getters.replacePrefix(provider.id),
        awards = getters.allAwards.filter(aw =>{
          let ids = aw.suppliers.map(sup => getters.replacePrefix(sup.id) );
          return ids.indexOf(id) != -1
        });

    return awards;
  },

  replacePrefix: () => _id => {
    return _id.replace("MX-RFC-", "").replace("RFC-", "");
  },

  providerContractAwardsAmount : () => awards => {
    if(!awards.length) return 0;
    let values = awards.map(aw => aw.value.amount);

    return values.reduce(reducer);
  },
  

  ProjectsAsSupplier : (state, getters) => provider => {
    let _projects = getters.ProjectsList,
         projects = _projects.filter(p => {
          return p.parties.filter(p => p.id == provider.id && p.roles.indexOf("supplier") != -1).length
         })

    return projects;
  },

  ProviderSectors : (state, getters) => provider => {
    let projects = getters.ProjectsAsSupplier(provider),
        sectors  = projects.map(p => p.sector ).flat();

    return sectors;
  },

  
  ProjectsAsTenderer : (state, getters) => provider => {
    let _projects = getters.ProjectsList,
         projects = _projects.filter(p => {
          return p.parties.filter(p => p.id == provider.id && p.roles.indexOf("tenderer") != -1).length
         })

    return projects;
  },
  

    filterProvider : (state, getters) => (_str, _providers) => {
      let providers = _providers || getters.ProvidersList,
          filtered, str;

      if(!_str) return providers;

      str = _str.toLowerCase();

      filtered = providers.filter(pr => {
        let ide = pr.identifier,
            add = pr.address,
            con = pr.contractPoint;

        // check id
        if(pr.id.toLowerCase().search(str) != -1 ) return 1;

        // check name
        if(pr.name.toLowerCase().search(str) != -1 ) return 1;

        // check rfc
        if(ide && ide.id && ide.id.toLowerCase().search(str) != -1 ) return 1;

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