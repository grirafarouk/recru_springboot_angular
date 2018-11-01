(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-Administration-administration-module~views-candidats-candidats-module~views-candidats-listeEnt~a2384317"],{

/***/ "./node_modules/angular2-text-mask/dist/angular2TextMask.js":
/*!******************************************************************!*\
  !*** ./node_modules/angular2-text-mask/dist/angular2TextMask.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var forms_1 = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var platform_browser_1 = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var textMaskCore_1 = __webpack_require__(/*! text-mask-core/dist/textMaskCore */ "./node_modules/text-mask-core/dist/textMaskCore.js");
var TextMaskConfig = /** @class */ (function () {
    function TextMaskConfig() {
    }
    return TextMaskConfig;
}());
exports.TextMaskConfig = TextMaskConfig;
exports.MASKEDINPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MaskedInputDirective; }),
    multi: true
};
/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function _isAndroid() {
    var userAgent = platform_browser_1.ɵgetDOM() ? platform_browser_1.ɵgetDOM().getUserAgent() : '';
    return /android (\d+)/.test(userAgent.toLowerCase());
}
var MaskedInputDirective = /** @class */ (function () {
    function MaskedInputDirective(_renderer, _elementRef, _compositionMode) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._compositionMode = _compositionMode;
        this.textMaskConfig = {
            mask: [],
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
        };
        this.onChange = function (_) { };
        this.onTouched = function () { };
        /** Whether the user is creating a composition string (IME events). */
        this._composing = false;
        if (this._compositionMode == null) {
            this._compositionMode = !_isAndroid();
        }
    }
    MaskedInputDirective.prototype.ngOnChanges = function (changes) {
        this._setupMask(true);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    };
    MaskedInputDirective.prototype.writeValue = function (value) {
        this._setupMask();
        // set the initial value for cases where the mask is disabled
        var normalizedValue = value == null ? '' : value;
        this._renderer.setProperty(this.inputElement, 'value', normalizedValue);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
        }
    };
    MaskedInputDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    MaskedInputDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    MaskedInputDirective.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    MaskedInputDirective.prototype._handleInput = function (value) {
        if (!this._compositionMode || (this._compositionMode && !this._composing)) {
            this._setupMask();
            if (this.textMaskInputElement !== undefined) {
                this.textMaskInputElement.update(value);
                // get the updated value
                value = this.inputElement.value;
                this.onChange(value);
            }
        }
    };
    MaskedInputDirective.prototype._setupMask = function (create) {
        if (create === void 0) { create = false; }
        if (!this.inputElement) {
            if (this._elementRef.nativeElement.tagName.toUpperCase() === 'INPUT') {
                // `textMask` directive is used directly on an input element
                this.inputElement = this._elementRef.nativeElement;
            }
            else {
                // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
                this.inputElement = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0];
            }
        }
        if (this.inputElement && create) {
            this.textMaskInputElement = textMaskCore_1.createTextMaskInputElement(Object.assign({ inputElement: this.inputElement }, this.textMaskConfig));
        }
    };
    MaskedInputDirective.prototype._compositionStart = function () { this._composing = true; };
    MaskedInputDirective.prototype._compositionEnd = function (value) {
        this._composing = false;
        this._compositionMode && this._handleInput(value);
    };
    MaskedInputDirective.decorators = [
        { type: core_1.Directive, args: [{
                    host: {
                        '(input)': '_handleInput($event.target.value)',
                        '(blur)': 'onTouched()',
                        '(compositionstart)': '_compositionStart()',
                        '(compositionend)': '_compositionEnd($event.target.value)'
                    },
                    selector: '[textMask]',
                    exportAs: 'textMask',
                    providers: [exports.MASKEDINPUT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    MaskedInputDirective.ctorParameters = function () { return [
        { type: core_1.Renderer2, },
        { type: core_1.ElementRef, },
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [forms_1.COMPOSITION_BUFFER_MODE,] },] },
    ]; };
    MaskedInputDirective.propDecorators = {
        'textMaskConfig': [{ type: core_1.Input, args: ['textMask',] },],
    };
    return MaskedInputDirective;
}());
exports.MaskedInputDirective = MaskedInputDirective;
var TextMaskModule = /** @class */ (function () {
    function TextMaskModule() {
    }
    TextMaskModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [MaskedInputDirective],
                    exports: [MaskedInputDirective]
                },] },
    ];
    /** @nocollapse */
    TextMaskModule.ctorParameters = function () { return []; };
    return TextMaskModule;
}());
exports.TextMaskModule = TextMaskModule;
var textMaskCore_2 = __webpack_require__(/*! text-mask-core/dist/textMaskCore */ "./node_modules/text-mask-core/dist/textMaskCore.js");
exports.conformToMask = textMaskCore_2.conformToMask;
//# sourceMappingURL=angular2TextMask.js.map

/***/ }),

/***/ "./node_modules/ngx-mask/fesm5/ngx-mask.js":
/*!*************************************************!*\
  !*** ./node_modules/ngx-mask/fesm5/ngx-mask.js ***!
  \*************************************************/
/*! exports provided: config, NEW_CONFIG, INITIAL_CONFIG, initialConfig, MaskDirective, MaskService, _configFactory, NgxMaskModule, MaskPipe, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_CONFIG", function() { return NEW_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INITIAL_CONFIG", function() { return INITIAL_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialConfig", function() { return initialConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskDirective", function() { return MaskDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskService", function() { return MaskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_configFactory", function() { return _configFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxMaskModule", function() { return NgxMaskModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaskPipe", function() { return MaskPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return MaskApplierService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");





/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var config = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('config');
/** @type {?} */
var NEW_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('NEW_CONFIG');
/** @type {?} */
var INITIAL_CONFIG = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('INITIAL_CONFIG');
/** @type {?} */
var initialConfig = {
    sufix: '',
    prefix: '',
    clearIfNotMatch: false,
    showTemplate: false,
    showMaskTyped: false,
    dropSpecialCharacters: true,
    specialCharacters: ['/', '(', ')', '.', ':', '-', ' ', '+', ',', '@', '[', ']'],
    patterns: {
        '0': {
            pattern: new RegExp('\\d'),
        },
        '9': {
            pattern: new RegExp('\\d'),
            optional: true
        },
        'A': {
            pattern: new RegExp('\[a-zA-Z0-9\]')
        },
        'S': {
            pattern: new RegExp('\[a-zA-Z\]')
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MaskApplierService = /** @class */ (function () {
    function MaskApplierService(_config) {
        this._config = _config;
        this.maskExpression = '';
        this._shift = new Set();
        this.maskSpecialCharacters = /** @type {?} */ ((this._config)).specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.clearIfNotMatch = this._config.clearIfNotMatch;
        this.dropSpecialCharacters = this._config.dropSpecialCharacters;
        this.maskSpecialCharacters = /** @type {?} */ ((this._config)).specialCharacters;
        this.maskAvailablePatterns = this._config.patterns;
        this.prefix = this._config.prefix;
        this.sufix = this._config.sufix;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskApplierService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        if (inputValue === undefined || inputValue === null || maskExpression === undefined) {
            return '';
        }
        /** @type {?} */
        var cursor = 0;
        /** @type {?} */
        var result = "";
        /** @type {?} */
        var multi = false;
        if (inputValue.slice(0, this.prefix.length) === this.prefix) {
            inputValue = inputValue.slice(this.prefix.length, inputValue.length);
        }
        /** @type {?} */
        var inputArray = inputValue.toString()
            .split('');
        // tslint:disable-next-line
        for (var i = 0, inputSymbol = inputArray[0]; i
            < inputArray.length; i++, inputSymbol = inputArray[i]) {
            if (cursor === maskExpression.length) {
                break;
            }
            if (this._checkSymbolMask(inputSymbol, maskExpression[cursor]) && maskExpression[cursor + 1] === '?') {
                result += inputSymbol;
                cursor += 2;
            }
            else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])
                && maskExpression[cursor + 1]
                    === '*') {
                result += inputSymbol;
                multi = true;
            }
            else if (maskExpression[cursor + 1] === '*' && multi
                && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                result += inputSymbol;
                cursor += 3;
                multi = false;
            }
            else if (maskExpression[cursor + 1] === '?' && this._checkSymbolMask(inputSymbol, maskExpression[cursor + 2])) {
                result += inputSymbol;
                cursor += 3;
            }
            else if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
                result += inputSymbol;
                cursor++;
            }
            else if (this.maskSpecialCharacters.indexOf(maskExpression[cursor]) !== -1) {
                result += maskExpression[cursor];
                cursor++;
                /** @type {?} */
                var shiftStep = /\*|\?/g.test(maskExpression.slice(0, cursor))
                    ? inputArray.length
                    : cursor;
                this._shift.add(shiftStep + this.prefix.length || 0);
                i--;
            }
            else if (this.maskSpecialCharacters.indexOf(inputSymbol) > -1
                && this.maskAvailablePatterns[maskExpression[cursor]]
                && this.maskAvailablePatterns[maskExpression[cursor]].optional) {
                cursor++;
                i--;
            }
        }
        if (result.length + 1 === maskExpression.length
            && this.maskSpecialCharacters.indexOf(maskExpression[maskExpression.length - 1]) !== -1) {
            result += maskExpression[maskExpression.length - 1];
        }
        /** @type {?} */
        var shift = 1;
        /** @type {?} */
        var newPosition = position + 1;
        while (this._shift.has(newPosition)) {
            shift++;
            newPosition++;
        }
        cb(this._shift.has(position) ? shift : 0);
        return this.prefix + result;
    };
    /**
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    MaskApplierService.prototype._checkSymbolMask = /**
     * @param {?} inputSymbol
     * @param {?} maskSymbol
     * @return {?}
     */
    function (inputSymbol, maskSymbol) {
        return inputSymbol === maskSymbol
            || this.maskAvailablePatterns[maskSymbol]
                && this.maskAvailablePatterns[maskSymbol].pattern
                && this.maskAvailablePatterns[maskSymbol].pattern.test(inputSymbol);
    };
    MaskApplierService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    /** @nocollapse */
    MaskApplierService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [config,] }] }
    ]; };
    return MaskApplierService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MaskService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(MaskService, _super);
    function MaskService(
    // tslint:disable-next-line
    document, _config, _elementRef, _renderer) {
        var _this = _super.call(this, _config) || this;
        _this.document = document;
        _this._config = _config;
        _this._elementRef = _elementRef;
        _this._renderer = _renderer;
        _this.maskExpression = '';
        _this.isNumberValue = false;
        _this.showMaskTyped = false;
        _this.maskIsShown = '';
        _this.onChange = function (_) { };
        _this.onTouch = function () { };
        _this._formElement = _this._elementRef.nativeElement;
        return _this;
    }
    /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyMask = /**
     * @param {?} inputValue
     * @param {?} maskExpression
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (inputValue, maskExpression, position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        this.maskIsShown = this.showMaskTyped
            ? this.maskExpression.replace(/[0-9]/g, '_')
            : '';
        if (!inputValue) {
            return this.prefix + this.maskIsShown;
        }
        /** @type {?} */
        var result = _super.prototype.applyMask.call(this, inputValue, maskExpression, position, cb);
        Array.isArray(this.dropSpecialCharacters)
            ? this.onChange(this._removeMask(this._removePrefix(result), this.dropSpecialCharacters))
            : this.dropSpecialCharacters === true
                ? this.onChange(this.isNumberValue
                    ? Number(this._removeMask(this._removePrefix(result), this.maskSpecialCharacters))
                    : this._removeMask(this._removePrefix(result), this.maskSpecialCharacters))
                : this.onChange(this._removePrefix(result));
        /** @type {?} */
        var ifMaskIsShown = '';
        if (!this.showMaskTyped) {
            return result;
        }
        /** @type {?} */
        var resLen = result.length;
        /** @type {?} */
        var prefNmask = this.prefix + this.maskIsShown;
        ifMaskIsShown = prefNmask.slice(resLen);
        return result + ifMaskIsShown;
    };
    /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    MaskService.prototype.applyValueChanges = /**
     * @param {?=} position
     * @param {?=} cb
     * @return {?}
     */
    function (position, cb) {
        if (position === void 0) { position = 0; }
        if (cb === void 0) { cb = function () { }; }
        /** @type {?} */
        var maskedInput = this.applyMask(this._formElement.value, this.maskExpression, position, cb);
        this._formElement.value = maskedInput;
        if (this._formElement === this.document.activeElement) {
            return;
        }
        this.clearIfNotMatchFn();
    };
    /**
     * @return {?}
     */
    MaskService.prototype.showMaskInInput = /**
     * @return {?}
     */
    function () {
        if (this.showMaskTyped) {
            this.maskIsShown = this.maskExpression.replace(/[0-9]/g, '_');
        }
    };
    /**
     * @return {?}
     */
    MaskService.prototype.clearIfNotMatchFn = /**
     * @return {?}
     */
    function () {
        if (this.clearIfNotMatch === true &&
            this.maskExpression.length !== this._formElement.value.length) {
            this.formElementProperty = ['value', ''];
            this.applyMask(this._formElement.value, this.maskExpression);
        }
    };
    Object.defineProperty(MaskService.prototype, "formElementProperty", {
        set: /**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__read"])(_a, 2), name = _b[0], value = _b[1];
            this._renderer.setProperty(this._formElement, name, value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._removeMask = /**
     * @param {?} value
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (value, specialCharactersForRemove) {
        return value
            ? value.replace(this._regExpForRemove(specialCharactersForRemove), '')
            : value;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MaskService.prototype._removePrefix = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.prefix) {
            return value;
        }
        return value ? value.replace(this.prefix, '') : value;
    };
    /**
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    MaskService.prototype._regExpForRemove = /**
     * @param {?} specialCharactersForRemove
     * @return {?}
     */
    function (specialCharactersForRemove) {
        return new RegExp(specialCharactersForRemove.map(function (item) { return "\\" + item; }).join('|'), 'gi');
    };
    MaskService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] }
    ];
    /** @nocollapse */
    MaskService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"],] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [config,] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"] }
    ]; };
    return MaskService;
}(MaskApplierService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MaskDirective = /** @class */ (function () {
    function MaskDirective(
    // tslint:disable-next-line
    document, _maskService) {
        this.document = document;
        this._maskService = _maskService;
        this._position = null;
        this.onChange = function (_) { };
        this.onTouch = function () { };
    }
    Object.defineProperty(MaskDirective.prototype, "maskExpression", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskValue = value || '';
            if (!this._maskValue) {
                return;
            }
            this._maskService.maskExpression = this._maskValue;
            this._maskService.formElementProperty = [
                'value',
                this._maskService.applyMask(this._inputValue, this._maskService.maskExpression)
            ];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "specialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value ||
                !Array.isArray(value) ||
                (Array.isArray(value) && !value.length)) {
                return;
            }
            this._maskService.maskSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "patterns", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.maskAvailablePatterns = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "prefix", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.prefix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "sufix", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.sufix = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "dropSpecialCharacters", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.dropSpecialCharacters = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "showMaskTyped", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                return;
            }
            this._maskService.showMaskTyped = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "showTemplate", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.showTemplate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaskDirective.prototype, "clearIfNotMatch", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maskService.clearIfNotMatch = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onInput = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = /** @type {?} */ (e.target);
        this._inputValue = el.value;
        if (!this._maskValue) {
            this.onChange(el.value);
            return;
        }
        /** @type {?} */
        var position = /** @type {?} */ (el.selectionStart);
        /** @type {?} */
        var caretShift = 0;
        this._maskService.applyValueChanges(position, function (shift) { return (caretShift = shift); });
        // only set the selection if the element is active
        if (this.document.activeElement !== el) {
            return;
        }
        el.selectionStart = el.selectionEnd =
            this._position !== null
                ? this._position
                : position +
                    // tslint:disable-next-line
                    ((/** @type {?} */ (e)).inputType === 'deleteContentBackward' ? 0 : caretShift);
        this._position = null;
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this._maskService.clearIfNotMatchFn();
        this.onTouch();
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.onFocus = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var el = /** @type {?} */ (e.target);
        if (el !== null && el.selectionStart !== null &&
            el.selectionStart === el.selectionEnd &&
            el.selectionStart > this._maskService.prefix.length &&
            // tslint:disable-next-line
            (/** @type {?} */ (e)).keyCode !== 38) {
            return;
        }
        if (!this._maskService.prefix) {
            return;
        }
        e.preventDefault();
        el.selectionStart = el.selectionEnd = this._maskService.prefix.length;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    MaskDirective.prototype.a = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 8) {
            this.onFocus(e);
        }
    };
    /**
     * @return {?}
     */
    MaskDirective.prototype.onPaste = /**
     * @return {?}
     */
    function () {
        this._position = Number.MAX_SAFE_INTEGER;
    };
    /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    MaskDirective.prototype.writeValue = /**
     * It writes the value in the input
     * @param {?} inputValue
     * @return {?}
     */
    function (inputValue) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__generator"])(this, function (_a) {
                if (inputValue === undefined) {
                    return [2 /*return*/];
                }
                if (typeof inputValue === 'number') {
                    inputValue = String(inputValue);
                    this._maskService.isNumberValue = true;
                }
                inputValue && this._maskService.maskExpression ||
                    this._maskService.maskExpression && (this._maskService.prefix || this.showMaskTyped)
                    ? (this._maskService.formElementProperty = [
                        'value',
                        this._maskService.applyMask(inputValue, this._maskService.maskExpression)
                    ])
                    : (this._maskService.formElementProperty = ['value', inputValue]);
                this._inputValue = inputValue;
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
        this._maskService.onChange = this.onChange;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MaskDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouch = fn;
    };
    /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    MaskDirective.prototype.setDisabledState = /**
     * It disables the input element
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this._maskService.formElementProperty = ['disabled', isDisabled];
    };
    MaskDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[mask]',
                    providers: [
                        {
                            provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return MaskDirective; }),
                            multi: true
                        },
                        MaskService
                    ]
                },] }
    ];
    /** @nocollapse */
    MaskDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"],] }] },
        { type: MaskService }
    ]; };
    MaskDirective.propDecorators = {
        maskExpression: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['mask',] }],
        specialCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        patterns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        prefix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        sufix: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        dropSpecialCharacters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        showMaskTyped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        showTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        clearIfNotMatch: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        onInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['input', ['$event'],] }],
        onBlur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['blur',] }],
        onFocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['click', ['$event'],] }],
        a: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['keydown', ['$event'],] }],
        onPaste: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['paste',] }]
    };
    return MaskDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MaskPipe = /** @class */ (function () {
    function MaskPipe(_maskService) {
        this._maskService = _maskService;
    }
    /**
     * @param {?} value
     * @param {?} mask
     * @return {?}
     */
    MaskPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} mask
     * @return {?}
     */
    function (value, mask) {
        if (!value) {
            return '';
        }
        return this._maskService.applyMask("" + value, mask);
    };
    MaskPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
                    name: 'mask',
                    pure: true
                },] }
    ];
    /** @nocollapse */
    MaskPipe.ctorParameters = function () { return [
        { type: MaskApplierService }
    ]; };
    return MaskPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMaskModule = /** @class */ (function () {
    function NgxMaskModule() {
    }
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forRoot = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
            providers: [
                {
                    provide: NEW_CONFIG,
                    useValue: configValue
                },
                {
                    provide: INITIAL_CONFIG,
                    useValue: initialConfig
                },
                {
                    provide: config,
                    useFactory: _configFactory,
                    deps: [INITIAL_CONFIG, NEW_CONFIG]
                },
            ]
        };
    };
    /**
     * @param {?=} configValue
     * @return {?}
     */
    NgxMaskModule.forChild = /**
     * @param {?=} configValue
     * @return {?}
     */
    function (configValue) {
        return {
            ngModule: NgxMaskModule,
        };
    };
    NgxMaskModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    providers: [MaskApplierService],
                    exports: [MaskDirective, MaskPipe],
                    declarations: [MaskDirective, MaskPipe]
                },] }
    ];
    return NgxMaskModule;
}());
/**
 * \@internal
 * @param {?} initConfig
 * @param {?} configValue
 * @return {?}
 */
function _configFactory(initConfig, configValue) {
    return (typeof configValue === 'function') ? configValue() : Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, initConfig, configValue);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hc2suanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC1tYXNrL2FwcC9uZ3gtbWFzay9jb25maWcudHMiLCJuZzovL25neC1tYXNrL2FwcC9uZ3gtbWFzay9tYXNrLWFwcGxpZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LW1hc2svYXBwL25neC1tYXNrL21hc2suc2VydmljZS50cyIsIm5nOi8vbmd4LW1hc2svYXBwL25neC1tYXNrL21hc2suZGlyZWN0aXZlLnRzIiwibmc6Ly9uZ3gtbWFzay9hcHAvbmd4LW1hc2svbWFzay5waXBlLnRzIiwibmc6Ly9uZ3gtbWFzay9hcHAvbmd4LW1hc2svbmd4LW1hc2subW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XG4gICAgc3VmaXg6IHN0cmluZztcbiAgICBwcmVmaXg6IHN0cmluZztcbiAgICBjbGVhcklmTm90TWF0Y2g6IGJvb2xlYW47XG4gICAgc2hvd1RlbXBsYXRlOiBib29sZWFuO1xuICAgIHNob3dNYXNrVHlwZWQ6IGJvb2xlYW47XG4gICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBib29sZWFuIHwgc3RyaW5nW107XG4gICAgc3BlY2lhbENoYXJhY3RlcnM6IHN0cmluZ1tdO1xuICAgIHBhdHRlcm5zOiB7XG4gICAgICAgIFtjaGFyYWN0ZXI6IHN0cmluZ106IHtcbiAgICAgICAgICAgIHBhdHRlcm46IFJlZ0V4cCxcbiAgICAgICAgICAgIG9wdGlvbmFsPzogYm9vbGVhblxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHR5cGUgb3B0aW9uc0NvbmZpZyA9IFBhcnRpYWw8SUNvbmZpZz47XG5leHBvcnQgY29uc3QgY29uZmlnOiBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+ID0gbmV3IEluamVjdGlvblRva2VuKCdjb25maWcnKTtcbmV4cG9ydCBjb25zdCBORVdfQ09ORklHOiBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+ID0gbmV3IEluamVjdGlvblRva2VuKCdORVdfQ09ORklHJyk7XG5leHBvcnQgY29uc3QgSU5JVElBTF9DT05GSUc6IEluamVjdGlvblRva2VuPElDb25maWc+ID0gbmV3IEluamVjdGlvblRva2VuKCdJTklUSUFMX0NPTkZJRycpO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbENvbmZpZzogSUNvbmZpZyA9IHtcbiAgICBzdWZpeDogJycsXG4gICAgcHJlZml4OiAnJyxcbiAgICBjbGVhcklmTm90TWF0Y2g6IGZhbHNlLFxuICAgIHNob3dUZW1wbGF0ZTogZmFsc2UsXG4gICAgc2hvd01hc2tUeXBlZDogZmFsc2UsXG4gICAgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiB0cnVlLFxuICAgIHNwZWNpYWxDaGFyYWN0ZXJzOiBbJy8nLCAnKCcsICcpJywgJy4nLCAnOicsICctJywgJyAnLCAnKycsICcsJywgJ0AnLCAnWycsICddJ10sXG4gICAgcGF0dGVybnM6IHtcbiAgICAgICAgJzAnOiB7XG4gICAgICAgICAgICBwYXR0ZXJuOiBuZXcgUmVnRXhwKCdcXFxcZCcpLFxuICAgICAgICB9LFxuICAgICAgICAnOSc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcXFxkJyksXG4gICAgICAgICAgICBvcHRpb25hbDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICAnQSc6IHtcbiAgICAgICAgICAgIHBhdHRlcm46IG5ldyBSZWdFeHAoJ1xcW2EtekEtWjAtOVxcXScpXG4gICAgICAgIH0sXG4gICAgICAgICdTJzoge1xuICAgICAgICAgICAgcGF0dGVybjogbmV3IFJlZ0V4cCgnXFxbYS16QS1aXFxdJylcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hc2tBcHBsaWVyU2VydmljZSB7XG5cbiAgICBwdWJsaWMgZHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBJQ29uZmlnWydkcm9wU3BlY2lhbENoYXJhY3RlcnMnXTtcbiAgICBwdWJsaWMgc2hvd1RlbXBsYXRlOiBJQ29uZmlnWydzaG93VGVtcGxhdGUnXTtcbiAgICBwdWJsaWMgY2xlYXJJZk5vdE1hdGNoOiBJQ29uZmlnWydjbGVhcklmTm90TWF0Y2gnXTtcbiAgICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICAgIHB1YmxpYyBtYXNrU3BlY2lhbENoYXJhY3RlcnM6IElDb25maWdbJ3NwZWNpYWxDaGFyYWN0ZXJzJ107XG4gICAgcHVibGljIG1hc2tBdmFpbGFibGVQYXR0ZXJuczogSUNvbmZpZ1sncGF0dGVybnMnXTtcbiAgICBwdWJsaWMgcHJlZml4OiBJQ29uZmlnWydwcmVmaXgnXTtcbiAgICBwdWJsaWMgc3VmaXg6IElDb25maWdbJ3N1Zml4J107XG5cblxuICAgIHByaXZhdGUgX3NoaWZ0OiBTZXQ8bnVtYmVyPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChjb25maWcpIHByb3RlY3RlZCBfY29uZmlnOiBJQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMuX3NoaWZ0ID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZyEuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5fY29uZmlnLnBhdHRlcm5zO1xuXG4gICAgICAgIHRoaXMuY2xlYXJJZk5vdE1hdGNoID0gdGhpcy5fY29uZmlnLmNsZWFySWZOb3RNYXRjaDtcbiAgICAgICAgdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPSB0aGlzLl9jb25maWcuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzO1xuICAgICAgICB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycyA9IHRoaXMuX2NvbmZpZyEuc3BlY2lhbENoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zID0gdGhpcy5fY29uZmlnLnBhdHRlcm5zO1xuICAgICAgICB0aGlzLnByZWZpeCA9IHRoaXMuX2NvbmZpZy5wcmVmaXg7XG4gICAgICAgIHRoaXMuc3VmaXggPSB0aGlzLl9jb25maWcuc3VmaXg7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgYXBwbHlNYXNrKFxuICAgICAgICBpbnB1dFZhbHVlOiBzdHJpbmcsXG4gICAgICAgIG1hc2tFeHByZXNzaW9uOiBzdHJpbmcsXG4gICAgICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgICAgICBjYjogRnVuY3Rpb24gPSAoKSA9PiB7fVxuICAgICAgKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGlucHV0VmFsdWUgPT09IHVuZGVmaW5lZCB8fCBpbnB1dFZhbHVlID09PSBudWxsIHx8IG1hc2tFeHByZXNzaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjdXJzb3I6IG51bWJlciA9IDA7XG4gICAgICAgIGxldCByZXN1bHQ6IHN0cmluZyA9IGBgO1xuICAgICAgICBsZXQgbXVsdGk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBpZiAoaW5wdXRWYWx1ZS5zbGljZSgwLCB0aGlzLnByZWZpeC5sZW5ndGgpID09PSB0aGlzLnByZWZpeCkge1xuICAgICAgICAgICAgaW5wdXRWYWx1ZSA9IGlucHV0VmFsdWUuc2xpY2UodGhpcy5wcmVmaXgubGVuZ3RoLCBpbnB1dFZhbHVlLmxlbmd0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbnB1dEFycmF5OiBzdHJpbmdbXSA9IGlucHV0VmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgLnNwbGl0KCcnKTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMCwgaW5wdXRTeW1ib2w6IHN0cmluZyA9IGlucHV0QXJyYXlbMF07IGlcbiAgICAgICAgPCBpbnB1dEFycmF5Lmxlbmd0aDsgaSsrLCBpbnB1dFN5bWJvbCA9IGlucHV0QXJyYXlbaV0pIHtcbiAgICAgICAgICAgIGlmIChjdXJzb3IgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fY2hlY2tTeW1ib2xNYXNrKGlucHV0U3ltYm9sLCBtYXNrRXhwcmVzc2lvbltjdXJzb3JdKSAmJiBtYXNrRXhwcmVzc2lvbltjdXJzb3IgKyAxXSA9PT0gJz8nKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgICAgICAgIGN1cnNvciArPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2wsIG1hc2tFeHByZXNzaW9uW2N1cnNvcl0pXG4gICAgICAgICAgICAgICAgJiYgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV1cbiAgICAgICAgICAgICAgICA9PT0gJyonKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGlucHV0U3ltYm9sO1xuICAgICAgICAgICAgICAgIG11bHRpID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICcqJyAmJiBtdWx0aVxuICAgICAgICAgICAgICAgICYmIHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl0pXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgICAgICAgICAgbXVsdGkgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWFza0V4cHJlc3Npb25bY3Vyc29yICsgMV0gPT09ICc/JyAmJiB0aGlzLl9jaGVja1N5bWJvbE1hc2soXG4gICAgICAgICAgICAgICAgaW5wdXRTeW1ib2wsXG4gICAgICAgICAgICAgICAgbWFza0V4cHJlc3Npb25bY3Vyc29yICsgMl1cbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgICAgICAgY3Vyc29yICs9IDM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NoZWNrU3ltYm9sTWFzayhpbnB1dFN5bWJvbCwgbWFza0V4cHJlc3Npb25bY3Vyc29yXSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gaW5wdXRTeW1ib2w7XG4gICAgICAgICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubWFza1NwZWNpYWxDaGFyYWN0ZXJzLmluZGV4T2YobWFza0V4cHJlc3Npb25bY3Vyc29yXSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IG1hc2tFeHByZXNzaW9uW2N1cnNvcl07XG4gICAgICAgICAgICAgICAgY3Vyc29yKys7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2hpZnRTdGVwOiBudW1iZXIgPSAvXFwqfFxcPy9nLnRlc3QobWFza0V4cHJlc3Npb24uc2xpY2UoMCwgY3Vyc29yKSlcbiAgICAgICAgICAgICAgICAgICAgPyBpbnB1dEFycmF5Lmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA6IGN1cnNvcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGlmdC5hZGQoc2hpZnRTdGVwICsgdGhpcy5wcmVmaXgubGVuZ3RoIHx8IDApO1xuICAgICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihpbnB1dFN5bWJvbCkgPiAtMVxuICAgICAgICAgICAgICAgICYmIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tFeHByZXNzaW9uW2N1cnNvcl1dXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza0V4cHJlc3Npb25bY3Vyc29yXV0ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IrKztcbiAgICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCArIDEgPT09IG1hc2tFeHByZXNzaW9uLmxlbmd0aFxuICAgICAgICAgICAgJiYgdGhpcy5tYXNrU3BlY2lhbENoYXJhY3RlcnMuaW5kZXhPZihtYXNrRXhwcmVzc2lvblttYXNrRXhwcmVzc2lvbi5sZW5ndGggLSAxXSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gbWFza0V4cHJlc3Npb25bbWFza0V4cHJlc3Npb24ubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hpZnQ6IG51bWJlciA9IDE7XG4gICAgICAgIGxldCBuZXdQb3NpdGlvbjogbnVtYmVyID0gcG9zaXRpb24gKyAxO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9zaGlmdC5oYXMobmV3UG9zaXRpb24pKSB7XG4gICAgICAgICAgICBzaGlmdCsrO1xuICAgICAgICAgICAgbmV3UG9zaXRpb24rKztcbiAgICAgICAgfVxuXG4gICAgICAgIGNiKHRoaXMuX3NoaWZ0Lmhhcyhwb3NpdGlvbikgPyBzaGlmdCA6IDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9jaGVja1N5bWJvbE1hc2soaW5wdXRTeW1ib2w6IHN0cmluZywgbWFza1N5bWJvbDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBpbnB1dFN5bWJvbCA9PT0gbWFza1N5bWJvbFxuICAgICAgICAgICAgfHwgdGhpcy5tYXNrQXZhaWxhYmxlUGF0dGVybnNbbWFza1N5bWJvbF1cbiAgICAgICAgICAgICYmIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdLnBhdHRlcm5cbiAgICAgICAgICAgICYmIHRoaXMubWFza0F2YWlsYWJsZVBhdHRlcm5zW21hc2tTeW1ib2xdLnBhdHRlcm4udGVzdChpbnB1dFN5bWJvbCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRWxlbWVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvbmZpZywgSUNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hc2tBcHBsaWVyU2VydmljZSB9IGZyb20gJy4vbWFzay1hcHBsaWVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFza1NlcnZpY2UgZXh0ZW5kcyBNYXNrQXBwbGllclNlcnZpY2Uge1xuICBwdWJsaWMgbWFza0V4cHJlc3Npb246IHN0cmluZyA9ICcnO1xuICBwdWJsaWMgaXNOdW1iZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd01hc2tUeXBlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgbWFza0lzU2hvd246IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9mb3JtRWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gIHB1YmxpYyBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHt9O1xuICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoY29uZmlnKSBwcm90ZWN0ZWQgX2NvbmZpZzogSUNvbmZpZyxcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgc3VwZXIoX2NvbmZpZyk7XG4gICAgdGhpcy5fZm9ybUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBwdWJsaWMgYXBwbHlNYXNrKFxuICAgIGlucHV0VmFsdWU6IHN0cmluZyxcbiAgICBtYXNrRXhwcmVzc2lvbjogc3RyaW5nLFxuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9XG4gICk6IHN0cmluZyAge1xuICAgIHRoaXMubWFza0lzU2hvd24gPSB0aGlzLnNob3dNYXNrVHlwZWRcbiAgICAgICAgPyB0aGlzLm1hc2tFeHByZXNzaW9uLnJlcGxhY2UoL1swLTldL2csICdfJylcbiAgICAgICAgOiAnJztcbiAgICBpZiAoIWlucHV0VmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgfVxuICAgIGNvbnN0IHJlc3VsdDogc3RyaW5nICA9IHN1cGVyLmFwcGx5TWFzayhcbiAgICAgIGlucHV0VmFsdWUsXG4gICAgICBtYXNrRXhwcmVzc2lvbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgY2JcbiAgICApO1xuICAgIEFycmF5LmlzQXJyYXkodGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMpXG4gICAgICAgID8gdGhpcy5vbkNoYW5nZSh0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpLCB0aGlzLmRyb3BTcGVjaWFsQ2hhcmFjdGVycykpXG4gICAgICAgIDogdGhpcy5kcm9wU3BlY2lhbENoYXJhY3RlcnMgPT09IHRydWVcbiAgICAgICAgID8gdGhpcy5vbkNoYW5nZShcbiAgICAgICAgICB0aGlzLmlzTnVtYmVyVmFsdWVcbiAgICAgICAgICAgICA/IE51bWJlcih0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycykpXG4gICAgICAgICAgICAgOiB0aGlzLl9yZW1vdmVNYXNrKHRoaXMuX3JlbW92ZVByZWZpeChyZXN1bHQpLCB0aGlzLm1hc2tTcGVjaWFsQ2hhcmFjdGVycylcbiAgICAgICAgICAgIClcbiAgICAgICAgIDogdGhpcy5vbkNoYW5nZSh0aGlzLl9yZW1vdmVQcmVmaXgocmVzdWx0KSk7XG4gICAgICAgICAgbGV0IGlmTWFza0lzU2hvd246IHN0cmluZyA9ICcnO1xuICAgICAgICAgIGlmICghdGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCByZXNMZW46IG51bWJlciA9IHJlc3VsdC5sZW5ndGg7XG4gICAgICAgICAgY29uc3QgcHJlZk5tYXNrOiBzdHJpbmcgPSB0aGlzLnByZWZpeCArIHRoaXMubWFza0lzU2hvd247XG4gICAgICAgICAgaWZNYXNrSXNTaG93biA9IHByZWZObWFzay5zbGljZShyZXNMZW4pO1xuICAgIHJldHVybiByZXN1bHQgKyBpZk1hc2tJc1Nob3duO1xuICB9XG5cbiAgcHVibGljIGFwcGx5VmFsdWVDaGFuZ2VzKFxuICAgIHBvc2l0aW9uOiBudW1iZXIgPSAwLFxuICAgIGNiOiBGdW5jdGlvbiA9ICgpID0+IHt9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1hc2tlZElucHV0OiBzdHJpbmcgfCBudW1iZXIgPSB0aGlzLmFwcGx5TWFzayhcbiAgICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLFxuICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbixcbiAgICAgIHBvc2l0aW9uLFxuICAgICAgY2JcbiAgICApO1xuICAgIHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlID0gbWFza2VkSW5wdXQ7XG4gICAgaWYgKHRoaXMuX2Zvcm1FbGVtZW50ID09PSB0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jbGVhcklmTm90TWF0Y2hGbigpO1xuICB9XG5cbiAgcHVibGljIHNob3dNYXNrSW5JbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaG93TWFza1R5cGVkKSB7XG4gICAgICB0aGlzLm1hc2tJc1Nob3duID0gdGhpcy5tYXNrRXhwcmVzc2lvbi5yZXBsYWNlKC9bMC05XS9nLCAnXycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBjbGVhcklmTm90TWF0Y2hGbigpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNsZWFySWZOb3RNYXRjaCA9PT0gdHJ1ZSAmJlxuICAgICAgdGhpcy5tYXNrRXhwcmVzc2lvbi5sZW5ndGggIT09IHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLmxlbmd0aFxuICAgICkge1xuICAgICAgdGhpcy5mb3JtRWxlbWVudFByb3BlcnR5ID0gWyd2YWx1ZScsICcnXTtcbiAgICAgIHRoaXMuYXBwbHlNYXNrKHRoaXMuX2Zvcm1FbGVtZW50LnZhbHVlLCB0aGlzLm1hc2tFeHByZXNzaW9uKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGZvcm1FbGVtZW50UHJvcGVydHkoW25hbWUsIHZhbHVlXTogW3N0cmluZywgc3RyaW5nIHwgYm9vbGVhbl0pIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9mb3JtRWxlbWVudCwgbmFtZSwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTWFzayhcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlOiBzdHJpbmdbXVxuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB2YWx1ZVxuICAgICAgPyB2YWx1ZS5yZXBsYWNlKHRoaXMuX3JlZ0V4cEZvclJlbW92ZShzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZSksICcnKVxuICAgICAgOiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVByZWZpeCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMucHJlZml4KSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZSA/IHZhbHVlLnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKSA6IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVnRXhwRm9yUmVtb3ZlKHNwZWNpYWxDaGFyYWN0ZXJzRm9yUmVtb3ZlOiBzdHJpbmdbXSk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICBzcGVjaWFsQ2hhcmFjdGVyc0ZvclJlbW92ZS5tYXAoKGl0ZW06IHN0cmluZykgPT4gYFxcXFwke2l0ZW19YCkuam9pbignfCcpLFxuICAgICAgJ2dpJ1xuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWFza1NlcnZpY2UgfSBmcm9tICcuL21hc2suc2VydmljZSc7XG5pbXBvcnQgeyBJQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWFza10nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1hc2tEaXJlY3RpdmUpLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9LFxuICAgIE1hc2tTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHJpdmF0ZSBfbWFza1ZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgX2lucHV0VmFsdWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfcG9zaXRpb246IG51bWJlciB8IG51bGwgPSBudWxsO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIG9uQ2hhbmdlID0gKF86IGFueSkgPT4geyB9O1xuICBwdWJsaWMgb25Ub3VjaCA9ICgpID0+IHsgfTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIF9tYXNrU2VydmljZTogTWFza1NlcnZpY2VcbiAgKSB7IH1cblxuICBASW5wdXQoJ21hc2snKVxuICBwdWJsaWMgc2V0IG1hc2tFeHByZXNzaW9uKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9tYXNrVmFsdWUgPSB2YWx1ZSB8fCAnJztcbiAgICBpZiAoIXRoaXMuX21hc2tWYWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvbiA9IHRoaXMuX21hc2tWYWx1ZTtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgJ3ZhbHVlJyxcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5TWFzayhcbiAgICAgICAgdGhpcy5faW5wdXRWYWx1ZSxcbiAgICAgICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb25cbiAgICAgIClcbiAgICBdO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzcGVjaWFsQ2hhcmFjdGVycyh2YWx1ZTogSUNvbmZpZ1snc3BlY2lhbENoYXJhY3RlcnMnXSkge1xuICAgIGlmIChcbiAgICAgICF2YWx1ZSB8fFxuICAgICAgIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8XG4gICAgICAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgIXZhbHVlLmxlbmd0aClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza1NwZWNpYWxDaGFyYWN0ZXJzID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBhdHRlcm5zKHZhbHVlOiBJQ29uZmlnWydwYXR0ZXJucyddKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrQXZhaWxhYmxlUGF0dGVybnMgPSB2YWx1ZTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgcHJlZml4KHZhbHVlOiBJQ29uZmlnWydwcmVmaXgnXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2UucHJlZml4ID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHN1Zml4KHZhbHVlOiBJQ29uZmlnWydzdWZpeCddKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9tYXNrU2VydmljZS5zdWZpeCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBkcm9wU3BlY2lhbENoYXJhY3RlcnModmFsdWU6IElDb25maWdbJ2Ryb3BTcGVjaWFsQ2hhcmFjdGVycyddKSB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZHJvcFNwZWNpYWxDaGFyYWN0ZXJzID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNob3dNYXNrVHlwZWQodmFsdWU6IElDb25maWdbJ3Nob3dNYXNrVHlwZWQnXSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd01hc2tUeXBlZCA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzaG93VGVtcGxhdGUodmFsdWU6IElDb25maWdbJ3Nob3dUZW1wbGF0ZSddKSB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2Uuc2hvd1RlbXBsYXRlID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGNsZWFySWZOb3RNYXRjaCh2YWx1ZTogSUNvbmZpZ1snY2xlYXJJZk5vdE1hdGNoJ10pIHtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5jbGVhcklmTm90TWF0Y2ggPSB2YWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uSW5wdXQoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9pbnB1dFZhbHVlID0gZWwudmFsdWU7XG4gICAgaWYgKCF0aGlzLl9tYXNrVmFsdWUpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoZWwudmFsdWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvbjogbnVtYmVyID0gZWwuc2VsZWN0aW9uU3RhcnQgYXMgbnVtYmVyO1xuICAgIGxldCBjYXJldFNoaWZ0OiBudW1iZXIgPSAwO1xuICAgIHRoaXMuX21hc2tTZXJ2aWNlLmFwcGx5VmFsdWVDaGFuZ2VzKFxuICAgICAgcG9zaXRpb24sXG4gICAgICAoc2hpZnQ6IG51bWJlcikgPT4gKGNhcmV0U2hpZnQgPSBzaGlmdClcbiAgICApO1xuICAgIC8vIG9ubHkgc2V0IHRoZSBzZWxlY3Rpb24gaWYgdGhlIGVsZW1lbnQgaXMgYWN0aXZlXG4gICAgaWYgKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPVxuICAgICAgdGhpcy5fcG9zaXRpb24gIT09IG51bGxcbiAgICAgICAgPyB0aGlzLl9wb3NpdGlvblxuICAgICAgICA6IHBvc2l0aW9uICtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICgoZSBhcyBhbnkpLmlucHV0VHlwZSA9PT0gJ2RlbGV0ZUNvbnRlbnRCYWNrd2FyZCcgPyAwIDogY2FyZXRTaGlmdCk7XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvbkJsdXIoKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuY2xlYXJJZk5vdE1hdGNoRm4oKTtcbiAgICB0aGlzLm9uVG91Y2goKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgcHVibGljIG9uRm9jdXMoZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKFxuICAgICAgZWwgIT09IG51bGwgJiYgZWwuc2VsZWN0aW9uU3RhcnQgIT09IG51bGwgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID09PSBlbC5zZWxlY3Rpb25FbmQgJiZcbiAgICAgIGVsLnNlbGVjdGlvblN0YXJ0ID4gdGhpcy5fbWFza1NlcnZpY2UucHJlZml4Lmxlbmd0aCAmJlxuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoZSBhcyBhbnkpLmtleUNvZGUgIT09IDM4XG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5fbWFza1NlcnZpY2UucHJlZml4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZCA9IHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeC5sZW5ndGg7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcbiAgcHVibGljIGEoZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSA4KSB7XG4gICAgICB0aGlzLm9uRm9jdXMoZSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigncGFzdGUnKVxuICBwdWJsaWMgb25QYXN0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICB9XG5cbiAgLyoqIEl0IHdyaXRlcyB0aGUgdmFsdWUgaW4gdGhlIGlucHV0ICovXG4gIHB1YmxpYyBhc3luYyB3cml0ZVZhbHVlKGlucHV0VmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpbnB1dFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgaW5wdXRWYWx1ZSA9IFN0cmluZyhpbnB1dFZhbHVlKTtcbiAgICAgIHRoaXMuX21hc2tTZXJ2aWNlLmlzTnVtYmVyVmFsdWUgPSB0cnVlO1xuICAgIH1cbiAgICBpbnB1dFZhbHVlICYmIHRoaXMuX21hc2tTZXJ2aWNlLm1hc2tFeHByZXNzaW9uIHx8XG4gICAgdGhpcy5fbWFza1NlcnZpY2UubWFza0V4cHJlc3Npb24gJiYgKHRoaXMuX21hc2tTZXJ2aWNlLnByZWZpeCB8fCB0aGlzLnNob3dNYXNrVHlwZWQpXG4gICAgICA/ICh0aGlzLl9tYXNrU2VydmljZS5mb3JtRWxlbWVudFByb3BlcnR5ID0gW1xuICAgICAgICAndmFsdWUnLFxuICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5hcHBseU1hc2soXG4gICAgICAgICAgaW5wdXRWYWx1ZSxcbiAgICAgICAgICB0aGlzLl9tYXNrU2VydmljZS5tYXNrRXhwcmVzc2lvblxuICAgICAgICApXG4gICAgICBdKVxuICAgICAgOiAodGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsndmFsdWUnLCBpbnB1dFZhbHVlXSk7XG4gICAgdGhpcy5faW5wdXRWYWx1ZSA9IGlucHV0VmFsdWU7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB0aGlzLl9tYXNrU2VydmljZS5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2ggPSBmbjtcbiAgfVxuXG4gIC8qKiBJdCBkaXNhYmxlcyB0aGUgaW5wdXQgZWxlbWVudCAqL1xuICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fbWFza1NlcnZpY2UuZm9ybUVsZW1lbnRQcm9wZXJ0eSA9IFsnZGlzYWJsZWQnLCBpc0Rpc2FibGVkXTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21hc2snLFxuICBwdXJlOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIE1hc2tQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hc2tTZXJ2aWNlOiBNYXNrQXBwbGllclNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZ3xudW1iZXIsIG1hc2s6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWFza1NlcnZpY2UuYXBwbHlNYXNrKGAke3ZhbHVlfWAsIG1hc2spO1xuICB9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb25maWcsIElOSVRJQUxfQ09ORklHLCBpbml0aWFsQ29uZmlnLCBORVdfQ09ORklHLCBvcHRpb25zQ29uZmlnIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgTWFza0FwcGxpZXJTZXJ2aWNlIH0gZnJvbSAnLi9tYXNrLWFwcGxpZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNYXNrRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXNrLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXNrUGlwZSB9IGZyb20gJy4vbWFzay5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbTWFza0FwcGxpZXJTZXJ2aWNlXSxcbiAgZXhwb3J0czogW01hc2tEaXJlY3RpdmUsIE1hc2tQaXBlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWFza0RpcmVjdGl2ZSwgTWFza1BpcGVdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1hc2tNb2R1bGUge1xuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWdWYWx1ZT86IG9wdGlvbnNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1hc2tNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5FV19DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1ZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBJTklUSUFMX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogaW5pdGlhbENvbmZpZ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogY29uZmlnLFxuICAgICAgICAgIHVzZUZhY3Rvcnk6IF9jb25maWdGYWN0b3J5LFxuICAgICAgICAgIGRlcHM6IFtJTklUSUFMX0NPTkZJRywgTkVXX0NPTkZJR11cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICB9O1xuICB9XG4gIHB1YmxpYyBzdGF0aWMgZm9yQ2hpbGQoY29uZmlnVmFsdWU/OiBvcHRpb25zQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNYXNrTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb25maWdGYWN0b3J5XG4oaW5pdENvbmZpZzogb3B0aW9uc0NvbmZpZywgY29uZmlnVmFsdWU6IG9wdGlvbnNDb25maWcgfCAoKCkgPT4gb3B0aW9uc0NvbmZpZykpOiBGdW5jdGlvbiB8IG9wdGlvbnNDb25maWcge1xuICByZXR1cm4gKHR5cGVvZiBjb25maWdWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykgPyBjb25maWdWYWx1ZSgpIDogeyAuLi5pbml0Q29uZmlnLCAuLi5jb25maWdWYWx1ZSB9O1xufVxuIl0sIm5hbWVzIjpbInRzbGli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

/***/ }),

/***/ "./node_modules/text-mask-core/dist/textMaskCore.js":
/*!**********************************************************!*\
  !*** ./node_modules/text-mask-core/dist/textMaskCore.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r():undefined}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var o=t(3);Object.defineProperty(r,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var i=t(2);Object.defineProperty(r,"adjustCaretPosition",{enumerable:!0,get:function(){return n(i).default}});var a=t(5);Object.defineProperty(r,"createTextMaskInputElement",{enumerable:!0,get:function(){return n(a).default}})},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.placeholderChar="_",r.strFunction="function"},function(e,r){"use strict";function t(e){var r=e.previousConformedValue,t=void 0===r?o:r,i=e.previousPlaceholder,a=void 0===i?o:i,u=e.currentCaretPosition,l=void 0===u?0:u,s=e.conformedValue,f=e.rawValue,d=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,v=void 0===p?n:p,h=e.caretTrapIndexes,m=void 0===h?n:h;if(0===l||!f.length)return 0;var y=f.length,g=t.length,b=c.length,C=s.length,P=y-g,k=P>0,x=0===g,O=P>1&&!k&&!x;if(O)return l;var T=k&&(t===s||s===c),w=0,M=void 0,S=void 0;if(T)w=l-P;else{var j=s.toLowerCase(),_=f.toLowerCase(),V=_.substr(0,l).split(o),A=V.filter(function(e){return j.indexOf(e)!==-1});S=A[A.length-1];var N=a.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,E=c.substr(0,A.length).split(o).filter(function(e){return e!==d}).length,F=E!==N,R=void 0!==a[A.length-1]&&void 0!==c[A.length-2]&&a[A.length-1]!==d&&a[A.length-1]!==c[A.length-1]&&a[A.length-1]===c[A.length-2];!k&&(F||R)&&N>0&&c.indexOf(S)>-1&&void 0!==f[l]&&(M=!0,S=f[l]);for(var I=v.map(function(e){return j[e]}),J=I.filter(function(e){return e===S}).length,W=A.filter(function(e){return e===S}).length,q=c.substr(0,c.indexOf(d)).split(o).filter(function(e,r){return e===S&&f[r]!==e}).length,L=q+W+J+(M?1:0),z=0,B=0;B<C;B++){var D=j[B];if(w=B+1,D===S&&z++,z>=L)break}}if(k){for(var G=w,H=w;H<=b;H++)if(c[H]===d&&(G=H),c[H]===d||m.indexOf(H)!==-1||H===b)return G}else if(M){for(var K=w-1;K>=0;K--)if(s[K]===S||m.indexOf(K)!==-1||0===K)return K}else for(var Q=w;Q>=0;Q--)if(c[Q-1]===d||m.indexOf(Q)!==-1||0===Q)return Q}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t;var n=[],o=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!(0,i.isArray)(r)){if(("undefined"==typeof r?"undefined":o(r))!==a.strFunction)throw new Error("Text-mask:conformToMask; The mask property must be an array.");r=r(e,t),r=(0,i.processCaretTraps)(r).maskWithoutCaretTraps}var n=t.guide,s=void 0===n||n,f=t.previousConformedValue,d=void 0===f?l:f,c=t.placeholderChar,p=void 0===c?a.placeholderChar:c,v=t.placeholder,h=void 0===v?(0,i.convertMaskToPlaceholder)(r,p):v,m=t.currentCaretPosition,y=t.keepCharPositions,g=s===!1&&void 0!==d,b=e.length,C=d.length,P=h.length,k=r.length,x=b-C,O=x>0,T=m+(O?-x:0),w=T+Math.abs(x);if(y===!0&&!O){for(var M=l,S=T;S<w;S++)h[S]===p&&(M+=p);e=e.slice(0,T)+M+e.slice(T,b)}for(var j=e.split(l).map(function(e,r){return{char:e,isNew:r>=T&&r<w}}),_=b-1;_>=0;_--){var V=j[_].char;if(V!==p){var A=_>=T&&C===k;V===h[A?_-x:_]&&j.splice(_,1)}}var N=l,E=!1;e:for(var F=0;F<P;F++){var R=h[F];if(R===p){if(j.length>0)for(;j.length>0;){var I=j.shift(),J=I.char,W=I.isNew;if(J===p&&g!==!0){N+=p;continue e}if(r[F].test(J)){if(y===!0&&W!==!1&&d!==l&&s!==!1&&O){for(var q=j.length,L=null,z=0;z<q;z++){var B=j[z];if(B.char!==p&&B.isNew===!1)break;if(B.char===p){L=z;break}}null!==L?(N+=J,j.splice(L,1)):F--}else N+=J;continue e}E=!0}g===!1&&(N+=h.substr(F,P));break}N+=R}if(g&&O===!1){for(var D=null,G=0;G<N.length;G++)h[G]===p&&(D=G);N=null!==D?N.substr(0,D+1):l}return{conformedValue:N,meta:{someCharsRejected:E}}}Object.defineProperty(r,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=n;var i=t(4),a=t(1),u=[],l=""},function(e,r,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:s.placeholderChar;if(!o(e))throw new Error("Text-mask:convertMaskToPlaceholder; The mask property must be an array.");if(e.indexOf(r)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(r)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?r:e}).join("")}function o(e){return Array.isArray&&Array.isArray(e)||e instanceof Array}function i(e){return"string"==typeof e||e instanceof String}function a(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function u(e){return"undefined"==typeof e||null===e}function l(e){for(var r=[],t=void 0;t=e.indexOf(d),t!==-1;)r.push(t),e.splice(t,1);return{maskWithoutCaretTraps:e,indexes:r}}Object.defineProperty(r,"__esModule",{value:!0}),r.convertMaskToPlaceholder=n,r.isArray=o,r.isString=i,r.isNumber=a,r.isNil=u,r.processCaretTraps=l;var s=t(1),f=[],d="[]"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e){var r={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:r,update:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,o=n.inputElement,s=n.mask,d=n.guide,m=n.pipe,g=n.placeholderChar,b=void 0===g?v.placeholderChar:g,C=n.keepCharPositions,P=void 0!==C&&C,k=n.showMask,x=void 0!==k&&k;if("undefined"==typeof t&&(t=o.value),t!==r.previousConformedValue){("undefined"==typeof s?"undefined":l(s))===y&&void 0!==s.pipe&&void 0!==s.mask&&(m=s.pipe,s=s.mask);var O=void 0,T=void 0;if(s instanceof Array&&(O=(0,p.convertMaskToPlaceholder)(s,b)),s!==!1){var w=a(t),M=o.selectionEnd,S=r.previousConformedValue,j=r.previousPlaceholder,_=void 0;if(("undefined"==typeof s?"undefined":l(s))===v.strFunction){if(T=s(w,{currentCaretPosition:M,previousConformedValue:S,placeholderChar:b}),T===!1)return;var V=(0,p.processCaretTraps)(T),A=V.maskWithoutCaretTraps,N=V.indexes;T=A,_=N,O=(0,p.convertMaskToPlaceholder)(T,b)}else T=s;var E={previousConformedValue:S,guide:d,placeholderChar:b,pipe:m,placeholder:O,currentCaretPosition:M,keepCharPositions:P},F=(0,c.default)(w,T,E),R=F.conformedValue,I=("undefined"==typeof m?"undefined":l(m))===v.strFunction,J={};I&&(J=m(R,u({rawValue:w},E)),J===!1?J={value:S,rejected:!0}:(0,p.isString)(J)&&(J={value:J}));var W=I?J.value:R,q=(0,f.default)({previousConformedValue:S,previousPlaceholder:j,conformedValue:W,placeholder:O,rawValue:w,currentCaretPosition:M,placeholderChar:b,indexesOfPipedChars:J.indexesOfPipedChars,caretTrapIndexes:_}),L=W===O&&0===q,z=x?O:h,B=L?z:W;r.previousConformedValue=B,r.previousPlaceholder=O,o.value!==B&&(o.value=B,i(o,q))}}}}}function i(e,r){document.activeElement===e&&(g?b(function(){return e.setSelectionRange(r,r,m)},0):e.setSelectionRange(r,r,m))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return h;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(r,"__esModule",{value:!0});var u=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r.default=o;var s=t(2),f=n(s),d=t(3),c=n(d),p=t(4),v=t(1),h="",m="none",y="object",g="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),b="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});

/***/ })

}]);
//# sourceMappingURL=views-Administration-administration-module~views-candidats-candidats-module~views-candidats-listeEnt~a2384317.js.map