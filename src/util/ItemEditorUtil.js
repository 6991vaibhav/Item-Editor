export const getDeepCopy = obj => {
  return JSON.parse(JSON.stringify(obj))
}

export const updateItemDetails = (data, itemData) => {
  let dataCopy = getDeepCopy(data)
  dataCopy = data.map(item => {
    if (item.id === itemData.id) {
      return itemData
    }
    return item
  })
  return dataCopy
}

export const getLastIndexOf = (undoData, itemId) => {
  for (let i = undoData.length -1; i >= 0; i--) {
    if (undoData[i].id === itemId) {
      return i
    }
    return -1
  }
}

export const undoChanges = (past, present, itemsList) => {
  let updatedData = []
  const future = present
  const newPresent = past.pop()
  updatedData = updateItemDetails(itemsList, newPresent.value)
  return {
    past,
    present: newPresent,
    future,
    data: updatedData,
    selectedItem: newPresent.value.id,
  }
}

export const redoChanges = (past, present, future, itemsList) => {
  let updatedData = []
  past.push(present)
  const newPresent = future.pop()
  updatedData = updateItemDetails(itemsList, newPresent.value)
  return {
    past,
    present: newPresent,
    future,
    data: updatedData,
    selectedItem: newPresent.value.id
  }
}