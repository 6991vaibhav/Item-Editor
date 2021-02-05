import React from 'react'

const ItemEditorHeader = ({ handleActions }) => {
  return (
    <div className="item-editor--header">
      <div className="title">Item Editor</div>
      <div className="actions">
        <div className="btnWrap">
          <button
            className="btn"
            onClick={() => handleActions('UNDO')}
          >
            Undo
          </button>
          <button
            className="btn"
            onClick={() => handleActions('REDO')}
          >
            Redo
          </button>
        </div>
        <div className="btnWrap">
          <button
            className="btn"
            onClick={() => handleActions('SAVE')}
          >
            Save
          </button>
          <button
            className="btn"
            onClick={() => handleActions('CANCEL')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemEditorHeader