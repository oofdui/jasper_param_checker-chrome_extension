//ทำงานที่ Current Page

let report_iframe = document.getElementById('report_iframe');
let md_report_iframe = document.getElementById('md_report_iframe');
let report_direct_url = window.location;
let url_report = '';

if (report_iframe && report_iframe.src) {
    url_report = report_iframe.src;
}
else if (md_report_iframe && md_report_iframe.src) {
    url_report = md_report_iframe.src;
}
else if (report_direct_url && report_direct_url.indexOf('jasperserver')>-1) {
    url_report = report_direct_url;
}
// else {
//     alert('not found');
// }

if (url_report) {
    chrome.storage.local.set({ "jasper_url": url_report }, function(){});
}
else {
    chrome.storage.local.set({ "jasper_url": null }, function(){});
}