// import DomListener from '@core/DomListener';

import DomListener from './DomListener';

export default class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }
}
