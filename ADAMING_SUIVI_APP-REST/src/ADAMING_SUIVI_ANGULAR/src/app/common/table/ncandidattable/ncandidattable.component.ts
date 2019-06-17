import { ficheCandidatSessionComponent } from './../../../views/dashboard/ficheCandidatSession/ficheCandidatSession.component';
import { HelperService } from './../../../helper/helper.service';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { Component, OnInit, Input } from '@angular/core';
import { CandidateDto } from '../../../views/candidats/CandidateDto';
import { NotifierService } from 'angular-notifier';
import { StatutService } from '../../../services/administrationService/StatutService';
import { TechnologieService } from '../../../services/administrationService/TechnologieService';
import { CodegenComponentFactoryResolver } from '@angular/core/src/linker/component_factory_resolver';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ncandidattable',
  templateUrl: './ncandidattable.component.html',
})
export class NcandidattableComponent implements OnInit {

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
  technologies = []
  listesources = []
  verifier_critere_de_recherche: boolean = false;
  listecandidat = [{
  }]
  loading = false;
  ngOnInit(): void {
    this.technologiesService.findAllTechnologies().subscribe(data => {
      this.technologies = data;
    }),
      this.parent.initTableFunction()
    this.utilisateurservice.getAllSourceurs().subscribe(data => {
      this.listesources = data



    })
  }


  constructor(private utilisateurservice: UtilisateurService,
    private notifierService: NotifierService, private technologiesService: TechnologieService, public helperService: HelperService) {
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
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }



  }
  techsearch(event) {

    this.item2.technologie = event;
    if (this.item2.technologie != null) {
      this.items = this.items.filter(res => {
        return res.technologie.toLocaleLowerCase().match(this.item2.technologie.toLocaleLowerCase());
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
      this.doRechercheCandidat();

    }
    else {
      this.ngOnInit();

      this.verifier_critere_de_recherche = false
    }



  }
  search8() {

    if (this.item2.numeroTel != null) {

      this.items = this.items.filter(res => {
        return res.numeroTel.toString().toLocaleLowerCase().match(this.item2.numeroTel.toString().toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

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
      this.doRechercheCandidat();

    }
    else if (this.item2.prenom != null) {
      this.items = this.items.filter(res => {
        return res.prenom.toLocaleLowerCase().match(this.item2.prenom.toLocaleLowerCase());
      });
      this.verifier_critere_de_recherche = true;
      this.doRechercheCandidat();

    }

    else {
      this.ngOnInit();
      this.verifier_critere_de_recherche = false
    }


  }

  searchingDateInscription(event: Date) {
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

