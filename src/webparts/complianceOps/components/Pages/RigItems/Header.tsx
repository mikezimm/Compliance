import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { IStateSource, IStateSuggestions, IStateUser, ITabMain, } from '../../IComplianceOpsProps';

import { Icon  } from 'office-ui-fabric-react/lib/Icon';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import styles from './header.module.scss';
import stylesRow from './Row.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';
// import { ITEM_Page_Search_PROD, RigAPIDocs, LABEL_Page_Search_PROD, RIG_Page_Search_QA } from '../../../storedSecrets/CorpAPIs';
// import { buttonProperties } from 'office-ui-fabric-react';
import { ISuggestion } from '../../Suggestions/LabelSuggestions';
import { ISourcePropsCOP } from '../../DataInterface';
// import SourcePages from '../SourcePages/SourcePages';
import { createRigItemsRow0, createRigItemsRow1, createRigItemsRow2 } from './Row';
// import { check4Gulp, makeid } from '../../../fpsReferences';
import ReactJson from 'react-json-view';
import { simplifyPropsosedRIGItems } from '../../../storedSecrets/AS303 Items v3';

import SourcePages from '../SourcePages/SourcePages';
import { makeid } from '../../../fpsReferences';
import { ITEM_Page_Search_PROD } from '../../../storedSecrets/CorpAPIs';
// import { FutureMockRecordItems } from '../../../storedSecrets/AS303 Items Full';

const renderRows = [ createRigItemsRow0, createRigItemsRow1, createRigItemsRow2 ];
const renderHeaders = [
  [ 'Item', 'Item Name', 'Record Code', 'Data Classification', 'Data Privacy', 'Status', ],
  [ 'Item', 'Item Name', 'Item Description', 'Record Code', 'Data Classification', 'Data Privacy', 'Status', ],
  [ 'Item', 'Item Name', 'Item Description', 'Record Code',  'Record Title', 'Data Classification', 'Data Privacy', 'Status', ],
]
// const renderIcons = [ 'TripleColumn', 'QuadColumn', 'DoubleColumn',  ];
const renderTitles = [ 'Simple', '+ Description', '+ Record Title',  ];

const defaultButton: string = 'defaults';

export interface IRigItemsPageProps {
  stateSource: IStateSource;
  primarySource: ISourcePropsCOP;
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  suggestions: IStateSuggestions;
  user: IStateUser;
  webTitle: string;
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

const RigItemsPageHook: React.FC<IRigItemsPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, user, suggestions, primarySource, stateSource, webTitle } = props; //appLinks, news 

  // const [ buttonRigItems, setSuttonRigItems ] = useState<string[]>( primarySource.defSearchButtons );
  const [ buttonRigItems, setButtonRigItems ] = useState<string[]>( primarySource.defSearchButtons );
  const [ activeButton, setActiveButton ] = useState<string>( defaultButton );
  const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  const [ teachBubble, setTeachBubble ] = useState<number>( null );
  const [ lastBubble, setLastBubble ] = useState<number>( 0 );
  // const [ activeView, setActiveView ] = useState<string>( renderTitles[0] );
  const [ activeView, setActiveView ] = useState<string>( renderTitles[0] );

  /***
 *     .d88b.  d8b   db       .o88b. db      d888888b  .o88b. db   dD .d8888. 
 *    .8P  Y8. 888o  88      d8P  Y8 88        `88'   d8P  Y8 88 ,8P' 88'  YP 
 *    88    88 88V8o 88      8P      88         88    8P      88,8P   `8bo.   
 *    88    88 88 V8o88      8b      88         88    8b      88`8b     `Y8b. 
 *    `8b  d8' 88  V888      Y8b  d8 88booo.   .88.   Y8b  d8 88 `88. db   8D 
 *     `Y88P'  VP   V8P       `Y88P' Y88888P Y888888P  `Y88P' YP   YD `8888Y' 
 *                                                                            
 *                                                                            
 */

  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );

  // const toggleView = ( ): void => {
  //   const newView = activeView === renderRows.length -1 ? 0 : activeView + 1;
  //   setActiveView( newView );
  // }

  const closeTour = ( ): void => {
    const saveBubble = teachBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( null );
  }

  const updateTour = ( newBubble: number ): void => {
    const saveBubble = newBubble + 0;
    setLastBubble( saveBubble );
    setTeachBubble( saveBubble );
  }

  /***
 *    d88888b db      d88888b .88b  d88. d88888b d8b   db d888888b 
 *    88'     88      88'     88'YbdP`88 88'     888o  88 `~~88~~' 
 *    88ooooo 88      88ooooo 88  88  88 88ooooo 88V8o 88    88    
 *    88~~~~~ 88      88~~~~~ 88  88  88 88~~~~~ 88 V8o88    88    
 *    88.     88booo. 88.     88  88  88 88.     88  V888    88    
 *    Y88888P Y88888P Y88888P YP  YP  YP Y88888P VP   V8P    YP    
 *                                                                 
 *                                                                 
 */

  // const backgroundImage: string = `url("${bannerImage}")`;


  const updateButtons = ( suggestion: ISuggestion ) : void => {
    const useThese: string[] = suggestion === defaultButton as any ? primarySource.defSearchButtons : suggestion.suggestions;
    setButtonRigItems( useThese );
    setActiveButton( suggestion === defaultButton as any ? defaultButton : suggestion.title );
  }

  // onClick( sug: ISuggestion, ): void
  const suggestionRow = ( sugs: ISuggestion[], intro: string | JSX.Element, onClick : any ): JSX.Element  => {
    const SuggestionButtons : JSX.Element = sugs.length === 0 ? undefined : <div>
      { intro } 
      <span className={ styles.suggestions }>
      <button key={ defaultButton } title={ '' }
        className={ activeButton === defaultButton ? styles.isSelected : '' }
        onClick={ () => onClick( defaultButton )}>{ defaultButton }</button>
      { sugs.map( suggestion => { return <button key={ suggestion.title } title={ suggestion.description } 
        className={ activeButton === suggestion.title ? styles.isSelected : '' } 
        onClick={ () => onClick( suggestion )}>{ suggestion.title }</button>})}
      </span>
    </div>;
    return SuggestionButtons;
  }

  // https://github.com/mikezimm/Compliance/issues/81
  // https://github.com/mikezimm/Compliance/issues/89
  const jobTitle = user.item && user.item.jobTitle ? user.item.jobTitle : '';
  const givenName = user.item && user.item.givenName ? user.item.givenName : '';   

  const IntroContent: JSX.Element = <div style={{ paddingTop: '10px' }}>
    You can filter lots of different ways, we suggest clicking on these Topics to get started.
    { suggestionRow( suggestions.user, <span><b>Based your Job Title</b>{` of '${ jobTitle }':`}</span>, updateButtons ) }
    { suggestionRow( suggestions.web, <span><b>Based your Site Title</b>{` of '${ webTitle }':`}</span>, updateButtons ) }
    { suggestionRow( suggestions.libraries, <span><b>Based the Libraries on this site:</b></span>, updateButtons ) }

  </div>

  const rowOptions = renderTitles.map( row => { return <button key={ row } 
      className={ row === activeView ? styles.isSelected : '' }
      onClick={ () => setActiveView( row )}>{ row }</button>});

  const MainContent: JSX.Element = <div className={ styles.infoItems }style={{ cursor: 'default' }}>
    <b><mark>Need to verify this text is ok and update it</mark></b>
    <div>Hi { givenName }, Items on this tab are RIG Examples - names of content that may or may not be a record.  &nbsp;&nbsp;
      You can search for common names here and determine both Retention types as well as privacy and data classifications.  &nbsp;&nbsp;
      This is a living list that anyone in the company can help maintain.  &nbsp;&nbsp;
      To submit an update, please <span className={ styles.isLink } onClick={ () => window.open( ITEM_Page_Search_PROD, '_blank')} >click here</span></div>
    {/* <div></div> */}
    { IntroContent }
    <div style={{ fontSize: 'large' }}>Change Layout: <span className={ styles.suggestions }>{ rowOptions }</span>  </div>
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '240px' } }
  />;

  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ primarySource }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ buttonRigItems }
    stateSource={ { ...stateSource, ...{ refreshId: refreshId } } }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ debugMode }
    tableHeaderElements={ renderHeaders[ renderTitles.indexOf( activeView ) ] }
    tableClassName= { styles.itemTable }
    tableHeaderClassName= { [ stylesRow.genericItem ].join( ' ' )  }
    renderRow={ renderRows[ renderTitles.indexOf( activeView ) ] }
    // bumpDeepLinks= { this.bumpDeepStateFromComponent.bind(this) }
    deepProps={ null } //this.state.deepProps
    // canvasOptions={ this.props.canvasOptions }

    onParentCall={ () => { alert('Hey, parent was called!')} }
    headingElement={ InfoElement }
    // footerElement={ <div style={{color: 'red', fontWeight: 600 }}>THIS IS the FOOTER ELEMENT</div> }
  />;


  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'RigItems' ), updateTour, closeTour );

  const RigItemsPageElement: JSX.Element = mainPivotKey !== 'RigItems' ? null : <div className = { styles.page } style={ null }>
    { itemsElement }
    {/* <div id={ 'ComplRigItemsStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    {

    }
    <ReactJson src={ stateSource } name={ 'Response Details' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ true }
      enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>

    <ReactJson src={ simplifyPropsosedRIGItems() } name={ 'Response Details' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ true }
      enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    { TeachMe }
  </div>;

  return ( RigItemsPageElement );

}

export default RigItemsPageHook;