import SideMenu from '../Menu';
import React,{ useState} from 'react';
import { Layout } from 'antd';
import AppHeader from '../Header';

const {Content, Sider} = Layout;

interface Props {
  children: React.ReactNode;
}

export default function Dashboard({children} : Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader/>
      <Layout className="site-layout">
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
          <SideMenu />
        </Sider>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};