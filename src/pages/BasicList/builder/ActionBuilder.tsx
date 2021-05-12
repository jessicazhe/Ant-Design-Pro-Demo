import { Button } from 'antd';
import type { ButtonType } from 'antd/lib/button';

const ActionBuilder = (
    actions: BasicListApi.Action[] | undefined,
    actionHandler: BasicListApi.ActionHandler,
    //   loading: boolean,         //判断是否已经穿入完成，所以是boolean类型
    loading = false,    //直接给默认值，一避免无值报错，二，可以不用在传false这个值
    record = {},      //空对象
) => {
    return (actions || []).map((action) => {
        if (action.component === 'button') {
            return (
                <Button
                    key={action.text}
                    type={action.type as ButtonType}
                    onClick={() => {
                        actionHandler(action, record);
                    }}
                    loading={loading}               //点击一次按钮之后进入loading状态，避免用户多次提交    loading={loading}  
                >
                    {action.text}
                </Button>
            );
        }
        return null;
    });
};
export default ActionBuilder;



