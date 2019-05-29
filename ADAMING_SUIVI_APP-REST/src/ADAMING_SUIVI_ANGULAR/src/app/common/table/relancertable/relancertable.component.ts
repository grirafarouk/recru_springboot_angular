import { disponibiliteService } from './../../../services/administrationService/disponibiliteService';
import { DATE_FORMAT } from './../../../helper/application.constant';
import { Component, OnInit, Input } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TechnologieService } from '../../../services/administrationService/TechnologieService';
import { HelperService } from '../../../helper/helper.service';
import { CandidateDto } from '../../../views/candidats/CandidateDto';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-relancertable',
  templateUrl: './relancertable.component.html',
})
export class RelancertableComponent implements OnInit {

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
  disponibles = []
  verifier_critere_de_recherche: boolean = false;
  listecandidat = [{

  }]
  listesources = [];
  listecharges = [];
  loading = false;
  ngOnInit(): void {
    this.disponibiliteService.findAllDisponibilite().subscribe(data => {
      this.disponibles = data;
    }),
      this.parent.initTableFunction()
    this.chargeservice.getAllChages().subscribe(data => {

      this.listecharges = data;

    })
    this.chargeservice.getAllSourceurs().subscribe(data => {

      this.listesources = data;

    })
  }


  constructor(private chargeservice: UtilisateurService,
    private notifierService: NotifierService, private disponibiliteService: disponibiliteService, public helperService: HelperService) {
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
  searchingDateRelance(event: Date) {
    this.item2.dateRelance = event
    if (this.item2.dateRelance != null) {
      this.items = this.items.filter(res => {
        return res.dateRelance === this.item2.dateRelance;
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {

      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }
  }


  regionsearch() {
    if (this.item2.region != null) {
      this.items = this.items.filter(res => {
        return res.region.toLocaleLowerCase().match(this.item2.region.toLocaleLowerCase());
      });


      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  statutsearch() {
    if (this.item2.statut != null) {
      this.items = this.items.filter(res => {
        return res.statut.toLocaleLowerCase().match(this.item2.statut.toLocaleLowerCase());
      });

      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  techsearch() {


    if (this.item2.technologie != null) {
      this.items = this.items.filter(res => {
        return res.technologie.toLocaleLowerCase().match(this.item2.technologie.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


  }
  searchlieuentretien() {
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
  searchingdisponible(event) {
    this.item2.disponibilite = event
    if (this.item2.disponibilite != null) {
      this.items = this.items.filter(res => {
        return res.disponibilite.toLocaleLowerCase().match(this.item2.disponibilite.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }


  }
  searchcharge(event) {
    this.item2.charge = event;
    if (this.item2.charge != null) {
      this.items = this.items.filter(res => {
        return res.charge == this.item2.charge.toLocaleLowerCase;
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }



  }
  search4(event) {
    this.item2.source = event
    if (this.item2.source != null) {

      this.items = this.items.filter(res => {
        return res.source.toLocaleLowerCase().match(this.item2.source.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }



  }
  search5() {
    if (this.item2.region != null) {
      this.items = this.items.filter(res => {
        return res.region.toLocaleLowerCase().match(this.item2.region.toLocaleLowerCase());
      });


      this.verifier_critere_de_recherche = true;
    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }

    this.doRechercheCandidat();


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



