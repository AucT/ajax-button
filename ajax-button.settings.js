var ajaxButton = {
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message',
    additionalData: '&_token=MY_CSRF_HERE',
    jsonParseErrorSuffix: '<br>Error parsing JSON: Please contact webmaster',

    success: function (xhr, button, notificationMessage) {
        alert('success!' + '\n' + notificationMessage);
    },
    error: function (xhr, button, exception) {
        alert('error!' + '\n' + 'status: '+xhr.status + '\n' + 'exception: ' + exception);
    },
};