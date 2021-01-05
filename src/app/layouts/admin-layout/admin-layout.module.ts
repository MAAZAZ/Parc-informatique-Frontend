import {ModuleWithProviders, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProduitComponent } from '../../pages/produit/produit.component';
import {DetailproduitComponent} from '../../pages/detailproduit/detailproduit.component';
import {MarqueComponent} from '../../pages/marque/marque.component';
import {CategorieComponent} from '../../pages/categorie/categorie.component';
import {CaracteristiqueComponent} from '../../pages/caracteristique/caracteristique.component';
import {ContratComponent} from '../../pages/contrat/contrat.component';
import {TierComponent} from '../../pages/tier/tier.component';
import {AddMarqueComponent} from '../../pages/add-marque/add-marque.component';
import {EditMarqueComponent} from '../../pages/edit-marque/edit-marque.component';
import {EditCaracteristiqueComponent} from '../../pages/edit-caracteristique/edit-caracteristique.component';
import {AddCaracteristiqueComponent} from '../../pages/add-caracteristique/add-caracteristique.component';
import {EditProduitComponent} from '../../pages/edit-produit/edit-produit.component';
import {AddProduitComponent} from '../../pages/add-produit/add-produit.component';
import {AddLogicielComponent} from '../../pages/add-logiciel/add-logiciel.component';
import {AddMaterielComponent} from '../../pages/add-materiel/add-materiel.component';
import {EditMaterielComponent} from '../../pages/edit-materiel/edit-materiel.component';
import {EditLogicielComponent} from '../../pages/edit-logiciel/edit-logiciel.component';
import {DetailmaterielComponent} from '../../pages/detailmateriel/detailmateriel.component';
import {DetaillogicielComponent} from '../../pages/detaillogiciel/detaillogiciel.component';
import {DetailtierComponent} from '../../pages/detailtier/detailtier.component';
import {AddTierComponent} from '../../pages/add-tier/add-tier.component';
import {EditTierComponent} from '../../pages/edit-tier/edit-tier.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DataTablesModule} from 'angular-datatables';
import {AgentComponent} from '../../pages/agent/agent.component';
import {ReclamationComponent} from '../../pages/reclamation/reclamation.component';
import {InterventionComponent} from '../../pages/intervention/intervention.component';
import {ReparationComponent} from '../../pages/reparation/reparation.component';
import {PieceComponent} from '../../pages/piece/piece.component';
import {PanneComponent} from '../../pages/panne/panne.component';
import {DetailagentComponent} from '../../pages/detailagent/detailagent.component';
import {AddAgentComponent} from '../../pages/add-agent/add-agent.component';
import {DetailcontratComponent} from '../../pages/detailcontrat/detailcontrat.component';
import {Ng2OdometerModule} from 'ng2-odometer';
import {AddContratComponent} from '../../pages/add-contrat/add-contrat.component';
import {EditcontratComponent} from '../../pages/editcontrat/editcontrat.component';
import {AddPieceComponent} from '../../pages/add-piece/add-piece.component';
import {EditPieceComponent} from '../../pages/edit-piece/edit-piece.component';
import {AddReclamationComponent} from '../../pages/add-reclamation/add-reclamation.component';
import {AddPanneComponent} from '../../pages/add-panne/add-panne.component';
import {EditPanneComponent} from '../../pages/edit-panne/edit-panne.component';
import {AddReparationComponent} from '../../pages/add-reparation/add-reparation.component';
import {EditReparationComponent} from '../../pages/edit-reparation/edit-reparation.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        NgxSpinnerModule,
        DataTablesModule,
        Ng2OdometerModule.forRoot(),
        Ng2SearchPipeModule,
        NgApexchartsModule
    ],
  declarations: [
    MarqueComponent,
    AddMarqueComponent,
    EditMarqueComponent,
    CaracteristiqueComponent,
    AddCaracteristiqueComponent,
    EditCaracteristiqueComponent,
    ProduitComponent,
    DetailproduitComponent,
    EditProduitComponent,
    AddProduitComponent,
    CategorieComponent,
    AddLogicielComponent,
    AddMaterielComponent,
    EditMaterielComponent,
    EditLogicielComponent,
    DetailmaterielComponent,
    DetaillogicielComponent,
    TierComponent,
    DetailtierComponent,
    AddTierComponent,
    EditTierComponent,
    ContratComponent,
    DetailcontratComponent,
    AddContratComponent,
    EditcontratComponent,
    AgentComponent,
    DetailagentComponent,
    AddAgentComponent,
    ReclamationComponent,
    AddReclamationComponent,
    InterventionComponent,
    ReparationComponent,
    AddReparationComponent,
    EditReparationComponent,
    PieceComponent,
    AddPieceComponent,
    EditPieceComponent,
    PanneComponent,
    EditPanneComponent,
    AddPanneComponent,
    DashboardComponent,
  ]
})

export class AdminLayoutModule {}
