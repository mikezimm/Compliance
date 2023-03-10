

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
import { IRigItemSource } from "../RigItems/Row";
import { ItemExportJSON } from "../../../storedSecrets/AS303 Items Full";

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
      const Items = simplifyGetItems( ItemExportJSON );
      initialResult.items = Items.map( ( item: IAnySourceItem ) => {
        item.Title = item.ItemName;
        return item;
      } );
    }

    initialResult.status = 'Success';

  } else {
    initialResult = await fetchAPI( apiUrl, httpClient, sourceProps.listTitle, { ...HTTPApiPerformanceSettings, ...{ label: sourceProps.listTitle }}, BasicAuthNA );
    initialResult.items = simplifyGetItems( initialResult.items );
  }

  const result : IFpsItemsReturn = checkItemsResults( initialResult, `fps-library-v2: fetchRigData ~ 59`, alertMe, consoleLog );

  const count: number = result.items && result.items.length ? result.items.length : -1;
  result.performanceOp = performanceSettings ?
     updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: count })  : null;

  return result;

}

// Created to resolve:  https://github.com/mikezimm/Compliance/issues/72
export interface IGetItemsReturnItemFacility {
  FacilityCode: string;
  Country: string;
  LocalStorageLocation: string;
  LocalPrivacy: string;
}

// Created to resolve:  https://github.com/mikezimm/Compliance/issues/72
export interface IGetItemsReturnItem {
  Facilities: IGetItemsReturnItemFacility[],
  RecordItem: IRigItemSource,
}


// Created to resolve:  https://github.com/mikezimm/Compliance/issues/72
export function simplifyGetItems( GetItemsResultsJSON: IGetItemsReturnItem[] ): IRigItemSource[] {

  const v2: IRigItemSource[] = [];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  let consoledLog: boolean = false;
  GetItemsResultsJSON.map( item => {
    const itemKeys = Object.keys( item );
    if ( itemKeys.indexOf( 'RecordItem') > -1 ) {
      if ( itemKeys.indexOf( 'Facilities') > -1 ) {
        // Add future logic to consolidate the Facilities
        item.RecordItem.Facilities = [];
        item.RecordItem.Countries = [];
        if ( item.Facilities.length > -1 ) {

          if ( Object.keys( item.Facilities[0] ).indexOf( 'FacilityCode' ) > -1 ) {
            item.Facilities.map( facility => {
              if ( facility.FacilityCode )  item.RecordItem.Facilities.push( facility.FacilityCode );
            });
          }

          if ( Object.keys( item.Facilities[0] ).indexOf( 'Country' ) > -1 ) {
            item.Facilities.map( facility => {
              // Only add to Countries if it does not already exist on this item.
              if ( facility.Country && item.RecordItem.Countries.indexOf( facility.Country ) === -1 ) item.RecordItem.Countries.push( facility.Country );
            });
          }

          item.RecordItem.FacilitiesStr = item.RecordItem.Facilities.join('; ');
          item.RecordItem.CountriesStr = item.RecordItem.Countries.join('; ');

        }
      }
      item.RecordItem.Title = item.RecordItem.ItemName;
      v2.push( item.RecordItem );
    } else if ( consoledLog === false ) {
      console.log( 'simplifyGetItems GetItemsResultsJSON IS NOT IN EXPECTED FORMAT', simplifyGetItems );
      alert( `simplifyGetItems GetItemsResultsJSON IS NOT IN EXPECTED FORMAT` );
      consoledLog = true;
    }
  });
  return v2;
}
