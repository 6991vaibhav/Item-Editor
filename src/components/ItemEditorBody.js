import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import ItemFieldsWrapper from './ItemFieldsWrapper'
import ItemList from './ItemList'

const ItemEditorBody = forwardRef(({
  data,
  handleSelectItem,
  itemData,
  selectedItem,
}, ref) => {
  const fieldsWrapperRef = useRef()

  const _getCurrentState = () => {
    return fieldsWrapperRef.current.getCurrentState()
  }

  useImperativeHandle(ref, () => ({
    getCurrentState () {
      return _getCurrentState()
    },
    clearFormData () {
      return fieldsWrapperRef.current.clearFormData()
    },
    resetFormData () {
      return fieldsWrapperRef.current.resetFormData()
    }
  }))
  
  return (
    <div className="item-editor--body">
      <ItemList
        data={data.items}
        handleSelectItem={handleSelectItem}
        selectedItem={selectedItem}
      />
      <ItemFieldsWrapper
        itemData={itemData}
        ref={fieldsWrapperRef}
      />
    </div>
  )
})

export default ItemEditorBody