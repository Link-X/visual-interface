import React, { useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { useImmer } from 'use-immer'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { useMount } from 'src/hooks/index'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

export default (props) => {
    const [state, setState] = useImmer({ mounted: false })
    useMount(() => {
        setState((draft) => {
            draft.mounted = true
        })
    })
}

export class DragFromOutsideLayout extends React.Component {
    state = {
        currentBreakpoint: 'lg',
        mounted: false,
        layouts: {
            lg: [
                {
                    x: 0,
                    y: 0,
                    w: 1,
                    i: '1',
                    h: 1,
                    min: 0,
                    text: '请问日前刊文明确了科瑞亲王',
                    id: 1,
                    isBounded: true,
                    static: false
                },
                { x: 1, y: 0, w: 1, i: '2', h: 1, text: '12342', id: 2, isBounded: true, static: false },
                { x: 2, y: 0, w: 1, i: '3', h: 1, text: '134', id: 3, isBounded: true, static: false }
            ]
        }
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    generateDOM() {
        return this.state.layouts.lg.map((v) => {
            return (
                <div
                    key={v.id}
                    onClick={() => {
                        console.log(v)
                    }}
                >
                    <span className="text">{v.text}</span>
                </div>
            )
        })
    }

    onLayoutChange = (layout, layouts) => {
        console.log(layout, '1')
        console.log(layouts, '2')
    }

    onDrop = (layout, layoutItem, _event) => {
        alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`)
    }

    render() {
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
                <ResponsiveReactGridLayout
                    {...this.props}
                    margin={[0, 0]}
                    layouts={this.state.layouts}
                    onLayoutChange={this.onLayoutChange}
                    onDrop={this.onDrop}
                    measureBeforeMount={false}
                    useCSSTransforms={this.state.mounted}
                    compactType="vertical"
                    // isBounded={true}
                    preventCollision={false}
                    isDroppable={true}
                >
                    {this.generateDOM()}
                </ResponsiveReactGridLayout>
            </div>
        )
    }
}
