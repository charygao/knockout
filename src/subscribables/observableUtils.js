ko.when = function(predicate, callback, context) {
    var observable = ko.pureComputed(predicate, context).extend({notify:'always'});
    var subscription = observable.subscribe(function(value) {
        if (value) {
            subscription.dispose();
            callback.call(context, value);
        }
    });
    // In case the initial value is true, process it right away
    observable['notifySubscribers'](observable.peek());

    return subscription;
};

ko.exportSymbol('when', ko.when);
