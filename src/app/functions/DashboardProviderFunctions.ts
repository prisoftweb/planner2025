import { TableDashboardProviders, ProviderWithTradeLine } from "@/interfaces/DasboardProviders";

export function ProvidersDataToTableData(providers:ProviderWithTradeLine[]){
  const table: TableDashboardProviders[] = [];
  providers.map((prov) => {
    table.push({
      id: prov._id,
      currentBalance: prov.tradeline.currentbalance,
      name: prov.name,
      rfc: prov.rfc,
      status: prov.estatus,
      account: prov.account
    })
  });

  return table;
}