import { ref } from 'vue';

export const useTodoApi = (apiBaseUrl, acquisitionAccessToken) => {

    const items = ref([]);

    const clear = () => items.value = [];

    const refresh = async (successCallback, failureCallback) => {
        const accessToken = acquisitionAccessToken();
        fetch(`${apiBaseUrl}/todos`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`API fetch failed.(status = ${response.status})`);
            }
        }).then(data => {
            items.value = data;
            successCallback && successCallback();
        }).catch(error => {
            failureCallback && failureCallback(error)
        });
    };

    const add = async (title, successCallback, failureCallback) => {
        const accessToken = acquisitionAccessToken();
        fetch(`${apiBaseUrl}/todos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        }).then(response => {
            if (response.ok) {
                successCallback && successCallback();
            } else {
                throw new Error(`API fetch failed.(status = ${response.status})`);
            }
        }).catch(error => {
            failureCallback && failureCallback(error)
        });
    };

    const remove = async (id, successCallback, failureCallback) => {
        const accessToken = acquisitionAccessToken();
        fetch(`${apiBaseUrl}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then(response => {
            if (response.ok) {
                successCallback && successCallback();
            } else {
                throw new Error(`API fetch failed.(status = ${response.status})`);
            }
        }).catch(error => {
            failureCallback && failureCallback(error)
        });
    };

    return {
        items,
        clear,
        refresh,
        add,
        remove,
    };
};
