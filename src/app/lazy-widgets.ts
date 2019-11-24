import { NgModuleFactory, Type } from '@angular/core';

export const lazyWidgets: { path: string, loadChildren: () => Promise<NgModuleFactory<any> | Type<any>> }[] = [
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
  }
  // {
  //   path:'temp',
  //   loadChildren:()=>import('../assets/remote-module-a.umd.min.js').then(m=>m.RemoteModuleAModule)
  // }
];

export function lazyArrayToObj() {
  const result = {};
  for (const w of lazyWidgets) {
    result[w.path] = w.loadChildren;
  }
  return result;
}
