(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-Administration-administration-module~views-candidats-candidats-module~views-entretien-entretie~ca788b13"],{

/***/ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js ***!
  \***********************************************************************/
/*! exports provided: BsModalRef, ModalBackdropOptions, ModalContainerComponent, ModalBackdropComponent, ModalOptions, ModalDirective, ModalModule, BsModalService, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BsModalRef", function() { return BsModalRef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalBackdropOptions", function() { return ModalBackdropOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalContainerComponent", function() { return ModalContainerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalBackdropComponent", function() { return ModalBackdropComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalOptions", function() { return ModalOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDirective", function() { return ModalDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalModule", function() { return ModalModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BsModalService", function() { return BsModalService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CLASS_NAME; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
/* harmony import */ var ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/loader */ "./node_modules/ngx-bootstrap/loader/fesm5/ngx-bootstrap-loader.js");
/* harmony import */ var ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/positioning */ "./node_modules/ngx-bootstrap/positioning/fesm5/ngx-bootstrap-positioning.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BsModalRef = /** @class */ (function () {
    function BsModalRef() {
        /**
         * Hides the modal
         */
        this.hide = Function;
    }
    BsModalRef.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return BsModalRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalBackdropOptions = /** @class */ (function () {
    function ModalBackdropOptions(options) {
        this.animate = true;
        Object.assign(this, options);
    }
    return ModalBackdropOptions;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalOptions = /** @class */ (function () {
    function ModalOptions() {
    }
    ModalOptions.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    return ModalOptions;
}());
var /** @type {?} */ modalConfigDefaults = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: false,
    ignoreBackdropClick: false,
    class: '',
    animated: true,
    initialState: {}
};
var /** @type {?} */ CLASS_NAME = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in',
    // bs3
    SHOW: 'show' // bs4
};
var /** @type {?} */ TRANSITION_DURATIONS = {
    MODAL: 300,
    BACKDROP: 150
};
var /** @type {?} */ DISMISS_REASONS = {
    BACKRDOP: 'backdrop-click',
    ESC: 'esc'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalContainerComponent = /** @class */ (function () {
    function ModalContainerComponent(options, _element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this.isShown = false;
        this.isModalHiding = false;
        this.config = Object.assign({}, options);
    }
    /**
     * @return {?}
     */
    ModalContainerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isAnimated) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.FADE);
        }
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        setTimeout(function () {
            _this.isShown = true;
            _this._renderer.addClass(_this._element.nativeElement, Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        }, this.isAnimated ? TRANSITION_DURATIONS.BACKDROP : 0);
        if (document && document.body) {
            if (this.bsModalService.getModalsCount() === 1) {
                this.bsModalService.checkScrollbar();
                this.bsModalService.setScrollbar();
            }
            this._renderer.addClass(document.body, CLASS_NAME.OPEN);
        }
        if (this._element.nativeElement) {
            this._element.nativeElement.focus();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalContainerComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.bsModalService.setDismissReason(DISMISS_REASONS.BACKRDOP);
        this.hide();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalContainerComponent.prototype.onEsc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.isShown) {
            return;
        }
        if (event.keyCode === 27) {
            event.preventDefault();
        }
        if (this.config.keyboard &&
            this.level === this.bsModalService.getModalsCount()) {
            this.bsModalService.setDismissReason(DISMISS_REASONS.ESC);
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    ModalContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.isShown) {
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    ModalContainerComponent.prototype.hide = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isModalHiding || !this.isShown) {
            return;
        }
        this.isModalHiding = true;
        this._renderer.removeClass(this._element.nativeElement, Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])() ? CLASS_NAME.IN : CLASS_NAME.SHOW);
        setTimeout(function () {
            _this.isShown = false;
            if (document &&
                document.body &&
                _this.bsModalService.getModalsCount() === 1) {
                _this._renderer.removeClass(document.body, CLASS_NAME.OPEN);
            }
            _this.bsModalService.hide(_this.level);
            _this.isModalHiding = false;
        }, this.isAnimated ? TRANSITION_DURATIONS.MODAL : 0);
    };
    ModalContainerComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'modal-container',
                    template: "\n    <div [class]=\"'modal-dialog' + (config.class ? ' ' + config.class : '')\" role=\"document\">\n      <div class=\"modal-content\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
                    host: {
                        class: 'modal',
                        role: 'dialog',
                        tabindex: '-1',
                        '[attr.aria-modal]': 'true'
                    }
                }] }
    ];
    /** @nocollapse */
    ModalContainerComponent.ctorParameters = function () { return [
        { type: ModalOptions, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
    ]; };
    ModalContainerComponent.propDecorators = {
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event'],] },],
        "onEsc": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['window:keydown.esc', ['$event'],] },],
    };
    return ModalContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This component will be added as background layout for modals if enabled
 */
var ModalBackdropComponent = /** @class */ (function () {
    function ModalBackdropComponent(element, renderer) {
        this._isShown = false;
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(ModalBackdropComponent.prototype, "isAnimated", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isAnimated;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isAnimated = value;
            // this.renderer.setElementClass(this.element.nativeElement, `${ClassName.FADE}`, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalBackdropComponent.prototype, "isShown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isShown;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._isShown = value;
            if (value) {
                this.renderer.addClass(this.element.nativeElement, "" + CLASS_NAME.IN);
            }
            else {
                this.renderer.removeClass(this.element.nativeElement, "" + CLASS_NAME.IN);
            }
            if (!Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])()) {
                if (value) {
                    this.renderer.addClass(this.element.nativeElement, "" + CLASS_NAME.SHOW);
                }
                else {
                    this.renderer.removeClass(this.element.nativeElement, "" + CLASS_NAME.SHOW);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ModalBackdropComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.isAnimated) {
            this.renderer.addClass(this.element.nativeElement, "" + CLASS_NAME.FADE);
            ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].reflow(this.element.nativeElement);
        }
        this.isShown = true;
    };
    ModalBackdropComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'bs-modal-backdrop',
                    template: ' ',
                    host: { class: CLASS_NAME.BACKDROP }
                }] }
    ];
    /** @nocollapse */
    ModalBackdropComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
    ]; };
    return ModalBackdropComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var /** @type {?} */ TRANSITION_DURATION = 300;
var /** @type {?} */ BACKDROP_TRANSITION_DURATION = 150;
/**
 * Mark any code with directive to show it's content in modal
 */
var ModalDirective = /** @class */ (function () {
    function ModalDirective(_element, _viewContainerRef, _renderer, clf) {
        this._element = _element;
        this._renderer = _renderer;
        /**
         * This event fires immediately when the `show` instance method is called.
         */
        this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * This event is fired when the modal has been made visible to the user
         * (will wait for CSS transitions to complete)
         */
        this.onShown = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * This event is fired immediately when
         * the hide instance method has been called.
         */
        this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        /**
         * This event is fired when the modal has finished being
         * hidden from the user (will wait for CSS transitions to complete).
         */
        this.onHidden = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._isShown = false;
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.timerHideModal = 0;
        this.timerRmBackDrop = 0;
        this.isNested = false;
        this._backdrop = clf.createLoader(_element, _viewContainerRef, _renderer);
    }
    Object.defineProperty(ModalDirective.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * allows to set modal configuration via element property
         * @param {?} conf
         * @return {?}
         */
        function (conf) {
            this._config = this.getConfig(conf);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalDirective.prototype, "isShown", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isShown;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    ModalDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.config.ignoreBackdropClick ||
            this.config.backdrop === 'static' ||
            event.target !== this._element.nativeElement) {
            return;
        }
        this.dismissReason = DISMISS_REASONS.BACKRDOP;
        this.hide(event);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalDirective.prototype.onEsc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this._isShown) {
            return;
        }
        if (event.keyCode === 27) {
            event.preventDefault();
        }
        if (this.config.keyboard) {
            this.dismissReason = DISMISS_REASONS.ESC;
            this.hide();
        }
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.config = void 0;
        if (this._isShown) {
            this._isShown = false;
            this.hideModal();
            this._backdrop.dispose();
        }
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._config = this._config || this.getConfig();
        setTimeout(function () {
            if (_this._config.show) {
                _this.show();
            }
        }, 0);
    };
    /* Public methods */
    /** Allows to manually toggle modal visibility */
    /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    ModalDirective.prototype.toggle = /**
     * Allows to manually toggle modal visibility
     * @return {?}
     */
    function () {
        return this._isShown ? this.hide() : this.show();
    };
    /** Allows to manually open modal */
    /**
     * Allows to manually open modal
     * @return {?}
     */
    ModalDirective.prototype.show = /**
     * Allows to manually open modal
     * @return {?}
     */
    function () {
        var _this = this;
        this.dismissReason = null;
        this.onShow.emit(this);
        if (this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        if (ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"] && ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body) {
            if (ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body.classList.contains(CLASS_NAME.OPEN)) {
                this.isNested = true;
            }
            else {
                this._renderer.addClass(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body, CLASS_NAME.OPEN);
            }
        }
        this.showBackdrop(function () {
            _this.showElement();
        });
    };
    /** Allows to manually close modal */
    /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    ModalDirective.prototype.hide = /**
     * Allows to manually close modal
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        if (event) {
            event.preventDefault();
        }
        this.onHide.emit(this);
        // todo: add an option to prevent hiding
        if (!this._isShown) {
            return;
        }
        clearTimeout(this.timerHideModal);
        clearTimeout(this.timerRmBackDrop);
        this._isShown = false;
        this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])()) {
            this._renderer.removeClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        // this._addClassIn = false;
        if (this._config.animated) {
            this.timerHideModal = setTimeout(function () { return _this.hideModal(); }, TRANSITION_DURATION);
        }
        else {
            this.hideModal();
        }
    };
    /** Private methods @internal */
    /**
     * Private methods \@internal
     * @param {?=} config
     * @return {?}
     */
    ModalDirective.prototype.getConfig = /**
     * Private methods \@internal
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        return Object.assign({}, modalConfigDefaults, config);
    };
    /**
     *  Show dialog
     *  @internal
     */
    /**
     *  Show dialog
     *  \@internal
     * @return {?}
     */
    ModalDirective.prototype.showElement = /**
     *  Show dialog
     *  \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        // todo: replace this with component loader usage
        if (!this._element.nativeElement.parentNode ||
            this._element.nativeElement.parentNode.nodeType !== Node.ELEMENT_NODE) {
            // don't move modals dom position
            if (ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"] && ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body) {
                ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body.appendChild(this._element.nativeElement);
            }
        }
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'false');
        this._renderer.setAttribute(this._element.nativeElement, 'aria-modal', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'block');
        this._renderer.setProperty(this._element.nativeElement, 'scrollTop', 0);
        if (this._config.animated) {
            ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["Utils"].reflow(this._element.nativeElement);
        }
        // this._addClassIn = true;
        this._renderer.addClass(this._element.nativeElement, CLASS_NAME.IN);
        if (!Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["isBs3"])()) {
            this._renderer.addClass(this._element.nativeElement, CLASS_NAME.SHOW);
        }
        var /** @type {?} */ transitionComplete = function () {
            if (_this._config.focus) {
                _this._element.nativeElement.focus();
            }
            _this.onShown.emit(_this);
        };
        if (this._config.animated) {
            setTimeout(transitionComplete, TRANSITION_DURATION);
        }
        else {
            transitionComplete();
        }
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    ModalDirective.prototype.hideModal = /**
     * \@internal
     * @return {?}
     */
    function () {
        var _this = this;
        this._renderer.setAttribute(this._element.nativeElement, 'aria-hidden', 'true');
        this._renderer.setStyle(this._element.nativeElement, 'display', 'none');
        this.showBackdrop(function () {
            if (!_this.isNested) {
                if (ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"] && ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body) {
                    _this._renderer.removeClass(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body, CLASS_NAME.OPEN);
                }
                _this.resetScrollbar();
            }
            _this.resetAdjustments();
            _this.focusOtherModal();
            _this.onHidden.emit(_this);
        });
    };
    // todo: original show was calling a callback when done, but we can use
    // promise
    /** @internal */
    /**
     * \@internal
     * @param {?=} callback
     * @return {?}
     */
    ModalDirective.prototype.showBackdrop = /**
     * \@internal
     * @param {?=} callback
     * @return {?}
     */
    function (callback) {
        var _this = this;
        if (this._isShown &&
            this.config.backdrop &&
            (!this.backdrop || !this.backdrop.instance.isShown)) {
            this.removeBackdrop();
            this._backdrop
                .attach(ModalBackdropComponent)
                .to('body')
                .show({ isAnimated: this._config.animated });
            this.backdrop = this._backdrop._componentRef;
            if (!callback) {
                return;
            }
            if (!this._config.animated) {
                callback();
                return;
            }
            setTimeout(callback, BACKDROP_TRANSITION_DURATION);
        }
        else if (!this._isShown && this.backdrop) {
            this.backdrop.instance.isShown = false;
            var /** @type {?} */ callbackRemove = function () {
                _this.removeBackdrop();
                if (callback) {
                    callback();
                }
            };
            if (this.backdrop.instance.isAnimated) {
                this.timerRmBackDrop = setTimeout(callbackRemove, BACKDROP_TRANSITION_DURATION);
            }
            else {
                callbackRemove();
            }
        }
        else if (callback) {
            callback();
        }
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    ModalDirective.prototype.removeBackdrop = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._backdrop.hide();
    };
    /** Events tricks */
    // no need for it
    // protected setEscapeEvent():void {
    //   if (this._isShown && this._config.keyboard) {
    //     $(this._element).on(Event.KEYDOWN_DISMISS, (event) => {
    //       if (event.which === 27) {
    //         this.hide()
    //       }
    //     })
    //
    //   } else if (!this._isShown) {
    //     $(this._element).off(Event.KEYDOWN_DISMISS)
    //   }
    // }
    // protected setResizeEvent():void {
    // console.log(this.renderer.listenGlobal('', Event.RESIZE));
    // if (this._isShown) {
    //   $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this))
    // } else {
    //   $(window).off(Event.RESIZE)
    // }
    // }
    /**
     * Events tricks
     * @return {?}
     */
    ModalDirective.prototype.focusOtherModal = /**
     * Events tricks
     * @return {?}
     */
    function () {
        if (this._element.nativeElement.parentElement == null)
            return;
        var /** @type {?} */ otherOpenedModals = this._element.nativeElement.parentElement.querySelectorAll('.in[bsModal]');
        if (!otherOpenedModals.length) {
            return;
        }
        otherOpenedModals[otherOpenedModals.length - 1].focus();
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    ModalDirective.prototype.resetAdjustments = /**
     * \@internal
     * @return {?}
     */
    function () {
        this._renderer.setStyle(this._element.nativeElement, 'paddingLeft', '');
        this._renderer.setStyle(this._element.nativeElement, 'paddingRight', '');
    };
    /** Scroll bar tricks */
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    ModalDirective.prototype.checkScrollbar = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.isBodyOverflowing = ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body.clientWidth < ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["window"].innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.setScrollbar = /**
     * @return {?}
     */
    function () {
        if (!ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"]) {
            return;
        }
        this.originalBodyPadding = parseInt(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["window"]
            .getComputedStyle(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body)
            .getPropertyValue('padding-right') || 0, 10);
        if (this.isBodyOverflowing) {
            ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body.style.paddingRight = this.originalBodyPadding +
                this.scrollbarWidth + "px";
        }
    };
    /**
     * @return {?}
     */
    ModalDirective.prototype.resetScrollbar = /**
     * @return {?}
     */
    function () {
        ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body.style.paddingRight = this.originalBodyPadding + 'px';
    };
    // thx d.walsh
    /**
     * @return {?}
     */
    ModalDirective.prototype.getScrollbarWidth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body, scrollDiv);
        var /** @type {?} */ scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["document"].body, scrollDiv);
        return scrollbarWidth;
    };
    ModalDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[bsModal]',
                    exportAs: 'bs-modal'
                },] }
    ];
    /** @nocollapse */
    ModalDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
        { type: ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], },
    ]; };
    ModalDirective.propDecorators = {
        "config": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onShow": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onShown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onHide": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onHidden": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event'],] },],
        "onEsc": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['keydown.esc', ['$event'],] },],
    };
    return ModalDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var BsModalService = /** @class */ (function () {
    function BsModalService(rendererFactory, clf) {
        this.clf = clf;
        // constructor props
        this.config = modalConfigDefaults;
        this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onShown = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onHidden = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isBodyOverflowing = false;
        this.originalBodyPadding = 0;
        this.scrollbarWidth = 0;
        this.modalsCount = 0;
        this.lastDismissReason = '';
        this.loaders = [];
        this._backdropLoader = this.clf.createLoader(null, null, null);
        this._renderer = rendererFactory.createRenderer(null, null);
    }
    /** Shows a modal */
    /**
     * Shows a modal
     * @param {?} content
     * @param {?=} config
     * @return {?}
     */
    BsModalService.prototype.show = /**
     * Shows a modal
     * @param {?} content
     * @param {?=} config
     * @return {?}
     */
    function (content, config) {
        this.modalsCount++;
        this._createLoaders();
        this.config = Object.assign({}, modalConfigDefaults, config);
        this._showBackdrop();
        this.lastDismissReason = null;
        return this._showModal(content);
    };
    /**
     * @param {?} level
     * @return {?}
     */
    BsModalService.prototype.hide = /**
     * @param {?} level
     * @return {?}
     */
    function (level) {
        var _this = this;
        if (this.modalsCount === 1) {
            this._hideBackdrop();
            this.resetScrollbar();
        }
        this.modalsCount = this.modalsCount >= 1 ? this.modalsCount - 1 : 0;
        setTimeout(function () {
            _this._hideModal(level);
            _this.removeLoaders(level);
        }, this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0);
    };
    /**
     * @return {?}
     */
    BsModalService.prototype._showBackdrop = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ isBackdropEnabled = this.config.backdrop || this.config.backdrop === 'static';
        var /** @type {?} */ isBackdropInDOM = !this.backdropRef || !this.backdropRef.instance.isShown;
        if (this.modalsCount === 1) {
            this.removeBackdrop();
            if (isBackdropEnabled && isBackdropInDOM) {
                this._backdropLoader
                    .attach(ModalBackdropComponent)
                    .to('body')
                    .show({ isAnimated: this.config.animated });
                this.backdropRef = this._backdropLoader._componentRef;
            }
        }
    };
    /**
     * @return {?}
     */
    BsModalService.prototype._hideBackdrop = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.backdropRef) {
            return;
        }
        this.backdropRef.instance.isShown = false;
        var /** @type {?} */ duration = this.config.animated ? TRANSITION_DURATIONS.BACKDROP : 0;
        setTimeout(function () { return _this.removeBackdrop(); }, duration);
    };
    /**
     * @param {?} content
     * @return {?}
     */
    BsModalService.prototype._showModal = /**
     * @param {?} content
     * @return {?}
     */
    function (content) {
        var /** @type {?} */ modalLoader = this.loaders[this.loaders.length - 1];
        var /** @type {?} */ bsModalRef = new BsModalRef();
        var /** @type {?} */ modalContainerRef = modalLoader
            .provide({ provide: ModalOptions, useValue: this.config })
            .provide({ provide: BsModalRef, useValue: bsModalRef })
            .attach(ModalContainerComponent)
            .to('body')
            .show({ content: content, isAnimated: this.config.animated, initialState: this.config.initialState, bsModalService: this });
        modalContainerRef.instance.level = this.getModalsCount();
        bsModalRef.hide = function () {
            modalContainerRef.instance.hide();
        };
        bsModalRef.content = modalLoader.getInnerComponent() || null;
        return bsModalRef;
    };
    /**
     * @param {?} level
     * @return {?}
     */
    BsModalService.prototype._hideModal = /**
     * @param {?} level
     * @return {?}
     */
    function (level) {
        var /** @type {?} */ modalLoader = this.loaders[level - 1];
        if (modalLoader) {
            modalLoader.hide();
        }
    };
    /**
     * @return {?}
     */
    BsModalService.prototype.getModalsCount = /**
     * @return {?}
     */
    function () {
        return this.modalsCount;
    };
    /**
     * @param {?} reason
     * @return {?}
     */
    BsModalService.prototype.setDismissReason = /**
     * @param {?} reason
     * @return {?}
     */
    function (reason) {
        this.lastDismissReason = reason;
    };
    /**
     * @return {?}
     */
    BsModalService.prototype.removeBackdrop = /**
     * @return {?}
     */
    function () {
        this._backdropLoader.hide();
        this.backdropRef = null;
    };
    /** AFTER PR MERGE MODAL.COMPONENT WILL BE USING THIS CODE */
    /** Scroll bar tricks */
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    BsModalService.prototype.checkScrollbar = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this.scrollbarWidth = this.getScrollbarWidth();
    };
    /**
     * @return {?}
     */
    BsModalService.prototype.setScrollbar = /**
     * @return {?}
     */
    function () {
        if (!document) {
            return;
        }
        this.originalBodyPadding = parseInt(window
            .getComputedStyle(document.body)
            .getPropertyValue('padding-right') || '0', 10);
        if (this.isBodyOverflowing) {
            document.body.style.paddingRight = this.originalBodyPadding +
                this.scrollbarWidth + "px";
        }
    };
    /**
     * @return {?}
     */
    BsModalService.prototype.resetScrollbar = /**
     * @return {?}
     */
    function () {
        document.body.style.paddingRight = this.originalBodyPadding + "px";
    };
    /**
     * @return {?}
     */
    BsModalService.prototype.getScrollbarWidth = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ scrollDiv = this._renderer.createElement('div');
        this._renderer.addClass(scrollDiv, CLASS_NAME.SCROLLBAR_MEASURER);
        this._renderer.appendChild(document.body, scrollDiv);
        var /** @type {?} */ scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this._renderer.removeChild(document.body, scrollDiv);
        return scrollbarWidth;
    };
    /**
     * @return {?}
     */
    BsModalService.prototype._createLoaders = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ loader = this.clf.createLoader(null, null, null);
        this.copyEvent(loader.onBeforeShow, this.onShow);
        this.copyEvent(loader.onShown, this.onShown);
        this.copyEvent(loader.onBeforeHide, this.onHide);
        this.copyEvent(loader.onHidden, this.onHidden);
        this.loaders.push(loader);
    };
    /**
     * @param {?} level
     * @return {?}
     */
    BsModalService.prototype.removeLoaders = /**
     * @param {?} level
     * @return {?}
     */
    function (level) {
        this.loaders.splice(level - 1, 1);
        this.loaders.forEach(function (loader, i) {
            loader.instance.level = i + 1;
        });
    };
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    BsModalService.prototype.copyEvent = /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (from, to) {
        var _this = this;
        from.subscribe(function () {
            to.emit(_this.lastDismissReason);
        });
    };
    BsModalService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    /** @nocollapse */
    BsModalService.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["RendererFactory2"], },
        { type: ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], },
    ]; };
    return BsModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    /**
     * @return {?}
     */
    ModalModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: ModalModule,
            providers: [BsModalService, ngx_bootstrap_loader__WEBPACK_IMPORTED_MODULE_2__["ComponentLoaderFactory"], ngx_bootstrap_positioning__WEBPACK_IMPORTED_MODULE_3__["PositioningService"]]
        };
    };
    ModalModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    declarations: [
                        ModalBackdropComponent,
                        ModalDirective,
                        ModalContainerComponent
                    ],
                    exports: [ModalBackdropComponent, ModalDirective],
                    entryComponents: [ModalBackdropComponent, ModalContainerComponent]
                },] }
    ];
    return ModalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWJvb3RzdHJhcC1tb2RhbC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LWJvb3RzdHJhcC9tb2RhbC9icy1tb2RhbC1yZWYuc2VydmljZS50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9tb2RhbC9tb2RhbC1iYWNrZHJvcC5vcHRpb25zLnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL21vZGFsL21vZGFsLW9wdGlvbnMuY2xhc3MudHMiLCJuZzovL25neC1ib290c3RyYXAvbW9kYWwvbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LWJvb3RzdHJhcC9tb2RhbC9tb2RhbC1iYWNrZHJvcC5jb21wb25lbnQudHMiLCJuZzovL25neC1ib290c3RyYXAvbW9kYWwvbW9kYWwuZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtYm9vdHN0cmFwL21vZGFsL2JzLW1vZGFsLnNlcnZpY2UudHMiLCJuZzovL25neC1ib290c3RyYXAvbW9kYWwvbW9kYWwubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJzTW9kYWxSZWYge1xuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIGEgY29tcG9uZW50IGluc2lkZSB0aGUgbW9kYWwuIE51bGwgaWYgbW9kYWwncyBiZWVuIGNyZWF0ZWQgd2l0aCBUZW1wbGF0ZVJlZlxuICAgKi9cbiAgY29udGVudD86IGFueSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEhpZGVzIHRoZSBtb2RhbFxuICAgKi9cbiAgaGlkZTogKCkgPT4gdm9pZCA9IEZ1bmN0aW9uO1xufVxuIiwiZXhwb3J0IGNsYXNzIE1vZGFsQmFja2Ryb3BPcHRpb25zIHtcbiAgYW5pbWF0ZSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogTW9kYWxCYWNrZHJvcE9wdGlvbnMpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RhbE9wdGlvbnMge1xuICAvKipcbiAgICogIEluY2x1ZGVzIGEgbW9kYWwtYmFja2Ryb3AgZWxlbWVudC4gQWx0ZXJuYXRpdmVseSxcbiAgICogIHNwZWNpZnkgc3RhdGljIGZvciBhIGJhY2tkcm9wIHdoaWNoIGRvZXNuJ3QgY2xvc2UgdGhlIG1vZGFsIG9uIGNsaWNrLlxuICAgKi9cbiAgYmFja2Ryb3A/OiBib29sZWFuIHwgJ3N0YXRpYyc7XG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIG1vZGFsIHdoZW4gZXNjYXBlIGtleSBpcyBwcmVzc2VkLlxuICAgKi9cbiAga2V5Ym9hcmQ/OiBib29sZWFuO1xuXG4gIGZvY3VzPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNob3dzIHRoZSBtb2RhbCB3aGVuIGluaXRpYWxpemVkLlxuICAgKi9cbiAgc2hvdz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZ25vcmUgdGhlIGJhY2tkcm9wIGNsaWNrXG4gICAqL1xuICBpZ25vcmVCYWNrZHJvcENsaWNrPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIENzcyBjbGFzcyBmb3Igb3BlbmVkIG1vZGFsXG4gICAqL1xuICBjbGFzcz86IHN0cmluZztcbiAgLyoqXG4gICAqIFRvZ2dsZSBhbmltYXRpb25cbiAgICovXG4gIGFuaW1hdGVkPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE1vZGFsIGRhdGFcbiAgICovXG4gIGluaXRpYWxTdGF0ZT86IE9iamVjdDtcbn1cblxuXG5leHBvcnQgY29uc3QgbW9kYWxDb25maWdEZWZhdWx0czogTW9kYWxPcHRpb25zID0ge1xuICBiYWNrZHJvcDogdHJ1ZSxcbiAga2V5Ym9hcmQ6IHRydWUsXG4gIGZvY3VzOiB0cnVlLFxuICBzaG93OiBmYWxzZSxcbiAgaWdub3JlQmFja2Ryb3BDbGljazogZmFsc2UsXG4gIGNsYXNzOiAnJyxcbiAgYW5pbWF0ZWQ6IHRydWUsXG4gIGluaXRpYWxTdGF0ZToge31cbn07XG5cbmV4cG9ydCBjb25zdCBDTEFTU19OQU1FOiBhbnkgPSB7XG4gIFNDUk9MTEJBUl9NRUFTVVJFUjogJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJyxcbiAgQkFDS0RST1A6ICdtb2RhbC1iYWNrZHJvcCcsXG4gIE9QRU46ICdtb2RhbC1vcGVuJyxcbiAgRkFERTogJ2ZhZGUnLFxuICBJTjogJ2luJywgLy8gYnMzXG4gIFNIT1c6ICdzaG93JyAvLyBiczRcbn07XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RPUjogYW55ID0ge1xuICBESUFMT0c6ICcubW9kYWwtZGlhbG9nJyxcbiAgREFUQV9UT0dHTEU6ICdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsXG4gIERBVEFfRElTTUlTUzogJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsXG4gIEZJWEVEX0NPTlRFTlQ6ICcubmF2YmFyLWZpeGVkLXRvcCwgLm5hdmJhci1maXhlZC1ib3R0b20sIC5pcy1maXhlZCdcbn07XG5cbmV4cG9ydCBjb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OUzogYW55ID0ge1xuICBNT0RBTDogMzAwLFxuICBCQUNLRFJPUDogMTUwXG59O1xuXG5leHBvcnQgY29uc3QgRElTTUlTU19SRUFTT05TID0ge1xuICBCQUNLUkRPUDogJ2JhY2tkcm9wLWNsaWNrJyxcbiAgRVNDOiAnZXNjJ1xufTtcbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ0xBU1NfTkFNRSxcbiAgRElTTUlTU19SRUFTT05TLFxuICBNb2RhbE9wdGlvbnMsXG4gIFRSQU5TSVRJT05fRFVSQVRJT05TXG59IGZyb20gJy4vbW9kYWwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBCc01vZGFsU2VydmljZSB9IGZyb20gJy4vYnMtbW9kYWwuc2VydmljZSc7XG5pbXBvcnQgeyBpc0JzMyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtb2RhbC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKGNvbmZpZy5jbGFzcyA/ICcgJyArIGNvbmZpZy5jbGFzcyA6ICcnKVwiIHJvbGU9XCJkb2N1bWVudFwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ21vZGFsJyxcbiAgICByb2xlOiAnZGlhbG9nJyxcbiAgICB0YWJpbmRleDogJy0xJyxcbiAgICAnW2F0dHIuYXJpYS1tb2RhbF0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY29uZmlnOiBNb2RhbE9wdGlvbnM7XG4gIGlzU2hvd24gPSBmYWxzZTtcbiAgbGV2ZWw6IG51bWJlcjtcbiAgaXNBbmltYXRlZDogYm9vbGVhbjtcbiAgYnNNb2RhbFNlcnZpY2U6IEJzTW9kYWxTZXJ2aWNlO1xuICBwcml2YXRlIGlzTW9kYWxIaWRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNb2RhbE9wdGlvbnMsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfZWxlbWVudDogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICBDTEFTU19OQU1FLkZBREVcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2Rpc3BsYXknLFxuICAgICAgJ2Jsb2NrJ1xuICAgICk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzU2hvd24gPSB0cnVlO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICAgaXNCczMoKSA/IENMQVNTX05BTUUuSU4gOiBDTEFTU19OQU1FLlNIT1dcbiAgICAgICk7XG4gICAgfSwgdGhpcy5pc0FuaW1hdGVkID8gVFJBTlNJVElPTl9EVVJBVElPTlMuQkFDS0RST1AgOiAwKTtcbiAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKHRoaXMuYnNNb2RhbFNlcnZpY2UuZ2V0TW9kYWxzQ291bnQoKSA9PT0gMSkge1xuICAgICAgICB0aGlzLmJzTW9kYWxTZXJ2aWNlLmNoZWNrU2Nyb2xsYmFyKCk7XG4gICAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2Uuc2V0U2Nyb2xsYmFyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBDTEFTU19OQU1FLk9QRU4pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJyB8fFxuICAgICAgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ic01vZGFsU2VydmljZS5zZXREaXNtaXNzUmVhc29uKERJU01JU1NfUkVBU09OUy5CQUNLUkRPUCk7XG4gICAgdGhpcy5oaWRlKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi5lc2MnLCBbJyRldmVudCddKVxuICBvbkVzYyhldmVudDogYW55KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcua2V5Ym9hcmQgJiZcbiAgICAgIHRoaXMubGV2ZWwgPT09IHRoaXMuYnNNb2RhbFNlcnZpY2UuZ2V0TW9kYWxzQ291bnQoKVxuICAgICkge1xuICAgICAgdGhpcy5ic01vZGFsU2VydmljZS5zZXREaXNtaXNzUmVhc29uKERJU01JU1NfUkVBU09OUy5FU0MpO1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc01vZGFsSGlkaW5nIHx8ICF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pc01vZGFsSGlkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgIGlzQnMzKCkgPyBDTEFTU19OQU1FLklOIDogQ0xBU1NfTkFNRS5TSE9XXG4gICAgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNTaG93biA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudCAmJlxuICAgICAgICBkb2N1bWVudC5ib2R5ICYmXG4gICAgICAgIHRoaXMuYnNNb2RhbFNlcnZpY2UuZ2V0TW9kYWxzQ291bnQoKSA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIENMQVNTX05BTUUuT1BFTik7XG4gICAgICB9XG4gICAgICB0aGlzLmJzTW9kYWxTZXJ2aWNlLmhpZGUodGhpcy5sZXZlbCk7XG4gICAgICB0aGlzLmlzTW9kYWxIaWRpbmcgPSBmYWxzZTtcbiAgICB9LCB0aGlzLmlzQW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5NT0RBTCA6IDApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENMQVNTX05BTUUgfSBmcm9tICcuL21vZGFsLW9wdGlvbnMuY2xhc3MnO1xuaW1wb3J0IHsgaXNCczMsIFV0aWxzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5cblxuLyoqIFRoaXMgY29tcG9uZW50IHdpbGwgYmUgYWRkZWQgYXMgYmFja2dyb3VuZCBsYXlvdXQgZm9yIG1vZGFscyBpZiBlbmFibGVkICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdicy1tb2RhbC1iYWNrZHJvcCcsXG4gIHRlbXBsYXRlOiAnICcsXG4gIGhvc3Q6IHsgY2xhc3M6IENMQVNTX05BTUUuQkFDS0RST1AgfVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEJhY2tkcm9wQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZ2V0IGlzQW5pbWF0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzQW5pbWF0ZWQ7XG4gIH1cblxuICBzZXQgaXNBbmltYXRlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzQW5pbWF0ZWQgPSB2YWx1ZTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgYCR7Q2xhc3NOYW1lLkZBREV9YCwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0IGlzU2hvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd247XG4gIH1cblxuICBzZXQgaXNTaG93bih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzU2hvd24gPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICBgJHtDTEFTU19OQU1FLklOfWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgICBgJHtDTEFTU19OQU1FLklOfWBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghaXNCczMoKSkge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgYCR7Q0xBU1NfTkFNRS5TSE9XfWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgYCR7Q0xBU1NfTkFNRS5TSE9XfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xuICByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIHByb3RlY3RlZCBfaXNBbmltYXRlZDogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIF9pc1Nob3duID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZiwgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNBbmltYXRlZCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIGAke0NMQVNTX05BTUUuRkFERX1gXG4gICAgICApO1xuICAgICAgVXRpbHMucmVmbG93KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZTtcbiAgfVxufVxuIiwiLyogdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudCAqL1xuLy8gdG9kbzogc2hvdWxkIHdlIHN1cHBvcnQgZW5mb3JjZSBmb2N1cyBpbj9cbi8vIHRvZG86IGluIG9yaWdpbmFsIGJzIHRoZXJlIGFyZSB3YXMgYSB3YXkgdG8gcHJldmVudCBtb2RhbCBmcm9tIHNob3dpbmdcbi8vIHRvZG86IG9yaWdpbmFsIG1vZGFsIGhhZCByZXNpemUgZXZlbnRzXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudFJlZiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsXG4gIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZG9jdW1lbnQsIHdpbmRvdywgaXNCczMsIFV0aWxzIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XG5pbXBvcnQgeyBNb2RhbEJhY2tkcm9wQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ0xBU1NfTkFNRSwgRElTTUlTU19SRUFTT05TLCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBNb2RhbE9wdGlvbnNcbn0gZnJvbSAnLi9tb2RhbC1vcHRpb25zLmNsYXNzJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvbG9hZGVyJztcblxuY29uc3QgVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMDtcbmNvbnN0IEJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04gPSAxNTA7XG5cbi8qKiBNYXJrIGFueSBjb2RlIHdpdGggZGlyZWN0aXZlIHRvIHNob3cgaXQncyBjb250ZW50IGluIG1vZGFsICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYnNNb2RhbF0nLFxuICBleHBvcnRBczogJ2JzLW1vZGFsJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIGFsbG93cyB0byBzZXQgbW9kYWwgY29uZmlndXJhdGlvbiB2aWEgZWxlbWVudCBwcm9wZXJ0eSAqL1xuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKGNvbmY6IE1vZGFsT3B0aW9ucykge1xuICAgIHRoaXMuX2NvbmZpZyA9IHRoaXMuZ2V0Q29uZmlnKGNvbmYpO1xuICB9XG5cbiAgZ2V0IGNvbmZpZygpOiBNb2RhbE9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKiogVGhpcyBldmVudCBmaXJlcyBpbW1lZGlhdGVseSB3aGVuIHRoZSBgc2hvd2AgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZC4gKi9cbiAgQE91dHB1dCgpXG4gIG9uU2hvdzogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIHdoZW4gdGhlIG1vZGFsIGhhcyBiZWVuIG1hZGUgdmlzaWJsZSB0byB0aGUgdXNlclxuICAgKiAod2lsbCB3YWl0IGZvciBDU1MgdHJhbnNpdGlvbnMgdG8gY29tcGxldGUpXG4gICAqL1xuICBAT3V0cHV0KClcbiAgb25TaG93bjogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG4gIC8qKiBUaGlzIGV2ZW50IGlzIGZpcmVkIGltbWVkaWF0ZWx5IHdoZW5cbiAgICogdGhlIGhpZGUgaW5zdGFuY2UgbWV0aG9kIGhhcyBiZWVuIGNhbGxlZC5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBvbkhpZGU6IEV2ZW50RW1pdHRlcjxNb2RhbERpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPigpO1xuICAvKiogVGhpcyBldmVudCBpcyBmaXJlZCB3aGVuIHRoZSBtb2RhbCBoYXMgZmluaXNoZWQgYmVpbmdcbiAgICogaGlkZGVuIGZyb20gdGhlIHVzZXIgKHdpbGwgd2FpdCBmb3IgQ1NTIHRyYW5zaXRpb25zIHRvIGNvbXBsZXRlKS5cbiAgICovXG4gIEBPdXRwdXQoKVxuICBvbkhpZGRlbjogRXZlbnRFbWl0dGVyPE1vZGFsRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW9kYWxEaXJlY3RpdmU+KCk7XG5cbiAgLyoqIFRoaXMgZmllbGQgY29udGFpbnMgbGFzdCBkaXNtaXNzIHJlYXNvbi5cbiAgICogUG9zc2libGUgdmFsdWVzOiBgYmFja2Ryb3AtY2xpY2tgLCBgZXNjYCBhbmQgYG51bGxgXG4gICAqIChpZiBtb2RhbCB3YXMgY2xvc2VkIGJ5IGRpcmVjdCBjYWxsIG9mIGAuaGlkZSgpYCkuXG4gICAqL1xuICBkaXNtaXNzUmVhc29uOiBzdHJpbmc7XG5cbiAgZ2V0IGlzU2hvd24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2hvd247XG4gIH1cblxuICBwcm90ZWN0ZWQgX2NvbmZpZzogTW9kYWxPcHRpb25zO1xuICBwcm90ZWN0ZWQgX2lzU2hvd24gPSBmYWxzZTtcblxuICBwcm90ZWN0ZWQgaXNCb2R5T3ZlcmZsb3dpbmcgPSBmYWxzZTtcbiAgcHJvdGVjdGVkIG9yaWdpbmFsQm9keVBhZGRpbmcgPSAwO1xuICBwcm90ZWN0ZWQgc2Nyb2xsYmFyV2lkdGggPSAwO1xuXG4gIHByb3RlY3RlZCB0aW1lckhpZGVNb2RhbDogYW55ID0gMDtcbiAgcHJvdGVjdGVkIHRpbWVyUm1CYWNrRHJvcDogYW55ID0gMDtcblxuICAvLyByZWZlcmVuY2UgdG8gYmFja2Ryb3AgY29tcG9uZW50XG4gIHByb3RlY3RlZCBiYWNrZHJvcDogQ29tcG9uZW50UmVmPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+O1xuICBwcml2YXRlIF9iYWNrZHJvcDogQ29tcG9uZW50TG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+O1xuXG4gIHByaXZhdGUgaXNOZXN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgICAgICAgY2xmOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5KSB7XG4gICAgdGhpcy5fYmFja2Ryb3AgPSBjbGYuY3JlYXRlTG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+KFxuICAgICAgX2VsZW1lbnQsXG4gICAgICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAgIF9yZW5kZXJlclxuICAgICk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmlnbm9yZUJhY2tkcm9wQ2xpY2sgfHxcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tkcm9wID09PSAnc3RhdGljJyB8fFxuICAgICAgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kaXNtaXNzUmVhc29uID0gRElTTUlTU19SRUFTT05TLkJBQ0tSRE9QO1xuICAgIHRoaXMuaGlkZShldmVudCk7XG4gIH1cblxuICAvLyB0b2RvOiBjb25zaWRlciBwcmV2ZW50aW5nIGRlZmF1bHQgYW5kIHN0b3BwaW5nIHByb3BhZ2F0aW9uXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZXNjJywgWyckZXZlbnQnXSlcbiAgb25Fc2MoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IERJU01JU1NfUkVBU09OUy5FU0M7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiBhbnkge1xuICAgIHRoaXMuY29uZmlnID0gdm9pZCAwO1xuICAgIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gICAgICB0aGlzLl9pc1Nob3duID0gZmFsc2U7XG4gICAgICB0aGlzLmhpZGVNb2RhbCgpO1xuICAgICAgdGhpcy5fYmFja2Ryb3AuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IGFueSB7XG4gICAgdGhpcy5fY29uZmlnID0gdGhpcy5fY29uZmlnIHx8IHRoaXMuZ2V0Q29uZmlnKCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fY29uZmlnLnNob3cpIHtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKiBQdWJsaWMgbWV0aG9kcyAqL1xuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgdG9nZ2xlIG1vZGFsIHZpc2liaWxpdHkgKi9cbiAgdG9nZ2xlKCk6IHZvaWQge1xuICAgIHJldHVybiB0aGlzLl9pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgb3BlbiBtb2RhbCAqL1xuICBzaG93KCk6IHZvaWQge1xuICAgIHRoaXMuZGlzbWlzc1JlYXNvbiA9IG51bGw7XG4gICAgdGhpcy5vblNob3cuZW1pdCh0aGlzKTtcbiAgICBpZiAodGhpcy5faXNTaG93bikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lckhpZGVNb2RhbCk7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJSbUJhY2tEcm9wKTtcblxuICAgIHRoaXMuX2lzU2hvd24gPSB0cnVlO1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpO1xuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKCk7XG5cbiAgICBpZiAoZG9jdW1lbnQgJiYgZG9jdW1lbnQuYm9keSkge1xuICAgICAgaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKENMQVNTX05BTUUuT1BFTikpIHtcbiAgICAgICAgdGhpcy5pc05lc3RlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBDTEFTU19OQU1FLk9QRU4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgIHRoaXMuc2hvd0VsZW1lbnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBBbGxvd3MgdG8gbWFudWFsbHkgY2xvc2UgbW9kYWwgKi9cbiAgaGlkZShldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHRoaXMub25IaWRlLmVtaXQodGhpcyk7XG5cbiAgICAvLyB0b2RvOiBhZGQgYW4gb3B0aW9uIHRvIHByZXZlbnQgaGlkaW5nXG4gICAgaWYgKCF0aGlzLl9pc1Nob3duKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXJIaWRlTW9kYWwpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyUm1CYWNrRHJvcCk7XG5cbiAgICB0aGlzLl9pc1Nob3duID0gZmFsc2U7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCBDTEFTU19OQU1FLklOKTtcbiAgICBpZiAoIWlzQnMzKCkpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5TSE9XKTtcbiAgICB9XG4gICAgLy8gdGhpcy5fYWRkQ2xhc3NJbiA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRlZCkge1xuICAgICAgdGhpcy50aW1lckhpZGVNb2RhbCA9IHNldFRpbWVvdXQoXG4gICAgICAgICgpID0+IHRoaXMuaGlkZU1vZGFsKCksXG4gICAgICAgIFRSQU5TSVRJT05fRFVSQVRJT05cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZU1vZGFsKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFByaXZhdGUgbWV0aG9kcyBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGdldENvbmZpZyhjb25maWc/OiBNb2RhbE9wdGlvbnMpOiBNb2RhbE9wdGlvbnMge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBtb2RhbENvbmZpZ0RlZmF1bHRzLCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqICBTaG93IGRpYWxvZ1xuICAgKiAgQGludGVybmFsXG4gICAqL1xuICBwcm90ZWN0ZWQgc2hvd0VsZW1lbnQoKTogdm9pZCB7XG4gICAgLy8gdG9kbzogcmVwbGFjZSB0aGlzIHdpdGggY29tcG9uZW50IGxvYWRlciB1c2FnZVxuICAgIGlmIChcbiAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFXG4gICAgKSB7XG4gICAgICAvLyBkb24ndCBtb3ZlIG1vZGFscyBkb20gcG9zaXRpb25cbiAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYXJpYS1oaWRkZW4nLFxuICAgICAgJ2ZhbHNlJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ2FyaWEtbW9kYWwnLFxuICAgICAgJ3RydWUnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdkaXNwbGF5JyxcbiAgICAgICdibG9jaydcbiAgICApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3Njcm9sbFRvcCcsXG4gICAgICAwXG4gICAgKTtcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0ZWQpIHtcbiAgICAgIFV0aWxzLnJlZmxvdyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIHRoaXMuX2FkZENsYXNzSW4gPSB0cnVlO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgQ0xBU1NfTkFNRS5JTik7XG4gICAgaWYgKCFpc0JzMygpKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIENMQVNTX05BTUUuU0hPVyk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMub25TaG93bi5lbWl0KHRoaXMpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XG4gICAgICBzZXRUaW1lb3V0KHRyYW5zaXRpb25Db21wbGV0ZSwgVFJBTlNJVElPTl9EVVJBVElPTik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIGhpZGVNb2RhbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAnYXJpYS1oaWRkZW4nLFxuICAgICAgJ3RydWUnXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdkaXNwbGF5JyxcbiAgICAgICdub25lJ1xuICAgICk7XG4gICAgdGhpcy5zaG93QmFja2Ryb3AoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmlzTmVzdGVkKSB7XG4gICAgICAgIGlmIChkb2N1bWVudCAmJiBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgQ0xBU1NfTkFNRS5PUEVOKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsYmFyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnJlc2V0QWRqdXN0bWVudHMoKTtcbiAgICAgIHRoaXMuZm9jdXNPdGhlck1vZGFsKCk7XG4gICAgICB0aGlzLm9uSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0b2RvOiBvcmlnaW5hbCBzaG93IHdhcyBjYWxsaW5nIGEgY2FsbGJhY2sgd2hlbiBkb25lLCBidXQgd2UgY2FuIHVzZVxuICAvLyBwcm9taXNlXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHJvdGVjdGVkIHNob3dCYWNrZHJvcChjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5faXNTaG93biAmJlxuICAgICAgdGhpcy5jb25maWcuYmFja2Ryb3AgJiZcbiAgICAgICghdGhpcy5iYWNrZHJvcCB8fCAhdGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc1Nob3duKVxuICAgICkge1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgdGhpcy5fYmFja2Ryb3BcbiAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxuICAgICAgICAudG8oJ2JvZHknKVxuICAgICAgICAuc2hvdyh7aXNBbmltYXRlZDogdGhpcy5fY29uZmlnLmFuaW1hdGVkfSk7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5fYmFja2Ryb3AuX2NvbXBvbmVudFJlZjtcblxuICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fY29uZmlnLmFuaW1hdGVkKSB7XG4gICAgICAgIGNhbGxiYWNrKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AuaW5zdGFuY2UuaXNTaG93biA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBjYWxsYmFja1JlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5iYWNrZHJvcC5pbnN0YW5jZS5pc0FuaW1hdGVkKSB7XG4gICAgICAgIHRoaXMudGltZXJSbUJhY2tEcm9wID0gc2V0VGltZW91dChcbiAgICAgICAgICBjYWxsYmFja1JlbW92ZSxcbiAgICAgICAgICBCQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFja1JlbW92ZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVtb3ZlQmFja2Ryb3AoKTogdm9pZCB7XG4gICAgdGhpcy5fYmFja2Ryb3AuaGlkZSgpO1xuICB9XG5cbiAgLyoqIEV2ZW50cyB0cmlja3MgKi9cblxuICAvLyBubyBuZWVkIGZvciBpdFxuICAvLyBwcm90ZWN0ZWQgc2V0RXNjYXBlRXZlbnQoKTp2b2lkIHtcbiAgLy8gICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgLy8gICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCAoZXZlbnQpID0+IHtcbiAgLy8gICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAyNykge1xuICAvLyAgICAgICAgIHRoaXMuaGlkZSgpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vXG4gIC8vICAgfSBlbHNlIGlmICghdGhpcy5faXNTaG93bikge1xuICAvLyAgICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuS0VZRE9XTl9ESVNNSVNTKVxuICAvLyAgIH1cbiAgLy8gfVxuXG4gIC8vIHByb3RlY3RlZCBzZXRSZXNpemVFdmVudCgpOnZvaWQge1xuICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlbmRlcmVyLmxpc3Rlbkdsb2JhbCgnJywgRXZlbnQuUkVTSVpFKSk7XG4gIC8vIGlmICh0aGlzLl9pc1Nob3duKSB7XG4gIC8vICAgJCh3aW5kb3cpLm9uKEV2ZW50LlJFU0laRSwgJC5wcm94eSh0aGlzLl9oYW5kbGVVcGRhdGUsIHRoaXMpKVxuICAvLyB9IGVsc2Uge1xuICAvLyAgICQod2luZG93KS5vZmYoRXZlbnQuUkVTSVpFKVxuICAvLyB9XG4gIC8vIH1cblxuICBwcm90ZWN0ZWQgZm9jdXNPdGhlck1vZGFsKCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3Qgb3RoZXJPcGVuZWRNb2RhbHMgPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5bYnNNb2RhbF0nKTtcbiAgICBpZiAoIW90aGVyT3BlbmVkTW9kYWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvdGhlck9wZW5lZE1vZGFsc1tvdGhlck9wZW5lZE1vZGFscy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwcm90ZWN0ZWQgcmVzZXRBZGp1c3RtZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudCxcbiAgICAgICdwYWRkaW5nTGVmdCcsXG4gICAgICAnJ1xuICAgICk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAncGFkZGluZ1JpZ2h0JyxcbiAgICAgICcnXG4gICAgKTtcbiAgfVxuXG4gIC8qKiBTY3JvbGwgYmFyIHRyaWNrcyAqL1xuICAvKiogQGludGVybmFsICovXG4gIHByb3RlY3RlZCBjaGVja1Njcm9sbGJhcigpOiB2b2lkIHtcbiAgICB0aGlzLmlzQm9keU92ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLmdldFNjcm9sbGJhcldpZHRoKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGlmICghZG9jdW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZGRpbmcgPSBwYXJzZUludChcbiAgICAgIHdpbmRvd1xuICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1yaWdodCcpIHx8IDAsXG4gICAgICAxMFxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc0JvZHlPdmVyZmxvd2luZykge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHt0aGlzLm9yaWdpbmFsQm9keVBhZGRpbmcgK1xuICAgICAgdGhpcy5zY3JvbGxiYXJXaWR0aH1weGA7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nICsgJ3B4JztcbiAgfVxuXG4gIC8vIHRoeCBkLndhbHNoXG4gIHByb3RlY3RlZCBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHNjcm9sbERpdiA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHNjcm9sbERpdiwgQ0xBU1NfTkFNRS5TQ1JPTExCQVJfTUVBU1VSRVIpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuYm9keSwgc2Nyb2xsRGl2KTtcblxuICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aDtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBUZW1wbGF0ZVJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENvbXBvbmVudExvYWRlciwgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB9IGZyb20gJ25neC1ib290c3RyYXAvbG9hZGVyJztcbmltcG9ydCB7IE1vZGFsQmFja2Ryb3BDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLWJhY2tkcm9wLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDTEFTU19OQU1FLFxuICBtb2RhbENvbmZpZ0RlZmF1bHRzLFxuICBNb2RhbE9wdGlvbnMsXG4gIFRSQU5TSVRJT05fRFVSQVRJT05TXG59IGZyb20gJy4vbW9kYWwtb3B0aW9ucy5jbGFzcyc7XG5pbXBvcnQgeyBCc01vZGFsUmVmIH0gZnJvbSAnLi9icy1tb2RhbC1yZWYuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCc01vZGFsU2VydmljZSB7XG4gIC8vIGNvbnN0cnVjdG9yIHByb3BzXG4gIGNvbmZpZzogTW9kYWxPcHRpb25zID0gbW9kYWxDb25maWdEZWZhdWx0cztcblxuICBvblNob3c6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBvblNob3duOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgb25IaWRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgb25IaWRkZW46IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByb3RlY3RlZCBpc0JvZHlPdmVyZmxvd2luZyA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgb3JpZ2luYWxCb2R5UGFkZGluZyA9IDA7XG5cbiAgcHJvdGVjdGVkIHNjcm9sbGJhcldpZHRoID0gMDtcblxuICBwcm90ZWN0ZWQgYmFja2Ryb3BSZWY6IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfYmFja2Ryb3BMb2FkZXI6IENvbXBvbmVudExvYWRlcjxNb2RhbEJhY2tkcm9wQ29tcG9uZW50PjtcbiAgcHJpdmF0ZSBtb2RhbHNDb3VudCA9IDA7XG4gIHByaXZhdGUgbGFzdERpc21pc3NSZWFzb24gPSAnJztcblxuICBwcml2YXRlIGxvYWRlcnM6IENvbXBvbmVudExvYWRlcjxNb2RhbENvbnRhaW5lckNvbXBvbmVudD5bXSA9IFtdO1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjI7XG5cbiAgY29uc3RydWN0b3IocmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLCBwcml2YXRlIGNsZjogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSkge1xuICAgIHRoaXMuX2JhY2tkcm9wTG9hZGVyID0gdGhpcy5jbGYuY3JlYXRlTG9hZGVyPE1vZGFsQmFja2Ryb3BDb21wb25lbnQ+KFxuICAgICAgbnVsbCxcbiAgICAgIG51bGwsXG4gICAgICBudWxsXG4gICAgKTtcbiAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeS5jcmVhdGVSZW5kZXJlcihudWxsLCBudWxsKTtcbiAgfVxuXG4gIC8qKiBTaG93cyBhIG1vZGFsICovXG4gIHNob3coY29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IGFueSwgY29uZmlnPzogTW9kYWxPcHRpb25zKTogQnNNb2RhbFJlZiB7XG4gICAgdGhpcy5tb2RhbHNDb3VudCsrO1xuICAgIHRoaXMuX2NyZWF0ZUxvYWRlcnMoKTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIG1vZGFsQ29uZmlnRGVmYXVsdHMsIGNvbmZpZyk7XG4gICAgdGhpcy5fc2hvd0JhY2tkcm9wKCk7XG4gICAgdGhpcy5sYXN0RGlzbWlzc1JlYXNvbiA9IG51bGw7XG5cbiAgICByZXR1cm4gdGhpcy5fc2hvd01vZGFsKGNvbnRlbnQpO1xuICB9XG5cbiAgaGlkZShsZXZlbDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMubW9kYWxzQ291bnQgPT09IDEpIHtcbiAgICAgIHRoaXMuX2hpZGVCYWNrZHJvcCgpO1xuICAgICAgdGhpcy5yZXNldFNjcm9sbGJhcigpO1xuICAgIH1cbiAgICB0aGlzLm1vZGFsc0NvdW50ID0gdGhpcy5tb2RhbHNDb3VudCA+PSAxID8gdGhpcy5tb2RhbHNDb3VudCAtIDEgOiAwO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5faGlkZU1vZGFsKGxldmVsKTtcbiAgICAgIHRoaXMucmVtb3ZlTG9hZGVycyhsZXZlbCk7XG4gICAgfSwgdGhpcy5jb25maWcuYW5pbWF0ZWQgPyBUUkFOU0lUSU9OX0RVUkFUSU9OUy5CQUNLRFJPUCA6IDApO1xuICB9XG5cbiAgX3Nob3dCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICBjb25zdCBpc0JhY2tkcm9wRW5hYmxlZCA9XG4gICAgICB0aGlzLmNvbmZpZy5iYWNrZHJvcCB8fCB0aGlzLmNvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYyc7XG4gICAgY29uc3QgaXNCYWNrZHJvcEluRE9NID1cbiAgICAgICF0aGlzLmJhY2tkcm9wUmVmIHx8ICF0aGlzLmJhY2tkcm9wUmVmLmluc3RhbmNlLmlzU2hvd247XG5cbiAgICBpZiAodGhpcy5tb2RhbHNDb3VudCA9PT0gMSkge1xuICAgICAgdGhpcy5yZW1vdmVCYWNrZHJvcCgpO1xuXG4gICAgICBpZiAoaXNCYWNrZHJvcEVuYWJsZWQgJiYgaXNCYWNrZHJvcEluRE9NKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wTG9hZGVyXG4gICAgICAgICAgLmF0dGFjaChNb2RhbEJhY2tkcm9wQ29tcG9uZW50KVxuICAgICAgICAgIC50bygnYm9keScpXG4gICAgICAgICAgLnNob3coeyBpc0FuaW1hdGVkOiB0aGlzLmNvbmZpZy5hbmltYXRlZCB9KTtcbiAgICAgICAgdGhpcy5iYWNrZHJvcFJlZiA9IHRoaXMuX2JhY2tkcm9wTG9hZGVyLl9jb21wb25lbnRSZWY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hpZGVCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuYmFja2Ryb3BSZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5iYWNrZHJvcFJlZi5pbnN0YW5jZS5pc1Nob3duID0gZmFsc2U7XG4gICAgY29uc3QgZHVyYXRpb24gPSB0aGlzLmNvbmZpZy5hbmltYXRlZCA/IFRSQU5TSVRJT05fRFVSQVRJT05TLkJBQ0tEUk9QIDogMDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVtb3ZlQmFja2Ryb3AoKSwgZHVyYXRpb24pO1xuICB9XG5cbiAgX3Nob3dNb2RhbChjb250ZW50OiBhbnkpOiBCc01vZGFsUmVmIHtcbiAgICBjb25zdCBtb2RhbExvYWRlciA9IHRoaXMubG9hZGVyc1t0aGlzLmxvYWRlcnMubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgYnNNb2RhbFJlZiA9IG5ldyBCc01vZGFsUmVmKCk7XG4gICAgY29uc3QgbW9kYWxDb250YWluZXJSZWYgPSBtb2RhbExvYWRlclxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBNb2RhbE9wdGlvbnMsIHVzZVZhbHVlOiB0aGlzLmNvbmZpZyB9KVxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBCc01vZGFsUmVmLCB1c2VWYWx1ZTogYnNNb2RhbFJlZiB9KVxuICAgICAgLmF0dGFjaChNb2RhbENvbnRhaW5lckNvbXBvbmVudClcbiAgICAgIC50bygnYm9keScpXG4gICAgICAuc2hvdyh7Y29udGVudCwgaXNBbmltYXRlZDogdGhpcy5jb25maWcuYW5pbWF0ZWQsIGluaXRpYWxTdGF0ZTogdGhpcy5jb25maWcuaW5pdGlhbFN0YXRlLCBic01vZGFsU2VydmljZTogdGhpc30pO1xuICAgIG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlLmxldmVsID0gdGhpcy5nZXRNb2RhbHNDb3VudCgpO1xuICAgIGJzTW9kYWxSZWYuaGlkZSA9ICgpID0+IHtcbiAgICAgIG1vZGFsQ29udGFpbmVyUmVmLmluc3RhbmNlLmhpZGUoKTtcbiAgICB9O1xuICAgIGJzTW9kYWxSZWYuY29udGVudCA9IG1vZGFsTG9hZGVyLmdldElubmVyQ29tcG9uZW50KCkgfHwgbnVsbDtcblxuICAgIHJldHVybiBic01vZGFsUmVmO1xuICB9XG5cbiAgX2hpZGVNb2RhbChsZXZlbDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbW9kYWxMb2FkZXIgPSB0aGlzLmxvYWRlcnNbbGV2ZWwgLSAxXTtcbiAgICBpZiAobW9kYWxMb2FkZXIpIHtcbiAgICAgIG1vZGFsTG9hZGVyLmhpZGUoKTtcbiAgICB9XG4gIH1cblxuICBnZXRNb2RhbHNDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1vZGFsc0NvdW50O1xuICB9XG5cbiAgc2V0RGlzbWlzc1JlYXNvbihyZWFzb246IHN0cmluZykge1xuICAgIHRoaXMubGFzdERpc21pc3NSZWFzb24gPSByZWFzb247XG4gIH1cblxuICByZW1vdmVCYWNrZHJvcCgpOiB2b2lkIHtcbiAgICB0aGlzLl9iYWNrZHJvcExvYWRlci5oaWRlKCk7XG4gICAgdGhpcy5iYWNrZHJvcFJlZiA9IG51bGw7XG4gIH1cblxuICAvKiogQUZURVIgUFIgTUVSR0UgTU9EQUwuQ09NUE9ORU5UIFdJTEwgQkUgVVNJTkcgVEhJUyBDT0RFICovXG4gIC8qKiBTY3JvbGwgYmFyIHRyaWNrcyAqL1xuICAvKiogQGludGVybmFsICovXG4gIGNoZWNrU2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNCb2R5T3ZlcmZsb3dpbmcgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIDwgd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMuZ2V0U2Nyb2xsYmFyV2lkdGgoKTtcbiAgfVxuXG4gIHNldFNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICBpZiAoIWRvY3VtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nID0gcGFyc2VJbnQoXG4gICAgICB3aW5kb3dcbiAgICAgICAgLmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSB8fCAnMCcsXG4gICAgICAxMFxuICAgICk7XG5cbiAgICBpZiAodGhpcy5pc0JvZHlPdmVyZmxvd2luZykge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHt0aGlzLm9yaWdpbmFsQm9keVBhZGRpbmcgK1xuICAgICAgICB0aGlzLnNjcm9sbGJhcldpZHRofXB4YDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0U2Nyb2xsYmFyKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7dGhpcy5vcmlnaW5hbEJvZHlQYWRkaW5nfXB4YDtcbiAgfVxuXG4gIC8vIHRoeCBkLndhbHNoXG4gIHByaXZhdGUgZ2V0U2Nyb2xsYmFyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBzY3JvbGxEaXYgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhzY3JvbGxEaXYsIENMQVNTX05BTUUuU0NST0xMQkFSX01FQVNVUkVSKTtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBzY3JvbGxEaXYpO1xuICAgIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNoaWxkKGRvY3VtZW50LmJvZHksIHNjcm9sbERpdik7XG5cbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVMb2FkZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuY2xmLmNyZWF0ZUxvYWRlcjxNb2RhbENvbnRhaW5lckNvbXBvbmVudD4oXG4gICAgICBudWxsLFxuICAgICAgbnVsbCxcbiAgICAgIG51bGxcbiAgICApO1xuICAgIHRoaXMuY29weUV2ZW50KGxvYWRlci5vbkJlZm9yZVNob3csIHRoaXMub25TaG93KTtcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25TaG93biwgdGhpcy5vblNob3duKTtcbiAgICB0aGlzLmNvcHlFdmVudChsb2FkZXIub25CZWZvcmVIaWRlLCB0aGlzLm9uSGlkZSk7XG4gICAgdGhpcy5jb3B5RXZlbnQobG9hZGVyLm9uSGlkZGVuLCB0aGlzLm9uSGlkZGVuKTtcbiAgICB0aGlzLmxvYWRlcnMucHVzaChsb2FkZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMb2FkZXJzKGxldmVsOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRlcnMuc3BsaWNlKGxldmVsIC0gMSwgMSk7XG4gICAgdGhpcy5sb2FkZXJzLmZvckVhY2goXG4gICAgICAobG9hZGVyOiBDb21wb25lbnRMb2FkZXI8TW9kYWxDb250YWluZXJDb21wb25lbnQ+LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgbG9hZGVyLmluc3RhbmNlLmxldmVsID0gaSArIDE7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgY29weUV2ZW50KGZyb206IEV2ZW50RW1pdHRlcjxhbnk+LCB0bzogRXZlbnRFbWl0dGVyPGFueT4pIHtcbiAgICBmcm9tLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0by5lbWl0KHRoaXMubGFzdERpc21pc3NSZWFzb24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBNb2RhbEJhY2tkcm9wQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1iYWNrZHJvcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kYWxEaXJlY3RpdmUgfSBmcm9tICcuL21vZGFsLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcbmltcG9ydCB7IENvbXBvbmVudExvYWRlckZhY3RvcnkgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2xvYWRlcic7XG5pbXBvcnQgeyBNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCc01vZGFsU2VydmljZSB9IGZyb20gJy4vYnMtbW9kYWwuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1vZGFsQmFja2Ryb3BDb21wb25lbnQsXG4gICAgTW9kYWxEaXJlY3RpdmUsXG4gICAgTW9kYWxDb250YWluZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW01vZGFsQmFja2Ryb3BDb21wb25lbnQsIE1vZGFsRGlyZWN0aXZlXSxcbiAgZW50cnlDb21wb25lbnRzOiBbTW9kYWxCYWNrZHJvcENvbXBvbmVudCwgTW9kYWxDb250YWluZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNb2RhbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW0JzTW9kYWxTZXJ2aWNlLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5LCBQb3NpdGlvbmluZ1NlcnZpY2VdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImRvY3VtZW50Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7Ozs7b0JBWXFCLFFBQVE7OztnQkFWNUIsVUFBVTs7cUJBRlg7Ozs7Ozs7QUNBQSxJQUFBO0lBR0UsOEJBQVksT0FBNkI7dUJBRi9CLElBQUk7UUFHWixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM5QjsrQkFMSDtJQU1DOzs7Ozs7QUNORDs7OztnQkFFQyxVQUFVOzt1QkFGWDs7QUFzQ08scUJBQU0sbUJBQW1CLEdBQWlCO0lBQy9DLFFBQVEsRUFBRSxJQUFJO0lBQ2QsUUFBUSxFQUFFLElBQUk7SUFDZCxLQUFLLEVBQUUsSUFBSTtJQUNYLElBQUksRUFBRSxLQUFLO0lBQ1gsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixLQUFLLEVBQUUsRUFBRTtJQUNULFFBQVEsRUFBRSxJQUFJO0lBQ2QsWUFBWSxFQUFFLEVBQUU7Q0FDakIsQ0FBQztBQUVGLHFCQUFhLFVBQVUsR0FBUTtJQUM3QixrQkFBa0IsRUFBRSx5QkFBeUI7SUFDN0MsUUFBUSxFQUFFLGdCQUFnQjtJQUMxQixJQUFJLEVBQUUsWUFBWTtJQUNsQixJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxJQUFJOztJQUNSLElBQUksRUFBRSxNQUFNO0NBQ2IsQ0FBQztBQUVGLEFBT08scUJBQU0sb0JBQW9CLEdBQVE7SUFDdkMsS0FBSyxFQUFFLEdBQUc7SUFDVixRQUFRLEVBQUUsR0FBRztDQUNkLENBQUM7QUFFRixBQUFPLHFCQUFNLGVBQWUsR0FBRztJQUM3QixRQUFRLEVBQUUsZ0JBQWdCO0lBQzFCLEdBQUcsRUFBRSxLQUFLO0NBQ1gsQ0FBQzs7Ozs7O0FDekVGO0lBeUNFLGlDQUFZLE9BQXFCLEVBQ1gsUUFBb0IsRUFDdEI7UUFERSxhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTO3VCQVJuQixLQUFLOzZCQUlTLEtBQUs7UUFLM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMxQzs7OztJQUVELDBDQUFROzs7SUFBUjtRQUFBLGlCQTZCQztRQTVCQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixVQUFVLENBQUMsSUFBSSxDQUNoQixDQUFDO1NBQ0g7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFNBQVMsRUFDVCxPQUFPLENBQ1IsQ0FBQztRQUNGLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUMxQyxDQUFDO1NBQ0gsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDckM7S0FDRjs7Ozs7SUFHRCx5Q0FBTzs7OztjQUFDLEtBQVU7UUFDaEIsSUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRO1lBQ2pDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUNqQyxFQUFFO1lBQ0EsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7SUFJZCx1Q0FBSzs7OztjQUFDLEtBQVU7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN4QjtRQUVELElBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQ25ELEVBQUU7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjs7Ozs7SUFHSCw2Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7S0FDRjs7OztJQUVELHNDQUFJOzs7SUFBSjtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3ZDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUMxQyxDQUFDO1FBQ0YsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFDRSxRQUFRO2dCQUNSLFFBQVEsQ0FBQyxJQUFJO2dCQUNiLEtBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FDM0MsRUFBRTtnQkFDQSxLQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1RDtZQUNELEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztTQUM1QixFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3REOztnQkF4SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSwyTUFNVDtvQkFDRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLElBQUk7d0JBQ2QsbUJBQW1CLEVBQUUsTUFBTTtxQkFDNUI7aUJBQ0Y7Ozs7Z0JBckJDLFlBQVk7Z0JBVFosVUFBVTtnQkFJVixTQUFTOzs7NEJBd0VSLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBYWhDLFlBQVksU0FBQyxvQkFBb0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7a0NBM0ZoRDs7Ozs7OztBQ0FBOzs7O0lBNERFLGdDQUFZLE9BQW1CLEVBQUUsUUFBbUI7d0JBRi9CLEtBQUs7UUFHeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7S0FDMUI7SUFsREQsc0JBQUksOENBQVU7Ozs7UUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN6Qjs7Ozs7UUFFRCxVQUFlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7O1NBRTFCOzs7T0FMQTtJQU9ELHNCQUFJLDJDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBRUQsVUFBWSxLQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsS0FBRyxVQUFVLENBQUMsRUFBSSxDQUNuQixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQixLQUFHLFVBQVUsQ0FBQyxFQUFJLENBQ25CLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWixJQUFJLEtBQUssRUFBRTtvQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLEtBQUcsVUFBVSxDQUFDLElBQU0sQ0FDckIsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQzFCLEtBQUcsVUFBVSxDQUFDLElBQU0sQ0FDckIsQ0FBQztpQkFDSDthQUNGO1NBQ0Y7OztPQTVCQTs7OztJQXlDRCx5Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQixLQUFHLFVBQVUsQ0FBQyxJQUFNLENBQ3JCLENBQUM7WUFDRixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztLQUNyQjs7Z0JBbkVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsR0FBRztvQkFDYixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRTtpQkFDckM7Ozs7Z0JBWG1CLFVBQVU7Z0JBQVUsU0FBUzs7aUNBQWpEOzs7Ozs7O0FDaUJBLHFCQUFNLG1CQUFtQixHQUFHLEdBQUcsQ0FBQztBQUNoQyxxQkFBTSw0QkFBNEIsR0FBRyxHQUFHLENBQUM7Ozs7O0lBK0R2Qyx3QkFBb0IsUUFBb0IsRUFDNUIsaUJBQW1DLEVBQzNCLFdBQ1IsR0FBMkI7UUFIbkIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUVwQixjQUFTLEdBQVQsU0FBUzs7OztzQkE3Q1UsSUFBSSxZQUFZLEVBQWtCOzs7Ozt1QkFLakMsSUFBSSxZQUFZLEVBQWtCOzs7OztzQkFLbkMsSUFBSSxZQUFZLEVBQWtCOzs7Ozt3QkFLaEMsSUFBSSxZQUFZLEVBQWtCO3dCQWF0RCxLQUFLO2lDQUVJLEtBQUs7bUNBQ0gsQ0FBQzs4QkFDTixDQUFDOzhCQUVJLENBQUM7K0JBQ0EsQ0FBQzt3QkFNZixLQUFLO1FBTXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FDL0IsUUFBUSxFQUNSLGlCQUFpQixFQUNqQixTQUFTLENBQ1YsQ0FBQztLQUNIOzBCQTlERyxrQ0FBTTs7OztRQUlWO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCOzs7Ozs7a0JBTlUsSUFBa0I7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQWdDdEMsc0JBQUksbUNBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7O09BQUE7Ozs7O0lBOEJELGdDQUFPOzs7O2NBQUMsS0FBVTtRQUNoQixJQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVE7WUFDakMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQ2pDLEVBQUU7WUFDQSxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxRQUFRLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7O0lBS25CLDhCQUFLOzs7O2NBQUMsS0FBVTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7Ozs7O0lBR0gsb0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7S0FDRjs7OztJQUVELGlDQUFROzs7SUFBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxVQUFVLENBQUM7WUFDVCxJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUNyQixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtTQUNGLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDUDs7Ozs7OztJQUtELCtCQUFNOzs7O0lBQU47UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNsRDs7Ozs7O0lBR0QsNkJBQUk7Ozs7SUFBSjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRW5DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSUEsVUFBUSxJQUFJQSxVQUFRLENBQUMsSUFBSSxFQUFFO1lBQzdCLElBQUlBLFVBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDQSxVQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6RDtTQUNGO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNoQixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEIsQ0FBQyxDQUFDO0tBQ0o7Ozs7Ozs7SUFHRCw2QkFBSTs7Ozs7SUFBSixVQUFLLEtBQWE7UUFBbEIsaUJBOEJDO1FBN0JDLElBQUksS0FBSyxFQUFFO1lBQ1QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O1FBR3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFFOztRQUdELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQzlCLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEdBQUEsRUFDdEIsbUJBQW1CLENBQ3BCLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xCO0tBQ0Y7Ozs7Ozs7SUFHUyxrQ0FBUzs7Ozs7SUFBbkIsVUFBb0IsTUFBcUI7UUFDdkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN2RDs7Ozs7Ozs7OztJQU1TLG9DQUFXOzs7OztJQUFyQjtRQUFBLGlCQXVEQzs7UUFyREMsSUFDRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVU7WUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsWUFDM0QsRUFBRTs7WUFFQSxJQUFJQSxVQUFRLElBQUlBLFVBQVEsQ0FBQyxJQUFJLEVBQUU7Z0JBQzdCQSxVQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3hEO1NBQ0Y7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLGFBQWEsRUFDYixPQUFPLENBQ1IsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsWUFBWSxFQUNaLE1BQU0sQ0FDUCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixTQUFTLEVBQ1QsT0FBTyxDQUNSLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLFdBQVcsRUFDWCxDQUFDLENBQ0YsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDekIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNDOztRQUdELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkU7UUFFRCxxQkFBTSxrQkFBa0IsR0FBRztZQUN6QixJQUFJLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUN0QixLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQztZQUNELEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1NBQ3pCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3JEO2FBQU07WUFDTCxrQkFBa0IsRUFBRSxDQUFDO1NBQ3RCO0tBQ0Y7Ozs7OztJQUdTLGtDQUFTOzs7O0lBQW5CO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFDM0IsYUFBYSxFQUNiLE1BQU0sQ0FDUCxDQUFDO1FBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixTQUFTLEVBQ1QsTUFBTSxDQUNQLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsQixJQUFJQSxVQUFRLElBQUlBLFVBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDQSxVQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDNUQ7Z0JBQ0QsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZCO1lBQ0QsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO1NBQzFCLENBQUMsQ0FBQztLQUNKOzs7Ozs7Ozs7SUFLUyxxQ0FBWTs7Ozs7SUFBdEIsVUFBdUIsUUFBbUI7UUFBMUMsaUJBNkNDO1FBNUNDLElBQ0UsSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7YUFDbkIsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUNwRCxFQUFFO1lBQ0EsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTO2lCQUNYLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztpQkFDOUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDVixJQUFJLENBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7WUFFN0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQzFCLFFBQVEsRUFBRSxDQUFDO2dCQUVYLE9BQU87YUFDUjtZQUVELFVBQVUsQ0FBQyxRQUFRLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztTQUNwRDthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUV2QyxxQkFBTSxjQUFjLEdBQUc7Z0JBQ3JCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxFQUFFLENBQUM7aUJBQ1o7YUFDRixDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsVUFBVSxDQUMvQixjQUFjLEVBQ2QsNEJBQTRCLENBQzdCLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxjQUFjLEVBQUUsQ0FBQzthQUNsQjtTQUNGO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsUUFBUSxFQUFFLENBQUM7U0FDWjtLQUNGOzs7Ozs7SUFHUyx1Q0FBYzs7OztJQUF4QjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJCUyx3Q0FBZTs7OztJQUF6QjtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxJQUFJLElBQUk7WUFBRSxPQUFPO1FBQzlELHFCQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFO1lBQzdCLE9BQU87U0FDUjtRQUNELGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUN6RDs7Ozs7O0lBR1MseUNBQWdCOzs7O0lBQTFCO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUMzQixhQUFhLEVBQ2IsRUFBRSxDQUNILENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQzNCLGNBQWMsRUFDZCxFQUFFLENBQ0gsQ0FBQztLQUNIOzs7Ozs7O0lBSVMsdUNBQWM7Ozs7SUFBeEI7UUFDRSxJQUFJLENBQUMsaUJBQWlCLEdBQUdBLFVBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHQyxRQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDaEQ7Ozs7SUFFUyxxQ0FBWTs7O0lBQXRCO1FBQ0UsSUFBSSxDQUFDRCxVQUFRLEVBQUU7WUFDYixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsUUFBUSxDQUNqQ0MsUUFBTTthQUNILGdCQUFnQixDQUFDRCxVQUFRLENBQUMsSUFBSSxDQUFDO2FBQy9CLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFDekMsRUFBRSxDQUNILENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMxQkEsVUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFNLElBQUksQ0FBQyxtQkFBbUI7Z0JBQzlELElBQUksQ0FBQyxjQUFjLE9BQUksQ0FBQztTQUN6QjtLQUNGOzs7O0lBRVMsdUNBQWM7OztJQUF4QjtRQUNFQSxVQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztLQUNwRTs7Ozs7SUFHUywwQ0FBaUI7OztJQUEzQjtRQUNFLHFCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUNBLFVBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQscUJBQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztRQUNyRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQ0EsVUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyRCxPQUFPLGNBQWMsQ0FBQztLQUN2Qjs7Z0JBbmFGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLFVBQVU7aUJBQ3JCOzs7O2dCQWxCMEIsVUFBVTtnQkFDRyxnQkFBZ0I7Z0JBQTNCLFNBQVM7Z0JBUVosc0JBQXNCOzs7MkJBWTdDLEtBQUs7MkJBVUwsTUFBTTs0QkFLTixNQUFNOzJCQUtOLE1BQU07NkJBS04sTUFBTTs0QkF3Q04sWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzswQkFjaEMsWUFBWSxTQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7eUJBMUd6Qzs7Ozs7OztBQ0FBO0lBNENFLHdCQUFZLGVBQWlDLEVBQVUsR0FBMkI7UUFBM0IsUUFBRyxHQUFILEdBQUcsQ0FBd0I7O3NCQXJCM0QsbUJBQW1CO3NCQUVkLElBQUksWUFBWSxFQUFFO3VCQUNqQixJQUFJLFlBQVksRUFBRTtzQkFDbkIsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLElBQUksWUFBWSxFQUFFO2lDQUVsQixLQUFLO21DQUNILENBQUM7OEJBRU4sQ0FBQzsyQkFJTixDQUFDO2lDQUNLLEVBQUU7dUJBRWdDLEVBQUU7UUFLOUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FDMUMsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDN0Q7Ozs7Ozs7O0lBR0QsNkJBQUk7Ozs7OztJQUFKLFVBQUssT0FBd0MsRUFBRSxNQUFxQjtRQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDOzs7OztJQUVELDZCQUFJOzs7O0lBQUosVUFBSyxLQUFhO1FBQWxCLGlCQVVDO1FBVEMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEUsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRUQsc0NBQWE7OztJQUFiO1FBQ0UscUJBQU0saUJBQWlCLEdBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQztRQUM1RCxxQkFBTSxlQUFlLEdBQ25CLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUUxRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0QixJQUFJLGlCQUFpQixJQUFJLGVBQWUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLGVBQWU7cUJBQ2pCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztxQkFDOUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztxQkFDVixJQUFJLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO2FBQ3ZEO1NBQ0Y7S0FDRjs7OztJQUVELHNDQUFhOzs7SUFBYjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUMxQyxxQkFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUMxRSxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQUUsR0FBQSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQ25EOzs7OztJQUVELG1DQUFVOzs7O0lBQVYsVUFBVyxPQUFZO1FBQ3JCLHFCQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzFELHFCQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLHFCQUFNLGlCQUFpQixHQUFHLFdBQVc7YUFDbEMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3pELE9BQU8sQ0FBQyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDO2FBQ3RELE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUMvQixFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ1YsSUFBSSxDQUFDLEVBQUMsT0FBTyxTQUFBLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNuSCxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6RCxVQUFVLENBQUMsSUFBSSxHQUFHO1lBQ2hCLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuQyxDQUFDO1FBQ0YsVUFBVSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxJQUFJLENBQUM7UUFFN0QsT0FBTyxVQUFVLENBQUM7S0FDbkI7Ozs7O0lBRUQsbUNBQVU7Ozs7SUFBVixVQUFXLEtBQWE7UUFDdEIscUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksV0FBVyxFQUFFO1lBQ2YsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7SUFFRCx1Q0FBYzs7O0lBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDekI7Ozs7O0lBRUQseUNBQWdCOzs7O0lBQWhCLFVBQWlCLE1BQWM7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztLQUNqQzs7OztJQUVELHVDQUFjOzs7SUFBZDtRQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDekI7Ozs7Ozs7O0lBS0QsdUNBQWM7Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7S0FDaEQ7Ozs7SUFFRCxxQ0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FDakMsTUFBTTthQUNILGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDL0IsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxFQUMzQyxFQUFFLENBQ0gsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBTSxJQUFJLENBQUMsbUJBQW1CO2dCQUM1RCxJQUFJLENBQUMsY0FBYyxPQUFJLENBQUM7U0FDM0I7S0FDRjs7OztJQUVPLHVDQUFjOzs7O1FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBTSxJQUFJLENBQUMsbUJBQW1CLE9BQUksQ0FBQzs7Ozs7SUFJN0QsMENBQWlCOzs7O1FBQ3ZCLHFCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxxQkFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFckQsT0FBTyxjQUFjLENBQUM7Ozs7O0lBR2hCLHVDQUFjOzs7O1FBQ3BCLHFCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FDbEMsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUdwQixzQ0FBYTs7OztjQUFDLEtBQWE7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDbEIsVUFBQyxNQUFnRCxFQUFFLENBQVM7WUFDMUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQixDQUNGLENBQUM7Ozs7Ozs7SUFHSSxrQ0FBUzs7Ozs7Y0FBQyxJQUF1QixFQUFFLEVBQXFCOztRQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2IsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7OztnQkE1TE4sVUFBVTs7OztnQkFkVCxnQkFBZ0I7Z0JBR1Esc0JBQXNCOzt5QkFUaEQ7Ozs7Ozs7QUNBQTs7Ozs7O0lBbUJTLG1CQUFPOzs7SUFBZDtRQUNFLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUM7U0FDeEUsQ0FBQztLQUNIOztnQkFmRixRQUFRLFNBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLHNCQUFzQjt3QkFDdEIsY0FBYzt3QkFDZCx1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQWMsQ0FBQztvQkFDakQsZUFBZSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsdUJBQXVCLENBQUM7aUJBQ25FOztzQkFqQkQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ })

}]);
//# sourceMappingURL=views-Administration-administration-module~views-candidats-candidats-module~views-entretien-entretie~ca788b13.js.map