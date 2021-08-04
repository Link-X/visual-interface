import React from 'react'
import { CanvasBlock } from '@visual-interface/engine'
import '@visual-interface/engine/dist/style/index.css'

const Home = (): JSX.Element => {
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
            <CanvasBlock list={[]} />
        </div>
    )
}

export default Home
