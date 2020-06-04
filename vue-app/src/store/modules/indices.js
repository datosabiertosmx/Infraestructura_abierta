////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE INDICADORES
//
////////////////////////////////////////////////////////////////////////////////
const reducer      = (accumulator, currentValue) => accumulator + currentValue;
const statusList   = ["identification", "preparation", "implementation", "completion", "completed", "cancelled"];
const projectTypes = ["construction", "rehabilitation", "replacement"];
const procurementMethods = ["open", /*"selective", "limited", */"direct"];

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

  // 🎃 Programas
  //
  //////////////////////////////////////////////////////////////////////
  ProgramDistribution(state, getters){
    let programs = getters.ProgramsList;

    return programs.map(program => {
      return {
        program,
        amounts : getters.ProgramAmounts(program.name)
      }
    });
  },

  // 🎃 Proyectos
  //
  //////////////////////////////////////////////////////////////////////
  ProjectsPhysicalAdvance(state, getters){
    return getters.ProjectsList.map(project => {
      let name      = project.title,
          contracts = getters.ProjectContractReleasesContracts(project.id).flat();

      return {
        name,
        estimated : contracts.map(c => c.x_estimatedPhysicalProgress || 0).reduce(reducer) / contracts.length,
        observed : contracts.map(c => c.x_observedPhysicalProgress || 0).reduce(reducer) / contracts.length
      }
    });
  },

  ProjectsFinancialAdvance(state, getters){
    let projects = getters.ProjectsList;

    return projects.map(project => {
      let name  = project.title,
          _b    = project.budget,
           b    = _b.amount.amount,
          _bbs  = getters.projectBudgetBreakdowns(project.id),
           bbs  = _bbs.map(bb => bb.amount.amount),
          _tran = getters.projectTransactions(project.id),
           tran = _tran.map(t => t.value.amount),
          _bls  = getters.projectBudgetLines(project.id),
           bls  = _bls.length ? _bls.map(bl => bl.measures).flat() : 0,
          exec  = bls ? bls.filter(b => b.id == "executed").map(b => b.value.amount) : bls;
      return {
        name,
        b,
        bbs : bbs.length ? bbs.reduce(reducer) : 0,
        bls,
        tran : tran.length ? tran.reduce(reducer) : 0,
        exec : exec.length ? exec.reduce(reducer) : 0
      }
    });
  },

  ProjectsByStatus : (state, getters) => {
    let projects = getters.ProjectsList;

    return statusList.map(status => {
      return {
        status : status,
        total : projects.filter(p => p.status == status).length
      }
    });
  },

  ContractsByCompetition(state, getters){
    let tenderers    = getters.ContractTenderers,
        contracts    = getters.Releases.filter(rel => getters.contractState(rel) >= getters.ContractStatusList[2].value),
        low          = contracts.filter(p => tenderers(p.ocid).length < 2),
        medium       = contracts.filter(p => tenderers(p.ocid).length > 1 && tenderers(p.ocid).length < 6),
        high         = contracts.filter(p => tenderers(p.ocid).length > 5),
        lowAmount    = !low.length ? 0 : getters.contractTotalBudget(low.map(con => con.awards).flat()),
        mediumAmount = !medium.length ? 0 : getters.contractTotalBudget(medium.map(con => con.awards).flat()),
        highAmount   = !high.length ? 0 : getters.contractTotalBudget(high.map(con => con.awards).flat()),
        total        = contracts.length,
        totalAmount  = [lowAmount, mediumAmount, highAmount].reduce(reducer),
        percent      = num => (num / total) * 100,
        percentAmount= amount => (amount / totalAmount) * 100;
// contractTotalBudget
    return [
      { title : "alta", items : high, total : high.length, amount : highAmount, percent : percent(high.length), percentAmount : percentAmount(highAmount) },
      { title : "normal", items : medium, total : medium.length, amount : mediumAmount, percent : percent(medium.length), percentAmount : percentAmount(mediumAmount) },
      { title : "baja", items : low, total : low.length, amount : lowAmount, percent : percent(low.length), percentAmount : percentAmount(lowAmount) }
    ]
  },

  ProjectsBudgetByStatus : (state, getters) => {
    let projects = getters.ProjectsList,
        data     = statusList.map(status => {
                     let amounts = projects.filter(p => p.status == status)
                                           .map(p => p.budget.amount.amount),
                           total = amounts.length ? amounts.reduce(reducer) : 0;
                      return {
                        status : status,
                        total,
                        label : getters.translate(status)[0],
                        value : total
                      }
                    }),
        max = Math.max(...data.map(d => d.total));

    data.forEach(d => d.percent = ( d.total / max )* 100  );
    return data;
  },

  ProjectsInfrastructureTotal : (state, getters) => {
    let finished = [statusList[3], statusList[4]],
        ongoing  = [statusList[0], statusList[1], statusList[2]],
        response;

    response = getters.ProjectsStartDateYear.map(year => {
                 let pr = getters.ProjectsByYear(year),
                    fin = pr.length ? pr.filter(p => finished.indexOf(p.status) != -1).length : 0,
                    on  = pr.length ? pr.filter(p => ongoing.indexOf(p.status) != -1).length : 0;

                 return {
                  year, 
                  finished : fin,
                  ongoing : on
                 }
               })
    return response;
  },

  ProjectsInfrastructurePercent : (state, getters) => {
    let finished = [statusList[3], statusList[4]],
        ongoing  = [statusList[0], statusList[1], statusList[2]],
        response;

    response = getters.ProjectsStartDateYear.map(year => {
                 let pr        = getters.ProjectsByYear(year),
                     prn       = pr.length,
                    fin        = prn ? pr.filter(p => finished.indexOf(p.status) != -1).length : 0,
                    on         = prn ? pr.filter(p => ongoing.indexOf(p.status) != -1).length : 0,
                    finPercent = fin && prn ? fin / prn : 0,
                    onPercent  = on && prn ? on / prn : 0;

                 return {
                  year, 
                  finished : finPercent * 100,
                  ongoing : onPercent * 100,
                  fin,
                  on,
                  //
                  pr,
                  prn
                 }
               })
    return response;
  },

  ProjectsByType(state, getters){
    let projects = getters.ProjectsList,
        response = projectTypes.map(type => {
          return {
            type, 
            total : projects.filter(p => p.type == type).length
          }
        });

    return response;
  },

  // 🎃 Contratos
  //
  //////////////////////////////////////////////////////////////////////
  
  ContractsByStage(state, getters){
    let contracts = getters.Releases,
        stages    = getters.ContractStatusList, 
        response  = stages.map(stage => {
          return {
            stage : stage.name,
            total : contracts.filter(con => getters.contractState(con) == stage.value).length
          }
        }); 

    return response;
  },

  ContractsAmountByTenderMethod(state, getters){
    let contracts = getters.Releases.filter(rel => getters.contractState(rel)>= 2 ),
        //_methods  = contracts.map(con => con.tender.procurementMethod),
        methods   = procurementMethods,//[...new Set(_methods)],
        response  = methods.map(method => {
                      let cons = contracts.filter(con => con.tender.procurementMethod == method),
                          _amount = cons.map(c => {
                                     let status = getters.contractState(c);
                                     if(status >= 4){
                                       return getters.contractTotalBudget(c.contracts)
                                     }
                                     else if(status >= 3){
                                       return getters.contractTotalBudget(c.awards)
                                     }
                                     else{
                                       return 0;
                                     }
                                   }),
                          amount = _amount.length ? _amount.reduce(reducer) : 0;

                      return {
                        method,
                        name    : getters.translate(method)[0],
                        label   : getters.translate(method)[0],
                        amount  : amount,
                        value   : amount,
                        percent : ( amount / getters.allAwardsTotal ) * 100,
                        _percent : (_amount.length / contracts.length) * 100,
                        total   : _amount.length 
                      }
                    })

    return response;
  },

  ContractsByProcurementMethod(state, getters){
    let contracts = getters.Releases.filter(rel => getters.contractState(rel)>= 2 );

    return procurementMethods.map(method => {
      let total = contracts.filter(con => con.tender.procurementMethod == method);
      return {
        label : getters.translate(method)[0],
        percent : (total.length / contracts.length) * 100,
        value : total.length 
      }
    });
  },

  ContractsByMainProcurementCategory(state, getters){
    let contracts = getters.Releases.filter(rel => getters.contractState(rel)>= 2 ),
        categories = [...new Set( contracts.map(c => c.tender.mainProcurementCategory) )];

    return categories.map(category => {
      return {
        category,
        name : getters.translate(category)[0],
        total : contracts.filter(c => c.tender.mainProcurementCategory == category).length
      }
    })
  },

  ContractsAmountByApplyMedium(state, getters){
    let contracts = getters.Releases.filter(rel => getters.contractState(rel)>= 2 );

    return [
      {
        medium : "online",
        name : "en línea",
        total : contracts.filter(c => c.tender.procurementMethodDetails.toLowerCase().search("federal") != -1 ).length
      },
      {
        medium : "office",
        name : "presencial",
        total : contracts.filter(c => c.tender.procurementMethodDetails.toLowerCase().search("federal") == -1 ).length
      },

    ]
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