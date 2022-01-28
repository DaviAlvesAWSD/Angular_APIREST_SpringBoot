import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';


// Components criados
import { LancamentosModule } from './components/views/lancamentos/lancamentos.module';
import { PessoasModule } from './components/views/pessoas/pessoas.module';

import { UtilsModule } from './components/utils/utils.module';
import { CoreModule } from './components/core/core.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    UtilsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),





  ],
  providers: [ TranslateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
