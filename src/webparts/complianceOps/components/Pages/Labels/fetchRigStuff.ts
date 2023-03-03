

import { startPerformOpV2, updatePerformanceEndV2 } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions";
import { checkItemsResults, IFpsItemsReturn } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/CheckItemsResults";
import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems";
import { IItemsErrorObj } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
// import { IMinFetchProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
// import { ISourceProps } from './Interface';
// import { checkItemsResults, IFpsItemsReturn } from '../Common/CheckItemsResults';
// import { createMinFetchProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createMinFetchProps";
// import { startPerformOpV2, updatePerformanceEndV2 } from "../../components/molecules/Performance/functions";


import { LabelExportJSON } from "../../../storedSecrets/AS303 Labels v3 - JSON Formatted";
import { IAnySourceItem } from "../../../fpsReferences";
import { IApiMode } from "../../IComplianceOpsProps";
import { fetchAPI } from "../../HttpFetch/functions";
import { BasicAuthNA, } from "../../../storedSecrets/CorpAPIs";

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';  // , httpClient: HttpClient
import { IHttpClientOptions } from '@microsoft/sp-http';
import { HTTPApiPerformanceSettings } from "../../HttpFetch/HTTPApiPerformanceSettings";
import { simplifyPropsosedRIGItems } from "../../../storedSecrets/AS303 Items v3";
import { ISourcePropsCOP } from "../../DataInterface";

export async function fetchRigData( sourceProps: ISourcePropsCOP, alertMe: boolean | undefined, consoleLog: boolean | undefined, apiMode: IApiMode, httpClient: HttpClient ) : Promise<IFpsItemsReturn> {

  const { performanceSettings, apiUrl } = sourceProps;
  // const FetchProps : IMinFetchProps = createMinFetchProps( sourceProps, alertMe, consoleLog );
  const performanceOp = performanceSettings ? startPerformOpV2( performanceSettings ) : null;
  // const initialResult = await fetchAnyItems( FetchProps );

  let initialResult: IItemsErrorObj = {
    status: 'Unknown',
    items: [],
    e: null,
  }

  if ( apiMode === 'Mock' ) {
    if ( sourceProps.key === 'labels' ) {
      initialResult.items = LabelExportJSON.map( ( label: IAnySourceItem ) => {
        label.Title = label.RecordTitle;
        return label;
      } );
    } else {
      const Items = simplifyPropsosedRIGItems();
      initialResult.items = Items.map( ( item: IAnySourceItem ) => {
        item.Title = item.ItemName;
        return item;
      } );
    }

    initialResult.status = 'Success';

  } else {
    initialResult = await fetchAPI( apiUrl, httpClient, sourceProps.listTitle, { ...HTTPApiPerformanceSettings, ...{ label: sourceProps.listTitle }}, BasicAuthNA );
  }

  const result : IFpsItemsReturn = checkItemsResults( initialResult, `fps-library-v2: fetchRigData ~ 59`, alertMe, consoleLog );

  result.performanceOp = performanceSettings ?
     updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: result.items.length })  : null;

  return result;

}