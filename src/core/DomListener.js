export default class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No root Provided');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    initDomListeners() {}

    removeDomListeners() {}
}
