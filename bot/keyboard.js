const kb = require('./keyboard_buttons')
module.exports = {
    lang:[
        [kb.lang.uz],
        [kb.lang.ru]
    ],
    home:[
        [kb.home.services,kb.home.orders],
        [kb.home.setting]
    ],
    service:[
        [kb.services.service,kb.services.products],
        [kb.back.backButton]
    ],    
    order:[
        [kb.back.backButton]
    ],
    setting:[
        [{text: kb.phone.phoneUpdate, request_contact: true},{text: kb.location.locationUpdate, request_location: true}],
        [kb.fullname.fullnameUpdate,kb.address.addressUpdate],
        [kb.lang.uz,kb.lang.ru],
        [kb.back.backButton]
    ],
    orderphonesuccess:[
        [kb.back.backButton,{text: kb.phone.phoneUpdate, request_contact: true}]
    ],
    orderaddresssuccess:[
        [kb.back.backButton,kb.address.addressUpdate]
    ],
    simpleback:[
        [kb.back.backButton]
    ]
}