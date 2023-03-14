const network = require("network");

const main = async () => {
  await get_interfaces();
};

const get_gateway = async () => {
  network.get_gateway_ip(function (err: any, ip: any) {
    console.log(err || ip); // err may be 'No active network interface found.'
  });
};

const get_interfaces = async () => {
  network.get_interfaces_list(function (err: any, list: any[]) {
    console.log(err || list);
    /* list should be:
      
        [{
          name: 'eth0',
          ip_address: '10.0.1.3',
          mac_address: '56:e5:f9:e4:38:1d',
          type: 'Wired',
          netmask: '255.255.255.0',
          gateway_ip: '10.0.1.1' 
         },
         { ... }, { ... }]
      
        */
  });
};

main();
