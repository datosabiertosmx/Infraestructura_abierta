<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // INICIA EL CÓDIGO DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<script>
  import * as basicLightbox from 'basiclightbox';
  import Siema from 'siema';

	export default{
    /*
     * 👾 P R O P S
     * ----------------------------------------------------------------------
     */
    props : ["photos"],

    data(){
      return {
        slider : null,
        slides : 10
      }
    },

    /*
     * 👾 M E T H O D S
     * ----------------------------------------------------------------------
     */
    methods : {
      showLightBox(event){
        let src = event.target.src,
        lb = basicLightbox.create(`<img width="100%" height="auto" src="${src}">`);
        lb.show();
      },

      next(){
        this.slider.next();
      },

      prev(){
        this.slider.prev();
      },
    },

    mounted(){
      this.slider = new Siema({perPage: this.slides});
    },

		/*
		 * 👾 C O M P U T E D
		 * ----------------------------------------------------------------------
		 */
		computed : {


			/*
			/  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
			/
			/  regresa el proyecto según el id
			/
			/  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
			*/
			project(){
				return this.$root.$store.getters.Project(this.$route.params.id);
			}
		}



	}
</script>

<!--
	////////////////////////////////////////////////////////////////////////////////
  //
  // DEFINE EL TEMPLATE DEL COMPONENTE DE VUE
  //
  ////////////////////////////////////////////////////////////////////////////////
-->
<template>
	<div>
    <div class="row">
      <div class="col relative">
		<div v-if="photos" class="siema">
			<!--<div v-for="(projectDocument, i) in photos" :key="i + 'photo'">
				<div class="col no-gutters"> -->
          <a v-for="(projectDocument, i) in photos" :key="i + 'photo'"  :data-img="`${projectDocument.title}`"
           class="ia_img_project">
           <figure>
					      <img v-on:click="showLightBox($event)"
               :src="`${projectDocument.url}`"
               height="100px" :alt="`${projectDocument.title}`" />
             </figure>
            </a>
				 <!-- </div>

			</div> -->
		</div>
    <button class="prev ia_img_project_btn" v-on:click="prev">&lt;</button>
    <button class="next ia_img_project_btn"  v-on:click="next">&gt;</button>
</div>
	</div>
	</div>
</template>

<style scoped>
  @import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
</style>
