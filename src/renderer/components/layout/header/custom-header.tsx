import React from 'react';
import { Input, message } from 'antd';
import {
    BugOutlined,
    ReloadOutlined,
    SearchOutlined,
    LeftOutlined,
    MinusOutlined,
    BlockOutlined,
    CloseOutlined,
    UserOutlined,
    SkinOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import playTool from '@/utils/paly-tool';
import { Control } from 'react-keeper';
import store from '@/utils/store';
import cssModule from './custom-header.scss';

const { ipcRenderer } = require('electron');

function developingMsg() {
    message.info({
        content: '功能正在开发中...',
        className: cssModule.msgClass,
        icon: <></>,
        duration: 1
    });
}

export default function CustomHeader() {
    async function onSearch(keyword: string) {
        store.setState('SEARCH_KEYWORDS', keyword);
        Control.go('/search');
    }
    return (
        <div className={cssModule.headerWrapper}>
            <Input.Search
                placeholder="电影、电视剧、综艺..."
                onSearch={onSearch}
                enterButton={
                    <span>
                        <SearchOutlined /> 全网搜
                    </span>
                }
                className={cssModule.headerInput}
                />
            <span className={cssModule.appBtn}>
                {process.env.NODE_ENV !== 'production' && (
                    <BugOutlined
                        onClick={() => {
                            ipcRenderer.send('WINDOW_DEBUG');
                        }}
                        />
                )}
                {process.env.NODE_ENV !== 'production' && (
                    <ReloadOutlined
                        onClick={() => {
                            window.location.href = '/';
                        }}
                        style={{ fontSize: 18 }}
                        />
                )}
                <SkinOutlined onClick={developingMsg} />
                <UserOutlined onClick={developingMsg} />
                <ShareAltOutlined onClick={developingMsg} />
            </span>
            <span className={cssModule.operationBtn}>
                <MinusOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_MIN');
                    }}
                    />
                <BlockOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_MAX');
                    }}
                    />
                <CloseOutlined
                    onClick={() => {
                        ipcRenderer.send('WINDOW_CLOSE');
                    }}
                    />
            </span>
        </div>
    );
}
