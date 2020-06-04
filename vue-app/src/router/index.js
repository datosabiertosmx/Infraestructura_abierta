/*
 * I N I C I A   E L   R O U T E R
 * ----------------------------------------------------------------------
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: Home,
    meta: {
      title : "Infraestructura Abierta",
      metaTags : [
        {
          name    : 'description',
          content : 'Portal de publicación de información de proyectos de infraestructura.'
        },
        {
          property: 'og:description',
          content : 'Portal de publicación de información de proyectos de infraestructura.'
        }
      ]
    }
  },
  /*
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  /
  /  De aquí hacia abajo, solo carga los
  /  componentes que necesita
  /
  /  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
  */
  {
    path: '/programas/:page?',
    name: 'programas',
    component: () => import(/* webpackChunkName: "Programas" */ '../views/Programas.vue'),
    meta: {
      title : "Programas de Obra Pública en el estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Son los recursos del Gobierno federal y del estado con qué se financian los distintos proyectos de obra pública disponibles a visualizar en la plataforma'
        },
        {
          property: 'og:description',
          content : 'Son los recursos del Gobierno federal y del estado con qué se financian los distintos proyectos de obra pública disponibles a visualizar en la plataforma'
        }
      ]
    }
  },
  {
    path: '/programa/:id',
    name: 'programa',
    component: () => import(/* webpackChunkName: "Programa" */ '../views/Programa.vue'),
    meta: {
      title : "Programa de Obra Pública en el estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Información del programa de Obra Pública del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Información del programa de Obra Pública del estado de Nuevo León'
        }
      ]
    }
  },
  {
    path: '/proyectos/:page?',
    name: 'proyectos',
    component: () => import(/* webpackChunkName: "Proyectos" */ '../views/Proyectos.vue'),
    meta: {
      title : "Proyectos de infraestructura del estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Son las distintas obras, remodelaciones y ampliaciones que realiza la Secretaría de Infraestructura disponibles en la plataforma'
        },
        {
          property: 'og:description',
          content : 'Son las distintas obras, remodelaciones y ampliaciones que realiza la Secretaría de Infraestructura disponibles en la plataforma'
        }
      ]
    }
  },
  {
    path: '/proyecto/:id',
    //name: 'proyecto',
    component: () => import(/* webpackChunkName: "Proyecto" */ '../views/Proyecto.vue'),
    meta: {
      title : "Proyecto de infraestructura del estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Información del proyecto de infraestructura del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Información del proyecto de infraestructura del estado de Nuevo León'
        }
      ]
    },
    children : [
      {
        path : "",
        name: 'design',
        component: () => import(/* webpackChunkName: "ProyectoDisenoTab" */ '../views/ProyectoDisenoTab.vue'),
      },
      {
        path : "construccion",
        name: 'construccion',
        component: () => import(/* webpackChunkName: "ProyectoConstruccionTab" */ '../views/ProyectoConstruccionTab.vue'),
      },
      {
        path : "terminacion",
        name: 'terminacion',
        component: () => import(/* webpackChunkName: "ProyectoTerminacionTab" */ '../views/ProyectoTerminacionTab.vue'),
      }
    ]
  },
  {
    path: '/contrataciones/:page?',
    name: 'contrataciones',
    component: () => import(/* webpackChunkName: "Contrataciones" */ '../views/Contrataciones.vue'),
    meta: {
      title : "Contrataciones públicas del estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Cada obra, remodelación y/o ampliación requiere generar un contrato. Este es el número de contrataciones realizados por la Secretaría de Infraestructura para generar los proyectos disponibles en la plataforma.'
        },
        {
          property: 'og:description',
          content : 'Cada obra, remodelación y/o ampliación requiere generar un contrato. Este es el número de contrataciones realizados por la Secretaría de Infraestructura para generar los proyectos disponibles en la plataforma.'
        }
      ]
    }
  },
  {
    path: '/contratacion/:id',
    // name: 'contratacion',
    component: () => import(/* webpackChunkName: "Contratacion" */ '../views/Contratacion.vue'),
    meta: {
      title : "Contratación públicas del estado de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Información de las contratación pública del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Información de las contratación pública del estado de Nuevo León'
        }
      ]
    },
    children : [
      {
        path : "",
        name : 'planeacion',
        component: () => import(/* webpackChunkName: "ContratacionPlaneacionTab" */ '../views/ContratacionPlaneacionTab.vue')
      },
      {
        path : "invitacion",
        name : 'invitacion',
        component: () => import(/* webpackChunkName: "ContratacionInvitacionTab" */ '../views/ContratacionInvitacionTab.vue')
      },
      {
        path : "adjudicacion",
        name : 'adjudicacion',
        component: () => import(/* webpackChunkName: "ContratacionAdjudicacionTab" */ '../views/ContratacionAdjudicacionTab.vue')
      },
      {
        path : "contratacion",
        name : 'contratacion',
        component: () => import(/* webpackChunkName: "ContratacionContratacionTab" */ '../views/ContratacionContratacionTab.vue')
      },
      {
        path : "ejecucion",
        name : 'ejecucion',
        component: () => import(/* webpackChunkName: "ContratacionEjecucionTab" */ '../views/ContratacionEjecucionTab.vue')
      }
    ]
  },
  {
    path: '/contratistas/:page?',
    name: 'contratistas',
    component: () => import(/* webpackChunkName: "Contratistas" */ '../views/Contratistas.vue'),
    meta: {
      title : "Contratistas de de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Son las personas o empresas que fueron contratadas para la construcción o entrega de un servicio por el gobierno de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Son las personas o empresas que fueron contratadas para la construcción o entrega de un servicio por el gobierno de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/contratista/:id',
    name: 'contratista',
    component: () => import(/* webpackChunkName: "Contratista" */ '../views/Contratista.vue'),
    meta: {
      title : "Contratista de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Información del contratista del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Información del contratista del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/instituciones/:page?',
    name: 'instituciones',
    component: () => import(/* webpackChunkName: "Instituciones" */ '../views/Instituciones.vue'),
    meta: {
      title : "Instituciones de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Lista de instituciones, municipios o secretarías que solicitan a la Secretaría de Infraestructura construir un proyecto de infraestructura. La Secretaría de Infraestructura construye, no opera dichos proyectos una vez terminados.'
        },
        {
          property: 'og:description',
          content : 'Lista de instituciones, municipios o secretarías que solicitan a la Secretaría de Infraestructura construir un proyecto de infraestructura. La Secretaría de Infraestructura construye, no opera dichos proyectos una vez terminados.'
        }
      ]
    },
  },
  {
    path: '/institucion/:id',
    name: 'institucion',
    component: () => import(/* webpackChunkName: "Institucion" */ '../views/Institucion.vue'),
    meta: {
      title : "Institución de Nuevo León",
      metaTags : [
        {
          name    : 'description',
          content : 'Información de institución con infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Información de institución con infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/indicadores',
    name: 'indicadores',
    component: () => import(/* webpackChunkName: "Indicadores" */ '../views/Indicadores.vue'),
    meta: {
      title : "Indicadores de Infraestructura Abierta",
      metaTags : [
        {
          name    : 'description',
          content : 'Indicadores de infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Indicadores de infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/glosario',
    name: 'glosario',
    component: () => import(/* webpackChunkName: "Indicadores" */ '../views/Glosario.vue'),
    meta: {
      title : "Glosario de Infraestructura Abierta",
      metaTags : [
        {
          name    : 'description',
          content : 'Glosario de infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Glosario de infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/acerca-del-proyecto',
    name: 'acerca',
    component: () => import(/* webpackChunkName: "Indicadores" */ '../views/Acerca.vue'),
    meta: {
      title : "Acerca del proyecto de Infraestructura Abierta",
      metaTags : [
        {
          name    : 'description',
          content : 'Acerca del proyecto de infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Acerca del proyecto de infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '/busqueda/:page?',
    name: 'busqueda',
    component: () => import(/* webpackChunkName: "Resultados" */ '../views/Resultados.vue'),
    meta: {
      title : "Resultados de búsqueda",
      metaTags : [
        {
          name    : 'description',
          content : 'Resultados de búsqueda de infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Resultados de búsqueda de infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  },
  {
    path: '*',
    name : '404',
    component: () => import(/* webpackChunkName: "Busqueda" */ '../views/404.vue'),
    meta: {
      title : "Página no encontrada",
      metaTags : [
        {
          name    : 'description',
          content : 'Página no encontrada en infraestructura abierta del estado de Nuevo León'
        },
        {
          property: 'og:description',
          content : 'Página no encontrada en infraestructura abierta del estado de Nuevo León'
        }
      ]
    },
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base : '/transparencia/',
  scrollBehavior (to, from, savedPosition) {
    /*
    console.log("nav:", to);
    
    if (savedPosition) {
      return savedPosition
    }
    */
    let dontJump = [ "construccion", "terminacion", "invitacion", "adjudicacion", "contratacion", "ejecucion"];
    if( dontJump.indexOf(to.name) != -1 ){
      return savedPosition;
    }
    else if(to.params.page){
      return {};
    }
    else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  /*
  let state = to.params.state || null,
      item  = state ? Entidades.find( ent => ent.url == state) : null;

  if(item){
    to.meta.title = to.meta.title.replace(":state", item.entidad);

    to.meta.metaTags.forEach(m => m.content =  m.content.replace(":state", item.entidad) );
  }
  */

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});



export default router
