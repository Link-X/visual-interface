import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { CanvasBlock, Side } from '@visual-interface/engine'
import '@visual-interface/engine/dist/style/index.css'

import { useStores } from '@/store'
import datas from '@/materiel/data'

const Home = observer((): JSX.Element => {
    const { designStore } = useStores()

    const dragEnd = (item: any) => {
        console.log(item)
    }

    useEffect(() => {
        designStore.setSide(datas)
    }, [])

    return (
        <div>
            <Side list={designStore.sideList} dragEnd={dragEnd} />
            <CanvasBlock list={designStore.fieldList || []} onDrop={designStore.pushField} />
        </div>
    )
})

export default Home
