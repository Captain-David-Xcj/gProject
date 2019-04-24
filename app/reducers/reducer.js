import {ADD_PAGE, DELETE_PAGE, CHANGE_PAGE} from "../actions";

const initialState = {
    pageList: [],
    activeKey: "welcome"
};

export const page = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PAGE:
            return Object.assign({}, state, {
                pageList: [
                    ...state.pageList,
                    {
                        key: action.page.key,
                        title: action.page.title,
                        component: action.page.component,
                        content: action.page.content,
                        routeUrl:action.page.routeUrl
                    }
                ]
            });

        case DELETE_PAGE:
            let activeKey = state.activeKey;
            let lastIndex = 0;
            state.pageList.forEach((pane, i) => {
                if (pane.key === action.index) {
                    lastIndex = i - 1;
                }
            });
            const pageList2 = state.pageList.filter((page) => {
                return page.key !== action.index
            });
            if (state.pageList.length && pageList2.length && activeKey === action.index) {
                if (lastIndex >= 0) {
                    activeKey = state.pageList[lastIndex].key;
                } else {
                    activeKey = pageList2[0].key;
                }
            }
            return Object.assign({}, state, {
                pageList: pageList2,
                activeKey: activeKey
            });

        case CHANGE_PAGE:
            return Object.assign({}, state, {
                activeKey: action.key
            });
        default:
            return state
    }
};