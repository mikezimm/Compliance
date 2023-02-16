import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../../IComplianceOpsProps';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import styles from './header.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';
import { FolderIcon, OrgIcon, ProcessingRunIcon, TagIcon } from './Row';

export interface ISitePageProps {
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

const SitePageHook: React.FC<ISitePageProps> = ( props ) => {

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
  // const bannerImage: string = `https://www.tenant.com/sites/default/files/2022-04/background%402x.jpg`.replace(`tenant`,'vilotua'.split("").reverse().join(''));
  // const backgroundImage: string = `url("${bannerImage}")`;

  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'Site' ), updateTour, closeTour );

  const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
    <ul>
      <li>The Site tab will show you all the libraries in your site <b>that do not have a retention label set</b>.</li>
      <li>This summary shown <b>is only updated once per week</b>.</li>
      <li>If you make changes and want to verify them, you can press the gear icon and let the web part analyize it live.</li>
      <div style={{ height: '12px' }}/>
      <li>The <Icon iconName={ OrgIcon }/> icon indicates this is a library on a SubSite.</li>
      <li>The number shows how many items are in that library.</li>
      <li>Press the <Icon iconName={ FolderIcon }/> icon to open that library in a new tab.</li>
      <li>Press the <Icon iconName={ TagIcon }/> icon to set a default label on that library. <b>{`( Requires Owner permissions )`}</b></li>
      <li>Press the <Icon iconName={ ProcessingRunIcon }/> icon to get a live analysis of the library.  <b>{`( In order to verify any updates )`}</b></li>
    </ul>
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '200px' } }
  />;

  const SitePageElement: JSX.Element = mainPivotKey !== 'Site' ? null : <div className = { styles.page } style={ null }>
    { InfoElement }
    {/* <div id={ 'ComplSiteStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    { TeachMe }
  </div>;

  return ( SitePageElement );

}

export default SitePageHook;