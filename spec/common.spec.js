/*global ko, $, jasmine, describe, it, beforeEach, afterEach, spyOn, expect*/
/*jslint maxlen:256*/
(function () {
    'use strict';

    var testWidgetOptions;

    testWidgetOptions = function (widgetName, optionNamesAndValues) {
        /// <summary>Tests that changing an observable option in the viewmodel updates the
        /// corresponding widget option.</summary>
        /// <param name='widgetName' type='String'></param>
        /// <param name='optionNamesAndValues' type='Object'>Map of widget option names
        /// and values to test them with.</param>

        var prop, initialValue, newValue, $wrapper, $element, vm;

        $wrapper = $('<div></div>').appendTo('body');
        for (prop in optionNamesAndValues) {
            if (optionNamesAndValues.hasOwnProperty(prop)) {
                initialValue = optionNamesAndValues[prop][0];
                newValue = optionNamesAndValues[prop][1];
                $element = $('<div data-bind="' + widgetName + ': { ' + prop + ': observableProperty }"></div>').appendTo($wrapper);
                vm = { observableProperty: ko.observable(initialValue) };

                ko.applyBindings(vm);

                jasmine.log('option: ' + prop);
                expect($element[widgetName]('option', prop)).toEqual(initialValue);
                vm.observableProperty(newValue);
                expect($element[widgetName]('option', prop)).toEqual(newValue);

                ko.removeNode($element[0]);
            }
        }
        $wrapper.remove();
    };

    window.testWidgetOptions = testWidgetOptions;
}());