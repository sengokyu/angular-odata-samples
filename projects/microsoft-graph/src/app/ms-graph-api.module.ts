import { NgModule } from '@angular/core';
import { ODataModule } from 'angular-odata';
import { MsGraphApiConfig } from './ms-graph-api.config';

@NgModule({
  imports: [ODataModule.forRoot(MsGraphApiConfig)],
  exports: [ODataModule],
})
export class MsGraphApiModule {}
