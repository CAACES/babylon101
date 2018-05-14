import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { EngineComponent } from './engine/engine.component';
import { EngineService } from './engine/engine.service';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTreeModule,
  MatCardModule,
  MatMenuModule } from '@angular/material';

// import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';

import { FirstModule } from './first/first.module';
import { FirstComponent } from './first/first.component';
import { DiscoverBasicElementsModule } from './discover_basic_elements/discover_basic_elements.module';
import { DiscoverBasicElementsComponent } from './discover_basic_elements/discover_basic_elements.component';

const appRoutes: Routes = [
  { path: 'engine', component: EngineComponent },
  { path: 'first', component: FirstComponent },
  { path: 'discover_basic_elements', component: DiscoverBasicElementsComponent}
  /* { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    AppNavComponent,
  ],
  imports: [
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
    MatListModule,
    MatTreeModule,
    MatCardModule,
    MatMenuModule,
    FirstModule,
    DiscoverBasicElementsModule,
  ],
  providers: [EngineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
