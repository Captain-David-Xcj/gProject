import React from 'react'
import {Route} from "react-router";
import Welcome from "./welcome/Welcome";
import Search from "./search/Search";
import Picture from "./picture/Picture";
import {addPage, changePage, deletePage} from "../../actions";
import {connect} from "react-redux";

class Content extends React.Component{
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const key=this.props.match.params.key;
        if(this.state.activeKey!==key){
            this.props.history.push(`./${this.state.activeKey}`,this.state)
        }
    }

    render() {
        const key=this.props.match.params.key;
        return(
            <div>
            {(key===this.state.activeKey)?<div>
                <Route exact path="/welcome" component={Welcome}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/picture" component={Picture}/>
            </div>:<a href="/">路径不符,请点击返回首页！</a>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);