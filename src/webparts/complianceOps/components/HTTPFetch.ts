
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IHttpClientOptions } from '@microsoft/sp-http';
import { IFpsErrorObject } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IFpsErrorObject';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';

import { check4Gulp } from '../fpsReferences';

export interface IFpsHttpInfo extends IFpsErrorObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  text?: string;
  type?: ResponseType;
  url?: string;
  statusNo?: number;
  ok?: boolean;
  statusText?: string;
  headers?: Headers;
  bodyUsed?: boolean;

}

export async function fetchLables ( apiEndPoint: string, httpClient: HttpClient, description: string, headers?: IHttpClientOptions ): Promise<IFpsHttpInfo>  {

  // Validate approved location
  // const websLocation = this.approvedWebs.filter(loc => loc.key == web)[0];
  // const websQuery = window.location.origin + websLocation.siteRelativeURL + "/_api/Web/Lists?$filter=BaseTemplate eq 101 and Hidden eq false&select=Title";

  try {
    // const response = await httpClient.get(apiEndPoint, HttpClient.configurations.v1, headers ? headers : undefined );
    const response = await httpClient.get(apiEndPoint, HttpClient.configurations.v1, headers );
    if ( check4Gulp() ===  true ) console.log(`API Response: ${description}`, response );

    return await createFPSHttpResponse( description, response );

  } catch(e) {
    return { 
      value: null, e: e, status: 'Error', statusText: e.message,
      errorInfo: {
        errObj: e,
        friendly: e.message,
        result: null,
        returnMess: e.message,
      }
    };

  }


}

export async function createFPSHttpResponse( description: string, response: HttpClientResponse ): Promise<IFpsHttpInfo> {

  const results: IFpsHttpInfo = { value: null, e: null, status: 'Error' };
  results.statusNo = response ? response.status : null;
  results.statusText = response ? response.statusText : null;
  results.ok = response ? response.ok : false;
  results.url = response ? response.url : null;
  results.type = response ? response.type : null;
  results.bodyUsed = response ? response.bodyUsed : null;
  results.headers = response ? response.headers : null;

  results.status = response ? response.statusText as IFPSResultStatus : 'Error';

  const data_1 = response ? await response.json() : null;

  if ( check4Gulp() ===  true ) console.log(`API JSON: ${description}`, response ? response: results );

  results.value = data_1 ? data_1.value : null;

  // Added for https://github.com/mikezimm/Compliance/issues/62
  results.errorInfo = {
    errObj: null,
    friendly: '',
    result: null,
    returnMess: '',
  }

  return results;

}