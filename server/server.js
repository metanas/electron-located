let dashboard = require('./models/dashboard');
let society = require('./models/society');
let building = require('./models/building');
let apartment = require('./models/apartment');
let contract = require('./models/contract');
let client = require('./models/client');
let payment = require('./models/payment');
let common = require('./models/common');
let ipc = require('electron').ipcMain;
let fs = require('fs');

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

ipc.on('society_delete', function (event, id) {
  society.deleteSociety(id).then(function (response) {
    event.sender.send('society_delete_reply')
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

ipc.on('building_delete', function (event, id) {
  building.deleteBuilding(id).then(function (response) {
    event.sender.send('building_delete_reply')
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
      json.apartment_list = response;
    });

    await apartment.getTotalApartments().then((response) => {
      json.total_item = response;
    })
  }

  event.sender.send("apartment_list_reply", json);
});

ipc.on("apartment_info", function (event, id) {
  apartment.getApartment(id).then(function (response) {
    event.sender.send("apartment_info_reply", response)
  })
});

ipc.on('apartment_form', async function (event, data) {
  let id;
  await apartment.postApartment(data).then(function (response) {
    id = response;
  });

  for (let i = 0; i < data.image_path.length; i++) {
    fs.copyFile(data.image_path[i], __dirname + "/../assert/" + data.image_name[i], function (err) {
      if (!err) {
        apartment.postApartmentImage(data.image_name[i], id)
      }
    });
  }
});

ipc.on('apartment_delete', function (event, data) {
  apartment.deleteApartment(data).then(function (response) {
    event.sender.send("apartment_delete_reply", response)
  })
});
// ==========================================================================

// Client Function
// ==========================================================================
ipc.on('client_list', async function (event, page) {
  let json = {};
  await client.getClients(page).then(function (response) {
    json.client_list = response
  });

  await client.getTotalClients().then(function (response) {
    json.total_item = response
  });

  event.sender.send('client_list_reply', json)
});

ipc.on('client_form', (event, data) => {
  client.postClient(data).then(function () {

  })
});

ipc.on('client_info', async (event, id) => {
  let json = {};
  await client.getClient(id).then(function (response) {
    json.info = response
  });

  await payment.getPaymentUnpaidClient(id).then(function (response) {
    json.unpaid = response['total_unpaid']
  });

  event.sender.send("client_info_reply", json)
});

ipc.on('client_delete', function (event, id) {
  client.deleteClient(id).then(function (response) {
    event.sender.send('client_delete_reply')
  })
});
// ==========================================================================

// Contract Function
// ==========================================================================
ipc.on('contract_list', async function (event, page, id) {
  let json = {};
  await contract.getContracts(page, id).then(function (response) {
    json.contract_list = response
  });

  await contract.getTotalContracts().then(function (response) {
    json.total_item = response;
  });

  event.sender.send('contract_list_reply', json);
});

ipc.on('contract_form', function (event, data) {
  contract.postContract(data).then(function (response) {
    event.sender.send('contract_form_reply')
  })
});

ipc.on('contract_delete', function (event, id) {
  contract.deleteContract(id).then(function (response) {
    event.sender.send("contract_delete_reply")
  });
});

// PDF Function
// ==========================================================================
ipc.on('payment_form', function (event, data) {
  payment.postPayment(data).then(function () {
    event.sender.send('contract_form_reply')
  })
});


ipc.on('pdf_get_data', function (event, id) {
  contract.getContracts(null, id, null).then(function (response) {
    event.sender.send('pdf_get_data_replay', response);
  })
});

// Payment Function
// ==========================================================================
ipc.on('payment_list', async (event, page) => {
  let json = {};
  await payment.getPayments(page).then((response) => {
    json.payment_list = response;
  });

  await payment.getTotalPayments().then((response) => {
    json.total_item = response;
  });

  event.sender.send("payment_list_reply", json);
});

ipc.on("payment_update", (event) => {
  this.init();
  event.sender.send("payment_update_reply")
});

module.exports.init = function () {
  contract.getContracts(null, null, true).then(function (response) {
    response.forEach(function (item) {
      let data = {
        id_contract: item.id,
        price: item.location_price
      };
      payment.postPayment(data)
    })
  })
};