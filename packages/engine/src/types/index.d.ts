declare namespace engine {
    type sideListType = {
        key: string
        fieldLabel: string
    }
    interface sideIprops {
        list: sideListType[]
        dragEnd: (item: sideListType) => void
    }

    interface designIprops {
        activedItem: any
    }

    interface gridLayoutData {
        x: number
        y: number
        h: number
        w: number
    }

    interface canvasBlockList extends gridLayoutData {
        viewPath?: string
        fieldType: string
        fieldLabel: string
        fieldKey: string
    }
    interface canvasBlockIprops {
        list: canvasBlockList[]
        onDrop: (layout: gridLayoutData[], item: gridLayoutData) => void
        onClickItem: (item: gridLayoutData) => void
    }
}
