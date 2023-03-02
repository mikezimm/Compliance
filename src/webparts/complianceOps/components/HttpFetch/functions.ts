
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { IHttpClientOptions } from '@microsoft/sp-http';
import { IFpsErrorObject } from '@mikezimm/fps-library-v2/lib/pnpjs/Common/IFpsErrorObject';
import { IFPSResultStatus } from '@mikezimm/fps-pnp2/lib/services/sp/IFPSResultStatus';

import { startPerformOpV2, updatePerformanceEndV2 } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions";
import { IPerformanceSettings } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/IPerformanceSettings";


import { check4Gulp } from '../../fpsReferences';

export interface IFpsHttpInfo extends IFpsErrorObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  items: any[];
  item: any;
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

export async function fetchAPI ( apiEndPoint: string, httpClient: HttpClient, description: string, performanceSettings: IPerformanceSettings, headers?: IHttpClientOptions ): Promise<IFpsHttpInfo>  {

  // Validate approved location
  // const websLocation = this.approvedWebs.filter(loc => loc.key == web)[0];
  // const websQuery = window.location.origin + websLocation.siteRelativeURL + "/_api/Web/Lists?$filter=BaseTemplate eq 101 and Hidden eq false&select=Title";

  const performanceOp = performanceSettings ? startPerformOpV2( performanceSettings ) : null;

  try {
    // const response = await httpClient.get(apiEndPoint, HttpClient.configurations.v1, headers ? headers : undefined );

    const response = await httpClient.get(apiEndPoint, HttpClient.configurations.v1, headers );
    if ( check4Gulp() ===  true ) console.log(`API Response: ${description}`, response );

    const result : IFpsHttpInfo = await createFPSHttpResponse( description, response );

    result.performanceOp = performanceSettings ?
      updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: result.value ? result.value.length : -1 })  : null;

    return result;

  } catch(e) {
    const result : IFpsHttpInfo = { 
      value: null, e: e, status: 'Error', statusText: e.message,
      items: [],
      item: null,
      errorInfo: {
        errObj: e,
        friendly: e.message,
        result: null,
        returnMess: e.message,
      }
    };

    result.performanceOp = performanceSettings ?
      updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: result.value ? result.value.length : -1 })  : null;

    return result;

  }


}

export async function createFPSHttpResponse( description: string, response: HttpClientResponse ): Promise<IFpsHttpInfo> {

  const results: IFpsHttpInfo = { value: null, e: null, status: 'Error', items: [],
  item: null, };
  results.statusNo = response ? response.status : null;
  results.statusText = response ? response.statusText : null;
  results.ok = response ? response.ok : false;
  results.url = response ? response.url : null;
  results.type = response ? response.type : null;
  results.bodyUsed = response ? response.bodyUsed : null;
  results.headers = response ? response.headers : null;

  results.status = response ? response.statusText as IFPSResultStatus : 'Error';

  const data_1 = response ? await response.json() : null;

  console.log(`API JSON data_1 ~ 69: ${description}`, data_1 ? data_1: results );

  results.value = data_1 ? data_1.value : null;

  // Assume results are always an array
  results.items = results.value;

  // Added for https://github.com/mikezimm/Compliance/issues/62
  results.errorInfo = {
    errObj: null,
    friendly: '',
    result: null,
    returnMess: '',
  }

  if ( check4Gulp() ===  true ) console.log(`API JSON response ~ 81: ${description}`, response ? response: results );

  return results;

}