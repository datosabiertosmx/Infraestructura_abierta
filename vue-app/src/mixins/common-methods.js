export default {
  methods : {
    format(num){
      return this.$store.getters.formatNumber(num);
    }
  }
}