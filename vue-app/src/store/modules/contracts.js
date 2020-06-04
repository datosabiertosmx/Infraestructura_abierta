////////////////////////////////////////////////////////////////////////////////
//
// ⭐ STORE DE CONTRATOS
//
////////////////////////////////////////////////////////////////////////////////

// ⚠️ contrataciones de NL. Esto debería cargar dinámicamente
import c1 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E9-2018-v001-contract.json';
import c2 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E12-2019-v001-contract.json';
import c3 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E13-2019-v001-contract.json';
import c4 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E14-2019-v001-contract.json';
import c5 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E15-2019-v001-contract.json';
import c6 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E16-2019-v001-contract.json';
import c7 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E43-2013-v001-contract.json';
import c8 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E52-2016-v001-contract.json';
import c9 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-N5-2015-v001-contract.json';
import c10 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-003-2020-v001-contract.json';
import c11 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-004-2020-v001-contract.json';
import c12 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-005-2020-v001-contract.json';
import c13 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-006-2020-v001-contract.json';
import c14 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-007-2020-v001-contract.json';
import c15 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-008-2020-v001-contract.json';
import c16 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-AD-009-2020-v001-contract.json';
import c17 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-007-2019-v001-contract.json';
import c18 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-008-2019-v001-contract.json';
import c19 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-010-2019-v001-contract.json';
import c20 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-015-2019-v001-contract.json';
import c21 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-018-2017-v001-contract.json';
import c22 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-021-2018-v001-contract.json';
import c23 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-029-2018-v001-contract.json';
import c24 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-SINL-CPE-033-2018-v001-contract.json';

// ⚠️ record packages del INAI. Esto debería cargar dinámicamente
import inai1 from '../../assets/data/inai-record-package/record-package_191.json'
import inai2 from '../../assets/data/inai-record-package/record-package_269.json'
import inai3 from '../../assets/data/inai-record-package/record-package_312.json'
import inai4 from '../../assets/data/inai-record-package/record-package_342.json'
import inai5 from '../../assets/data/inai-record-package/record-package_410.json'

/*
 * 🍺 C O N S T
 * ----------------------------------------------------------------------
 */
const PLANNING       = 1;
const TENDER         = 2;
const AWARD          = 3;
const CONTRACT       = 4;
const IMPLEMENTATION = 5;
const COMPLETED      = 6;

const BUDGET_SOURCE    = "budgetSource";
const DEFAULT_CURRENCY = "MXN";

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const d3 = Object.assign({}, require("d3-array"));

/*
 * 🍺 D A T A   L I S T
 * ----------------------------------------------------------------------
 */
 let Releases = [c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15, /*c16,*/ c17, c18, c19, c20, c21, c22, c23, c24/**/];
 let RecordPackages = [inai1, inai2,inai3,inai4,inai5]; 

/*
 * 👾 S T A T E
 * ----------------------------------------------------------------------
 */
const state = {
  releasesReady       : null,
  recordPackagesReady : null,
  releases            : [],
  recordPackages      : [],
  contracts           : [],
  recordPackagesNL    : []
};

/*
 * 👾 G E T T E R S
 * ----------------------------------------------------------------------
 */
const getters = {

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos oficial
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  Releases(state){
    if(!state.releases.length) return [];

    return state.releases;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos según el
  /  string provisto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  filterContract : (state, getters) => (_str, _contracts) => {
    let contracts = _contracts || getters.Releases,
        filtered, str;

    if(!_str) return contracts;

    str = _str.toLowerCase();

    filtered = contracts.filter( con => {
      let state = getters.contractState(con),
          tags  = con.tag ? con.tag.join(",") : "",
          plan  = con.planning,
          tend  = state >= TENDER ? con.tender : null
          //cont  = state >= 3 ? con.awards : null,
          //award = state >= 4 ? con.contracts : null,
          //imple = state == 5 ? con.contracts.map(c => c.implementation) : null;

      // check id
      if(con.id.toLowerCase().search(str) != -1) return 1;

      // check ocid
      if(con.ocid.toLowerCase().search(str) != -1) return 1;

      // check tags
      if(tags.toLowerCase().search(str) != -1) return 1;

      
      // check rationale
      if(plan.rationale && plan.rationale.toLowerCase().search(str) != -1) return 1;

      // TENDER:
      if(tend){
        if(tend.awardCriteria && tend.awardCriteria.toLowerCase().search(str) != -1) return 1;
        if(tend.awardCriteriaDetails && tend.awardCriteriaDetails.toLowerCase().search(str) != -1) return 1;
        if(tend.description && tend.description.toLowerCase().search(str) != -1) return 1;
        if(tend.eligibilityCriteria && tend.eligibilityCriteria.toLowerCase().search(str) != -1) return 1;
        if(tend.id && tend.id.toLowerCase().search(str) != -1) return 1;
        if(tend.mainProcurementCategory && tend.mainProcurementCategory.toLowerCase().search(str) != -1) return 1;
        if(tend.procurementMethod && tend.procurementMethod.toLowerCase().search(str) != -1) return 1;
        if(tend.procurementMethodDetails &&tend.procurementMethodDetails.toLowerCase().search(str) != -1) return 1;
        if(tend.procurementMethodRationale && tend.procurementMethodRationale.toLowerCase().search(str) != -1) return 1;
      }
      

      // fail
      return;

    });

    return filtered;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos dado el año
  /  el año se toma del tender.enquiryPeriod.startDate
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ContractsByYear : (state) => year => {
      let res = state.releases.filter(p => {
        let _date = p.tender.enquiryPeriod.startDate,
            date  = new Date( Date.parse(_date) ),
            _year = date.getFullYear();

        return _year == year;
      });

      return res;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos dada
  /  una institución
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  institutionContracts : state => institution => {
    let        id = institution.id,
        contracts = state.releases.filter(rel => {
          let parties = rel.parties;
          return parties.find(party => party.id == id);
        });

      return contracts;
  },

  ContractInstitutions : (state, getters) => contract => {
    let buyer    = contract.parties.find(party => party.roles.indexOf("buyer") != -1),
        payer    = contract.parties.find(party => party.roles.indexOf("payer") != -1),
        proc     = contract.parties.find(party => party.roles.indexOf("procuringEntity") != -1),
        selected = buyer || proc || payer,
        institution = getters.InstitutionsList.find(inst => inst.id == selected.id)

    return institution;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos dada una
  /  institución como "payer"
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  institutionContractsAsPayer : state => institution => {
    let        id = institution.id,
        contracts = state.releases.filter(rel => {
          let parties = rel.parties;
          return parties.find(party => party.id == id && party.roles.indexOf("payer") != -1 );
        });

      return contracts;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos dada una
  /  institución como "payer"
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  institutionContractsAsBuyer : state => institution => {
    let        id = institution.id,
        contracts = state.releases.filter(rel => {
          let parties = rel.parties;
          return parties.find(party => party.id == id && party.roles.indexOf("buyer") != -1 );
        });

      return contracts;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de contratos dada una
  /  institución como "procuringEntity"
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  institutionContractsAsProcuringEntity : state => institution => {
    let        id = institution.id,
        contracts = state.releases.filter(rel => {
          let parties = rel.parties;
          return parties.find(party => party.id == id && party.roles.indexOf("procuringEntity") != -1 );
        });

      return contracts;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🌟 regresa el contrato según el ocid provisto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  Contract : (state/*, getters, rootState*/) => ocid => {
    let release = state.releases.find(d => d.ocid == ocid),
        record  = state.recordPackages.find(d => d.ocid == ocid);
    return release || record || null;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el proyecto raíz del contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  parentProject : (state, getters, rootState) => ocid => {
    let contracts = rootState.Projects.exProjects,
        contract  = contracts.find( con => con.ocids.indexOf(ocid) != -1 );
             
    return contract ? contract.project : null;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa los sectores del proyecto raíz
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  parentSectorsProject : (state, getters, rootState) => ocid => {
    let project = getters.parentProject(ocid);
    return project.sector;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa los tenderers del contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ContractTenderers: (state, getters) => ocid =>{
    let contract  = getters.Contract(ocid),
        parties   = contract.parties,
        tenderers = parties.filter(p =>  p.roles.indexOf("tenderer") != -1);

    return tenderers;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de métodos de contratación
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  TenderProcurementMethods(state, getters){
    let contracts = state.releases.filter(rel => getters.contractState(rel) >= TENDER ),
        methods   = contracts.map(c => c.tender.procurementMethod),
        uniq      = [...new Set(methods)],
        trans     = getters.translate(uniq),
        resp      = uniq.map( (tag, i) => {
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
  /  📜 regresa la lista de años disponible
  /  el año se toma del tender.enquiryPeriod.startDate
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ContractsDateYear(state){
      let _years = state.releases.map(p =>{
                     let date = p.tender.enquiryPeriod.startDate,
                            d = new Date( Date.parse( date) );
                     return d.getFullYear();
                   }),
          years  = [...new Set(_years)];

        return years.sort( (a,b) => b - a );
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de estatus del proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  ContractStatusList(){
    return [
      { name : 'planning',       value : PLANNING },
      { name : 'tender',         value : TENDER },
      { name : 'award',          value : AWARD },
      { name : 'contract',       value : CONTRACT },
      { name : 'implementation', value : IMPLEMENTATION },
      { name : 'completed',      value : COMPLETED }
    ];
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  📜 regresa la lista de awards de todos
  /  los contratos
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  allAwards(state, getters){
    let contracts = state.releases.filter(rel => getters.contractState(rel) >= 3),
        awards    = contracts.map(con => con.awards).flat();

    return awards;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el estatus del contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractState : () => contract => {
    let planning       = contract.planning,
        tender         = contract.tender,
        award          = contract.awards && contract.awards.length,
        contracts      = contract.contracts && contract.contracts.length,
        implementation = contracts && contract.contracts.find(con => con.implementation),
        completed      = contracts && contract.contracts.filter(con =>con.status == "terminated")
                                              .length == contract.contracts.length,
        state;

    if(completed){
      state = COMPLETED;
    }
    else if(implementation){
      state = IMPLEMENTATION;
    }
    else if(contracts){
      state = CONTRACT;
    }
    else if(award){
      state = AWARD;
    }
    else if(tender){
      state = TENDER;
    }
    else if(planning){
      state = PLANNING;
    }
    else{
      state = null;
    }

    return state;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el "payer" del contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractBuyer : () => contract => {
    if(!contract.parties || !contract.parties.length) return null;
    
    let buyers = contract.parties.filter(party =>{
      return party.roles.indexOf("payer") != -1;
    });

    return buyers.map( buy => buy.name ).join(", ");
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa el "procuringEntity" del contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractProcuringEntity : () => contract => {
    if(!contract.parties || !contract.parties.length) return null;
    
    let entities = contract.parties.filter(party =>{
      return party.roles.indexOf("procuringEntity") != -1;
    });

    return entities.map(ent => ent.name).join(", ");
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de proveedores de
  /  un contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractProviders : () => contract => {
    if(!contract.parties || !contract.parties.length) return [];
    
    let providers = contract.parties.filter(party =>{
      return party.roles.indexOf("supplier") != -1 //|| party.roles.indexOf("invitedSupplier") != -1;
    });

    return providers;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  🍔 regresa la lista de licitantes de
  /  un contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractTenderers : () => contract => {
    if(!contract.parties || !contract.parties.length) return [];
    
    let providers = contract.parties.filter(party =>{
      return party.roles.indexOf("supplier") != -1 || party.roles.indexOf("tenderer") != -1 
      //|| party.roles.indexOf("invitedSupplier") != -1;
    });

    return providers;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa el avance físico de un contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  physicalAdvance : (state, getters) => contract => {
    if(getters.contractState(contract) < CONTRACT) return 0;

    let contracts = contract.contracts,
        values    = contracts.map(c => c.x_physical_advance),
        percent   = values.reduce(reducer) / values.length;

    return percent;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa el avance financiero de un contrato
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  financialAdvance : (state, getters) => contract => {
    if(getters.contractState(contract) < CONTRACT) return 0;

    let contracts = contract.contracts,
        values    = contracts.map(c => c.x_financial_advance),
        percent   = values.reduce(reducer) / values.length;

    return percent;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa el presupuesto ejecutado de una 
  /  colección de contratos (las transacciones)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractExecutedBudget : () => contracts => {
    let transactions = contracts.map(con => con.implementation)
                                   .filter(imp => imp)
                                   .map(imp => imp.transactions)
                                   .flat()
                                   .filter(tr => tr);

    if(!transactions || !transactions.length) return 0;

    let items = transactions.map(tr => tr.value)
                            .filter(val => !val.currency || val.currency == DEFAULT_CURRENCY)
                            .map(val => val.amount);
    return items.reduce(reducer);
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa el presupuesto ejecutado de una 
  /  colección de procesos de contratación
  /  (las transacciones)
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractsExecutedBudget : (state, getters) => _contracts => {
    let contracts = _contracts.filter(con => getters.contractState(con) == 5 )
                              .map(con => con.contracts)
                              .flat();

    return getters.contractExecutedBudget(contracts);
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa el presupuesto ejecutado de todos
  /  los procesos de contratación ( transacciones )
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractsExecutedBudgetTotal(state, getters){
    return getters.contractsExecutedBudget(state.releases);
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa la cantidad total de los awards
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  allAwardsTotal(state, getters){
    return getters.contractTotalBudget(getters.allAwards);
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  💰 regresa la suma de value de los contratos
  /     provistos. Esto también funciona con awards
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractTotalBudget : () => contracts => {
    let items = contracts.map(con => con.value)
                         //.filter(val => !val.currency || val.currency == DEFAULT_CURRENCY)
                         .map(val => val.amount);

    return items.length ? items.reduce(reducer) : 0;
  },

  executedIncrement(state, getters){
    let r =  getters.Releases.map( rel => {
      if( getters.contractState(rel) < IMPLEMENTATION ) return 0;

      let original = getters.contractTotalBudget(rel.contracts),
          modified = getters.contractExecutedBudget(rel.contracts),
          _response = ( modified / original) * 100,
          response = _response > 100 ? _response - 100 : 0;

      return response;
    });

    return d3.mean(r);
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ⏳ regresa elementos de tender a la línea 
  /     de tiempo de proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  TimeLineTender: (state, getters) => contract => {
    if ( getters.contractState(contract) < TENDER ) return [];
    let tn = contract.tender;
    
    return [{
      type        : "tender",
      date        : new Date( Date.parse(tn.tenderPeriod.startDate) ),
      tenderers   : tn.tenderers.length,
      title       : "Se inició una licitación",
      description : tn.description
    }]
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ⏳ regresa elementos de awards a la línea 
  /     de tiempo de proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  TimeLineAwards: (state, getters) => contract => {
    if ( getters.contractState(contract) < AWARD ) return [];
    let aws      = contract.awards,
        response = [];


    aws.forEach(aw => {
      //let provider = getters.Provider(aw.suppliers[0].id);
      response.push({
        type        : "award",
        date        : new Date( Date.parse(aw.date) ),
        //provider    : provider,
        title       : "Se adjudicó un contrato",
        description : aw.description,
        amount      : aw.value.amount,
        providers   : aw.suppliers.map(sup => sup.name).join(", ")
      });
    });

    return response;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ⏳ regresa elementos de contracts a la línea 
  /     de tiempo de proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  TimeLineContracts: (state, getters) => contract => {
    if ( getters.contractState(contract) < CONTRACT ) return [];
    let cons      = contract.contracts,
        aws       = contract.awards,
        response = [];


    cons.forEach(con => {
      let award = aws.find(aw => aw.id == con.awardID);
      response.push({
        type        : "contract",
        date        : new Date( Date.parse(con.dateSigned) ),
        title       : "Se firmó un contrato",
        description : con.title,
        amount      : con.value.amount,
        providers   : award.suppliers.map(sup => sup.name).join(", ")
      });
    });

    return response;
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ⏳ regresa elementos de amendments a la línea 
  /     de tiempo de proyecto
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  TimeLineAmendments: (state, getters) => contract => {
    if ( getters.contractState(contract) < CONTRACT ) return [];
    let ams      = contract.contracts.map(c => c.contractAmendments).filter(a => a).flat(),
        response = [];

    if(!ams || !ams.length) return [];

    ams.forEach(am => {
      //let award = aws.find(aw => aw.id == con.awardID);
      response.push({
        type        : "amendment",
        date        : new Date( Date.parse(am.date) ),
        title       : "Se realizó un convenio modificatorio",
        description : am.contractAmendmentType,
        amount      : am.actualValue.amount,
        days        : am.actualPeriod.durationInDays,
        id          : am.id
      });
    });

    return response;
  },

  // contractAmendments

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ☠ sepa qué hace esto. Supone que hay 
  /    budgetBreakdown en contract
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractBudgetAmounts : () => budget => {
    if(budget.amount) return [budget.amount];
    if(budget.budgetBreakdown) return budget.budgetBreakdown.map(b => b.amount);
    return [];
  },

  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  ☠ sepa qué hace esto. Supone que hay 
  /    budgetLines en contract
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  contractBudgetSources : () => budget => {
    let budgetLines;

    if(!budget.budgetBreakdown) return [];

    budgetLines = budget.budgetBreakdown
                     .map(bb => bb.budgetLines)
                     .filter(bl => bl)
                     .flat()
                     .map(bl => bl.components)
                     .flat()
                     .filter(comp => comp.name == BUDGET_SOURCE)
                     .map(comp => comp.description)
        
    return [...new Set(budgetLines)];
  },
};

/*
 * 👾 A C T I O N S
 * ----------------------------------------------------------------------
 */
const actions = {
  getReleases(context){
    Releases.forEach(release => {
      context.commit('saveRecordPackageNL', release);
      context.commit('saveRelease', release.records[0].compiledRelease) 
    });
  },

  getRecordPackages(context){
    RecordPackages.forEach(record =>{
      record.records.forEach(r => context.commit('saveRecordPackage', r.compiledRelease) )
    });
  }
};

/*
 * 👾 M U T A T I O N S
 * ----------------------------------------------------------------------
 */
const mutations = {
  saveRelease(state, release){
    state.releases.push(release);
  },

  saveRecordPackage(state, record){
    state.recordPackages.push(record);
  },

  saveRecordPackageNL(state, record){
    state.recordPackagesNL.push(record);
  },

  setReleasesReady(state){
    state.releasesReady = true;
  },

  setRecordPackagesReady(state){
    state.releasesReady = true;
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