import * as React from 'react';
import styles from './header.module.scss';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';

import ReactJson from 'react-json-view';

import { IComplianceOpsProps, IComplianceOpsState, IStateSource, ITabContactPivots, ITabMain, ITabTesting, ITabTestingPivots } from '../../IComplianceOpsProps';

import HTTPApiHook from '../../HttpApiBox/component';

// await fetchLables( RIG_API_PROD_Titles, this.context.spHttpClient, 'Prod Labels' );
// await fetchLables( RIG_API_QA_Titles, this.context.spHttpClient, 'QA Labels' );
// await fetchLables( RIG_API_PROD_Search_Sales, this.context.spHttpClient, 'Prod Sales Labels' );
// await fetchLables( RIG_API_QA_Search_Sales, this.context.spHttpClient, 'QA Sales Labels' );


import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { ISourcePropsCOP } from '../../DataInterface';
import { IWebpartBannerProps } from '../../../fpsReferences';
import { RIG_API_PROD_Sales, RIG_API_PROD_Titles, RIG_API_QA_Sales, RIG_API_QA_Titles } from '../../../storedSecrets/CorpAPIs';
// import { ISpinnerStyles, Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';


const testingKeys: ITabTestingPivots[] = [ 'Instructions', 'Prod Titles', 'QA Titles', 'Prod Sales', 'QA Sales', ];
const testingPivots: JSX.Element[] = testingKeys.map( ( key: string, idx: number ) => {
  return <PivotItem key={ idx } headerText={ testingKeys[idx] } ariaLabel={testingKeys[idx]} title={testingKeys[idx]} itemKey={ key }/>;
});


export interface ITestingPageProps {

  primarySource: ISourcePropsCOP;
  fpsItemsReturn : IStateSource;

  bannerProps: IWebpartBannerProps;

  httpClient: HttpClient;
  // topButtons: string[];

  // pageWidth: number;

  // deepProps: string[];

  // bumpDeepLinks: any;
  // jumpToDeepLink?: any;

  stateSource: IStateSource;

  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
}

/***
 *    .d8888. d888888b  .d8b.  d8888b. d888888b      db   db  .d88b.   .d88b.  db   dD 
 *    88'  YP `~~88~~' d8' `8b 88  `8D `~~88~~'      88   88 .8P  Y8. .8P  Y8. 88 ,8P' 
 *    `8bo.      88    88ooo88 88oobY'    88         88ooo88 88    88 88    88 88,8P   
 *      `Y8b.    88    88~~~88 88`8b      88         88~~~88 88    88 88    88 88`8b   
 *    db   8D    88    88   88 88 `88.    88         88   88 `8b  d8' `8b  d8' 88 `88. 
 *    `8888Y'    YP    YP   YP 88   YD    YP         YP   YP  `Y88P'   `Y88P'  YP   YD 
 *                                                                                     
 *                                                                                     
 */

const TestingPageHook: React.FC<ITestingPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, primarySource, } = props; //appLinks, news 

  const [ tab, setTab ] = useState< ITabTestingPivots >( 'Instructions' );
  const [ fetchThis, setFetchThis ] = useState< string >( '' );
  // const [ response, setResponse ] = useState< IFpsHttpInfo >( null );

  const pivotTestingClick = async ( temp: any ): Promise<void> => {
    const tabKey: ITabTestingPivots = temp.props.itemKey;
    setTab( tabKey );
    let fetchThisStr: string = '';
    if ( tabKey === 'Prod Sales' ) { fetchThisStr = RIG_API_PROD_Sales }
    else if ( tabKey === 'QA Sales' ) { fetchThisStr = RIG_API_QA_Sales }
    else if ( tabKey === 'Prod Titles' ) { fetchThisStr = RIG_API_PROD_Titles }
    else if ( tabKey === 'QA Titles' ) { fetchThisStr = RIG_API_QA_Titles }

    // const respon: IFpsHttpInfo = await fetchLables( fetchThis, props.httpClient, tabKey );
    setFetchThis( fetchThisStr );

  }

  const testingsPivot = 
  <div id={ `ContactPivot${ props.bannerProps.refreshId }` }>
    <Pivot
        getTabId={ ( itemKey, index ) => { return `ContactPivot${itemKey}`} }
        // styles={ mainPivotStyles }
        linkFormat={PivotLinkFormat.tabs}
        linkSize={PivotLinkSize.normal}
        selectedKey={ tab }
        // onLinkClick={this.pivotMainClick.bind(this)}
        onLinkClick={ pivotTestingClick }
    >
     { testingPivots } 
    </Pivot>
  </div>

  const startElement: JSX.Element = tab !== 'Instructions' ? undefined : <div>
      <h3>Click on another tab to fetch that api.</h3>
    </div>

  const resultElement: JSX.Element = tab === 'Instructions' ? undefined : <HTTPApiHook 
    description={ tab }
    textInput={ fetchThis }
    httpClient={ props.httpClient }
    showComponent={ true }
    updateInputCallback={ null }
    callBackOnError= { true }
    wpID={ props.wpID }
  />

  const TestingPageElement: JSX.Element = mainPivotKey !== 'Testing' ? null : <div className = { styles.page } style={ null }>
    { testingsPivot }
    { resultElement }
    { startElement }

    {/* <div id={ 'ComplTestingtartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    { null }
  </div>;

  return ( TestingPageElement );

}

export default TestingPageHook;

// await fetchLables( RIG_API_PROD_Titles, this.context.spHttpClient, 'Prod Labels' );
// await fetchLables( RIG_API_QA_Titles, this.context.spHttpClient, 'QA Labels' );
// await fetchLables( RIG_API_PROD_Sales, this.context.spHttpClient, 'Prod Sales Labels' );
// await fetchLables( RIG_API_QA_Sales, this.context.spHttpClient, 'QA Sales Labels' );


