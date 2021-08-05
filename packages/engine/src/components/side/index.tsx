import React from 'react'

export default (props: engine.sideIprops) => {
    return (
        <div className="side-box">
            {props.list.map((v) => {
                return (
                    <div
                        draggable={true}
                        unselectable="on"
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', '')
                        }}
                        onDragEnd={(e) => {
                            props.dragEnd(v)
                        }}
                        className="side-item"
                        key={v.key}
                    >
                        {v.fieldLabel}
                    </div>
                )
            })}
        </div>
    )
}
