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
                    title="Acerca del proyecto de Infraestructura Abierta"
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
      <li>Acerca del Proyecto</li>
    </ul>
    <section class="ia_hero mb-4">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1 class="ia_title_hm">Acerca del Proyecto</h1>
          </div>
        </div>
      </div>
    </section>
    <div class="container pt-4 mt-4">
      <!-- número de proyectos-->
      <div class="row">
        <div class="col-12">
          <p>La MMAOP-NL reúne a la <a href="">Secretaría de Infraestructura de Nuevo León</a>, al <a href="http://inicio.inai.org.mx/">Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</a>, a <a href="https://www.mexicoevalua.org/">México Evalúa</a>, la <a href="http://arquitectura.uanl.mx/">Facultad de Arquitectura de la Universidad Autónoma de Nuevo León (FACARQUANL)</a>, la <a href="https://www.cmicnl.mx/">Cámara Mexicana de la Industria de la Construcción Delegación Nuevo León (CMICNL)</a>, la iniciativa ciudadana <a href="http://www.comovamosnl.org/">Cómo Vamos, Nuevo León</a>, y la <a href="http://www.ctainl.org.mx/quees.php">Comisión de Transparencia y Acceso a la Información del Estado de Nuevo León (COTAI)</a>.</p>
          <p>Se materializa el compromiso de transparencia del Gobierno de Nuevo León con la publicación de información de una muestra de proyectos en un nuevo micrositio. </p>
          <p>La MMAOP llevará a cabo una revisión de la información publicada en el ejercicio piloto de 9 proyectos y uno por definir para identificar si será necesario realizar ajustes para cumplir con las expectativas del compromiso de publicación de información y con las mejores prácticas en la materia.</p>
          <p>Se tiene el propósito de utilizar los insumos de la retroalimentación de la fase anterior y mantener la mesa en funcionamiento en el mediano y largo plazo, para brindar acompañamiento a la Secretaría de Infraestructura en la publicación de todos sus proyectos de infraestructura bajo esta nueva mejor práctica de transparencia y apertura gubernamental.</p>
          <p>Se tiene una NUEVA plataforma en la que la Secretaría de infraestructura de Nuevo León publica información sobre los proyectos de obra pública, los contratos relacionados, las fuentes de financiamiento, los contratistas y de las instituciones que solicitan los proyectos de infraestructura.	</p>
<p>Se tiene información de 9 proyectos de obra pública con 15 contratos. En dichos contratos participaron 76 licitantes y son 9 distintas instituciones que operan estos proyectos.		 </p>
<p>Los proyectos de infraestructura están identificados según el sector al que pertenecen: educación, cultura, transporte urbano, salud, vivienda social y agua y residuos.					 </p>
<p>También se puede identificar a los proyectos según si son de construcción de obra nueva o de rehabilitación.				 </p>
<p>Los proyectos están geo-referenciados en un mapa, en el que se puede identificar según el municipio en el que se realiza el proyecto, según si este está en construcción o ya fue terminado. </p>
<p>De los proyectos se podrá conocer el monto presupuestado a la fecha y el monto pagado. De igual forma se da a conocer el avance físico de los proyectos en un resumen y con fotografías.	 </p>
<p>Cada uno de los proyectos aquí publicados tendrá documentos accesibles para su descarga con la información completa de su diseño y ejecución. También cada uno de los proyectos tendrá información actualizada de su estatus para responder a las siguientes preguntas: ¿En qué fase se encuentra?, ¿hay evaluaciones de impacto del proyecto? ¿Cuál era su presupuesto a la fecha de hoy? ¿ya se contrató la obra? ¿cuánto dinero se ha pagado? ¿Va en tiempo y forma? ¿dónde se está construyendo? ¿cuánto tiempo va a tardar dicho proyecto? ¿existen evaluaciones o auditorías? ¿ya se pagó toda la obra? </p>
<p>Se innova dando a conocer el nivel de competencia que existió en las licitaciones de los contratos.	</p>
<p>Adicional a la información que se daba a conocer de forma previa en la página disponible de la Secretaría de Infraestructura (SINL), se tendrá información si los contratos tienen convenios modificatorios y el documento. Con esto se conocerá si algún proyecto y qué contrato tuvo modificaciones al presupuesto.		</p>
<p>Se podrá conocer también todos los contratos que tienen las distintas empresas con la Secretaría.			 </p>
<p>La plataforma cuenta con una opción para la descarga de los datos de cada uno de los proyectos en formato JSON (para su análisis a detalle) y descarga en pdf. También se pueden descargar todos los datos en conjunto para aquellos interesados en analizar a profundidad lo disponible.	 </p>
<p>La publicación de información de proyectos y contratos de la SINL en la plataforma cumple con el estándar de información abierta OC4IDS, siendo la primera institución a nivel internacional en implementarlo. </p>
<p>La plataforma, generada por la MMAOP-NL, está programada en código abierto para todos aquellos estados, municipios e instituciones que tengan interés en abrir su infraestructura.		 </p>

        </div>
        <div class="col mb-4 pb-4">
          <div class="ia_separator bottom"></div>
        </div>

      </div>

      <div class="row mt-4 pt-4">
        <div class="col">
        <p class="text-center"><router-link :to="'glosario'" class="ia_btn">Glosario</router-link></p>
        </div>
      </div>

  </div>
  </div>
</template>
