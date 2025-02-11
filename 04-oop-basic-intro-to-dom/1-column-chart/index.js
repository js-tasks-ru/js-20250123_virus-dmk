export default class ColumnChart {
    element;
    chartHeight = 50;

    constructor({
            data = [],
            label = '',
            link = '',
            value = 0,
            formatHeading = value => value 

    } = {}){
    
        this.label = label;
        this.link = link;
        this.value = value;
        this.data = data;
        this.formatHeading = formatHeading;
        this.element = this.createElement(this.createTemplate());

    }

    createElement(template) {
        const elem = document.createElement('div');
        
        elem.innerHTML = template;

        return elem.firstElementChild;
    }

    createlinkTemplate() {
        if (this.link) {
            return `<a href="${this.link}" class="column-chart__link">View all</a>`
        }

        return ""
    }

    createColumnChartTemplate(){
        return this.getColumnProps().map(({value, percent}) => (
            `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
        )).join('')
    }

    createTemplate() {
        return (`
        <div class="${this.createChartClasses()}" style="--chart-height: 50">
            <div class="column-chart__title">
                ${this.label}
                ${this.createlinkTemplate()}
            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
                <div data-element="body" class="column-chart__chart">
                    ${this.createColumnChartTemplate()}
            </div>
        </div>
      `)
    }

    createChartClasses() {
        return this.data.length ? 'column-chart' : 'column-chart column-chart_loading'
    }

    getColumnProps() {
        const maxValue = Math.max(...this.data);
        const scale = 50 / maxValue;
      
        return this.data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
    }

    update(newData){
        this.data = newData;
        this.element.querySelector('[data-element="body"]').innerHTML = this.createColumnChartTemplate()
    }

    remove(){
        this.element.remove();
    }

    destroy(){
        this.remove();
    }
}
