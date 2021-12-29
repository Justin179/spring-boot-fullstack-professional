import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllEntries = () =>
    fetch("api/v1/entries")
        .then(checkStatus);

export const addNewEntry = entry =>
    fetch("api/v1/entries", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(entry)
        }
    ).then(checkStatus)

export const deleteEntry = entryId =>
    fetch(`api/v1/entries/${entryId}`, {
        method: 'DELETE'
    }).then(checkStatus);