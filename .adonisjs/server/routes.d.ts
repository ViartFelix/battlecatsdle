import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'debugbar.request': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'debugbar.explain': { paramsTuple?: []; params?: {} }
    'debugbar.explain_all': { paramsTuple?: []; params?: {} }
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
    'game.display': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'debugbar.request': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'game.display': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'debugbar.request': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'home': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'game.display': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'debugbar.explain': { paramsTuple?: []; params?: {} }
    'debugbar.explain_all': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}