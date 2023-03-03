import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { IStateSource, ITabMain, } from '../../IComplianceOpsProps';

// import { Icon  } from 'office-ui-fabric-react/lib/Icon';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import styles from './header.module.scss';
import stylesRow from './Row.module.scss';

// import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
// import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
// import { AllTeachBubbles } from '../Teaching/bubbles';
// import { ITEM_Page_Search_PROD, RigAPIDocs, LABEL_Page_Search_PROD, RIG_Page_Search_QA } from '../../../storedSecrets/CorpAPIs';
// import { buttonProperties } from 'office-ui-fabric-react';
// import { ISuggestion } from '../../Suggestions/LabelSuggestions';
import { ISourcePropsCOP } from '../../DataInterface';
import SourcePages from '../SourcePages/SourcePages';
import { createRowLib, createRowLibX, createRowSite, createRowSiteX, createRowSub, createRowSubX } from './Row';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { check4Gulp, IAnySourceItem, ILoadPerformanceOps, IPerformanceOp, makeid, sortObjectArrayByNumberKey } from '../../../fpsReferences';
import ReactJson from 'react-json-view';
import { getArrayOfWordsFromString } from './getWordsFromString';
import { startPerformOpV2, updatePerformanceEndV2 } from '@mikezimm/fps-library-v2/lib/components/molecules/Performance/functions';
// import { TrimmedRecordItems } from '../../../storedSecrets/AS303 Items Full';

// const defaultButton: string = 'defaults';
export interface IAllListsPageProps {
  allLists: IStateSource;
  primarySource: ISourcePropsCOP;
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  refreshId: string; //RefreshID for the source... if the source has been updated, this should update
  // suggestions: IStateSuggestions;
  // user: IStateUser;
  // webTitle: string;
}

export interface IWordObject {
  word: string;
  searchTextLC: string;
  count: number;
  sum: number;
  sourceIndexes: number[];
  sourceStrings: string[];
  avg?: number;
  originalIndex?: number;
}

export type IWordObjectKey = 'word' | 'searchTextLC' | 'count' | 'sum' | 'avg' | 'index' ;
export type WordObjectKeys = ['word' , 'searchTextLC' , 'count' , 'sum' , 'avg' , 'index'] ;

export type IObjectSortKey =  'File Count' | 'Library Count' | 'Avg Files';
export const ObjectSortKeys : IObjectSortKey[] = [ 'File Count' , 'Library Count' , 'Avg Files' ];
export const SortKeyValues: string[] = [ 'sum', 'count', 'avg' ];


export interface IWordSummary {
  words: string[];
  searchTextLC: string[]; // Used for comparison when case does not matter
  wordObjs: IWordObject[];
  performance: IPerformanceOp;
  skipped: string[];
}

export function buildWordSummary( items: IAnySourceItem[], findWordsProp: string[], splitWords: boolean, sortKey: string, minLength: number, sumProp: string = '' ): IWordSummary {

  const performanceOp = startPerformOpV2( { label: 'buildWordCount', includeMsStr: true } );
  let skippedWords: number = 0;

  const wordSummary: IWordSummary = {
    words: [], wordObjs: [], searchTextLC: [], skipped: [], performance: performanceOp
  }

  items.map( ( item, itemIdx ) => {
    const itemSourceString: string[] = findWordsProp.map( prop => { return item[ prop ] ? item[ prop ] : '' } );
    const testString = itemSourceString.filter( item => { return item && item.length > 0 }  ).join( ` ` );
    if ( testString.indexOf( '(' ) > -1 ) {
      console.log( `buildWordSummary`, testString );
    }
    const itemWords: string[] = splitWords === true ? getArrayOfWordsFromString( testString, true, true, true, 'asis', ) : [ testString ];
    itemWords.map( word => {
      if ( word.length >= minLength ) {
        const searchTextLC = word.toLocaleLowerCase();
        let wordIdx = wordSummary.searchTextLC.indexOf( searchTextLC );

        // Add new words to summary
        if (wordIdx === -1 ) {
          wordSummary.words.push( word );
          wordSummary.searchTextLC.push( searchTextLC );
          const wordObj : IWordObject =  {
            word: word,
            searchTextLC: searchTextLC,
            count: 0,
            sum: 0,
            avg: 0,
            sourceIndexes: [],
            sourceStrings: [],
            originalIndex: wordSummary.words.length,
          };
          wordSummary.wordObjs.push( wordObj );
          wordIdx = wordSummary.words.length - 1;
        }
  
        // Now update count, sum and avg
        wordSummary.wordObjs[wordIdx].count ++;
        wordSummary.wordObjs[wordIdx].sourceIndexes.push( itemIdx );
        wordSummary.wordObjs[wordIdx].sourceStrings.push( itemSourceString.join('; ') );

        wordSummary.wordObjs[wordIdx].sum += sumProp && item[ sumProp ] ? item[ sumProp ] : 0;
        wordSummary.wordObjs[wordIdx].avg = wordSummary.wordObjs[wordIdx].sum / wordSummary.wordObjs[wordIdx].count;
      } else {
        skippedWords ++;
        if ( wordSummary.skipped.indexOf( word ) === -1 )  wordSummary.skipped.push( word );
      }

    });
  });


  wordSummary.wordObjs = sortObjectArrayByNumberKey( wordSummary.wordObjs, 'dec', sortKey );

  wordSummary.performance = updatePerformanceEndV2( { op: performanceOp, updateMiliseconds: true, count: items.length });

  console.log('Skipped words:', skippedWords, wordSummary.performance );


  return wordSummary;
}

export function updateWordSort( wordSummary: IWordSummary, sortKey: string ): IWordSummary {
  wordSummary.wordObjs = sortObjectArrayByNumberKey( wordSummary.wordObjs, 'dec', sortKey );
  return wordSummary;
}

export type IItemsSource = 'Site' | 'Web' | 'Library';
export type IItemsProp = 'URL' | 'Title' | 'Subsite' | 'SubTitle' | 'NoRecordsDeclared';
const SourceButtons: IItemsSource[] = [ 'Site', 'Web', 'Library' ];
export const SourceProperty: IItemsProp[] = [ 'URL', 'Title', 'Subsite', 'SubTitle', 'NoRecordsDeclared', 'NoRecordsDeclared' ];

const SplitButtons: string[] = [ 'No', 'Yes' ];

const headerFileCount = `Files`;
const headerLibraryCount = `Libraries`;
const headerKeywords = `Keywords`;
const headerAvg = `Avg Files/Lib`;
const headerCommon = [ headerFileCount, headerLibraryCount, headerAvg ]
const renderHeaders = [
  [ `Site Url`, ...headerCommon ],
  [ `Site ${ headerKeywords }`, ...headerCommon ],
  [ `Web Url`, ...headerCommon ],
  [ `Web ${ headerKeywords }`, ...headerCommon ],
  [ `Library`, ...headerCommon ],
  [ `Library ${ headerKeywords }`, ...headerCommon ],
];

const renders = [ createRowSite, createRowSiteX, createRowSub, createRowSubX, createRowLib, createRowLibX ];

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

const AllListsPageHook: React.FC<IAllListsPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, primarySource, allLists,  } = props; //appLinks, news , wpID

  // const [ buttonAllLists, setSuttonAllLists ] = useState<string[]>( primarySource.defSearchButtons );
  const [ sourceButton, setSourceButton ] = useState<number>( 0 );
  const [ splitWords, setSplitWords ] = useState<number>( 0 );
  const [ sortKey, setSortKey ] = useState<number>( 0 );
  const [ refreshId, setRefreshId ] = useState<string>( makeid(5) );

  // const [ refreshId, setRefreshId ] = useState<string>( makeid( 5 ) );
  // const [ teachBubble, setTeachBubble ] = useState<number>( null );
  // const [ lastBubble, setLastBubble ] = useState<number>( 0 );
  const [ wordSummary, setWordSummary ] = useState<IWordSummary>( buildWordSummary( allLists.items, [ SourceProperty[ sourceButton * 2 + splitWords ] ], false, SortKeyValues[ sortKey ], 2, `DocumentsHosted` ) );

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

  useEffect(() => {
    setWordSummary( buildWordSummary( allLists.items, [ SourceProperty[ sourceButton * 2 + splitWords ] ], splitWords === 1 ? true : false, SortKeyValues[ sortKey ], 2, `DocumentsHosted` ) )
  }, [ sourceButton, splitWords ] );

  useEffect(() => {
    setWordSummary( updateWordSort( wordSummary, SortKeyValues[ sortKey ] ) );
    setRefreshId( makeid(5) );
  }, [ sortKey ] );

  // const closeTour = ( ): void => {
  //   const saveBubble = teachBubble + 0;
  //   setLastBubble( saveBubble );
  //   setTeachBubble( null );
  // }

  // const updateTour = ( newBubble: number ): void => {
  //   const saveBubble = newBubble + 0;
  //   setLastBubble( saveBubble );
  //   setTeachBubble( saveBubble );
  // }

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


  // const updateButtons = ( suggestion: ISuggestion ) : void => {
  //   const useThese: string[] = suggestion === defaultButton as any ? primarySource.defSearchButtons : suggestion.suggestions;
  //   setSuttonAllLists( useThese );
  //   setActiveButton( suggestion === defaultButton as any ? defaultButton : suggestion.title );
  // }

  // // onClick( sug: ISuggestion, ): void
  // const suggestionRow = ( sugs: ISuggestion[], intro: string, onClick : any ): JSX.Element  => {
  //   const SuggestionButtons : JSX.Element = sugs.length === 0 ? undefined : <div>
  //     { intro } 
  //     <span className={ styles.suggestions }>
  //     <button key={ defaultButton } title={ '' }
  //       className={ activeButton === defaultButton ? styles.isSelected : '' }
  //       onClick={ () => onClick( defaultButton )}>{ defaultButton }</button>
  //     { sugs.map( suggestion => { return <button key={ suggestion.title } title={ suggestion.description } 
  //       className={ activeButton === suggestion.title ? styles.isSelected : '' } 
  //       onClick={ () => onClick( suggestion )}>{ suggestion.title }</button>})}
  //     </span>
  //   </div>;
  //   return SuggestionButtons;
  // }


  const IntroContent: JSX.Element = <div>
    <div style={{ paddingTop: '10px', fontWeight: 600}} >Summarize results by: 
    { SourceButtons.map( ( source, index ) => { 
      return <button key={ source } onClick={ () => setSourceButton( index )} 
        className={ index === sourceButton ? styles.isSelected : '' } >{ source }</button> 
      } ) }</div>
    <div style={{ paddingTop: '10px', fontWeight: 600}} >Summarize Keywords *:
      { SplitButtons.map( ( label, index ) => { 
      return <button key={ label } onClick={ () => setSplitWords( index )} 
        className={ index === splitWords ? styles.isSelected : '' } >{ label }</button> 
      } ) }
      <span style={{ paddingTop: '10px'}} ><b>*</b> This option will split things like the Library or Site Title into words.  This may highlight certain types of files into larger groups</span>
      </div>
    <div style={{ paddingTop: '10px', fontWeight: 600}} >Sort results:
      { ObjectSortKeys.map( ( label, index ) => { 
      return <button key={ label } onClick={ () => setSortKey( index )} 
        className={ index === sortKey ? styles.isSelected : '' } >{ label }</button> 
      } ) }</div>
    
  </div>

  const MainContent: JSX.Element = <div className={ styles.infoItems }style={{ cursor: 'default' }}>
      <div>This page summarizes number of files that do not have a retention label.</div>

      { IntroContent }
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '175px' } }
  />;

  const itemsElement = <SourcePages
    // source={ SourceInfo }
    primarySource={ primarySource }
    itemsPerPage={ 20 }
    pageWidth={ 1000 }
    topButtons={ [] }
    stateSource={ { ...props.allLists, ...{ items: wordSummary.wordObjs as any[] }, ...{ refreshId: refreshId } } }
    startQty={ 20 }
    showItemType={ false }
    debugMode={ debugMode }

    tableHeaderElements={ renderHeaders[ sourceButton * 2 + splitWords ] }
    tableClassName= { styles.itemTable }
    tableHeaderClassName= { [ stylesRow.genericItem ].join( ' ' )  }

    renderRow={ renders[ sourceButton * 2 + splitWords ] }
    // bumpDeepLinks= { this.bumpDeepStateFromComponent.bind(this) }
    deepProps={ null } //this.state.deepProps
    // canvasOptions={ this.props.canvasOptions }

    onParentCall={ () => { alert('Hey, parent was called!')} }
    // headingElement={ InfoElement }
    // footerElement={ <div style={{color: 'red', fontWeight: 600 }}>THIS IS the FOOTER ELEMENT</div> }
  />;



  // const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'AllLists' ), updateTour, closeTour );

  const AllListsPageElement: JSX.Element = mainPivotKey !== 'AllLists' ? null : <div className = { styles.page } style={ null }>
    { InfoElement }
    { itemsElement }
    {/* <div id={ 'ComplAllListsStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    {
      <ReactJson src={ wordSummary } name={ 'Word Summary' } collapsed={ false } displayDataTypes={ false } displayObjectSize={ false }
      enableClipboard={ true } style={{ padding: '20px 0px' }} theme= { 'rjv-default' } indentWidth={ 2}/>
    }

    {/* { TeachMe } */}
  </div>;

  return ( AllListsPageElement );

}

export default AllListsPageHook;