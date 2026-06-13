import { ClientBack, TableClient } from "@/interfaces/Clients";

export function ClientDataToTableClient(clients:ClientBack[]){
  const data: TableClient[] = [];
  clients.map((client:ClientBack) => {
    data.push(TransformClientInTableClient(client));
  });
  return data;
}

export function TransformClientInTableClient(client: ClientBack){
  const c:TableClient = {
    id: client._id,
    // name: client.name,
    name: client.name?? '',
    tradename: client.tradename?? '',
    account: client.account,
    contacts: client.contact?.length?? 0,
    currentbalance: 0,
    rfc: client.rfc,
    status: client.status,
    logo: client.logo? client.logo: '/img/clients/default.jpg',
    location: client?.location?.cp? 'Si':'No',
    phone: client?.phone?? '',
    regime: client?.regime?? '',
    taxprofile: client?.hasfulltaxprofile? 'Si':'No',
    taxregime: client?.taxregime?.id?? ''
  }
  return c;
}