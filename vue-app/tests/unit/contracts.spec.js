import c1 from '@/assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E9-2018-v001-contract.json';
import c2 from '@/assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E12-2019-v001-contract.json';
import p1 from '@/assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000009-v000001.json';
import p2 from '@/assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000001-v000001.json';

import Contracts from '@/store/modules/contracts'
import Projects from '@/store/modules/projects'
import Providers from '@/store/modules/providers'

import {createLocalVue} from "@vue/test-utils";
//import store from '@/store/index'
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuex);


const store = new Vuex.Store({
  state : {
    pageSize : 5
  },
  modules : {
    Projects, 
    Contracts,
    Providers
  },
  getters : {
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
    }
  }
});

// CONTRACT LOADING
describe('test the OCDS contracts loading', () => {
  // CARGA LOS CONTRATOS
  it('load contracts', async () => {
    await store.dispatch("getReleases")
    expect(store.getters.Releases.length).toBeGreaterThan(0);
  })

  // BUSCA UN CONTRATO 
  it('find a contract after load', ()=> {
    const ocid = "ocds-7wj9x5-LO-919009986-E9-2018-v001";
    const obj  = store.getters.Contract(ocid);
    expect(typeof obj).toBe("object");
    //expect(obj).toHaveProperty("ocid");
  })
})

// PROJECT LOADING
describe('test the OC4IDS projects loading', () => {
  // CARGA LOS PROYECTOS
  it('load projects', async () => {
    await store.dispatch("getProjects")
    expect(store.getters.ProjectsList.length).toBeGreaterThan(0);
  })

  // BUSCA UN PROYECTO
  it('find a project after load', ()=> {
    const id = "oc4ids-gx3fo2-000004";
    const obj  =  store.getters.Project(id);
    expect(typeof obj).toBe("object");
    //expect(obj).toHaveProperty("id");
  })
})


// PROJECT AND CONTRACT RELATION
describe('show the relationship between OC4IDS and OCDS', () => {
  it('count the contracts related to a specific project', async() => {

    await store.state.Projects.projects
               .forEach( project => store.dispatch('createExtendedProject', project));
    const id        = "oc4ids-gx3fo2-000004";
    const contracts = store.getters.ProjectContractReleases(id);

    expect(contracts.length).toBeGreaterThan(0);
  })

  
  it('confirms the relation between project and contract using parentProject', () => {
    const id   =  "oc4ids-gx3fo2-000004";
    const ocid = "ocds-7wj9x5-LO-919009986-E9-2018-v001";

    const contract = store.getters.Contract(ocid);
    const project  = store.getters.parentProject(contract.ocid);

    expect(project.id == id).toBe(true);
  })
  
})

// CONTRACT RELATIONSHIPS
describe('show the relationships between OCDS and the site metadata', ()=> {
  it("review the file to find the process stage", ()=> {
    const ocid        = "ocds-7wj9x5-LO-919009986-E9-2018-v001";
    const contract    = store.getters.Contract(ocid);
    let expectedStage = 6 // completed;
    expect(store.getters.contractState(contract)).toBe(expectedStage);
  })

  it("get the sectors of the contract's parent project", ()=> {
    const ocid        = "ocds-7wj9x5-LO-919009986-E9-2018-v001";
    const contract    = store.getters.Contract(ocid);
    const sectors     = store.getters.parentSectorsProject(contract.ocid);

    expect(sectors.length).toBeGreaterThan(0);
  })
});

// PROJECT RELATIONSHIPS
describe('show the relationships between OC4IDS and the site metadata', () => {
  it("load the photo list for a given project", ()=> {
    const id       = "oc4ids-gx3fo2-000004";
    const project  =  store.getters.Project(id);
    const photos   = store.getters.ProjectPhotos(project);

    expect(photos.length).toBeGreaterThan(0);
  })

  it("load the provider list for a given project", ()=> {
    const id        = "oc4ids-gx3fo2-000004";
    const project   =  store.getters.Project(id);
    const providers = store.getters.ProjectProviders(project.id);

    expect(providers.length).toBeGreaterThan(0);
  })


});