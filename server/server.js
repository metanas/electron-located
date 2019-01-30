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
  await society.getSocieties(page).then(async function (response) {
    json.society_list = [];
    for (let i = 0; i < response.length; i++) {
      let list = {};
      list.info = response[i];

      list.totalBuildings = await society.getTotalSocietyBuildings(response[i].id);

      list.totalPayment = await society.getSocietySumPaymentValue(response[i].id);

      json.society_list.push(list);
    }
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

    } else {
      console.log(err)
    }
  });

  society.postSociety(data).then(function (response) {
    event.sender.send("society_form_reply")
  })
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
    await society.getSocietyBuildings(page, id).then(async function (response) {
      json.building_list = [];

      for (let i = 0; i < response.length; i++) {
        let list = {};

        list.info = response[i];

        list.totalApartments = await building.getTotalBuildingApartments(response[i].id);

        list.totalClient = await building.getTotalBuildingClientsById(response[i].id);

        json.building_list.push(list);
      }

    });

    await society.getTotalSocietyBuildings(id).then(function (response) {
      json.total_item = response;
    })
  } else {
    await building.getBuildings(page).then(async function (response) {
      json.building_list = [];

      for (let i = 0; i < response.length; i++) {
        let list = {};

        list.info = response[i];

        list.totalApartments = await building.getTotalBuildingApartments(response[i].id);

        list.totalClients = await building.getTotalBuildingClientsById(response[i].id);

        json.building_list.push(list);
      }
    });

    await building.getTotalBuildings().then(function (response) {
      json.total_item = response;
    })
  }

  event.sender.send('building_list_reply', json)

});

ipc.on("building_info", async function (event, id) {
  let json = {};

  json.building = await building.getBuilding(id);

  json.society = await society.getSociety(json.building['id_society']);

  json.apartment_total = await apartment.getTotalBuildingApartments(id);

  json.apartments_list = await apartment.getBuildingApartments(id);

  event.sender.send("building_info_reply", json)
});

ipc.on('building_form', function (event, data) {
  building.postBuilding(data).then(function (response) {

  });

  event.sender.send("building_form_reply")
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
    await building.getBuildingApartments(page, id).then(async function (response) {
      json.apartment_list = [];
      for (let i = 0; i < response.length; i++) {
        let list = {};

        list.info = response[i];

        list.building = await building.getBuilding(response[i].id_building);

        list.contract = await contract.getContractFormApartment(response[i].id);

        if (typeof list['contract'] !== "undefined")
          list.client = await client.getClient(list.contract['id_client']);

        json.apartment_list.push(list)
      }
    });

    await apartment.getTotalBuildingApartments(id).then(function (response) {
      json.total_item = response;
    })
  } else {
    await apartment.getApartments(page).then(async function (response) {
      json.apartment_list = [];
      for (let i = 0; i < response.length; i++) {
        let list = {};

        list.info = response[i];

        list.building = await building.getBuilding(response[i].id_building);

        list.contract = await contract.getContractFormApartment(response[i].id);

        if (typeof list['contract'] !== "undefined")
          list.client = await client.getClient(list.contract['id_client']);

        json.apartment_list.push(list)
      }
    });

    await apartment.getTotalApartments().then((response) => {
      json.total_item = response;
    })
  }

  event.sender.send("apartment_list_reply", json);
});

ipc.on("apartment_info", async function (event, id) {
  let json = {};
  await apartment.getApartment(id).then(async function (response) {
    json.apartment = response;

    json.society = await society.getSociety(json.apartment['id_society']);

    json.contract = await contract.getContractFormApartment(response.id);

    if (typeof json['contract'] !== "undefined") {
      json.client = await client.getClient(json.contract['id_client']);

      json.payment = await payment.getTotalUnPaidPayment(json.contract['id']);
    }
  });
  event.sender.send("apartment_info_reply", json)
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

  event.sender.send("apartment_form_reply")
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
  await client.getClients(page).then(async function (response) {
    json.client_list = [];
    for (let i = 0; i < response.length; i++) {
      let list = {};

      list.info = response[i];

      list.totalPayment = await client.getClientSumPaymentValue(response[i].id);

      json.client_list.push(list);
    }
  });

  await client.getTotalClients().then(function (response) {
    json.total_item = response
  });

  event.sender.send('client_list_reply', json)
});

ipc.on('client_form', (event, data) => {


  client.postClient(data).then(function (id) {
    data.telephone.forEach(function (item) {
      client.addTelephone(item, id).then(function (response) {

      })
    })
  });
  event.sender.send("client_form_reply")
});

ipc.on('client_info', async (event, id) => {
  let json = {};
  await client.getClient(id).then(function (response) {
    json.info = response
  });

  await payment.getPaymentUnpaidClient(id).then(function (response) {
    json.unpaid = response
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
  await contract.getContracts(page, id).then(async function (response) {
    json.contract_list = [];

    for (let i = 0; i < response.length; i++) {
      let list = {};

      list.info = response[i];

      list.apartment = await apartment.getApartment(response[i]['id_apartment']);

      list.building = await building.getBuilding(list.apartment['id_building']);

      list.client = await client.getClient(response[i]['id_client']);

      json.contract_list.push(list);
    }
  });

  await contract.getTotalContracts().then(function (response) {
    json.total_item = response;
  });

  event.sender.send('contract_list_reply', json);
});

ipc.on('contract_form', function (event, data) {
  contract.postContract(data).then(function (response) {

  });
  event.sender.send('contract_form_reply')
});

ipc.on('contract_delete', function (event, id) {
  contract.deleteContract(id).then(function (response) {
    event.sender.send("contract_delete_reply")
  });
});

// PDF Function
// ==========================================================================
// Payment Function
// ==========================================================================
ipc.on('payment_form', function (event, data) {
  payment.postPayment(data).then(function () {

  });
  event.sender.send('contract_form_reply')
});

ipc.on("payment_put", (event, data) => {
  payment.putPayment(data.id, data.price, data.mode).then(function (response) {

  });

  event.sender.send("payment_put_reply")
});

ipc.on("payment_info", async (event, id) => {
  let bill = {};

  bill.payment = await payment.getPayment(id);

  bill.contract = await contract.getContract(bill.payment['id_contract']);

  bill.apartment = await apartment.getApartment(bill.contract['id_apartment']);

  bill.society = await society.getSociety(bill.apartment['id_society']);

  bill.client = await client.getClient(bill.contract['id_client']);

  event.sender.send("payment_info_reply", bill);
});


ipc.on('pdf_get_data', async function (event, id) {
  let json = [];
  // if (id !== "all") {
  for (let i = 0; i < id.length; i++) {
    let bill = {};

    payment.updatePayment(id[i]);

    bill.payment = await payment.getPayment(id[i]);

    bill.contract = await contract.getContract(bill.payment['id_contract']);

    bill.apartment = await apartment.getApartment(bill.contract['id_apartment']);

    bill.society = await society.getSociety(bill.apartment['id_society']);

    bill.client = await client.getClient(bill.contract['id_client']);

    json.push(bill);
  }
  // } else {
  //   payment.getPayments(null, null).then(async function (response) {
  //     for (let i = 0; i < response.length; i++) {
  //       let bill = {};
  //
  //       payment.updatePayment(response[i].id);
  //
  //       bill.payment = response[i];
  //
  //       bill.contract = await contract.getContract(bill.payment['id_contract']);
  //
  //       bill.apartment = await apartment.getApartment(bill.contract['id_apartment']);
  //
  //       bill.society = await society.getSociety(bill.apartment['id_society']);
  //
  //       bill.client = await client.getClient(bill.contract['id_client']);
  //
  //       json.push(bill);
  //     }
  //   })
  // }
  event.sender.send('pdf_get_data_replay', json);
});

ipc.on('payment_list', async (event, page, id) => {
  let json = {};
  await payment.getPayments(page, id).then((response) => {
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

module.exports.init = async function () {
  contract.getContracts(null, null, true).then(async function (response) {
      for (let i = 0; i < response.length; i++) {
        let society_item = await society.getSocietyFromContract(response[i]['id_apartment']);

        let apartment_item = await apartment.getApartment(response[i]['id_apartment']);

        payment.getTotalPaymentFormSociety(society_item['id']).then(function (payment_count) {
          let data = {
            id: society_item['id'] + "#" + parseInt(society_item['start'] + payment_count.total + 1),
            id_contract: response[i].id,
            price: parseFloat(apartment_item.location_price + response[i].tax)
          };
          payment.postPayment(data)
        });
      }
    }
  )
}
;