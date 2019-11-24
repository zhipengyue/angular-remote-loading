import { Component, OnInit,AfterViewInit } from '@angular/core';
// import { LazyLoaderService } from '../../../../src/app/lazy-loader.service';
@Component({
  selector: 'lib-remoteModuleA',
  template: `
    <p>
      remote-module-a works!
      {{displayWords}}
    </p>
  `,
  styles: []
})
export class RemoteModuleAComponent implements OnInit,AfterViewInit {

  public displayWords:string='';
  constructor(
  ) { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    console.log(this.displayWords)
  }
}
