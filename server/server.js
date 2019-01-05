let dashboard = require('./models/dashboard');
let society = require('./models/society');
let building = require('./models/building');
let apartment = require('./models/apartment');
let contract = require('./models/contract');
let client = require('./models/client');
let payment = require('./models/payment');
let ipc = require('electron').ipcMain;
let fs = require('fs');
let path = require('path');

// app.get('/dashboard', function (req, res) {
//   dashboard.getDashboard().then(function (response) {
//     res.json(response);
//   })
// });
// Society Function
// ==========================================================================
ipc.on('society_list', async (event, page) => {
    let json = {};
    await society.getSocieties(page).then(function (response) {
        json.society_list = response;
    });

    await society.getTotalSocieties().then(function (response) {
        json.total_item = response;
    });

    event.sender.send('society_list_reply', json)
});


ipc.on('society_form', function (event, data) {
    console.log(data);
    var image_path = data.image_path;
    var image_name = data.image_name;
    fs.copyFile(image_path, __dirname + "/../assert/" + image_name, function (err) {
        if (!err) {
            society.postSociety(data).then(function (response) {
            })
        } else {
            console.log(err)
        }
    });
});

ipc.on('society_info', function (event, id) {
    society.getSociety(id).then(function (response) {
        event.sender.send('society_info_reply', response)
    })
});
// ==========================================================================


// Building Function
// ==========================================================================
ipc.on('building_list', async function (event, page, id) {
    let json = {};
    if (id !== null) {
        await building.getBuildingsFromSociety(page, id).then(function (response) {
            json.building_list = response;
        });

        await building.getTotalBuildingApartments(id).then(function (response) {
            json.total_item = response;
        })
    } else {
        await building.getBuildings(page).then(function (response) {
            json.building_list = response;
        });

        await building.getTotalBuildings().then(function (response) {
            json.total_item = response;
        })
    }

    event.sender.send('building_list_reply', json)

});

ipc.on('building_form', function (event, data) {
    building.postBuilding(data).then(function (response) {

    })
});
// ==========================================================================

// Apartment Function
// ==========================================================================
ipc.on('apartment_list', async (event, page, id) => {
    let json = {};
    if (id !== null) {
        await apartment.getApartmentsFromBuilding(page, id).then(function (response) {
            json.apartment_list = response;
        });

        await apartment.getTotalBuildingApartments(id).then(function (response) {
            json.total_item = response;
        })
    } else {
        await apartment.getApartments(page).then(function (response) {
            console.log(response);
            json.apartment_list = response;
        });

        await apartment.getTotalApartments().then((response) => {
            json.total_item = response;
        })
    }

    event.sender.send("apartment_list_reply", json);
});

ipc.on('apartment_form', function (event, data) {
    apartment.postApartment(data).then(function (response) {
        event.sender.send('apartment_form_reply', response)
    })
});
// ==========================================================================

// Client Function
// ==========================================================================
ipc.on('client_list', function (event) {
    client.getClients().then(function (response) {
        event.sender.send('client_list_reply', response)
    })
});

ipc.on('client_form', (event, data) => {
    client.postClient(data).then(function () {

    })
});

// ==========================================================================

// Contract Function
// ==========================================================================
ipc.on('contract_list', function (event, id) {
    contract.getContracts(id).then(function (response) {
        event.sender.send('contract_list_reply', response);
    })
});

ipc.on('contract_form', function (event, data) {
    contract.postContract(data).then(function (response) {
        event.sender.send('contract_form_reply')
    })
});

ipc.on('contract_delete', function (event, id) {
    contract.deleteContract(id);
    contract.getContracts().then(function (response) {
        event.sender.send('contract_list_reply', response);
    })
});

// PDF Function
// ==========================================================================
ipc.on('payment_form', function (event, data) {
    payment.postPayment(data).then(function (response) {
        event.sender.send('contract_form_reply')
    })
});

// PDF Function
// ==========================================================================

ipc.on('pdf_get_data', function (event, id) {
    contract.getContracts(id).then(function (response) {
        event.sender.send('pdf_get_data_replay', response);
    })
});
