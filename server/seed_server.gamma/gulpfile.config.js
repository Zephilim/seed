'use strict';

var GulpConfig = (function () {
    function GulpConfig() {

        this.source = './src/';
        this.release = './release/';
        this.sourceApp = this.source + 'app/';
        this.tests = this.source + '**/*.spec.ts';

        this.tsOutputPath = this.release + 'js';
        this.allJavaScript = [this.source + 'js/**/*.js'];
        this.allTypeScript = this.sourceApp + '**/*.ts';

        this.typings = './tools/typings/';
        this.libraryTypeScriptDefinitions = './tools/typings/**/*.ts';
        this.appTypeScriptReferences = this.typings + 'expenseApp.d.ts';
        
    }
    return GulpConfig;
})();
module.exports = GulpConfig;
