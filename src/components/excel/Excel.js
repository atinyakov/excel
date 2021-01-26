import { $ } from '@core/dom';

export default class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components ?? [];
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        //  = document.createElement('div');
        // $root.classList.add('excel');

        this.components = this.components.map((Component) => {
            // const $el = document.createElement('div');
            const $el = $.create('div', Component.className);
            // $el.classList.add(Component.className);

            const component = new Component($el);
            // $el.innerHTML = component.toHTML();

            $el.html(component.toHTML());
            // $root.insertAdjacentHTML('beforeend', component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        this.$el.append(this.getRoot());
    }
}
