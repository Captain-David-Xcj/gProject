import PropTypes from 'prop-types';
import React from 'react';
import {Menu, Icon} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import {addPage, deletePage, changePage} from "../../actions";

const Mitem = Menu.Item;
const SubMenu = Menu.SubMenu;

class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: props.menuItems,
            pageList: [],
            activeKey: ""
        }
        this.props.addPage({
            title: "Welcome",
            key: "welcome",
            component: "Welcome",
            content: "welcome",
            routeUrl: __dirname + "./content/welcome.html"
        });
        this.props.history.push("/welcome", this.state)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            pageList: nextProps.pageList,
            activeKey: nextProps.activeKey
        })
    }

    formSubmenusChild(obj) {
        let cHtml = <div></div>;
        let childArray = obj.child;
        if ("undefined" != typeof (childArray) && childArray.length > 0) {
            cHtml = childArray.map((item, i) => {
                return this.formSubmenusChild(item);
            });
            return (
                <SubMenu key={obj.key} title={
                    <span>
                        <Icon type={obj.icon}/>
                        <span>{obj.title}</span>
                    </span>
                }>
                    {cHtml}
                </SubMenu>
            )
        } else {
            return (
                <Mitem key={obj.key} component={obj.component} title={obj.title} routeurl={obj.routeUrl}>
                    <Icon type={obj.icon}/>
                    {obj.title}
                </Mitem>
            )
        }
    }

    handleClick(e) {
        //console.log(e);
        const panes = this.state.pageList;
        for (let i = 0; i < panes.length; i++) {
            if (panes[i].key === e.key) {
                console.log("这个标签页已经打开了");
                this.props.changePage(e.key);
                this.props.history.push(`./${e.key}`, this.state);
                return;
            }
        }
        let url = "";
        if (e.item.props.routeurl === "") {
            url = ""
        } else {
            url = __dirname + `${e.item.props.routeurl}`
        }
        this.props.addPage({
            title: `${e.item.props.title}`,
            key: `${e.key}`,
            component: `${e.item.props.component}`,
            content: `${e.item.props.title}`,
            routeUrl: url
        });
        this.props.changePage(e.key);
        this.props.history.push(`./${e.key}`, this.state)
    }

    render() {
        const {menuItems} = this.state;
        let html = menuItems.map(
            (menuItem) => {
                if ("undefined" != typeof (menuItem.child) && menuItem.child.length > 0) {
                    return this.formSubmenusChild(menuItem);
                } else {
                    return (
                        <Mitem key={menuItem.key} title={menuItem.title}>
                            <Icon type={menuItem.icon}/>
                            {menuItem.title}
                        </Mitem>
                    )
                }
            }
        );
        return (
            <Menu theme="light"
                  onClick={this.handleClick.bind(this)}
                  style={{width: 200}}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={this.state.activeKey}
                  mode="inline">
                {html}
            </Menu>
        )
    }

};

LeftMenu.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object)
};

LeftMenu.defaultProps = {
    menuItems: [
        {
            "key": "appstore",
            "icon": "appstore",
            "title": "Appstore",
            "routeUrl": "",
            "child": [{
                "key": "search",
                "icon": "search",
                "title": "Search",
                "routeUrl": "./content/search.html",
                "component": "Search"
            }]
        },
        {
            "key": "mail",
            "icon": "mail",
            "title": "Mail",
            "routeUrl": "",
            "child": [{
                "key": "notification",
                "icon": "notification",
                "title": "Notification",
                "routeUrl": "./content/notification.html",
                "component": "Notification"
            }]
        },
        {
            "key": "setting",
            "icon": "setting",
            "title": "Setting",
            "routeUrl": "",
            "child": [{
                "key": "star",
                "icon": "star",
                "title": "Star",
                "routeUrl": "./content/star.html",
                "component": "Star"
            }]
        },
        {
            "key": "fund",
            "icon": "fund",
            "title": "Fund",
            "routeUrl": "",
            "child": [
                {
                    "key": "area-chart",
                    "icon": "area-chart",
                    "title": "Area-chart",
                    "routeUrl": "./content/areaChart.html",
                    "component": "Area-chart"
                },
                {
                    "key": "pie-chart",
                    "icon": "pie-chart",
                    "title": "Pie-chart",
                    "routeUrl": "./content/pieChart.html",
                    "component": "Pie-chart"
                },
                {
                    "key": "bar-chart",
                    "icon": "bar-chart",
                    "title": "Bar-chart",
                    "routeUrl": "./content/barChart.html",
                    "component": "Bar-chart"
                }
            ]
        },
        {
            "key": "user",
            "icon": "user",
            "title": "User",
            "routeUrl": "",
            "child": [
                {
                    "key": "picture",
                    "icon": "picture",
                    "title": "Picture",
                    "routeUrl": "./content/picture.html",
                    "component": "Picture"
                },
                {
                    "key": "phone",
                    "icon": "phone",
                    "title": "Phone",
                    "routeUrl": "./content/phone.html",
                    "component": "Phone"
                },
                {
                    "key": "message",
                    "icon": "message",
                    "title": "Message",
                    "routeUrl": "./content/message.html",
                    "component": "Message"
                }
            ]
        },
        {
            "key": "shopping",
            "icon": "shopping",
            "title": "Shopping",
            "routeUrl": "",
            "child": [
                {
                    "key": "dollar",
                    "icon": "dollar",
                    "title": "Dollar",
                    "routeUrl": "./content/dollar.html",
                    "component": "Dollar"
                },
                {
                    "key": "red-envelope",
                    "icon": "red-envelope",
                    "title": "Red-envelope",
                    "routeUrl": "./content/redEnvelope.html",
                    "component": "Red-envelope"
                }
            ]
        }
    ]
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);