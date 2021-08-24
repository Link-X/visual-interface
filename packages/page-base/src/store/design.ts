import { makeObservable, observable, action } from 'mobx'

class engineStore {
    activedItem: {}
    layout: any[]
    fieldList: any[]
    sideList: any[]

    constructor() {
        this.activedItem = {}
        this.sideList = []
        this.layout = []
        this.fieldList = [
            {
                x: 0,
                y: 0,
                h: 1,
                w: 1,
                viewPath: '@/materiel/button',
                fieldType: 'button',
                fieldLabel: '按钮',
                fieldKey: 0
            }
        ]
        makeObservable(this, {
            activedItem: observable,
            sideList: observable,
            fieldList: observable,
            setSide: action,
            setActived: action,
            pushFieldList: action,
            setDragConfig: action
        })
    }

    /** 设置侧边栏 */
    setSide = (datas: Array<{ data: any }>) => {
        const list: any[] = []
        console.log(datas)
        Object.values(datas).forEach((v) => {
            list.push({
                key: v.data.fieldType,
                fieldType: v.data.fieldType,
                fieldLabel: v.data.fieldLabel
            })
        })
        this.sideList = list
    }

    setActived = (item: any) => {
        this.activedItem = item
    }

    /** 新增field */
    pushFieldList = (item: any) => {
        this.fieldList = this.layout.map((v: any, index: number) => {
            const oldConfig = this.fieldList[index]
            if (!oldConfig) {
                /** 如果原来没有则说明这个是新增的 */
                return {
                    ...v,
                    viewPath: `@/materiel/${String(item.fieldType)}`,
                    fieldType: item.fieldType,
                    fieldKey: `${index + 1}`,
                    i: `${index + 1}`,
                    fieldLabel: item.fieldLabel
                }
            }
            /** 将拖动后的位置修改下 */
            return {
                ...oldConfig,
                ...v
            }
        })
    }

    /** 保存拖动后所以位置的变化信息 */
    setDragConfig = (layout: any, config: any) => {
        this.layout = layout
    }
}

export default engineStore
