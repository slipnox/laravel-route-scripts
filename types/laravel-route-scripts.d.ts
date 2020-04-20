declare class LaraRoutesScripts {
    private readonly intendedScriptRoute;
    private $vi;
    private _intendedScriptRoute;
    private routes;
    private routeName;
    private dataAttrName;
    private routeElement;
    constructor(routes: any);
    onInit(initFn: any): this;
    initVue(Vue: any, vueProps?: {}): object;
    docReady(docReadyFn: any): this;
    getCurrentRouteName(): any;
    enableVueDev(): this;
    isRoute(routeName: any): boolean;
    _setTargetRoute(): this;
    _isValidRoute(): any;
    _setRoutes(): void;
    _checkRouteElement(): void;
    _convertToCammelCase(str: any): any;
}
export default LaraRoutesScripts;
