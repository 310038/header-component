import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class HeaderComponent implements OnInit {
    #private;
    set value(value: any);
    get value(): any;
    set inputIndex(inputIndex: number);
    get inputIndex(): number;
    titleTemplate: TemplateRef<any>;
    detailTemplate: TemplateRef<any>;
    listTemplate: TemplateRef<any>;
    isSearchDisabled: boolean;
    searchPlaceholder: string;
    detailHeader: string;
    listHeader: string;
    search: EventEmitter<any>;
    RowChange: EventEmitter<any>;
    yamlDocument: any;
    searchText: string;
    isShowDetail: boolean;
    isShowList: boolean;
    /** 初始化
     */
    ngOnInit(): void;
    /** currentRowChange
     * @param rowIndex
     */
    currentRowChange(rowIndex: number): void;
    /** 上一筆資料
     */
    onPrevClick(): void;
    /** 下一筆資料
     */
    onNextClick(): void;
    /** 點選一筆資料
     * @param rowIndex
     */
    onRowSelect(rowIndex: number): void;
    /**
     * 搜尋資料
     * @param searchText
     */
    onSearch(searchText: string): void;
    /** 清除搜尋
     */
    onSearchClear(): void;
    /** 是否使用預設的 template
     */
    isUseDefaultTemplate(): boolean;
    /** 取得物件的 key
     * @param value
     * @param index
     * @returns key
     */
    getKey(value: any, index: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderComponent, "his-header", never, { "value": { "alias": "value"; "required": false; }; "inputIndex": { "alias": "inputIndex"; "required": false; }; "titleTemplate": { "alias": "titleTemplate"; "required": false; }; "detailTemplate": { "alias": "detailTemplate"; "required": false; }; "listTemplate": { "alias": "listTemplate"; "required": false; }; "isSearchDisabled": { "alias": "isSearchDisabled"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "detailHeader": { "alias": "detailHeader"; "required": false; }; "listHeader": { "alias": "listHeader"; "required": false; }; }, { "search": "search"; "RowChange": "RowChange"; }, never, never, true, never>;
}
