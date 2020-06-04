////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE PROGRAMAS
//
////////////////////////////////////////////////////////////////////////////////
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const sort    = (a, b) => b.amounts.executed - a.amounts.executed;
const d3 = Object.assign({}, require("d3-array"));
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
  Program : (state, getters) => id => {
    return getters.ProgramsList.find(d => d.id == id);
  },

  ProgramsList(state, getters){
      let bb           = getters.projectsBudgetBreakdowns
                           .map(b => b.budgetBreakdown)
                           .flat(),
          descriptions = bb.map(b => b.description).filter(d => d),

          items        = [...new Set(descriptions)].map(item => {
            return {
              name    : item,
              id      : getters.slugify(item),
              ids     : bb.filter(b => b.description == item).map(b => b.id),
              spids   : bb.filter(b => b.description == item).map(b => b.sourceParty.id)
            }
          });

    items.forEach(item => {
      item.amounts = getters.ProgramAmounts(item.name); 
    });

    return items.sort(sort);
  },

  extendProgramData : (state, getters) => program => {
    let ext           = Object.assign({}, program);
        ext.type      = getters.ProgramTypes(ext.name);
        ext.sectors   = getters.ProgramSectors(ext.name);
        ext.amounts   = getters.ProgramAmounts(ext.name);
        ext.projects  = getters.ProgramProjectsUrls(ext.name);
        ext.contracts = getters.ProgramContractsUrls(ext.id);

    return ext;
  },

  ProgramProjects : (state, getters) => name => {
    let bb = getters.projectsBudgetBreakdowns.filter(b => {
      let programs = b.budgetBreakdown.map(p => p.description);
      return programs.indexOf(name) != -1;
    });

    return bb;
  },

  ProgramContracts : (state, getters) => id => {
    let program = getters.Program(id),
        spids   = program.spids,
        releases = getters.Releases,
        contracts = releases.filter(rel => {
          let i = rel.planning.budget.id;

          return spids.indexOf(i) != -1;
        });

    return contracts;
  },

  ProgramProjectsUrls : (state, getters) => name => {
    let projects = getters.ProgramProjects(name),
        urls = projects.map(p => getters.makeURL(`proyecto/${p.projectId}`));

    return urls;

  },

  ProgramContractsUrls : (state, getters) => id => {
    
    let //projects  = getters.ProgramProjects(name),
        //contracts = projects.map(p => getters.ProjectContractReleases(p.projectId)).flat(),
        contracts = getters.ProgramContracts(id),
         urls     = contracts.map(c => getters.makeURL(`contratacion/${c.ocid}`));

    return urls;
  },



  ProgramAmountTotal(state, getters){
    if(!getters.ProgramDistribution.length) return 0;

    let total = getters.ProgramDistribution.map(d => d.amounts.amount).reduce(reducer);
    return total;
  },

  ProgramProjectsMean(state, getters){
    let programs = getters.ProgramsList,
        items    = programs.map(program => getters.ProgramProjects(program.name).length);

    return d3.mean(items);
  },

  ProgramAmounts : (state, getters) => name => {
    let programs = getters.ProgramProjects(name),
        bb       = programs.map(d => d.budgetBreakdown).flat().filter(b => b.description == name),
        amount   = bb.map(b => b.amount.amount).reduce(reducer),
        bl       = bb.map(b => b.budgetLines).filter(b => b).flat(),
        executed = !bl.length ? 0 : bl.map(b => b.measures).flat(),
        exAmount = !executed.length ? 0 : executed.filter(ex => ex.id == 'executed')
                                                  .map(ex => ex.value.amount).reduce(reducer);

    return {bb, amount, executed : exAmount};
  },

  ProgramSectors : (state, getters) => (name, raw) => {
    let programs = getters.ProgramProjects(name).map(p => {
      return getters.Project(p.projectId);
    }),
        sectors  = programs.map(p => p.sector).flat();

    return raw ? sectors : getters.translate(sectors);
  },

  ProgramTypes : (state, getters) => name => {
    let programs = getters.ProgramProjects(name).map(p => {
      return getters.Project(p.projectId);
    }),
          types  = programs.map(p => p.type);

    return getters.translate(types);
  },

  filterProgram : (state, getters) => _str => {
    let programs = getters.ProgramsList,
        filtered, str;

    if(!_str) return programs;

    str = _str.toLowerCase();


    filtered = programs.filter( pr => {
      // check in name
      if(pr.name.toLowerCase().search(str) != -1) return 1;

      // check id
      if(pr.id.toLowerCase().search(str) != -1) return 1;

      // fail
      return;

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