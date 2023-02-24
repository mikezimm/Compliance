import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain, } from '../../IComplianceOpsProps';

// import { Icon  } from 'office-ui-fabric-react/lib/Icon';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import styles from './header.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';
import { OtherIframeHref, RigAPIDocs, RIG_Page_Search_PROD, RIG_Page_Search_QA } from '../../../storedSecrets/CorpAPIs';

export interface ILabelsPageProps {
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

const LabelsPageHook: React.FC<ILabelsPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, } = props; //appLinks, news 

  const [ teachBubble, setTeachBubble ] = useState<number>( null );
  const [ lastBubble, setLastBubble ] = useState<number>( 0 );

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

  const MainContent: JSX.Element = <div className={ styles.infoItems }style={{ cursor: 'default' }}>
    {/* <ul> */}
      <div>The first step to applying records retention to your files, is understanding what kinds of records you have.</div>
      <div>You can search the retention schedule here or 
        <span onClick={ () => window.open( RIG_Page_Search_PROD, '_blank') } 
        style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: '5px 0px' }}
        >
        click on this link to open in a full window</span>.</div>
      {/* <li onClick={ () => window.open( RIG_Page_Search, '_blank') } style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: '5px 0px' }}>IFrame Url1: { RIG_Page_Search} </li> */}
      <div onClick={ () => window.open( OtherIframeHref, '_blank') } style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: '5px 0px'  }}>IFrame Url2: { OtherIframeHref} </div>
      <div onClick={ () => window.open( RigAPIDocs, '_blank') } style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: '5px 0px'  }}>API Docs: { RigAPIDocs} </div>
      {/* <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'purple', fontWeight: 600 }}>MIKE to provide further description here</li> */}
    {/* </ul> */}
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '115px' } }
  />;

  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'Labels' ), updateTour, closeTour );

  const LabelsPageElement: JSX.Element = mainPivotKey !== 'Labels' ? null : <div className = { styles.page } style={ null }>
    { InfoElement }
    {/* <div id={ 'ComplLabelsStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    {/* <div style={{ width: 'calc(100% - 40px)', height: '75vh'}}>
      <iframe src={RIG_Page_Search_QA} width='100%' height='100%' name='labels_Iframe'/>
    </div> */}

    { TeachMe }
  </div>;

  return ( LabelsPageElement );

}

export default LabelsPageHook;