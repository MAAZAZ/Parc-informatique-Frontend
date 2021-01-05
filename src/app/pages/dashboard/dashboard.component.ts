import {Component, OnInit, ViewChild} from '@angular/core';
import Chart from 'chart.js';
import {NgxSpinnerService} from 'ngx-spinner';
import {ProduitService} from '../../services/produitservice/produit.service';
import {MaterielService} from '../../services/categorieservice/materiel.service';
import {LogicielService} from '../../services/categorieservice/logiciel.service';
import {PanneService} from '../../services/panneservice/panne.service';
import {AgentService} from '../../services/agentservice/agent.service';
import {ReparationService} from '../../services/reparationservice/reparation.service';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {Panne} from '../../Model/Panne';
import {Reparation} from '../../Model/Reparation';
import {Reclamation} from '../../Model/Reclamation';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions, ApexXAxis, ApexFill, ApexStroke
} from 'ng-apexcharts';
import {CategorieService} from '../../services/categorieservice/categorie.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  stroke: ApexStroke;
  fill: ApexFill;
};

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartHours;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart2") chart2: ChartComponent;
  public chartOptions2: Partial<ChartOptions>;
  @ViewChild("chart3") chart3: ChartComponent;
  public chartOptions3: Partial<ChartOptions2>;

  test : Date = new Date();
  variables: any;
  Nbproduit: number = 0;
  Nblogiciel: number = 0;
  Nbmateriel: number = 0;
  Nbpanne: number = 0;
  Nbreclamation: number = 0;
  Nbreparation: number = 0;
  panne: Panne = new Panne();
  reparation: Reparation = new Reparation();
  reclamation: Reclamation = new Reclamation();
  marques_selected: Array<any> = new Array<any>();
  produit_selected:Array<any> = new Array<any>();
  categorie_selected:Array<any> = new Array<any>();
  annee: any=[0,0,0,0,0,0,0,0,0,0,0,0];
  annee1: any=[0,0,0,0,0,0,0,0,0,0,0,0];
  annee2:any=[0,0,0,0,0,0,0,0,0,0,0,0];

  constructor(private ngxSpinnerService: NgxSpinnerService, private produitService: ProduitService,
              private materielService: MaterielService, private logicielService: LogicielService,
              private panneService: PanneService, private  reclamationService: ReclamationService,
              private reparationService: ReparationService, private agentService: AgentService,
              private marqueService: MarqueService, private categorieService: CategorieService) { }


  compareDate(date1: Date, date2: Date): number {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    let same = d1.getTime() === d2.getTime();

    if (same) {
      return 0;
    }
    if (d1 > d2) {
      return 1;
    }
    if (d1 < d2) {
      return -1;
    }
  }

  ngOnInit() {
    this.ngxSpinnerService.show();

     this.marqueService.getAll().subscribe(data => {
       let marques: any = data;
       marques.forEach(marque => {
         this.marques_selected.push([marque.id, marque.designation, 0]);
       })
     })

     this.produitService.getAll().subscribe(data => {
       let produits: any = data;
       produits.forEach(produit => {
         this.marques_selected.forEach(marque => {
           if (produit.marque == 'http://127.0.0.1:8000/api/marques/' + marque[0] + '/') {
             marque[2] = marque[2] + 1;
           }
         })

         this.marques_selected=this.marques_selected.sort((a, b) => (a[2] > b[2]) ? -1 : 1)
         let other:any;
         for(let i=3;i<this.marques_selected.length;i++)
           other=this.marques_selected[i][2];
         if(this.marques_selected.length>2){
           this.chartOptions = {
             series: [this.marques_selected[0][2], this.marques_selected[1][2], this.marques_selected[2][2], other],
             chart: {
               type: "donut"
             },
             labels: [this.marques_selected[0][1], this.marques_selected[1][1], this.marques_selected[2][1], "Autres"],
             responsive: [
               {
                 breakpoint: 480,
                 options: {
                   chart: {
                     width: 200
                   },
                   legend: {
                     position: "bottom"
                   }
                 }
               }
             ]
           };
         }
       })
     });

    this.panneService.getAll().subscribe(data => {
      this.variables = data;
      this.Nbpanne = this.variables.length;
      this.variables.forEach(panne=>{
        let date:Date=new Date(panne.date);
        let datenow:any=new Date().getFullYear();
        for(let i=0;i<12;i++)
          if(date.getMonth()==i && date.getFullYear()==datenow)
            this.annee2[i]+=1;
      })

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [this.annee2[0], this.annee2[1], this.annee2[2], this.annee2[3], this.annee2[4], this.annee2[5], this.annee2[6], this.annee2[7], this.annee2[8], this.annee2[9],this.annee2[10],this.annee2[11]],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var speedData = {
        labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        datasets: [dataFirst, ]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: true,
        data: speedData,
        options: chartOptions
      });


      this.variables.forEach(variable => {
        this.panne = this.variables[0];
        if (this.compareDate(this.panne.date, variable.date) < 0) {
          this.panne = variable;
        }
      });
      this.produitService.getByUrl(this.panne.produit).subscribe(data => {
        let produit: any = data;
        this.panne.produit = produit.designation;
      })
    })

    this.reclamationService.getAll().subscribe(data => {
      this.variables = data;
      this.Nbreclamation = this.variables.length;
      this.variables.forEach(variable => {
        this.reclamation = this.variables[0];
        if (this.compareDate(this.reclamation.date, variable.date) < 0) {
          this.reclamation = variable;
        }
      });
      this.agentService.getByUrl(this.reclamation.agent).subscribe(data => {
        let agent: any = data;
        this.reclamation.agent = agent.last_name + ' ' + agent.first_name;
      })
    })

    this.reparationService.getAll().subscribe(data => {
      this.variables = data;
      this.Nbreparation = this.variables.length;

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.variables.forEach(reparation=>{
        let date:Date=new Date(reparation.date_debut);
        let date2:Date=new Date(reparation.date_fin);
        let datenow:any=new Date().getFullYear();
        for(let i=0;i<12;i++){
          if(date.getMonth()==i && date.getFullYear()==datenow){
            this.annee[i]+=1;
          }
          if(date2.getMonth()==i && date2.getFullYear()==datenow){
            this.annee1[i]+=1;
          }
        }
      })

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
          datasets: [{
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [this.annee[0], this.annee[1], this.annee[2], this.annee[3], this.annee[4], this.annee[5], this.annee[6], this.annee[7], this.annee[8], this.annee[9],this.annee[10],this.annee[11]]
          },
            {
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [this.annee1[0], this.annee1[1], this.annee1[2], this.annee1[3], this.annee1[4], this.annee1[5], this.annee1[6], this.annee1[7], this.annee1[8], this.annee1[9],this.annee1[10],this.annee1[11]]
            },
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5,
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });

      this.variables.forEach(variable => {
        this.reparation = this.variables[0];
        if (this.compareDate(this.reparation.date_fin, variable.date_fin) < 0) {
          this.reparation = variable;
        }
      });
      this.panneService.getByUrl(this.reparation.panne_concerne).subscribe(data => {
        let panne: any = data;
        this.produitService.getByUrl(panne.produit).subscribe(data => {
          let produit: any = data;
          this.reparation.panne_concerne = produit.designation;
        })
      })
    })

     this.logicielService.getAll().subscribe(data => {
       this.variables = data;
       this.Nblogiciel = this.variables.length;
     })

     this.materielService.getAll().subscribe(data => {
       this.variables = data;
       this.Nbmateriel = this.variables.length;
     })

     this.produitService.getAll().subscribe(data => {
       let produits: any = data;
       this.Nbproduit = produits.length;
       produits.forEach(produit => {
         this.produit_selected.push([produit.id, produit.designation, 0]);
       })

       this.panneService.getAll().subscribe(data => {
       let pannes: any = data;
       pannes.forEach(panne => {
         this.produit_selected.forEach(produit => {
           if (panne.produit == 'http://127.0.0.1:8000/api/produits/' + produit[0] + '/') {
             produit[2] = produit[2] + panne.quantite;
           }
         })
         this.produit_selected=this.produit_selected.sort((a, b) => (a[2] > b[2]) ? -1 : 1)
         let other:number=0;
         for(let i=3;i<this.produit_selected.length;i++)
           other+=this.produit_selected[i][2];

         if(this.produit_selected.length>=3){
           this.chartOptions2 = {
             series: [this.produit_selected[0][2], this.produit_selected[1][2], this.produit_selected[2][2], other],
             chart: {
               type: "pie"
             },
             labels: [this.produit_selected[0][1], this.produit_selected[1][1], this.produit_selected[2][1], "Autres"],
             responsive: [
               {
                 breakpoint: 480,
                 options: {
                   chart: {
                     width: 200
                   },
                   legend: {
                     position: "bottom"
                   }
                 }
               }
             ]
           };
         }
       })
     })
     });

    this.categorieService.getAll().subscribe(data=> {
      let categories: any = data;
      categories.forEach(categorie => {
        this.categorie_selected.push([categorie.id, categorie.libelle, 0]);
      })
    });

    this.produitService.getAll().subscribe(data=>{
        let produits:any=data;
        produits.forEach(produit=>{
          this.categorie_selected.forEach(categorie=>{
            if (produit.type_produit == 'http://127.0.0.1:8000/api/types/' + categorie[0] + '/') {
              categorie[2] = categorie[2] + produit.quantite_totale;
            }
          })
        })

      this.categorie_selected=this.categorie_selected.sort((a, b) => (a[2] > b[2]) ? -1 : 1)
      let other:number=0;
      for(let i=3;i<this.categorie_selected.length;i++)
        other+=this.categorie_selected[i][2];
      if(this.categorie_selected.length>2) {
        this.chartOptions3 = {
          series: [this.categorie_selected[0][2], this.categorie_selected[1][2], this.categorie_selected[2][2], other],
          chart: {
            type: "polarArea"
          },
          labels: [this.categorie_selected[0][1],this.categorie_selected[1][1],this.categorie_selected[2][1],"Autres"],
          stroke: {
            colors: ["#fff"]
          },
          fill: {
            opacity: 0.8
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        };
      }
    })

     setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 1000)
  }
}
