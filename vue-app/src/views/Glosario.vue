<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
import SocialSharing from "vue-social-sharing";

  export default {
    methods : {
      translate(text){
        return this.$store.getters.translate(text)
      }
    },

    /*
     * 👾 C O M P U T E D
     * ----------------------------------------------------------------------
     */
    computed : {
      location(){
        return window.location.href;
      }
    },


    /*
     * 👾 C O M P O N E N T S
     * ----------------------------------------------------------------------
     */
    components : {
      SocialSharing
    },
  }
</script>

<!--
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ⭐ INICIA EL TEMPLATE DEL COMPONENTE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
  <div>
    <div class="ai_social_sharing">
    <social-sharing :url="location"
                    title="Glosario del proyecto de Infraestructura Abierta"
                    description=""
                    quote=""
                    hashtags="InfraestructuraAbierta"
                    inline-template>
       <!-- twitter-user="vuejs"-->
       <div>

         <network network="facebook">
           <span class="sm fb">Facebook</span>
         </network>
        <network network="twitter">
          <span class="sm tw">Twitter</span>
          </network>
        <network network="telegram">
          <span class="sm tl">Telegram</span>
        </network>
      </div>
    </social-sharing>
    </div>
    <!--Breadcrumb-->
    <ul class="breadcrumb">
      <li><router-link :to="`/`">  Inicio</router-link></li>
      <li>Glosario</li>
    </ul>
    <section class="ia_hero mb-4">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="ia_title_hm">Glosario</h1>
            <p>En la Plataforma se encuentran distintos conceptos que aquí se detallan.</p>
          </div>
        </div>
      </div>
    </section>
    <div class="container pt-4 mt-4">
      <!-- número de proyectos-->
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4">Programas de obra pública</h2>
          <p> Son la fuente de recursos con que se financian los distintos proyectos de obra pública disponibles a visualizar en la plataforma, estos pueden ser federales y/o estatales. Esta es la forma más amplia, disponible en la plataforma, de clasificar el gasto público para infraestructura.</p>
        </div>
        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Proyectos de infraestructura</h2>
          <p>Son las distintas obras, remodelaciones y ampliaciones que realiza la Secretaría de Infraestructura disponibles en la plataforma. Cada proyecto tiene un identificador único. Los proyectos tienen distintas fases que pueden ser: identificación, preparación, implementación, terminación, completados, y en su caso, cancelados.
De igual forma los proyectos se clasifican por tipo y estos pueden ser de construcción y de rehabilitación. En la plataforma se encuentra que cada proyecto está catalogado según el sector que atiende, estos pueden ser de educación, cultura, transporte urbano, salud, vivienda social y agua y residuos.</p>
        </div>
        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Contrataciones</h2>
          <p>Cada obra, remodelación y/o ampliación requiere generar un contrato. Este es el número de contrataciones realizados por la Secretaría de Infraestructura para generar los proyectos disponibles en la plataforma.</p>
          <p>Se puede conocer la etapa en la que se encuentra cada contrato, éstas pueden ser de planeación, licitación, adjudicación, contratación y ejecución. Cada contrato tiene un identificador único para poder darle seguimiento.</p>

          <p>En la plataforma se puede conocer la competencia en las contrataciones, lo que quiere decir, la cantidad de licitantes que participaron en un proceso de contratación. Existen tres niveles de competencia que son:</p>
        </div>
        <div class="col-11 offset-1">
          <ul>
            <li>Alta: si participaron y se evaluaron más de 5 propuestas de licitantes.</li>
            <li>Normal:  si participaron y se evaluaron más de 2 pero menos de 6 propuestas de licitantes.</li>
            <li>Baja: si sólo participó un licitante.</li>
          </ul>
        </div>

        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Métodos de contrataciones</h2>
          <p><strong>Abierta:</strong>  consiste en una invitación abierta dirigida a todos aquellos con un posible interés en presentar ofertas, lo que significa una licitación. </p>
          <p><strong>Directa:</strong> es una modalidad de selección que tiene la contratación Estatal, donde las Entidades compradoras del Estado pueden celebrar contratos con los particulares o con el mismo estado, sin necesidad de realizar una convocatoria pública, esto con la finalidad de ahorrar tiempo en la adquisición de bienes y/o servicios.</p>
        </div>

        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Contratistas</h2>
          <p>Son las personas o empresas que fueron contratadas para la construcción o entrega de un servicio.</p>
        </div>

        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Licitantes</h2>
          <p>Es la cantidad de empresas que han competido en licitaciones públicas por algún contrato relacionado a los proyectos de infraestructura aquí disponibles en la plataforma.</p>
        </div>

        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <h2 class="mb-4">Entidad compradora</h2>
          <p>Es la institución, municipio o secretaría que solicita a la Secretaría de Infraestructura construir un proyecto de infraestructura, en muchos casos es la Secretaria de Finanzas y Tesorería General del Estado de Nuevo León. La Secretaría de Infraestructura construye, no opera dichos proyectos una vez terminados.</p>
        </div>

        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <p>Los proyectos y contratos presentan los siguientes montos:</p>
        </div>

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Monto programado</h2>
          <p>Dinero presupuestado de forma inicial para un proyecto y/o contrato. El monto final pagado puede ser menor o mayor según cada situación.</p>
        </div>

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Monto ejercido</h2>
          <p>Dinero total pagado de un contrato o un proyecto.</p>
        </div>


        <div class="col-12 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

        <div class="col-12">
          <p>De los indicadores se tienen las siguientes definiciones:</p>
        </div>

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Avance financiero</h2>
          <p>Es el porcentaje de dinero pagado sobre el monto total aprobado a gastar. En caso que dicho porcentaje sea 85% significa que, a la fecha de actualización, se pagado ese porcentaje del total del contrato y/o proyecto.</p>
        </div>

        <!--
        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Avance físico</h2>
          <p>Es el porcentaje de dinero pagado sobre el monto total aprobado a gastar. En caso que dicho porcentaje sea 85% significa que, a la fecha de actualización, se pagado ese porcentaje del total del contrato y/o proyecto.</p>
        </div>-->

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Diversidad de Empresas Ganadoras (por cada 100)</h2>
          <p>Es el número de empresas distintas, de los contratos disponibles en la plataforma, que tienen contratos adjudicados por cada 100 empresas. Este indicador ayuda a entender que tanto se ha contratado con distintas empresas.</p>
        </div>

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Procedimiento con Convenio (Promedio)</h2>
          <p>Es el número de contratos, en promedio y disponibles en la plataforma, que cuentan con un convenio en el que se modifica el monto o el plazo de entrega de la obra o servicio.</p>
        </div>

        <div class="col-10 offset-1 mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>
        <div class="col-10 offset-1">
          <h2 class="mb-4">Incremento ejecutado (Promedio)</h2>
          <p>Es porcentaje promedio de incremento en el monto pagado de los contratos respecto al monto aprobado. Esto se hace respecto a todas las contrataciones disponible en la plataforma.</p>
        </div>

      </div>


  </div>
  </div>
</template>
