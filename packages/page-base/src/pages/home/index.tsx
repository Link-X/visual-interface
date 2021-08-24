import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { CanvasBlock, Side, Design } from '@visual-interface/engine'
import '@visual-interface/engine/dist/style/index.css'

import { useStores } from '@/store'
import datas from '@/materiel/data'

const Home = observer(
    (): JSX.Element => {
        const { designStore } = useStores()

        useEffect(() => {
            designStore.setSide(datas)
        }, [])

        return (
            <div>
                <Side list={designStore.sideList} dragEnd={designStore.pushFieldList} />
                <CanvasBlock
                    list={designStore.fieldList || []}
                    onClickItem={designStore.onClickItem}
                    onDrop={designStore.setDragConfig}
                />
                <Design activedItem={designStore.activedItem} />
            </div>
        )
    }
)

export default Home
