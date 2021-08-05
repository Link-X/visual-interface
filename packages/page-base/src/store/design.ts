import { makeObservable, observable, action } from 'mobx'

class engineStore {
    activedItem: {}
    fieldList: any[]
    sideList: any[]

    constructor() {
        this.activedItem = {}
        this.sideList = []
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
            pushField: action
        })
    }

    setSide = (datas: Array<{ data: any }>) => {
        const list: any[] = []
        Object.values(datas).forEach((v) => {
            list.push({
                key: v.data.fieldType,
                fieldLabel: v.data.fieldLabel
            })
        })
        this.sideList = list
    }

    setActived = (item: any) => {
        this.activedItem = item
    }

    pushField = (config: any) => {
        const i = `${this.fieldList.length + 1}`
        this.fieldList.push({
            ...config,
            i,
            viewPath: '@/materiel/button',
            fieldType: 'button',
            fieldLabel: '按钮',
            fieldKey: i
        })
    }
}

export default engineStore
