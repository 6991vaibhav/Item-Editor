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

// export const undoChanges = (selectedItemId, undoData, itemsList) => {
//   let redoItem
//   let updatedData
//   let updatedUndoData = undoData
//   const selectedItemArr = updatedUndoData.filter(item => item.id === selectedItemId)
//   if (selectedItemArr.length === 1) {
//     redoItem = selectedItemArr[0]
//     updatedUndoData = updatedUndoData.filter(item => item.id !== selectedItemId)
//     const itemInitialState = data.items.find(item => item.id === selectedItemId)
//     updatedData = updateItemDetails(itemsList, itemInitialState)
//   } else {
//     const itemIndex = getLastIndexOf(undoData, selectedItemId)
//     redoItem = updatedUndoData.splice(itemIndex, 1)[0]
//     const undoItemIndex = getLastIndexOf(updatedUndoData, selectedItemId)
//     updatedData = updateItemDetails(itemsList, updatedUndoData[undoItemIndex])
//   }
//   return {
//     redoItem,
//     undoData: updatedUndoData,
//     data: updatedData,
//   }
// }

export const undoChanges = (past, present, itemsList) => {
  let updatedData = []
  const future = present
  const newPresent = past.pop()
  switch (newPresent.type) {
    case 'selectItem':
      updatedData = updateItemDetails(itemsList, newPresent.value)
      break
    case 'update':
      updatedData = updateItemDetails(itemsList, newPresent.value)
      break
    default:
  }
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

// export const redoChanges = (selectedItemId, redoData, itemsList) => {
//   let undoItem
//   let updatedData
//   let updatedRedoData = redoData
//   const selectedItemArr = updatedRedoData.filter(item => item.id === selectedItemId)
//   if (selectedItemArr.length === 1) {
//     undoItem = selectedItemArr[0]
//     updatedRedoData = updatedRedoData.filter(item => item.id !== selectedItemId)
//     updatedData = updateItemDetails(itemsList, undoItem)
//   } else {
//     const itemIndex = getLastIndexOf(updatedRedoData, selectedItemId)
//     undoItem = updatedRedoData.splice(itemIndex, 1)[0]
//     // const undoItemIndex = getLastIndexOf(updatedRedoData, selectedItemId)
//     updatedData = updateItemDetails(itemsList, undoItem)
//   }
//   return {
//     undoItem,
//     redoData: updatedRedoData,
//     data: updatedData,
//   }
// }