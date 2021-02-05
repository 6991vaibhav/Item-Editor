import React, { useState, useRef } from 'react'
import ItemEditorHeader from './ItemEditorHeader'
import ItemEditorBody from './ItemEditorBody'
import { undoChanges, redoChanges, updateItemDetails } from '../util/ItemEditorUtil'

const ItemEditor = ({ data }) => {
  const [itemsDetails, setItemsDetails] = useState(data)
  const items = itemsDetails.items
  const [past, setPast] = useState([])
  const [future, setFuture] = useState([])
  const [present, setPresent] = useState({
    type: 'selectItem',
    value: items[0]
  })
  const itemEditorRef = useRef()
  const [selectedItem, setSelectedItem] = useState(items.length > 0 ? items[0].id : '')
  let itemData = items.find(item => item.id === selectedItem)

  const handleSelectItem = (itemId) => {
    itemData = items.find(item => item.id === itemId)
    setSelectedItem(itemId)
    setPast([...past, present])
    const presentData = {
      type: 'selectItem',
      value: itemsDetails.items.find(item => item.id === itemId)
    }
    setPresent(presentData)
  }

  const handleActions = action => {
    switch (action) {
      case 'UNDO': {
        const itemDetails = itemEditorRef.current.getCurrentState();
        const isEqual = JSON.stringify(itemDetails) === JSON.stringify(itemData)
        if (past.length && isEqual) {
          const updatedValues = undoChanges(past, present, items)
          setItemsDetails({
            items: updatedValues.data
          })
          setPast(updatedValues.past)
          setPresent(updatedValues.present)
          setFuture([...future, updatedValues.future])
          setSelectedItem(updatedValues.selectedItem)
        } else if (past.length && !isEqual) {
          itemEditorRef.current.resetFormData()
        } else {
          const selectedItemsInitialState = data.items.find(item => item.id === selectedItem)
          const updatedInitialState = updateItemDetails(itemsDetails.items, selectedItemsInitialState)
          setItemsDetails({
            items: updatedInitialState
          })
          itemEditorRef.current.clearFormData()
        }
        break;
      }
      case 'REDO': {
        if (future.length) {
          const updatedValues = redoChanges(past, present, future, items)
          setItemsDetails({
            items: updatedValues.data
          })
          setPast(updatedValues.past)
          setPresent(updatedValues.present)
          setFuture(updatedValues.future)
          setSelectedItem(updatedValues.selectedItem)
        }
        break;
      }
      case 'SAVE': {
        const formData = itemEditorRef.current.getCurrentState();
        const updatedInitialState = updateItemDetails(itemsDetails.items, formData)
        setItemsDetails({
          items: updatedInitialState
        })
        const newPresent = {
          type: 'update',
          value: formData,
        }
        setPast([...past, present])
        setPresent(newPresent)
        break;
      }
      case 'CANCEL': {
        setItemsDetails(data)
        setPast([])
        setPresent({
          type: 'selectItem',
          value: itemData
        })
        setFuture([])
        itemEditorRef.current.clearFormData()
        break;
      }
      default:
    }
  }

  return (
    <div className="item-editor">
      <ItemEditorHeader handleActions={handleActions} />
      <ItemEditorBody
        ref={itemEditorRef}
        data={itemsDetails}
        handleSelectItem={handleSelectItem}
        itemData={itemData}
        selectedItem={selectedItem}
      />
    </div>
  )
}

export default ItemEditor