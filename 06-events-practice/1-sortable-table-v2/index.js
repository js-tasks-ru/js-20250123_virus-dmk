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
              order: 'asc'
            }
    } = {}, 
    isSortLocally = true) {
    
    super(headersConfig, data);
    this.isSortLocally = isSortLocally;
    // this.element = super.element;
    this.createListeners();
  }

  sort () {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient() {
    //@todo
  }

  sortOnServer() {
    //@TODO
  }

  createListeners() {

  }

  removeListeners() {

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }
}
