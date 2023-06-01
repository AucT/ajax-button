ajaxButton.postData = function (method, url, dataString, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status === 200) {
            success(xhr.responseText, xhr);
        } else if (xhr.readyState > 3 && xhr.status !== 200) {
            error(xhr, xhr.exception);
        }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(dataString);
}

document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('js-ajax-button')) {
        return;
    }
    e.preventDefault();
    const button = e.target;
    if (button.getAttribute('data-confirm') && !confirm(button.getAttribute('data-confirm'))) {
        return;
    }
    const url = button.getAttribute('data-url');
    if (button.disabled) {
        return;
    }
    button.disabled = true;
    ajaxButton.postData('post', url, ajaxButton.additionalData + (button.getAttribute('data-adata') || ''), function (data, xhr) {
            data = JSON.parse(data);
            ajaxButton.success(xhr, button, data[ajaxButton.notificationMessageObject] || ajaxButton.notificationMessageDefault);
            button.disabled = false;
            if (button.getAttribute('data-reload')) {
                document.location.reload();
            }
            if (data['redirect']) {
                window.location = data['redirect'];
            }
            if (button.getAttribute('data-redirect')) {
                window.location = button.getAttribute('data-redirect');
            }
            if (button.getAttribute('data-remove-target')) {
                document.querySelector(button.getAttribute('data-remove-target')).remove();
            }
            if (button.getAttribute('data-toggle-hidden')) {
                document.querySelectorAll(button.getAttribute('data-toggle-hidden')).forEach(function (el) {
                    el.hidden = !el.hidden;
                });
            }
            if (button.getAttribute('data-callback-success')) {
                window[button.getAttribute('data-callback-success')](xhr, button, data[ajaxButton.notificationMessageObject] || ajaxButton.notificationMessageDefault);
            }
        },
        function (xhr, exception) {
            button.disabled = false;
            ajaxButton.error(xhr, button, exception);
            if (button.getAttribute('data-callback-error')) {
                window[button.getAttribute('data-callback-error')](xhr, button, null, exception);
            }
        })
});