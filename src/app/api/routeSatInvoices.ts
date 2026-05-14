import axios from "axios";

export const fiscalApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FISCAL_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY_DEV,
    "X-TENANT-KEY": process.env.NEXT_PUBLIC_TENANT_DEV,
  },
});

export async function getSatPaymentMethods() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatPaymentMethods");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al solicitar metodos de pago:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatCfdiUses() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatCfdiUses");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatInvoiceTypes() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatInvoiceTypes");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getSatPaymentForms() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatPaymentForms");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function getCompanyTAXDATAFULL(id: string, token: string) {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const url=`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companys/getCompanyTAXDATAFULL/${id}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Response:", res.data.data);
    // console.log("Response:", res.data);
    return res.data.data.stats;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener informacion de la compania";
  }
}

export async function getSatTaxRegimes() {
  try {
    // console.log("KEY:", process.env.NEXT_PUBLIC_API_KEY_DEV);
    // console.log("TENANT:", process.env.NEXT_PUBLIC_TENANT_DEV);
    // console.log("URL:", process.env.NEXT_PUBLIC_FISCAL_API_URL);
    const res = await fiscalApi.get("/api/v4/catalogs/SatTaxRegimes");
    // console.log("Response:", res.data.data);
    return res.data.data;
  } catch (error) {
    // console.error("Error al solicitar uso de cfdi:", error);
    return "Error al obtener catálogo SAT";
  }
}

export async function createFiscalApiInvoice(data:Object) {
  console.log("PAYLOAD:", JSON.stringify(data, null, 2));
  try {
    const res = await fiscalApi.post("/api/v4/invoices", data);
    console.log("Response:", res);
    console.log('json data => ', JSON.stringify(res.data.data));
    return res.data.data;
  } catch (error) {
    // console.log('Error => ', error);
    // return "Error al crear factura";
    if (axios.isAxiosError(error)) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);
      return Array.isArray(error.response?.data.data)? error.response?.data.data[0]?.errorMessage : error.response?.data?.message || "Error al crear factura";
    } else {
      // console.log(error);
      return "Error al crear factura";
    }
  }
}

export async function getSatUnitMeasurements() {
  try {
    const res = await fiscalApi.get("/api/v4/catalogs/SatUnitMeasurements");
    return res.data.data;
  } catch (error) {
    return "Error al obtener catálogo unidades del SAT";
  }
}

export async function getSatProductCodes() {
  try {
    const res = await fiscalApi.get("/api/v4/catalogs/SatProductCodes");
    console.log("Response:", res);
    return res.data.data;
  } catch (error) {
    return "Error al obtener catálogo productos del SAT";
  }
}

// curl --location 'https://test.fiscalapi.com/api/v4/invoices/income' \
// --header 'X-TENANT-KEY: c1d37b62-e6f0-43e4-aa52-f97999355878' \
// --header 'X-TIME-ZONE: America/Mexico_City' \
// --header 'Content-Type: application/json' \
// --header 'X-API-KEY: sk_test_bd49aa77_b26c_4083_91cf_8d845752a267' \
// --data-raw '{
//   "versionCode": "4.0",
//   "series": "F",
//   "date": "2026-05-01T14:56:40Z"
//   "paymentFormCode": "01",
//   "paymentMethodCode": "PUE",
//   "currencyCode": "MXN",
//   "typeCode": "I",
//   "expeditionZipCode": "42501",
//   "exchangeRate": 1,
//   "exportCode": "01",
//   "issuer": {
//     "tin": "FUNK671228PH6",
//     "legalName": "KARLA FUENTE NOLASCO",
//     "taxRegimeCode": "621",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
//   },
//   "recipient": {
//     "tin": "EKU9003173C9",
//     "legalName": "ESCUELA KEMPER URGATE",
//     "zipCode": "42501",
//     "taxRegimeCode": "601",
//     "cfdiUseCode": "G01",
//     "email": "someone@somewhere.com"
//   },
//   "items": [
//     {
//       "itemCode": "01010101",
//       "quantity": 9.5,
//       "unitOfMeasurementCode": "E48",
  
//       "description": "Invoicing software as a service",
//       "unitPrice": 3587.75,
//       "taxObjectCode": "02",
//       "itemSku": "7506022301697",
//       "discount": 255.85,
//       "itemTaxes": [
//         {
//           "taxCode": "002",
//           "taxTypeCode": "Tasa",
//           "taxRate": 0.160000,
//           "taxFlagCode": "T"
//         }
//       ]
//     }
//   ]
// }'

// curl -i -v --location 'https://test.fiscalapi.com/api/v4/invoices/income' \
// --header 'X-TENANT-KEY: XXXXX' \
// --header 'X-TIME-ZONE: America/Mexico_City' \
// --header 'Content-Type: application/json' \
// --header 'X-API-KEY: XXXX' \
// --data-raw '{
//   "versionCode": "4.0",
//   "series": "F",
//   "date": "2026-05-01T14:56:40Z",
//   "paymentFormCode": "01",
//   "paymentMethodCode": "PUE",
//   "currencyCode": "MXN",
//   "typeCode": "I",
//   "expeditionZipCode": "42501",
//   "exchangeRate": 1,
//   "exportCode": "01",
//   "issuer": {
//     "tin": "FUNK671228PH6",
//     "legalName": "KARLA FUENTE NOLASCO",
//     "taxRegimeCode": "621",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
//   },
//   "recipient": {
//     "tin": "EKU9003173C9",
//     "legalName": "ESCUELA KEMPER URGATE",
//     "zipCode": "42501",
//     "taxRegimeCode": "601",
//     "cfdiUseCode": "G01",
//     "email": "someone@somewhere.com"
//   },
//   "items": [
//     {
//       "itemCode": "01010101",
//       "quantity": 9.5,
//       "unitOfMeasurementCode": "E48",
  
//       "description": "Invoicing software as a service",
//       "unitPrice": 3587.75,
//       "taxObjectCode": "02",
//       "itemSku": "7506022301697",
//       "discount": 255.85,
//       "itemTaxes": [
//         {
//           "taxCode": "002",
//           "taxTypeCode": "Tasa",
//           "taxRate": 0.160000,
//           "taxFlagCode": "T"
//         }
//       ]
//     }
//   ]
// }'

// curl -X POST 'https://test.fiscalapi.com/api/v4/invoices/income' \
// --header 'X-TENANT-KEY: c1d37b62-e6f0-43e4-aa52-f97999355878' \
// --header 'X-TIME-ZONE: America/Mexico_City' \
// --header 'Content-Type: application/json' \
// --header 'X-API-KEY: sk_test_bd49aa77_b26c_4083_91cf_8d845752a267' \
// --data @request.json

// curl -i -v --location 'https://test.fiscalapi.com/api/v4/invoices/income' \
// --header 'X-TENANT-KEY: c1d37b62-e6f0-43e4-aa52-f97999355878' \
// --header 'X-TIME-ZONE: America/Mexico_City' \
// --header 'Content-Type: application/json' \
// --header 'X-API-KEY: sk_test_bd49aa77_b26c_4083_91cf_8d845752a267' \
// --data-raw '{
//   "versionCode": "4.0",
//   "series": "F",
//   "date": "2026-05-01T14:56:40Z",
//   "paymentFormCode": "01",
//   "paymentMethodCode": "PUE",
//   "currencyCode": "MXN",
//   "typeCode": "I",
//   "expeditionZipCode": "42501",
//   "exchangeRate": 1,
//   "exportCode": "01",
//   "issuer": {
//     "tin": "FUNK671228PH6",
//     "legalName": "KARLA FUENTE NOLASCO",
//     "taxRegimeCode": "621",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
//   },
//   "recipient": {
//     "tin": "EKU9003173C9",
//     "legalName": "ESCUELA KEMPER URGATE",
//     "zipCode": "42501",
//     "taxRegimeCode": "601",
//     "cfdiUseCode": "G01",
//     "email": "someone@somewhere.com"
//   },
//   "items": [
//     {
//       "itemCode": "01010101",
//       "quantity": 9.5,
//       "unitOfMeasurementCode": "E48",
  
//       "description": "Invoicing software as a service",
//       "unitPrice": 3587.75,
//       "taxObjectCode": "02",
//       "itemSku": "7506022301697",
//       "discount": 255.85,
//       "itemTaxes": [
//         {
//           "taxCode": "002",
//           "taxTypeCode": "Tasa",
//           "taxRate": 0.160000,
//           "taxFlagCode": "T"
//         }
//       ]
//     }
//   ]
// }'



// curl -i -v --location 'https://test.fiscalapi.com/api/v4/invoices/income' \
// --header 'X-TENANT-KEY: XXX' \
// --header 'X-TIME-ZONE: America/Mexico_City' \
// --header 'Content-Type: application/json' \
// --header 'X-API-KEY: XXX' \
// --data-raw '{
//   "versionCode": "4.0",
//   "series": "F",
//   "date": "2026-05-01T14:56:40Z",
//   "paymentFormCode": "01",
//   "paymentMethodCode": "PUE",
//   "currencyCode": "MXN",
//   "typeCode": "I",
//   "expeditionZipCode": "42501",
//   "exchangeRate": 1,
//   "exportCode": "01",
//   "issuer": {
//     "tin": "FUNK671228PH6",
//     "legalName": "KARLA FUENTE NOLASCO",
//     "taxRegimeCode": "621",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
//   },
//   "recipient": {
//     "tin": "EKU9003173C9",
//     "legalName": "ESCUELA KEMPER URGATE",
//     "zipCode": "42501",
//     "taxRegimeCode": "601",
//     "cfdiUseCode": "G01",
//     "email": "someone@somewhere.com"
//   },
//   "items": [
//     {
//       "itemCode": "01010101",
//       "quantity": 9.5,
//       "unitOfMeasurementCode": "E48",
  
//       "description": "Invoicing software as a service",
//       "unitPrice": 3587.75,
//       "taxObjectCode": "02",
//       "itemSku": "7506022301697",
//       "discount": 255.85,
//       "itemTaxes": [
//         {
//           "taxCode": "002",
//           "taxTypeCode": "Tasa",
//           "taxRate": 0.160000,
//           "taxFlagCode": "T"
//         }
//       ]
//     }
//   ]
// }'

// echo "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=" | base64 -d > cert.cer


// {
//   "versionCode": "4.0",
//   "series": "F",
//   "date": "2026-05-01T14:56:40Z",
//   "paymentFormCode": "01",
//   "paymentMethodCode": "PUE",
//   "currencyCode": "MXN",
//   "typeCode": "I",
//   "expeditionZipCode": "42501",
//   "exchangeRate": 1,
//   "exportCode": "01",
//   "issuer": {
//     "tin": "EKU9003173C9",
//     "legalName": "ESCUELA KEMPER URGATE",
//     "taxRegimeCode": "601",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
//   },
//   "recipient": {
//     "tin": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
//     "legalName": "UNIVERSIDAD ROBOTICA ESPAÑOLA",
//     "zipCode": "42501",
//     "taxRegimeCode": "621",
//     "cfdiUseCode": "G01",
//     "email": "someone@somewhere.com"
//   },
//   "items": [
//     {
//       "itemCode": "01010101",
//       "quantity": 9.5,
//       "unitOfMeasurementCode": "E48",
  
//       "description": "Invoicing software as a service",
//       "unitPrice": 3587.75,
//       "taxObjectCode": "02",
//       "itemSku": "7506022301697",
//       "discount": 255.85,
//       "itemTaxes": [
//         {
//           "taxCode": "002",
//           "taxTypeCode": "Tasa",
//           "taxRate": 0.160000,
//           "taxFlagCode": "T"
//         }
//       ]
//     }
//   ]
// }
// "tin": "",
//     "legalName": "",UNIVERSIDAD ROBOTICA ESPAÑOLA
//     "taxRegimeCode": "621",
//     "taxCredentials": [
//       {
//         "base64File": "MIIF0TCCA7mgAwIBAgIUMzAwMDEwMDAwMDA1MDAwMDMyODUwDQYJKoZIhvcNAQELBQAwggErMQ8wDQYDVQQDDAZBQyBVQVQxLjAsBgNVBAoMJVNFUlZJQ0lPIERFIEFETUlOSVNUUkFDSU9OIFRSSUJVVEFSSUExGjAYBgNVBAsMEVNBVC1JRVMgQXV0aG9yaXR5MSgwJgYJKoZIhvcNAQkBFhlvc2Nhci5tYXJ0aW5lekBzYXQuZ29iLm14MR0wGwYDVQQJDBQzcmEgY2VycmFkYSBkZSBjYWxpejEOMAwGA1UEEQwFMDYzNzAxCzAJBgNVBAYTAk1YMRkwFwYDVQQIDBBDSVVEQUQgREUgTUVYSUNPMREwDwYDVQQHDAhDT1lPQUNBTjERMA8GA1UELRMIMi41LjQuNDUxJTAjBgkqhkiG9w0BCQITFnJlc3BvbnNhYmxlOiBBQ0RNQS1TQVQwHhcNMjMwNTA5MTgwNzAwWhcNMjcwNTA4MTgwNzAwWjCBxjEdMBsGA1UEAxMUS0FSTEEgRlVFTlRFIE5PTEFTQ08xHTAbBgNVBCkTFEtBUkxBIEZVRU5URSBOT0xBU0NPMR0wGwYDVQQKExRLQVJMQSBGVUVOVEUgTk9MQVNDTzELMAkGA1UEBhMCTVgxJTAjBgkqhkiG9w0BCQEWFnBydWViYXNAcHJ1ZWJhcy5nb2IubXgxFjAUBgNVBC0TDUZVTks2NzEyMjhQSDYxGzAZBgNVBAUTEkZVTks2NzEyMjhNQ0xOTFIwNTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKH3kUbPyWgxvirqT/TrXv5ENLVwhut6R3qnHt8uY5S0eo6PCgPemNg7vQKHtfYzCuyya4aK/qDf6fv39z392GBwMPso5zX3BuijSRtKXhAOjeh8bq3lUbzhxzc1FkOMgQ611VJRAjFLD+ecD0hEFzGDbMGgy9DNw756aArEY/ixnjlm67OaayjFv/WGLf1CZPAQQxsuLo7ziJInPRFtNK7kB8dDvOQ7lcv8BosdrG/v18QuZh70xctk5qKvYn3zw2E8uYS19j4Afh/BWpayedMYbFE2V/QkM/0mkBmIDwszaTc3SMVd1ISTEV734gLegHOzPbYdEzp2ExafHlT5VtsCAwEAAaNPME0wDAYDVR0TAQH/BAIwADALBgNVHQ8EBAMCA9gwEQYJYIZIAYb4QgEBBAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMEBggrBgEFBQcDAjANBgkqhkiG9w0BAQsFAAOCAgEAU2ymIrVSaT5vdmUNj/dG87uaf2Pwf2ChxdJJ33Kxt8EZ1ZVbCmsqjJQ51xRUo8wOa+ALxpEfxSr7YBxmXPsZHRAsYwEtt11xm5fjkx02Yie/QxqAr9VuLK3WtCOPo1eZDf9KLhyq+zAsHgO1sPknz16TY+l7EMtt/FKXe0TdROuZ8DXAWZy0lxvbIfzUPjV67+a8GDoyQpCSjGMpV8CCTwTeVgS7NpRnLr5eSU4sasouBoWot4FAA5Eky5YR6HY8xIalV4zAbaZx/1XL30tacQ6B42lpQVCb4Vobw4c3B0YxbNjybkXOgmCnXdrmxz7QG90650Bv+cbqJ3yuMvBy4oxQ6EfD+ZW/kiSWbZ/PQM2iWXuCtQY7Ifa9ARGyRcBJ0RFRl9ts7d56knkDavJ8Nc58Drs27leTXGvVWiLpffMTKvNGpFDygTE0hcXlEqDMY4K1F6aPG7RUwgqn7Z8sw648EfpGIsKrRbGzLETBbsZ7+nqzHOTUMG2AhAYJ3IVYDJoNYeEvjM9jW29+MO0xjZ2CnroZR+CCK2t3YUneVHg+H86P+UIEbSHPujaLjOgmDoW4WWhugA/a2QIsWVQEJZndbNQVcOhrBf+C53aqmQmuasFpH8ZnEvcv2C+BI94/MK8b+nFV60DTKOOl3xUT7K5FJH+/8nq9C9R+0rturYg=",
//         "fileType": 0,
//         "password": "12345678a"
//       },
//       {
//         "base64File": "MIIFDjBABgkqhkiG9w0BBQ0wMzAbBgkqhkiG9w0BBQwwDgQIAgEAAoIBAQACAggAMBQGCCqGSIb3DQMHBAgwggS+AgEAMASCBMh4EHl7aNSCaMDA1VlRoXCZ5UUmqErAbuck7ujDnmKxSUWZI/PspOItR4Xo3A99hlKwR00y26gLTdMd9j3L6LxtYfJ1Y7At2wKyhuHEOduoTqd1HgfA3kx3A5tbyCkXHmMWke2AY+c3Uy9jbMSGtPPVtEjANfyAzqPOGCRtjtiBhWtJpwN91mponK7gKa/LlFReoCTRwEWXLLtb9AK8MxXNh9GlOwZuqjK5uSmlNVDa/eE8MehhApke3A9ozK14k2Y878zWkgiSajXSrr3rR/EqJ98xw+S2dJnr1S6i9eCWA2LiMAhbshuWiZrHw4IMqpon8kHPsqeJIbMtZdM5ckelwoAmo7/42et6unKnAEwDizRg+v7PRFc3lpiqg7s/Kphh+kGsFk150xdhxkB+LKDOs5Ml1PNXT0pma9OSi5LguOrqprIyfZDIznronAPr/KZ31cNpqjCyzdpUMqSR6FzIZDQz/1d5CTyLxgDobVchC/W8jvDgCNuSuk5KqSdJmrIUT3C9RWgPts174jzseGIHrxmkFFFS3GgGnob3IOtLim+kuQzoXmyttuGQmkI1mYN3AMJg/yPBeASVUso8802SNl55DB14mZMcNFk+d4cn2MCxk/6AtpFZSWHquxAJdG4HMRTM1Dw97lss6qvZuSo9qGQITojIQ/cGlLyI4sMWAza7eA0CCr5wZKv1lnNElnQOehJcpOecH4MdkCdV0mH3ayVX9+NPzy7K6LoDQ9HrseuWF7kDaOS9EYAS3q21qVzrtpu52e/P+Dv+D+uqQLIt2SEhr8immwkyatrFlZzfCEwyZCVvsIunsaCY35UAax87/kJTGTbpyyUJjcpk+maNLNCcRXvlp9MhJmTb5OdsT3/2Vxb5SWG700Ui2ttg2JoqaZloRF/9A9//nxPPm5SpH2F66VIvrsnvC0LAxCq0b6XH2HTnaZDVp4KdaK6oDV5gQad+AfpzurTzAufcdEHC32XqlpBAyqRhV7u18khS+qLBvEK2zqQuWfhnNkWCazgmjrpi5tJS9gzR0CRasRpIVRCwHKQhH2tXZ4D7LFEEWsc+12BNKhU8QfnAquuIKBNhykbDJGSmqT1DIZ+plWFG3524LhJmYT4sLg3rzzXxXs4N2tAfa6XUQwQc+V9MEvQ35wwQEP655MJZe4TmFCplWNf5dIqbRw0FamYdnRguRxsqhzKPPwSfhD64ayDwsm3UU7IdgzBCyTEKw2JlOforQWmIGne3VL/HNEi1d9+gLQW9dLD6oV0b0MgvOQPgyFqui0zURuRvr6uAjwfxn2ws13T8PyDftFB0ttGPvA7IH7dtvAzAJsu4o+YxetkHwlL3Aj3hLko+po0nHU/VbnSzbNtieBC0ndcFbI6lGWobnXsAr8htXeYWXI7UvBVLpHaSuq8BbiEEbkFghn6QpKiOOcJPDphg0v8ZUu9/ISHTap/yr2SiPB88RUPqLLjfLyESoChAkZV7SKUDeDypwv/QLw3OWYUTjrcCPfeDux4NVC1Ld8e9Xedq4DnncR/XtvMdzoAPjm34y0iZu/ucsg6TkzuRRrMA3TNiz+2icjpViH7hgtLv7yNnryBp9+PZxTEPX83MnGJ1iz1nJz4gmS1LEfNC0BiFM04=",
//         "fileType": 1,
//         "password": "12345678a"
//       }
//     ]
