(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-dashboard-dashboard-module"],{

/***/ "./src/app/services/administrationService/TechnologieService.ts":
/*!**********************************************************************!*\
  !*** ./src/app/services/administrationService/TechnologieService.ts ***!
  \**********************************************************************/
/*! exports provided: TechnologieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TechnologieService", function() { return TechnologieService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _helper_application_constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/application.constant */ "./src/app/helper/application.constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TechnologieService = /** @class */ (function () {
    function TechnologieService(http) {
        this.http = http;
    }
    TechnologieService.prototype.getTechnologiesByLibelle = function () {
        return this.http.get(_helper_application_constant__WEBPACK_IMPORTED_MODULE_2__["BACK_END_URL"] + '/technologie/Libelle');
    };
    TechnologieService.prototype.findAllTechnologies = function () {
        return this.http.get(_helper_application_constant__WEBPACK_IMPORTED_MODULE_2__["BACK_END_URL"] + "/technologie");
    };
    TechnologieService.prototype.save = function (technologie) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(_helper_application_constant__WEBPACK_IMPORTED_MODULE_2__["BACK_END_URL"] + "/technologie/add", technologie, httpOptions);
    };
    TechnologieService.prototype.update = function (technologie) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post(_helper_application_constant__WEBPACK_IMPORTED_MODULE_2__["BACK_END_URL"] + "/technologie/update", technologie, httpOptions);
    };
    TechnologieService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], TechnologieService);
    return TechnologieService;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/dashboard/dashboard-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/views/dashboard/dashboard.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_2__["DashboardComponent"],
        data: {
            title: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard.component.html":
/*!**********************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"card\" style=\"height: 95% !important;\">\r\n          <div class=\"card-header\">\r\n            <label style=\"font-weight:bold;color:#546E7A;\">CV en attente de traitement</label>\r\n          </div>\r\n          <div class=\"card-body\" >\r\n              <canvas baseChart class=\"chart\"\r\n              [data]=\"pieChartData\"\r\n              [labels]=\"pieChartLabels\"\r\n              [colors]=\"ChartColors\"\r\n              [chartType]=\"pieChartType\"></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <label style=\"font-weight:bold;color:#546E7A;\">Nombre de CV à relancer par chargé de recrutement</label>\r\n            </div>\r\n          <div class=\"card-body\">\r\n            <table class=\"table table-bordered table-striped\" >\r\n              <thead>\r\n                <tr>\r\n                  <th>Chargé recrutement</th>\r\n                  <th>Nombre CV à relancer</th>\r\n                  <th>Actions</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let charge of ReportingChargeRelance| paginate: { itemsPerPage:5, currentPage: p }\">\r\n                  <td>{{charge.nomCharge}}</td>\r\n                  <td>{{charge.nombreCvRelance}}</td>\r\n                  <td style=\"width: 10%\">     \r\n                    <a class=\"btn btn-default\" [routerLink]=\"['/ficheCVRelance', charge.idUser]\">\r\n                          <i class=\"cui-magnifying-glass icons font-xl d-block mt-2\"></i>\r\n                        </a>         \r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"panel-footer panel-default pager\">\r\n              <pagination-controls (pageChange)=\"p =$event\"></pagination-controls>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <label style=\"font-weight:bold;color:#546E7A;\">Sessions de formation</label>\r\n          </div>\r\n          <div class=\"card-body\" >\r\n            <table class=\"table table-bordered table-striped table-sm \" style=\"font-size: 0.6rem !important;\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Nom de la formation</th>\r\n                  <th>Lieu de la formation</th>\r\n                  <th>Type de formation</th>\r\n                  <th>Date Démarrage</th>\r\n                  <th>Candidat validé par C.R.</th>\r\n                  <th>Candidat ayant accepté la formation</th>\r\n                  <th>Nombre de place</th>\r\n                  <th>Taux d'acceptation</th>\r\n                  <th>Taux de remplissage</th>\r\n                  <th>Actions</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody >\r\n                <tr *ngFor=\"let session of Sessionreporting| paginate: { itemsPerPage:5, currentPage: p }\">\r\n                  <td >{{session.nom_Formation}}</td>\r\n                  <td>{{session.lieu_Formation}}</td>\r\n                  <td>{{session.type_Formation}}</td>\r\n                  <td>{{session.date_demarrage}}</td>\r\n                  <td>{{session.candidat_affectation}}</td>\r\n                  <td>{{session.candidat_acceptation}}</td>\r\n                  <td>{{session.nombre_place}}</td>\r\n                  <td>{{session.taux_acceptation}}</td>\r\n                  <td>{{session.taux_remplissage}}</td>\r\n                  <td style=\"width: 10%\">     \r\n                    <a class=\"btn btn-default\" [routerLink]=\"['/ficheCandidatSession', session.idSession]\">\r\n                          <i class=\"cui-magnifying-glass icons font-xl d-block mt-2\"></i>\r\n                        </a>         \r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n            <div class=\"panel-footer panel-default pager\">\r\n              <pagination-controls (pageChange)=\"p =$event\"></pagination-controls>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-sm-6\">\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n              <label style=\"font-weight:bold;color:#546E7A;\">Nombre de CV intégrés au niveau de l'application\r\n                </label>\r\n          </div>\r\n          <div class=\"card-body\">\r\n              <table class=\"table table-bordered table-striped\">\r\n                  <thead>\r\n                    <tr>\r\n                      <th>Sourceur</th>\r\n                      <th>Mainframe</th>\r\n                      <th>Mainframe++</th>\r\n                      <th>NTIC</th>\r\n                      <th>Autres technologies</th>\r\n                      <th>TOTAL</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let technologie of Sourceurtechnologies| paginate: { itemsPerPage:3, currentPage: p }\">\r\n                      <td>{{technologie.nom}}</td>\r\n                      <td>{{technologie.nbrCvMainframe}}</td>\r\n                      <td>{{technologie.nbrCvMainframePlus}}</td>\r\n                      <td>{{technologie.nbrCvNtic}}</td>\r\n                      <td>{{technologie.autreTechnologie}}</td>\r\n                      <td>{{technologie.total}}</td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <div class=\"panel-footer panel-default pager\">\r\n                    <pagination-controls (pageChange)=\"p =$event\"></pagination-controls>\r\n                  </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  "

/***/ }),

/***/ "./src/app/views/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_accueilService_accueil_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/accueilService/accueil.service */ "./src/app/services/accueilService/accueil.service.ts");
/* harmony import */ var _services_administrationService_TechnologieService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/administrationService/TechnologieService */ "./src/app/services/administrationService/TechnologieService.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(accueilService, technologieService) {
        this.accueilService = accueilService;
        this.technologieService = technologieService;
        this.ReportingChargeRelance = [];
        this.Sessionreporting = [];
        this.Sourceurtechnologies = [];
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.pieChartType = 'pie';
        this.ChartColors = [
            {
                backgroundColor: ["#FF7360", "#6FC8CE", "gray", "#FFFCC4", "#B9E8E0", "#FFABF6", "#01FBBA"]
            }
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.loadReportingChargeRelance();
        this.loadSessionReporting();
        this.loadSourceurtechnologies();
        this.getChart();
    };
    DashboardComponent.prototype.loadReportingChargeRelance = function () {
        var _this = this;
        this.accueilService.getNombreCVRrelancer().subscribe(function (result) { _this.ReportingChargeRelance = result; });
    };
    DashboardComponent.prototype.loadSessionReporting = function () {
        var _this = this;
        this.accueilService.getSessionreporting().subscribe(function (result) { _this.Sessionreporting = result; });
    };
    DashboardComponent.prototype.loadSourceurtechnologies = function () {
        var _this = this;
        this.accueilService.getSourceurTechnologies().subscribe(function (result) { _this.Sourceurtechnologies = result; });
    };
    DashboardComponent.prototype.getChart = function () {
        var _this = this;
        this.accueilService.getChart().subscribe(function (result) {
            _this.pieChartData = Object.values(result);
            for (var i = 0; i < Object.keys(result).length; i++) {
                _this.pieChartLabels[i] = Object.keys(result)[i];
            }
        });
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/views/dashboard/dashboard.component.html")
        }),
        __metadata("design:paramtypes", [_services_accueilService_accueil_service__WEBPACK_IMPORTED_MODULE_1__["AccueilService"],
            _services_administrationService_TechnologieService__WEBPACK_IMPORTED_MODULE_2__["TechnologieService"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-charts/ng2-charts */ "./node_modules/ng2-charts/ng2-charts.js");
/* harmony import */ var ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/index.js");
/* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/buttons */ "./node_modules/ngx-bootstrap/buttons/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/views/dashboard/dashboard.component.ts");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/views/dashboard/dashboard-routing.module.ts");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-pagination */ "./node_modules/ngx-pagination/dist/ngx-pagination.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                ngx_pagination__WEBPACK_IMPORTED_MODULE_8__["NgxPaginationModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_7__["DashboardRoutingModule"],
                ng2_charts_ng2_charts__WEBPACK_IMPORTED_MODULE_2__["ChartsModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_3__["BsDropdownModule"],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_4__["ButtonsModule"].forRoot()
            ],
            declarations: [_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"]]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-dashboard-dashboard-module.js.map