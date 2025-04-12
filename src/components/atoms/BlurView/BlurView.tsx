import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

const BlurView = () => (
  <View
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#00000000",
    }}
  >
    <WebView
      style={[
        {
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#00000000",
        },
      ]}
      source={{
        html: `
                <div style="position: absolute;
                top: 0;
                right:0;
                bottom: 0;
                left: 0;
                background: ${"rgba(217, 217, 217, 0)"};
                -webkit-backdrop-filter: blur(8px);
                backdrop-filter: blur(8px);"
                />
          `,
      }}
    />
  </View>
);

export default BlurView;
