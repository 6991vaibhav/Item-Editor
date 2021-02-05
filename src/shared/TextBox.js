import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'

const TextBox = forwardRef(({ item }, ref) => {
  const [val, setVal] = useState(item.fieldValue || '')

  useEffect(() => {
    setVal(item.fieldValue)
  }, [item.fieldValue])

  useImperativeHandle(ref, () => ({
    clearField () {
      setVal('')
    },
    resetField () {
      setVal(item.fieldValue)
    }
  }))
  
  return (
    <input
      type="text"
      value={val}
      className="field"
      onChange={e => setVal(e.target.value)}
    />
  )
})

export default TextBox