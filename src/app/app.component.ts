import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { LazyLoaderService } from './lazy-loader.service';
import { RouterService } from './router.service';
import { ModuleData } from './module.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lazy-angular';
  @ViewChild('container', { read: ViewContainerRef, static: false })
  container: ViewContainerRef;

  constructor(private lazyLoader: LazyLoaderService,
    private routerService:RouterService
    ) { }

  async load() {
    
    this.container.clear();
    // this.lazyLoader.load('temp', this.container);
    let moduleConfig:any=await this.lazyLoader.getModuleConfig('remote-module-a');
    this.registerRoute(moduleConfig);
  }
  isRegistered(moduleData: ModuleData): boolean {
      return this.routerService.routeIsRegistered(moduleData.path);
  }
  private registerRoute(moduleToEnable: ModuleData){
      // load up the umd file and register the route whenever succeeded.
      this.lazyLoader.loadModuleSystemJS(moduleToEnable).then((exports) => {
        console.log(exports);
        // console.log(exports.RemoteModuleAModule);
        this.lazyLoader.remoteLoad(exports.RemoteModuleAModule,this.container)
      }, (err) => console.log(`${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`, err));
      // import('../assets/remote-module-a.umd.min.js').then((m)=>{
      //   console.log(m)
      // })
  }
}
