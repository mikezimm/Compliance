import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { useState, useEffect } from 'react';
import { ITabMain } from '../../IComplianceOpsProps';
// import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import styles from './header.module.scss';

// import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
// import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
// import { AllTeachBubbles } from '../Teaching/bubbles';

export interface IMapPageProps {
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
}

const MapPageHook: React.FC<IMapPageProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, } = props; //appLinks, news 

  // const [ teachBubble, setTeachBubble ] = useState<number>( null );
  // const [ lastBubble, setLastBubble ] = useState<number>( 0 );

  // useEffect(() => {
  //   setExpandedState( easyPagesExpanded )
  // }, [ debugMode ] );

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

  // const TeachMe = teachBubble === null ? null : makeBubbleElementFromBubbles( lastBubble, getTeachBubbles( AllTeachBubbles ,'', 'Maps' ), updateTour, closeTour );

  const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
    <ul>
      <li>All facilities are expected to complete a records map {`:)`}</li>
      <li>To access the records map template, 
        <a href='/sites/SP_GlobalPpqRecords/Commonly%20Used%20Forms/Information_Mapping_Template.xlsm.xlsm' >Open this file</a> and rename according to your facility code.  See first sheet in file for information.</li>

      {/* <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'red', fontWeight: 600 }}>Terri to provide further description here</li> */}
    </ul>
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '90px' } }
  />;

  const MapPageElement: JSX.Element = mainPivotKey !== 'Maps' ? null : <div className = { styles.page } style={ null }>
    { InfoElement }
    {/* <div id={ 'ComplSiteStartTour' } ><Icon iconName={ 'MapPin' }/></div> */}
    {/* { TeachMe } */}
  </div>;

  return ( MapPageElement );

}

export default MapPageHook;