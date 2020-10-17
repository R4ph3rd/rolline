module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/colors.scss";
          @import "@/scss/fonts.scss";
          @import "@/scss/commonClasses.scss";
        `
      }
    }
  }
}

