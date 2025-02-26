export default class SortableTable {
  element;
  subElements = {};

  constructor( 
    headerConfig = [
      {
        id: "",
        title: "",
        sortable: false,
        sortType: "",
        template: (data = []) => "",
      },
    ],
    data = [
      {
        id: "",
        title: "",
        price: 0,
        sales: 0,
      },
    ]
  ) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.selectSubElements();
  }

  createElement(template) {
    const elem = document.createElement("div");
    elem.innerHTML = template;

    return elem.firstElementChild;
  }


  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createHeaderTemplate() {

    return this.headerConfig.map((el) => (`<div class="sortable-table__cell" data-id="${el.id}" 
      data-sortable="${el.sortable}" data-order=""><span>${el.title}</span></div>
      `)).join("");

  }

  createTableRowsTemplate() {
    
    const tableContent = [];

    for (let i of this.data) {
      tableContent.push(
        `<a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">`
      );

      for (let j of this.headerConfig) {
        if (j.hasOwnProperty("template")) {
          tableContent.push(j.template(i.images));
          continue;
        }

        tableContent.push(`<div class="sortable-table__cell">${i[j.id]}</div>`);
      }
      
      tableContent.push(`</a>`);
    }

    return tableContent.join('');

  }

  createTemplate() {
    return (`
      
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeaderTemplate()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.createTableRowsTemplate()}
            
            <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          </div>
        </div>
      </div>

      `);
  }

  sort(fieldValue = "title", orderValue = "desc") {

    const valType = this.headerConfig.find(a => (a.id === fieldValue))?.sortType;

    this.data.sort( function(a, b) {

      if (valType === "number") {

        return ((orderValue === "asc") ? 1 : -1) * (a[fieldValue] - b[fieldValue]) ;

      }

      if (valType === "string") {

        return ((orderValue === "asc") ? 1 : -1) * a[fieldValue].localeCompare(b[fieldValue], ["ru-RU", "en-US"], { caseFirst: "upper" });

      }

    });

    this.updateTableRows();

  }

  updateTableRows() {

    this.subElements.body.innerHTML = this.createTableRowsTemplate();

  }
  
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}