import * as React from 'react';
import stylesS from './Search/SourceSearch.module.scss';
import styles from './SourcePages.module.scss';

import { ISourcePagesProps, ISourcePagesState, } from './ISourcePagesProps';

// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import { Icon, } from 'office-ui-fabric-react/lib/Icon'; 

import { check4Gulp, IAnySourceItem, makeid } from '../../../fpsReferences';
import { getFilteredItems } from './Search/functions';
// import { ContentPanel, } from './SourcePanelContent';
import SourceSearchHook from './Search/SourceSearch';

const defaultMaxVisible: number = 20;

export default class SourcePages extends React.Component<ISourcePagesProps, ISourcePagesState> {

  private _itemsPerPage = defaultMaxVisible;


/***
 *          .o88b.  .d88b.  d8b   db .d8888. d888888b d8888b. db    db  .o88b. d888888b  .d88b.  d8888b. 
 *         d8P  Y8 .8P  Y8. 888o  88 88'  YP `~~88~~' 88  `8D 88    88 d8P  Y8 `~~88~~' .8P  Y8. 88  `8D 
 *         8P      88    88 88V8o 88 `8bo.      88    88oobY' 88    88 8P         88    88    88 88oobY' 
 *         8b      88    88 88 V8o88   `Y8b.    88    88`8b   88    88 8b         88    88    88 88`8b   
 *         Y8b  d8 `8b  d8' 88  V888 db   8D    88    88 `88. 88b  d88 Y8b  d8    88    `8b  d8' 88 `88. 
 *          `Y88P'  `Y88P'  VP   V8P `8888Y'    YP    88   YD ~Y8888P'  `Y88P'    YP     `Y88P'  88   YD 
 *                                                                                                       
 *                                                                                                       
 */


 //Standards are really site pages, supporting docs are files


public constructor(props:ISourcePagesProps){
  super(props);

  const { stateSource, } = this.props; 
  const refreshId = stateSource ? stateSource.refreshId : 'mzWasHere'; 

  const searchText = this.props.deepProps && this.props.deepProps.length >=1 && this.props.deepProps[0] ? decodeURIComponent( this.props.deepProps[0] ) : '';
  const topSearchStr = this.props.deepProps && this.props.deepProps.length >=2 && this.props.deepProps[1] ? decodeURIComponent( this.props.deepProps[1] ) : '[]';
  const topSearch = !topSearchStr ? [] : JSON.parse( topSearchStr );

  const filtered: IAnySourceItem[] = stateSource ? getFilteredItems( stateSource.items , searchText, [], [], [], topSearch  ) : [];
  this._itemsPerPage = this.props.itemsPerPage ? this.props.itemsPerPage : this._itemsPerPage ;

  this.state = {
    refreshId: refreshId ? refreshId : 'mzWasHere',
    filtered: filtered,
    topSearch: topSearch,
    sortNum: 'asc',
    sortName: '-',
    sortGroup: '-',
    searchTime: null,
    searchText: searchText,

    showItemPanel: false,
    showCanvasContent1: false, // this.props.canvasOptions.pagePreference === 'canvasContent1' ? true : false,
    showPanelJSON: false,
    showThisItem: filtered.length > 0 ? filtered[ 0 ] : null,

    firstVisible: 0,
    lastVisible: this._itemsPerPage - 1,
    resetArrows: refreshId ? refreshId : 'mzWasHere',

    detailToggle: false, // this.props.search.showDetails,

  };
}

public async componentDidMount(): Promise<void> {
  await this.updateWebInfo(  );
}


public componentDidUpdate(prevProps: ISourcePagesProps): void {
    //Just rebuild the component
    const { stateSource, topButtons } = this.props; 
    const itemsLength = stateSource ? stateSource.items.length : 0;
    let resetArrows = false;
    if ( prevProps.resetArrows !== this.props.resetArrows ) {
      // updateViewFields = true;
      resetArrows = true;

    }

    let lastVisible = this._itemsPerPage;

    if ( check4Gulp() === true ) console.log( 'filtered SourePage', lastVisible, stateSource.items, );

    if ( itemsLength < lastVisible ) lastVisible = itemsLength;

    if ( !stateSource || topButtons.join('-') !== prevProps.topButtons.join('-')) {
      this.setState({ 
        // refreshId: this.props.stateSource.refreshId, 
        filtered: stateSource ? stateSource.items : [],
        topSearch: [],
        searchText: '',
        firstVisible: 0,
        lastVisible: lastVisible - 1,
        refreshId: makeid(4),
        resetArrows: makeid(4),
      });

    } else if ( this.props.primarySource !== prevProps.primarySource ) {
      this.setState({ 
        // refreshId: this.props.stateSource.refreshId, 
        filtered: stateSource ? stateSource.items : [],
        topSearch: [],
        searchText: '',
        firstVisible: 0,
        lastVisible: lastVisible - 1,
        refreshId: makeid(4),
        resetArrows: makeid(4),
      });

    } else if ( this.props.stateSource.items.length !== prevProps.stateSource.items.length ) {
      this.setState({ 
        // refreshId: this.props.stateSource.refreshId, 
        filtered: stateSource.items,
        firstVisible: 0,
        lastVisible: lastVisible - 1,
        refreshId: makeid(4),
        resetArrows: makeid(4),
      });

    } else if ( this.props.stateSource.refreshId !== prevProps.stateSource.refreshId || this.props.pageWidth !== prevProps.pageWidth || this.props.topButtons.length !== prevProps.topButtons.length ) {
      this.setState({ 
        filtered: this.props.stateSource.items,
        firstVisible: 0,
        lastVisible: lastVisible - 1,
        refreshId: this.props.stateSource.refreshId,
        resetArrows: makeid(4),

      });

    } else if ( resetArrows === true ) {
      this.setState({
        firstVisible: 0,
        lastVisible: lastVisible - 1,
        resetArrows: makeid(4),
      });
    }
}


public async updateWebInfo (   ): Promise<void> {  // eslint-disable-line  @typescript-eslint/no-empty-function

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

  public render(): React.ReactElement<ISourcePagesProps> {

    const { primarySource , topButtons, debugMode, showItemType,  } = this.props; // canvasOptions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { showThisItem , showItemPanel, searchText } = this.state;
    // const topButtons = this.props.topButtons;

    const topSearch: JSX.Element[] = [];  //All major future to be grid components

    topButtons.map( searchObjectFull => {
      const searchObjectArray = searchObjectFull.split('==');
      const searchObject = searchObjectArray[0];
      const classNames = [ styles.button ];
      if ( this.state.topSearch.indexOf( searchObjectFull ) > -1 ) { classNames.push( styles.isSelected ) ; }
      /**
       * This topSearch using arrow function did not work
       */
      // topSearch.push( <div className={ classNames.join(' ') } style={ null }  onClick={ () =>this._clickTop.bind( searchObject )}>{ searchObject }</div> );
      topSearch.push( <div className={ classNames.join(' ') } style={ null }  
        onClick={ this._clickTop.bind( this, searchObjectFull )} 
        title={ searchObjectArray.length > 0 ? searchObjectFull : '' }>{ searchObject }</div> ); //Only show Title prop if the button has special search 
    });

    const topSearchContent = <div className={ styles.topSearch } style={ { background : debugMode === true ? 'pink' : null }} >{ topSearch }</div>;

    const renderAsTable = this.props.tableHeaderElements && this.props.tableHeaderElements.length > 0 ? true : false;
    let tableElement = undefined;

    const filtered: JSX.Element[] = [];
    let tableHeaderRow: JSX.Element = undefined;
    if ( renderAsTable === true ) {
      tableHeaderRow = <tr className={ this.props.tableHeaderClassName }>{
        this.props.tableHeaderElements.map( ( item, index ) => { return <th key={ index }>{item}</th>} )
      }</tr>
    }

    this.state.filtered.map( ( item: IAnySourceItem, idx: number ) => {
      if ( idx >= this.state.firstVisible && idx <= this.state.lastVisible ) {
        filtered.push( this.props.renderRow({
          item : item,
          searchText: searchText,
          onClick:  this.clickListItem.bind( this ),
          details: this.state.detailToggle,
          showItemType: showItemType,
          onParentCall: this.props.onParentCall,
        }));
      }
    });

    if ( !this.props.stateSource || this.props.stateSource.items.length === 0 ) {
      // This is duplicated in SearchPage.tsx and SourcePages.tsx as well
      // const FetchingSpinner = this.props.showSpinner === false ? null : <div style={{display: 'inline'}}><Spinner size={SpinnerSize.large} label={"Fetching more information ..."} style={{ padding: 30 }} /></div>;
      // const spinnerStyles : ISpinnerStyles = { label: {fontSize: '20px', fontWeight: '600',  }};
      // const FetchingSpinner =  this.props.showSpinner === false ? null : <div style={{display: 'inline', top: -10, position: 'relative'}}>
      //   <Spinner size={SpinnerSize.medium} label={"Fetching more information ..."} labelPosition= 'right' 
      //   style={{ paddingBottom: 10, backgroundColor: 'lightyellow' }} styles={ spinnerStyles }/></div>;

      filtered.push( undefined );

    } else if ( this.props.stateSource.items.length > 0 && filtered.length === 0 ) {
      filtered.push(    <div>
        <h2>Hmmm... I could not find any items with</h2>
        <h3>Search text: </h3>
        <div style={{ fontWeight: 'bold', color: 'darkred' }}>{ searchText ? searchText : 'Does not look like you typed anything in the search box...' }</div>

        <h3>With any of these words (top buttons)</h3>
        {this.state.topSearch.length === 0 ? 
          <div>
            No top buttons were selected.
          </div>
          :
          <div style={{ fontWeight: 'bold', color: 'blue' }}>{ this.state.topSearch.map( (str: string, idx: number ) => {
            return <li key={idx} >{ str }</li>
          })}</div>
        }
      </div>
      )
    }

    if ( renderAsTable === true ) {
      tableElement = <table className={ this.props.tableClassName }>
        { tableHeaderRow }
        { filtered }
      </table>
    }

    const searchBox =  <SourceSearchHook 
      _onSearchChange={ this._onSearchChange.bind( this ) }
      searchTime={ this.state.searchTime }
      searchText={ searchText }
      itemsPerPage={ this._itemsPerPage }
      itemCount={ this.state.filtered.length }
      _updateFirstLastVisible={ this._updateFirstLastVisible.bind(this) }
      debugMode={ this.props.debugMode }
      resetArrows={ this.state.resetArrows }
    />

    const gotoListLink = !primarySource.webRelativeLink ? null : <div className={ [ stylesS.searchStatus, styles.goToLink ].join(' ')} onClick={ () => { window.open( `${primarySource.webUrl}${primarySource.webRelativeLink}`,'_blank' ) ; } }>
      Go to full list <Icon iconName='OpenInNewTab'/>
    </div>;

    const debugContent = debugMode !== true ? null : <div style={{ cursor: 'default', marginLeft: '20px' }}>
      App in debugMode - Change in Web Part Properties - Page Preferences.  <b><em>Currently in {primarySource.listTitle}</em></b>
    </div>;

    const searchSourceDesc = !primarySource.searchSourceDesc ? null : <div className={ styles.searchSourceDesc }>
      <div className={ styles.sourceDesc }>{ primarySource.searchSourceDesc }</div>
      { gotoListLink }
    </div>;

    // const deepHistory = debugMode !== true ? null :  
    //   <ReactJson src={ this.state.filtered } name={ primarySource.listTitle } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false } enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>;

    // // Moved entire panel to separate functional component so it can be reused from Search as well

    // const thePanel = showItemPanel !== true ? null : 
    //   ContentPanel( {
    //     showItemPanel: showItemPanel,
    //     showThisItem: showThisItem,
    //     primarySource: primarySource,
    //     onClosePanel: this._onClosePanel.bind(this),
    //     debugMode: debugMode,
    //     topButtons: topButtons,
    //     refreshId: refreshId,
    //     search: search,
    //     source: source,
    //     canvasOptions: canvasOptions,
    //   } );


    return (
          <div className={ styles.storagePage }>
              { debugContent }
              { this.props.headingElement }
              { searchSourceDesc }
              { searchBox }
              { topSearchContent }
              { renderAsTable === true ? tableElement : undefined }
              { renderAsTable === false ? filtered : undefined }
              { this.props.footerElement }
              {/* { FetchingSpinner } */}
              {/* { deepHistory }
              { thePanel } */}
          </div>


    );
  }
  
  private _clickTop( item: string, event: React.MouseEvent<HTMLDivElement, MouseEvent> ): void {

    const selected: string[] = this.toggleSearchInArray( this.state.topSearch, item , event.ctrlKey === true ? 'multi' : 'single' );
    console.log('_clickTop:', item, selected );

    const startingItems: IAnySourceItem[] = this.props.stateSource.items;
    const filtered: IAnySourceItem[] = getFilteredItems( startingItems, this.state.searchText, [], [], [], selected );

    let lastVisible = this._itemsPerPage;

    if ( check4Gulp() === true ) console.log( 'filtered SourePage', lastVisible, filtered, );

    if ( filtered.length < lastVisible ) lastVisible = filtered.length;

    this.setState({ 
      topSearch: selected , 
      filtered: filtered,
      firstVisible: 0,
      lastVisible: lastVisible - 1,
      resetArrows: makeid(4),
     });

    //https://stackoverflow.com/a/40493291
    // this.updateParentDeeplinks( this.state.searchText, selected, filtered.length );

  }

  
  private _detailsToggle(): void {
    const newState = this.state.detailToggle === true ? false : true;
    this.setState({ detailToggle: newState });
  }

  private toggleSearchInArray( searchArray: string[], value: string, doThis: 'multi' | 'single' ): string[] {

    let selected: string[] = JSON.parse(JSON.stringify( searchArray ));
    const idx = selected.indexOf( value );
    if ( doThis === 'multi' ) {
      if ( idx < 0 ) { selected.push( value ) ; } else { delete selected[ idx ] ; }
    } else if ( doThis === 'single' ) {
      if ( selected.length > 1 ) {
        selected = [ value ] ;  }
      else if ( idx < 0 ) { selected = [ value ] ; }
      else if ( idx > -1 ) { selected = [ ] ; }
      else { alert( 'toggleSearchInArrayError'); console.log('toggleSearchInArray Not triggered:', value, doThis, searchArray, ) ; }
    }

    return selected;

  }


  private getFilteredItems( startingItems: IAnySourceItem[], text: string, top: string[]  ): IAnySourceItem[] {

    const filteredItems : IAnySourceItem[] = [];

    startingItems.map( item => {

      let passMe = true;

      //Hiding this if I only go with simple text search
      // if ( top.length > 0 && passMe === true ) { 
      //   let passThis: boolean = false;
      //   item.topSearch.map( test => {
      //     if ( top.indexOf( test ) > -1 ) { passThis = true ; }
      //   });
      //   if ( passThis === false ) { passMe = false; }
      // }

      //Separate logic from SearchPage.tsx search... this looks at the searchTextLC for simpler execution
      if ( top.length > 0 && passMe === true ) { 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let passThis: any = false;
        top.map( topTest => {
          if ( item.searchTextLC.indexOf( topTest.toLowerCase() ) > -1 ) { passThis = true ; }
        });
        if ( passThis === false ) { passMe = false; }
      }

      if ( passMe === true && text && text.length > 0 ) { 
        if ( item.searchTextLC.indexOf( text.toLowerCase() ) < 0 ) { passMe = false; }

      }

      if ( passMe === true ) { filteredItems.push ( item ) ; }
    });

    console.log(' filteredItems: ', filteredItems );
    return filteredItems;
  }

  /**
   * Source:  https://github.com/pnp/sp-dev-fx-webparts/issues/1944
   * 
   * @param NewValue 
   *   
  private sentWebUrl: string = '';
  private lastWebUrl : string = '';
  private typeGetTime: number[] = [];
  private typeDelay: number[] = [];
   */
  // private delayOnSearch(NewSearch: string): void {
  //   //Track the url change and also record timings for testing.
  //   this._lastSearch = NewSearch;

  //   setTimeout(() => {
  //     if (this._lastSearch === NewSearch ) {
  //       this._onSearchChange( NewSearch );
  //     } else {

  //     }
  //   }, 1000);
  // }

  /**
   * https://www.kindacode.com/article/react-typescript-handling-onclick-event/
   * React.MouseEvent<HTMLImageElement>
   * @param NewSearch 
   * 
   * 
   * Found sample here:
   * https://github.com/pnp/sp-dev-fx-webparts/blob/b139ba199cb57363a88f070dd9814e5af4fc3cbd/samples/react-my-sites/src/webparts/mySites/components/MySites/MySites.tsx#L168
   * (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string)
   */

  private _onSearchChange ( event?: React.ChangeEvent<HTMLInputElement>, NewSearch?: string  ): void {

    const startTime = new Date();
    const SearchValue = NewSearch;

    //https://stackoverflow.com/a/40493291

    const filtered: IAnySourceItem[] = getFilteredItems( this.props.stateSource.items, NewSearch, [], [], [], this.state.topSearch );

    // setTimeout(() => {
      // this.updateParentDeeplinks( SearchValue, this.state.topSearch, filtered.length );
    // }, 1000);


    const endTime = new Date();
    const totalTime = endTime.getTime() - startTime.getTime();

    let lastVisible = this.props.itemsPerPage ? this.props.itemsPerPage : defaultMaxVisible;
    if (filtered.length < lastVisible ) lastVisible = filtered.length;

    this.setState({ filtered: filtered, 
      searchText: !SearchValue ? '' : SearchValue, 
      searchTime: totalTime,
      firstVisible: 0,
      lastVisible: lastVisible - 1,
      refreshId: makeid(4),
      resetArrows: makeid(4),
    });
  }

  // private updateParentDeeplinks( searchText: string, topLinks: string[], count: number ): void {
  //   if ( count > 0 ) {
  //     if ( this.props.bumpDeepLinks ) {
  //       const deepLink2 = encodeURIComponent(JSON.stringify( topLinks ));
  //       this.props.bumpDeepLinks( 'Sources', this.props.primarySource.searchSource, [searchText, deepLink2 ], count );
  //     }
  //   }

  // }

  // private jumpToDeepLink( item: IDeepLink ): void {
  //   if ( this.props.jumpToDeepLink ) {

  //     //jumpToDeepLink( mainPivotKey: IMainPage, sourcePivotKey: ISourcePage, categorizedPivotKey: ICategoryPage, deepProps: string[] = [] )
  //     this.props.jumpToDeepLink( item.main, item.second, '', [item.deep1, item.deep2 ] );
  //   }
  // }

  // private _onClosePanel( ): void {
  //   this.setState({ showItemPanel: false });
  // }

  // private async clickModernItem( ID: number, category: string, item: IPagesContent, e: any ): Promise<void> {  //this, item.ID, 'pages', item
  //   console.log('clickNewsItem:', ID, item );
  //   // debugger;

  //   await getDocWiki( item , this.props.primarySource, this.props.canvasOptions, true, this.updateModernState.bind( this ) );

  // }

  // private async clickFileItem( ID: number, category: string, item: IPagesContent, e: any ):  Promise<void> {  //this, item.ID, 'files', item
  //   console.log('clickNewsItem:', ID, item );
  //   // debugger;

  //   await getDocWiki( item , this.props.primarySource, this.props.canvasOptions, true, this.updateModernState.bind( this ) );

  // }

  private clickListItem( ID: number, category: string, item: IAnySourceItem, e: any ): void {  //this, item.ID, 'files', item
    console.log('clickNewsItem:', ID, item );
    // debugger;

    this.setState({ showItemPanel : true , showThisItem: item }) ;

  }

  //getDocWiki( item: IPagesContent, source: ISourcePropsFM,  canvasOptions: ICanvasContentOptions, callBack: any )
  // private updateModernState( item: IPagesContent, showCanvasContent1: boolean ): void {

  //   this.setState({ 
  //     showItemPanel: true, 
  //     showCanvasContent1: showCanvasContent1, 
  //     showThisItem: item as IAnySourceItem });

  // }

  private _updateFirstLastVisible( firstVisible: number, lastVisible: number ) : void{
    this.setState({
      firstVisible: firstVisible,
      lastVisible: lastVisible,
    });
  }

}
