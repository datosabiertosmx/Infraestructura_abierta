////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE PROYECTOS
//
////////////////////////////////////////////////////////////////////////////////

// ⚠️ proyectos de obra pública. Esto debería cargar dinámicamente
import p1 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000009-v000001.json';
import p2 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000001-v000001.json';
import p3 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000002-v000001.json';
import p4 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000003-v000001.json';
import p5 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000004-v000005.json';
import p6 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000005-v000002.json';
import p7 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000006-v000003.json';
import p8 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000007-v000003.json';
import p9 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000008-v000001.json';
import p10 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000010-v000006.json';

/*
 * 🍺 C O N S T
 * ----------------------------------------------------------------------
 */
//const PLANNING       = 1;
//const TENDER         = 2;
const AWARD          = 3;
const CONTRACT       = 4;
const IMPLEMENTATION = 5;

const reducer = (accumulator, currentValue) => accumulator + currentValue;

let Projects = [p1,p2,p3,p4,p5,p6,p7,p8, p9, p10],
    Packages = [];
/*
 * 👾 S T A T E
 * ----------------------------------------------------------------------
 */
const state = {
  projects      : [],
  exProjects    : [],
  prjSummary    : null,
  projectsReady : null,
  projectPackagesReady : null
};

/*
 * 👾 G E T T E R S
 * ----------------------------------------------------------------------
 */
const getters = {
  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de proyectos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectsList(state, getters){
      if(!state.projects.length) return [];

      return state.projects;
      /*
      return state.projects.sort( (a,b) => {
        return getters.ProjectAmounts(b.id).executed - getters.ProjectAmounts(a.id).executed;
      } );
      */
    },
    // const sort    = (a, b) => b.amounts.executed - a.amounts.executed;

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de proyectos según el
  /  string provisto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    filterProject : (state, getters) => _str => {
    let projects = getters.ProjectsList,
        filtered, str;

    if(!_str) return projects;

    str = _str.toLowerCase();

    filtered = projects.filter( pr => {
      // check in title
      if(pr.title.toLowerCase().search(str) != -1) return 1;

      // check description
      if(pr.description.toLowerCase().search(str) != -1) return 1;

      // check purpose
      if(pr.purpose.toLowerCase().search(str) != -1) return 1;

      // fail
      return;

    });

    return filtered;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de proyectos según el año
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectsByYear : (state) => year => {
      let res = state.projects.filter(p => {
        let date  = new Date( Date.parse(p.period.startDate) ),
            _year = date.getFullYear();

        return _year == year;
      });

      return res;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de budgetBreakdowns de 
  /  todos los proyectos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    projectsBudgetBreakdowns(state){
      let budgets = state.projects.map(prj => Object.assign({projectId : prj.id}, prj.budget) )
                                  .filter(budget => budget.budgetBreakdown)
                                  .map(budget => {
                                    return {
                                      projectId       : budget.projectId, 
                                      budgetBreakdown : budget.budgetBreakdown
                                    }
                                  });
                                  
      return budgets;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de budgets y budget 
  /  breakdonws de todos los proyectos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */

    ProjectsAmounts(state, getters){
      let budgets = state.projects.map(p => p.budget),
          bbdwns  = getters.projectsBudgetBreakdowns
                           .map(bbd => bbd.budgetBreakdown).flat();
      return {budgets, bbdwns}
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa la suma de todos los budget de
  /  todos los proyectos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectsBudgetTotal(state, getters){
      if(!getters.ProjectsAmounts.budgets.length) return 0;
      
      return getters.ProjectsAmounts.budgets.map(p => p.amount.amount).reduce(reducer);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🌟 regresa el proyecto según el id provisto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    Project : (state/*, getters, rootState*/) => id => {
      return state.projects.find(d => d.id == id);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de fotos en un proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */

    ProjectPhotos : () => project => {
      if(!project.documents) return [];

      return project.documents.filter(doc => doc.documentType.search('illustration') != -1 );
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa distintas cantidades agregadas de 
  /  un proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectAmounts : (state, getters) => id => {
      let project       = getters.Project(id),
          _amount       = project.budget.amount.amount,
          amount        = getters.ProjectContractReleasesAwards(id).flat()
                                 .map(aw => aw.value.amount).reduce(reducer),
          _transactions = getters.projectTransactions(id).map(t => t.value.amount),
          transactions  = _transactions.length ? _transactions.reduce(reducer) : 0,
          blines        = getters.projectBudgetLines(id),
          measures      = blines.length ? blines.map(bl => bl.measures).flat() : [],
          _executed     = measures.filter(m => m.id == "executed"),
          executed      = transactions,//_executed.length ? _executed.map(ex => ex.value.amount).reduce(reducer) : 0,
          _modified     = measures.filter(m => {
                            return m.id == "modified" || m.id == "approved"
                          }).map(m => m.value.amount),
          modified      = getters.ProjectContractReleasesContracts(id).flat()
                                 .map(con => con.value.amount).reduce(reducer),
          //_modified.length ? _modified.reduce(reducer)/* + amount*/ : amount,
          advance       = modified ? (executed / modified) * 100 : 0;

      return {
        // el amount del json de proyecto
        _amount, 
        // la suma de los awards
        amount, 
        // la suma de los contracts
        modified,
        // los measures de tipo executed en el BL
        _executed,
        // el array de transactions
        _transactions,
        // los measures de tipo modified o approved
        _modified,
        // la suma de los transactions
        executed,
        // la relación entre ejecutado y modificado
        advance
      }
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de proveedores del
  /  proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectProviders : (state, getters) => id => {
      let project    = getters.Project(id),
          proviers   = getters.ProvidersList.filter(pr => {
            return pr.projectsAsSupplier.map(p => p.id).indexOf(project.id) != -1;
          })
      return proviers;
    },

   /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de budget breakdowns del
  /  proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    projectBudgetBreakdowns : (state, getters) => id => {
      let project = getters.Project(id),
          budget  = project.budget;

      return budget && budget.budgetBreakdown ? budget.budgetBreakdown : []; 
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de transacciones (contratos)
  /  del proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    projectTransactions : (state, getters) => id => {
      let _contracts =  getters.ProjectContractReleases(id)
                              .filter(con => getters.contractState(con) >= IMPLEMENTATION),
          contracts  = _contracts.map(con => con.contracts).flat(),
          impls      = contracts.map(con => con.implementation)
                                .filter(imp => imp.transactions && imp.transactions.length),
          trans      = impls.map(imp => imp.transactions).flat();

      return trans;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de budgetLines del
  /  proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */

    projectBudgetLines : (state, getters) => id => {
      let bbs = getters.projectBudgetBreakdowns(id),
          bls = bbs.map(bb => bb.budgetLines).filter(bl => bl).flat();

      return bls;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de licitantes del
  /  proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectTenderers: (state, getters) => id =>{
      let project   = getters.Project(id),
          parties   = project.parties,
          tenderers = parties.filter(p =>  p.roles.indexOf("tenderer") != -1);

      return tenderers;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de contratos del
  /  proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectContractReleases : (state) => id => {
      let ex = state.exProjects.find(e => e.id == id);

      return ex.contracts ;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de contratos de los procesos
  /  de contratación del proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectContractReleasesContracts : (state, getters) => id => {
      let _contracts = getters.ProjectContractReleases(id),
           contracts = _contracts.filter(c => getters.contractState(c) >= CONTRACT );

      return contracts.map(c => c.contracts);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de adjudicaciones de los procesos
  /  de contratación del proyecto seleccionado
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectContractReleasesAwards : (state, getters) => id => {
      let _contracts = getters.ProjectContractReleases(id),
           contracts = _contracts.filter(c => getters.contractState(c) >= AWARD );

      return contracts.map(c => c.awards);
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de años disponibles en 
  /  los proyectos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectsStartDateYear(state){
      let _years = state.projects.map(p =>{
                     let d = new Date( Date.parse(p.period.startDate) );
                     return d.getFullYear();
                   }),
          years  = [...new Set(_years)];

        return years;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de sectores disponibles
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectSectors(state, getters){
      let items = state.projects.map(p => p.sector).flat(),
          uniq  = [...new Set(items)],
          trans = getters.translate(uniq),
          resp  = uniq.map( (tag, i) => {
                    return {
                      tag,
                      name : trans[i]
                    }
                  });

      return resp;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de tipos disponibles
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectTypes(state, getters){
      let items = state.projects.map(p => p.type),
          uniq  = [...new Set(items)],
          trans = getters.translate(uniq),
          resp  = uniq.map( (tag, i) => {
                    return {
                      tag,
                      name : trans[i]
                    }
                  });

      return resp;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de status disponibles
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectStatus(state, getters){
      //let status = STATUS,
      let status = [...new Set(state.projects.map(p => p.status)) ],
          trans  = getters.translate(status),
          resp   = status.map( (tag, i) => {
                    return {
                      tag,
                      name : trans[i]
                    }
                  });

      return resp;
    },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de años disponibles en 
  /  los proyectos (se desarrolló dos veces ...)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
    ProjectPeriods(state){
      let periods = state.projects.map( p => p.period ? p.period.startDate : null )
                                  .filter(p => p)
                                  .map(d => new Date( Date.parse(d) ) )
                                  .map(d => d.getFullYear());
                                  

      return [... new Set(periods)];
    },
};

/*
 * 👾 A C T I O N S
 * ----------------------------------------------------------------------
 */
const actions = {
  getProjects(context){
    Projects.forEach(project => context.commit('addProject', project) );
  },

  getProjectPackages(context){
    Packages.forEach(pack => {
      pack.projects.forEach(project => context.commit('addProject', project));
    })
  },

  createExtendedProject(context, project){
    let   ext = {},
        ocids = project.contractingProcesses
         .map(cp => cp.releases ? cp.releases[0].id : null);

    ext.id        = project.id;
    ext.project   = project;
    ext.contracts = context.rootState.Contracts.releases.filter(rel =>{
      return ocids.indexOf(rel.ocid) != -1;
    });

    ext.ocids = ext.contracts.map(c => c.ocid);
    context.commit('addExtendedProject', ext);
  }
};

/*
 * 👾 M U T A T I O N S
 * ----------------------------------------------------------------------
 */
const mutations = {
  addProject(state, project){
    state.projects.push(project);
  },

  setProjectsReady(state){
    state.projectsReady = true;
  },

  setProjectPackagesReady(state){
    state.projectPackagesReady = true;
  },

  addExtendedProject(state, extended){
    state.exProjects.push(extended);
  },

  updateProjectSummary(state, summary){
    state.prjSummary = summary;
  }
};


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