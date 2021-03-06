import React, { useEffect } from 'react';
import { Modal as AntdModal, Form, Input, message } from 'antd';
import { useRequest } from 'umi';
import moment from 'moment';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';
import { setFieldsAdaptor, submitFieldsAdaptor } from '../helper';

const Modal = ({
  modalVisible,
  hideModal,
  modalUri,
}: {
  modalVisible: boolean;
  hideModal: () => void;
  modalUri: string;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: BasicListApi.PageData }>(
    `https://public-api-v2.aspirantzhang.com${modalUri}?X-API-KEY=antd`,
    {
      manual: true,
      onError: () => {
        hideModal();
      },
    },
  );

//执行按钮以后，并在和后端交互前  给一个提示：正在处理中，交互完成之后，并把提示关掉
  const request = useRequest(                       
    (values: any) => {
      message.loading({ content: 'Processing...', key: 'process', duration: 0 });
      const { uri, method, ...formValues } = values;
      return {
        url: `https://public-api-v2.aspirantzhang.com${uri}`,
        method,
        data: {
          ...submitFieldsAdaptor(formValues),
          'X-API-KEY': 'antd',
        },
      };
    },
    {
      manual: true,
      onSuccess: (data) => {
        message.success({
          content: data.message,
          key: 'process',
        });
        hideModal();
      },
      formatResult: (res: any) => {
        return res;
      },
    },
  );

  useEffect(() => {
    if (modalVisible) {
      form.resetFields();
      init.run();
    }
  }, [modalVisible]);

  useEffect(() => {
    if (init.data) {
      form.setFieldsValue(setFieldsAdaptor(init.data));
    }
  }, [init.data]);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values: any) => {
    console.log(values);
    request.run(values);
  };

  const actionHandler = (action: BasicListApi.Action) => {
    switch (action.action) {
      case 'submit':
        form.setFieldsValue({ uri: action.uri, method: action.method });
        form.submit();
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <AntdModal
        title={init?.data?.page?.title}
        visible={modalVisible}
        onCancel={hideModal}
        footer={ActionBuilder(init?.data?.layout?.actions[0]?.data, actionHandler, request.loading)}      //request里控制loading
        maskClosable={false}
      >
        <Form
          form={form}
          {...layout}
          initialValues={{
            create_time: moment(),
            update_time: moment(),
            status: true,
          }}
          onFinish={onFinish}
        >
          {FormBuilder(init?.data?.layout?.tabs[0]?.data)}
          <Form.Item name="uri" key="uri" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="method" key="method" hidden>
            <Input />
          </Form.Item>
        </Form>
      </AntdModal>
    </div>
  );
};
export default Modal;