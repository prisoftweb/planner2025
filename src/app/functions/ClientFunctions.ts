import { ClientBack, TableClient } from "@/interfaces/Clients";

export function ClientDataToTableClient(clients:ClientBack[]){
  const data: TableClient[] = [];
  clients.map((client:ClientBack) => {
    data.push(TransformClientInTableClient(client));
  });
  return data;
}

export function TransformClientInTableClient(client: ClientBack){
  const c = {
    'id': client._id,
    'name': client.name,
    account: client.account,
    contacts: client.contact.length,
    currentbalance: 0,
    rfc: client.rfc,
    status: client.status,
    logo: client.logo? client.logo: '/img/clients/default.jpg',
  }
  return c;
}