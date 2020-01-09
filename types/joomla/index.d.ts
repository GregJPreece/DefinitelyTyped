// Type definitions for joomla 3.9
// Project: https://github.com/joomla/joomla-cms
// Definitions by: Greg J Preece <https://github.com/GregJPreece>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Joomla {

    interface JStoredOptions {
        [key: string]: any;
    }

    interface JText {

        /**
         * Translates a string into the current language.
         *
         * @param key   The string to translate
         * @param def   Default string
         */
        _(key: string, def?: string): string;

        /**
         * Load new strings in to Joomla.JText
         *
         * @param object  Object with new strings
         */
        load(object: { [key: string]: string }): JText;

    }

    interface Base {

        /**
         * Joomla options storage
         *
         * @since 3.7.0
         */
        optionsStorage: JStoredOptions;

        JText: JText;
        Text: JText;

        /**
         * Convert errors encountered during AJAX into localised human-readable
         * error messages.
         * Used by some javascripts such as sendtestmail.js and permissions.js
         *
         * @param xhr         XHR object.
         * @param textStatus  Type of error that occurred.
         * @param error       Textual portion of the HTTP status.
         *
         * @return JavaScript object containing the system error message.
         *
         * @since  3.6.0
         */
        ajaxErrorsMessages(xhr: XMLHttpRequest, textStatus: string, error: string): { error: string[] };

        /**
         * Toggles the check state of a group of boxes
         *
         * Checkboxes must have an id attribute in the form cb0, cb1...
         *
         * @param checkbox  The number of box to 'check', for a checkbox element
         * @param stub      An alternative field name
         */
        checkAll(checkbox: any, stub?: string): boolean;

        /**
         * Method to Extend Objects
         *
         * @param destination Destination object, will be merged onto
         * @param source Source object
         * @return Extended object
         */
        extend(destination: object, source: object): object;

        /**
         * Get script(s) options
         *
         * @param key  Name in Storage
         * @param def  Default value if nothing found
         *
         * @since 3.7.0
         */
        getOptions(key: string, def?: any): any;

        /**
         * USED IN: administrator/components/com_cache/views/cache/tmpl/default.php
         * administrator/components/com_installer/views/discover/tmpl/default_item.php
         * administrator/components/com_installer/views/update/tmpl/default_item.php
         * administrator/components/com_languages/helpers/html/languages.php
         * libraries/joomla/html/html/grid.php
         *
         * @param isitchecked  Flag for checked
         * @param form         The form
         */
        isChecked(isitChecked: boolean, form?: HTMLFormElement): void;

        /**
         * USED IN: administrator/components/com_banners/views/client/tmpl/default.php
         * Actually, probably not used anywhere. Can we deprecate in favor of <input type="email">?
         *
         * Verifies if the string is in a valid email format
         *
         * @param text  The text for validation
         * @deprecated  4.0 No replacement. Use formvalidator
         */
        isEmail(text: string): boolean;

        /**
         * Add Joomla! loading image layer.
         *
         * Used in: /administrator/components/com_installer/views/languages/tmpl/default.php
         *          /installation/template/js/installation.js
         *
         * @param task           The task to do [load, show, hide] (defaults to show).
         * @param parentElement  The HTML element where we are appending the layer (defaults to body).
         * @return The HTML loading layer element.
         * @since  3.6.0
         * @deprecated  4.0 No direct replacement.
         *              4.0 will introduce a web component for the loading spinner, therefore the spinner will need to
         *              explicitly be loaded in all relevant pages.
         */
        loadingLayer(task: string, parentElement: HTMLElement): HTMLElement;

        /**
         * Load new options from given options object or from Element
         *
         * @param options  The options object to load. Eg {"com_foobar" : {"option1": 1, "option2": 2}}
         *
         * @since 3.7.0
         */
        loadOptions(options?: JStoredOptions): void;

        /**
         * USED IN: libraries/joomla/html/toolbar/button/help.php
         *
         * Pops up a new window in the middle of the screen
         *
         * @deprecated  4.0 No replacement
         */
        popupWindow(mypage: string, myname: string, w: number, h: number, scroll: string): void;

        /**
         * Removes all system messages currently onscreen
         */
        removeMessages(): void;

        /**
         * Render messages send via JSON
         * Used by some javascripts such as validate.js
         *
         * @param messages    JavaScript object containing the messages to render. Example:
         *                    var messages = {
         *                        "message": ["Message one", "Message two"],
         *                        "error": ["Error one", "Error two"]
         *                    };
         */
        renderMessages(messages: { [key: string]: string[] }): void;

        /**
         * Method to replace all request tokens on the page with a new one.
         * Used in Joomla Installation
         *
         * @param newToken  The new token
         */
        replaceTokens(newToken: string): void;



        /**
         * Method to perform AJAX request
         *
         * @param options   Request options:
         * {
         *    url:       'index.php',  // Request URL
         *    method:    'GET',        // Request method GET (default), POST
         *    data:      null,         // Data to be sent, see https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/send
         *    perform:   true,         // Perform the request immediately, or return XMLHttpRequest instance and perform it later
         *    headers:   null,         // Object of custom headers, eg {'X-Foo': 'Bar', 'X-Bar': 'Foo'}
         *
         *    onBefore:  function(xhr){}            // Callback on before the request
         *    onSuccess: function(response, xhr){}, // Callback on the request success
         *    onError:   function(xhr){},           // Callback on the request error
         * }
         *
         * @example
         *
         * 	Joomla.request({
         *		url: 'index.php?option=com_example&view=example',
         *		onSuccess: function(response, xhr){
         *			console.log(response);
         *		}
         * 	})
         *
         * @see    https://developer.mozilla.org/docs/Web/API/XMLHttpRequest
         */
        request(options: object): XMLHttpRequest | boolean;

        /**
         * Default submit function. Can be overriden by the component to add custom logic
         *
         * @param task  The task to execute using the form contents
         */
        submitbutton(task: string): void;

        /**
         * Generic form submit handler
         *
         * @param task      The given task
         * @param form      The form element
         * @param validate  The form element
         */
        submitform(task: string, form?: Node, validate?: boolean): void;

        /**
         * USED IN: libraries/joomla/html/html/grid.php
         * In other words, on any reorderable table
         *
         * @param order  The order value
         * @param dir    The direction
         * @param task   The task
         * @param form   The form
         */
        tableOrdering(order: string, dir: string, task: string, form: Node): void;

    }

    /**
     * Unobtrusive Form Validation library
     *
     * Inspired by: Chris Campbell <www.particletree.com>
     *
     * @since  1.5
     */
    interface JFormValidator {

        /**
         * Attaches the validator to the given HTML form
         * @param form Form element to attach to
         */
        attachToForm(form: HTMLElement): void;

        /**
         * Check validity for a HTML form
         * @param form Form to validate
         */
        isValid(form: HTMLElement): boolean;

        /**
         * Sets a custom validation handler for elements in the form
         * @param name Name of the handler
         * @param fn Handler function, should take (value, element)
         * @param en Enabled
         */
        setHandler(name: string, fn: Function, en: boolean): void;

        /**
         * Validates an element in the form, updates its visual state
         * to match its validation state, and returns validation success/failure
         * @param el The form element to validate
         */
        validate(el: HTMLInputElement): boolean;
    }

}

// Support imports
declare const Joomla: Joomla.Base;
export = Joomla;

// Support globals
export as namespace Joomla;

declare global {

    interface Document {
        formvalidator: Joomla.JFormValidator;
    }

    interface Window {

        /**
         * USED IN: administrator/components/com_content/views/article/view.html.php
         * actually, probably not used anywhere.
         *
         * Changes a dynamically generated list
         *
         * @param listname The name of the list to change
         * @param source A javascript array of list options in the form [key,value,text]
         * @param key The key to display
         * @param orig_key The original key that was selected
         * @param orig_val The original item value that was selected
         * @deprecated  4.0 No replacement
         */
        changeDynaList(listname: string, source: string[], key: string, orig_key: string, orig_val: string): void;


        /**
         * Checks all the boxes unless one is missing then it assumes it's checked out.
         * Weird. Probably only used by ^saveorder
         *
         * @param n     The total number of checkboxes expected
         * @param task  The task to perform
         * @deprecated 4.0  No replacement
         */
        checkAll_button(n: number, task: string): void;

        /**
         * USED IN: administrator/components/com_users/views/mail/tmpl/default.php
         * Let's get rid of this and kill it
         *
         * @param frmName The form name to fetch a value from
         * @param srcListName The name of the input to fetch the value for
         * @deprecated  4.0 No replacement
         */
        getSelectedValue(frmName: string, srcListName: string): string | null;

        /**
         * USED IN: all over :)
         *
         * Submits an admin list form with a specific task for a record, such
         * as "edit" or "delete". Used for actions such as "edit row" in an
         * admin record list.
         *
         * @param id Name of the checkbox set to check
         * @param task The task to submit: edit, delete, etc
         * @deprecated 4.0  Use Joomla.listItemTask() instead
         */
        listItemTask(id: string, task: string): boolean;

        /**
         * USED IN: administrator/components/com_menus/views/menus/tmpl/default.php
         * Probably not used at all
         *
         * Returns the value of the radio button that is checked.
         * Returns an empty string if none are checked, or
         * there are no radio buttons
         *
         * @param radioObj Single or set of radio buttons to get values for
         * @deprecated  4.0 No replacement
         */
        radioGetCheckedValue(radioObj: HTMLInputElement | HTMLInputElement[]): string;

        /**
         * USED IN: libraries/joomla/html/html/grid.php
         * Internally, just calls window.checkAll_button()
         *
         * @see checkAll_button
         * @deprecated 4.0  No replacement
         */
        saveorder(n: number, task: string): void;

        /**
         * Default submit function. Usually would be overriden by the component
         * Internally delegates to Joomla.submitbutton()
         *
         * @param task  The task to execute using the form contents
         * @deprecated 4.0  Use Joomla.submitbutton() instead.
         */
        submitbutton(task: string): void;

        /**
         * Submit the admin form
         * Internally delegates to Joomla.submitform()
         *
         * @param task  The task to execute using the form contents
         * @deprecated 4.0  Use Joomla.submitform() instead.
         */
        submitform(task: string): void;

        /**
         * USED IN: administrator/components/com_modules/views/module/tmpl/default.php
         *
         * Writes a dynamically generated list
         *
         * @param selectParams The parameters to insert into the <select> tag
         * @param source A javascript array of list options in the form [key,value,text]
         * @param key The key to display for the initial state of the list
         * @param orig_key The original key that was selected
         * @param orig_val The original item value that was selected
         * @param element The elem where the list will be written
         * @deprecated  4.0 No replacement
         */
        writeDynaList(selectParams: string, source: string[], key: string, orig_key: string, orig_val: string, element?: Node): void;

    }

}
