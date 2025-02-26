/* eslint-disable indent */
import SortableTableV1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js';

export default class SortableTableV2 extends SortableTableV1 {

  constructor(headersConfig = {
    id: '',
    title: '',
    sortable: false,
    template: (data = []) => {}}, 
    {
      data = [{
        id: "",
        title: "",
        price: 0,
        sales: 0,
      }],
      sorted = {
              id: headerConfig.find(item => item.sortable).id,
              order: 'desc'
            }
    } = {}, 
    isSortLocally = true) {
    
    super(headersConfig, data);
    this.sorted = sorted;
    this.isSortLocally = isSortLocally;
    this.arrowElement = this.createArrowElement();
    this.defaultSort();
    this.createListeners();
  }

  defaultSort() {

    if (this.sorted.id) {

      this.sort(this.sorted.id, this.sorted.order);
    
    }

    this.defaultArrowAppend()

  }

  createArrowElement() {
    const arrowEl = document.createElement("div");
    arrowEl.innerHTML = (`
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>
          `);
        
    return arrowEl.firstElementChild;
    
  }

  sort(fieldValue = "title", orderValue = "desc") {
    if (this.isSortLocally) {
      this.sortOnClient(fieldValue, orderValue);
    } else {
      this.sortOnServer(fieldValue, orderValue);
    }
  }

  sortOnClient(fieldValue = "title", orderValue = "desc") {
    super.sort(fieldValue, orderValue);
  }

  sortOnServer(fieldValue = "title", orderValue = "desc") {
    //@TODO
  }

  createListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
    // document.addEventListener('DOMContentLoaded', this.defaultArrowAppend);
  }

  removeListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleHeaderCellClick);
    // document.addEventListener('DOMContentLoaded', this.defaultArrowAppend);
  }

  handleHeaderCellClick = (e) => {
    const headerCell = e.target.closest('.sortable-table__cell[data-sortable="true"]');

    if (!headerCell) {
      return;
    }
 
    const sortByField = headerCell.dataset.id;
    const sortOrder = headerCell.dataset.order === 'desc' ? 'asc' : 'desc';

    this.sort(sortByField, sortOrder);
    
    headerCell.dataset.order = sortOrder;
    
    if (!headerCell.querySelector('[data-element="arrow"]')) {
      
      headerCell.append(this.arrowElement) ;
    
    }
    
  }

  defaultArrowAppend() {
    const filteredField = this.subElements.header.querySelector(`[data-id="${this.sorted.id}"]`);
    filteredField.append(this.arrowElement);
    filteredField.dataset.order = this.sorted.order;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }
}