# ajax-button - power up button to make request
ajax-button will power up your button, so on click it will make post request.

+ it requires less syntax than form or uajax
- it won't work with js disabled

This can be useful for people that use server-side generation and don't like to touch javascript, but need to add some ajax flair.


## Demo
[Demo Requests](https://auct.github.io/ajax-button/demo)


## Requirements

Add ajax-button script anywhere you want. It has no dependencies. If you use custom notification place ajax-button after notification.
```html
<script defer src="/ajax-button.settings.js"></script>
<script defer src="/ajax-button.js"></script>
```

## Usage

Add class `js-ajax-button` to button that you want to be ajaxed.  
Change ajax-button-notifications or change code of ajax-button to run your notification without bridge layer for your notification/alert function. See demo for bootstrap 5 notification and alerts.

#### Global defaults from ajax-button.settings.js
```javascript
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
```


## Dynamic options for the button

You can place options in html of the form. For example `<button data-reload="1" class="js-ajax-button">`
```

data-confirm="Delete this world?" - ask confirm dialog. Procceeds only after OK is clicked (confirmed)

data-reload="1" - reload page after success
data-redirect="/success" - after success open url
data-toggle-hidden=".target" - querySelector for elements which will toggle visibility after success
data-remove-target=".target" - querySelector for elements to remove after success

//callback function example: function myFunc (xhr, button, message, exception)
data-callback-success="myFunc" - callback function after success
data-callback-error="myFunc" - callback function after error

//additional data on any button can be placed
data-adata="&_method=DELETE" - will add _method=DELETE to the button (this is laravel thing)


//callback function example: function myFunc (xhr, button, message, exception)
data-callback-success="myFunc" - callback function after success
data-callback-error="myFunc" - callback function after error
```
