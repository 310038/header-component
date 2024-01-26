import * as i6 from 'primeng/button';
import { ButtonModule } from 'primeng/button';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import * as i7 from 'primeng/toolbar';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import * as i5 from 'primeng/inputtext';
import { InputTextModule } from 'primeng/inputtext';
import * as i4 from 'primeng/table';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import * as i2 from 'primeng/dialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import * as i8 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as jsyaml from 'js-yaml';
import { TimesIcon } from 'primeng/icons/times';
import * as i9 from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import * as i1 from 'primeng/api';
import { MessageService } from 'primeng/api';
import * as i3 from '@angular/common';

class HeaderComponent {
    constructor() {
        /** inputIndex 提供給外部使用者，可以設定進到該畫面就要顯示那筆的資料，例如我希望進到該畫面就顯示第二筆資料，就可以設定 inputIndex = 1
         * 如果沒有特別設定，則預設為 0
         */
        this.#inputIndex = 0;
        this.isSearchDisabled = false;
        this.searchPlaceholder = '請輸入身分證號或病歷號碼';
        this.detailHeader = '詳細資料';
        this.listHeader = '查詢清單';
        this.search = new EventEmitter();
        this.RowChange = new EventEmitter();
        this.searchText = '';
        this.isShowDetail = false;
        this.isShowList = false;
        this.#currentIndex = -1;
    }
    #value;
    set value(value) {
        this.#value = value;
        this.currentRowChange(this.#inputIndex);
    }
    get value() {
        return this.#value;
    }
    /** inputIndex 提供給外部使用者，可以設定進到該畫面就要顯示那筆的資料，例如我希望進到該畫面就顯示第二筆資料，就可以設定 inputIndex = 1
     * 如果沒有特別設定，則預設為 0
     */
    #inputIndex;
    set inputIndex(inputIndex) {
        if (inputIndex < 0 || inputIndex >= this.value.length) {
            throw new Error('inputIndex 設定錯誤，請設定 0 ~ ' + (this.value.length - 1) + ' 之間的數字');
        }
        else {
            this.#inputIndex = inputIndex;
            this.currentRowChange(this.#inputIndex);
        }
    }
    get inputIndex() {
        return this.#inputIndex;
    }
    #initValue;
    #currentIndex;
    #currentRow;
    /** 初始化
     */
    ngOnInit() {
        this.#initValue = this.value;
    }
    /** currentRowChange
     * @param rowIndex
     */
    currentRowChange(rowIndex) {
        if (rowIndex >= 0) {
            this.#currentRow = this.value[rowIndex];
            if (this.isUseDefaultTemplate()) {
                this.yamlDocument = jsyaml.dump(this.#currentRow);
            }
            this.#currentIndex = rowIndex;
            this.RowChange.emit(this.#currentRow);
        }
    }
    /** 上一筆資料
     */
    onPrevClick() {
        const rowIndex = (this.#currentIndex - 1 + this.value.length) % this.value.length;
        this.currentRowChange(rowIndex);
    }
    /** 下一筆資料
     */
    onNextClick() {
        const rowIndex = (this.#currentIndex + 1) % this.value.length;
        this.currentRowChange(rowIndex);
    }
    /** 點選一筆資料
     * @param rowIndex
     */
    onRowSelect(rowIndex) {
        this.currentRowChange(rowIndex);
    }
    /**
     * 搜尋資料
     * @param searchText
     */
    onSearch(searchText) {
        this.search.emit(searchText);
    }
    /** 清除搜尋
     */
    onSearchClear() {
        this.searchText = '';
        this.value = this.#initValue;
        this.currentRowChange(this.#currentIndex);
    }
    /** 是否使用預設的 template
     */
    isUseDefaultTemplate() {
        return this.detailTemplate == undefined || this.titleTemplate == undefined;
    }
    /** 取得物件的 key
     * @param value
     * @param index
     * @returns key
     */
    getKey(value, index) {
        return value ? Object.keys(value)[index] || '' : '';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.4", ngImport: i0, type: HeaderComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.4", type: HeaderComponent, isStandalone: true, selector: "his-header", inputs: { value: "value", inputIndex: "inputIndex", titleTemplate: "titleTemplate", detailTemplate: "detailTemplate", listTemplate: "listTemplate", isSearchDisabled: "isSearchDisabled", searchPlaceholder: "searchPlaceholder", detailHeader: "detailHeader", listHeader: "listHeader" }, outputs: { search: "search", RowChange: "RowChange" }, providers: [MessageService], ngImport: i0, template: "<p-toolbar id=\"mydiv\">\n  <div class=\"p-toolbar-group-start\">\n    <div class=\"data\">\n      <div>\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          (click)=\"isShowDetail = !isShowDetail\"\n          class=\"p-button-rounded p-button-text btn\"\n          styleClass=\"p-button-secondary\"\n        >\n          <i class=\"pi pi-user\"></i>\n        </button>\n      </div>\n\n      <p-dialog\n        [header]=\" detailHeader | translate\"\n        [(visible)]=\"isShowDetail\"\n        [style]=\"{ width: '20vw' }\"\n        [position]=\"'left'\"\n        [draggable]=\"false\"\n      >\n        <ng-container\n          [ngTemplateOutlet]=\"detailTemplate || defaultDetailTemplate\"\n        >\n        </ng-container>\n      </p-dialog>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-center\">\n    <ng-container\n      [ngTemplateOutlet]=\"titleTemplate || defaultTitleTemplate\"\n    ></ng-container>\n\n    <div class=\"arrowPadding\">\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        (click)=\"onPrevClick()\"\n        class=\"p-button-rounded p-button-text\"\n        styleClass=\"p-button-secondary\"\n      >\n        <i class=\"pi pi-angle-left\"></i>\n      </button>\n\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        (click)=\"onNextClick()\"\n        class=\"p-button-rounded p-button-text\"\n        styleClass=\"p-button-secondary\"\n      >\n        <i class=\"pi pi-angle-right\"></i>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-start\">\n    <section>\n      <span class=\"input p-input-icon-left\">\n        <i class=\"pi pi-search\"></i>\n        <input\n          [disabled]=\"isSearchDisabled\"\n          type=\"text\"\n          pInputText\n          [placeholder]=\" searchPlaceholder | translate\"\n          #search\n          [(ngModel)]=\"searchText\"\n          (keyup.enter)=\"onSearch(search.value)\"\n        />\n\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          (click)=\"onSearchClear()\"\n          class=\"p-button-rounded p-button-text btn\"\n          styleClass=\"p-button-secondary\"\n        >\n          <i class=\"pi pi-times\"></i>\n        </button>\n      </span>\n    </section>\n\n    <button\n      pButton\n      pRipple\n      type=\"button\"\n      (click)=\"isShowList = !isShowList\"\n      class=\"p-button-rounded p-button-text\"\n      styleClass=\"p-button-secondary\"\n    >\n      <i class=\"pi pi-list\"></i>\n    </button>\n\n    <p-dialog\n      [header]=\"listHeader | translate\"\n      [(visible)]=\"isShowList\"\n      [style]=\"{ width: '20vw' }\"\n      [position]=\"'right'\"\n      [draggable]=\"false\"\n    >\n      <p-table [value]=\"value\" [tableStyle]=\"{ 'min-width': '10rem' }\">\n        <ng-template pTemplate=\"body\" let-row let-rowIndex=\"rowIndex\">\n          <tr (click)=\"onRowSelect(rowIndex)\" [pSelectableRow]=\"row\">\n            <ng-container\n              [ngTemplateOutlet]=\"listTemplate || defaultListTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            ></ng-container>\n          </tr>\n        </ng-template>\n      </p-table>\n    </p-dialog>\n\n    <ng-template #defaultTitleTemplate>\n      <div class=\"shortResult\">\n        {{ yamlDocument }}\n      </div>\n    </ng-template>\n\n    <ng-template #defaultDetailTemplate>\n      <pre>{{ yamlDocument }}</pre>\n    </ng-template>\n\n    <ng-template #defaultListTemplate let-row>\n      <td>{{ row[getKey(value[0], 0)] }}</td>\n      <td>{{ row[getKey(value[0], 1)] }}</td>\n    </ng-template>\n  </div>\n</p-toolbar>\n", styles: [":host ::ng-deep .p-toolbar{width:100%;display:flex;background-color:var(--surface-section);gap:0}:host ::ng-deep .p-toolbar .p-button{padding:.25rem}:host ::ng-deep .input{display:flex;justify-content:center;align-items:center}:host ::ng-deep .p-toolbar-group-center{flex:1;justify-content:space-between;padding-right:1.5rem}:host ::ng-deep .p-toolbar-group-center .arrowPadding{gap:1rem;display:flex}:host ::ng-deep .p-input-icon-right{align-items:center;justify-content:center}:host ::ng-deep .p-toolbar-group-start{gap:1rem}:host ::ng-deep .p-button.p-button-icon-only.p-button-rounded{width:2rem;height:2rem}:host ::ng-deep .p-dialog{position:absolute;top:4rem}:host ::ng-deep .shortResult{color:var(--surface-on-surface, #1c1d1c);font-family:Noto Sans TC;font-size:1.25rem;font-style:normal;font-weight:700;line-height:1.75rem;letter-spacing:.025rem}:host ::ng-deep .data{margin-right:7px}:host ::ng-deep .p-input-icon-left .btn{position:absolute;right:.75rem;top:50%;transform:translateY(-50%)}:host ::ng-deep .p-inputtext{color:var(--black-o-38, rgba(19, 20, 20, .38));font-family:Noto Sans TC;font-size:1rem;font-style:normal;font-weight:400;line-height:1.25rem;letter-spacing:.01rem;display:flex;padding-top:.5625rem;padding-bottom:.5625rem;width:20rem;flex-direction:column;align-items:flex-start}:host ::ng-deep .p-inputtext.p-component{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:.5rem 1rem}:host ::ng-deep .p-button{min-width:0rem}\n"], dependencies: [{ kind: "ngmodule", type: InputMaskModule }, { kind: "directive", type: i1.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: DividerModule }, { kind: "ngmodule", type: DialogModule }, { kind: "component", type: i2.Dialog, selector: "p-dialog", inputs: ["header", "draggable", "resizable", "positionLeft", "positionTop", "contentStyle", "contentStyleClass", "modal", "closeOnEscape", "dismissableMask", "rtl", "closable", "responsive", "appendTo", "breakpoints", "styleClass", "maskStyleClass", "showHeader", "breakpoint", "blockScroll", "autoZIndex", "baseZIndex", "minX", "minY", "focusOnShow", "maximizable", "keepInViewport", "focusTrap", "transitionOptions", "closeIcon", "closeAriaLabel", "closeTabindex", "minimizeIcon", "maximizeIcon", "visible", "style", "position"], outputs: ["onShow", "onHide", "visibleChange", "onResizeInit", "onResizeEnd", "onDragEnd", "onMaximize"] }, { kind: "ngmodule", type: GalleriaModule }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: ToastModule }, { kind: "ngmodule", type: TableModule }, { kind: "component", type: i4.Table, selector: "p-table", inputs: ["frozenColumns", "frozenValue", "style", "styleClass", "tableStyle", "tableStyleClass", "paginator", "pageLinks", "rowsPerPageOptions", "alwaysShowPaginator", "paginatorPosition", "paginatorStyleClass", "paginatorDropdownAppendTo", "paginatorDropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showJumpToPageDropdown", "showJumpToPageInput", "showFirstLastIcon", "showPageLinks", "defaultSortOrder", "sortMode", "resetPageOnSort", "selectionMode", "selectionPageOnly", "contextMenuSelection", "contextMenuSelectionMode", "dataKey", "metaKeySelection", "rowSelectable", "rowTrackBy", "lazy", "lazyLoadOnInit", "compareSelectionBy", "csvSeparator", "exportFilename", "filters", "globalFilterFields", "filterDelay", "filterLocale", "expandedRowKeys", "editingRowKeys", "rowExpandMode", "scrollable", "scrollDirection", "rowGroupMode", "scrollHeight", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "virtualScrollDelay", "frozenWidth", "responsive", "contextMenu", "resizableColumns", "columnResizeMode", "reorderableColumns", "loading", "loadingIcon", "showLoader", "rowHover", "customSort", "showInitialSortBadge", "autoLayout", "exportFunction", "exportHeader", "stateKey", "stateStorage", "editMode", "groupRowsBy", "groupRowsByOrder", "responsiveLayout", "breakpoint", "paginatorLocale", "value", "columns", "first", "rows", "totalRecords", "sortField", "sortOrder", "multiSortMeta", "selection", "selectAll", "virtualRowHeight"], outputs: ["contextMenuSelectionChange", "selectAllChange", "selectionChange", "onRowSelect", "onRowUnselect", "onPage", "onSort", "onFilter", "onLazyLoad", "onRowExpand", "onRowCollapse", "onContextMenuSelect", "onColResize", "onColReorder", "onRowReorder", "onEditInit", "onEditComplete", "onEditCancel", "onHeaderCheckboxToggle", "sortFunction", "firstChange", "rowsChange", "onStateSave", "onStateRestore"] }, { kind: "directive", type: i4.SelectableRow, selector: "[pSelectableRow]", inputs: ["pSelectableRow", "pSelectableRowIndex", "pSelectableRowDisabled"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i5.InputText, selector: "[pInputText]" }, { kind: "ngmodule", type: DropdownModule }, { kind: "ngmodule", type: ButtonModule }, { kind: "directive", type: i6.ButtonDirective, selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "ngmodule", type: ToolbarModule }, { kind: "component", type: i7.Toolbar, selector: "p-toolbar", inputs: ["style", "styleClass", "ariaLabelledBy"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: TranslateModule }, { kind: "pipe", type: i9.TranslatePipe, name: "translate" }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.4", ngImport: i0, type: HeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'his-header', standalone: true, providers: [MessageService], imports: [
                        InputMaskModule,
                        DividerModule,
                        DialogModule,
                        GalleriaModule,
                        ToastModule,
                        TableModule,
                        InputTextModule,
                        DropdownModule,
                        ButtonModule,
                        ToolbarModule,
                        FormsModule,
                        TimesIcon,
                        TranslateModule
                    ], template: "<p-toolbar id=\"mydiv\">\n  <div class=\"p-toolbar-group-start\">\n    <div class=\"data\">\n      <div>\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          (click)=\"isShowDetail = !isShowDetail\"\n          class=\"p-button-rounded p-button-text btn\"\n          styleClass=\"p-button-secondary\"\n        >\n          <i class=\"pi pi-user\"></i>\n        </button>\n      </div>\n\n      <p-dialog\n        [header]=\" detailHeader | translate\"\n        [(visible)]=\"isShowDetail\"\n        [style]=\"{ width: '20vw' }\"\n        [position]=\"'left'\"\n        [draggable]=\"false\"\n      >\n        <ng-container\n          [ngTemplateOutlet]=\"detailTemplate || defaultDetailTemplate\"\n        >\n        </ng-container>\n      </p-dialog>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-center\">\n    <ng-container\n      [ngTemplateOutlet]=\"titleTemplate || defaultTitleTemplate\"\n    ></ng-container>\n\n    <div class=\"arrowPadding\">\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        (click)=\"onPrevClick()\"\n        class=\"p-button-rounded p-button-text\"\n        styleClass=\"p-button-secondary\"\n      >\n        <i class=\"pi pi-angle-left\"></i>\n      </button>\n\n      <button\n        pButton\n        pRipple\n        type=\"button\"\n        (click)=\"onNextClick()\"\n        class=\"p-button-rounded p-button-text\"\n        styleClass=\"p-button-secondary\"\n      >\n        <i class=\"pi pi-angle-right\"></i>\n      </button>\n    </div>\n  </div>\n\n  <div class=\"p-toolbar-group-start\">\n    <section>\n      <span class=\"input p-input-icon-left\">\n        <i class=\"pi pi-search\"></i>\n        <input\n          [disabled]=\"isSearchDisabled\"\n          type=\"text\"\n          pInputText\n          [placeholder]=\" searchPlaceholder | translate\"\n          #search\n          [(ngModel)]=\"searchText\"\n          (keyup.enter)=\"onSearch(search.value)\"\n        />\n\n        <button\n          pButton\n          pRipple\n          type=\"button\"\n          (click)=\"onSearchClear()\"\n          class=\"p-button-rounded p-button-text btn\"\n          styleClass=\"p-button-secondary\"\n        >\n          <i class=\"pi pi-times\"></i>\n        </button>\n      </span>\n    </section>\n\n    <button\n      pButton\n      pRipple\n      type=\"button\"\n      (click)=\"isShowList = !isShowList\"\n      class=\"p-button-rounded p-button-text\"\n      styleClass=\"p-button-secondary\"\n    >\n      <i class=\"pi pi-list\"></i>\n    </button>\n\n    <p-dialog\n      [header]=\"listHeader | translate\"\n      [(visible)]=\"isShowList\"\n      [style]=\"{ width: '20vw' }\"\n      [position]=\"'right'\"\n      [draggable]=\"false\"\n    >\n      <p-table [value]=\"value\" [tableStyle]=\"{ 'min-width': '10rem' }\">\n        <ng-template pTemplate=\"body\" let-row let-rowIndex=\"rowIndex\">\n          <tr (click)=\"onRowSelect(rowIndex)\" [pSelectableRow]=\"row\">\n            <ng-container\n              [ngTemplateOutlet]=\"listTemplate || defaultListTemplate\"\n              [ngTemplateOutletContext]=\"{ $implicit: row }\"\n            ></ng-container>\n          </tr>\n        </ng-template>\n      </p-table>\n    </p-dialog>\n\n    <ng-template #defaultTitleTemplate>\n      <div class=\"shortResult\">\n        {{ yamlDocument }}\n      </div>\n    </ng-template>\n\n    <ng-template #defaultDetailTemplate>\n      <pre>{{ yamlDocument }}</pre>\n    </ng-template>\n\n    <ng-template #defaultListTemplate let-row>\n      <td>{{ row[getKey(value[0], 0)] }}</td>\n      <td>{{ row[getKey(value[0], 1)] }}</td>\n    </ng-template>\n  </div>\n</p-toolbar>\n", styles: [":host ::ng-deep .p-toolbar{width:100%;display:flex;background-color:var(--surface-section);gap:0}:host ::ng-deep .p-toolbar .p-button{padding:.25rem}:host ::ng-deep .input{display:flex;justify-content:center;align-items:center}:host ::ng-deep .p-toolbar-group-center{flex:1;justify-content:space-between;padding-right:1.5rem}:host ::ng-deep .p-toolbar-group-center .arrowPadding{gap:1rem;display:flex}:host ::ng-deep .p-input-icon-right{align-items:center;justify-content:center}:host ::ng-deep .p-toolbar-group-start{gap:1rem}:host ::ng-deep .p-button.p-button-icon-only.p-button-rounded{width:2rem;height:2rem}:host ::ng-deep .p-dialog{position:absolute;top:4rem}:host ::ng-deep .shortResult{color:var(--surface-on-surface, #1c1d1c);font-family:Noto Sans TC;font-size:1.25rem;font-style:normal;font-weight:700;line-height:1.75rem;letter-spacing:.025rem}:host ::ng-deep .data{margin-right:7px}:host ::ng-deep .p-input-icon-left .btn{position:absolute;right:.75rem;top:50%;transform:translateY(-50%)}:host ::ng-deep .p-inputtext{color:var(--black-o-38, rgba(19, 20, 20, .38));font-family:Noto Sans TC;font-size:1rem;font-style:normal;font-weight:400;line-height:1.25rem;letter-spacing:.01rem;display:flex;padding-top:.5625rem;padding-bottom:.5625rem;width:20rem;flex-direction:column;align-items:flex-start}:host ::ng-deep .p-inputtext.p-component{color:var(--surface-on-surface, #1c1d1c)}:host ::ng-deep .p-datatable .p-datatable-tbody>tr>td{padding:.5rem 1rem}:host ::ng-deep .p-button{min-width:0rem}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], inputIndex: [{
                type: Input
            }], titleTemplate: [{
                type: Input
            }], detailTemplate: [{
                type: Input
            }], listTemplate: [{
                type: Input
            }], isSearchDisabled: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], detailHeader: [{
                type: Input
            }], listHeader: [{
                type: Input
            }], search: [{
                type: Output
            }], RowChange: [{
                type: Output
            }] } });

/*
 * Public API Surface of header
 */

/**
 * Generated bundle index. Do not edit.
 */

export { HeaderComponent };
//# sourceMappingURL=his-directive-header.mjs.map
