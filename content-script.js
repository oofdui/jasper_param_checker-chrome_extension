//var site='Test';
//document.getElementById('WorkOrder_Fields_UDF_CHAR1').value=site+' Checkup';



var actualCode = '(' + function() {
    // All code is executed in a local scope.
    // For example, the following does NOT overwrite the global `alert` method
    var alert = null;
    // To overwrite a global variable, prefix `window`:
    window.alert = null;
} + ')();';
var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.remove();