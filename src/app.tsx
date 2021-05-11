import React from 'react';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { message } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import type { ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await queryCurrentUser();
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}
// https://umijs.org/zh-CN/plugins/plugin-layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== '/user/login') {
        history.push('/user/login');
      }
    },
    links: isDev
      ? [
          <>
            <LinkOutlined />
            <span
              onClick={() => {
                window.open('/umi/plugin/openapi');
              }}
            >
              openAPI 文档
            </span>
          </>,
          <>
            <BookOutlined />
            <span
              onClick={() => {
                window.open('/~docs');
              }}
            >
              业务组件文档
            </span>
          </>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};

/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: ResponseError) => {
  // BizError => success: false               //业务类型错误 
  // RequestError => http erron                //请求错误

  if (errorHandler.name === 'BizError') {
    if (error.data.message) {        //判断有无错误，error.data.message是错误的位置
      message.error({         //提示错误
        content: error.data.message,   //属性一，给用户提示的错误的内容，即后端传过来的文本
        key: 'process',          //属性二，每一个message创建好都有一个唯一的key值
        duration: 20             //属性三，报错持续时间
      });
    } else {
      message.error({
        content: '业务错误，请重试',
        key: 'process',
        duration: 20
      })
    }
  }
  if (errorHandler.name === 'ResponsetError') {
    message.error({
      content: `${error.response.status}${error.response.statusText}.请重试`,
      key: 'process',
      duration: 20
    })
  }
  throw error;

}
// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  errorHandler,
};
