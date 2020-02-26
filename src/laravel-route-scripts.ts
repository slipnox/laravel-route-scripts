class LaraRoutesScripts {
    private readonly intendedScriptRoute: any;
    private $vi: object;
    private _intendedScriptRoute: any;
    private routes: any;
    private routeName: any;
    private dataAttrName: string;
    private routeElement: Element;

    constructor(routes) {
        this.intendedScriptRoute = routes;
        this._setRoutes()
    }

    //------------------ HELPERS
    onInit(initFn) {
        if (this._isValidRoute()) {
            initFn ? initFn(this) : false
        }
        return this
    }

    initVue(vueProps) {
        let Vue = require('vue');

        try {
            // @ts-ignore
            window.Vue = Vue
            this.$vi = new Vue(vueProps);
            return this.$vi
        } catch (e) {
            console.warn(`LaravelRoutes: There is a problem loading VueJS please add Vue to your dependencies.`)
        }
    }

    docReady(docReadyFn) {
        if (this._isValidRoute()) {
            window.addEventListener('DOMContentLoaded', () => {
                docReadyFn ? docReadyFn(this) : false
            })
        }
        return this
    }

    getCurrentRouteName() {
        return this.routeName
    }

    enableVueDev() {
        // @ts-ignore
        Vue.config.devtools = true;
        return this
    }

    isRoute(routeName) {
        return this.routeName === routeName
    }

    _setTargetRoute() {
        this._intendedScriptRoute = typeof this.intendedScriptRoute === 'string'
            ? this.routes.push(this.intendedScriptRoute)
            : this.routes = this.intendedScriptRoute;

        return this
    }

    _isValidRoute() {
        return this.routes.includes(this.getCurrentRouteName())
    }

    _setRoutes() {
        this.routes = [];
        this._checkRouteElement();
        this.routeName !== '' ? this._setTargetRoute() : false
    }

    _checkRouteElement() {
        this.dataAttrName = 'laravel-route-name';
        this.routeElement = document.querySelector(`[data-${this.dataAttrName}]`);

        this.routeElement !== null
            // @ts-ignore
            ? this.routeName = this.routeElement.dataset[this._convertToCammelCase(this.dataAttrName)]
            : console.warn(`LaravelRoutes: in your views layouts you must to set to any element the attribute: data-laravel-route-name="{{ Route::currentRouteName() }}"`)
    }

    _convertToCammelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    }
}


export default LaraRoutesScripts
