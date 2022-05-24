import axios from 'axios';
import * as actions from './ActionTypes';
import { url } from '../functions/url';
import { setInitialFilteredData } from './filteredDataActions';

export const fetchDataRequest = () => {
    return {
        type: actions.FETCH_DATA_REQUEST
    }
}

export const fetchDataSuccess = (data) => ({
    type: actions.FETCH_DATA_SUCCESS,
    payload: data
})

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(fetchDataRequest())
        await axios
            .get(`${url}posts`)
            .then(res => {
                const data = res.data
                dispatch(fetchDataSuccess(data))
                dispatch(setInitialFilteredData(data))
            })
    }
}