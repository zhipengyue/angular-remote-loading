import { NgModule } from '@angular/core';
import { RemoteModuleAComponent } from './remote-module-a.component';



@NgModule({
  declarations: [RemoteModuleAComponent],
  imports: [
  ],
  exports: [RemoteModuleAComponent],
  entryComponents:[RemoteModuleAComponent]
})
export class RemoteModuleAModule {
  static entry=RemoteModuleAComponent;
 }
