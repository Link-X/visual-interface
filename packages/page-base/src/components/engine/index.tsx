import React from 'react'

import CanvasBlock from '@/components/engine/canvas-block/index'

const Engine = (props) => {
    const [list] = React.useState([
        {
            viewPath: '@/materiel/button',
            fieldType: 'button',
            fieldLabel: '日期',
            fieldKey: 'kqroav6q'
        }
    ])

    return (
        <div>
            <div
                className="droppable-element"
                draggable={true}
                unselectable="on"
                onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', '')
                }}
                onDragEnd={(e) => {
                    console.log(e)
                }}
            >
                Droppable Element (Drag me!)
            </div>
            <CanvasBlock list={list} />
        </div>
    )
}

export default Engine

