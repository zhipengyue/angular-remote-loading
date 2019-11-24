import { Injectable, Injector, Compiler, Inject, NgModuleFactory, Type, ViewContainerRef } from '@angular/core';
import { LAZY_WIDGETS } from './tokens';
import { HttpClient } from '@angular/common/http';
import { ModuleData } from './module.model';

import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as AngularClarity from '@clr/angular';
import * as BrowserAnimations from '@angular/platform-browser/animations';

declare var SystemJS:any;
@Injectable({
  providedIn: 'root'
})
export class LazyLoaderService {
  private remoteModuleConfig:Array<any>=null;
  public displayWords:string='';
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private http:HttpClient,
    @Inject(LAZY_WIDGETS) private lazyWidgets: { [key: string]: () => Promise<NgModuleFactory<any> | Type<any>> }
  ) { }

  async load(name: string, container: ViewContainerRef) {
    const tempModule = await this.lazyWidgets[name]();
    let moduleFactory;

    if (tempModule instanceof NgModuleFactory) {
      // For AOT
      moduleFactory = tempModule;
    } else {
      // For JIT
      moduleFactory = await this.compiler.compileModuleAsync(tempModule);
    }

    const entryComponent = (moduleFactory.moduleType as any).entry;
    const moduleRef = moduleFactory.create(this.injector);

    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

    container.createComponent(compFactory);
  }
  getModuleConfig(name){
    return new Promise((success,fail)=>{
      this.getRemoteModuleConfig().then((moduleList:Array<any>)=>{
        let index:number=moduleList.findIndex((item)=>{
          if(item.path===name){
            return true
          }
        })
        if(index>=0){
          let moduleConfig=moduleList[index];
          success(moduleConfig)
        }
      })
    })
    
  }
  async remoteLoad(tempModule:any, container: ViewContainerRef) {
    let moduleFactory;
    if (tempModule instanceof NgModuleFactory) {
      // For AOT
      moduleFactory = tempModule;
    } else {
      // For JIT
      moduleFactory = await this.compiler.compileModuleAsync(tempModule);
    }

    const entryComponent = (moduleFactory.moduleType as any).entry;
    entryComponent.displayWords='hi my nam is zhipengyue ';
    const moduleRef = moduleFactory.create(this.injector);

    const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

    container.createComponent(compFactory);
  }

  getRemoteModuleConfig(){
    return new Promise((success,error)=>{
      if(this.remoteModuleConfig)success(this.remoteModuleConfig) 
      this.http.get('./assets/remote_loading_module.json').subscribe((data:Array<any>)=>{
        this.remoteModuleConfig=data;
        success(this.remoteModuleConfig)
      })
    })  
  }
  isRegistered(moduleData: ModuleData) {
      // return this.routeIsRegistered(moduleData.path);
  }
  loadModuleSystemJS(moduleInfo: ModuleData): Promise<any> {
      let url = moduleInfo.location;
      SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
      SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
      SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
      SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
      SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));

      // now, import the new module
      return SystemJS.import(`${url}`).then((module) => {
          return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
              return module;
          });
      });
  }
}
