import { ButtonModule } from 'primeng/button';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { InputMaskModule } from 'primeng/inputmask';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import * as jsyaml from 'js-yaml';
import { TimesIcon } from 'primeng/icons/times';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'his-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
  imports: [
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
  ],
})
export class HeaderComponent implements OnInit {

  #value: any;
  @Input()
  set value(value: any) {
    this.#value = value;
    this.currentRowChange(this.#inputIndex);
  }
  get value(): any {
    return this.#value;
  }

 /** inputIndex 提供給外部使用者，可以設定進到該畫面就要顯示那筆的資料，例如我希望進到該畫面就顯示第二筆資料，就可以設定 inputIndex = 1
  * 如果沒有特別設定，則預設為 0
  */
  #inputIndex = 0;
  @Input()
  set inputIndex(inputIndex: number) {
    if(inputIndex < 0 || inputIndex >= this.value.length) {
      throw new Error('inputIndex 設定錯誤，請設定 0 ~ ' + (this.value.length - 1) + ' 之間的數字');
    }else{
      this.#inputIndex = inputIndex;
      this.currentRowChange(this.#inputIndex);
    }
  }
  get inputIndex(): number {
    return this.#inputIndex;
  }

  @Input() titleTemplate!: TemplateRef<any>;
  @Input() detailTemplate!: TemplateRef<any>;
  @Input() listTemplate!: TemplateRef<any>;
  @Input() isSearchDisabled: boolean = false;
  @Input() searchPlaceholder: string = '請輸入身分證號或病歷號碼';
  @Input() detailHeader: string = '詳細資料';
  @Input() listHeader: string = '查詢清單';

  @Output() search = new EventEmitter<any>();
  @Output() RowChange = new EventEmitter<any>();

  yamlDocument: any;
  searchText: string = '';
  isShowDetail: boolean = false;
  isShowList: boolean = false;


  #initValue: any;
  #currentIndex: number = -1;
  #currentRow: any;

  /** 初始化
   */
  ngOnInit(): void {
    this.#initValue = this.value;
  }

  /** currentRowChange
   * @param rowIndex
   */
  currentRowChange(rowIndex: number): void {
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
  onPrevClick(): void {
    const rowIndex =
      (this.#currentIndex - 1 + this.value.length) % this.value.length;
    this.currentRowChange(rowIndex);
  }

  /** 下一筆資料
   */
  onNextClick(): void {
    const rowIndex = (this.#currentIndex + 1) % this.value.length;
    this.currentRowChange(rowIndex);
  }
  /** 點選一筆資料
   * @param rowIndex
   */
  onRowSelect(rowIndex: number) {
    this.currentRowChange(rowIndex);
  }

  /**
   * 搜尋資料
   * @param searchText
   */
  onSearch(searchText: string): void {
    this.search.emit(searchText);
  }

  /** 清除搜尋
   */
  onSearchClear(): void {
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
  getKey(value: any, index: number): string {
    return value ? Object.keys(value)[index] || '' : '';
  }
}
