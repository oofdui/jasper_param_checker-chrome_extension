//ทำงานที่ Popup

const params = ['reportUnit','pm_site_id','pm_patient_id','pm_patientvisit_id']

window.onload = function(){
    document.querySelectorAll('.bt_action').forEach(function(bt) {
        bt.addEventListener('click', function(event) {
            chrome.tabs.executeScript(null, {file: "jquery.min.js"},function(){
                chrome.tabs.executeScript(null, {file: "select2.min.js"},function(){
                    chrome.tabs.executeScript(null, {file: 'injector.js'});
                })
            })
            document.getElementById('other_params').innerHTML = '';
            setTimeout(() => {
                chrome.storage.local.get(["jasper_url"], function(items){
                    if (items && items['jasper_url']) {
                        // console.log(items['jasper_url']);
                        let url_params = new URLSearchParams(items['jasper_url']);
                        let _keys = url_params.keys();
                        let other_params = [];
                        for (let _k of _keys) {
                            if (params.indexOf(_k) > -1) {
                                //key ที่เราสนใจ (อยู่ในลิส array params)
                                if (document.getElementById(_k)) {
                                    document.getElementById(_k).value = url_params.get(_k)
                                }
                            }
                            else {
                                if (_k.length <= 20) { //ดักจำนวนไว้หน่อย บางทีมันเอาคีย์ทั้ง url มาใส่ด้วย
                                    other_params.push({'key':_k,'value':url_params.get(_k)});
                                }
                            }
                        }
                        if (other_params && other_params.length > 0) {
                            let html_content = ''
                            html_content = '<table style="width:100%;" cellpadding="0" cellspacing="0">';
                            html_content += '<thead><tr><th style="width:30%;">Name</th><th style="width:70%;">Value</th></tr></thead>';
                            html_content += '<tbody>';
                            for (let _o of other_params) {
                                html_content += '<tr><td>'+_o['key']+'</td><td style="color:#3a9ef0">'+_o['value']+'</td></tr>';
                            }
                            html_content += '</tbody>';
                            html_content += '</table>';

                            document.getElementById('other_params').innerHTML = html_content;
                        }
                        else {
                            document.getElementById('other_params').innerHTML = 'ไม่พบ Parameter อื่น';
                        }
                    }
                });
            },100);
        });
    });
}