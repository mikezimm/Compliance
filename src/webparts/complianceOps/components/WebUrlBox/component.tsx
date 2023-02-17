


import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useEffect } from 'react';
import { ITabMain } from '../IComplianceOpsProps';
import { Icon  } from 'office-ui-fabric-react/lib/Icon';

import Accordion from '@mikezimm/fps-library-v2/lib/components/molecules/Accordion/Accordion';
import { getSiteInfo } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/getSiteInfo';
import { IFpsGetSiteReturn } from '@mikezimm/fps-library-v2/lib/pnpjs/Sites/IFpsGetSiteReturn';
import styles from './webInput.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// import { makeBubbleElementFromBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/component';
// import { getTeachBubbles } from '@mikezimm/fps-library-v2/lib/components/atoms/TeachBubble/getTeacher';
// import { AllTeachBubbles } from '../Teaching/bubbles';

export interface IWebUrlProps {
  showInput: boolean;
  textInput: string;
  updateInputCallback: any;
  debugMode?: boolean; //Option to display visual ques in app like special color coding and text
  mainPivotKey: ITabMain;
  wpID: string; //Unique Web Part instance Id generated in main web part onInit to target specific Element IDs in this instance
}

const WebUrlHook: React.FC<IWebUrlProps> = ( props ) => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { debugMode, mainPivotKey, wpID, showInput, textInput, updateInputCallback } = props; //appLinks, news 

  const [ currentUrl, setCurrentUrl ] = useState<string>( textInput );
  const [ webURLStatus, setWebURLStatus ] = useState<string>( 'Success' );
  const [ validUrl, setValidUrl ] = useState<string>( '' );

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

  const delayOnWebUrlChange = (input: any): void => {
    //Track the url change and also record timings for testing.
    const NewValue = typeof input === 'string' ? input : input && input.target && input.target.value ? input.target.value : '';

    // if ( this.lastWebUrl !== this.state.parentListWeb ) {
      // lastWebUrl = NewValue;
      // typeGetTime.push( ( new Date()).getTime() );
      // typeDelay.push( typeGetTime.length === 0 ? 0 : typeGetTime[ typeGetTime.length -1] - typeGetTime[ typeGetTime.length -2]  );

    setTimeout(async () => {

      if ( validUrl !== NewValue ) {
        const siteInfo: IFpsGetSiteReturn = await getSiteInfo( NewValue, false, true, );
        if ( siteInfo.status === 'Success' ) {
          setValidUrl( NewValue );
          updateInputCallback( NewValue );
          setWebURLStatus( '' );
        } else {
          setValidUrl( '' );
          setWebURLStatus( siteInfo.errorInfo.friendly );
        }
      }
    }, 1000);
    // }

  }


  const MainContent: JSX.Element = <div style={{ cursor: 'default' }}>
    <ul>
      <li>These are NOT google maps {`:)`}</li>
      <li style={{ padding: '10px 0px', fontSize: 'x-large', color: 'red', fontWeight: 600 }}>Terri to provide further description here</li>
    </ul>
  </div>

  const InfoElement: JSX.Element = <Accordion 
    title = { 'More information about this tab'}
    defaultIcon = 'Help'
    showAccordion = { true }
    content = { MainContent }
    contentStyles = { { height: '100px' } }
  />;

  const WebUrlElement: JSX.Element = showInput !== true ? null : 
  <div style={{ display: 'inline-table', paddingBottom: '20px', paddingTop: '20px', width: '100%', background: 'lightgray' }}>
    <span style={{ paddingLeft: '20px', paddingRight: '20px', fontSize: 'larger', fontWeight: 600 }}>WebURL</span>
    <TextField
      className={ styles.textField }
      styles={ { fieldGroup: [ { width: '75%', maxWidth: '700px' }, { borderColor: 'lightgray', }, ] } } //this.getReportingStyles
      defaultValue={ textInput }
      label={ null }
      autoComplete='off'
      // onChange={ this._onWebUrlChange.bind(this) }
      onChange={ delayOnWebUrlChange.bind(this) }
      onGetErrorMessage= { (value: string | Date) : string => { return "";} }
      validateOnFocusIn
      validateOnFocusOut
      multiline= { false }
      autoAdjustHeight= { true }
      // onKeyDown={(ev)=> { this.onWebUrlKeyDown( ev ) ; } }

    />{ webURLStatus ? 
      <span style={{ color: 'red', whiteSpace: 'nowrap', marginRight: '40px', fontSize: 'larger', fontWeight: 'bolder' }}>
         { webURLStatus }
      </span> : null }
    </div>;

  return ( WebUrlElement );

}

export default WebUrlHook;

