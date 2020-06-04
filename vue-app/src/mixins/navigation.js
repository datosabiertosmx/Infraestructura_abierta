export default {
  methods : {
    goto(page){
      this.page = page;
      this.$router.push({ params: { page } });
    }
  },

  computed : {
    pages(){
      let pageSize = this.$store.state.pageSize,
          pages    = Math.ceil( this.searchItems.length / pageSize );

      return pages;
    },

    pageItems(){
      let pageSize = this.$store.state.pageSize,
          from     = (this.page -1) * pageSize,
          to       = from + pageSize;

      return this.searchItems.slice(from, to);
    },

    searchItems(){
      if(!this.search) return this.listItems;

      return this.$store.getters.simpleSearch(this.search, this.searchType);
    }
  }
}