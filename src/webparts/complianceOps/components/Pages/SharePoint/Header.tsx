import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabContactPivots, } from '../../IComplianceOpsProps';

import styles from './header.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';

const goToMeetingId : string = 'f3603cca-3b48-4625-afd2-2eb0587bf1d6';
export interface ISharePointPageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  contactPivotKey: ITabContactPivots;
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

const SharePointPageHook: React.FC<ISharePointPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, contactPivotKey, wpID, } = props; //appLinks, news 

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

  const RotatingGlobeCSS: string = `https://stackoverflow.com/questions/27781634/rotating-globe-in-css`;

  const linkNa: string = `https://teams.microsoft.com/l/channel/19%3a8a8e728d1e3f445a95e928ccf934c7ca%40thread.skype/North%2520America?groupId=c428246e-f757-47bb-a04e-e9ec3f461df8&tenantId=${goToMeetingId}`;
  const linkEu: string = `https://teams.microsoft.com/l/channel/19%3adcb0a78bc660473eb0d7c0ea6dd216b9%40thread.skype/Europe?groupId=c428246e-f757-47bb-a04e-e9ec3f461df8&tenantId=${goToMeetingId}`;
  // const linkAP: string = `https://teams.microsoft.com/l/channel/19%3a8a8e728d1e3f445a95e928ccf934c7ca%40thread.skype/North%2520America?groupId=c428246e-f757-47bb-a04e-e9ec3f461df8&tenantId=${goToMeetingId}`;
  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'SharePoint' ), updateTour, closeTour );

  const SharePointPageElement: JSX.Element = contactPivotKey !== 'SharePoint' ? null : <div className = { styles.page } style={ null }>
    <div style={{ marginRight: '50px' }}>If you need assistance with this web part or setting labels on your site, you have come to the right place!</div>

    <li onClick={ () => window.open( RotatingGlobeCSS, '_blank') } style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer', padding: '5px 0px' }}>Rotating Globe CSS for Buttons?: { RotatingGlobeCSS} </li>

    <div className={ styles.shareLab }>
      <div className={ styles.lab } onClick={ () => window.open( linkNa, '_blank')}>
        <div className={ styles.title }>Join ShareLab here - EU</div>
        <div className={ styles.desc }>Every other week</div>
      </div>
      <div className={ styles.lab } onClick={ () => window.open( linkEu, '_blank')}>
        <div className={ styles.title }>Join ShareLab here - NA</div>
        <div className={ styles.desc }>Every week</div>
      </div>
      <div className={ styles.lab }>
        <div className={ styles.title }>Join ShareLab here - Asia</div>
        <div className={ styles.desc }> ??? </div>
      </div>
    </div>

    {/* <div id={ 'ComplSharePointStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    { TeachMe }
  </div>;

  return ( SharePointPageElement );

}

export default SharePointPageHook;