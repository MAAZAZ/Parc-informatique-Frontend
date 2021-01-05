import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import {ProduitComponent} from '../../pages/produit/produit.component';
import {DetailproduitComponent} from '../../pages/detailproduit/detailproduit.component';
import {MarqueComponent} from '../../pages/marque/marque.component';
import {AddMarqueComponent} from '../../pages/add-marque/add-marque.component';
import {EditMarqueComponent} from '../../pages/edit-marque/edit-marque.component';
import {CaracteristiqueComponent} from '../../pages/caracteristique/caracteristique.component';
import {AddCaracteristiqueComponent} from '../../pages/add-caracteristique/add-caracteristique.component';
import {AddProduitComponent} from '../../pages/add-produit/add-produit.component';
import {EditProduitComponent} from '../../pages/edit-produit/edit-produit.component';
import {EditCaracteristiqueComponent} from '../../pages/edit-caracteristique/edit-caracteristique.component';
import {CategorieComponent} from '../../pages/categorie/categorie.component';
import {DetailmaterielComponent} from '../../pages/detailmateriel/detailmateriel.component';
import {AddMaterielComponent} from '../../pages/add-materiel/add-materiel.component';
import {EditMaterielComponent} from '../../pages/edit-materiel/edit-materiel.component';
import {AddLogicielComponent} from '../../pages/add-logiciel/add-logiciel.component';
import {DetaillogicielComponent} from '../../pages/detaillogiciel/detaillogiciel.component';
import {TierComponent} from '../../pages/tier/tier.component';
import {DetailtierComponent} from '../../pages/detailtier/detailtier.component';
import {EditTierComponent} from '../../pages/edit-tier/edit-tier.component';
import {AddTierComponent} from '../../pages/add-tier/add-tier.component';
import {EditLogicielComponent} from '../../pages/edit-logiciel/edit-logiciel.component';
import {ContratComponent} from '../../pages/contrat/contrat.component';
import {AgentComponent} from '../../pages/agent/agent.component';
import {ReclamationComponent} from '../../pages/reclamation/reclamation.component';
import {InterventionComponent} from '../../pages/intervention/intervention.component';
import {PanneComponent} from '../../pages/panne/panne.component';
import {PieceComponent} from '../../pages/piece/piece.component';
import {ReparationComponent} from '../../pages/reparation/reparation.component';
import {DetailagentComponent} from '../../pages/detailagent/detailagent.component';
import {AddAgentComponent} from '../../pages/add-agent/add-agent.component';
import {DetailcontratComponent} from '../../pages/detailcontrat/detailcontrat.component';
import {AddContratComponent} from '../../pages/add-contrat/add-contrat.component';
import {EditcontratComponent} from '../../pages/editcontrat/editcontrat.component';
import {AddPieceComponent} from '../../pages/add-piece/add-piece.component';
import {EditPieceComponent} from '../../pages/edit-piece/edit-piece.component';
import {AddReclamationComponent} from '../../pages/add-reclamation/add-reclamation.component';
import {AddPanneComponent} from '../../pages/add-panne/add-panne.component';
import {AddReparationComponent} from '../../pages/add-reparation/add-reparation.component';
import {EditReparationComponent} from '../../pages/edit-reparation/edit-reparation.component';
import {EditPanneComponent} from '../../pages/edit-panne/edit-panne.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'tableau-de-bord',                    component: DashboardComponent },
    { path: 'produits',                           component: ProduitComponent },
    { path: 'produits/nouveau',                   component: AddProduitComponent },
    { path: 'produits/:id',                       component: DetailproduitComponent },
    { path: 'produits/modifier/:id',              component: EditProduitComponent },
    { path: 'marques',                            component: MarqueComponent },
    { path: 'marques/nouvelle',                   component: AddMarqueComponent },
    { path: 'marques/modifier/:id',               component: EditMarqueComponent },
    { path: 'caracteristiques',                   component: CaracteristiqueComponent },
    { path: 'caracteristiques/nouvelle',          component: AddCaracteristiqueComponent },
    { path: 'caracteristiques/modifier/:id',      component: EditCaracteristiqueComponent },
    { path: 'categories',                         component: CategorieComponent },
    { path: 'categories/materiel/:id',            component: DetailmaterielComponent },
    { path: 'categories/materiels/nouveau',       component: AddMaterielComponent },
    { path: 'categories/materiel/modifier/:id',   component: EditMaterielComponent },
    { path: 'categories/logiciel/:id',            component: DetaillogicielComponent },
    { path: 'categories/logiciels/nouveau',       component: AddLogicielComponent },
    { path: 'categories/logiciel/modifier/:id',   component: EditLogicielComponent },
    { path: 'tiers',                              component: TierComponent },
    { path: 'tiers/nouveau',                      component: AddTierComponent },
    { path: 'tiers/:id',                          component: DetailtierComponent },
    { path: 'tiers/modifier/:id',                 component: EditTierComponent },
    { path: 'contrats',                           component: ContratComponent },
    { path: 'contrats/nouveau',                   component: AddContratComponent },
    { path: 'contrats/:id',                       component: DetailcontratComponent },
    { path: 'contrats/modifier/:id',              component: EditcontratComponent },
    { path: 'agents',                             component: AgentComponent },
    { path: 'agents/nouvel',                      component: AddAgentComponent },
    { path: 'agents/:id',                         component: DetailagentComponent },
    { path: 'pieces',                             component: PieceComponent },
    { path: 'pieces/nouvelle',                    component: AddPieceComponent },
    { path: 'pieces/modifier/:id',                component: EditPieceComponent },
    { path: 'reclamations',                       component: ReclamationComponent },
    { path: 'reclamations/nouvelle',              component: AddReclamationComponent},
    { path: 'pannes',                             component: PanneComponent },
    { path: 'pannes/nouvelle',                    component: AddPanneComponent },
    { path: 'pannes/modifier/:id',                component: EditPanneComponent },
    { path: 'reparations',                        component: ReparationComponent },
    { path: 'reparations/nouvelle',               component: AddReparationComponent },
    { path: 'reparations/modifier/:id',           component: EditReparationComponent },
    { path: 'interventions',                      component: InterventionComponent }
];
