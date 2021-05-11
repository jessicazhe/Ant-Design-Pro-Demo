import result from 'lodash'
import moment from 'moment'


export const setFieldsAdaptor = (data: BasicListApi.PageData) => {
    if (data?.layout?.tabs && data?.dataSource) {
        data.layout.tabs.forEach((tab) => {
            tab.data.forEach((field) => {
                switch (field.type) {
                    case 'datetime':
                        result[field.key] = moment(data.dataSource[field.key])
                        break;
                    default:
                        result[field.key] = data.dataSource[field.key]
                        break;
                }
            })
        })
        return result;
    }
    return {}
}


// 表单提交适配器
export const submitFieldsAdaptor = (formValues: any) => {
    const result = formValues;              //直接拷贝一份要付的值,
    Object.keys(formValues).forEach((key) => {      //循环对象
        // result[key] = formValues[key]      //每次循环，进来之后，都给result一个新的key，他的值是原来的formValue[key]
        //判断value是否为moment对象    方法为：moment.isMoment
        if (moment.isMoment(formValues[key])) {
            result[key] = moment(formValues[key]).format();  //如果是moment，转换成monment值
        }
    })
    return {}             //返回值是对象
}