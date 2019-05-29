import { Status } from './../../models/enum/Status';
import { CandidateDto } from './../../views/candidats/CandidateDto';
import { filter } from 'rxjs/operators';
import { OnInit, Component, Input } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../helper/helper.service";
import { all } from "q";
import { NgTypeToSearchTemplateDirective } from '@ng-select/ng-select/ng-select/ng-templates.directive';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { StatutService } from "../../services/administrationService/StatutService";
import { NgSelectModule } from '@ng-select/ng-select';
import { UtilisateurService } from '../../services/utilisateur.service';


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
})

export class CustomTableComponent implements OnInit {


  @Input()
  parent

  @Input()
  item2: CandidateDto = new CandidateDto();

  @Input()
  title

  @Input()
  reset

  @Input()
  item

  @Input()
  columns

  @Input()
  actions

  @Input()
  enableAll;

  allValue = false;
  p: number;
  items
  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  statuts = []
  verifier_critere_de_recherche: boolean = false;
  listecandidat = [{

  }]
  loading = false;
  listemobilite = [{
    libelle: "Oui"


  },
  {
    libelle: "Non"


  },
  ];

  listesourceur = [];
  listecharges = [];
  ngOnInit(): void {
    this.statutservice.findAllStatut().subscribe(data => {
      this.statuts = data;
    })
    this.parent.initTableFunction()
    this.chargeservice.getAllChages().subscribe(data => {

      this.listecharges = data;

    })

  }


  constructor(private chargeservice: UtilisateurService,
    private notifierService: NotifierService, private statutservice: StatutService, public helperService: HelperService) {
  }

  setPage(p, callBack?) {
    this.loading = true;
    this.currentPage = p;
    this.pages = this.helperService.generatePages(this.currentPage, this.lastPage)
    this.doRechercheCandidat(callBack);
    if (this.reset == 1) {
      this.verifier_critere_de_recherche = false;
    }

  }
  search2() {
    if (this.item2.lieuEntretien != null) {
      this.items = this.items.filter(res => {
        return res.lieuEntretien.toLocaleLowerCase().match(this.item2.lieuEntretien.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  search3() {


    if (this.item2.email != null) {
      this.items = this.items.filter(res => {
        return res.email.toLocaleLowerCase().match(this.item2.email.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  search4(event) {
    this.item2.charge = event
    console.log(event)
    console.log(this.item2.charge)
    if (this.item2.charge != null) {
      this.items = this.items.filter(res => {
        return res.charge == this.item2.charge;
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  mobilitesearching(event) {
    this.item2.mobilite = event;
    if (this.item2.mobilite != null) {
      if (this.item2.mobilite === "Oui")
        this.item2.mobilite = "1"
      this.items = this.items.filter(res => {
        return res.mobilite == this.item2.mobilite;
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();




  }
  search5(event) {
    this.item2.statut = event;
    if (this.item2.statut != null) {
      this.items = this.items.filter(res => {
        return res.statut.toLocaleLowerCase().match(this.item2.statut.toLocaleLowerCase());
      });


      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }



  }
  search8() {
    this.doRechercheCandidat();
    if (this.item2.numeroTel != null) {
      this.items = this.items.filter(res => {
        return res.numeroTel.toString().toLocaleLowerCase().match(this.item2.numeroTel.toString().toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

  }

  search() {

    if (this.item2.nom != null) {
      this.items = this.items.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.item2.nom.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }
    else if (this.item2.prenom != null) {
      this.items = this.items.filter(res => {
        return res.prenom.toLocaleLowerCase().match(this.item2.prenom.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }

    else {
      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }
    this.doRechercheCandidat();


  }

  searchingDateEntretien(event) {
    this.item2.dateEntretien = event;
    if (this.item2.dateEntretien != null) {
      this.items = this.items.filter(res => {
        return res.dateEntretien === this.item2.dateEntretien;
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }
  }
  searchingDateInscription(event) {
    this.item2.dateInscription = event;
    if (this.item2.dateInscription != null) {
      this.items = this.items.filter(res => {
        return res.dateInscription === this.item2.dateInscription;
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {

      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }
  }



  search10() {
    if (this.item2.noteTotale != null) {
      this.items = this.items.filter(res => {
        return res.noteTotale == this.item2.noteTotale;
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();

  }
  doRechercheCandidat(callBack?) {
    let page = (this.currentPage - 1) * this.size;
    if (this.item == null) this.item = {}
    if (this.verifier_critere_de_recherche == false) {
      this.parent.recherche(this.item, page, this.size, this.allValue).subscribe(data => {
        this.items = data;
        this.loading = false;

      }, error => {
        this.loading = false
      })
      if (callBack) {
        this.parent.rechercheNbr(this.item, this.allValue).subscribe(dataNbr => {
          this.maxlenght = dataNbr;
          this.lastPage = Math.ceil(this.maxlenght / this.size)
          this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
          callBack();
        })
      }
    }
    else {

      this.parent.recherche(this.item2, page, this.size, this.allValue).subscribe(data => {
        this.items = data;
      }, error => {
      })

      this.parent.rechercheNbr(this.item2, this.allValue).subscribe(dataNbr => {
        this.maxlenght = dataNbr;
        this.lastPage = Math.ceil(this.maxlenght / this.size)
        this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
      })


    }

  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
