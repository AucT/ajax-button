var ajaxButton = {
    notificationMessageDefault: 'Request completed successfully',
    notificationMessageObject: 'message',
    additionalData: '&_token=MY_CSRF_HERE',

    success: function (xhr, button, notificationMessage) {
        demoNotification.success(button, notificationMessage);
    },
    error: function (xhr, button, exception) {
        demoNotification.error(xhr, button, exception);
    },
};