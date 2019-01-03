(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-base-base-module"],{

/***/ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js ***!
  \*****************************************************************************/
/*! exports provided: CarouselComponent, CarouselModule, SlideComponent, CarouselConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselComponent", function() { return CarouselComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselModule", function() { return CarouselModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideComponent", function() { return SlideComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselConfig", function() { return CarouselConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CarouselConfig = /** @class */ (function () {
    function CarouselConfig() {
        /**
         * Default interval of auto changing of slides
         */
        this.interval = 5000;
        /**
         * Is loop of auto changing of slides can be paused
         */
        this.noPause = false;
        /**
         * Is slides can wrap from the last to the first slide
         */
        this.noWrap = false;
        /**
         * Show carousel-indicators
         */
        this.showIndicators = true;
    }
    CarouselConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return CarouselConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
var Direction = {
    UNKNOWN: 0,
    NEXT: 1,
    PREV: 2,
};
Direction[Direction.UNKNOWN] = "UNKNOWN";
Direction[Direction.NEXT] = "NEXT";
Direction[Direction.PREV] = "PREV";
/**
 * Base element to create carousel
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(config, ngZone) {
        this.ngZone = ngZone;
        /**
         * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
         */
        this.activeSlideChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](false);
        this._slides = new ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["LinkedList"]();
        this.destroyed = false;
        Object.assign(this, config);
    }
    Object.defineProperty(CarouselComponent.prototype, "activeSlide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentActiveSlide;
        },
        set: /**
         * Index of currently displayed slide(started for 0)
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (this._slides.length && index !== this._currentActiveSlide) {
                this._select(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "interval", {
        get: /**
         * Delay of item cycling in milliseconds. If false, carousel won't cycle
         * automatically.
         * @return {?}
         */
        function () {
            return this._interval;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        get: /**
         * @return {?}
         */
        function () {
            return this._slides.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isBs4", {
        get: /**
         * @return {?}
         */
        function () {
            return !Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed = true;
    };
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param slide
     */
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    CarouselComponent.prototype.addSlide = /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        this._slides.add(slide);
        if (this._slides.length === 1) {
            this._currentActiveSlide = void 0;
            this.activeSlide = 0;
            this.play();
        }
    };
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param slide
     */
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    CarouselComponent.prototype.removeSlide = /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        var _this = this;
        var /** @type {?} */ remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            var /** @type {?} */ nextSlideIndex_1 = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex_1 = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout(function () {
                _this._select(nextSlideIndex_1);
            }, 0);
        }
        else {
            this._slides.remove(remIndex);
            var /** @type {?} */ currentSlideIndex_1 = this.getCurrentSlideIndex();
            setTimeout(function () {
                // after removing, need to actualize index of current active slide
                // after removing, need to actualize index of current active slide
                _this._currentActiveSlide = currentSlideIndex_1;
                _this.activeSlideChange.emit(_this._currentActiveSlide);
            }, 0);
        }
    };
    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.nextSlide = /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.activeSlide = this.findNextSlideIndex(Direction.NEXT, force);
    };
    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.previousSlide = /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.activeSlide = this.findNextSlideIndex(Direction.PREV, force);
    };
    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.selectSlide = /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.activeSlide = index;
    };
    /**
     * Starts a auto changing of slides
     */
    /**
     * Starts a auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.play = /**
     * Starts a auto changing of slides
     * @return {?}
     */
    function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    };
    /**
     * Stops a auto changing of slides
     */
    /**
     * Stops a auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.pause = /**
     * Stops a auto changing of slides
     * @return {?}
     */
    function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    };
    /**
     * Finds and returns index of currently displayed slide
     */
    /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    CarouselComponent.prototype.getCurrentSlideIndex = /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    function () {
        return this._slides.findIndex(function (slide) { return slide.active; });
    };
    /**
     * Defines, whether the specified index is last in collection
     * @param index
     */
    /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isLast = /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index + 1 >= this._slides.length;
    };
    /**
     * Defines next slide index, depending of direction
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    CarouselComponent.prototype.findNextSlideIndex = /**
     * Defines next slide index, depending of direction
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    function (direction, force) {
        var /** @type {?} */ nextSlideIndex = 0;
        if (!force &&
            (this.isLast(this.activeSlide) &&
                direction !== Direction.PREV &&
                this.noWrap)) {
            return void 0;
        }
        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled
                // and need to going forward - select current slide, as a next
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled
                // and need to going backward - select current slide, as a next
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    };
    /**
     * Sets a slide, which specified through index, as active
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype._select = /**
     * Sets a slide, which specified through index, as active
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        var /** @type {?} */ currentSlide = this._slides.get(this._currentActiveSlide);
        if (currentSlide) {
            currentSlide.active = false;
        }
        var /** @type {?} */ nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    };
    /**
     * Starts loop of auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.restartTimer = /**
     * Starts loop of auto changing of slides
     * @return {?}
     */
    function () {
        var _this = this;
        this.resetTimer();
        var /** @type {?} */ interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular(function () {
                return setInterval(function () {
                    var /** @type {?} */ nInterval = +_this.interval;
                    _this.ngZone.run(function () {
                        if (_this.isPlaying &&
                            !isNaN(_this.interval) &&
                            nInterval > 0 &&
                            _this.slides.length) {
                            _this.nextSlide();
                        }
                        else {
                            _this.pause();
                        }
                    });
                }, interval);
            });
        }
    };
    /**
     * Stops loop of auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.resetTimer = /**
     * Stops loop of auto changing of slides
     * @return {?}
     */
    function () {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    };
    CarouselComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'carousel',
                    template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" (mouseup)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\">\n    <li *ngFor=\"let slidez of slides; let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li>\n  </ol>\n  <div class=\"carousel-inner\"><ng-content></ng-content></div>\n  <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\"  [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: CarouselConfig, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], },
    ]; };
    CarouselComponent.propDecorators = {
        "noWrap": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "noPause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "showIndicators": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "activeSlideChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "activeSlide": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "interval": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return CarouselComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SlideComponent = /** @class */ (function () {
    function SlideComponent(carousel) {
        /**
         * Wraps element by appropriate CSS classes
         */
        this.addClass = true;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnInit = /**
     * Fires changes in container collection after adding a new slide instance
     * @return {?}
     */
    function () {
        this.carousel.addSlide(this);
    };
    /** Fires changes in container collection after removing of this slide instance */
    /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    SlideComponent.prototype.ngOnDestroy = /**
     * Fires changes in container collection after removing of this slide instance
     * @return {?}
     */
    function () {
        this.carousel.removeSlide(this);
    };
    SlideComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'slide',
                    template: "\n    <div [class.active]=\"active\" class=\"item\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    host: {
                        '[attr.aria-hidden]': '!active'
                    }
                }] }
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return [
        { type: CarouselComponent, },
    ]; };
    SlideComponent.propDecorators = {
        "active": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.active',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "addClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.item',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.carousel-item',] },],
    };
    return SlideComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    /**
     * @return {?}
     */
    CarouselModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: CarouselModule, providers: [] };
    };
    CarouselModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
                    declarations: [SlideComponent, CarouselComponent],
                    exports: [SlideComponent, CarouselComponent],
                    providers: [CarouselConfig]
                },] }
    ];
    return CarouselModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1jYXJvdXNlbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL2Nhcm91c2VsL3NsaWRlLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC9jYXJvdXNlbC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb25maWcge1xuICAvKiogRGVmYXVsdCBpbnRlcnZhbCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlcyAqL1xuICBpbnRlcnZhbCA9IDUwMDA7XG5cbiAgLyoqIElzIGxvb3Agb2YgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXMgY2FuIGJlIHBhdXNlZCAqL1xuICBub1BhdXNlID0gZmFsc2U7XG5cbiAgLyoqIElzIHNsaWRlcyBjYW4gd3JhcCBmcm9tIHRoZSBsYXN0IHRvIHRoZSBmaXJzdCBzbGlkZSAqL1xuICBub1dyYXAgPSBmYWxzZTtcblxuICAvKiogU2hvdyBjYXJvdXNlbC1pbmRpY2F0b3JzICovXG4gIHNob3dJbmRpY2F0b3JzID0gdHJ1ZTtcbn1cbiIsIi8vIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnRcbi8qKipcbiAqIHBhdXNlIChub3QgeWV0IHN1cHBvcnRlZCkgKD9zdHJpbmc9J2hvdmVyJykgLSBldmVudCBncm91cCBuYW1lIHdoaWNoIHBhdXNlc1xuICogdGhlIGN5Y2xpbmcgb2YgdGhlIGNhcm91c2VsLCBpZiBob3ZlciBwYXVzZXMgb24gbW91c2VlbnRlciBhbmQgcmVzdW1lcyBvblxuICogbW91c2VsZWF2ZSBrZXlib2FyZCAobm90IHlldCBzdXBwb3J0ZWQpICg/Ym9vbGVhbj10cnVlKSAtIGlmIGZhbHNlXG4gKiBjYXJvdXNlbCB3aWxsIG5vdCByZWFjdCB0byBrZXlib2FyZCBldmVudHNcbiAqIG5vdGU6IHN3aXBpbmcgbm90IHlldCBzdXBwb3J0ZWRcbiAqL1xuLyoqKipcbiAqIFByb2JsZW1zOlxuICogMSkgaWYgd2Ugc2V0IGFuIGFjdGl2ZSBzbGlkZSB2aWEgbW9kZWwgY2hhbmdlcywgLmFjdGl2ZSBjbGFzcyByZW1haW5zIG9uIGFcbiAqIGN1cnJlbnQgc2xpZGUuXG4gKiAyKSBpZiB3ZSBoYXZlIG9ubHkgb25lIHNsaWRlLCB3ZSBzaG91bGRuJ3Qgc2hvdyBwcmV2L25leHQgbmF2IGJ1dHRvbnNcbiAqIDMpIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGUgaXMgYWN0aXZlIGFuZCBub1dyYXAgaXMgdHJ1ZSwgdGhlcmUgc2hvdWxkIGJlXG4gKiBcImRpc2FibGVkXCIgY2xhc3Mgb24gdGhlIG5hdiBidXR0b25zLlxuICogNCkgZGVmYXVsdCBpbnRlcnZhbCBzaG91bGQgYmUgZXF1YWwgNTAwMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNCczMsIExpbmtlZExpc3QgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLmNvbmZpZyc7XG5cbmV4cG9ydCBlbnVtIERpcmVjdGlvbiB7XG4gIFVOS05PV04sXG4gIE5FWFQsXG4gIFBSRVZcbn1cblxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgdG8gY3JlYXRlIGNhcm91c2VsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Nhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBJZiBgdHJ1ZWAgw6LCgMKUIGNhcm91c2VsIHdpbGwgbm90IGN5Y2xlIGNvbnRpbnVvdXNseSBhbmQgd2lsbCBoYXZlIGhhcmQgc3RvcHMgKHByZXZlbnQgbG9vcGluZykgKi9cbiAgQElucHV0KCkgbm9XcmFwOiBib29sZWFuO1xuICAvKiogIElmIGB0cnVlYCDDosKAwpQgd2lsbCBkaXNhYmxlIHBhdXNpbmcgb24gY2Fyb3VzZWwgbW91c2UgaG92ZXIgKi9cbiAgQElucHV0KCkgbm9QYXVzZTogYm9vbGVhbjtcbiAgLyoqICBJZiBgdHJ1ZWAgw6LCgMKUIGNhcm91c2VsLWluZGljYXRvcnMgYXJlIHZpc2libGUgICovXG4gIEBJbnB1dCgpIHNob3dJbmRpY2F0b3JzOiBib29sZWFuO1xuXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGUgaGFzIGJlZW4gY2hhbmdlZC4gUGFydCBvZiB0d28td2F5LWJpbmRhYmxlIFsoYWN0aXZlU2xpZGUpXSBwcm9wZXJ0eSAqL1xuICBAT3V0cHV0KClcbiAgYWN0aXZlU2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KGZhbHNlKTtcblxuICAvKiogSW5kZXggb2YgY3VycmVudGx5IGRpc3BsYXllZCBzbGlkZShzdGFydGVkIGZvciAwKSAqL1xuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxheSBvZiBpdGVtIGN5Y2xpbmcgaW4gbWlsbGlzZWNvbmRzLiBJZiBmYWxzZSwgY2Fyb3VzZWwgd29uJ3QgY3ljbGVcbiAgICogYXV0b21hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgZ2V0IHNsaWRlcygpOiBTbGlkZUNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3VycmVudEFjdGl2ZVNsaWRlOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfaW50ZXJ2YWw6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF9zbGlkZXM6IExpbmtlZExpc3Q8U2xpZGVDb21wb25lbnQ+ID0gbmV3IExpbmtlZExpc3Q8U2xpZGVDb21wb25lbnQ+KCk7XG4gIHByb3RlY3RlZCBjdXJyZW50SW50ZXJ2YWw6IGFueTtcbiAgcHJvdGVjdGVkIGlzUGxheWluZzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIGdldCBpc0JzNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzQnMzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IENhcm91c2VsQ29uZmlnLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgbmV3IHNsaWRlLiBJZiB0aGlzIHNsaWRlIGlzIGZpcnN0IGluIGNvbGxlY3Rpb24gLSBzZXQgaXQgYXMgYWN0aXZlXG4gICAqIGFuZCBzdGFydHMgYXV0byBjaGFuZ2luZ1xuICAgKiBAcGFyYW0gc2xpZGVcbiAgICovXG4gIGFkZFNsaWRlKHNsaWRlOiBTbGlkZUNvbXBvbmVudCk6IHZvaWQge1xuICAgIHRoaXMuX3NsaWRlcy5hZGQoc2xpZGUpO1xuICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPSB2b2lkIDA7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gMDtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHNwZWNpZmllZCBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBhY3RpdmUgLSB3aWxsIHJvbGwgdG8gYW5vdGhlclxuICAgKiBzbGlkZVxuICAgKiBAcGFyYW0gc2xpZGVcbiAgICovXG4gIHJlbW92ZVNsaWRlKHNsaWRlOiBTbGlkZUNvbXBvbmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHJlbUluZGV4ID0gdGhpcy5fc2xpZGVzLmluZGV4T2Yoc2xpZGUpO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9PT0gcmVtSW5kZXgpIHtcbiAgICAgIC8vIHJlbW92aW5nIG9mIGFjdGl2ZSBzbGlkZVxuICAgICAgbGV0IG5leHRTbGlkZUluZGV4OiBudW1iZXIgPSB2b2lkIDA7XG4gICAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBzbGlkZSBsYXN0IC0gd2lsbCByb2xsIHRvIGZpcnN0IHNsaWRlLCBpZiBub1dyYXAgZmxhZyBpc1xuICAgICAgICAvLyBGQUxTRSBvciB0byBwcmV2aW91cywgaWYgbm9XcmFwIGlzIFRSVUUgaW4gY2FzZSwgaWYgdGhpcyBzbGlkZSBpblxuICAgICAgICAvLyBtaWRkbGUgb2YgY29sbGVjdGlvbiwgaW5kZXggb2YgbmV4dCBzbGlkZSBpcyBzYW1lIHRvIHJlbW92ZWRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhdGhpcy5pc0xhc3QocmVtSW5kZXgpXG4gICAgICAgICAgPyByZW1JbmRleFxuICAgICAgICAgIDogdGhpcy5ub1dyYXAgPyByZW1JbmRleCAtIDEgOiAwO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XG5cbiAgICAgIC8vIHByZXZlbnRzIGV4Y2VwdGlvbiB3aXRoIGNoYW5naW5nIHNvbWUgdmFsdWUgYWZ0ZXIgY2hlY2tpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZWxlY3QobmV4dFNsaWRlSW5kZXgpO1xuICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NsaWRlcy5yZW1vdmUocmVtSW5kZXgpO1xuICAgICAgY29uc3QgY3VycmVudFNsaWRlSW5kZXggPSB0aGlzLmdldEN1cnJlbnRTbGlkZUluZGV4KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gYWZ0ZXIgcmVtb3ZpbmcsIG5lZWQgdG8gYWN0dWFsaXplIGluZGV4IG9mIGN1cnJlbnQgYWN0aXZlIHNsaWRlXG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRTbGlkZUluZGV4O1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSb2xsaW5nIHRvIG5leHQgc2xpZGVcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgdHJ1ZSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnXG4gICAqL1xuICBuZXh0U2xpZGUoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChEaXJlY3Rpb24uTkVYVCwgZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gcHJldmlvdXMgc2xpZGVcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgdHJ1ZSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnXG4gICAqL1xuICBwcmV2aW91c1NsaWRlKGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoRGlyZWN0aW9uLlBSRVYsIGZvcmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb2xsaW5nIHRvIHNwZWNpZmllZCBzbGlkZVxuICAgKiBAcGFyYW0gaW5kZXg6IHtudW1iZXJ9IGluZGV4IG9mIHNsaWRlLCB3aGljaCBtdXN0IGJlIHNob3duXG4gICAqL1xuICBzZWxlY3RTbGlkZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIGEgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcbiAgICovXG4gIHBhdXNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ub1BhdXNlKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCByZXR1cm5zIGluZGV4IG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgc2xpZGVcbiAgICovXG4gIGdldEN1cnJlbnRTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlcy5maW5kSW5kZXgoKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzLCB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgbGFzdCBpbiBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgaXNMYXN0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggKyAxID49IHRoaXMuX3NsaWRlcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBuZXh0IHNsaWRlIGluZGV4LCBkZXBlbmRpbmcgb2YgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBkaXJlY3Rpb246IERpcmVjdGlvbihVTktOT1dOfFBSRVZ8TkVYVClcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgVFJVRSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnLCBlbHNlIHdpbGxcbiAgICogICByZXR1cm4gdW5kZWZpbmVkIGlmIG5leHQgc2xpZGUgcmVxdWlyZSB3cmFwcGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBmaW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgbmV4dFNsaWRlSW5kZXggPSAwO1xuXG4gICAgaWYgKFxuICAgICAgIWZvcmNlICYmXG4gICAgICAodGhpcy5pc0xhc3QodGhpcy5hY3RpdmVTbGlkZSkgJiZcbiAgICAgICAgZGlyZWN0aW9uICE9PSBEaXJlY3Rpb24uUFJFViAmJlxuICAgICAgICB0aGlzLm5vV3JhcClcbiAgICApIHtcbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRGlyZWN0aW9uLk5FWFQ6XG4gICAgICAgIC8vIGlmIHRoaXMgaXMgbGFzdCBzbGlkZSwgbm90IGZvcmNlLCBsb29waW5nIGlzIGRpc2FibGVkXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGZvcndhcmQgLSBzZWxlY3QgY3VycmVudCBzbGlkZSwgYXMgYSBuZXh0XG4gICAgICAgIG5leHRTbGlkZUluZGV4ID0gIXRoaXMuaXNMYXN0KHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSlcbiAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSArIDFcbiAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcCA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA6IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEaXJlY3Rpb24uUFJFVjpcbiAgICAgICAgLy8gaWYgdGhpcyBpcyBmaXJzdCBzbGlkZSwgbm90IGZvcmNlLCBsb29waW5nIGlzIGRpc2FibGVkXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGJhY2t3YXJkIC0gc2VsZWN0IGN1cnJlbnQgc2xpZGUsIGFzIGEgbmV4dFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9XG4gICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID4gMFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgLSAxXG4gICAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVcbiAgICAgICAgICAgIDogdGhpcy5fc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRpcmVjdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2xpZGVJbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc2xpZGUsIHdoaWNoIHNwZWNpZmllZCB0aHJvdWdoIGluZGV4LCBhcyBhY3RpdmVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50U2xpZGUgPSB0aGlzLl9zbGlkZXMuZ2V0KHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSk7XG4gICAgaWYgKGN1cnJlbnRTbGlkZSkge1xuICAgICAgY3VycmVudFNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBuZXh0U2xpZGUgPSB0aGlzLl9zbGlkZXMuZ2V0KGluZGV4KTtcbiAgICBpZiAobmV4dFNsaWRlKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgICAgIG5leHRTbGlkZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZUNoYW5nZS5lbWl0KGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIGxvb3Agb2YgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcbiAgICovXG4gIHByaXZhdGUgcmVzdGFydFRpbWVyKCk6IGFueSB7XG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nICYmXG4gICAgICAgICAgICAgICFpc05hTih0aGlzLmludGVydmFsKSAmJlxuICAgICAgICAgICAgICBuSW50ZXJ2YWwgPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmxlbmd0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudEludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuY3VycmVudEludGVydmFsKTtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc2xpZGUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVcIiBjbGFzcz1cIml0ZW1cIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaG9zdDoge1xuICAgICdbYXR0ci5hcmlhLWhpZGRlbl0nOiAnIWFjdGl2ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIElzIGN1cnJlbnQgc2xpZGUgYWN0aXZlICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgQElucHV0KClcbiAgYWN0aXZlOiBib29sZWFuO1xuXG4gIC8qKiBXcmFwcyBlbGVtZW50IGJ5IGFwcHJvcHJpYXRlIENTUyBjbGFzc2VzICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXRlbScpXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtaXRlbScpXG4gIGFkZENsYXNzID0gdHJ1ZTtcblxuICAvKiogTGluayB0byBQYXJlbnQoY29udGFpbmVyLWNvbGxlY3Rpb24pIGNvbXBvbmVudCAqL1xuICBwcm90ZWN0ZWQgY2Fyb3VzZWw6IENhcm91c2VsQ29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsOiBDYXJvdXNlbENvbXBvbmVudCkge1xuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcbiAgfVxuXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIGFkZGluZyBhIG5ldyBzbGlkZSBpbnN0YW5jZSAqL1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhcm91c2VsLmFkZFNsaWRlKHRoaXMpO1xuICB9XG5cbiAgLyoqIEZpcmVzIGNoYW5nZXMgaW4gY29udGFpbmVyIGNvbGxlY3Rpb24gYWZ0ZXIgcmVtb3Zpbmcgb2YgdGhpcyBzbGlkZSBpbnN0YW5jZSAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNhcm91c2VsLnJlbW92ZVNsaWRlKHRoaXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGUuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29uZmlnIH0gZnJvbSAnLi9jYXJvdXNlbC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbU2xpZGVDb21wb25lbnQsIENhcm91c2VsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NsaWRlQ29tcG9uZW50LCBDYXJvdXNlbENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0Nhcm91c2VsQ29uZmlnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJvdXNlbE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBDYXJvdXNlbE1vZHVsZSwgcHJvdmlkZXJzOiBbXSB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7d0JBS2EsSUFBSTs7Ozt1QkFHTCxLQUFLOzs7O3NCQUdOLEtBQUs7Ozs7OEJBR0csSUFBSTs7O2dCQVp0QixVQUFVOzt5QkFGWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUM0RkUsMkJBQVksTUFBc0IsRUFBVSxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTs7OztpQ0EzQ25CLElBQUksWUFBWSxDQUFNLEtBQUssQ0FBQzt1QkFrQ25CLElBQUksVUFBVSxFQUFrQjt5QkFHMUQsS0FBSztRQU96QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QjswQkF6Q0csMENBQVc7Ozs7UUFNZjtZQUNFLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ2pDOzs7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

/***/ }),

/***/ "./node_modules/ngx-bootstrap/pagination/fesm5/ngx-bootstrap-pagination.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/pagination/fesm5/ngx-bootstrap-pagination.js ***!
  \*********************************************************************************/
/*! exports provided: PagerComponent, PaginationComponent, PaginationModule, PaginationConfig, ɵa, ɵb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagerComponent", function() { return PagerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationComponent", function() { return PaginationComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationModule", function() { return PaginationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationConfig", function() { return PaginationConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return PAGER_CONTROL_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return PAGINATION_CONTROL_VALUE_ACCESSOR; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides default values for Pagination and pager components
 */
var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
        this.main = {
            maxSize: void 0,
            itemsPerPage: 10,
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            pageBtnClass: '',
            rotate: true
        };
        this.pager = {
            itemsPerPage: 15,
            previousText: '« Previous',
            nextText: 'Next »',
            pageBtnClass: '',
            align: true
        };
    }
    PaginationConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return PaginationConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    // tslint:disable-next-line
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return PagerComponent; }),
    multi: true
};
var PagerComponent = /** @class */ (function () {
    function PagerComponent(renderer, elementRef, paginationConfig, changeDetection) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */
        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to
         * object with current page index and number of items per page
         */
        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(Object.assign({}, paginationConfig.main, paginationConfig.pager));
        }
    }
    Object.defineProperty(PagerComponent.prototype, "itemsPerPage", {
        get: /**
         * maximum number of items per page. If value less than 1 will display all items on one page
         * @return {?}
         */
        function () {
            return this._itemsPerPage;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalItems", {
        get: /**
         * total number of items in all pages
         * @return {?}
         */
        function () {
            return this._totalItems;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalPages", {
        get: /**
         * @return {?}
         */
        function () {
            return this._totalPages;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () {
            return this._page;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ _previous = this._page;
            this._page = value > this.totalPages ? this.totalPages : value || 1;
            this.changeDetection.markForCheck();
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    PagerComponent.prototype.configureOptions = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = Object.assign({}, config);
    };
    /**
     * @return {?}
     */
    PagerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        }
        // watch for maxSize
        this.maxSize =
            typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
        this.rotate =
            typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
        this.boundaryLinks =
            typeof this.boundaryLinks !== 'undefined'
                ? this.boundaryLinks
                : this.config.boundaryLinks;
        this.directionLinks =
            typeof this.directionLinks !== 'undefined'
                ? this.directionLinks
                : this.config.directionLinks;
        this.pageBtnClass =
            typeof this.pageBtnClass !== 'undefined'
                ? this.pageBtnClass
                : this.config.pageBtnClass;
        // base class
        this.itemsPerPage =
            typeof this.itemsPerPage !== 'undefined'
                ? this.itemsPerPage
                : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PagerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    PagerComponent.prototype.getText = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return (/** @type {?} */ (this))[key + "Text"] || this.config[key + "Text"];
    };
    /**
     * @return {?}
     */
    PagerComponent.prototype.noPrevious = /**
     * @return {?}
     */
    function () {
        return this.page === 1;
    };
    /**
     * @return {?}
     */
    PagerComponent.prototype.noNext = /**
     * @return {?}
     */
    function () {
        return this.page === this.totalPages;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PagerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PagerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    PagerComponent.prototype.selectPage = /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var /** @type {?} */ target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    // Create page object used in template
    /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    PagerComponent.prototype.makePage = /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    PagerComponent.prototype.getPages = /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    function (currentPage, totalPages) {
        var /** @type {?} */ pages = [];
        // Default page limits
        var /** @type {?} */ startPage = 1;
        var /** @type {?} */ endPage = totalPages;
        var /** @type {?} */ isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage =
                    (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var /** @type {?} */ num = startPage; num <= endPage; num++) {
            var /** @type {?} */ page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var /** @type {?} */ previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var /** @type {?} */ nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    // base class
    /**
     * @return {?}
     */
    PagerComponent.prototype.calculateTotalPages = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PagerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'pager',
                    template: "<ul class=\"pager\">\n  <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\"\n      [ngClass]=\"{'pull-right': align, 'float-right': align}\"\n      class=\"{{ pageBtnClass }}\">\n    <a href (click)=\"selectPage(page - 1, $event)\">{{ getText('previous') }}</a>\n  </li>\n  <li [class.disabled]=\"noNext()\" [class.next]=\"align\"\n      [ngClass]=\"{'pull-right': align, 'float-right': align}\"\n      class=\"{{ pageBtnClass }}\">\n    <a href (click)=\"selectPage(page + 1, $event)\">{{ getText('next') }}</a>\n  </li>\n</ul>\n",
                    providers: [PAGER_CONTROL_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    PagerComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: PaginationConfig, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
    ]; };
    PagerComponent.propDecorators = {
        "align": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "maxSize": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "boundaryLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "directionLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "firstText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "previousText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "nextText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "lastText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "rotate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "pageBtnClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "numPages": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "pageChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "itemsPerPage": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "totalItems": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PagerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NG_VALUE_ACCESSOR"],
    // tslint:disable-next-line
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return PaginationComponent; }),
    multi: true
};
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(renderer, elementRef, paginationConfig, changeDetection) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.changeDetection = changeDetection;
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */
        this.numPages = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to object
         * with current page index and number of items per page
         */
        this.pageChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(paginationConfig.main);
        }
    }
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        get: /**
         * maximum number of items per page. If value less than 1 will display all items on one page
         * @return {?}
         */
        function () {
            return this._itemsPerPage;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: /**
         * total number of items in all pages
         * @return {?}
         */
        function () {
            return this._totalItems;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        get: /**
         * @return {?}
         */
        function () {
            return this._totalPages;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () {
            return this._page;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ _previous = this._page;
            this._page = value > this.totalPages ? this.totalPages : value || 1;
            this.changeDetection.markForCheck();
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} config
     * @return {?}
     */
    PaginationComponent.prototype.configureOptions = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.config = Object.assign({}, config);
    };
    /**
     * @return {?}
     */
    PaginationComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (typeof window !== 'undefined') {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        }
        // watch for maxSize
        this.maxSize =
            typeof this.maxSize !== 'undefined' ? this.maxSize : this.config.maxSize;
        this.rotate =
            typeof this.rotate !== 'undefined' ? this.rotate : this.config.rotate;
        this.boundaryLinks =
            typeof this.boundaryLinks !== 'undefined'
                ? this.boundaryLinks
                : this.config.boundaryLinks;
        this.directionLinks =
            typeof this.directionLinks !== 'undefined'
                ? this.directionLinks
                : this.config.directionLinks;
        this.pageBtnClass =
            typeof this.pageBtnClass !== 'undefined'
                ? this.pageBtnClass
                : this.config.pageBtnClass;
        // base class
        this.itemsPerPage =
            typeof this.itemsPerPage !== 'undefined'
                ? this.itemsPerPage
                : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PaginationComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    PaginationComponent.prototype.getText = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return (/** @type {?} */ (this))[key + "Text"] || this.config[key + "Text"];
    };
    /**
     * @return {?}
     */
    PaginationComponent.prototype.noPrevious = /**
     * @return {?}
     */
    function () {
        return this.page === 1;
    };
    /**
     * @return {?}
     */
    PaginationComponent.prototype.noNext = /**
     * @return {?}
     */
    function () {
        return this.page === this.totalPages;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PaginationComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    PaginationComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    PaginationComponent.prototype.selectPage = /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var /** @type {?} */ target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    // Create page object used in template
    /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    PaginationComponent.prototype.makePage = /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    PaginationComponent.prototype.getPages = /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    function (currentPage, totalPages) {
        var /** @type {?} */ pages = [];
        // Default page limits
        var /** @type {?} */ startPage = 1;
        var /** @type {?} */ endPage = totalPages;
        var /** @type {?} */ isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage =
                    (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var /** @type {?} */ num = startPage; num <= endPage; num++) {
            var /** @type {?} */ page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var /** @type {?} */ previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var /** @type {?} */ nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    // base class
    /**
     * @return {?}
     */
    PaginationComponent.prototype.calculateTotalPages = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PaginationComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'pagination',
                    template: "<ul class=\"pagination\" [ngClass]=\"classMap\">\n  <li class=\"pagination-first page-item\"\n      *ngIf=\"boundaryLinks\"\n      [class.disabled]=\"noPrevious()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(1, $event)\"\n       [innerHTML]=\"getText('first')\"></a>\n  </li>\n\n  <li class=\"pagination-prev page-item\"\n      *ngIf=\"directionLinks\"\n      [class.disabled]=\"noPrevious()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\"\n       [innerHTML]=\"getText('previous')\"></a>\n  </li>\n\n  <li *ngFor=\"let pg of pages\"\n      [class.active]=\"pg.active\"\n      [class.disabled]=\"disabled&&!pg.active\"\n      class=\"pagination-page page-item\">\n    <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\"\n       [innerHTML]=\"pg.text\"></a>\n  </li>\n\n  <li class=\"pagination-next page-item\"\n      *ngIf=\"directionLinks\"\n      [class.disabled]=\"noNext()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\"\n       [innerHTML]=\"getText('next')\"></a></li>\n\n  <li class=\"pagination-last page-item\"\n      *ngIf=\"boundaryLinks\"\n      [class.disabled]=\"noNext()||disabled\">\n    <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\"\n       [innerHTML]=\"getText('last')\"></a></li>\n</ul>\n",
                    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
                }] }
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: PaginationConfig, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], },
    ]; };
    PaginationComponent.propDecorators = {
        "align": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "maxSize": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "boundaryLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "directionLinks": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "firstText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "previousText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "nextText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "lastText": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "rotate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "pageBtnClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "disabled": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "numPages": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "pageChanged": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "itemsPerPage": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "totalItems": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PaginationComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    /**
     * @return {?}
     */
    PaginationModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: PaginationModule, providers: [PaginationConfig] };
    };
    PaginationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
                    declarations: [PagerComponent, PaginationComponent],
                    exports: [PagerComponent, PaginationComponent]
                },] }
    ];
    return PaginationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wYWdpbmF0aW9uLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtYm9vdHN0cmFwL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdlci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9wYWdpbmF0aW9uL3BhZ2luYXRpb24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHRvZG86IHNwbGl0XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKiBQcm92aWRlcyBkZWZhdWx0IHZhbHVlcyBmb3IgUGFnaW5hdGlvbiBhbmQgcGFnZXIgY29tcG9uZW50cyAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db25maWcge1xuICBtYWluOiBhbnkgPSB7XG4gICAgbWF4U2l6ZTogdm9pZCAwLFxuICAgIGl0ZW1zUGVyUGFnZTogMTAsXG4gICAgYm91bmRhcnlMaW5rczogZmFsc2UsXG4gICAgZGlyZWN0aW9uTGlua3M6IHRydWUsXG4gICAgZmlyc3RUZXh0OiAnRmlyc3QnLFxuICAgIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgICBuZXh0VGV4dDogJ05leHQnLFxuICAgIGxhc3RUZXh0OiAnTGFzdCcsXG4gICAgcGFnZUJ0bkNsYXNzOiAnJyxcbiAgICByb3RhdGU6IHRydWVcbiAgfTtcbiAgcGFnZXI6IGFueSA9IHtcbiAgICBpdGVtc1BlclBhZ2U6IDE1LFxuICAgIHByZXZpb3VzVGV4dDogJ8OCwqsgUHJldmlvdXMnLFxuICAgIG5leHRUZXh0OiAnTmV4dCDDgsK7JyxcbiAgICBwYWdlQnRuQ2xhc3M6ICcnLFxuICAgIGFsaWduOiB0cnVlXG4gIH07XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUGFnZUNoYW5nZWRFdmVudCB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb25maWcnO1xuXG5leHBvcnQgY29uc3QgUEFHRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFBhZ2VyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BhZ2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2VyLmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbUEFHRVJfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgY29uZmlnOiBhbnk7XG4gIC8qKiBpZiBgdHJ1ZWAgYWxpZ25zIGVhY2ggbGluayB0byB0aGUgc2lkZXMgb2YgcGFnZXIgKi9cbiAgQElucHV0KCkgYWxpZ246IGJvb2xlYW47XG4gIC8qKiBsaW1pdCBudW1iZXIgZm9yIHBhZ2UgbGlua3MgaW4gcGFnZXIgKi9cbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xuICAvKiogaWYgZmFsc2UgZmlyc3QgYW5kIGxhc3QgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuICAvKiogaWYgZmFsc2UgcHJldmlvdXMgYW5kIG5leHQgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcbiAgLy8gbGFiZWxzXG4gIC8qKiBmaXJzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBmaXJzdFRleHQ6IHN0cmluZztcbiAgLyoqIHByZXZpb3VzIGJ1dHRvbiB0ZXh0ICovXG4gIEBJbnB1dCgpIHByZXZpb3VzVGV4dDogc3RyaW5nO1xuICAvKiogbmV4dCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBuZXh0VGV4dDogc3RyaW5nO1xuICAvKiogbGFzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBsYXN0VGV4dDogc3RyaW5nO1xuICAvKiogaWYgdHJ1ZSBjdXJyZW50IHBhZ2Ugd2lsbCBpbiB0aGUgbWlkZGxlIG9mIHBhZ2VzIGxpc3QgKi9cbiAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuICAvLyBjc3NcbiAgLyoqIGFkZCBjbGFzcyB0byA8Y29kZT48bGlcXD48L2NvZGU+ICovXG4gIEBJbnB1dCgpIHBhZ2VCdG5DbGFzczogc3RyaW5nO1xuXG4gIC8qKiBpZiB0cnVlIHBhZ2luYXRpb24gY29tcG9uZW50IHdpbGwgYmUgZGlzYWJsZWQgKi9cbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqIGZpcmVkIHdoZW4gdG90YWwgcGFnZXMgY291bnQgY2hhbmdlcywgJGV2ZW50Om51bWJlciBlcXVhbHMgdG8gdG90YWwgcGFnZXMgY291bnQgKi9cbiAgQE91dHB1dCgpIG51bVBhZ2VzOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAvKiogZmlyZWQgd2hlbiBwYWdlIHdhcyBjaGFuZ2VkLCAkZXZlbnQ6e3BhZ2UsIGl0ZW1zUGVyUGFnZX0gZXF1YWxzIHRvXG4gICAqIG9iamVjdCB3aXRoIGN1cnJlbnQgcGFnZSBpbmRleCBhbmQgbnVtYmVyIG9mIGl0ZW1zIHBlciBwYWdlXG4gICAqL1xuICBAT3V0cHV0KClcbiAgcGFnZUNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxQYWdlQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUNoYW5nZWRFdmVudD4oKTtcblxuICAvKiogbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuIElmIHZhbHVlIGxlc3MgdGhhbiAxIHdpbGwgZGlzcGxheSBhbGwgaXRlbXMgb24gb25lIHBhZ2UgKi9cbiAgQElucHV0KClcbiAgZ2V0IGl0ZW1zUGVyUGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBzZXQgaXRlbXNQZXJQYWdlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2l0ZW1zUGVyUGFnZSA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICAvKiogdG90YWwgbnVtYmVyIG9mIGl0ZW1zIGluIGFsbCBwYWdlcyAqL1xuICBASW5wdXQoKVxuICBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbEl0ZW1zO1xuICB9XG5cbiAgc2V0IHRvdGFsSXRlbXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxJdGVtcyA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICB9XG5cbiAgc2V0IHRvdGFsUGFnZXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxQYWdlcyA9IHY7XG4gICAgdGhpcy5udW1QYWdlcy5lbWl0KHYpO1xuICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IHBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IF9wcmV2aW91cyA9IHRoaXMuX3BhZ2U7XG4gICAgdGhpcy5fcGFnZSA9IHZhbHVlID4gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy50b3RhbFBhZ2VzIDogdmFsdWUgfHwgMTtcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmIChfcHJldmlvdXMgPT09IHRoaXMuX3BhZ2UgfHwgdHlwZW9mIF9wcmV2aW91cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQoe1xuICAgICAgcGFnZTogdGhpcy5fcGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cblxuICBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBvblRvdWNoZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICBjbGFzc01hcDogc3RyaW5nO1xuICBwYWdlczogYW55W107XG5cbiAgcHJvdGVjdGVkIF9pdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF90b3RhbEl0ZW1zOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfdG90YWxQYWdlczogbnVtYmVyO1xuICBwcm90ZWN0ZWQgaW5pdGVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfcGFnZSA9IDE7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHBhZ2luYXRpb25Db25maWc6IFBhZ2luYXRpb25Db25maWcsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB0aGlzLmVsZW1lbnRSZWYgPSBlbGVtZW50UmVmO1xuICAgIGlmICghdGhpcy5jb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlndXJlT3B0aW9ucyhcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgcGFnaW5hdGlvbkNvbmZpZy5tYWluLCBwYWdpbmF0aW9uQ29uZmlnLnBhZ2VyKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjb25maWd1cmVPcHRpb25zKGNvbmZpZzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmNsYXNzTWFwID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICAgIH1cbiAgICAvLyB3YXRjaCBmb3IgbWF4U2l6ZVxuICAgIHRoaXMubWF4U2l6ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5tYXhTaXplICE9PSAndW5kZWZpbmVkJyA/IHRoaXMubWF4U2l6ZSA6IHRoaXMuY29uZmlnLm1heFNpemU7XG4gICAgdGhpcy5yb3RhdGUgPVxuICAgICAgdHlwZW9mIHRoaXMucm90YXRlICE9PSAndW5kZWZpbmVkJyA/IHRoaXMucm90YXRlIDogdGhpcy5jb25maWcucm90YXRlO1xuICAgIHRoaXMuYm91bmRhcnlMaW5rcyA9XG4gICAgICB0eXBlb2YgdGhpcy5ib3VuZGFyeUxpbmtzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuYm91bmRhcnlMaW5rc1xuICAgICAgICA6IHRoaXMuY29uZmlnLmJvdW5kYXJ5TGlua3M7XG4gICAgdGhpcy5kaXJlY3Rpb25MaW5rcyA9XG4gICAgICB0eXBlb2YgdGhpcy5kaXJlY3Rpb25MaW5rcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLmRpcmVjdGlvbkxpbmtzXG4gICAgICAgIDogdGhpcy5jb25maWcuZGlyZWN0aW9uTGlua3M7XG4gICAgdGhpcy5wYWdlQnRuQ2xhc3MgPVxuICAgICAgdHlwZW9mIHRoaXMucGFnZUJ0bkNsYXNzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMucGFnZUJ0bkNsYXNzXG4gICAgICAgIDogdGhpcy5jb25maWcucGFnZUJ0bkNsYXNzO1xuXG4gICAgLy8gYmFzZSBjbGFzc1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID1cbiAgICAgIHR5cGVvZiB0aGlzLml0ZW1zUGVyUGFnZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLml0ZW1zUGVyUGFnZVxuICAgICAgICA6IHRoaXMuY29uZmlnLml0ZW1zUGVyUGFnZTtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICAvLyB0aGlzIGNsYXNzXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZSA9IHZhbHVlO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgfVxuXG4gIGdldFRleHQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcyBhcyBhbnkpW2Ake2tleX1UZXh0YF0gfHwgdGhpcy5jb25maWdbYCR7a2V5fVRleHRgXTtcbiAgfVxuXG4gIG5vUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA9PT0gMTtcbiAgfVxuXG4gIG5vTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRhcmdldC5ibHVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLndyaXRlVmFsdWUocGFnZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIHBhZ2Ugb2JqZWN0IHVzZWQgaW4gdGVtcGxhdGVcbiAgcHJvdGVjdGVkIG1ha2VQYWdlKG51bTogbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBib29sZWFuKTogeyBudW1iZXI6IG51bWJlcjsgdGV4dDogc3RyaW5nOyBhY3RpdmU6IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHt0ZXh0LCBudW1iZXI6IG51bSwgYWN0aXZlfTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYWdlcyhjdXJyZW50UGFnZTogbnVtYmVyLCB0b3RhbFBhZ2VzOiBudW1iZXIpOiBhbnlbXSB7XG4gICAgY29uc3QgcGFnZXM6IGFueVtdID0gW107XG5cbiAgICAvLyBEZWZhdWx0IHBhZ2UgbGltaXRzXG4gICAgbGV0IHN0YXJ0UGFnZSA9IDE7XG4gICAgbGV0IGVuZFBhZ2UgPSB0b3RhbFBhZ2VzO1xuICAgIGNvbnN0IGlzTWF4U2l6ZWQgPVxuICAgICAgdHlwZW9mIHRoaXMubWF4U2l6ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5tYXhTaXplIDwgdG90YWxQYWdlcztcblxuICAgIC8vIHJlY29tcHV0ZSBpZiBtYXhTaXplXG4gICAgaWYgKGlzTWF4U2l6ZWQpIHtcbiAgICAgIGlmICh0aGlzLnJvdGF0ZSkge1xuICAgICAgICAvLyBDdXJyZW50IHBhZ2UgaXMgZGlzcGxheWVkIGluIHRoZSBtaWRkbGUgb2YgdGhlIHZpc2libGUgb25lc1xuICAgICAgICBzdGFydFBhZ2UgPSBNYXRoLm1heChjdXJyZW50UGFnZSAtIE1hdGguZmxvb3IodGhpcy5tYXhTaXplIC8gMiksIDEpO1xuICAgICAgICBlbmRQYWdlID0gc3RhcnRQYWdlICsgdGhpcy5tYXhTaXplIC0gMTtcblxuICAgICAgICAvLyBBZGp1c3QgaWYgbGltaXQgaXMgZXhjZWVkZWRcbiAgICAgICAgaWYgKGVuZFBhZ2UgPiB0b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgICAgICAgc3RhcnRQYWdlID0gZW5kUGFnZSAtIHRoaXMubWF4U2l6ZSArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFZpc2libGUgcGFnZXMgYXJlIHBhZ2luYXRlZCB3aXRoIG1heFNpemVcbiAgICAgICAgc3RhcnRQYWdlID1cbiAgICAgICAgICAoTWF0aC5jZWlsKGN1cnJlbnRQYWdlIC8gdGhpcy5tYXhTaXplKSAtIDEpICogdGhpcy5tYXhTaXplICsgMTtcblxuICAgICAgICAvLyBBZGp1c3QgbGFzdCBwYWdlIGlmIGxpbWl0IGlzIGV4Y2VlZGVkXG4gICAgICAgIGVuZFBhZ2UgPSBNYXRoLm1pbihzdGFydFBhZ2UgKyB0aGlzLm1heFNpemUgLSAxLCB0b3RhbFBhZ2VzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGFnZSBudW1iZXIgbGlua3NcbiAgICBmb3IgKGxldCBudW0gPSBzdGFydFBhZ2U7IG51bSA8PSBlbmRQYWdlOyBudW0rKykge1xuICAgICAgY29uc3QgcGFnZSA9IHRoaXMubWFrZVBhZ2UobnVtLCBudW0udG9TdHJpbmcoKSwgbnVtID09PSBjdXJyZW50UGFnZSk7XG4gICAgICBwYWdlcy5wdXNoKHBhZ2UpO1xuICAgIH1cblxuICAgIC8vIEFkZCBsaW5rcyB0byBtb3ZlIGJldHdlZW4gcGFnZSBzZXRzXG4gICAgaWYgKGlzTWF4U2l6ZWQgJiYgIXRoaXMucm90YXRlKSB7XG4gICAgICBpZiAoc3RhcnRQYWdlID4gMSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c1BhZ2VTZXQgPSB0aGlzLm1ha2VQYWdlKHN0YXJ0UGFnZSAtIDEsICcuLi4nLCBmYWxzZSk7XG4gICAgICAgIHBhZ2VzLnVuc2hpZnQocHJldmlvdXNQYWdlU2V0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZFBhZ2UgPCB0b3RhbFBhZ2VzKSB7XG4gICAgICAgIGNvbnN0IG5leHRQYWdlU2V0ID0gdGhpcy5tYWtlUGFnZShlbmRQYWdlICsgMSwgJy4uLicsIGZhbHNlKTtcbiAgICAgICAgcGFnZXMucHVzaChuZXh0UGFnZVNldCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZ2VzO1xuICB9XG5cbiAgLy8gYmFzZSBjbGFzc1xuICBwcm90ZWN0ZWQgY2FsY3VsYXRlVG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIGNvbnN0IHRvdGFsUGFnZXMgPVxuICAgICAgdGhpcy5pdGVtc1BlclBhZ2UgPCAxXG4gICAgICAgID8gMVxuICAgICAgICA6IE1hdGguY2VpbCh0aGlzLnRvdGFsSXRlbXMgLyB0aGlzLml0ZW1zUGVyUGFnZSk7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgodG90YWxQYWdlcyB8fCAwLCAxKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyLFxuICBmb3J3YXJkUmVmLCBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgUGFnaW5hdGlvbkNvbmZpZyB9IGZyb20gJy4vcGFnaW5hdGlvbi5jb25maWcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhZ2VDaGFuZ2VkRXZlbnQge1xuICBpdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgcGFnZTogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgUEFHSU5BVElPTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gUGFnaW5hdGlvbkNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYWdpbmF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtQQUdJTkFUSU9OX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgY29uZmlnOiBhbnk7XG4gIC8qKiBpZiBgdHJ1ZWAgYWxpZ25zIGVhY2ggbGluayB0byB0aGUgc2lkZXMgb2YgcGFnZXIgKi9cbiAgQElucHV0KCkgYWxpZ246IGJvb2xlYW47XG4gIC8qKiBsaW1pdCBudW1iZXIgZm9yIHBhZ2UgbGlua3MgaW4gcGFnZXIgKi9cbiAgQElucHV0KCkgbWF4U2l6ZTogbnVtYmVyO1xuICAvKiogaWYgZmFsc2UgZmlyc3QgYW5kIGxhc3QgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBib3VuZGFyeUxpbmtzOiBib29sZWFuO1xuICAvKiogaWYgZmFsc2UgcHJldmlvdXMgYW5kIG5leHQgYnV0dG9ucyB3aWxsIGJlIGhpZGRlbiAqL1xuICBASW5wdXQoKSBkaXJlY3Rpb25MaW5rczogYm9vbGVhbjtcbiAgLy8gbGFiZWxzXG4gIC8qKiBmaXJzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBmaXJzdFRleHQ6IHN0cmluZztcbiAgLyoqIHByZXZpb3VzIGJ1dHRvbiB0ZXh0ICovXG4gIEBJbnB1dCgpIHByZXZpb3VzVGV4dDogc3RyaW5nO1xuICAvKiogbmV4dCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBuZXh0VGV4dDogc3RyaW5nO1xuICAvKiogbGFzdCBidXR0b24gdGV4dCAqL1xuICBASW5wdXQoKSBsYXN0VGV4dDogc3RyaW5nO1xuICAvKiogaWYgdHJ1ZSBjdXJyZW50IHBhZ2Ugd2lsbCBpbiB0aGUgbWlkZGxlIG9mIHBhZ2VzIGxpc3QgKi9cbiAgQElucHV0KCkgcm90YXRlOiBib29sZWFuO1xuICAvLyBjc3NcbiAgLyoqIGFkZCBjbGFzcyB0byA8Y29kZT48bGlcXD48L2NvZGU+Ki9cbiAgQElucHV0KCkgcGFnZUJ0bkNsYXNzOiBzdHJpbmc7XG5cbiAgLyoqIGlmIHRydWUgcGFnaW5hdGlvbiBjb21wb25lbnQgd2lsbCBiZSBkaXNhYmxlZCAqL1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAvKiogZmlyZWQgd2hlbiB0b3RhbCBwYWdlcyBjb3VudCBjaGFuZ2VzLCAkZXZlbnQ6bnVtYmVyIGVxdWFscyB0byB0b3RhbCBwYWdlcyBjb3VudCAqL1xuICBAT3V0cHV0KCkgbnVtUGFnZXM6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIC8qKiBmaXJlZCB3aGVuIHBhZ2Ugd2FzIGNoYW5nZWQsICRldmVudDp7cGFnZSwgaXRlbXNQZXJQYWdlfSBlcXVhbHMgdG8gb2JqZWN0XG4gICAqIHdpdGggY3VycmVudCBwYWdlIGluZGV4IGFuZCBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2VcbiAgICovXG4gIEBPdXRwdXQoKVxuICBwYWdlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8UGFnZUNoYW5nZWRFdmVudD4oKTtcblxuICAvKiogbWF4aW11bSBudW1iZXIgb2YgaXRlbXMgcGVyIHBhZ2UuIElmIHZhbHVlIGxlc3MgdGhhbiAxIHdpbGwgZGlzcGxheSBhbGwgaXRlbXMgb24gb25lIHBhZ2UgKi9cbiAgQElucHV0KClcbiAgZ2V0IGl0ZW1zUGVyUGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pdGVtc1BlclBhZ2U7XG4gIH1cblxuICBzZXQgaXRlbXNQZXJQYWdlKHY6IG51bWJlcikge1xuICAgIHRoaXMuX2l0ZW1zUGVyUGFnZSA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICAvKiogdG90YWwgbnVtYmVyIG9mIGl0ZW1zIGluIGFsbCBwYWdlcyAqL1xuICBASW5wdXQoKVxuICBnZXQgdG90YWxJdGVtcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbEl0ZW1zO1xuICB9XG5cbiAgc2V0IHRvdGFsSXRlbXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxJdGVtcyA9IHY7XG4gICAgdGhpcy50b3RhbFBhZ2VzID0gdGhpcy5jYWxjdWxhdGVUb3RhbFBhZ2VzKCk7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICB9XG5cbiAgc2V0IHRvdGFsUGFnZXModjogbnVtYmVyKSB7XG4gICAgdGhpcy5fdG90YWxQYWdlcyA9IHY7XG4gICAgdGhpcy5udW1QYWdlcy5lbWl0KHYpO1xuICAgIGlmICh0aGlzLmluaXRlZCkge1xuICAgICAgdGhpcy5zZWxlY3RQYWdlKHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgc2V0IHBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IF9wcmV2aW91cyA9IHRoaXMuX3BhZ2U7XG4gICAgdGhpcy5fcGFnZSA9IHZhbHVlID4gdGhpcy50b3RhbFBhZ2VzID8gdGhpcy50b3RhbFBhZ2VzIDogdmFsdWUgfHwgMTtcbiAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIGlmIChfcHJldmlvdXMgPT09IHRoaXMuX3BhZ2UgfHwgdHlwZW9mIF9wcmV2aW91cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhZ2VDaGFuZ2VkLmVtaXQoe1xuICAgICAgcGFnZTogdGhpcy5fcGFnZSxcbiAgICAgIGl0ZW1zUGVyUGFnZTogdGhpcy5pdGVtc1BlclBhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBwYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2U7XG4gIH1cblxuICBvbkNoYW5nZTogYW55ID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuICBvblRvdWNoZWQ6IGFueSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuICBjbGFzc01hcDogc3RyaW5nO1xuICBwYWdlczogYW55W107XG5cbiAgcHJvdGVjdGVkIF9pdGVtc1BlclBhZ2U6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF90b3RhbEl0ZW1zOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfdG90YWxQYWdlczogbnVtYmVyO1xuICBwcm90ZWN0ZWQgaW5pdGVkID0gZmFsc2U7XG4gIHByb3RlY3RlZCBfcGFnZSA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwYWdpbmF0aW9uQ29uZmlnOiBQYWdpbmF0aW9uQ29uZmlnLFxuICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICBpZiAoIXRoaXMuY29uZmlnKSB7XG4gICAgICB0aGlzLmNvbmZpZ3VyZU9wdGlvbnMocGFnaW5hdGlvbkNvbmZpZy5tYWluKTtcbiAgICB9XG4gIH1cblxuICBjb25maWd1cmVPcHRpb25zKGNvbmZpZzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmNsYXNzTWFwID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICAgIH1cbiAgICAvLyB3YXRjaCBmb3IgbWF4U2l6ZVxuICAgIHRoaXMubWF4U2l6ZSA9XG4gICAgICB0eXBlb2YgdGhpcy5tYXhTaXplICE9PSAndW5kZWZpbmVkJyA/IHRoaXMubWF4U2l6ZSA6IHRoaXMuY29uZmlnLm1heFNpemU7XG4gICAgdGhpcy5yb3RhdGUgPVxuICAgICAgdHlwZW9mIHRoaXMucm90YXRlICE9PSAndW5kZWZpbmVkJyA/IHRoaXMucm90YXRlIDogdGhpcy5jb25maWcucm90YXRlO1xuICAgIHRoaXMuYm91bmRhcnlMaW5rcyA9XG4gICAgICB0eXBlb2YgdGhpcy5ib3VuZGFyeUxpbmtzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMuYm91bmRhcnlMaW5rc1xuICAgICAgICA6IHRoaXMuY29uZmlnLmJvdW5kYXJ5TGlua3M7XG4gICAgdGhpcy5kaXJlY3Rpb25MaW5rcyA9XG4gICAgICB0eXBlb2YgdGhpcy5kaXJlY3Rpb25MaW5rcyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLmRpcmVjdGlvbkxpbmtzXG4gICAgICAgIDogdGhpcy5jb25maWcuZGlyZWN0aW9uTGlua3M7XG4gICAgdGhpcy5wYWdlQnRuQ2xhc3MgPVxuICAgICAgdHlwZW9mIHRoaXMucGFnZUJ0bkNsYXNzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IHRoaXMucGFnZUJ0bkNsYXNzXG4gICAgICAgIDogdGhpcy5jb25maWcucGFnZUJ0bkNsYXNzO1xuXG4gICAgLy8gYmFzZSBjbGFzc1xuICAgIHRoaXMuaXRlbXNQZXJQYWdlID1cbiAgICAgIHR5cGVvZiB0aGlzLml0ZW1zUGVyUGFnZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyB0aGlzLml0ZW1zUGVyUGFnZVxuICAgICAgICA6IHRoaXMuY29uZmlnLml0ZW1zUGVyUGFnZTtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsUGFnZXMoKTtcbiAgICAvLyB0aGlzIGNsYXNzXG4gICAgdGhpcy5wYWdlcyA9IHRoaXMuZ2V0UGFnZXModGhpcy5wYWdlLCB0aGlzLnRvdGFsUGFnZXMpO1xuICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMucGFnZSA9IHZhbHVlO1xuICAgIHRoaXMucGFnZXMgPSB0aGlzLmdldFBhZ2VzKHRoaXMucGFnZSwgdGhpcy50b3RhbFBhZ2VzKTtcbiAgfVxuXG4gIGdldFRleHQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAodGhpcyBhcyBhbnkpW2Ake2tleX1UZXh0YF0gfHwgdGhpcy5jb25maWdbYCR7a2V5fVRleHRgXTtcbiAgfVxuXG4gIG5vUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA9PT0gMTtcbiAgfVxuXG4gIG5vTmV4dCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlID09PSB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB7fSk6IHZvaWQge1xuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gIH1cblxuICBzZWxlY3RQYWdlKHBhZ2U6IG51bWJlciwgZXZlbnQ/OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGlmIChldmVudCAmJiBldmVudC50YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHRhcmdldC5ibHVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLndyaXRlVmFsdWUocGFnZSk7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucGFnZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ3JlYXRlIHBhZ2Ugb2JqZWN0IHVzZWQgaW4gdGVtcGxhdGVcbiAgcHJvdGVjdGVkIG1ha2VQYWdlKFxuICAgIG51bTogbnVtYmVyLFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBhY3RpdmU6IGJvb2xlYW5cbiAgKTogeyBudW1iZXI6IG51bWJlcjsgdGV4dDogc3RyaW5nOyBhY3RpdmU6IGJvb2xlYW4gfSB7XG4gICAgcmV0dXJuIHsgdGV4dCwgbnVtYmVyOiBudW0sIGFjdGl2ZSB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhZ2VzKGN1cnJlbnRQYWdlOiBudW1iZXIsIHRvdGFsUGFnZXM6IG51bWJlcik6IGFueVtdIHtcbiAgICBjb25zdCBwYWdlczogYW55W10gPSBbXTtcblxuICAgIC8vIERlZmF1bHQgcGFnZSBsaW1pdHNcbiAgICBsZXQgc3RhcnRQYWdlID0gMTtcbiAgICBsZXQgZW5kUGFnZSA9IHRvdGFsUGFnZXM7XG4gICAgY29uc3QgaXNNYXhTaXplZCA9XG4gICAgICB0eXBlb2YgdGhpcy5tYXhTaXplICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLm1heFNpemUgPCB0b3RhbFBhZ2VzO1xuXG4gICAgLy8gcmVjb21wdXRlIGlmIG1heFNpemVcbiAgICBpZiAoaXNNYXhTaXplZCkge1xuICAgICAgaWYgKHRoaXMucm90YXRlKSB7XG4gICAgICAgIC8vIEN1cnJlbnQgcGFnZSBpcyBkaXNwbGF5ZWQgaW4gdGhlIG1pZGRsZSBvZiB0aGUgdmlzaWJsZSBvbmVzXG4gICAgICAgIHN0YXJ0UGFnZSA9IE1hdGgubWF4KGN1cnJlbnRQYWdlIC0gTWF0aC5mbG9vcih0aGlzLm1heFNpemUgLyAyKSwgMSk7XG4gICAgICAgIGVuZFBhZ2UgPSBzdGFydFBhZ2UgKyB0aGlzLm1heFNpemUgLSAxO1xuXG4gICAgICAgIC8vIEFkanVzdCBpZiBsaW1pdCBpcyBleGNlZWRlZFxuICAgICAgICBpZiAoZW5kUGFnZSA+IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgICBlbmRQYWdlID0gdG90YWxQYWdlcztcbiAgICAgICAgICBzdGFydFBhZ2UgPSBlbmRQYWdlIC0gdGhpcy5tYXhTaXplICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVmlzaWJsZSBwYWdlcyBhcmUgcGFnaW5hdGVkIHdpdGggbWF4U2l6ZVxuICAgICAgICBzdGFydFBhZ2UgPVxuICAgICAgICAgIChNYXRoLmNlaWwoY3VycmVudFBhZ2UgLyB0aGlzLm1heFNpemUpIC0gMSkgKiB0aGlzLm1heFNpemUgKyAxO1xuXG4gICAgICAgIC8vIEFkanVzdCBsYXN0IHBhZ2UgaWYgbGltaXQgaXMgZXhjZWVkZWRcbiAgICAgICAgZW5kUGFnZSA9IE1hdGgubWluKHN0YXJ0UGFnZSArIHRoaXMubWF4U2l6ZSAtIDEsIHRvdGFsUGFnZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBwYWdlIG51bWJlciBsaW5rc1xuICAgIGZvciAobGV0IG51bSA9IHN0YXJ0UGFnZTsgbnVtIDw9IGVuZFBhZ2U7IG51bSsrKSB7XG4gICAgICBjb25zdCBwYWdlID0gdGhpcy5tYWtlUGFnZShudW0sIG51bS50b1N0cmluZygpLCBudW0gPT09IGN1cnJlbnRQYWdlKTtcbiAgICAgIHBhZ2VzLnB1c2gocGFnZSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGxpbmtzIHRvIG1vdmUgYmV0d2VlbiBwYWdlIHNldHNcbiAgICBpZiAoaXNNYXhTaXplZCAmJiAhdGhpcy5yb3RhdGUpIHtcbiAgICAgIGlmIChzdGFydFBhZ2UgPiAxKSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzUGFnZVNldCA9IHRoaXMubWFrZVBhZ2Uoc3RhcnRQYWdlIC0gMSwgJy4uLicsIGZhbHNlKTtcbiAgICAgICAgcGFnZXMudW5zaGlmdChwcmV2aW91c1BhZ2VTZXQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZW5kUGFnZSA8IHRvdGFsUGFnZXMpIHtcbiAgICAgICAgY29uc3QgbmV4dFBhZ2VTZXQgPSB0aGlzLm1ha2VQYWdlKGVuZFBhZ2UgKyAxLCAnLi4uJywgZmFsc2UpO1xuICAgICAgICBwYWdlcy5wdXNoKG5leHRQYWdlU2V0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZXM7XG4gIH1cblxuICAvLyBiYXNlIGNsYXNzXG4gIHByb3RlY3RlZCBjYWxjdWxhdGVUb3RhbFBhZ2VzKCk6IG51bWJlciB7XG4gICAgY29uc3QgdG90YWxQYWdlcyA9XG4gICAgICB0aGlzLml0ZW1zUGVyUGFnZSA8IDFcbiAgICAgICAgPyAxXG4gICAgICAgIDogTWF0aC5jZWlsKHRoaXMudG90YWxJdGVtcyAvIHRoaXMuaXRlbXNQZXJQYWdlKTtcblxuICAgIHJldHVybiBNYXRoLm1heCh0b3RhbFBhZ2VzIHx8IDAsIDEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2luYXRpb25Db25maWcgfSBmcm9tICcuL3BhZ2luYXRpb24uY29uZmlnJztcblxuaW1wb3J0IHsgUGFnZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQYWdlckNvbXBvbmVudCwgUGFnaW5hdGlvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQYWdlckNvbXBvbmVudCwgUGFnaW5hdGlvbkNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbk1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBQYWdpbmF0aW9uTW9kdWxlLCBwcm92aWRlcnM6IFtQYWdpbmF0aW9uQ29uZmlnXSB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQTs7Ozs7b0JBS2M7WUFDVixPQUFPLEVBQUUsS0FBSyxDQUFDO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsU0FBUyxFQUFFLE9BQU87WUFDbEIsWUFBWSxFQUFFLFVBQVU7WUFDeEIsUUFBUSxF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

/***/ }),

/***/ "./node_modules/ngx-bootstrap/popover/fesm5/ngx-bootstrap-popover.js":
/*!***************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/popover/fesm5/ngx-bootstrap-popover.js ***!
  \***************************************************************************/
/*! exports provided: PopoverDirective, PopoverModule, PopoverConfig, PopoverContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverDirective", function() { return PopoverDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverModule", function() { return PopoverModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverConfig", function() { return PopoverConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoverContainerComponent", function() { return PopoverContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/loader */ "./node_modules/ngx-bootstrap/loader/fesm5/ngx-bootstrap-loader.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap/positioning */ "./node_modules/ngx-bootstrap/positioning/fesm5/ngx-bootstrap-positioning.js");






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
var PopoverConfig = /** @class */ (function () {
    function PopoverConfig() {
        /**
         * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'click';
        this.outsideClick = false;
    }
    PopoverConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return PopoverConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PopoverContainerComponent = /** @class */ (function () {
    function PopoverContainerComponent(config) {
        Object.assign(this, config);
    }
    Object.defineProperty(PopoverContainerComponent.prototype, "isBs3", {
        get: /**
         * @return {?}
         */
        function () {
            return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    PopoverContainerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'popover-container',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    // tslint:disable-next-line
                    host: {
                        '[class]': '"popover in popover-" + placement + " " + "bs-popover-" + placement + " " + placement + " " + containerClass',
                        '[class.show]': '!isBs3',
                        role: 'tooltip',
                        style: 'display:block;'
                    },
                    template: "<div class=\"popover-arrow arrow\"></div>\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\n<div class=\"popover-content popover-body\">\n  <ng-content></ng-content>\n</div>\n",
                    styles: ["\n    :host.bs-popover-top .arrow, :host.bs-popover-bottom .arrow {\n      left: 50%;\n      margin-left: -8px;\n    }\n    :host.bs-popover-left .arrow, :host.bs-popover-right .arrow {\n      top: 50%;\n      margin-top: -8px;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    PopoverContainerComponent.ctorParameters = function () { return [
        { type: PopoverConfig, },
    ]; };
    PopoverContainerComponent.propDecorators = {
        "placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "title": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return PopoverContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A lightweight, extensible directive for fancy popover creation.
 */
var PopoverDirective = /** @class */ (function () {
    function PopoverDirective(_elementRef, _renderer, _viewContainerRef, _config, cis) {
        /**
         * Close popover on outside click
         */
        this.outsideClick = false;
        /**
         * Css class for popover container
         */
        this.containerClass = '';
        this._isInited = false;
        this._popover = cis
            .createLoader(_elementRef, _viewContainerRef, _renderer)
            .provide({ provide: PopoverConfig, useValue: _config });
        Object.assign(this, _config);
        this.onShown = this._popover.onShown;
        this.onHidden = this._popover.onHidden;
        // fix: no focus on button on Mac OS #1795
        if (typeof window !== 'undefined') {
            _elementRef.nativeElement.addEventListener('click', function () {
                try {
                    _elementRef.nativeElement.focus();
                }
                catch (/** @type {?} */ err) {
                    return;
                }
            });
        }
    }
    Object.defineProperty(PopoverDirective.prototype, "isOpen", {
        get: /**
         * Returns whether or not the popover is currently being shown
         * @return {?}
         */
        function () {
            return this._popover.isShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    PopoverDirective.prototype.show = /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    function () {
        if (this._popover.isShown || !this.popover) {
            return;
        }
        this._popover
            .attach(PopoverContainerComponent)
            .to(this.container)
            .position({ attachment: this.placement })
            .show({
            content: this.popover,
            context: this.popoverContext,
            placement: this.placement,
            title: this.popoverTitle,
            containerClass: this.containerClass
        });
        this.isOpen = true;
    };
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    PopoverDirective.prototype.hide = /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            this._popover.hide();
            this.isOpen = false;
        }
    };
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    PopoverDirective.prototype.toggle = /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    function () {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._popover.listen({
            triggers: this.triggers,
            outsideClick: this.outsideClick,
            show: function () { return _this.show(); }
        });
    };
    /**
     * @return {?}
     */
    PopoverDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._popover.dispose();
    };
    PopoverDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{ selector: '[popover]', exportAs: 'bs-popover' },] }
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], },
        { type: PopoverConfig, },
        { type: ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], },
    ]; };
    PopoverDirective.propDecorators = {
        "popover": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "popoverContext": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "popoverTitle": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "placement": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "outsideClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "triggers": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "container": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "containerClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isOpen": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onShown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onHidden": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return PopoverDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    /**
     * @return {?}
     */
    PopoverModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: PopoverModule,
            providers: [PopoverConfig, ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_4__["PositioningService"]]
        };
    };
    PopoverModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"]],
                    declarations: [PopoverDirective, PopoverContainerComponent],
                    exports: [PopoverDirective],
                    entryComponents: [PopoverContainerComponent]
                },] }
    ];
    return PopoverModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wb3BvdmVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtYm9vdHN0cmFwL3BvcG92ZXIvcG9wb3Zlci5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcG9wb3Zlci9wb3BvdmVyLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9wb3BvdmVyL3BvcG92ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIHNlcnZpY2UgZm9yIHRoZSBQb3BvdmVyIGRpcmVjdGl2ZS5cbiAqIFlvdSBjYW4gaW5qZWN0IHRoaXMgc2VydmljZSwgdHlwaWNhbGx5IGluIHlvdXIgcm9vdCBjb21wb25lbnQsIGFuZCBjdXN0b21pemVcbiAqIHRoZSB2YWx1ZXMgb2YgaXRzIHByb3BlcnRpZXMgaW4gb3JkZXIgdG8gcHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgYWxsIHRoZVxuICogcG9wb3ZlcnMgdXNlZCBpbiB0aGUgYXBwbGljYXRpb24uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29uZmlnIHtcbiAgLyoqXG4gICAqIFBsYWNlbWVudCBvZiBhIHBvcG92ZXIuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCIsIFwiYXV0b1wiXG4gICAqL1xuICBwbGFjZW1lbnQgPSAndG9wJztcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIHRyaWdnZXJzID0gJ2NsaWNrJztcblxuICBvdXRzaWRlQ2xpY2sgPSBmYWxzZTtcbiAgLyoqXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXG4gICAqIEN1cnJlbnRseSBvbmx5IHN1cHBvcnRzIFwiYm9keVwiLlxuICAgKi9cbiAgY29udGFpbmVyOiBzdHJpbmc7XG59XG4iLCJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncG9wb3Zlci1jb250YWluZXInLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzXSc6XG4gICAgICAnXCJwb3BvdmVyIGluIHBvcG92ZXItXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIFwiYnMtcG9wb3Zlci1cIiArIHBsYWNlbWVudCArIFwiIFwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBjb250YWluZXJDbGFzcycsXG4gICAgJ1tjbGFzcy5zaG93XSc6ICchaXNCczMnLFxuICAgIHJvbGU6ICd0b29sdGlwJyxcbiAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7J1xuICB9LFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3QuYnMtcG9wb3Zlci10b3AgLmFycm93LCA6aG9zdC5icy1wb3BvdmVyLWJvdHRvbSAuYXJyb3cge1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgbWFyZ2luLWxlZnQ6IC04cHg7XG4gICAgfVxuICAgIDpob3N0LmJzLXBvcG92ZXItbGVmdCAuYXJyb3csIDpob3N0LmJzLXBvcG92ZXItcmlnaHQgLmFycm93IHtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgbWFyZ2luLXRvcDogLThweDtcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXItY29udGFpbmVyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcGxhY2VtZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnRhaW5lckNsYXNzOiBzdHJpbmc7XG5cbiAgZ2V0IGlzQnMzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0JzMygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBQb3BvdmVyQ29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsXG4gIFJlbmRlcmVyMiwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnLi9wb3BvdmVyLmNvbmZpZyc7XG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXIsIENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2xvYWRlcic7XG5pbXBvcnQgeyBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wb3BvdmVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG4vKipcbiAqIEEgbGlnaHR3ZWlnaHQsIGV4dGVuc2libGUgZGlyZWN0aXZlIGZvciBmYW5jeSBwb3BvdmVyIGNyZWF0aW9uLlxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1twb3BvdmVyXScsIGV4cG9ydEFzOiAnYnMtcG9wb3Zlcid9KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBDb250ZW50IHRvIGJlIGRpc3BsYXllZCBhcyBwb3BvdmVyLlxuICAgKi9cbiAgQElucHV0KCkgcG9wb3Zlcjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgLyoqXG4gICAqIENvbnRleHQgdG8gYmUgdXNlZCBpZiBwb3BvdmVyIGlzIGEgdGVtcGxhdGUuXG4gICAqL1xuICBASW5wdXQoKSBwb3BvdmVyQ29udGV4dDogYW55O1xuICAvKipcbiAgICogVGl0bGUgb2YgYSBwb3BvdmVyLlxuICAgKi9cbiAgQElucHV0KCkgcG9wb3ZlclRpdGxlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBQbGFjZW1lbnQgb2YgYSBwb3BvdmVyLiBBY2NlcHRzOiBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqL1xuICBASW5wdXQoKSBwbGFjZW1lbnQ6ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnIHwgJ2F1dG8nO1xuICAvKipcbiAgICogQ2xvc2UgcG9wb3ZlciBvbiBvdXRzaWRlIGNsaWNrXG4gICAqL1xuICBASW5wdXQoKSBvdXRzaWRlQ2xpY2sgPSBmYWxzZTtcbiAgLyoqXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxuICAgKiBldmVudCBuYW1lcy5cbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxuICAgKiBDdXJyZW50bHkgb25seSBzdXBwb3J0cyBcImJvZHlcIi5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRhaW5lcjogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDc3MgY2xhc3MgZm9yIHBvcG92ZXIgY29udGFpbmVyXG4gICAqL1xuICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBwb3BvdmVyIGlzIGN1cnJlbnRseSBiZWluZyBzaG93blxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGlzT3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcG9wb3Zlci5pc1Nob3duO1xuICB9XG5cbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgb25TaG93bjogRXZlbnRFbWl0dGVyPGFueT47XG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCB3aGVuIHRoZSBwb3BvdmVyIGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG9uSGlkZGVuOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBwcml2YXRlIF9wb3BvdmVyOiBDb21wb25lbnRMb2FkZXI8UG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudD47XG4gIHByaXZhdGUgX2lzSW5pdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgX2NvbmZpZzogUG9wb3ZlckNvbmZpZyxcbiAgICAgICAgICAgICAgY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5KSB7XG4gICAgdGhpcy5fcG9wb3ZlciA9IGNpc1xuICAgICAgLmNyZWF0ZUxvYWRlcjxQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50PihcbiAgICAgICAgX2VsZW1lbnRSZWYsXG4gICAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBfcmVuZGVyZXJcbiAgICAgIClcbiAgICAgIC5wcm92aWRlKHtwcm92aWRlOiBQb3BvdmVyQ29uZmlnLCB1c2VWYWx1ZTogX2NvbmZpZ30pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgX2NvbmZpZyk7XG4gICAgdGhpcy5vblNob3duID0gdGhpcy5fcG9wb3Zlci5vblNob3duO1xuICAgIHRoaXMub25IaWRkZW4gPSB0aGlzLl9wb3BvdmVyLm9uSGlkZGVuO1xuXG4gICAgLy8gZml4OiBubyBmb2N1cyBvbiBidXR0b24gb24gTWFjIE9TICMxNzk1XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIF9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9wb3BvdmVyLmlzU2hvd24gfHwgIXRoaXMucG9wb3Zlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcG92ZXJcbiAgICAgIC5hdHRhY2goUG9wb3ZlckNvbnRhaW5lckNvbXBvbmVudClcbiAgICAgIC50byh0aGlzLmNvbnRhaW5lcilcbiAgICAgIC5wb3NpdGlvbih7YXR0YWNobWVudDogdGhpcy5wbGFjZW1lbnR9KVxuICAgICAgLnNob3coe1xuICAgICAgICBjb250ZW50OiB0aGlzLnBvcG92ZXIsXG4gICAgICAgIGNvbnRleHQ6IHRoaXMucG9wb3ZlckNvbnRleHQsXG4gICAgICAgIHBsYWNlbWVudDogdGhpcy5wbGFjZW1lbnQsXG4gICAgICAgIHRpdGxlOiB0aGlzLnBvcG92ZXJUaXRsZSxcbiAgICAgICAgY29udGFpbmVyQ2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3NcbiAgICAgIH0pO1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgYW4gZWxlbWVudMOiwoDCmXMgcG9wb3Zlci4gVGhpcyBpcyBjb25zaWRlcmVkIGEgw6LCgMKcbWFudWFsw6LCgMKdIHRyaWdnZXJpbmcgb2ZcbiAgICogdGhlIHBvcG92ZXIuXG4gICAqL1xuICBoaWRlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5fcG9wb3Zlci5oaWRlKCk7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTDosKAwplzIHBvcG92ZXIuIFRoaXMgaXMgY29uc2lkZXJlZCBhIMOiwoDCnG1hbnVhbMOiwoDCnSB0cmlnZ2VyaW5nIG9mXG4gICAqIHRoZSBwb3BvdmVyLlxuICAgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMuc2hvdygpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogYW55IHtcbiAgICAvLyBmaXg6IHNlZW1zIHRoZXJlIGFyZSBhbiBpc3N1ZSB3aXRoIGByb3V0ZXJMaW5rQWN0aXZlYFxuICAgIC8vIHdoaWNoIHJlc3VsdCBpbiBkdXBsaWNhdGVkIGNhbGwgbmdPbkluaXQgd2l0aG91dCBjYWxsIHRvIG5nT25EZXN0cm95XG4gICAgLy8gcmVhZCBtb3JlOiBodHRwczovL2dpdGh1Yi5jb20vdmFsb3Itc29mdHdhcmUvbmd4LWJvb3RzdHJhcC9pc3N1ZXMvMTg4NVxuICAgIGlmICh0aGlzLl9pc0luaXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9pc0luaXRlZCA9IHRydWU7XG5cbiAgICB0aGlzLl9wb3BvdmVyLmxpc3Rlbih7XG4gICAgICB0cmlnZ2VyczogdGhpcy50cmlnZ2VycyxcbiAgICAgIG91dHNpZGVDbGljazogdGhpcy5vdXRzaWRlQ2xpY2ssXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogYW55IHtcbiAgICB0aGlzLl9wb3BvdmVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2xvYWRlcic7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IFBvcG92ZXJDb25maWcgfSBmcm9tICcuL3BvcG92ZXIuY29uZmlnJztcbmltcG9ydCB7IFBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL3BvcG92ZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBvcG92ZXJDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3BvcG92ZXItY29udGFpbmVyLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtQb3BvdmVyRGlyZWN0aXZlLCBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1BvcG92ZXJEaXJlY3RpdmVdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQb3BvdmVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbUG9wb3ZlckNvbmZpZywgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSwgUG9zaXRpb25pbmdTZXJ2aWNlXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O3lCQWFjLEtBQUs7Ozs7O3dCQUtOLE9BQU87NEJBRUgsS0FBSzs7O2dCQVpyQixVQUFVOzt3QkFSWDs7Ozs7OztBQ0FBO0lBc0NFLG1DQUFZLE1BQXFCO1FBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdCO0lBTkQsc0JBQUksNENBQUs7Ozs7UUFBVDtZQUNFLE9BQU8sS0FBSyxFQUFFLENBQUM7U0FDaEI7OztPQUFBOztnQkFoQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztvQkFFL0MsSUFBSSxFQUFFO3dCQUNKLFNBQVMsRUFDUCw4R0FBOEc7d0JBQ2hILGNBQWMsRUFBRSxRQUFRO3dCQUN4QixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsZ0JBQWdCO3FCQUN4QjtvQkFhRCx1TkFBaUQ7NkJBWC9DLGdQQVNEO2lCQUdGOzs7O2dCQTNCUSxhQUFhOzs7OEJBNkJuQixLQUFLOzBCQUNMLEtBQUs7O29DQS9CUjs7Ozs7OztBQ0FBOzs7O0lBNkVFLDBCQUFZLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLGlCQUFtQyxFQUNuQyxPQUFzQixFQUN0QixHQUEyQjs7Ozs0QkFqRGYsS0FBSzs7Ozs4QkFlSCxFQUFFO3lCQTRCUixLQUFLO1FBT3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRzthQUNoQixZQUFZLENBQ1gsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixTQUFTLENBQ1Y7YUFDQSxPQUFPLENBQUMsRUFBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzs7UUFHdkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7WUFDakMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xELElBQUk7b0JBQ0YsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDbkM7Z0JBQUMsd0JBQU8sR0FBRyxFQUFFO29CQUNaLE9BQU87aUJBQ1I7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGOzBCQWxERyxvQ0FBTTs7Ozs7O1lBQ1IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQzs7Ozs7O1FBRy9CLFVBQVcsS0FBYztZQUN2QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtTQUNGOzs7Ozs7Ozs7Ozs7O0lBOENELCtCQUFJOzs7OztJQUFKO1FBQ0UsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDMUMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFFBQVE7YUFDVixNQUFNLENBQUMseUJBQXlCLENBQUM7YUFDakMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDbEIsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQzthQUN0QyxJQUFJLENBQUM7WUFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3BDLENBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7Ozs7Ozs7O0lBTUQsK0JBQUk7Ozs7O0lBQUo7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7Ozs7Ozs7SUFNRCxpQ0FBTTs7Ozs7SUFBTjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2I7Ozs7SUFFRCxtQ0FBUTs7O0lBQVI7UUFBQSxpQkFjQzs7OztRQVZDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLElBQUksRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLElBQUksRUFBRSxHQUFBO1NBQ3hCLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsc0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUN6Qjs7Z0JBOUpGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQzs7OztnQkFWN0MsVUFBVTtnQkFDckIsU0FBUztnQkFBZSxnQkFBZ0I7Z0JBRWpDLGFBQWE7Z0JBQ0ksc0JBQXNCOzs7NEJBVzdDLEtBQUs7bUNBSUwsS0FBSztpQ0FJTCxLQUFLOzhCQUlMLEtBQUs7aUNBSUwsS0FBSzs2QkFLTCxLQUFLOzhCQUtMLEtBQUs7bUNBS0wsS0FBSzsyQkFLTCxLQUFLOzRCQWdCTCxNQUFNOzZCQUlOLE1BQU07OzJCQXhFVDs7Ozs7OztBQ0FBOzs7Ozs7SUFnQlMscUJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxzQkFBc0IsRUFBRSxrQkFBa0IsQ0FBQztTQUN2RSxDQUFDO0tBQ0g7O2dCQVpGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLHlCQUF5QixDQUFDO29CQUMzRCxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztvQkFDM0IsZUFBZSxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQzdDOzt3QkFkRDs7Ozs7Ozs7Ozs7Ozs7OyJ9

/***/ }),

/***/ "./node_modules/ngx-bootstrap/progressbar/fesm5/ngx-bootstrap-progressbar.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/progressbar/fesm5/ngx-bootstrap-progressbar.js ***!
  \***********************************************************************************/
/*! exports provided: BarComponent, ProgressbarComponent, ProgressbarModule, ProgressbarConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarComponent", function() { return BarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarComponent", function() { return ProgressbarComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarModule", function() { return ProgressbarModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressbarConfig", function() { return ProgressbarConfig; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressbarConfig = /** @class */ (function () {
    function ProgressbarConfig() {
        /**
         * if `true` changing value of progress bar will be animated
         */
        this.animate = false;
        /**
         * maximum total value of progress element
         */
        this.max = 100;
    }
    ProgressbarConfig.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return ProgressbarConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressbarComponent = /** @class */ (function () {
    function ProgressbarComponent(config) {
        this.isStacked = false;
        this.addClass = true;
        this.bars = [];
        this._max = 100;
        Object.assign(this, config);
    }
    Object.defineProperty(ProgressbarComponent.prototype, "animate", {
        set: /**
         * if `true` changing value of progress bar will be animated
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._animate = value;
            this.bars.forEach(function (b) {
                b.animate = value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "striped", {
        set: /**
         * If `true`, striped classes are applied
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._striped = value;
            this.bars.forEach(function (b) {
                b.striped = value;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "value", {
        set: /**
         * current value of progress bar. Could be a number or array of objects
         * like {"value":15,"type":"info","label":"15 %"}
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.isStacked = Array.isArray(value);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "isBs3", {
        get: /**
         * @return {?}
         */
        function () {
            return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressbarComponent.prototype, "max", {
        get: /**
         * maximum total value of progress element
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._max = v;
            this.bars.forEach(function (bar) {
                bar.recalculatePercentage();
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} bar
     * @return {?}
     */
    ProgressbarComponent.prototype.addBar = /**
     * @param {?} bar
     * @return {?}
     */
    function (bar) {
        bar.animate = this._animate;
        bar.striped = this._striped;
        this.bars.push(bar);
    };
    /**
     * @param {?} bar
     * @return {?}
     */
    ProgressbarComponent.prototype.removeBar = /**
     * @param {?} bar
     * @return {?}
     */
    function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
    ProgressbarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'progressbar',
                    template: "<bar [type]=\"type\" [value]=\"_value\" *ngIf=\"!isStacked\">\n  <ng-content></ng-content>\n</bar>\n<ng-template [ngIf]=\"isStacked\">\n  <bar *ngFor=\"let item of _value\" [type]=\"item.type\" [value]=\"item.value\">{{ item.label }}</bar>\n</ng-template>\n",
                    styles: ["\n    :host {\n      width: 100%;\n      display: flex;\n    }\n  "]
                }] }
    ];
    /** @nocollapse */
    ProgressbarComponent.ctorParameters = function () { return [
        { type: ProgressbarConfig, },
    ]; };
    ProgressbarComponent.propDecorators = {
        "animate": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "striped": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "value": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "max": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['attr.max',] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "addClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['class.progress',] },],
    };
    return ProgressbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BarComponent = /** @class */ (function () {
    function BarComponent(progress) {
        this.percent = 0;
        this.progress = progress;
    }
    Object.defineProperty(BarComponent.prototype, "value", {
        get: /**
         * current value of progress bar
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (!v && v !== 0) {
                return;
            }
            this._value = v;
            this.recalculatePercentage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "setBarWidth", {
        get: /**
         * @return {?}
         */
        function () {
            this.recalculatePercentage();
            return this.percent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarComponent.prototype, "isBs3", {
        get: /**
         * @return {?}
         */
        function () {
            return Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.progress.addBar(this);
    };
    /**
     * @return {?}
     */
    BarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.progress.removeBar(this);
    };
    /**
     * @return {?}
     */
    BarComponent.prototype.recalculatePercentage = /**
     * @return {?}
     */
    function () {
        this.percent = +(this.value / this.progress.max * 100).toFixed(2);
        var /** @type {?} */ totalPercentage = this.progress.bars
            .reduce(function (total, bar) {
            return total + bar.percent;
        }, 0);
        if (totalPercentage > 100) {
            this.percent -= totalPercentage - 100;
        }
    };
    BarComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'bar',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class]': '"progress-bar " + (type ? "progress-bar-" + type + " bg-" + type : "")',
                        '[class.progress-bar-animated]': '!isBs3 && animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[class.active]': 'isBs3 && animate',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"'
                    }
                }] }
    ];
    /** @nocollapse */
    BarComponent.ctorParameters = function () { return [
        { type: ProgressbarComponent, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Host"] },] },
    ]; };
    BarComponent.propDecorators = {
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "value": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "setBarWidth": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostBinding"], args: ['style.width.%',] },],
    };
    return BarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressbarModule = /** @class */ (function () {
    function ProgressbarModule() {
    }
    /**
     * @return {?}
     */
    ProgressbarModule.forRoot = /**
     * @return {?}
     */
    function () {
        return { ngModule: ProgressbarModule, providers: [ProgressbarConfig] };
    };
    ProgressbarModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
                    declarations: [BarComponent, ProgressbarComponent],
                    exports: [BarComponent, ProgressbarComponent]
                },] }
    ];
    return ProgressbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1wcm9ncmVzc2Jhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb25maWcudHMiLCJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL3Byb2dyZXNzYmFyL2Jhci5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyQ29uZmlnIHtcbiAgLyoqIGlmIGB0cnVlYCBjaGFuZ2luZyB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgd2lsbCBiZSBhbmltYXRlZCAqL1xuICBhbmltYXRlOiBCb29sZWFuID0gZmFsc2U7XG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgbWF4ID0gMTAwO1xufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29uZmlnIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb25maWcnO1xuaW1wb3J0IHsgaXNCczMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Byb2dyZXNzYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzYmFyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2JhckNvbXBvbmVudCB7XG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKi9cbiAgQElucHV0KClcbiAgc2V0IGFuaW1hdGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9hbmltYXRlID0gdmFsdWU7XG4gICAgdGhpcy5iYXJzLmZvckVhY2goKGI6IEJhckNvbXBvbmVudCkgPT4ge1xuICAgICAgYi5hbmltYXRlID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cbiAgLyoqIElmIGB0cnVlYCwgc3RyaXBlZCBjbGFzc2VzIGFyZSBhcHBsaWVkICovXG4gIEBJbnB1dCgpXG4gIHNldCBzdHJpcGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc3RyaXBlZCA9IHZhbHVlO1xuICAgIHRoaXMuYmFycy5mb3JFYWNoKChiOiBCYXJDb21wb25lbnQpID0+IHtcbiAgICAgIGIuc3RyaXBlZCA9IHZhbHVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgLyoqIGN1cnJlbnQgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyLiBDb3VsZCBiZSBhIG51bWJlciBvciBhcnJheSBvZiBvYmplY3RzXG4gICAqIGxpa2Uge1widmFsdWVcIjoxNSxcInR5cGVcIjpcImluZm9cIixcImxhYmVsXCI6XCIxNSAlXCJ9XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IG51bWJlciB8IGFueVtdKSB7XG4gICAgdGhpcy5pc1N0YWNrZWQgPSBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICB9XG4gIGlzU3RhY2tlZCA9IGZhbHNlO1xuICBfc3RyaXBlZDogYm9vbGVhbjtcbiAgX2FuaW1hdGU6IGJvb2xlYW47XG4gIF92YWx1ZTogbnVtYmVyIHwgYW55W107XG4gIGdldCBpc0JzMygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNCczMoKTtcbiAgfVxuXG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLm1heCcpXG4gIEBJbnB1dCgpXG4gIGdldCBtYXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xuICB9XG5cbiAgc2V0IG1heCh2OiBudW1iZXIpIHtcbiAgICB0aGlzLl9tYXggPSB2O1xuICAgIHRoaXMuYmFycy5mb3JFYWNoKChiYXI6IEJhckNvbXBvbmVudCkgPT4ge1xuICAgICAgYmFyLnJlY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xuICAgIH0pO1xuICB9XG5cblxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucHJvZ3Jlc3MnKSBhZGRDbGFzcyA9IHRydWU7XG5cbiAgYmFyczogYW55W10gPSBbXTtcblxuICBwcm90ZWN0ZWQgX21heCA9IDEwMDtcblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFByb2dyZXNzYmFyQ29uZmlnKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG4gIGFkZEJhcihiYXI6IEJhckNvbXBvbmVudCk6IHZvaWQge1xuICAgIGJhci5hbmltYXRlID0gdGhpcy5fYW5pbWF0ZTtcbiAgICBiYXIuc3RyaXBlZCA9IHRoaXMuX3N0cmlwZWQ7XG5cbiAgICB0aGlzLmJhcnMucHVzaChiYXIpO1xuICB9XG5cbiAgcmVtb3ZlQmFyKGJhcjogQmFyQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5iYXJzLnNwbGljZSh0aGlzLmJhcnMuaW5kZXhPZihiYXIpLCAxKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0LFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IGlzQnMzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5cbi8vIHRvZG86IG51bWJlciBwaXBlXG4vLyB0b2RvOiB1c2UgcXVlcnkgZnJvbSBwcm9ncmVzcz9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXIuY29tcG9uZW50Lmh0bWwnLFxuICBob3N0OiB7XG4gICAgcm9sZTogJ3Byb2dyZXNzYmFyJyxcbiAgICAnYXJpYS12YWx1ZW1pbic6ICcwJyxcbiAgICAnW2NsYXNzXSc6ICdcInByb2dyZXNzLWJhciBcIiArICh0eXBlID8gXCJwcm9ncmVzcy1iYXItXCIgKyB0eXBlICsgXCIgYmctXCIgKyB0eXBlIDogXCJcIiknLFxuICAgICdbY2xhc3MucHJvZ3Jlc3MtYmFyLWFuaW1hdGVkXSc6ICchaXNCczMgJiYgYW5pbWF0ZScsXG4gICAgJ1tjbGFzcy5wcm9ncmVzcy1iYXItc3RyaXBlZF0nOiAnc3RyaXBlZCcsXG4gICAgJ1tjbGFzcy5hY3RpdmVdJzogJ2lzQnMzICYmIGFuaW1hdGUnLFxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICd2YWx1ZScsXG4gICAgJ1thdHRyLmFyaWEtdmFsdWV0ZXh0XSc6ICdwZXJjZW50ID8gcGVyY2VudC50b0ZpeGVkKDApICsgXCIlXCIgOiBcIlwiJyxcbiAgICAnW2F0dHIuYXJpYS12YWx1ZW1heF0nOiAnbWF4JyxcbiAgICAnW3N0eWxlLmhlaWdodC4lXSc6ICdcIjEwMFwiJ1xuICB9XG59KVxuZXhwb3J0IGNsYXNzIEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgbWF4OiBudW1iZXI7XG5cbiAgLyoqIHByb3ZpZGUgb25lIG9mIHRoZSBmb3VyIHN1cHBvcnRlZCBjb250ZXh0dWFsIGNsYXNzZXM6IGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AsIGBkYW5nZXJgICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKiogY3VycmVudCB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgKi9cbiAgQElucHV0KClcbiAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgc2V0IHZhbHVlKHY6IG51bWJlcikge1xuICAgIGlmICghdiAmJiB2ICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICB0aGlzLnJlY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aC4lJylcbiAgZ2V0IHNldEJhcldpZHRoKCkge1xuICAgIHRoaXMucmVjYWxjdWxhdGVQZXJjZW50YWdlKCk7XG5cbiAgICByZXR1cm4gdGhpcy5wZXJjZW50O1xuICB9XG5cbiAgZ2V0IGlzQnMzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0JzMygpO1xuICB9XG5cbiAgc3RyaXBlZDogYm9vbGVhbjtcbiAgYW5pbWF0ZTogYm9vbGVhbjtcbiAgcGVyY2VudCA9IDA7XG4gIHByb2dyZXNzOiBQcm9ncmVzc2JhckNvbXBvbmVudDtcblxuICBwcm90ZWN0ZWQgX3ZhbHVlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoQEhvc3QoKSBwcm9ncmVzczogUHJvZ3Jlc3NiYXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnByb2dyZXNzLmFkZEJhcih0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucHJvZ3Jlc3MucmVtb3ZlQmFyKHRoaXMpO1xuICB9XG5cbiAgcmVjYWxjdWxhdGVQZXJjZW50YWdlKCk6IHZvaWQge1xuICAgIHRoaXMucGVyY2VudCA9ICsodGhpcy52YWx1ZSAvIHRoaXMucHJvZ3Jlc3MubWF4ICogMTAwKS50b0ZpeGVkKDIpO1xuXG4gICAgY29uc3QgdG90YWxQZXJjZW50YWdlID0gdGhpcy5wcm9ncmVzcy5iYXJzXG4gICAgICAucmVkdWNlKGZ1bmN0aW9uICh0b3RhbDogbnVtYmVyLCBiYXI6IEJhckNvbXBvbmVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0b3RhbCArIGJhci5wZXJjZW50O1xuICAgICAgfSwgMCk7XG5cbiAgICBpZiAodG90YWxQZXJjZW50YWdlID4gMTAwKSB7XG4gICAgICB0aGlzLnBlcmNlbnQgLT0gdG90YWxQZXJjZW50YWdlIC0gMTAwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJhckNvbXBvbmVudCB9IGZyb20gJy4vYmFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9ncmVzc2JhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2dyZXNzYmFyQ29uZmlnIH0gZnJvbSAnLi9wcm9ncmVzc2Jhci5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbQmFyQ29tcG9uZW50LCBQcm9ncmVzc2JhckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCYXJDb21wb25lbnQsIFByb2dyZXNzYmFyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc2Jhck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7IG5nTW9kdWxlOiBQcm9ncmVzc2Jhck1vZHVsZSwgcHJvdmlkZXJzOiBbUHJvZ3Jlc3NiYXJDb25maWddIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozt1QkFLcUIsS0FBSzs7OzttQkFFbEIsR0FBRzs7O2dCQUxWLFVBQVU7OzRCQUZYOzs7Ozs7O0FDQUE7SUEyRUUsOEJBQVksTUFBeUI7eUJBOUJ6QixLQUFLO3dCQXdCeUIsSUFBSTtvQkFFaEMsRUFBRTtvQkFFQyxHQUFHO1FBR2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQzdCOzBCQXpERyx5Q0FBTzs7Ozs7O2tCQUFDLEtBQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFlO2dCQUNoQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUNuQixDQUFDLENBQUM7Ozs7OzBCQUlELHlDQUFPOzs7Ozs7a0JBQUMsS0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQWU7Z0JBQ2hDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ25CLENBQUMsQ0FBQzs7Ozs7MEJBU0QsdUNBQUs7Ozs7Ozs7a0JBQUMsS0FBcUI7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7OztJQU10QixzQkFBSSx1Q0FBSzs7OztRQUFUO1lBQ0UsT0FBTyxLQUFLLEVBQUUsQ0FBQztTQUNoQjs7O09BQUE7MEJBS0cscUNB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

/***/ }),

/***/ "./src/app/views/base/base-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/base-routing.module.ts ***!
  \***************************************************/
/*! exports provided: BaseRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseRoutingModule", function() { return BaseRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _cards_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards.component */ "./src/app/views/base/cards.component.ts");
/* harmony import */ var _forms_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forms.component */ "./src/app/views/base/forms.component.ts");
/* harmony import */ var _switches_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switches.component */ "./src/app/views/base/switches.component.ts");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tables.component */ "./src/app/views/base/tables.component.ts");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tabs.component */ "./src/app/views/base/tabs.component.ts");
/* harmony import */ var _carousels_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./carousels.component */ "./src/app/views/base/carousels.component.ts");
/* harmony import */ var _collapses_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapses.component */ "./src/app/views/base/collapses.component.ts");
/* harmony import */ var _paginations_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./paginations.component */ "./src/app/views/base/paginations.component.ts");
/* harmony import */ var _popovers_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./popovers.component */ "./src/app/views/base/popovers.component.ts");
/* harmony import */ var _progress_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./progress.component */ "./src/app/views/base/progress.component.ts");
/* harmony import */ var _tooltips_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tooltips.component */ "./src/app/views/base/tooltips.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var routes = [
    {
        path: '',
        data: {
            title: 'Base'
        },
        children: [
            {
                path: 'cards',
                component: _cards_component__WEBPACK_IMPORTED_MODULE_2__["CardsComponent"],
                data: {
                    title: 'Cards'
                }
            },
            {
                path: 'forms',
                component: _forms_component__WEBPACK_IMPORTED_MODULE_3__["FormsComponent"],
                data: {
                    title: 'Forms'
                }
            },
            {
                path: 'switches',
                component: _switches_component__WEBPACK_IMPORTED_MODULE_4__["SwitchesComponent"],
                data: {
                    title: 'Switches'
                }
            },
            {
                path: 'tables',
                component: _tables_component__WEBPACK_IMPORTED_MODULE_5__["TablesComponent"],
                data: {
                    title: 'Tables'
                }
            },
            {
                path: 'tabs',
                component: _tabs_component__WEBPACK_IMPORTED_MODULE_6__["TabsComponent"],
                data: {
                    title: 'Tabs'
                }
            },
            {
                path: 'carousels',
                component: _carousels_component__WEBPACK_IMPORTED_MODULE_7__["CarouselsComponent"],
                data: {
                    title: 'Carousels'
                }
            },
            {
                path: 'collapses',
                component: _collapses_component__WEBPACK_IMPORTED_MODULE_8__["CollapsesComponent"],
                data: {
                    title: 'Collapses'
                }
            },
            {
                path: 'paginations',
                component: _paginations_component__WEBPACK_IMPORTED_MODULE_9__["PaginationsComponent"],
                data: {
                    title: 'Pagination'
                }
            },
            {
                path: 'popovers',
                component: _popovers_component__WEBPACK_IMPORTED_MODULE_10__["PopoversComponent"],
                data: {
                    title: 'Popover'
                }
            },
            {
                path: 'progress',
                component: _progress_component__WEBPACK_IMPORTED_MODULE_11__["ProgressComponent"],
                data: {
                    title: 'Progress'
                }
            },
            {
                path: 'tooltips',
                component: _tooltips_component__WEBPACK_IMPORTED_MODULE_12__["TooltipsComponent"],
                data: {
                    title: 'Tooltips'
                }
            }
        ]
    }
];
var BaseRoutingModule = /** @class */ (function () {
    function BaseRoutingModule() {
    }
    BaseRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], BaseRoutingModule);
    return BaseRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/base/base.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/base/base.module.ts ***!
  \*******************************************/
/*! exports provided: BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return BaseModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _cards_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards.component */ "./src/app/views/base/cards.component.ts");
/* harmony import */ var _forms_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forms.component */ "./src/app/views/base/forms.component.ts");
/* harmony import */ var _switches_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./switches.component */ "./src/app/views/base/switches.component.ts");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tables.component */ "./src/app/views/base/tables.component.ts");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "./node_modules/ngx-bootstrap/tabs/fesm5/ngx-bootstrap-tabs.js");
/* harmony import */ var _tabs_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tabs.component */ "./src/app/views/base/tabs.component.ts");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js");
/* harmony import */ var _carousels_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./carousels.component */ "./src/app/views/base/carousels.component.ts");
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/collapse */ "./node_modules/ngx-bootstrap/collapse/fesm5/ngx-bootstrap-collapse.js");
/* harmony import */ var _collapses_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./collapses.component */ "./src/app/views/base/collapses.component.ts");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm5/ngx-bootstrap-dropdown.js");
/* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/pagination */ "./node_modules/ngx-bootstrap/pagination/fesm5/ngx-bootstrap-pagination.js");
/* harmony import */ var _popovers_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./popovers.component */ "./src/app/views/base/popovers.component.ts");
/* harmony import */ var ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-bootstrap/popover */ "./node_modules/ngx-bootstrap/popover/fesm5/ngx-bootstrap-popover.js");
/* harmony import */ var _paginations_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./paginations.component */ "./src/app/views/base/paginations.component.ts");
/* harmony import */ var ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-bootstrap/progressbar */ "./node_modules/ngx-bootstrap/progressbar/fesm5/ngx-bootstrap-progressbar.js");
/* harmony import */ var _progress_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./progress.component */ "./src/app/views/base/progress.component.ts");
/* harmony import */ var ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-bootstrap/tooltip */ "./node_modules/ngx-bootstrap/tooltip/fesm5/ngx-bootstrap-tooltip.js");
/* harmony import */ var _tooltips_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./tooltips.component */ "./src/app/views/base/tooltips.component.ts");
/* harmony import */ var _base_routing_module__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./base-routing.module */ "./src/app/views/base/base-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular




// Forms Component



// Tabs Component


// Carousel Component


// Collapse Component


// Dropdowns Component

// Pagination Component


// Popover Component


// Progress Component


// Tooltip Component


// Components Routing

var BaseModule = /** @class */ (function () {
    function BaseModule() {
    }
    BaseModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                _base_routing_module__WEBPACK_IMPORTED_MODULE_22__["BaseRoutingModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__["BsDropdownModule"].forRoot(),
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_7__["TabsModule"],
                ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_9__["CarouselModule"].forRoot(),
                ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_11__["CollapseModule"].forRoot(),
                ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_14__["PaginationModule"].forRoot(),
                ngx_bootstrap_popover__WEBPACK_IMPORTED_MODULE_16__["PopoverModule"].forRoot(),
                ngx_bootstrap_progressbar__WEBPACK_IMPORTED_MODULE_18__["ProgressbarModule"].forRoot(),
                ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_20__["TooltipModule"].forRoot()
            ],
            declarations: [
                _cards_component__WEBPACK_IMPORTED_MODULE_3__["CardsComponent"],
                _forms_component__WEBPACK_IMPORTED_MODULE_4__["FormsComponent"],
                _switches_component__WEBPACK_IMPORTED_MODULE_5__["SwitchesComponent"],
                _tables_component__WEBPACK_IMPORTED_MODULE_6__["TablesComponent"],
                _tabs_component__WEBPACK_IMPORTED_MODULE_8__["TabsComponent"],
                _carousels_component__WEBPACK_IMPORTED_MODULE_10__["CarouselsComponent"],
                _collapses_component__WEBPACK_IMPORTED_MODULE_12__["CollapsesComponent"],
                _paginations_component__WEBPACK_IMPORTED_MODULE_17__["PaginationsComponent"],
                _popovers_component__WEBPACK_IMPORTED_MODULE_15__["PopoversComponent"],
                _progress_component__WEBPACK_IMPORTED_MODULE_19__["ProgressComponent"],
                _tooltips_component__WEBPACK_IMPORTED_MODULE_21__["TooltipsComponent"]
            ]
        })
    ], BaseModule);
    return BaseModule;
}());



/***/ }),

/***/ "./src/app/views/base/cards.component.html":
/*!*************************************************!*\
  !*** ./src/app/views/base/cards.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n        <div class=\"card-footer\">Card footer</div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-check\"></i>Card with icon\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with switch\r\n          <label class=\"switch switch-sm switch-text switch-info float-right mb-0\">\r\n            <input type=\"checkbox\" class=\"switch-input\">\r\n            <span class=\"switch-label\" data-on=\"On\" data-off=\"Off\"></span>\r\n            <span class=\"switch-handle\"></span>\r\n          </label>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with label\r\n          <span class=\"badge badge-success float-right\">Success</span>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Card with label\r\n          <span class=\"badge badge-pill badge-danger float-right\">42</span>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-primary\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-secondary\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-success\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-info\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-warning\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card border-danger\">\r\n        <div class=\"card-header\">\r\n          Card outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-primary\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-secondary\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-success\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-info\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-warning\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card card-accent-danger\">\r\n        <div class=\"card-header\">\r\n          Card with accent\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-success text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-info text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-warning text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-danger text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary text-center\">\r\n        <div class=\"card-body\">\r\n          <blockquote class=\"card-bodyquote\">\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>\r\n            <footer>Someone famous in\r\n              <cite title=\"Source Title\">Source Title</cite>\r\n            </footer>\r\n          </blockquote>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-primary\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-success\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6 col-md-4\">\r\n      <div class=\"card text-white bg-danger\">\r\n        <div class=\"card-header\">\r\n          Card title\r\n        </div>\r\n        <div class=\"card-body\">\r\n          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/cards.component.ts":
/*!***********************************************!*\
  !*** ./src/app/views/base/cards.component.ts ***!
  \***********************************************/
/*! exports provided: CardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardsComponent", function() { return CardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CardsComponent = /** @class */ (function () {
    function CardsComponent() {
    }
    CardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./cards.component.html */ "./src/app/views/base/cards.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], CardsComponent);
    return CardsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/carousels.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/base/carousels.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Bootstrap Carousel\r\n          <div class=\"card-header-actions\">\r\n            <a href=\"https://valor-software.com/ngx-bootstrap/#/carousel\" target=\"_blank\">\r\n              <small className=\"text-muted\">docs</small>\r\n            </a>\r\n          </div>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"3000\">\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/mountains?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> optional captions</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"4500\">\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/nature?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>First slide label</h3>\r\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/nature?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Second slide label</h3>\r\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/nature?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Third slide label</h3>\r\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> configuring defaults</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/city?lock=1\" alt=\"First slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>First slide label</h3>\r\n                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/city?lock=2\" alt=\"Second slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Second slide label</h3>\r\n                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\r\n              </div>\r\n            </slide>\r\n            <slide>\r\n              <img src=\"https://loremflickr.com/900/500/city?lock=3\" alt=\"Third slide\" style=\"display: block; width: 100%;\">\r\n              <div class=\"carousel-caption d-none d-md-block\">\r\n                <h3>Third slide label</h3>\r\n                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Carousel\r\n          <small> dynamic slides</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <carousel [interval]=\"myInterval\" [noWrap]=\"noWrapSlides\" [(activeSlide)]=\"activeSlideIndex\">\r\n            <slide *ngFor=\"let slide of slides; let index=index\">\r\n              <img [src]=\"slide.image\" alt=\"image slide\" style=\"display: block; width: 100%;\">\r\n\r\n              <div class=\"carousel-caption\">\r\n                <h4>Slide {{index}}</h4>\r\n                <p>{{slide.text}}</p>\r\n              </div>\r\n            </slide>\r\n          </carousel>\r\n          <br/>\r\n          <div>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"addSlide()\">Add Slide\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"removeSlide()\">Remove Current\r\n            </button>\r\n            <button type=\"button\" class=\"btn btn-info\"\r\n                    (click)=\"removeSlide(2)\">Remove #3\r\n            </button>\r\n          </div>\r\n          <div>\r\n            <div class=\"checkbox\">\r\n              <label><input type=\"checkbox\" [(ngModel)]=\"noWrapSlides\">Disable Slide Looping</label>\r\n            </div>\r\n\r\n            <span>Interval, in milliseconds (Enter a negative number or 0 to stop the interval.): </span>\r\n            <input type=\"number\" class=\"form-control\" [(ngModel)]=\"myInterval\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/carousels.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/carousels.component.ts ***!
  \***************************************************/
/*! exports provided: CarouselsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselsComponent", function() { return CarouselsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/carousel */ "./node_modules/ngx-bootstrap/carousel/fesm5/ngx-bootstrap-carousel.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarouselsComponent = /** @class */ (function () {
    function CarouselsComponent() {
        this.myInterval = 6000;
        this.slides = [];
        this.activeSlideIndex = 0;
        this.noWrapSlides = false;
        for (var i = 0; i < 4; i++) {
            this.addSlide();
        }
    }
    CarouselsComponent.prototype.addSlide = function () {
        this.slides.push({
            image: "https://loremflickr.com/900/500/sailing?random=" + (this.slides.length % 8 + 1) + "/"
        });
    };
    CarouselsComponent.prototype.removeSlide = function (index) {
        var toRemove = index ? index : this.activeSlideIndex;
        this.slides.splice(toRemove, 1);
    };
    CarouselsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./carousels.component.html */ "./src/app/views/base/carousels.component.html"),
            providers: [
                { provide: ngx_bootstrap_carousel__WEBPACK_IMPORTED_MODULE_1__["CarouselConfig"], useValue: { interval: 1500, noPause: true } }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], CarouselsComponent);
    return CarouselsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/collapses.component.html":
/*!*****************************************************!*\
  !*** ./src/app/views/base/collapses.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n        <button type=\"button\" class=\"btn btn-primary\"\r\n        (click)=\"isCollapsed = !isCollapsed\">\r\n      Bootstrap Collapse\r\n    </button>\r\n      \r\n    </div>\r\n    <div class=\"card-body\"\r\n         (collapsed)=\"collapsed($event)\"\r\n         (expanded)=\"expanded($event)\"\r\n         [collapse]=\"isCollapsed\">\r\n      <p>\r\n        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo\r\n        consequat.\r\n      </p>\r\n    </div>\r\n    \r\n  </div>\r\n\r\n"

/***/ }),

/***/ "./src/app/views/base/collapses.component.ts":
/*!***************************************************!*\
  !*** ./src/app/views/base/collapses.component.ts ***!
  \***************************************************/
/*! exports provided: CollapsesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapsesComponent", function() { return CollapsesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CollapsesComponent = /** @class */ (function () {
    function CollapsesComponent() {
        this.isCollapsed = false;
    }
    CollapsesComponent.prototype.collapsed = function (event) {
        // console.log(event);
    };
    CollapsesComponent.prototype.expanded = function (event) {
        // console.log(event);
    };
    CollapsesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./collapses.component.html */ "./src/app/views/base/collapses.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], CollapsesComponent);
    return CollapsesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/forms.component.html":
/*!*************************************************!*\
  !*** ./src/app/views/base/forms.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Credit Card</strong>\r\n          <small>Form</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label for=\"name\">Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Enter your name\">\r\n              </div>\r\n            </div>\r\n          </div><!--/.row-->\r\n          <div class=\"row\">\r\n            <div class=\"col-sm-12\">\r\n              <div class=\"form-group\">\r\n                <label for=\"ccnumber\">Credit Card Number</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"ccnumber\" placeholder=\"0000 0000 0000 0000\">\r\n              </div>\r\n            </div>\r\n          </div><!--/.row-->\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-sm-4\">\r\n              <label for=\"ccmonth\">Month</label>\r\n              <select class=\"form-control\" id=\"ccmonth\">\r\n                <option>1</option>\r\n                <option>2</option>\r\n                <option>3</option>\r\n                <option>4</option>\r\n                <option>5</option>\r\n                <option>6</option>\r\n                <option>7</option>\r\n                <option>8</option>\r\n                <option>9</option>\r\n                <option>10</option>\r\n                <option>11</option>\r\n                <option>12</option>\r\n              </select>\r\n            </div>\r\n            <div class=\"form-group col-sm-4\">\r\n              <label for=\"ccyear\">Year</label>\r\n              <select class=\"form-control\" id=\"ccyear\">\r\n                <option>2014</option>\r\n                <option>2015</option>\r\n                <option>2016</option>\r\n                <option>2017</option>\r\n                <option>2018</option>\r\n                <option>2019</option>\r\n                <option>2020</option>\r\n                <option>2021</option>\r\n                <option>2022</option>\r\n                <option>2023</option>\r\n                <option>2024</option>\r\n                <option>2025</option>\r\n              </select>\r\n            </div>\r\n            <div class=\"col-sm-4\">\r\n              <div class=\"form-group\">\r\n                <label for=\"cvv\">CVV/CVC</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"cvv\" placeholder=\"123\">\r\n              </div>\r\n            </div>\r\n          </div><!--/.row-->\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Company</strong>\r\n          <small>Form</small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div class=\"form-group\">\r\n            <label for=\"company\">Company</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"company\" placeholder=\"Enter your company name\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"vat\">VAT</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"vat\" placeholder=\"PL1234567890\">\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label for=\"street\">Street</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"street\" placeholder=\"Enter street name\">\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"form-group col-sm-8\">\r\n              <label for=\"city\">City</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"city\" placeholder=\"Enter your city\">\r\n            </div>\r\n            <div class=\"form-group col-sm-4\">\r\n              <label for=\"postal-code\">Postal Code</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"postal-code\" placeholder=\"Postal Code\">\r\n            </div>\r\n          </div><!--/.row-->\r\n          <div class=\"form-group\">\r\n            <label for=\"country\">Country</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"country\" placeholder=\"Country name\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Basic Form</strong> Elements\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" enctype=\"multipart/form-data\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\">Static</label>\r\n              <div class=\"col-md-9\">\r\n                <p class=\"form-control-static\">Username</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"text-input\">Text Input</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"text\" id=\"text-input\" name=\"text-input\" class=\"form-control\" placeholder=\"Text\">\r\n                <span class=\"help-block\">This is a help text</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"email-input\">Email Input</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"email\" id=\"email-input\" name=\"email-input\" class=\"form-control\" placeholder=\"Enter Email\" autocomplete=\"email\">\r\n                <span class=\"help-block\">Please enter your email</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"password-input\">Password</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"password\" id=\"password-input\" name=\"password-input\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\r\n                <span class=\"help-block\">Please enter a complex password</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"disabled-input\">Disabled Input</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"text\" id=\"disabled-input\" name=\"disabled-input\" class=\"form-control\" placeholder=\"Disabled\" disabled>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"textarea-input\">Textarea</label>\r\n              <div class=\"col-md-9\">\r\n                <textarea id=\"textarea-input\" name=\"textarea-input\" rows=\"9\" class=\"form-control\" placeholder=\"Content..\"></textarea>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"select1\">Select</label>\r\n              <div class=\"col-md-9\">\r\n                <select id=\"select1\" name=\"select1\" class=\"form-control\">\r\n                  <option value=\"0\">Please select</option>\r\n                  <option value=\"1\">Option #1</option>\r\n                  <option value=\"2\">Option #2</option>\r\n                  <option value=\"3\">Option #3</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"select2\">Select Large</label>\r\n              <div class=\"col-md-9\">\r\n                <select id=\"select2\" name=\"select2\" class=\"form-control form-control-lg\">\r\n                  <option value=\"0\">Please select</option>\r\n                  <option value=\"1\">Option #1</option>\r\n                  <option value=\"2\">Option #2</option>\r\n                  <option value=\"3\">Option #3</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"select3\">Select Small</label>\r\n              <div class=\"col-md-9\">\r\n                <select id=\"select3\" name=\"select3\" class=\"form-control form-control-sm\">\r\n                  <option value=\"0\">Please select</option>\r\n                  <option value=\"1\">Option #1</option>\r\n                  <option value=\"2\">Option #2</option>\r\n                  <option value=\"3\">Option #3</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"disabledSelect\">Disabled Select</label>\r\n              <div class=\"col-md-9\">\r\n                <select id=\"disabledSelect\" class=\"form-control\" disabled>\r\n                  <option value=\"0\">Please select</option>\r\n                  <option value=\"1\">Option #1</option>\r\n                  <option value=\"2\">Option #2</option>\r\n                  <option value=\"3\">Option #3</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"multiple-select\">Multiple select</label>\r\n              <div class=\"col-md-9\">\r\n                <select id=\"multiple-select\" name=\"multiple-select\" class=\"form-control\" size=\"5\" multiple>\r\n                  <option value=\"1\">Option #1</option>\r\n                  <option value=\"2\">Option #2</option>\r\n                  <option value=\"3\">Option #3</option>\r\n                  <option value=\"4\">Option #4</option>\r\n                  <option value=\"5\">Option #5</option>\r\n                  <option value=\"6\">Option #6</option>\r\n                  <option value=\"7\">Option #7</option>\r\n                  <option value=\"8\">Option #8</option>\r\n                  <option value=\"9\">Option #9</option>\r\n                  <option value=\"10\">Option #10</option>\r\n                </select>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" >Radios</label>\r\n              <div class=\"col-md-9 col-form-label\">\r\n                <div class=\"form-check\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio1\" value=\"option1\" checked>\r\n                  <label class=\"form-check-label\" for=\"radio1\">\r\n                    Option 1\r\n                  </label>\r\n                </div>\r\n                <div class=\"form-check\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio2\" value=\"option2\">\r\n                  <label class=\"form-check-label\" for=\"radio2\">\r\n                    Option 2\r\n                  </label>\r\n                </div>\r\n                <div class=\"form-check\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"radios\" id=\"radio3\" value=\"option3\">\r\n                  <label class=\"form-check-label\" for=\"radio3\">\r\n                    Option 3\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"inline-radios\">Inline Radios</label>\r\n              <div class=\"col-md-9 col-form-label\">\r\n                <div class=\"form-check form-check-inline mr-1\" id=\"inline-radios\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio1\" value=\"option1\">\r\n                  <label class=\"form-check-label\" for=\"inlineRadio1\">One</label>\r\n                </div>\r\n                <div class=\"form-check form-check-inline mr-1\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio2\" value=\"option2\">\r\n                  <label class=\"form-check-label\" for=\"inlineRadio2\">Two</label>\r\n                </div>\r\n                <div class=\"form-check form-check-inline mr-1\">\r\n                  <input class=\"form-check-input\" type=\"radio\" name=\"inline-radios\" id=\"inlineRadio3\" value=\"option3\">\r\n                  <label class=\"form-check-label\" for=\"inlineRadio3\">Three</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\">Checkboxes</label>\r\n              <div class=\"col-md-9 col-form-label\">\r\n                <div class=\"form-check\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox1\">\r\n                  <label class=\"form-check-label\" for=\"checkbox1\">\r\n                    Option 1\r\n                  </label>\r\n                </div>\r\n                <div class=\"form-check\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox2\">\r\n                  <label class=\"form-check-label\" for=\"checkbox2\">\r\n                    Option 2\r\n                  </label>\r\n                </div>\r\n                <div class=\"form-check checkbox\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" value=\"option1\" id=\"checkbox3\">\r\n                  <label class=\"form-check-label\" for=\"checkbox3\">\r\n                    Option 3\r\n                  </label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\">Inline Checkboxes</label>\r\n              <div class=\"col-md-9 col-form-label\">\r\n                <div class=\"form-check form-check-inline mr-1\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox1\" value=\"option1\">\r\n                  <label class=\"form-check-label\" for=\"inline-checkbox1\">One</label>\r\n                </div>\r\n                <div class=\"form-check form-check-inline mr-1\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox2\" value=\"option2\">\r\n                  <label class=\"form-check-label\" for=\"inline-checkbox2\">Two</label>\r\n                </div>\r\n                <div class=\"form-check form-check-inline mr-1\">\r\n                  <input class=\"form-check-input\" type=\"checkbox\" id=\"inline-checkbox3\" value=\"option3\">\r\n                  <label class=\"form-check-label\" for=\"inline-checkbox3\">Three</label>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"file-input\">File input</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"file\" id=\"file-input\" name=\"file-input\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"file-multiple-input\">Multiple File input</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"file\" id=\"file-multiple-input\" name=\"file-multiple-input\" multiple>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Inline</strong> Form\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-inline\">\r\n            <div class=\"form-group\">\r\n              <label class=\"sr-only\" for=\"if-email\">Email</label>\r\n              <input type=\"email\" id=\"if-email\" name=\"if-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label class=\"sr-only\" for=\"if-password\">Password</label>\r\n              <input type=\"password\" id=\"if-password\" name=\"if-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Horizontal</strong> Form\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"hf-email\">Email</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"email\" id=\"hf-email\" name=\"hf-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\r\n                <span class=\"help-block\">Please enter your email</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-md-3 col-form-label\" for=\"hf-password\">Password</label>\r\n              <div class=\"col-md-9\">\r\n                <input type=\"password\" id=\"hf-password\" name=\"hf-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\r\n                <span class=\"help-block\">Please enter your password</span>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Normal</strong> Form\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\">\r\n            <div class=\"form-group\">\r\n              <label for=\"nf-email\">Email</label>\r\n              <input type=\"email\" id=\"nf-email\" name=\"nf-email\" class=\"form-control\" placeholder=\"Enter Email..\" autocomplete=\"email\">\r\n              <span class=\"help-block\">Please enter your email</span>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label for=\"nf-password\">Password</label>\r\n              <input type=\"password\" id=\"nf-password\" name=\"nf-password\" class=\"form-control\" placeholder=\"Enter Password..\" autocomplete=\"current-password\">\r\n              <span class=\"help-block\">Please enter your password</span>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Input\r\n          <strong>Grid</strong>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-3\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-3\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-4\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-4\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-5\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-5\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-6\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-6\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-7\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-7\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-8\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-8\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-9\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-9\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-10\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-10\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-11\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-11\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-sm-12\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-sm-12\">\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-user\"></i> Login</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Input\r\n          <strong>Sizes</strong>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-sm-5 col-form-label\" for=\"input-small\">Small Input</label>\r\n              <div class=\"col-sm-6\">\r\n                <input type=\"text\" id=\"input-small\" name=\"input-small\" class=\"form-control form-control-sm\" placeholder=\".form-control-sm\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-sm-5 col-form-label\" for=\"input-normal\">Normal Input</label>\r\n              <div class=\"col-sm-6\">\r\n                <input type=\"text\" id=\"input-normal\" name=\"input-normal\" class=\"form-control\" placeholder=\"Normal\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <label class=\"col-sm-5 col-form-label\" for=\"input-large\">Large Input</label>\r\n              <div class=\"col-sm-6\">\r\n                <input type=\"text\" id=\"input-large\" name=\"input-large\" class=\"form-control form-control-lg\" placeholder=\".form-control-lg\">\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Validation states</strong> Form\r\n        </div>\r\n        <form>\r\n          <div class=\"card-body\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-col-form-label\" for=\"inputSuccess1\">Input with success</label>\r\n              <input type=\"text\" class=\"form-control is-valid\" id=\"inputSuccess1\">\r\n              <div class=\"valid-feedback\">\r\n                Input is valid.\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label class=\"form-col-form-label\" for=\"inputError1\">Input with error</label>\r\n              <input type=\"text\" class=\"form-control is-invalid\" id=\"inputError1\">\r\n              <div class=\"invalid-feedback\">\r\n                Please provide a valid information.\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-sm-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Validation </strong> <code>was-validated</code>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form class=\"was-validated\">\r\n            <div class=\"form-group\">\r\n              <label class=\"form-col-form-label\" for=\"inputSuccess2\">Input is valid</label>\r\n              <input type=\"text\" class=\"form-control is-valid\" id=\"inputSuccess2\">\r\n              <div class=\"valid-feedback\">\r\n                Looks good!\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <label class=\"form-col-form-label\" for=\"inputError2\">Input required</label>\r\n              <input type=\"text\" class=\"form-control\" id=\"inputError2\" required>\r\n              <div class=\"valid-feedback\">\r\n                Input is valid.\r\n              </div>\r\n              <div class=\"invalid-feedback\">\r\n                Please provide a valid information.\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Icon/Text</strong> Groups\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\r\n                  </div>\r\n                  <input type=\"text\" id=\"input1-group1\" name=\"input1-group1\" class=\"form-control\" placeholder=\"Username\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <input type=\"email\" id=\"input2-group1\" name=\"input2-group1\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\r\n                  <div class=\"input-group-append\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-envelope-o\"></i></span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <div class=\"input-group-prepend\">\r\n                    <span class=\"input-group-text\"><i class=\"fa fa-euro\"></i></span>\r\n                  </div>\r\n                  <input type=\"text\" id=\"input3-group1\" name=\"input3-group1\" class=\"form-control\" placeholder=\"..\">\r\n                  <div class=\"input-group-append\">\r\n                    <span class=\"input-group-text\">.00</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Buttons</strong> Groups\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-prepend\">\r\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-search\"></i> Search</button>\r\n                  </span>\r\n                  <input type=\"text\" id=\"input1-group2\" name=\"input1-group2\" class=\"form-control\" placeholder=\"Username\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <input type=\"email\" id=\"input2-group2\" name=\"input2-group2\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\r\n                  <span class=\"input-group-append\">\r\n                    <button type=\"button\" class=\"btn btn-primary\">Submit</button>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <span class=\"input-group-prepend\">\r\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-facebook\"></i></button>\r\n                  </span>\r\n                  <input type=\"text\" id=\"input3-group2\" name=\"input3-group2\" class=\"form-control\" placeholder=\"Search\">\r\n                  <span class=\"input-group-append\">\r\n                    <button type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-twitter\"></i></button>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <strong>Dropdowns</strong> Groups\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <div class=\"input-group-prepend\" dropdown>\r\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\r\n                      <span class=\"caret\"></span>\r\n                    </button>\r\n                    <div class=\"dropdown-menu\" *dropdownMenu>\r\n                      <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\r\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\r\n                    </div>\r\n                  </div>\r\n                  <input type=\"text\" id=\"input1-group3\" name=\"input1-group3\" class=\"form-control\" placeholder=\"Username\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <input type=\"email\" id=\"input2-group3\" name=\"input2-group3\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\r\n                  <div class=\"input-group-append\" dropdown>\r\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\r\n                      <span class=\"caret\"></span>\r\n                    </button>\r\n                    <div class=\"dropdown-menu\" *dropdownMenu>\r\n                      <a class=\"dropdown-item\" href=\"#\">Action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\r\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-12\">\r\n                <div class=\"input-group\">\r\n                  <div class=\"input-group-prepend\" dropdown>\r\n                    <button type=\"button\" class=\"btn btn-primary\">Action</button>\r\n                    <button type=\"button\" dropdownToggle class=\"btn btn-primary dropdown-toggle dropdown-toggle-split\">\r\n                      <span class=\"caret\"></span>\r\n                      <span class=\"sr-only\">Split button!</span>\r\n                    </button>\r\n                    <div class=\"dropdown-menu\" *dropdownMenu>\r\n                      <a class=\"dropdown-item\" href=\"#\">Action prepend</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\r\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\r\n                    </div>\r\n                  </div>\r\n                  <input type=\"text\" id=\"input3-group3\" name=\"input3-group3\" class=\"form-control\" placeholder=\"..\">\r\n                  <div class=\"input-group-append\" dropdown>\r\n                    <button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdownToggle>Action\r\n                      <span class=\"caret\"></span>\r\n                    </button>\r\n                    <div class=\"dropdown-menu\" *dropdownMenu>\r\n                      <a class=\"dropdown-item\" href=\"#\">Action append</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Another action</a>\r\n                      <a class=\"dropdown-item\" href=\"#\">Something else here</a>\r\n                      <div role=\"separator\" class=\"dropdown-divider\"></div>\r\n                      <a class=\"dropdown-item\" href=\"#\">Separated link</a>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-success\"><i class=\"fa fa-dot-circle-o\"></i> Submit</button>\r\n          <button type=\"reset\" class=\"btn btn-sm btn-danger\"><i class=\"fa fa-ban\"></i> Reset</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Use the grid for big devices!\r\n          <small>\r\n            <code>.col-lg-*</code>\r\n            <code>.col-md-*</code>\r\n            <code>.col-sm-*</code>\r\n          </small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-8\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-8\">\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-4\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-7\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-7\">\r\n              </div>\r\n              <div class=\"col-md-5\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-5\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-6\">\r\n              </div>\r\n              <div class=\"col-md-6\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-6\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-5\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-5\">\r\n              </div>\r\n              <div class=\"col-md-7\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-7\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-md-4\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-4\">\r\n              </div>\r\n              <div class=\"col-md-8\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-md-8\">\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-danger\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-warning\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-info\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-success\">Action</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Input Grid for small devices!\r\n          <small>\r\n            <code>.col-*</code>\r\n          </small>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\" class=\"form-horizontal\">\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-4\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-4\">\r\n              </div>\r\n              <div class=\"col-8\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-8\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-5\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\r\n              </div>\r\n              <div class=\"col-7\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-7\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-6\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-6\">\r\n              </div>\r\n              <div class=\"col-6\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-6\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-7\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\r\n              </div>\r\n              <div class=\"col-5\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-5\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group row\">\r\n              <div class=\"col-8\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-8\">\r\n              </div>\r\n              <div class=\"col-4\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\".col-4\">\r\n              </div>\r\n            </div>\r\n          </form>\r\n        </div>\r\n        <div class=\"card-footer\">\r\n          <button type=\"submit\" class=\"btn btn-sm btn-primary\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-danger\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-warning\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-info\">Action</button>\r\n          <button type=\"button\" class=\"btn btn-sm btn-success\">Action</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Example Form\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\">\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\">Username</span>\r\n                </div>\r\n                <input type=\"text\" id=\"username3\" name=\"username3\" class=\"form-control\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\">Email</span>\r\n                </div>\r\n                <input type=\"email\" id=\"email3\" name=\"email3\" class=\"form-control\" autocomplete=\"email\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\">Password</span>\r\n                </div>\r\n                <input type=\"password\" id=\"password3\" name=\"password3\" class=\"form-control\" autocomplete=\"current-password\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group form-actions\">\r\n              <button type=\"submit\" class=\"btn btn-sm btn-primary\">Submit</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Example Form <code>append</code>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\">\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <input type=\"text\" id=\"username2\" name=\"username2\" class=\"form-control\" placeholder=\"Username\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <input type=\"email\" id=\"email2\" name=\"email2\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <input type=\"password\" id=\"password2\" name=\"password2\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group form-actions\">\r\n              <button type=\"submit\" class=\"btn btn-sm btn-secondary\">Submit</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-sm-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Example Form <code>prepend</code>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <form action=\"\" method=\"post\">\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-user\"></i></span>\r\n                </div>\r\n                <input type=\"text\" id=\"username\" name=\"username\" class=\"form-control\" placeholder=\"Username\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-envelope\"></i></span>\r\n                </div>\r\n                <input type=\"email\" id=\"email\" name=\"email\" class=\"form-control\" placeholder=\"Email\" autocomplete=\"email\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\">\r\n              <div class=\"input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\"><i class=\"fa fa-asterisk\"></i></span>\r\n                </div>\r\n                <input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"Password\" autocomplete=\"current-password\">\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group form-actions\">\r\n              <button type=\"submit\" class=\"btn btn-sm btn-success\">Submit</button>\r\n            </div>\r\n          </form>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-edit\"></i>Form Elements\r\n          <div class=\"card-header-actions\">\r\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-setting\"><i class=\"icon-settings\"></i></button>\r\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-minimize\"(click)=\"toggleCollapse()\"><i class={{iconCollapse}}></i></button>\r\n            <button type=\"button\" class=\"card-header-action btn btn-link btn-close\"><i class=\"icon-close\"></i></button>\r\n          </div>\r\n        </div>\r\n        <div (collapsed)=\"collapsed($event)\"\r\n             (expanded)=\"expanded($event)\"\r\n             [collapse]=\"isCollapsed\"\r\n             class=\"card-body\">\r\n          <form class=\"form-horizontal\">\r\n          <div class=\"form-group\">\r\n            <label class=\"col-form-label\" for=\"prependedInput\">Prepended text</label>\r\n            <div class=\"controls\">\r\n              <div class=\"input-prepend input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\">@</span>\r\n                </div>\r\n                <input id=\"prependedInput\" class=\"form-control\" size=\"16\" type=\"text\">\r\n              </div>\r\n              <p class=\"help-block\">Here's some help text</p>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-form-label\" for=\"appendedInput\">Appended text</label>\r\n            <div class=\"controls\">\r\n              <div class=\"input-group\">\r\n                <input id=\"appendedInput\" class=\"form-control\" size=\"16\" type=\"text\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\">.00</span>\r\n                </div>\r\n              </div>\r\n              <span class=\"help-block\">Here's more help text</span>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-form-label\" for=\"appendedPrependedInput\">Append and prepend</label>\r\n            <div class=\"controls\">\r\n              <div class=\"input-prepend input-group\">\r\n                <div class=\"input-group-prepend\">\r\n                  <span class=\"input-group-text\">$</span>\r\n                </div>\r\n                <input id=\"appendedPrependedInput\" class=\"form-control\" size=\"16\" type=\"text\">\r\n                <div class=\"input-group-append\">\r\n                  <span class=\"input-group-text\">.00</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-form-label\" for=\"appendedInputButton\">Append with button</label>\r\n            <div class=\"controls\">\r\n              <div class=\"input-group\">\r\n                <input id=\"appendedInputButton\" class=\"form-control\" size=\"16\" type=\"text\">\r\n                <span class=\"input-group-append\">\r\n                  <button class=\"btn btn-secondary\" type=\"button\">Go!</button>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-form-label\" for=\"appendedInputButtons\">Two-button append</label>\r\n            <div class=\"controls\">\r\n              <div class=\"input-group\">\r\n                <input id=\"appendedInputButtons\" size=\"16\" class=\"form-control\" type=\"text\">\r\n                <span class=\"input-group-append\">\r\n                  <button class=\"btn btn-secondary\" type=\"button\">Search</button>\r\n                  <button class=\"btn btn-secondary\" type=\"button\">Options</button>\r\n                </span>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"form-actions\">\r\n            <button type=\"submit\" class=\"btn btn-primary\">Save changes</button>\r\n            <button class=\"btn btn-secondary\" type=\"button\">Cancel</button>\r\n          </div>\r\n        </form>\r\n        </div>\r\n      </div>\r\n    </div> <!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/forms.component.ts":
/*!***********************************************!*\
  !*** ./src/app/views/base/forms.component.ts ***!
  \***********************************************/
/*! exports provided: FormsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsComponent", function() { return FormsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FormsComponent = /** @class */ (function () {
    function FormsComponent() {
        this.isCollapsed = false;
        this.iconCollapse = 'icon-arrow-up';
    }
    FormsComponent.prototype.collapsed = function (event) {
        // console.log(event);
    };
    FormsComponent.prototype.expanded = function (event) {
        // console.log(event);
    };
    FormsComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
        this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
    };
    FormsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./forms.component.html */ "./src/app/views/base/forms.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], FormsComponent);
    return FormsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/paginations.component.html":
/*!*******************************************************!*\
  !*** ./src/app/views/base/paginations.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Pagination\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/pagination\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\r\n          <pagination [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" (pageChanged)=\"pageChanged($event)\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [boundaryLinks]=\"true\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\" class=\"pagination-sm\" [maxSize]=\"6\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12 d-sm-down-none\">\r\n          <pagination [directionLinks]=\"false\" [boundaryLinks]=\"true\" [totalItems]=\"totalItems\"\r\n                      [(ngModel)]=\"currentPage\"></pagination>\r\n        </div>\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [directionLinks]=\"false\" [totalItems]=\"totalItems\" [(ngModel)]=\"currentPage\"\r\n                      (numPages)=\"smallnumPages = $event\"></pagination>\r\n        </div>\r\n      </div>\r\n      <pre class=\"card card-body card-header mb-3\">The selected page no: {{currentPage}}/{{smallnumPages}}</pre>\r\n    </div>\r\n    <div class=\"card-footer\">\r\n      <button type=\"button\" class=\"btn btn-info\" (click)=\"setPage(3)\">Set current page to: 3</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Pagination <small>states & limits</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" [boundaryLinks]=\"true\"></pagination>\r\n        </div>\r\n\r\n        <div class=\"col-xs-12 col-12\">\r\n          <pagination [totalItems]=\"bigTotalItems\" [(ngModel)]=\"bigCurrentPage\" [maxSize]=\"maxSize\" class=\"pagination-sm\"\r\n                      previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\" lastText=\"&raquo;\"\r\n                      [boundaryLinks]=\"true\" [rotate]=\"false\" (numPages)=\"numPages = $event\"></pagination>\r\n        </div>\r\n      </div>\r\n      <pre class=\"card card-body card-header\">Page: {{bigCurrentPage}} / {{numPages}}</pre>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Pager\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-12 col-12 col-md-6\">\r\n          <pagination\r\n            [directionLinks]=\"false\"\r\n            [totalItems]=\"totalItems\"\r\n            [(ngModel)]=\"currentPager\"\r\n            (numPages)=\"smallnumPages = $event\">\r\n          </pagination>\r\n        </div>\r\n\r\n        <div class=\"col-xs-12 col-12 col-md-6\">\r\n          <pager\r\n            [totalItems]=\"totalItems\"\r\n            [(ngModel)]=\"currentPager\"\r\n            (pageChanged)=\"pageChanged($event)\"\r\n            pageBtnClass=\"btn\"\r\n            [itemsPerPage]=\"10\"\r\n            class=\"pull-left\">\r\n          </pager>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/paginations.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/base/paginations.component.ts ***!
  \*****************************************************/
/*! exports provided: PaginationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationsComponent", function() { return PaginationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PaginationsComponent = /** @class */ (function () {
    function PaginationsComponent() {
        this.totalItems = 64;
        this.currentPage = 4;
        this.smallnumPages = 0;
        this.maxSize = 5;
        this.bigTotalItems = 675;
        this.bigCurrentPage = 1;
        this.numPages = 0;
        this.currentPager = 4;
    }
    PaginationsComponent.prototype.setPage = function (pageNo) {
        this.currentPage = pageNo;
    };
    PaginationsComponent.prototype.pageChanged = function (event) {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
    };
    PaginationsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./paginations.component.html */ "./src/app/views/base/paginations.component.html"),
            styles: ['.pager li.btn:active { box-shadow: none; }'],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [])
    ], PaginationsComponent);
    return PaginationsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/popovers.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/popovers.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Popover\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/popover\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n        Live demo\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>positioning</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on top\"\r\n              placement=\"top\">\r\n        Popover on top\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on right\"\r\n              placement=\"right\">\r\n        Popover on right\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover auto\"\r\n              placement=\"auto\">\r\n        Popover auto\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on left\"\r\n              placement=\"left\">\r\n        Popover on left\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Popover on bottom\"\r\n              placement=\"bottom\">\r\n        Popover on bottom\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small><code>focus</code> trigger</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              popoverTitle=\"Dismissible popover\"\r\n              triggers=\"focus\">\r\n        Dismissible popover\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>dynamic content</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\"\r\n              [popover]=\"content\" [popoverTitle]=\"title\">\r\n        Simple binding\r\n      </button>\r\n\r\n      <ng-template #popTemplate>Just another: {{content}}</ng-template>\r\n      <button type=\"button\" class=\"btn btn-warning\"\r\n              [popover]=\"popTemplate\" popoverTitle=\"Template ref content inside\">\r\n        TemplateRef binding\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>dynamic HTML</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ng-template #popTemplateHtml>Here we go:\r\n        <div [innerHtml]=\"html\"></div>\r\n      </ng-template>\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              [popover]=\"popTemplateHtml\" popoverTitle=\"Dynamic html inside\">\r\n        Show me popover with html\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>append to <code>body</code></small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row panel\" style=\"position: relative; overflow: hidden;\">\r\n        <div class=\"card-body panel-body\">\r\n          <button type=\"button\" class=\"btn btn-danger\"\r\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n            Default popover\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-success\"\r\n                  popover=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n                  container=\"body\">\r\n            Popover appended to body\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>custom triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\"\r\n              popover=\"I will hide on blur\"\r\n              triggers=\"mouseenter:mouseleave\">\r\n        Hover over me!\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Popover\r\n      <small>manual triggering</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>\r\n        <span popover=\"Hello there! I was triggered manually\"\r\n              triggers=\"\" #pop=\"bs-popover\">\r\n        This text has attached popover\r\n        </span>\r\n      </p>\r\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\r\n        Show\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\r\n        Hide\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/popovers.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/popovers.component.ts ***!
  \**************************************************/
/*! exports provided: PopoversComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopoversComponent", function() { return PopoversComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PopoversComponent = /** @class */ (function () {
    function PopoversComponent(sanitizer) {
        this.title = 'Welcome word';
        this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
        this.html = "<span class=\"btn btn-warning\">Never trust not sanitized <code>HTML</code>!!!</span>";
        this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.html);
    }
    PopoversComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./popovers.component.html */ "./src/app/views/base/popovers.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], PopoversComponent);
    return PopoversComponent;
}());



/***/ }),

/***/ "./src/app/views/base/progress.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/progress.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Progress\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/progressbar\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress\" [value]=\"55\" [max]=\"100\"></progressbar>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress progress-striped\" [value]=\"22\" [max]=\"100\" type=\"warning\">22%</progressbar>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n          <progressbar class=\"progress progress-striped active\" [max]=\"200\" [value]=\"166\" type=\"danger\"><i>166 / 200</i></progressbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Progress <small>dynamic</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <progressbar class=\"progress progress-striped progress-animated\" [max]=\"max\" [value]=\"dynamic\">\r\n        <span style=\"color:white; white-space:nowrap;\">{{dynamic}} / {{max}}</span>\r\n      </progressbar>\r\n\r\n      <small><em>No animation</em></small>\r\n      <progressbar class=\"progress progress-success\" [value]=\"dynamic\" [max]=\"100\" type=\"success\"><b>{{dynamic}}%</b></progressbar>\r\n\r\n      <small><em>Object (changes type based on value)</em></small>\r\n      <progressbar class=\"progress-bar progress-bar-striped progress-bar-animated\" [value]=\"dynamic\" [max]=\"max\" [type]=\"type\">\r\n        {{type}} <i *ngIf=\"showWarning\">!!! Watch out !!!</i>\r\n      </progressbar>\r\n      <br>\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"random()\">Randomize</button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Progress <small>stacked</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row col-lg-12\">\r\n        <progressbar class=\"progress\" [value]=\"stacked\" [max]=\"100\"></progressbar>\r\n      </div>\r\n      <br>\r\n      <div class=\"row col-md-12\">\r\n        <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"randomize()\">{{buttonCaption}} randomize</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/progress.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/progress.component.ts ***!
  \**************************************************/
/*! exports provided: ProgressComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressComponent", function() { return ProgressComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressComponent = /** @class */ (function () {
    function ProgressComponent() {
        this.max = 200;
        this.stacked = [];
        this.timer = null;
        this.buttonCaption = 'Start';
        this.random();
        this.randomStacked();
    }
    ProgressComponent.prototype.ngOnDestroy = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
        // console.log(`onDestroy`, this.timer);
    };
    ProgressComponent.prototype.random = function () {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;
        if (value < 25) {
            type = 'success';
        }
        else if (value < 50) {
            type = 'info';
        }
        else if (value < 75) {
            type = 'warning';
        }
        else {
            type = 'danger';
        }
        this.showWarning = type === 'danger' || type === 'warning';
        this.dynamic = value;
        this.type = type;
    };
    ProgressComponent.prototype.randomStacked = function () {
        var types = ['success', 'info', 'warning', 'danger'];
        this.stacked = [];
        var n = Math.floor(Math.random() * 4 + 1);
        for (var i = 0; i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            var value = Math.floor(Math.random() * 27 + 3);
            this.stacked.push({
                value: value,
                type: types[index],
                label: value + ' %'
            });
        }
    };
    ProgressComponent.prototype.randomize = function () {
        var _this = this;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        else {
            this.timer = setInterval(function () { return _this.randomStacked(); }, 2000);
        }
        this.buttonCaption = this.timer ? 'Stop' : 'Start';
    };
    ProgressComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./progress.component.html */ "./src/app/views/base/progress.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], ProgressComponent);
    return ProgressComponent;
}());



/***/ }),

/***/ "./src/app/views/base/switches.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/switches.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          3d Switch\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-3d switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-3d switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch default\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch default - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n\r\n          <label class=\"switch switch-label switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with text outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline alternative\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Switch with icon outline alternative - pills\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <label class=\"switch switch-label switch-pill switch-outline-primary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-secondary-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-success-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-warning-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-info-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n          &nbsp;&nbsp;&nbsp;\r\n          <label class=\"switch switch-label switch-pill switch-outline-danger-alt\">\r\n            <input type=\"checkbox\" class=\"switch-input\" checked>\r\n            <span class=\"switch-slider\" data-checked=\"&#x2713;\" data-unchecked=\"&#x2715;\"></span>\r\n          </label>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          Sizes\r\n        </div>\r\n        <div class=\"card-body p-0\">\r\n          <table class=\"table table-hover table-striped table-align-middle mb-0\">\r\n            <thead>\r\n              <th>Size</th>\r\n              <th>Example</th>\r\n              <th>CSS Class</th>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>\r\n                  Large\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-lg switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  Add following class <code>.switch-lg</code>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  Normal\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  -\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>\r\n                  Small\r\n                </td>\r\n                <td>\r\n                  <label class=\"switch switch-sm switch-3d switch-primary\">\r\n                    <input type=\"checkbox\" class=\"switch-input\" checked>\r\n                    <span class=\"switch-slider\"></span>\r\n                  </label>\r\n                </td>\r\n                <td>\r\n                  Add following class <code>.switch-sm</code>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/switches.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/switches.component.ts ***!
  \**************************************************/
/*! exports provided: SwitchesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchesComponent", function() { return SwitchesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SwitchesComponent = /** @class */ (function () {
    function SwitchesComponent() {
    }
    SwitchesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./switches.component.html */ "./src/app/views/base/switches.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], SwitchesComponent);
    return SwitchesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tables.component.html":
/*!**************************************************!*\
  !*** ./src/app/views/base/tables.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Simple Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Samppa Nori</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Estavan Lykos</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Chetan Mohamed</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Derick Maximinus</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Friderik Dávid</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Striped Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-striped\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Yiorgos Avraamu</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Avram Tarasios</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Quintin Ed</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Enéas Kwadwo</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Agapetus Tadeáš</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Condensed Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Carwyn Fachtna</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Nehemiah Tatius</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Ebbe Gemariah</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Eustorgios Amulius</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Leopold Gáspár</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n    <div class=\"col-lg-6\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Bordered Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-bordered\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Pompeius René</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Paĉjo Jadon</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Micheal Mercurius</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Ganesha Dubhghall</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Hiroto Šimun</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <ul class=\"pagination\">\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n            <li class=\"page-item active\">\r\n              <a class=\"page-link\" href=\"#\">1</a>\r\n            </li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-align-justify\"></i> Combined All Table\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <table class=\"table table-bordered table-striped table-sm\">\r\n            <thead>\r\n              <tr>\r\n                <th>Username</th>\r\n                <th>Date registered</th>\r\n                <th>Role</th>\r\n                <th>Status</th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr>\r\n                <td>Vishnu Serghei</td>\r\n                <td>2012/01/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Zbyněk Phoibos</td>\r\n                <td>2012/02/01</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-danger\">Banned</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Einar Randall</td>\r\n                <td>2012/02/01</td>\r\n                <td>Admin</td>\r\n                <td>\r\n                  <span class=\"badge badge-secondary\">Inactive</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Félix Troels</td>\r\n                <td>2012/03/01</td>\r\n                <td>Member</td>\r\n                <td>\r\n                  <span class=\"badge badge-warning\">Pending</span>\r\n                </td>\r\n              </tr>\r\n              <tr>\r\n                <td>Aulus Agmundr</td>\r\n                <td>2012/01/21</td>\r\n                <td>Staff</td>\r\n                <td>\r\n                  <span class=\"badge badge-success\">Active</span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n          <nav>\r\n            <ul class=\"pagination\">\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\r\n              <li class=\"page-item active\">\r\n                <a class=\"page-link\" href=\"#\">1</a>\r\n              </li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\r\n              <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\r\n            </ul>\r\n          </nav>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.col-->\r\n  </div>\r\n  <!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tables.component.ts":
/*!************************************************!*\
  !*** ./src/app/views/base/tables.component.ts ***!
  \************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TablesComponent = /** @class */ (function () {
    function TablesComponent() {
    }
    TablesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tables.component.html */ "./src/app/views/base/tables.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tabs.component.html":
/*!************************************************!*\
  !*** ./src/app/views/base/tabs.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab heading=\"Home\">\r\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab heading=\"Profile\">\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab heading=\"Messages\">\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i></ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i></ng-template>\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i></ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator</ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-basket-loaded\"></i> Shoping cart</ng-template>\r\n          3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6 mb-4\">\r\n      <!-- Nav tabs -->\r\n      <tabset>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-list\"></i> Menu &nbsp;<span class=\"badge badge-success\">New</span></ng-template>\r\n          1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-calculator\"></i> Calculator &nbsp;<span class=\"badge badge-pill badge-danger\">29</span></ng-template>\r\n          2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n        <tab>\r\n          <ng-template tabHeading><i class=\"icon-pie-chart\"></i> Charts</ng-template>\r\n          4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\r\n        </tab>\r\n      </tabset>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tabs.component.ts":
/*!**********************************************!*\
  !*** ./src/app/views/base/tabs.component.ts ***!
  \**********************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
    }
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tabs.component.html */ "./src/app/views/base/tabs.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./src/app/views/base/tooltips.component.html":
/*!****************************************************!*\
  !*** ./src/app/views/base/tooltips.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Bootstrap Tooltips\r\n      <div class=\"card-header-actions\">\r\n        <a href=\"https://valor-software.com/ngx-bootstrap/#/tooltip\" target=\"_blank\">\r\n          <small className=\"text-muted\">docs</small>\r\n        </a>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-primary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n        Simple demo\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>positioning</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"top\">\r\n        Tooltip on top\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"right\">\r\n        Tooltip on right\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"auto\">\r\n        Tooltip auto\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"left\">\r\n        Tooltip on left\r\n      </button>\r\n\r\n      <button type=\"button\" class=\"btn btn-default btn-secondary\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              placement=\"bottom\">\r\n        Tooltip on bottom\r\n      </button>\r\n    </div>\r\n</div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dismissible</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n              triggers=\"focus\">\r\n        Dismissible tooltip\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dynamic content</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <button type=\"button\" class=\"btn btn-info\" [tooltip]=\"content\">\r\n        Simple binding\r\n      </button>\r\n\r\n      <ng-template #tolTemplate>Just another: {{content}}</ng-template>\r\n      <button type=\"button\" class=\"btn btn-warning\" [tooltip]=\"tolTemplate\">\r\n        TemplateRef binding\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>dynamic html</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ng-template #popTemplate>Here we go: <div [innerHtml]=\"html\"></div></ng-template>\r\n      <button type=\"button\" class=\"btn btn-success\"\r\n              [tooltip]=\"popTemplate\">\r\n        Show me tooltip with html\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>append to <code>body</code></small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" style=\"position: relative; overflow: hidden; padding-top: 10px;\">\r\n        <div class=\"col-xs-12 col-12\">\r\n          <button type=\"button\" class=\"btn btn-danger\"\r\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\">\r\n            Default tooltip\r\n          </button>\r\n          <button type=\"button\" class=\"btn btn-success\"\r\n                  tooltip=\"Vivamus sagittis lacus vel augue laoreet rutrum faucibus.\"\r\n                  container=\"body\">\r\n            Tooltip appended to body\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>custom triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-xs-6 col-6\">\r\n          <p>Desktop</p>\r\n          <button type=\"button\" class=\"btn btn-info\"\r\n                  tooltip=\"I will hide on click\"\r\n                  triggers=\"mouseenter:click\">\r\n            Hover over me!\r\n          </button>\r\n        </div>\r\n\r\n        <div class=\"col-xs-6 col-6\">\r\n          <p>Mobile</p>\r\n          <button type=\"button\" class=\"btn btn-info\"\r\n                  tooltip=\"I will hide on click\"\r\n                  triggers=\"click\">\r\n            Click on me!\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-header\">\r\n      Tooltips <small>manual triggers</small>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <p>\r\n  <span tooltip=\"Hello there! I was triggered manually\"\r\n        triggers=\"\" #pop=\"bs-tooltip\">\r\n  This text has attached tooltip\r\n  </span>\r\n      </p>\r\n\r\n      <button type=\"button\" class=\"btn btn-success\" (click)=\"pop.show()\">\r\n        Show\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-warning\" (click)=\"pop.hide()\">\r\n        Hide\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/base/tooltips.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/base/tooltips.component.ts ***!
  \**************************************************/
/*! exports provided: TooltipsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipsComponent", function() { return TooltipsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TooltipsComponent = /** @class */ (function () {
    function TooltipsComponent(sanitizer) {
        this.content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
        this.html = "<span class=\"btn btn-danger\">Never trust not sanitized HTML!!!</span>";
        this.html = sanitizer.sanitize(_angular_core__WEBPACK_IMPORTED_MODULE_0__["SecurityContext"].HTML, this.html);
    }
    TooltipsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./tooltips.component.html */ "./src/app/views/base/tooltips.component.html")
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["DomSanitizer"]])
    ], TooltipsComponent);
    return TooltipsComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-base-base-module.js.map