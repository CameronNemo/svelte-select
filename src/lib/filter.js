export default function filter({
    loadOptions,
    filterText,
    items,
    multiple,
    value,
    optionIdentifier,
    groupBy,
    creatable,
    itemFilter,
    convertStringItemsToObjects,
    filterGroupedItems,
    addCreatableItem,
    getOptionLabel,
}) {
    if (items && loadOptions && filterText.length > 0) return items;
    if (!items) return [];

    if (items && items.length > 0 && typeof items[0] !== 'object') {
        items = convertStringItemsToObjects(items);
    }

    let filterResults = items.filter((item) => {
        let matchesFilter = itemFilter(getOptionLabel(item, filterText), filterText, item);

        if (matchesFilter && multiple && value && Array.isArray(value)) {
            matchesFilter = !value.some((x) => {
                return x[optionIdentifier] === item[optionIdentifier];
            });
        }

        return matchesFilter;
    });

    if (groupBy) {
        filterResults = filterGroupedItems(filterResults);
    }

    if (creatable) {
        filterResults = addCreatableItem(filterResults, filterText);
    }

    return filterResults;
}
