/**
 * A class that groups elements together and allow them to act as one.
 * Represents a group of elements with chainable operations.
 * @class
 */
class Group {
	/**
	 * Weakmap to track data belonging to elements used in this module.
	 * @private
	 * @type {WeakMap}
	 */
	collectionWeakMap = new WeakMap();
	/**
	 * Array of stored IDs so that multiple of the same ID cannot be claimed
	 * @private
	 * @type {Array}
	 */
	static storedIDs = [];
    /**
     * The version of the module.
     */
    version = "VERSION_REPLACE_ME";
    /**
     * Constructs a new Group instance.
     * @param {Array} pCollection - The initial collection to be grouped.
     * @param {Object} pMethods - An object containing methods to attach to this group.
     */
    constructor(pCollection, pMethods) {
        if (Array.isArray(pCollection)) {
            /**
             * The internal collection of elements.
             * @type {Array}
             * @private
             */
            this.collection = [...pCollection];
            this.collection.forEach((pElement) => {
                /**
                 * Assign an ID object to each element in this group.
                 */
                this.collectionWeakMap.set(pElement, { 'id': this.generateID() });
                /**
                 * Assign a method event object to the ID attached to the element.
                 */
                this.collectionWeakMap.set(this.collectionWeakMap.get(pElement), {});
            });
        }
        // Check the type of the passed methods object
        if (typeof(pMethods) === 'object' && pMethods.constructor === Object) {
            for (const method in pMethods) {
                this.attachMethod(method, pMethods[method]);
            }
        }
    }
	/**
	 * Generates a random ID based on the specified length and ensures its uniqueness
	 * within the stored IDs.
	 * @private
	 * @param {number} [pID = 7] - The length of the generated ID.
	 * @returns {string} A unique random ID.
	 */
	generateID(pID = 7) {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const makeID = function() {
			let ID = '';
			for (let i = 0; i < pID; i++) {
				ID += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return ID;
		}
		let ID = makeID();
		while(Group.storedIDs.includes(ID)) {
			ID = makeID();
		}
		Group.storedIDs.push(ID);
		return ID;
	}
    /**
     * Creates a new Group instance.
     * @param {Array} pCollection - The initial collection to be grouped.
     * @param {Object} pMethods - An object containing methods to attach to this group.
     * @returns {Group} A new Group instance.
     */
    static create(pCollection, pMethods) {
        return new Group(pCollection, pMethods);
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
            /**
             * Assign an ID object to the new element in this group.
             */
            this.collectionWeakMap.set(pItem, { 'id': this.generateID() });
            /**
             * Assign a method event object to the ID attached to the element.
             */
            this.collectionWeakMap.set(this.collectionWeakMap.get(pItem), {});
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
            // Remove the ID from the item being removed from this group
            if (this.collectionWeakMap.has(pItem)) {
                // Remove method event object
                if (this.collectionWeakMap.has(this.collectionWeakMap.get(pItem))) {
                    this.collectionWeakMap.delete(this.collectionWeakMap.get(pItem));
                }
                this.collectionWeakMap.delete(pItem);
            }
            this.collection.splice(this.collection.indexOf(pItem), 1);
        }
        return this;
    }
    /**
     * Attaches a method to the group, allowing it to be called on the group to execute the method on each element.
     * @param {string} pMethodName - The name of the method to attach.
     * @param {Function} pMethod - The method.
     * @returns {Group} The current Group instance for chaining.
     */
    attachMethod(pMethodName, pMethod) {
        /**
         * Calls the provided method on each element in the group.
         */
        this.collection.forEach((pElement) => {
            const methodObject = this.collectionWeakMap.get(this.collectionWeakMap.get(pElement));
            // Store the method
            methodObject[pMethodName] = pMethod.bind(this);
        });

        this[pMethodName] = function(...pArgs) {
            this.collection.forEach((pElement) => {
                // Call the stored method
                const methodObject = this.collectionWeakMap.get(this.collectionWeakMap.get(pElement));
                methodObject[pMethodName](pElement, ...pArgs);
            });
        }
        return this;
    }
}

export { Group };