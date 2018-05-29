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
import { ParametricShapesModule } from './Parametric_Shapes/Parametric_Shapes.module';
import { ParametricShapesComponent } from './Parametric_Shapes/Parametric_Shapes.component';
import { PositionandRotationModule } from './Position_and_Rotation/Position_and_Rotation.module';
import { PositionandRotationComponent } from './Position_and_Rotation/Position_and_Rotation.component';
import { MaterialsModule } from './materials/materials.module';
import { MaterialsComponent } from './materials/materials.component';
import { CamerasModule } from './cameras/cameras.module';
import { CamerasComponent } from './cameras/cameras.component';

const appRoutes: Routes = [
  { path: 'engine', component: EngineComponent },
  { path: 'first', component: FirstComponent },
  { path: 'discover_basic_elements', component: DiscoverBasicElementsComponent},
  { path: 'parametric_shapes', component: ParametricShapesComponent},
  { path: 'position_and_rotation', component: PositionandRotationComponent},
  { path: 'materials', component: MaterialsComponent},
  { path: 'cameras', component: CamerasComponent},



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
    ParametricShapesModule,
    PositionandRotationModule,
    MaterialsModule,
    CamerasModule
  ],
  providers: [EngineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
