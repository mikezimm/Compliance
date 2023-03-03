

// import { startPerformOpV2, updatePerformanceEndV2 } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions";
// import { checkItemsResults, IFpsItemsReturn } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/CheckItemsResults";
// import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems";
// import { IItemsErrorObj } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
// // import { IMinFetchProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
// // import { ISourceProps } from './Interface';
// // import { checkItemsResults, IFpsItemsReturn } from '../Common/CheckItemsResults';
// // import { createMinFetchProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createMinFetchProps";
// // import { startPerformOpV2, updatePerformanceEndV2 } from "../../components/molecules/Performance/functions";


// import { LabelExportJSON } from "../../../storedSecrets/AS303 Labels v3 - JSON Formatted";
// import { IAnySourceItem } from "../../../fpsReferences";
// import { simplifyPropsosedRIGItems } from "../../../storedSecrets/AS303 Items v3";
// import { IApiMode } from "../../IComplianceOpsProps";

// import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';  // , httpClient: HttpClient
// import { IHttpClientOptions } from '@microsoft/sp-http';
// import { HTTPApiPerformanceSettings } from "../../HttpFetch/HTTPApiPerformanceSettings";
// import { fetchAPI } from "../../HttpFetch/functions";
// import { BasicAuthNA, RIG_API_PROD_Item } from "../../../storedSecrets/CorpAPIs";

// export async function fetchRigItems( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined, apiMode: IApiMode, httpClient: HttpClient ) : Promise<IFpsItemsReturn> {

//   const { performanceSettings } = sourceProps;
//   // const FetchProps : IMinFetchProps = createMinFetchProps( sourceProps, alertMe, consoleLog );
//   const performanceOp = performanceSettings ? startPerformOpV2( performanceSettings ) : null;
//   // const initialResult = await fetchAnyItems( FetchProps );

//   let initialResult: IItemsErrorObj = {
//     status: 'Unknown',
//     items: [],
//     e: null,
//   }

//   if ( apiMode === 'Mock' ) {
//     const Items = simplifyPropsosedRIGItems();
//     const MockLabels: IAnySourceItem[] = Items.map( ( item: IAnySourceItem ) => {
//       item.Title = item.ItemName;
//       return item;
//     } );

//     initialResult = {
//       status: 'Success',
//       items: MockLabels,
//       e: null,
//     }

//   } else {
//     initialResult = await fetchAPI( RIG_API_PROD_Item, httpClient, sourceProps.listTitle, { ...HTTPApiPerformanceSettings, ...{ label: sourceProps.listTitle }}, BasicAuthNA );
//   }




//   const result : IFpsItemsReturn = checkItemsResults( initialResult, `fps-library-v2: getSourceItems ~ 24`, alertMe, consoleLog );

//   result.performanceOp = performanceSettings ?
//      updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: result.items.length })  : null;

//   return result;

// }