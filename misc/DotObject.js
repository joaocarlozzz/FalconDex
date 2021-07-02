export function get(formData) {
    const result = {};

    var obj = getFormData(formData);

    // For each object path (property key) in the object
    for (const objectPath in obj) {
        // Split path into component parts
        const parts = objectPath.split('.');

        // Create sub-objects along path as needed
        let target = result;
        while (parts.length > 1) {
            const part = parts.shift();
            target = target[part] = target[part] || {};
        }

        // Set value at end of path
        target[parts[0]] = obj[objectPath]
    }

    return result;
}

export function getFormData(formData) {
    let element = {};

    formData.forEach((value, key) => {
        element[key] = value;
    })

    return element;
}

export function cleanData(formData) {
    formData.forEach((val, key, fD) => {
        formData.delete(key)
    });
}