const FileDownload = require('js-file-download');
//open/close left bar

export const HANDLE_LEFT = 'HANDLE_LEFT';
export const handleLeft = (value) => async (dispatch) => {
    dispatch({
        type: HANDLE_LEFT,
        payload: value
    });
};

//open/close modal
export const HANDLE_MODAL = 'HANDLE_MODAL';
export const handleModal = (value) => async (dispatch) => {
    dispatch({
        type: HANDLE_MODAL,
        payload: value
    });
};

//open/close modal
export const HANDLE_USAGE_MODAL = 'HANDLE_USAGE_MODAL';
export const handleUsageModal = (value) => async (dispatch) => {
    dispatch({
        type: HANDLE_USAGE_MODAL,
        payload: value
    });
};

// Get content stats
export const CONTENT_STATS = 'CONTENT_STATS';
export const contentStats =()=>postCall(CONTENT_STATS,null,'/users');

export const postCall=(type, data , url) => {
        return  async (dispatch, getState, api) => {
            const res = await api.post(url, data)
                .then(function (res) {
                    return res;
                })
                .catch(function (err) {
                    return err.response;
                });

            dispatch({
                type: type,
                payload: res.data
            });
        };
};

export const getCall=(type, data , url) => {
    return  async (dispatch, getState, api) => {
        const res = await api.get(url, data)
            .then(function (res) {
                return res;
            })
            .catch(function (err) {
                return err.response;
            });

        dispatch({
            type: type,
            payload: res.data
        });
    };
};

export const getCallCSV=(type, data , url) => {
    return  async (dispatch, getState, api) => {
        return  api.get(url, data)
            .then((response) => {
                FileDownload(response.data, 'Utilization'+data.params.utDate+'.csv');
            });
    };
};

export const getCallCSVWeekly=(type, data , url) => {
    return  async (dispatch, getState, api) => {
        return  api.get(url, data)
            .then((response) => {
                FileDownload(response.data, 'Utilization'+data.params.fromUtDate+"-"+data.params.toUtDate+'.csv');
            });
    };
};


export const putCall=(type, data , url) => {
    return  async (dispatch, getState, api) => {
        const res = await api.put(url, data)
            .then(function (res) {
                return res;
            })
            .catch(function (err) {
                return err.response;
            });

        dispatch({
            type: type,
            payload: res.data
        });
    };
};

export const deleteCall=(type, data , url) => {
    return  async (dispatch, getState, api) => {
        const res = await api.delete(url, data)
            .then(function (res) {
                return res;
            })
            .catch(function (err) {
                return err.response;
            });

        dispatch({
            type: type,
            payload: res.data
        });
    };
};