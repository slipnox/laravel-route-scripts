class LaraRoutesScripts {
    constructor(routes) {
        if (routes) {
            this.intendedScriptRoute = routes;
            this._setRoutes();
        }
        else {
            console.warn(`LaravelRouteScripts: No route specified please add route name string or array of route names strings.`);
        }
        return this;
    }
    //------------------ HELPERS
    onInit(initFn) {
        if (this._isValidRoute()) {
            initFn ? initFn(this) : false;
        }
        return this;
    }
    initVue(Vue, vueProps = {}) {
        if (Vue) {
            this.$vi = new Vue(vueProps);
            return this.$vi;
        }
        console.warn(`LaravelRouteScripts: There is a problem loading VueJS please add Vue to your dependencies.`);
    }
    docReady(docReadyFn) {
        if (this._isValidRoute()) {
            window.addEventListener('DOMContentLoaded', () => {
                docReadyFn ? docReadyFn(this) : false;
            });
        }
        return this;
    }
    getCurrentRouteName() {
        return this.routeName;
    }
    enableVueDev() {
        // @ts-ignore
        Vue.config.devtools = true;
        return this;
    }
    isRoute(routeName) {
        return this.routeName === routeName;
    }
    _setTargetRoute() {
        this._intendedScriptRoute = typeof this.intendedScriptRoute === 'string'
            ? this.routes.push(this.intendedScriptRoute)
            : this.routes = this.intendedScriptRoute;
        return this;
    }
    _isValidRoute() {
        return this.routes.includes(this.getCurrentRouteName());
    }
    _setRoutes() {
        this.routes = [];
        this._checkRouteElement();
        this.routeName !== '' ? this._setTargetRoute() : false;
    }
    _checkRouteElement() {
        this.dataAttrName = 'laravel-route-name';
        this.routeElement = document.querySelector(`[data-${this.dataAttrName}]`);
        this.routeElement !== null
            // @ts-ignore
            ? this.routeName = this.routeElement.dataset[this._convertToCammelCase(this.dataAttrName)]
            : console.warn(`LaravelRouteScripts: in your views layouts you must to set to any element the attribute: data-laravel-route-name="{{ Route::currentRouteName() }}"`);
    }
    _convertToCammelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
}
export default LaraRoutesScripts;
//# sourceMappingURL=laravel-route-scripts.js.map