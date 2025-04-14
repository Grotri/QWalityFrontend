import React, { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import WebView from "react-native-webview";
import { IBlurView } from "./types";

const BlurView: FC<IBlurView> = ({ onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00000000",
        zIndex: 1000,
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
  </TouchableWithoutFeedback>
);

export default BlurView;
