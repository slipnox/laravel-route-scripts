import Vue from 'vue';

class LaraRoutesScripts {

  constructor (routes) {
    this.intendedScriptRoute = routes
    this._setRoutes()
  }

  onInit (initFn) {
    if (this._isValidRoute()) {
      initFn ? initFn(this) : false
    }
    return this
  }

  initVue(vueProps) {
    window.Vue = Vue
    this.$vi = new Vue(vueProps)
    return this.$vi
  }

  docReady (docReadyFn) {
    if (this._isValidRoute()) {
      window.addEventListener('DOMContentLoaded', () => {
        docReadyFn ? docReadyFn(this) : false
      })
    }
    return this
  }

  _setTargetRoute () {
    this._intendedScriptRoute = typeof this.intendedScriptRoute === 'string'
      ? this.routes.push(this.intendedScriptRoute)
      : this.routes = this.intendedScriptRoute

    return this
  }

  //------------------ HELPERS

  enableVueDev () {
    if (process.env.NODE_ENV !== 'production') {
      Vue.config.devtools = true
    }
    return this
  }

  is (routeName) {
    return this.routeName === routeName
  }

  getCurrentRouteName () {
    return this.routeName
  }

  _isValidRoute () {
    return this.routes.includes(this.getCurrentRouteName())
  }

  _setRoutes () {
    this.routes = []
    this._checkRouteElement()

    this.routeName !== '' ? this._setTargetRoute() : false
  }

  _checkRouteElement () {
    this.dataAttrName = 'laravel-route-name'
    this.routeElement = document.querySelector(`[data-${this.dataAttrName}]`)

    this.routeElement !== null
      ? this.routeName = this.routeElement.dataset[this._convertToCammelCase(this.dataAttrName)]
      : console.warn(`LaravelRoutes: in your views layouts you must to set an element with: data-laravel-route-name="{{ Route::currentRouteName() }}"`)
  }

  _convertToCammelCase (str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  }
}


module.exports.default = LaraRoutesScripts;
