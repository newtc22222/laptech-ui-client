/** @format */

import React, { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const TawkMessenger = () => {
  const tawkMessengerRef = useRef();

  return <TawkMessengerReact propertyId="61854e406bb0760a49414ea8" widgetId="1fjobjbkg" onLoad={onLoad} />;
};

export default TawkMessenger;
