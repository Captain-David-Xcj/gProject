export const ADD_PAGE = 'ADD_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const addPage = (page) => ({
    type: ADD_PAGE,
    page
});

export const deletePage = (index) => ({
    type: DELETE_PAGE,
    index
});

export const changePage = (key) => ({
    type: CHANGE_PAGE,
    key
});