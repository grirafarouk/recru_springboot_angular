import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { HelperService } from "../../../helper/helper.service";
import { Region } from "../../../models/region";
import { RegionService } from "../../../services/administrationService/region.service";



@Component({
  selector: 'ngbd-dropdown-basic',
  templateUrl: 'region.component.html',
  styleUrls: ["region.component.css"]
})
export class regionComponent implements OnInit {
  @ViewChild("regionAddModal")
  public regionAddModal;
  @ViewChild("regionEditModal")
  public regionEditModal;
  Listregion=[];
  region:Region

  
  
  columns = [
    {
      data: 'code',
      title: 'Libellés'
    },
    {
      data: 'actif',
      title: 'Actif',
      boolean: true,
      align: 'center',
      width: '10%'
    },
    {
      data: 'reporting',
      title: 'Reporting',
      boolean: true,
      align: 'center',
      width: '10%'
    }
  ]
  actions = [
    {
      icon: 'fa fa-edit',
      class: 'btn btn-outline-success btn-sm',
      tooltip: 'Edit',
      action: (e) => {
        this.showEditModal(e);
      }
    }
  ]

  constructor(
   private regionService: RegionService,
   private notifierService: NotifierService
    ){}

  ngOnInit(): void {
    this.region= new Region();
    this.regionService.findAllRegion().subscribe(data=>{
      this.Listregion = data;
    })
  }
  showAddModal(){
    this.reset();
    this.regionAddModal.show();
  }
  showEditModal(region: any){
    this.region =Object.assign({}, region);
    this.regionEditModal.show();
  }
 

  updateRegion(region){
    this.regionService.update(this.region).toPromise().then((data: Region) => {
      this.ngOnInit();
      if (data != null) {
        this.notifierService.notify("success", "Region  modifié avec succés !")
      }
    })
    this.regionEditModal.hide();
  }
  
  reset(){
    this.region.code = null;
  }
}
