export const updateObjectInArray = (items, itemId, objPropName, newObjProp) => {
  return items.map((el) => {
    if (el[objPropName] === itemId) {
      return { ...el, ...newObjProp };
    }
    return el;
  });
};
