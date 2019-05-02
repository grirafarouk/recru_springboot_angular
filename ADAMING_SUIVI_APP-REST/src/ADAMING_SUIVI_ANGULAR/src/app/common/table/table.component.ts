import { OnInit, Component, Input } from "@angular/core";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../helper/helper.service";
import { all } from "q";


@Component({
  selector: 'custom-table',
  templateUrl: './table.component.html',
})
export class CustomTableComponent implements OnInit {


  @Input()
  parent


  @Input()
  title

  @Input()
  item

  @Input()
  columns

  @Input()
  actions

  @Input()
  enableAll;

  allValue=false;
  p:number;
  items
  pages = [];
  size = 10;
  currentPage = 1;
  maxlenght = 0;
  lastPage = 1;
  loading = false;
  ngOnInit(): void {
    this.parent.initTableFunction()
    
  }


  constructor(
    private notifierService: NotifierService, private helperService: HelperService) {
  }
  setPage(p, callBack?) {
    this.loading = true;
    this.currentPage = p;
    this.pages = this.helperService.generatePages(this.currentPage, this.lastPage)
    this.doRechercheCandidat(callBack);
  }


  doRechercheCandidat(callBack?) {
    let page = (this.currentPage - 1) * this.size;
    if (this.item == null) this.item = {}
    this.parent.recherche(this.item, page, this.size,this.allValue).subscribe(data => {
      this.items = data;
      this.loading = false;

    }, error => {
      this.loading = false
    })
    if (callBack) {
      this.parent.rechercheNbr(this.item,this.allValue).subscribe(dataNbr => {
        this.maxlenght = dataNbr;
        this.lastPage = Math.ceil(this.maxlenght / this.size)
        this.pages = this.helperService.generatePages(this.currentPage, this.lastPage);
        callBack();
      })
    }

  }
}