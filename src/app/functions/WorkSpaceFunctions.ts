import { ITableWorkSpace, IWorkSpace } from "@/interfaces/WorkSpaces";

export function WorkSpaceDataToTableData(workspaces:IWorkSpace[]){
  const table: ITableWorkSpace[] = [];
  
  workspaces.map((wk) => {
    table.push({
      id:wk._id,
      company: wk.company,
      tradename: wk.tradename,
      logo: wk.logo,
      isologo: wk.isologo,
      isverificatedBankAccount: wk.isverificatedBankAccount,
      isverificatedPhone: wk.isverificatedPhone,
      isverificatedEmail: wk.isverificatedEmail,
      bankAccountStatus: wk.bankAccountStatus,
      cp: wk.cp,
      validTo: wk.validTo,
      validFrom: wk.validFrom,
      status: wk.status,
    });
  });

  return table;
}