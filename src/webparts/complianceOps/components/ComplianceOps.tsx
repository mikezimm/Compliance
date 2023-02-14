import * as React from 'react';
import styles from './ComplianceOps.module.scss';
import { IComplianceOpsProps, IComplianceOpsState, IStateSource, ITabMain } from './IComplianceOpsProps';
import { escape } from '@microsoft/sp-lodash-subset';


import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize,} from 'office-ui-fabric-react/lib/Pivot';
import { ISpinnerStyles, Spinner, SpinnerSize, } from 'office-ui-fabric-react/lib/Spinner';

import { saveViewAnalytics } from '../CoreFPS/Analytics';

// import FetchBanner from '../CoreFPS/FetchBannerElement';
import FetchBannerX from '@mikezimm/fps-library-v2/lib/banner/bannerX/FetchBannerX';
// import { createSpecialElement } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/component';
// import { ISpecialMessage, } from '@mikezimm/fps-library-v2/lib/banner/components/SpecialBanner/interface';

import { getWebPartHelpElementBoxTiles } from '../PropPaneHelp/PropPaneHelp';
import { getBannerPages, } from './HelpPanel/AllContent';
import { check4Gulp, IBannerPages, IPinMeState, makeid } from "../fpsReferences";

import { ILoadPerformance, startPerformOp, updatePerformanceEnd } from "../fpsReferences";

import { getSourceItems } from '@mikezimm/fps-library-v2/lib/pnpjs/SourceItems/getSourceItems';

import { ISiteThemes } from "@mikezimm/fps-library-v2/lib/common/commandStyles/ISiteThemeChoices";
import { buildCurrentSourceInfo, IDefSourceType, ISourceInfo, ISourcePropsCOP } from './DataInterface';

import HomePageHook from './Pages/Home/Page';
import SitePageHook from './Pages/Site/Page';
import { addSearchMeta1 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta1';
import { addSearchMeta2 } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/functions/addSearchMeta2';
import { SearchTypes } from '@mikezimm/fps-library-v2/lib/components/molecules/SearchPage/Interfaces/StandardTypes';

const SiteThemes: ISiteThemes = { dark: styles.fpsSiteThemeDark, light: styles.fpsSiteThemeLight, primary: styles.fpsSiteThemePrimary };

//Use this to add more console.logs for this component
const consolePrefix: string = 'fpsconsole: FpsCore115Banner';

const mainKeys: ITabMain[] = [ 'Home', 'Site', 'Maps', 'Forms', 'Tips', 'Instructions', 'Contacts', 'Details'];
const mainPivots: any[] = mainKeys.map( ( key: string, idx: number ) => {
  return <PivotItem key={ idx } headerText={ mainKeys[idx] } ariaLabel={mainKeys[idx]} title={mainKeys[idx]} itemKey={ key }/>;
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

  private _missingFetches() : IDefSourceType[] {

    const loads: IDefSourceType[] = [];
    if ( this.state.site.loaded !== true ) loads.push( 'site' );
    if ( this.state.committee.loaded !== true ) loads.push( 'committee' );
    if ( this.state.coordinators.loaded !== true ) loads.push( 'coordinators' );
    if ( this.state.maps.loaded !== true ) loads.push( 'maps' );
    if ( this.state.forms.loaded !== true ) loads.push( 'forms' );
    if ( this.state.tips.loaded !== true ) loads.push( 'tips' );

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

    this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode );
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

      mainPivotKey: 'Home',

      fullAnalyticsSaved: false,

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

      //Start tracking performance
      // this._performance.ops.fetch1 = startPerformOp( 'fetch1 TitleText', this.props.bannerProps.displayMode );
      //Do async code here
      await this.updateTheseSources( this._missingFetches() );
      //End tracking performance
      // this._performance.ops.fetch1 = updatePerformanceEnd( this._performance.ops.fetch1, true, 777 );

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
      this._SourceInfo = buildCurrentSourceInfo( this.props.bannerProps.displayMode );
      await this.updateTheseSources( this._missingFetches() );
      this._contentPages = getBannerPages( this.props.bannerProps );
    }
  }

  private async updateTheseSources( sources: IDefSourceType[] ): Promise<void> {
    const { ops } = this._performance;
    ops.fetch = startPerformOp( 'fetch Sync', this.props.bannerProps.displayMode );

    const all: boolean = sources.indexOf( '*' ) > -1 ? true : false;

    // NOTE:  The vars in the array must be in same order they are called in the Promise.all
    const [ site, committee, coordinators, maps, forms, tips, ] = await Promise.all([
      all === true || sources.indexOf( 'site' ) > -1 ? this.getSource( this._SourceInfo.site, this._performance ) : this.state.site,
      all === true || sources.indexOf( 'committee' ) > -1 ? this.getSource( this._SourceInfo.committee, this._performance ) : this.state.committee,
      all === true || sources.indexOf( 'coordinators' ) > -1 ? this.getSource( this._SourceInfo.coordinators, this._performance ) : this.state.coordinators,
      all === true || sources.indexOf( 'maps' ) > -1 ? this.getSource( this._SourceInfo.maps, this._performance ) : this.state.maps,
      all === true || sources.indexOf( 'forms' ) > -1 ? this.getSource( this._SourceInfo.forms, this._performance ) : this.state.forms,
      all === true || sources.indexOf( 'tips' ) > -1 ? this.getSource( this._SourceInfo.tips, this._performance ) : this.state.tips,
    ]);

    const endWas = Math.max(
      ops.fetch0 && ops.fetch0.end ? ops.fetch0.end.getTime() : -1,
      ops.fetch1 && ops.fetch1.end ? ops.fetch1.end.getTime() : -1,
      ops.fetch2 && ops.fetch2.end ? ops.fetch2.end.getTime() : -1,
      ops.fetch3 && ops.fetch3.end ? ops.fetch3.end.getTime() : -1,
      ops.fetch4 && ops.fetch4.end ? ops.fetch4.end.getTime() : -1,
      ops.fetch5 && ops.fetch5.end ? ops.fetch5.end.getTime() : -1,
    );

    ops.fetch = updatePerformanceEnd( ops.fetch, true, 999999 );

    const totalTime = endWas - ops.fetch.start.getTime();
    console.log('Total fetch time was:', totalTime );

    this.setState({
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
      hasTeamsContext,
    } = this.props;


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
          selectedKey={ this.state.mainPivotKey }
          // onLinkClick={this.pivotMainClick.bind(this)}
          onLinkClick={ this.pivotMainClick.bind(this) }
      > 
        { mainPivots }

      </Pivot>
    </div>
    ;

    const homePage = <HomePageHook
      debugMode={ this.state.debugMode }
      mainPivotKey={ this.state.mainPivotKey }
      // appLinks={ this.state.appLinks }
      // news={ this.state.news }
      wpID={ '' }
      refreshID= { this.state.refreshId }
      // wpID={ this.props.bannerProps.refreshId }
    />;

    const sitePage = <SitePageHook
      primarySource={ this._SourceInfo.site }
      stateSource={ this.state.site }
      debugMode={ this.state.debugMode }
      mainPivotKey={ this.state.mainPivotKey }
      // appLinks={ this.state.appLinks }
      // news={ this.state.news }
      wpID={ '' }
      refreshID= { this.state.refreshId }
      // wpID={ this.props.bannerProps.refreshId }
    />;

    return (
      <section className={`${styles.complianceOps} ${hasTeamsContext ? styles.teams : ''}`}>
        { devHeader }
        { Banner }
        { mainPivot }
        { homePage }
        { sitePage }
        <h2>Fetch Status: { this.state.fullAnalyticsSaved === true ? 'Finished!' : 'working' } { this.state.fullAnalyticsSaved === true ? this._performance.ops.fetch.ms : '' }</h2>


{/* 
        <div className={styles.welcome}>
          <img  onClick={ this._doSomething.bind(this)} alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Fetch Status: { this.state.fullAnalyticsSaved === true ? 'Finished!' : 'working' } { this.state.fullAnalyticsSaved === true ? this._performance.ops.fetch.ms : '' }</h2>
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div> */}
      </section>
    );
  }

  private pivotMainClick( temp: any ): void {
    console.log('pivotMainClick:', temp.props.itemKey );
    //This will force state update first, to show spinner, then will update the info.   https://stackoverflow.com/a/38245851
    this.setState({ 
      mainPivotKey: temp.props.itemKey,
    });
  }

}
