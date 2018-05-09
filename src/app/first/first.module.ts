import { NgModule } from '@angular/core';
import { FirstComponent } from './first.component';
import { FirstService } from './first.service';

@NgModule({
  declarations: [
    FirstComponent
  ],
  /* imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ], */
  providers: [FirstService]
})
export class FirstModule { }
