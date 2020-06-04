# Obra pública NL 
## dependencias (para desarrollo y actualización)
* NPM ^6.10.3
* Node ^10.7.0
* Git ^2.21.0

## Guía de instalación
Este es un proyecto desarrollado en Javascript, y solo requiere un servidor web que permita acceder a los archivos del proyecto. El código fuente se encuentra en la siguiente dirección:

```
https://github.com/hugovom/infranl
```

Para instalarlo en prueba o desarrollo, es necesario configurar un servidor que pueda desplegar el contenido de la siguiente carpeta:

```
/vue-app/dist
```

* se recomienda que el proyecto completo: se copie en el servidor web; se actualice mediante github; en el servidor se defina la carpeta de [_dist_](https://github.com/hugovom/infranl/tree/master/vue-app/dist) como la principal. De este modo, la actualización depende solo de comando: el de actualización de github.

* en caso de no ser posible usar la recomendación anterior, basta con copiar el contenido de la carpeta [_dist_](https://github.com/hugovom/infranl/tree/master/vue-app/dist) dentro de  la carpeta web.

* dentro de esta carpeta es necesario generar un archivo llamada __.htaccess__ con el siguiente contenido (para un servidor Apache):
```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html?path=$1 [NC,L,QSA]
```


* Para otros servidores, se puede consultar una guía [aquí](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)

## Instalación 
Una vez que se tiene el proyecto de git, hay que entrar a la carpeta de vue-app y correr el comando:

```
npm install
```

## Servidor de desarrollo
Es posible correr un servidor de prueba desde la línea de comando. Para esto, es necesario entrar a la carpeta vue-app y correr el siguiente comando:

```
npm run serve
```

Esto hará que se inicie un servidor en localhost, en el puerto 8080

## Unit testing
Para correr las pruebas unitarias, hay que ejecutar el siguiente comando dentro de /vue-app:

```
npm run test:unit
```

las pruebas se encuentran definidas dentro de /vue-app/test/unit

## Actualización de datos
se requieren dos pasos para integrar los json de obra y de procesos de contratación al sistema: copiarlos en la carpeta correspondiente, y darlos de alta en el módulo del store correspondiente (VueX).

### Copiar los documentos al proyecto
La carpeta para contratos(OCDS) es la siguiente: 

```
/vue-app/src/assets/data/nl-releases
```

La carpeta para proyectos (OC4IDS) es la siguiente:

```
/vue-app/src/assets/data/nl-oc4ids para documentos OC4IDS
```

los documentos OCDS son de tipo record package y los documentos OC4IDS son de tipo release. 

### Dar de alta los documentos en el store
Una vez que se han copiado los documentos en el sistema, es necesario darlos de alta en el store de proyectos y contratos.

#### Dar de alta los documentos OCDS
Para dar de alta los contratos OCDS, hay que editar el siguiente archivo:

```
/vue-app/src/store/modules/contracts.js
```

dentro de este archivo, es necesario registrar cada documento json:

```
import c1 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E9-2018-v001-contract.json';
import c2 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E12-2019-v001-contract.json';
import c3 from '../../assets/data/nl-releases/RecordPackage-ocds-7wj9x5-LO-919009986-E13-2019-v001-contract.json';
...
```

y después agregarlo a un array llamado _Releases_

```
let Releases = [c1,c2,c3, ... ]
```

#### Dar de alta los documentos OC4IDS
Para dar de alta los proyectos OC4IDS, hay que editar el siguiente archivo:

```
/vue-app/src/store/modules/projects.js
```

dentro de este archivo, es necesario registrar cada documento json:

```
import p1 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000009-v000001.json';
import p2 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000001-v000001.json';
import p3 from '../../assets/data/nl-oc4ids/ProjectRelease-oc4ids-gx3fo2-000002-v000001.json';
...
```

y después agregarlo a un array llamado _Projects_

```
let Projects = [p1,p2,p3, ... ]
```

### Generar el nuevo build con los datos
Una vez actualizada la información, es necesario generar un build con los nuevos datos. En la carpeta /vue-app hay que ejecutar el siguiente comando:

```
npm run build
```



## Estructura básica de un proyecto de Vue (dentro de la carpeta _/vue-app_)

* _/src/main.js_: incluye la creación de la instancia de Vue y asigna el router y el store (Vuex); hace el render del primer template (App.vue) dentro del selector indicado (#app).
* _/src/App.vue_: incluye la navegación principal (los links del router) y el elemento que despliega el contenido de todos los componentes de vue (router-view).
* _router/index.js_: describe cada ruta del sitio y la relaciona con el componente que despliega la información
* _store/index.js_: centraliza la consulta de información disponible para todos los componentes de Vue del proyecto.
* _/public_: esta carpeta contiene el elemento html raíz del app de Vue y los elementos de diseño como css e imágenes.
* _/src_: esta carpeta contiene el código del proyecto
* _/src/views_: esta carpeta contiene los componentes principales del proyecto, los que representan cada sección.
* _/src/components_: esta carpeta incluye los componentes modulares que despliegan parte del contenido del proyecto, como mapas, gráficas, listas, etc.
* _/src/assets_: esta carpeta contiene archivos necesarios para la operación del proyecto y que no son específicos de Vue, como catálogos de información en csv.
