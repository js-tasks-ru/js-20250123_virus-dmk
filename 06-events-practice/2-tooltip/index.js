class Tooltip {
  static inst;
  element;
  
  constructor() {
  
    if(Tooltip.inst) return Tooltip.inst;
  
    Tooltip.inst = this;
    this.createEventListeners();  
  }
  
    initialize () {
  
      const el = document.createElement('div');
      el.innerHTML = this.createTooltipTemplate();
      this.element = el.firstElementChild;

    }

    render(content) {

      this.element.textContent = content;
      document.body.appendChild(this.element);

    }

    createTooltipTemplate() {

      return `<div class="tooltip"></div>`

    }

    createEventListeners() {

      document.body.addEventListener('pointerover', handleDocPointerover);
      document.body.addEventListener('pointerout', handleDocPointerout);
      document.body.addEventListener('pointermove', handleDocPointermove);

    }

    removeEventListeners() {

      document.body.removeEventListener('pointerover', handleDocPointerover);
      document.body.removeEventListener('pointerout', handleDocPointerout);
      document.body.removeEventListener('pointermove', handleDocPointermove);

    }

    handleDocPointerover = (e) => {



    }

    handleDocPointerout = (e) => {



    }

    handleDocPointermove = (e) => {

      

    }


    destroy() {

      this.element.remove();
      this.removeEventListeners();

    }
  }
  
  export default Tooltip;