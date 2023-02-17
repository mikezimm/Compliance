import * as React from 'react';

import { Icon, } from 'office-ui-fabric-react';

import { GuestsIconName, SiteAdminIconName, } from './StandardPersonIconNames';

export function getAdminIcon( iconSize: number, iconLeftPad: string, iconTextSize: number ): JSX.Element {
    const AdminIcon = <div style={{ fontSize: iconSize , color: 'darkgreen' , paddingLeft: iconLeftPad, paddingRight: 10, whiteSpace: 'nowrap' }} >
      <Icon iconName={ SiteAdminIconName } title={'Site Admin'} />
      <span style={{ fontSize: iconTextSize }}>Admin</span>
    </div>;
    return AdminIcon;
}

export function getGuestIcon( iconSize: number, iconLeftPad: string, iconTextSize: number ): JSX.Element {
  const GuestIcon = <div style={{ fontSize: iconSize , color: 'saddlebrown' , paddingLeft: iconLeftPad, paddingRight: 4, whiteSpace: 'nowrap' }} >
      <Icon iconName={ GuestsIconName } title={'Guest User'} />
      <span style={{ fontSize: iconTextSize }}>Guest</span>
    </div>;
    return GuestIcon;
}





