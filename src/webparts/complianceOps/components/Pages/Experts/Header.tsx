import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { IStateSource, ITabContactPivots, } from '../../IComplianceOpsProps';

import { PersonaCard } from "../../PersonaCard/PersonaCard";

// import { Icon  } from 'office-ui-fabric-react/lib/Icon';
import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';

import styles from './header.module.scss';

import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
import { AllTeachBubbles } from '../Teaching/bubbles';
import { IUserProperties } from '../../PersonaCard/IUserProperties';

export interface IExpertsPageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  contactPivotKey: ITabContactPivots;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
  users: IUserProperties[];
  context: any;
  webUrl: string;

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

const ExpertsPageHook: React.FC<IExpertsPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, contactPivotKey, wpID, context, webUrl, users } = props; //appLinks, news 

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

  const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
    <ul>
      <li>If you want to ask an expert about your site...</li>
      <li>Contact one of these experts.</li>
      <li>They can help you determine what types of records your files might be.</li>
      {/* <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'red', fontWeight: 600 }}>Terri to provide further description here</li> */}
    </ul>
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '115px' } }
  />;

  const Experts = users.map( ( user: any ) => { <PersonaCard
    context={ props.context}
    size = { 24 }
    iconSize = { 20 }
    iconTextSize = { 16 }
    profileProperties={{
      isGuest: user.isGuest,
      isSiteAdmin: user.IsSiteAdmin,
      DisplayName: user.Title,
      Title: user.JobTitle ? user.JobTitle : '',
      PictureUrl: props.webUrl + '/_layouts/15/userphoto.aspx?size=M&accountname=' + user.Email ,
      Email: user.Email,
      //Department: user.Department ? user.Department : '',
      Department: '',
      WorkPhone: '',
      Location: user.OfficeNumber
        ? user.OfficeNumber
        : user.BaseOfficeLocation
    }}
  />});

  const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'Experts' ), updateTour, closeTour );

  const ExpertsPageElement: JSX.Element = contactPivotKey !== 'Experts' ? null : <div className = { styles.page } style={ null }>
    { InfoElement}
    {/* <div id={ 'ComplExpertsStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    { Experts }
    { TeachMe }
  </div>;

  return ( ExpertsPageElement );

}

export default ExpertsPageHook;