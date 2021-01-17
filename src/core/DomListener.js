export default class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error('No root Provided');
        }
        this.$root = $root;
    }
}
