import { $ } from '@core/dom';

export default class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector);
        this.components = options.components ?? [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        //  = document.createElement('div');
        // $root.classList.add('excel');

        this.components.forEach((Component) => {
            // const $el = document.createElement('div');
            const $el = $.crete('div', Component.className);
            // $el.classList.add(Component.className);

            const component = new Component($el);
            $el.innerHTML = component.toHTML();
            // $root.insertAdjacentHTML('beforeend', component.toHTML());
            $root.append($el);
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}
