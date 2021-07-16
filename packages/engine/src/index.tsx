import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import './index.less'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import CanvasBlock from 'src/components/canvas-block'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const Engine = (props) => {
    const [list] = React.useState([
        {
            viewPath: '@/materiel/button/view',
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
