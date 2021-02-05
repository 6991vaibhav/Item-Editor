import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const Checkbox = forwardRef(({ item }, ref) => {
  const [checked, setChecked] = useState(item.fieldValue)
  
  useEffect(() => {
    setChecked(item.fieldValue)
  }, [item.fieldValue])

  useImperativeHandle(ref, () => ({
    clearField () {
      setChecked(false)
    },
    resetField () {
      setChecked(item.fieldValue)
    }
  }))

  return (
    <input 
      type="checkbox"
      className="checkbox"
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
})

export default Checkbox