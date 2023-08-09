var demoNotification = {};
demoNotification.success = function (button, message, title) {
    b5toast.success(message, title);
};

demoNotification.error = function (xhr, button, exception) {
    //check if json and try to get error message
    b5toast.error(demoNotification.getErrorMessage(xhr, exception));
};

demoNotification.getErrorMessage = function (xhr, exception) {
    const contentType = xhr.getResponseHeader('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        try {
            const obj = JSON.parse(xhr.responseText);
            if (obj.error) {
                return 'Error<br>' + obj.error;
            }
            //this is for default laravel error ajax response. It has errors array with error strings
            if (obj.errors) {
                let message = '<ul>';
                const keys = Object.keys(obj.errors);
                for (let i = 0; i < keys.length; i++) {
                    message += '<li>' + obj.errors[keys[i]] + '</li>';
                }
                message += '</ul>'
                return 'Error request<br>' + message;
            }
        } catch (error) {
            return xhr.responseText + '<br>Error parsing JSON: Please contact webmaster';
        }
    }

    if (xhr.status === 0) {
        return 'Server error<br>Not connected. Verify Network.';
    } else if (xhr.status === 400) {
        return 'Bad Request';
    } else if (xhr.status === 401) {
        window.location.assign('/login');
        return '401 Unauthorized';
    } else if (xhr.status === 403) {
        return '403 Forbidden';
    } else if (xhr.status === 404) {
        return '404 Not Found<br>The server cannot find the requested resource';
    } else if (xhr.status === 405) {
        return ' 405 Method Not Allowed ';
    } else if (xhr.status === 422) {
        return 'Bad Request';
    } else if (exception === 'parsererror') {
        return 'Requested JSON parse failed';
    } else if (exception === 'timeout') {
        return 'Time out error';
    } else if (exception === 'abort') {
        return 'Ajax request aborted';
    } else {
        return 'Unknown error!';
    }
}