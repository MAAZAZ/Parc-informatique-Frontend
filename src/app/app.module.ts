import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from './services/authservice/auth.service';
import {DataService} from './services/dataservice/data.service';
import {ProduitService} from './services/produitservice/produit.service';
import {TokenIntercepterService} from './services/token-intercepter.service';
import {LoggedInGuard} from './guards/logged.guard';
import {AuthGuardService} from './guards/auth-guard.guard';
import {MarqueService} from './services/marqueservice/marque.service';
import {CaracteristiqueService} from './services/caracteristiqueservice/caracteristique.service';
import {TierService} from './services/tierservice/tier.service';
import {CategorieService} from './services/categorieservice/categorie.service';
import {ContratService} from './services/contratservice/contrat.service';
import {MaterielService} from './services/categorieservice/materiel.service';
import {LogicielService} from './services/categorieservice/logiciel.service';
import {AgentService} from './services/agentservice/agent.service';
import {DepartementService} from './services/departementservice/departement.service';
import {FactureService} from './services/factureservice/facture.service';
import {ReclamationService} from './services/reclamationservice/reclamation.service';
import {InterventionService} from './services/interventionservice/intervention.service';
import {Intervention_externe, Intervention_interne} from './Model/Intervention';
import {ReparationService} from './services/reparationservice/reparation.service';
import {PanneService} from './services/panneservice/panne.service';
import {PieceService} from './services/pieceservice/piece.service';
import {DataTablesModule} from 'angular-datatables';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ReclamationpublicService} from './services/reclamationpublicservice/reclamationpublic.service';
import {AgentpublicService} from './services/agentpublicservice/agentpublic.service';
import { ReparationpublicComponent } from './pages/reparationpublic/reparationpublic.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [];

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ReparationpublicComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      }
    }),
    DataTablesModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    NgbPaginationModule
  ],
  providers: [AuthGuardService, LoggedInGuard, AuthService, DataService, ProduitService, MarqueService,
    CaracteristiqueService, TierService, CategorieService, MaterielService, LogicielService, ContratService,
    AgentService, DepartementService, FactureService, ReclamationService, InterventionService, Intervention_interne,
    Intervention_externe, ReparationService, PanneService, PieceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenIntercepterService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
