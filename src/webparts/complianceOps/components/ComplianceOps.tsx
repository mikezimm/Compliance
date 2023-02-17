import * as React from 'react';
import styles from './ComplianceOps.module.scss';
import { IComplianceOpsProps, IComplianceOpsState, IStateSource, ITabContactPivots, ITabMain } from './IComplianceOpsProps';


import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
// import { ISpinnerStyles, Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';

import { saveViewAnalytics } from '../CoreFPS/Analytics';

import FetchBannerX from '@mikezimm/fps-library-v2/lib/banner/bannerX/FetchBannerX';
// import { createSpecialElement } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/component';
// import { ISpecialMessage, } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/interface';

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

import AdminsPageHook from './Pages/Admins/Header';

// import { createAdminsRow } from './Pages/Admins/Row';
import { addEasyIcons } from '@mikezimm/fps-library-v2/lib/components/atoms/EasyIcons/getEasyIcon';

import SharePointPageHook from './Pages/SharePoint/Header';
import { getSiteCollectionUrlFromLink } from '@mikezimm/fps-library-v2/lib/logic/Strings/urlServices';
// import { createSharePointRow } from './Pages/SharePoint/Row';

const SiteThemes: ISiteThemes = { dark: styles.fpsSiteThemeDark, light: styles.fpsSiteThemeLight, primary: styles.fpsSiteThemePrimary };

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: FpsCore115Banner';

const mainKeys: ITabMain[] = [ 'Home', 'Instructions', 'Tips', 'Labels', 'Site', 'Details', 'Contacts', 'Maps', 'Forms', 'Admins' ];

const contactKeys: ITabContactPivots[] = [ 'Coordinators', 'SharePoint', 'Committee', ];
const contactPivots: JSX.Element[] = contactKeys.map( ( key: string, idx: number ) => {
  return <PivotItem key={ idx } headerText={ contactKeys[idx] } ariaLabel={contactKeys[idx]} title={contactKeys[idx]} itemKey={ key }/>;
});


export default class ComplianceOps extends React.Component<IComplianceOpsProps, IComplianceOpsState> {

  private _performance: ILoadPerformance = null;

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
      if ( key !== 'Admins' || this._isAdmin === true ) pivots.push ( <PivotItem key={ idx } headerText={ mainKeys[idx] } ariaLabel={mainKeys[idx]} title={mainKeys[idx]} itemKey={ key }/> );
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

  private _missingFetches() : IDefSourceType[] {

    const loads: IDefSourceType[] = [];
    if ( this.state.site.loaded !== true ) loads.push( 'site' );
    if ( this.state.committee.loaded !== true ) loads.push( 'committee' );
    if ( this.state.coordinators.loaded !== true ) loads.push( 'coordinators' );
    if ( this.state.maps.loaded !== true ) loads.push( 'maps' );
    if ( this.state.forms.loaded !== true ) loads.push( 'forms' );
    if ( this.state.tips.loaded !== true ) loads.push( 'tips' );
    if ( this.state.admins.loaded !== true ) loads.push( 'admins' );

    if ( loads.length === 0 ) loads.push( '*' );

    return loads;

  }

  private _updatePinState( newValue :  IPinMeState ): void {
    this.setState({ pinState: newValue, });
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

    this.state = {
      pinState: this.props.bannerProps.fpsPinMenu.defPinState ? this.props.bannerProps.fpsPinMenu.defPinState : 'normal',
      showDevHeader: false,
      lastStateChange: '',
      analyticsWasExecuted: false,
      refreshId: this._newRefreshId(),
      debugMode: false,
      showSpinner: false,
      targetSite: collectionUrl,
      targetStatus: '',

      mainPivotKey: 'Home',
      contactPivotKey: 'Coordinators',

      fullAnalyticsSaved: false,

      admins : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      site : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      committee : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      coordinators : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      maps : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      forms : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },
      tips : { items: [], loaded: false, refreshId: constId, status: 'Unknown', e: null },

    };
  }

  public async componentDidMount(): Promise<void> {
      if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidMount` );

      await this.updateTheseSources( this._missingFetches() );

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

  public async componentDidUpdate( prevProps: IComplianceOpsProps ): Promise<void> {

    /**
     * This section is needed if you want to track performance in the react component.
     *    In the case of ALVFM, I do the following:
     *    this._performance.ops.fetch1 = startPerformOp( <=== Starts tracking perforamnce
     *    ... Stuff to do
     *    this._performance.ops.fetch1 = updatePerformanceEnd( <=== ENDS tracking performance
     *    this._replacePanelHTML = refreshPanelHTML( <=== This updates the performance panel content
     */

    if ( check4Gulp() === true )  console.log( `${consolePrefix} ~ componentDidUpdate` );

    const refresh = this.props.bannerProps.displayMode !== prevProps.bannerProps.displayMode ? true : false;

    //refresh these privates when the prop changes warrent it
    if ( refresh === true ) {
      this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode, this._isAdmin, this.state.targetSite );
      await this.updateTheseSources( this._missingFetches() );
      this._contentPages = getBannerPages( this.props.bannerProps );
    }

    if ( this.props.bannerProps.beAUser !== prevProps.bannerProps.beAUser ) {
      this._setIsAdmin();
      this.setState({ refreshId: this._newRefreshId() });
    } 
  }

  private async updateTheseSources( sources: IDefSourceType[] ): Promise<void> {
    const { ops } = this._performance;
    ops.fetch = startPerformOp( 'fetch Sync', this.props.bannerProps.displayMode );

    const all: boolean = sources.indexOf( '*' ) > -1 ? true : false;

    // NOTE:  The vars in the array must be in same order they are called in the Promise.all
    const [ site, committee, coordinators, maps, forms, tips, admins ] = await Promise.all([
      all === true || sources.indexOf( 'site' ) > -1 ? this.getSource( this._SourceInfo.site, this._performance ) : this.state.site,
      all === true || sources.indexOf( 'committee' ) > -1 ? this.getSource( this._SourceInfo.committee, this._performance ) : this.state.committee,
      all === true || sources.indexOf( 'coordinators' ) > -1 ? this.getSource( this._SourceInfo.coordinators, this._performance ) : this.state.coordinators,
      all === true || sources.indexOf( 'maps' ) > -1 ? this.getSource( this._SourceInfo.maps, this._performance ) : this.state.maps,
      all === true || sources.indexOf( 'forms' ) > -1 ? this.getSource( this._SourceInfo.forms, this._performance ) : this.state.forms,
      all === true || sources.indexOf( 'tips' ) > -1 ? this.getSource( this._SourceInfo.tips, this._performance ) : this.state.tips,
      all === true || sources.indexOf( 'admins' ) > -1 ? this.getSource( this._SourceInfo.admins, this._performance ) : this.state.admins,
    ]);

    const endWas = Math.max(
      ops.fetch0 && ops.fetch0.end ? ops.fetch0.end.getTime() : -1,
      ops.fetch1 && ops.fetch1.end ? ops.fetch1.end.getTime() : -1,
      ops.fetch2 && ops.fetch2.end ? ops.fetch2.end.getTime() : -1,
      ops.fetch3 && ops.fetch3.end ? ops.fetch3.end.getTime() : -1,
      ops.fetch4 && ops.fetch4.end ? ops.fetch4.end.getTime() : -1,
      ops.fetch5 && ops.fetch5.end ? ops.fetch5.end.getTime() : -1,
      ops.fetch6 && ops.fetch6.end ? ops.fetch6.end.getTime() : -1,
    );

    ops.fetch = updatePerformanceEnd( ops.fetch, true, 999999 );

    const totalTime = endWas - ops.fetch.start.getTime();
    console.log('Total fetch time was:', totalTime );

    this.setState({
      admins: admins,
      site: site,
      maps: maps,
      committee: committee,
      coordinators: coordinators,
      forms: forms,
      tips: tips,
      fullAnalyticsSaved: true,
    });

  }

  private async getSource( sourceProps: ISourcePropsCOP, _performance: ILoadPerformance ) : Promise<IStateSource> {
    const { displayMode } = this.props.bannerProps;

    const stateSource = await getSourceItems( { ...sourceProps, ...{ editMode: displayMode } }, true, true ) as IStateSource;

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

    const { mainPivotKey, contactPivotKey, fullAnalyticsSaved } = this.state;


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
    if ( this.props.bannerProps.beAUser === false ) {
      farBannerElementsArray.push(
        // <div title={'Show Debug Info'}><Icon iconName='TestAutoSolid' onClick={ this.toggleDebugMode.bind(this) } style={ this.debugCmdStyles }></Icon></div>
      );
    }

    // const FPSUser : IFPSUser = this.props.bannerProps.FPSUser;
    // const showSpecial = FPSUser.manageWeb === true || FPSUser.managePermissions === true || FPSUser.manageLists === true ? true : false;
    // const Special : ISpecialMessage = showSpecial === true ? specialUpgrade( 'warn', '/sites/TheSharePointHub/SitePages/DrillDown-WebPart-Upgrade---v2.aspx', ) : undefined;
    // Special.style = { color: 'black', background: 'limegreen' };

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

      // SpecialMessage = { Special }

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
      debugMode={ this.state.debugMode } contactPivotKey={ contactPivotKey } wpID={ '' } />;

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
      debugMode={ this.state.debugMode } mainPivotKey={ mainPivotKey } wpID={ '' } />;

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
      textInput={ this.state.targetSite }
      // updateInputCallback={ ( url: string, targetStatus: string ) => { this.setState({ targetSite: url, targetStatus: targetStatus }) }}
      updateInputCallback= { this._updateWebUrl.bind( this )}
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
        { mainPivotKey !== 'Labels' ? undefined : labelsPageHeader }
        { mainPivotKey !== 'Site' ? undefined : enforcementItems }
        { mainPivotKey !== 'Details' ? undefined : detailsPageHeader }

        {/* These next 4 items need to be in order where contactsPivot is above the other items */}
        { mainPivotKey !== 'Contacts' ? undefined : contactsPivot }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'SharePoint' ? sharePointPageHeader : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Coordinators' ? coordinatorsItems : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Committee' ? committeeItems : undefined }
        { mainPivotKey === 'Contacts' && contactPivotKey === 'Experts' ? expertsPageHeader : undefined }

        { mainPivotKey !== 'Maps' ? undefined : mapItems }
        { mainPivotKey !== 'Forms' ? undefined : formItems }
        { mainPivotKey !== 'Admins' ? undefined : adminsPageHeader }

        {/* <h2>Fetch Status: { fullAnalyticsSaved === true ? 'Finished!' : 'working' } { fullAnalyticsSaved === true ? this._performance.ops.fetch.ms : '' } ms</h2> */}

      </section>
    );
  }

  private async _updateWebUrl( url: string, targetStatus: string ) : Promise<void>  { 
    const webUrl: string = getSiteCollectionUrlFromLink( url );
    // const site: IStateSource = JSON.parse(JSON.stringify( this.state.site ));
    // site.loaded = false;
    // this.setState({ targetSite: webUrl, targetStatus: targetStatus, site: site });
    this.setState({ targetSite: webUrl, targetStatus: targetStatus, site: { ...this.state.site, ...{ loaded: false } } });
    this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode, this._isAdmin, this.state.targetSite );
    await this.updateTheseSources( this._missingFetches() );
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
