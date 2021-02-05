import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const Select = forwardRef(({ options, item }, ref) => {
  const selected = options.find(option => option.optionValue === item.fieldValue)
  const [selectedOption, setSelectedOption] = useState(selected)

  useEffect(() => {
    const updatedOption = options.find(option => option.optionValue === item.fieldValue)
    setSelectedOption(updatedOption)
  }, [item.fieldValue, options])

  useImperativeHandle(ref, () => ({
    clearField () {
      setSelectedOption(options[0])
    },
    resetField () {
      setSelectedOption(options.find(option => option.optionValue === item.fieldValue))
    }
  }))

  const handleOnChange = e => {
    const updatedVal = options.find(option => option.optionName === e.target.value)
    setSelectedOption(updatedVal)
  }

  return (
    <select
      onChange={e => handleOnChange(e)}
      className="field"
      value={selectedOption.optionName}
    >
      {options.map(option => (
        <option key={option.optionValue}>{option.optionName}</option>
      ))}
    </select>
  )
})

export default Select