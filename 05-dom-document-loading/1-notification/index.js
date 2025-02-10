export default class NotificationMessage {
  element;

  constructor(
    message = "", 
    { 
      duration = 3, //default duration, if got nothing
      type = "" 
    } = {}
    ) { 
    this.message = message;
    this.duration = duration;
    this.type = type;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {

    const elem = document.createElement('div');
    elem.innerHTML = template;
    elem.firstElementChild.outerHTML = template;
    return elem
  }

createTemplate() {
  return `
    <div class="${this.createTypeMessageTemplate()}" style="--value:${this.duration}">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">success</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
  `
}

createTypeMessageTemplate() {
  if (this.type === 'success' ) return 'notification success' ;
  if (this.type === 'error' ) return 'notification error' ;
  return 'notification '
  
}

show() {
  document.body.append(this.element);
  setTimeout(this.remove,this.duration);
}

remove() {

  this.element.remove()

}

destroy() {

  this.remove()

}

}
