import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/tableau-de-bord', title: 'Tableau de bord',                  icon:'nc-bank',             class: '' },
    { path: '/produits',        title: 'Produits',                         icon:'nc-laptop',           class: '' },
    { path: '/pannes',          title: 'Produits défectueux',              icon:'nc-basket',           class: '' },
    { path: '/reparations',     title: 'Réparations',                      icon:'nc-settings-gear-65', class: '' },
    { path: '/interventions',   title: 'Interventions',                    icon:'nc-ambulance',        class: '' },
    { path: '/reclamations',    title: 'Réclamations',                     icon:'nc-paper',            class: '' },
    { path: '/contrats',        title: 'Contrats',                         icon:'nc-book-bookmark',    class: '' },
    { path: '/tiers',           title: 'Prestataires',                     icon:'nc-globe',            class: '' },
    { path: '/agents',          title: 'agents',                           icon:'nc-circle-10',        class: 'active-pro' },
];

/*
    { path: '/dashboard',     title: 'Dashboard',                        icon:'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',                            icon:'nc-diamond',    class: '' },
    { path: '/notifications', title: 'Notifications',                    icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',                     icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',                       icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',                       icon:'nc-caps-small', class: '' },

 */

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
