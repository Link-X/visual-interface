import React from 'react'
import { observer } from 'mobx-react-lite'

const Design = observer((props: engine.designIprops) => {
    console.log(props)
    const { activedItem } = props
    return (
        <div>
            <div className="title">
                {activedItem.fieldLabel}
                {activedItem.i}
            </div>
        </div>
    )
})

export default Design
