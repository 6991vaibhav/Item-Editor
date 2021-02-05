import React from 'react'

const Item = ({ item, handleSelectItem, selectedItem }) => {
  return (
    <button
      className={`item ${selectedItem === item.id ? 'item-selected' : ''}`}
      onClick={() => handleSelectItem(item.id)}
    >
      {item.name}
    </button>
  )
}

export default Item