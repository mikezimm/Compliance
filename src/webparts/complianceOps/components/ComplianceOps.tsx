import * as React from 'react';
import styles from './ComplianceOps.module.scss';
import { IApiMode, IComplianceOpsProps, IComplianceOpsState, IStateSource, IStateSuggestions, IStateUser, ITabContactPivots, ITabMain, } from './IComplianceOpsProps';


import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { Icon,} from 'office-ui-fabric-react/lib/Icon';
// import { ISpinnerStyles, Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';

import { saveViewAnalytics } from '../CoreFPS/Analytics';

import FetchBannerX from '@mikezimm/fps-library-v2/lib/banner/bannerX/FetchBannerX';
// import { createSpecialElement } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/component';
import { ISpecialMessage, } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/interface';

import { getWebPartHelpElementBoxTiles } from '../PropPaneHelp/PropPaneHelp';
import { getBannerPages, } from './HelpPanel/AllContent';
import { check4Gulp, IBannerPages, IPinMeState, makeid, sortObjectArrayByNumberKey } from "../fpsReferences";

import { ILoadPerformance, startPerformOp, updatePerformanceEnd } from "../fpsReferences";

import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';

import { ISiteThemes } from "@mikezimm/fps-library-v2/lib/common/commandStyles/ISiteThemeChoices";
import { buildCurrentSourceInfo, collectionUrl, IDefSourceType, IntraNetHome, ISourceInfo, ISourcePropsCOP } from './DataInterface';

import { addSearchMeta1 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta1';
import { addSearchMeta2 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta2';
import { SearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/StandardTypes';
import { getEmailFromLoginName } from '@mikezimm/fps-library-v2/lib/pnpjs/Users/logic/getEmailFromLoginName';

import SourcePages from './Pages/SourcePages/SourcePages';

import HomePageHook from './Pages/Home/Page';

import SitePageHook from './Pages/Site/Header';
import { createSiteRow } from './Pages/Site/Row';

import MapPageHook from './Pages/Maps/Header';
import { createMapRow } from './Pages/Maps/Row';

import FormPageHook from './Pages/Forms/Header';
import { createFormRow } from './Pages/Forms/Row';

import CoordinatorsPageHook from './Pages/Coordinators/Header';
import { createCoordinatorsRow } from './Pages/Coordinators/Row';

import CommitteePageHook from './Pages/Committee/Header';
import { createCommitteeRow } from './Pages/Committee/Row';

import DetailsPageHook from './Pages/Details/Header';
// import { createDetailsRow } from './Pages/Details/Row';

// import TipsPageHook from './Pages/Tips/Header';
import { createTipsRow } from './Pages/Tips/Row';

import InstructionsPageHook from './Pages/Instructions/Header';
// import { createInstructionsRow } from './Pages/Instructions/Row';

import LabelsPageHook from './Pages/Labels/Header';
// import { createLabelsRow } from './Pages/Labels/Row';

import WebUrlHook from './WebUrlBox/component';

import ExpertsPageHook from './Pages/Experts/Header';

import RigItemsPageHook from './Pages/RigItems/Header';

import AdminsPageHook from './Pages/Admins/Header';

import TestingPageHook from './Pages/Testing/Header';

import AllListsPageHook from './Pages/AllLists/Header';

// import { createAdminsRow } from './Pages/Admins/Row';
import { addEasyIcons } from '@mikezimm/fps-library-v2/lib/components/atoms/EasyIcons/getEasyIcon';

import SharePointPageHook from './Pages/SharePoint/Header';
import { getSiteCollectionUrlFromLink } from '@mikezimm/fps-library-v2/lib/logic/Strings/urlServices';
import { IUserProperties } from './PersonaCard/IUserProperties';
import { IFpsGetSiteReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/IFpsGetSiteReturn';
// import { fetchLabelData } from './Pages/Labels/fetchLabels';
// import { createLabelsRow } from './Pages/Labels/Row';

import { MSGraphClient } from '@microsoft/sp-http';
// import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { convertSugsLC } from './Suggestions/convertSugsLC';
import { LabelSuggestions } from './Suggestions/LabelSuggestions';
import { getSuggestionsByKeys, getSuggestionsFromStrings } from './Suggestions/getSuggestionsByKeys';
import { getSiteInfo } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/getSiteInfo';
// import { fetchRigItems } from './Pages/RigItems/fetchRigItems';
import { fetchRigData } from './Pages/Labels/fetchRigStuff';

// import { createSharePointRow } from './Pages/SharePoint/Row';

const SiteThemes: ISiteThemes = { dark: styles.fpsSiteThemeDark, light: styles.fpsSiteThemeLight, primary: styles.fpsSiteThemePrimary };

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: FpsCore115Banner';

const mainKeys: ITabMain[] = [ 'Home', 'Tips', 'RigItems', 'Labels', 'Instructions', 'Site', 'Details', 'Contacts', 'Maps', 'Forms', 'Admins', 'AllLists', 'Testing' ];

const contactKeys: ITabContactPivots[] = [ 'Experts', 'SharePoint', 'Coordinators', 'Committee', ];
const contactPivots: JSX.Element[] = contactKeys.map( ( key: string, idx: number ) => {
  return <PivotItem key={ idx } headerText={ contactKeys[idx] } ariaLabel={contactKeys[idx]} title={contactKeys[idx]} itemKey={ key }/>;
});

const LabelSuggs = convertSugsLC( LabelSuggestions, true );

export default class ComplianceOps extends React.Component<IComplianceOpsProps, IComplianceOpsState> {

  private _performance: ILoadPerformance = null;

  private _suggestions: boolean;

  private _webPartHelpElement = [
    getWebPartHelpElementBoxTiles( ),
  ];

  private _contentPages : IBannerPages = getBannerPages( this.props.bannerProps );

  private _newRefreshId() :string  {

    const startTime = new Date();
    const refreshId = startTime.toISOString().replace('T', ' T'); // + ' ~ ' + startTime.toLocaleTimeString();
    return refreshId;

  }

  private _SourceInfo : ISourceInfo = null;

  private _mainPivots: JSX.Element[] = [];

  // Determines main Pivots depending on user
  private _setMainPivots() : void {
    const pivots: JSX.Element[] = [];
    mainKeys.map( ( key: ITabMain, idx: number ) => {
      if ( ( key !== 'Admins' && key !== 'Testing' && key !== 'AllLists' ) || this._isAdmin === true ) pivots.push ( <PivotItem key={ idx } headerText={ mainKeys[idx] } ariaLabel={mainKeys[idx]} title={mainKeys[idx]} itemKey={ key }/> );
    });
    this._mainPivots = pivots;
  }

  private _isAdmin: boolean = false;

  private _setIsAdmin() : boolean { // True if you get tricks or are on the Records site and are a site admin
    let isAdmin : boolean = false;
    if ( this.props.bannerProps.beAUser === true ) { // doNothing 
    } else if ( this.props.bannerProps.showTricks || (
      window.location.href.toLowerCase().indexOf( IntraNetHome.toLocaleLowerCase() ) > 0 && this.props.bannerProps.FPSUser.isSiteAdmin === true 
    )) { isAdmin = true; }
    this._isAdmin = isAdmin;
    this._setMainPivots();
    return isAdmin;
  }

  private _missingFetches( getsAdmin: boolean, ) : IDefSourceType[] {

    const loads: IDefSourceType[] = [];
    if ( this.state.site.loaded !== true ) loads.push( 'site' );
    if ( this.state.committee.loaded !== true ) loads.push( 'committee' );
    if ( this.state.coordinators.loaded !== true ) loads.push( 'coordinators' );
    if ( this.state.maps.loaded !== true ) loads.push( 'maps' );
    if ( this.state.forms.loaded !== true ) loads.push( 'forms' );
    if ( this.state.tips.loaded !== true ) loads.push( 'tips' );
    if ( getsAdmin === true && this.state.admins.loaded !== true ) loads.push( 'admins' );
    if ( this.state.labels.loaded !== true ) loads.push( 'labels' );
    if ( this.state.user.loaded !== true ) loads.push( 'user' );
    if ( this.state.targetInfo.loaded !== true ) loads.push( 'targetInfo' );
    if ( getsAdmin === true && this.state.allLists.loaded !== true ) loads.push( 'allLists' );
    if ( getsAdmin === true && this.state.rigItems.loaded !== true ) loads.push( 'rigItems' );

    if ( loads.length === 0 ) loads.push( '*' );

    return loads;

  }

  private _updatePinState( newValue :  IPinMeState ): void {
    this.setState({ pinState: newValue, });
  }

  private graphClient: MSGraphClient = null;

  private async getCurrentWeb(webUrl: string ): Promise<IFpsGetSiteReturn> {
    const siteInfo: IFpsGetSiteReturn = await getSiteInfo( webUrl, false, true, );
    this._performance.ops.fetchW = siteInfo.performanceOp;
    return siteInfo;
  }

  private async getCurrentUserGraph(): Promise<IStateUser>{
    const { ops } = this._performance;

    try {
      ops.fetchU = startPerformOp( 'user' , this.props.bannerProps.displayMode, true );

      // const thisContext = this.props.bannerProps.context ;
      this.graphClient = await this.props.bannerProps.context.msGraphClientFactory.getClient();
      const results: any = await this.graphClient
        .api(`/me`)
        .version('v1.0')
        .get();
      console.log('getCurrentUser Success', results );
      ops.fetchU = updatePerformanceEnd( ops.fetchU , true, LabelSuggs.length );
      return {
        item: results,
        e: null,
        status: 'Success',
      };

    } catch (e) {
      console.log('getCurrentUser Error', e );
      ops.fetchU = updatePerformanceEnd( ops.fetchU , true, LabelSuggs.length );
      return {
        item: null,
        e: null,
        status: 'Error',
      };
    }
  }

  /***
 *    d8b   db d88888b  .d8b.  d8888b.      d88888b  .d8b.  d8888b.      d88888b db      d88888b 
 *    888o  88 88'     d8' `8b 88  `8D      88'     d8' `8b 88  `8D      88'     88      88'     
 *    88V8o 88 88ooooo 88ooo88 88oobY'      88ooo   88ooo88 88oobY'      88ooooo 88      88ooooo 
 *    88 V8o88 88~~~~~ 88~~~88 88`8b        88~~~   88~~~88 88`8b        88~~~~~ 88      88~~~~~ 
 *    88  V888 88.     88   88 88 `88.      88      88   88 88 `88.      88.     88booo. 88.     
 *    VP   V8P Y88888P YP   YP 88   YD      YP      YP   YP 88   YD      Y88888P Y88888P Y88888P 
 *               
 *               
 */

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   private _farBannerElements: any[] = [];

 /***
*     .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
*    d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
*    8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
*    8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
*    Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
*     `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
*                                                                                                  
*                                                                                                  
*/


  public constructor(props:IComplianceOpsProps){
    super(props);

    const isAdmin: boolean = this._setIsAdmin();
    this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode, isAdmin, collectionUrl );

    if ( this._performance === null ) { this._performance = this.props.performance;  }
    const constId: string = this._newRefreshId();

    const apiMode: IApiMode = check4Gulp() === true ? 'Mock' : 'Live';

    this.state = {
      pinState: this.props.bannerProps.fpsPinMenu.defPinState ? this.props.bannerProps.fpsPinMenu.defPinState : 'normal',
      showDevHeader: false,
      lastStateChange: '',
      analyticsWasExecuted: false,
      refreshId: constId,
      debugMode: false,
      showSpinner: false,

      apiMode: apiMode,

      targetSiteUrl: collectionUrl,
      targetWebUrl: this.props.bannerProps.context.pageContext.web.absoluteUrl,
      targetStatus: '',
      targetGroupId: this.props.GroupId,
      targetGroupIdStatus: this.props.GroupIdStatus,

      mainPivotKey: 'Home',
      contactPivotKey: 'Experts',

      fullAnalyticsSaved: false,
      experts: [],

      rigItems : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null, misc1: [], },
      labels : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      admins : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      site : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      allLists : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      committee : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      coordinators : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      maps : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      forms : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      tips : { items: [], index: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      user: { item: null, loaded: false, refreshId: constId, status: 'Unknown', e: null },
      targetInfo: { site: null, loaded: false, refreshId: constId, status: 'Unknown', e: null },

      suggestions: {
        performance: null,
        all: [],
        user: [],
        libraries: [],
        web: [],
        site: [],
      }

    };
  }

  public async componentDidMount(): Promise<void> {
      if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidMount` );

      await this.updateTheseSources( this._missingFetches( this._isAdmin ) );

      const analyticsWasExecuted = saveViewAnalytics( 'Compliance mount', 'didMount' , this.props, this.state.analyticsWasExecuted, this._performance );

      if ( this.state.analyticsWasExecuted !==  analyticsWasExecuted ) {
        this.setState({ analyticsWasExecuted: analyticsWasExecuted });
      }

    }

  //
    /***
   *         d8888b. d888888b d8888b.      db    db d8888b. d8888b.  .d8b.  d888888b d88888b 
   *         88  `8D   `88'   88  `8D      88    88 88  `8D 88  `8D d8' `8b `~~88~~' 88'     
   *         88   88    88    88   88      88    88 88oodD' 88   88 88ooo88    88    88ooooo 
   *         88   88    88    88   88      88    88 88~~~   88   88 88~~~88    88    88~~~~~ 
   *         88  .8D   .88.   88  .8D      88b  d88 88      88  .8D 88   88    88    88.     
   *         Y8888D' Y888888P Y8888D'      ~Y8888P' 88      Y8888D' YP   YP    YP    Y88888P 
   *         
   *         
   */

  public async componentDidUpdate( prevProps: IComplianceOpsProps, prevState: IComplianceOpsState ): Promise<void> {

    /**
     * This section is needed if you want to track performance in the react component.
     *    In the case of ALVFM, I do the following:
     *    this._performance.ops.fetch1 = startPerformOp( <=== Starts tracking perforamnce
     *    ... Stuff to do
     *    this._performance.ops.fetch1 = updatePerformanceEnd( <=== ENDS tracking performance
     *    this._replacePanelHTML = refreshPanelHTML( <=== This updates the performance panel content
     */

    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidUpdate` );

    let refresh = this.props.bannerProps.displayMode !== prevProps.bannerProps.displayMode ? true : false;
    if ( this.state.apiMode !== prevState.apiMode ) refresh = true;

    //refresh these privates when the prop changes warrent it
    if ( refresh === true ) {
      this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode, this._isAdmin, this.state.targetSiteUrl );
      await this.updateTheseSources( this._missingFetches( this._isAdmin  ) );
      this._contentPages = getBannerPages( this.props.bannerProps );
    }

    if ( this.props.bannerProps.beAUser !== prevProps.bannerProps.beAUser ) {
      this._setIsAdmin();
      this.setState({ refreshId: this._newRefreshId() });
    }
  }

  private async updateTheseSources( sources: IDefSourceType[] ): Promise<void> {
    const { ops, } = this._performance;
    ops.fetch = startPerformOp( 'fetch Sync', this.props.bannerProps.displayMode );

    const all: boolean = sources.indexOf( '*' ) > -1 ? true : false;

    // NOTE:  The vars in the array must be in same order they are called in the Promise.all
    const [ site, allLists, committee, coordinators, maps, forms, tips, admins, rigItems, labels, user, targetInfo ] = await Promise.all([
      all === true || sources.indexOf( 'site' ) > -1 ? this.getSource( this._SourceInfo.site, this._performance ) : this.state.site,
      all === true || sources.indexOf( 'allLists' ) > -1 ? this.getSource( this._SourceInfo.allLists, this._performance ) : this.state.allLists,
      all === true || sources.indexOf( 'committee' ) > -1 ? this.getSource( this._SourceInfo.committee, this._performance ) : this.state.committee,
      all === true || sources.indexOf( 'coordinators' ) > -1 ? this.getSource( this._SourceInfo.coordinators, this._performance ) : this.state.coordinators,
      all === true || sources.indexOf( 'maps' ) > -1 ? this.getSource( this._SourceInfo.maps, this._performance ) : this.state.maps,
      all === true || sources.indexOf( 'forms' ) > -1 ? this.getSource( this._SourceInfo.forms, this._performance ) : this.state.forms,
      all === true || sources.indexOf( 'tips' ) > -1 ? this.getSource( this._SourceInfo.tips, this._performance ) : this.state.tips,
      all === true || sources.indexOf( 'admins' ) > -1 ? this.getSource( this._SourceInfo.admins, this._performance ) : this.state.admins,
      all === true || sources.indexOf( 'rigItems' ) > -1 ? this.getSource( this._SourceInfo.rigItems, this._performance ) : this.state.rigItems,
      all === true || sources.indexOf( 'labels' ) > -1 ? this.getSource( this._SourceInfo.labels, this._performance ) : this.state.labels,
      all === true || sources.indexOf( 'user' ) > -1 ? this.getCurrentUserGraph() : this.state.user,
      all === true || sources.indexOf( 'targetInfo' ) > -1 ? this.getCurrentWeb( this.state.targetWebUrl ) : this.state.targetInfo,
    ]);

    /**
     * Build RIG Indexes and search
     */

    const processLables = labels.loaded === true && this.state.labels.loaded === false ? true : false;
    const processRigItems = rigItems.loaded === true && this.state.rigItems.loaded === false ? true : false;

    console.log( 'processRIG', processLables, processRigItems );

    if ( processLables === true ) {
      ops.analyze7 = startPerformOp( 'analyze7 - RIG', this.props.bannerProps.displayMode );
      labels.index = [];
      labels.items.map( item => { 
        item.ItemNames = [];
        item.ItemNamesStr = '';
        if ( item ) labels.index.push( item[ this._SourceInfo.labels.indexKey ] );
        labels.items = addSearchMeta1( labels.items, this._SourceInfo.labels, null );
        labels.items = addSearchMeta2( labels.items, SearchTypes );
      });
    }

    if ( processRigItems === true ) {
      rigItems.index = [];
      rigItems.misc1 = [];
      rigItems.items.map( item => { 
        if ( item ) {
          const itemIndexStr = item[ this._SourceInfo.rigItems.indexKey ];
          rigItems.index.push( itemIndexStr );
          item.RecordIdx = labels.index.indexOf( item.RecordCode );

          if ( item.RecordIdx > -1 ) {
            labels.items[ item.RecordIdx ].ItemNames.push( itemIndexStr );
            labels.items[ item.RecordIdx ].ItemNamesStr += `${itemIndexStr}; `;
          } else {
            rigItems.misc1.push( itemIndexStr );
          }
          rigItems.items = addSearchMeta1( rigItems.items, this._SourceInfo.rigItems, null );
          rigItems.items = addSearchMeta2( rigItems.items, SearchTypes );
        }
      });
    }

    /**
     * Add SearchMeta to labels after it has the ItemNamesStr added 
     */
    if ( processLables === true ) {
      labels.items = addSearchMeta1( labels.items, this._SourceInfo.labels, null );
      labels.items = addSearchMeta2( labels.items, SearchTypes );

      ops.analyze7 = updatePerformanceEnd( ops.analyze7,   true, labels.items.length + rigItems.items.length );
      if ( check4Gulp() === true ) console.log( 'RIG Crunch', labels, rigItems, ops.analyze7 );
    }
    /**
     * Start SUGGESTIONS
     */

    const updateSugs = this._suggestions !== true ? true : false;
    let suggestions: IStateSuggestions = updateSugs === true ? null : this.state.suggestions;

    //Get Suggestions
    if ( updateSugs === true ) {
      let process9 = startPerformOp( 'suggestions' , this.props.bannerProps.displayMode, true );

      const sugsUser = user ? getSuggestionsByKeys( user.item, [ 'jobTitle' ] , LabelSuggs ) : this.state.suggestions.user;

      let sugsWeb = this.state.suggestions.web;

      if ( this.state.targetWebUrl === this.props.bannerProps.context.pageContext.web.absoluteUrl ) {
        sugsWeb = getSuggestionsByKeys( this.props.bannerProps.context.pageContext.web, [ 'title', 'description' ] , LabelSuggs );

      } else if ( targetInfo && targetInfo.status === 'Success' ) {
        sugsWeb = getSuggestionsByKeys( targetInfo.site, [ 'Title', 'Description' ] , LabelSuggs );
      }

      const libs = site.items.map( item => { return item.NoRecordsDeclared } ); // NoRecordsDeclared is currently the Library Title
      const sugsLibs = libs.length > 0 ? getSuggestionsFromStrings( libs , LabelSuggs ) : [];

      this._suggestions = true;

      process9 = updatePerformanceEnd( process9 , true, LabelSuggs.length );

      suggestions = {
        all: LabelSuggs,
        user: sugsUser,
        libraries: sugsLibs,
        web: sugsWeb,
        site: [],
        performance: process9,
      }
      console.log( 'suggestions', suggestions );

      this._performance.ops.process9 = process9;

    }

    const endWas = Math.max(
      ops.fetch0 && ops.fetch0.end ? ops.fetch0.end.getTime() : -1,
      ops.fetch9 && ops.fetch9.end ? ops.fetch9.end.getTime() : -1,
      ops.fetch1 && ops.fetch1.end ? ops.fetch1.end.getTime() : -1,
      ops.fetch2 && ops.fetch2.end ? ops.fetch2.end.getTime() : -1,
      ops.fetch3 && ops.fetch3.end ? ops.fetch3.end.getTime() : -1,
      ops.fetch4 && ops.fetch4.end ? ops.fetch4.end.getTime() : -1,
      ops.fetch5 && ops.fetch5.end ? ops.fetch5.end.getTime() : -1,
      ops.fetch6 && ops.fetch6.end ? ops.fetch6.end.getTime() : -1,
      ops.fetch8 && ops.fetch8.end ? ops.fetch8.end.getTime() : -1,
      ops.fetch7 && ops.fetch7.end ? ops.fetch7.end.getTime() : -1,
      ops.fetch9 && ops.fetch9.end ? ops.fetch9.end.getTime() : -1,
    );

    const experts: IUserProperties[] = [];
    if ( committee.loaded === true ) {
      committee.items.map( member => {
        if ( member.ExpertContact === 'Yes' && member.Contact ) {
          const expert = member.Contact;
          expert.JobTitle = member.MemberPosition;
          expert.Email = getEmailFromLoginName( expert.Name );
          experts.push( expert );
        }
      });
    }

    ops.fetch = updatePerformanceEnd( ops.fetch,   true, 999999 );

    const totalTime = endWas - ops.fetch.start.getTime();
    console.log('Total fetch time was:', totalTime );

    this.setState({
      user: user,
      experts: experts,
      admins: admins,
      site: site,
      maps: maps,
      committee: committee,
      coordinators: coordinators,
      forms: forms,
      tips: tips,
      allLists: allLists,
      labels: labels,
      rigItems: rigItems,
      targetInfo: targetInfo,
      suggestions: suggestions,
      fullAnalyticsSaved: true,
    });

  }

  private async getSource( sourceProps: ISourcePropsCOP, _performance: ILoadPerformance ) : Promise<IStateSource> {
    const { displayMode } = this.props.bannerProps;
    let stateSource: IStateSource = null;
    if ( sourceProps.key === 'labels' || sourceProps.key === 'rigItems' ) {
      stateSource = await fetchRigData( sourceProps, false, true, this.state.apiMode, this.props.httpClient ) as IStateSource;
      // if ( sourceProps.key === 'labels' ) {
      //   stateSource = await fetchRigData( sourceProps, true, true, this.state.apiMode, this.props.httpClient ) as IStateSource;
      // } else {
      //   stateSource = await fetchRigItems( sourceProps, true, true, this.state.apiMode, this.props.httpClient ) as IStateSource;
      // }
      stateSource.index = [];
      stateSource.items.map( item => { stateSource.index.push( item[ sourceProps.indexKey ] ) });

    } else {
      stateSource = await getSourceItems( { ...sourceProps, ...{ editMode: displayMode } }, false, true ) as IStateSource;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _performanceOpsAny: any = _performance.ops;
    const op = sourceProps.performanceSettings.op;

    if ( stateSource.loaded === true ) {

      const idx = op ? `${op.replace('fetch', '')}` : makeid(4);      // Get Index of op... like for fetch4, idx = 4
      const label = `p${idx} ${ sourceProps.performanceSettings.label }`;  // Get label of op... like for fetch4, idx = 4

      let analyzePerf = startPerformOp( label , displayMode, true );
      stateSource.items = addSearchMeta1( stateSource.items, sourceProps, null );

      if ( sourceProps.key === 'admins' ) { 
        stateSource.items = addEasyIcons( stateSource.items, sourceProps, this.props.bannerProps.EasyIconsObject ); 
        stateSource.items = sortObjectArrayByNumberKey( stateSource.items, 'asc', 'SortOrder' );
      }

      stateSource.items.map( item => {
        if ( item.JSONLists ) { 
          try {
            item.JSON = JSON.parse( item.JSONLists );
            if ( item.JSON.url ) item.ListUrl = item.JSON.url;
            if ( item.JSON.id ) item.ListId = item.JSON.id;
            if ( item.JSON.id ) item.ListSettings = `${item.Subsite}/_layouts/15/Hold.aspx?Tag=true&List={${item.ListId}}`;
          } catch (e) {
            console.log('UNABLE TO PARSE JSONLists field')
          }
        }
      });

      // Copy Top SIte info to Subsite if Subsite is empty
      if ( sourceProps.key === 'allLists' || sourceProps.key === 'site' ) {
        stateSource.items.map( item => {
          if ( !item.SubTitle ) item.SubTitle = item.Title;
          if ( !item.Subsite ) item.Subsite = item.URL.replace(`${window.location.origin}/sites`, '');
        });
      }

      stateSource.items.map( item => {
        if ( item.JSONLists ) { 
          try {
            item.JSON = JSON.parse( item.JSONLists );
            if ( item.JSON.url ) item.ListUrl = item.JSON.url;
            if ( item.JSON.id ) item.ListId = item.JSON.id;
            if ( item.JSON.id ) item.ListSettings = `${item.Subsite}/_layouts/15/Hold.aspx?Tag=true&List={${item.ListId}}`;
          } catch (e) {
            console.log('UNABLE TO PARSE JSONLists field')
          }
        }
      });

      stateSource.items = addSearchMeta2( stateSource.items, SearchTypes );
      analyzePerf = updatePerformanceEnd( analyzePerf , true, stateSource.items.length );
      _performanceOpsAny[ `process${idx}` ] = analyzePerf; // Need to use just index here in order to save to correct object key
    }

    if ( op && stateSource.loaded === true ) _performanceOpsAny[ op ] = stateSource.performanceOp;
    console.log('getSource', sourceProps, stateSource, _performanceOpsAny );

    return stateSource;

  }

  public render(): React.ReactElement<IComplianceOpsProps> {
    const {
      hasTeamsContext, bannerProps
    } = this.props;

    const { mainPivotKey, contactPivotKey } = this.state; //, fullAnalyticsSaved


    const devHeader = this.state.showDevHeader === true ? <div><b>Props: </b> { `this.props.lastPropChange , this.props.lastPropDetailChange` } - <b>State: lastStateChange: </b> { this.state.lastStateChange  } </div> : null ;

    /***
     *    d8888b.  .d8b.  d8b   db d8b   db d88888b d8888b.      d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
     *    88  `8D d8' `8b 888o  88 888o  88 88'     88  `8D      88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
     *    88oooY' 88ooo88 88V8o 88 88V8o 88 88ooooo 88oobY'      88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
     *    88~~~b. 88~~~88 88 V8o88 88 V8o88 88~~~~~ 88`8b        88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
     *    88   8D 88   88 88  V888 88  V888 88.     88 `88.      88.     88booo. 88.     88  88  88 88.     88  V888    88    
     *    Y8888P' YP   YP VP   V8P VP   V8P Y88888P 88   YD      Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
     *                                        
     *                                        
     */


    // initiate array for adding more buttons here.  If not needed, can be commented out
    const farBannerElementsArray = [...this._farBannerElements,
      //  ...[<div title={'Show Code Details'}><Icon iconName={ 'Code' } onClick={ this.toggleDebugMode.bind(this) } style={ bannerProps.bannerCmdReactCSS }></Icon></div>],
    ];

    //Setting showTricks to false here ( skipping this line does not have any impact on bug #90 )
    if ( this.props.bannerProps.beAUser === false && this.props.bannerProps.showTricks === true ) {
      const { apiMode  } = this.state;
      const apiIcon = apiMode === 'Live' ? 'PlugConnected' : 'PlugDisconnected';
      const switchText = apiMode === 'Live' ? 'Mock' : 'Live';

      farBannerElementsArray.push(
        <div title={`Currently in ${apiMode} API Mode.  Press to switch to ${switchText} data mode`}><Icon iconName={apiIcon} onClick={ this._toggleApiMode.bind(this) } style={ bannerProps.bannerCmdReactCSS }/></div>
      );

    }

    // const FPSUser : IFPSUser = this.props.bannerProps.FPSUser;
    // const showSpecial = this.state.targetGroupId === '00000000-0000-0000-0000-000000000000' ? true : false;
    const specialType = this.state.targetGroupId !== '00000000-0000-0000-0000-000000000000' ? 'Teams/Group' : this.state.targetSiteUrl.indexOf('/sites/lifenet') > -1 ? 'LifeNet' : '';
    const showSpecial = specialType === '' ? false : true;
    const WarningUrls = this.state.admins.items.filter( page => { return page.WebPartTab === 'TeamsWarning' && page.Status === 'Public' });
    const specialProps: ISpecialMessage = {
      message: `${specialType} sites are NOT allowed to store Records :(`,
      style:  { color: 'red', background: 'yellow' },
      leftIcon:'WarningSolid',
      rightIcon: 'WarningSolid',
      link: {
        Url: WarningUrls && WarningUrls.length > 0 ? WarningUrls[0]['File/ServerRelativeUrl'] : '',
        Desc: `Click to see more details`,
      }
    }

    const Special : ISpecialMessage = showSpecial === true ? specialProps : undefined;
    // if ( Special ) Special.style = { color: 'red', background: 'yellow' };

    if ( check4Gulp() === true )  console.log('React Render - this._performance:', JSON.parse(JSON.stringify(this._performance)) );

    const Banner = <FetchBannerX

      // bonusHTML1={ 'BonusHTML1 Text' }
      panelPerformance={ this._performance }
      // bonusHTML2={ <div>BonusHTML2 Div</div> }
      siteThemes = { SiteThemes }

      bannerProps={ this.props.bannerProps }
      parentState={ this.state }

      nearBannerElementsArray={ [] }
      farBannerElementsArray={ farBannerElementsArray }

      contentPages={ this._contentPages }
      WebPartHelpPivots= { this._webPartHelpElement }

      SpecialMessage = { Special }

      updatePinState = { this._updatePinState.bind(this) }
      pinState = { this.state.pinState }

    />;

    const mainPivot = 
    <div id={ `MainPivot${this.props.bannerProps.refreshId}` }>
      <Pivot
          getTabId={ ( itemKey, index ) => { return `MainPivot${itemKey}`} }
          // styles={ mainPivotStyles }
          linkFormat={PivotLinkFormat.links}
          linkSize={PivotLinkSize.normal}
          selectedKey={ mainPivotKey }
          // onLinkClick={this.pivotMainClick.bind(this)}
          onLinkClick={ this.pivotMainClick.bind(this) }
      > 
        { this._mainPivots }

      </Pivot>
    </div>
    ;

    const homePage = <HomePageHook
      debugMode={ this.state.debugMode }
      mainPivotKey={ mainPivotKey }
      wpID={ '' }
      refreshID= { this.state.refreshId }
      primarySource={ this._SourceInfo.admins }
      fpsItemsReturn={ this.state.admins }
    />;

    
    const allListsPageHeader = <AllListsPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
      allLists={ this.state.allLists }
      primarySource={ this._SourceInfo.allLists }
      refreshId={ this.state.allLists.refreshId }
    />;
    
    const rigItemsPageHeader = <RigItemsPageHook
      suggestions={ this.state.suggestions }
      user={ this.state.user }
      webTitle={ this.props.bannerProps.context.pageContext.web.title }
      stateSource = { this.state.rigItems}
      primarySource = { this._SourceInfo.rigItems }
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
    />;

    const sitePageHeader = <SitePageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' } />;

    const enforcementItems = this.createItemsElement( sitePageHeader, 'Site' );

    const mapPageHeader = <MapPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' } />;

    const mapItems = this.createItemsElement( mapPageHeader, 'Maps' );

    const formPageHeader = <FormPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' } />;

    const formItems = this.createItemsElement( formPageHeader, 'Forms' );

    const coordinatorsPageHeader = <CoordinatorsPageHook
      debugMode={ this.state.debugMode } contactPivotKey={ contactPivotKey } wpID={ '' } />;

    const coordinatorsItems = this.createItemsElement( coordinatorsPageHeader, 'Coordinators' );

    const sharePointPageHeader = <SharePointPageHook
      debugMode={ this.state.debugMode } contactPivotKey={ contactPivotKey } wpID={ '' } />;

    const expertsPageHeader = <ExpertsPageHook
      debugMode={ this.state.debugMode } contactPivotKey={ contactPivotKey } wpID={ '' }
      context={ bannerProps.context }
      users={ this.state.experts }
      webUrl={ IntraNetHome }
      deepLinkClick={ this.deepLinkClick.bind(this) }
    />;

    const committeePageHeader = <CommitteePageHook
      debugMode={ this.state.debugMode } contactPivotKey={ contactPivotKey } wpID={ '' } />;

    const committeeItems = this.createItemsElement( committeePageHeader, 'Committee' );

    const tipsPageHeader: JSX.Element = undefined; 
    // <TipsPageHook
    //   debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
    //   stateSource={ this.state.tips }
    //   />;

    const tipsItems = this.createItemsElement( tipsPageHeader, 'Tips' );

    const instructionsPageHeader = <InstructionsPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
      primarySource={ this._SourceInfo.admins }
      fpsItemsReturn={ this.state.admins } />;

    // const instructionsItems = this.createItemsElement( instructionsPageHeader, 'Instructions' );

    const detailsPageHeader = <DetailsPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' } />;

    // const detailsItems = this.createItemsElement( detailsPageHeader, 'Details' );

    const labelsPageHeader = <LabelsPageHook
      suggestions={ this.state.suggestions }
      user={ this.state.user }
      webTitle={ this.props.bannerProps.context.pageContext.web.title }
      primarySource={ this._SourceInfo.labels }
      stateSource={ this.state.labels}
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
    />;

    // const labelsItems = this.createItemsElement( labelsPageHeader, 'Labels' );

    const adminsPageHeader = <AdminsPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
      easyPagesPageProps= {{
        expandedState: true,
        parentUrl: '',
        sourceName: 'Alternate',
        source: this._SourceInfo.admins,
        tabs: this._SourceInfo.admins.defSearchButtons,
      }}
      easyPagesSourceProps={ this.props.bannerProps.easyPagesSourceProps }
      EasyIconsObject={ this.props.bannerProps.EasyIconsObject }
      primarySource={ this._SourceInfo.admins }
      fpsItemsReturn={ this.state.admins }

    />;

    const testingPageHeader = <TestingPageHook
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' }
      bannerProps={ bannerProps }
      stateSource={ this.state.labels }
      httpClient={ this.props.httpClient }
      // easyPagesPageProps= {{
      //   expandedState: true,
      //   parentUrl: '',
      //   sourceName: 'Alternate',
      //   source: this._SourceInfo.admins,
      //   tabs: this._SourceInfo.admins.defSearchButtons,
      // }}
      // easyPagesSourceProps={ this.props.bannerProps.easyPagesSourceProps }
      // EasyIconsObject={ this.props.bannerProps.EasyIconsObject }
      primarySource={ this._SourceInfo.labels }
      fpsItemsReturn={ this.state.labels }

    />;

    // const adminsItems = this.createItemsElement( adminsPageHeader, 'Admins' );

    const contactsPivot = 
    <div id={ `ContactPivot${this.props.bannerProps.refreshId}` }>
      <Pivot
          getTabId={ ( itemKey, index ) => { return `ContactPivot${itemKey}`} }
          // styles={ mainPivotStyles }
          linkFormat={PivotLinkFormat.tabs}
          linkSize={PivotLinkSize.normal}
          selectedKey={ contactPivotKey }
          // onLinkClick={this.pivotMainClick.bind(this)}
          onLinkClick={ this.pivotContactClick.bind(this) }
      >
       { contactPivots } 
      </Pivot>
    </div>

    const WebUrl: JSX.Element = bannerProps.showTricks && bannerProps.beAUser !== true ? <WebUrlHook 
      mainPivotKey={ mainPivotKey }
      showInput={ true }
      inputLabel={ 'Target Site Url' }
      textInput={ this.state.targetWebUrl }
      // updateInputCallback={ ( url: string, targetStatus: string ) => { this.setState({ targetWebUrl: url, targetStatus: targetStatus }) }}
      updateInputCallback= { this._updateWebUrl.bind( this )}
      callBackOnError= { true }
      wpID={ '' }
    /> : undefined ;

    return (
      <section className={`${styles.complianceOps} ${hasTeamsContext ? styles.teams : ''}`}>

        { WebUrl }
        { devHeader }
        { Banner }
        { mainPivot }
        { mainPivotKey !== 'Home' ? undefined : homePage }
        { mainPivotKey !== 'Instructions' ? undefined : instructionsPageHeader }
        { mainPivotKey !== 'Tips' ? undefined : tipsItems }
        { mainPivotKey !== 'RigItems' ? undefined : rigItemsPageHeader }
        { mainPivotKey !== 'Labels' ? undefined : labelsPageHeader }
        { mainPivotKey !== 'Site' ? undefined : enforcementItems }
        { mainPivotKey !== 'Details' ? undefined : detailsPageHeader }

        {/* These next 4 items need to be in order where contactsPivot is above the other items */}
        { mainPivotKey !== 'Contacts' ? undefined : contactsPivot }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'SharePoint' ? sharePointPageHeader : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Coordinators' ? coordinatorsItems : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Committee' ? committeeItems : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Experts' ? expertsPageHeader : undefined }

        {/* These next 4 items need to be in order where contactsPivot is above the other items */}
        { mainPivotKey !== 'Testing' ? undefined : testingPageHeader }

        { mainPivotKey !== 'Maps' ? undefined : mapItems }
        { mainPivotKey !== 'Forms' ? undefined : formItems }
        { mainPivotKey !== 'Admins' ? undefined : adminsPageHeader }
        { mainPivotKey !== 'AllLists' ? undefined : allListsPageHeader }

        {/* <h2>Fetch Status: { fullAnalyticsSaved === true ? 'Finished!' : 'working' } { fullAnalyticsSaved === true ? this._performance.ops.fetch.ms : '' } ms</h2> */}

      </section>
    );
  }

  private async _updateWebUrl( webUrl: string, targetInfo: IFpsGetSiteReturn ) : Promise<void>  { 
    if ( webUrl === this.state.targetWebUrl ) return;
    const siteUrl: string = getSiteCollectionUrlFromLink( webUrl );
    // const site: IStateSource = JSON.parse(JSON.stringify( this.state.site ));
    // site.loaded = false;
    // this.setState({ targetWebUrl: webUrl, targetStatus: targetStatus, site: site });
    this._suggestions = false;  // Set to false so it gets re-run against current libraries and site AIInnovation

    if ( targetInfo.status === 'AccessDenied' || targetInfo.status === 'Success') {
      this.setState({ 
        targetSiteUrl: siteUrl,
        targetWebUrl: webUrl,
        targetStatus: targetInfo.status,
        site: { ...this.state.site, ...{ loaded: false } }, // This re-fetches this site's libraries that need labels because it does exist
        targetGroupIdStatus: targetInfo.status,
        targetGroupId: targetInfo.status === 'Success' ? targetInfo.site.GroupId : targetInfo.status,
        targetInfo: targetInfo,
      });
    } else {
      this.setState({ 
        targetSiteUrl: siteUrl,
        targetWebUrl: webUrl,
        targetStatus: targetInfo.status,
        targetGroupId: targetInfo.status,
      });
    }

    this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode, this._isAdmin, this.state.targetSiteUrl );
    await this.updateTheseSources( this._missingFetches( this._isAdmin ) );

  }

  private _toggleApiMode(): void {
    const apiMode = this.state.apiMode === 'Live' ? 'Mock' : 'Live';
    this.setState({ 
      apiMode: apiMode,
      rigItems : { items: [], index: [], loaded: false, refreshId: this._newRefreshId(), status: 'Unknown', e: null, misc1: [], },
      labels : { items: [], index: [], loaded: false, refreshId: this._newRefreshId(), status: 'Unknown', e: null },
    });
  }

  private pivotMainClick( temp: any ): void {
    console.log('pivotMainClick:', temp.props.itemKey );
    //This will force state update first, to show spinner, then will update the info.   https://stackoverflow.com/a/38245851
    this.setState({ 
      mainPivotKey: temp.props.itemKey,
    });
  }

  private pivotContactClick( temp: any ): void {
    console.log('pivotContactClick:', temp.props.itemKey );
    //This will force state update first, to show spinner, then will update the info.   https://stackoverflow.com/a/38245851
    this.setState({ 
      contactPivotKey: temp.props.itemKey,
    });
  }

  private deepLinkClick( main: ITabMain, contact: ITabContactPivots, ): void {
    this.setState({ 
      mainPivotKey: main ? main : this.state.mainPivotKey,
      contactPivotKey: contact ? contact : this.state.contactPivotKey,
    });
  }


  private createItemsElement( pageHeader: JSX.Element , tab: ITabMain ): JSX.Element {

    let primarySource = null;
    let stateSource = null;
    let renderRow = null;
    switch ( tab ) {
      case 'Home':
      break;
      case 'Maps':
        primarySource = this._SourceInfo.maps;
        stateSource = this.state.maps;
        renderRow = createMapRow;
      break;
      case 'Site':
        primarySource = this._SourceInfo.site;
        stateSource = this.state.site;
        renderRow = createSiteRow;
      break;
      case 'Forms':
        primarySource = this._SourceInfo.forms;
        stateSource = this.state.forms;
        renderRow = createFormRow;
      break;
      case 'Coordinators':
        primarySource = this._SourceInfo.coordinators;
        stateSource = this.state.coordinators;
        renderRow = createCoordinatorsRow;
      break;
      case 'Committee':
        primarySource = this._SourceInfo.committee;
        stateSource = this.state.committee;
        renderRow = createCommitteeRow;
      break;
      case 'Tips':
        primarySource = this._SourceInfo.tips;
        stateSource = this.state.tips;
        renderRow = createTipsRow;
      break;
    }

    const itemsElement = <SourcePages
      // source={ SourceInfo }
      primarySource={ primarySource }
      itemsPerPage={ 20 }
      pageWidth={ 1000 }
      topButtons={ primarySource ? primarySource.defSearchButtons : [] }

      stateSource={ stateSource }
      startQty={ 20 }
      showItemType={ false }
      debugMode={ this.state.debugMode }
      renderRow={ renderRow }
      // bumpDeepLinks= { this.bumpDeepStateFromComponent.bind(this) }
      deepProps={ null } //this.state.deepProps
      // canvasOptions={ this.props.canvasOptions }

      onParentCall={ () => { alert('Hey, parent was called!')} }
      headingElement={ pageHeader }
      // footerElement={ <div style={{color: 'red', fontWeight: 600 }}>THIS IS the FOOTER ELEMENT</div> }
    />;

    return itemsElement;

  }

}
