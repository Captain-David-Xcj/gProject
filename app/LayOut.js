import React from 'react';
import {Layout} from "antd";
import LeftMenu from "./components/leftmenu/LeftMenu";
import TabContent from "./components/tabcontent/TabContent";
import {Route} from "react-router";

const {Header, Footer, Sider, Content} = Layout;

class LayOut extends React.Component {
    render() {
        return (
            <div>
                <Layout>

                    <Header style={{background: '#fff'}}>
                        <h1 style={{textAlign: "center"}}>Management System</h1>
                    </Header>

                    <Layout style={{height: 'auto'}}>
                        <Sider style={{
                            overflow: 'auto',
                            height: 'inherit',
                            background: "#fff",
                            margin: '0px 0px 0px 50px'
                        }}>
                            <Route path="/" component={LeftMenu}/>
                        </Sider>

                        <Content style={{margin: '0px 50px 0px 0px', height: 'inherit'}}>
                            <Route path="/" component={TabContent}/>
                        </Content>
                    </Layout>

                    <Footer style={{textAlign: 'center', height: "auto"}}>
                        Management System ©2019 Created by David Xie
                    </Footer>

                </Layout>
            </div>
        );
    }
}

export default LayOut;