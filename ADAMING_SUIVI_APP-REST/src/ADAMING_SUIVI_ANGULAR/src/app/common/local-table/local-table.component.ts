import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: 'custom-local-table',
    templateUrl: './local-table.component.html',
  })
  export class CustomLocalTableComponent implements OnInit {


    @Input()
    items
  
    @Input()
    columns
  
    @Input()
    actions

    p:number=1;

  ngOnInit(): void {
  }
  }  