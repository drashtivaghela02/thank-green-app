// WebViewScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ route }) {
  const { htmlContent } = route.params;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      style={{ flex: 1 }}
    />
  );
}
