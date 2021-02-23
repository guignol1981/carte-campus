module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'fr',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
