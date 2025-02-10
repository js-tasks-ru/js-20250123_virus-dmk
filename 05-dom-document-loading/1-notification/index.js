export default class NotificationMessage {
  static lastShownMessage = null;
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
    this.timerID = undefined;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {

    const elem = document.createElement('div');
    elem.innerHTML = template;
    return elem.firstElementChild;
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
  debugger;
  if (this.type === 'success' ) return 'notification success' ;
  if (this.type === 'error' ) return 'notification error' ;
  return 'notification '
  
}

show(target = document.body) {
  if (NotificationMessage.lastShownMessage) this.remove();

  NotificationMessage.lastShownMessage = this;
  
  target.append(this.element);
  this.timerID = setTimeout(() => this.remove(), this.duration);
}

remove() {

  this.element.remove();
  NotificationMessage.lastShownMessage = null;

}

destroy() {

  clearTimeout(this.timerID);
  this.remove();

}

}
