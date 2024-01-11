/**
 * A class that groups elements together and allow them to act as one.
 * Represents a group of elements with chainable operations.
 * @class
 */
class Group {
    /**
     * The version of the module.
     */
    version = "VERSION_REPLACE_ME";
    /**
     * Constructs a new Group instance.
     * @param {Array} collection - The initial collection to be grouped.
     */
    constructor(pCollection) {
        if (Array.isArray(pCollection)) {
            /**
             * The internal collection of elements.
             * @type {Array}
             * @private
             */
            this.collection = [...pCollection];
        }
    }
    /**
     * Creates a new Group instance.
     * @param {Array} pCollection - The initial collection to be grouped.
     * @returns {Group} A new Group instance.
     */
    static create(pCollection) {
        return new Group(pCollection);
    }
    /**
     * Applies a function to each element in the group.
     * @param {Function} pCallback - The function to apply to each element.
     * @returns {Group} The current Group instance for chaining.
     */
    map(pCallback) {
        this.collection = this.collection.map(pCallback);
        return this;
    }
    /**
     * Iterates over each element in the group.
     * @param {Function} pCallback - The function to execute for each element.
     * @returns {Group} The current Group instance for chaining.
     */
    forEach(pCallback) {
        this.collection.forEach(pCallback);
        return this;
    }
    /**
     * Converts the group to a new array.
     * @returns {Array} A shallow copy of the current collection.
     */
    toArray() {
        return [...this.collection];
    }
    /**
     * Adds an item to the group if it doesn't already exist.
     * @param {*} pItem - The item to add to the group.
     * @returns {Group} The current Group instance for chaining.
     */
    add(pItem) {
        if (!this.collection.includes(pItem)) {
            this.collection.push(pItem);
        }
        return this;
    }
    /**
     * Removes an item from the group if it exists.
     * @param {*} pItem - The item to remove from the group.
     * @returns {Group} The current Group instance for chaining.
     */
    remove(pItem) {
        if (this.collection.includes(pItem)) {
            this.collection.splice(this.collection.indexOf(pItem), 1);
        }
        return this;
    }
}

export { Group };