import React from 'react';
import {Tabs} from 'antd';
import {addPage, changePage, deletePage} from "../../actions";
import {connect} from "react-redux";

const TabPane = Tabs.TabPane;

class TabContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panes: this.props.pageList,
            activeKey: this.props.activeKey
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            panes: nextProps.pageList,
            activeKey: nextProps.activeKey
        })
    }

    onChange = (activeKey) => {
        this.props.changePage(activeKey);
        this.props.history.push(`./${activeKey}`, this.state)
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    onLoad = () => {
        let node=document.getElementsByTagName("iframe");
        let length=node.length;
        if(node&&length!=0){
            for(let i=0;i<length;i++){
                let bHeight = node[i].contentWindow.document.body.scrollHeight;
                let dHeight = node[i].contentWindow.document.documentElement.scrollHeight;
                let height = Math.max(bHeight, dHeight);
                node[i].setAttribute("height",height);
            }
        }
    };

    add = (key) => {
    };

    remove = (targetKey) => {
        this.props.deletePage(targetKey);
        this.props.history.push(`./${this.state.activeKey}`, this.state)
    };

    render() {
        return (
            <div style={{padding: '0px 0px 0px 16px', background: '#fff', height: "100%"}}>
                <Tabs
                    hideAdd
                    onChange={this.onChange.bind(this)}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit.bind(this)}
                    style={{height: "inherit"}}>
                    {this.state.panes.map(pane => {
                            return (
                                <TabPane tab={pane.title} key={pane.key} style={{width: "inherit", padding: "0 16px 0 0"}}>
                                    <iframe
                                        src={`${pane.routeUrl}`}
                                        name={pane.title}
                                        style={{border: "1", width: "inherit"}}
                                        onLoad={this.onLoad.bind(this)}
                                        scrolling="no"
                                        token="e10adc3949ba59abbe56e057f20f883e">
                                        您的浏览器必须支持iframe.
                                    </iframe>
                                </TabPane>
                            )
                        }
                    )}
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pageList: state.page.pageList,
        activeKey: state.page.activeKey
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPage: page => dispatch(addPage(page)),
        deletePage: index => dispatch(deletePage(index)),
        changePage: key => dispatch(changePage(key))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabContent);
