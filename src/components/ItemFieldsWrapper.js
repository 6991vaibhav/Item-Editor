import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import Checkbox from '../shared/Checkbox'
import Select from '../shared/Select'
import TextBox from '../shared/TextBox'
import { getDeepCopy } from '../util/ItemEditorUtil'


const ItemFieldsWrapper = forwardRef(({ itemData }, ref) => {
  const textRef = useRef()
  const selectRef = useRef()
  const toggleRef = useRef()

  const _getFormDataForItem = () => {
    const itemCopy = getDeepCopy(itemData)
    const formData = document.getElementById('fieldsForm').elements;
    const updatedFields = itemCopy.fields.map((field, index) => {
      let formValue = formData[index].value
      if (formData[index].nodeName === 'SELECT') {
        formValue = field.fieldOptions.find(option => option.optionName === formValue).optionValue
      } else if (formData[index].className === 'checkbox') {
        formValue = formData[index].checked
      }
      const updatedField = {
        ...field,
        fieldValue: formValue,
      }
      return updatedField;
    })
    itemCopy.fields = updatedFields
    return itemCopy
  }

  const _clearFormData = () => {
    textRef.current && textRef.current.clearField()
    selectRef.current && selectRef.current.clearField()
    toggleRef.current && toggleRef.current.clearField()
  }

  const _resetFormData = () => {
    textRef.current && textRef.current.resetField()
    selectRef.current && selectRef.current.resetField()
    toggleRef.current && toggleRef.current.resetField()
  }

  useImperativeHandle(ref, () => ({
    getCurrentState () {
      return _getFormDataForItem()
    },
    clearFormData () {
      return _clearFormData()
    },
    resetFormData () {
      return _resetFormData()
    }
  }))

  const renderField = item => {
    switch (item.fieldType) {
      case 'text':
        return (
          <TextBox
            item={item}
            ref={textRef}
          />
        )
      case 'option':
        return (
          <Select
            options={item.fieldOptions}
            item={item}
            ref={selectRef}
          />
        )
      case 'toggle':
        return (
          <Checkbox
            item={item}
            ref={toggleRef}
          />
        )
      default:
    }
  }

  const renderItemFields = item => {
    return item.fields.map(field => {
      if (field.fieldType !== 'toggle') {
        return (
          <div
            key={field.id}
            className="fieldContainer"
          >
            <label>{field.fieldName}</label>
            {renderField(field)}
          </div>
        )
      }
      return (
        <div
          key={field.id}
          className="fieldContainer"
        >
          {renderField(field)}
          <label>{field.fieldName}</label>
        </div>
      )
    })
  }

  return (
    <div className="item-editor--body__fieldWrapper">
      <form
        id="fieldsForm"
      >
        {renderItemFields(itemData)}
      </form>
    </div>
  )
})

export default ItemFieldsWrapper