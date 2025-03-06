class Tooltip {
  static inst;
  element;
  
  constructor() {
  
    if(Tooltip.inst) return Tooltip.inst;
  
    Tooltip.inst = this;
      
  }
  
    initialize () {

      this.createEventListeners();
  
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

      document.body.addEventListener('pointerover', this.handleDocPointerover);
      document.body.addEventListener('pointerout', this.handleDocPointerout);
      document.body.addEventListener('pointermove', this.handleDocPointermove);

    }

    removeEventListeners() {

      document.body.removeEventListener('pointerover', this.handleDocPointerover);
      document.body.removeEventListener('pointerout', this.handleDocPointerout);
      document.body.removeEventListener('pointermove', this.handleDocPointermove);

    }

    handleDocPointerover = (e) => {
      if (!e.target.closest('[data-tooltip]')) return;

      this.render(e.target.closest('[data-tooltip]').dataset.tooltip);

      this.element.style.left = `${e.pageX + 10}px`;
      this.element.style.top = `${e.pageY + 10}px`;
    }

    handleDocPointerout = (e) => {
      
      if (!e.target.closest('[data-tooltip]')) return;
      
      this.element.remove();
    }

    handleDocPointermove = (e) => {
      if (!e.target.closest('[data-tooltip]')) return;

      this.element.style.left = `${e.pageX + 10}px`;
      this.element.style.top = `${e.pageY + 10}px`;
    
    }

    destroy() {

      this.element.remove();
      this.removeEventListeners();

    }
  }
  
  export default Tooltip;