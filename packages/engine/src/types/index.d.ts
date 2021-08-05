declare namespace engine {
    type sideListType = {
        key: string
        fieldLabel: string
    }
    interface sideIprops {
        list: sideListType[]
        dragEnd: (item: sideListType) => void
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
        onDrop: (item: gridLayoutData) => void
    }
}
