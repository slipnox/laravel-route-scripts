"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LaraRoutesScripts = /** @class */ (function () {
    function LaraRoutesScripts(routes) {
        this.intendedScriptRoute = routes;
        this._setRoutes();
    }
    //------------------ HELPERS
    LaraRoutesScripts.prototype.onInit = function (initFn) {
        if (this._isValidRoute()) {
            initFn ? initFn(this) : false;
        }
        return this;
    };
    LaraRoutesScripts.prototype.initVue = function (vueProps) {
        var Vue = require('vue');
        try {
            // @ts-ignore
            window.Vue = Vue;
            this.$vi = new Vue(vueProps);
            return this.$vi;
        }
        catch (e) {
            console.warn("LaravelRoutes: There is a problem loading VueJS please add Vue to your dependencies.");
        }
    };
    LaraRoutesScripts.prototype.docReady = function (docReadyFn) {
        var _this = this;
        if (this._isValidRoute()) {
            window.addEventListener('DOMContentLoaded', function () {
                docReadyFn ? docReadyFn(_this) : false;
            });
        }
        return this;
    };
    LaraRoutesScripts.prototype.getCurrentRouteName = function () {
        return this.routeName;
    };
    LaraRoutesScripts.prototype.enableVueDev = function () {
        // @ts-ignore
        Vue.config.devtools = true;
        return this;
    };
    LaraRoutesScripts.prototype.isRoute = function (routeName) {
        return this.routeName === routeName;
    };
    LaraRoutesScripts.prototype._setTargetRoute = function () {
        this._intendedScriptRoute = typeof this.intendedScriptRoute === 'string'
            ? this.routes.push(this.intendedScriptRoute)
            : this.routes = this.intendedScriptRoute;
        return this;
    };
    LaraRoutesScripts.prototype._isValidRoute = function () {
        return this.routes.includes(this.getCurrentRouteName());
    };
    LaraRoutesScripts.prototype._setRoutes = function () {
        this.routes = [];
        this._checkRouteElement();
        this.routeName !== '' ? this._setTargetRoute() : false;
    };
    LaraRoutesScripts.prototype._checkRouteElement = function () {
        this.dataAttrName = 'laravel-route-name';
        this.routeElement = document.querySelector("[data-" + this.dataAttrName + "]");
        this.routeElement !== null
            // @ts-ignore
            ? this.routeName = this.routeElement.dataset[this._convertToCammelCase(this.dataAttrName)]
            : console.warn("LaravelRoutes: in your views layouts you must to set to any element the attribute: data-laravel-route-name=\"{{ Route::currentRouteName() }}\"");
    };
    LaraRoutesScripts.prototype._convertToCammelCase = function (str) {
        return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    };
    return LaraRoutesScripts;
}());
exports.default = LaraRoutesScripts;
//# sourceMappingURL=laravel-route-scripts.js.map