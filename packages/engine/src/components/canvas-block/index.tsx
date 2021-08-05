import React, { useEffect, useMemo } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import isEqual from 'lodash.isequal'
import { useImmer } from 'use-immer'
import { observer } from 'mobx-react-lite'

import dynamic from 'src/components/react-dynamic'
import { useMount } from 'src/hooks'

import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
import './index.less'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const dynamicFunc = (type: string, path: string) => {
    return dynamic({
        loader: async function () {
            try {
                const { default: Component } = await import(`@/materiel/${type}`)
                return (props: { [key: string]: any }) => {
                    return <Component {...props}></Component>
                }
            } catch (err) {
                console.log(err)
            }
        },
        loading: () => <div>loading...</div>
    })
}

const RenderDom = React.memo(
    (props: any) => {
        const Dom = useMemo(() => dynamicFunc(props.fieldType, props.viewPath), [props])
        return <Dom {...props}></Dom>
    },
    (prev, next) => {
        if (!((prev && prev.metaItem) || (next && next.metaItem))) {
            return false
        }
        const equal = isEqual(prev.metaItem, next.metaItem)
        if (equal) {
            return true
        }
        return false
    }
)

export default observer((props: engine.canvasBlockIprops): JSX.Element => {
    const [state, setState] = useImmer({ mounted: false })

    const onLayoutChange = (layout, layouts) => {
        console.log(layout, layouts)
    }

    const onDrop = (layout, layoutItem, _event) => {
        props?.onDrop(layoutItem)
    }

    useMount(() => {
        setState((draft) => {
            draft.mounted = true
        })
    })

    return (
        <>
            <ResponsiveReactGridLayout
                margin={[0, 0]}
                layouts={{ lg: props.list }}
                onLayoutChange={onLayoutChange}
                onDrop={onDrop}
                measureBeforeMount={false}
                useCSSTransforms={state.mounted}
                compactType="vertical"
                // isBounded={true}
                preventCollision={false}
                isDroppable={true}
            >
                {props.list.map((v) => {
                    return (
                        <div key={v.fieldKey}>
                            <RenderDom {...v} />
                        </div>
                    )
                })}
            </ResponsiveReactGridLayout>
        </>
    )
})
