import React from 'react'
import Item from './Item'

const ItemList = ({ data = [], handleSelectItem, selectedItem }) => {
  return (
    <div
      className="item-editor--body__itemList"
    >
      {data.map(item => (
        <Item
          item={item}
          key={item.id}
          handleSelectItem={handleSelectItem}
          selectedItem={selectedItem}
        />
      ))}
    </div>
  )
}

export default ItemList