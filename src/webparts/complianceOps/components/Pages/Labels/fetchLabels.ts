

import { startPerformOpV2, updatePerformanceEndV2 } from "@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions";
import { checkItemsResults, IFpsItemsReturn } from "@mikezimm/fps-library-v2/lib/pnpjs/Common/CheckItemsResults";
import { ISourceProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems";
import { IItemsErrorObj } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
import { IMinFetchProps } from "@mikezimm/fps-pnp2/lib/services/sp/fetch/items/Interface";
// import { ISourceProps } from './Interface';
// import { checkItemsResults, IFpsItemsReturn } from '../Common/CheckItemsResults';
import { createMinFetchProps } from "@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/createMinFetchProps";
// import { startPerformOpV2, updatePerformanceEndV2 } from "../../components/molecules/Performance/functions";


import { LabelExportJSON } from "../../../storedSecrets/AS303 Labels v3 - JSON Formatted";
import { IAnySourceItem } from "../../../fpsReferences";


export function fetchLabelData( sourceProps: ISourceProps, alertMe: boolean | undefined, consoleLog: boolean | undefined, ) : IFpsItemsReturn {

  const { performanceSettings } = sourceProps;
  // const FetchProps : IMinFetchProps = createMinFetchProps( sourceProps, alertMe, consoleLog );
  const performanceOp = performanceSettings ? startPerformOpV2( performanceSettings ) : null;
  // const initialResult = await fetchAnyItems( FetchProps );

  const MockLabels: IAnySourceItem[] = LabelExportJSON.map( ( label: any ) => {
    label.Title = label.RecordTitle;
    return label;
  } );

  const initialResult: IItemsErrorObj = {
    status: 'Success',
    items: MockLabels,
    e: null,
  }

  const result : IFpsItemsReturn = checkItemsResults( initialResult, `fps-library-v2: getSourceItems ~ 24`, alertMe, consoleLog );

  result.performanceOp = performanceSettings ?
     updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: performanceSettings.updateMiliseconds, count: result.items.length })  : null;

  return result;

}