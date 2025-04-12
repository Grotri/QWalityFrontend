import React, { FC } from "react";
import { IModal } from "./types";
import { default as NativeModal } from "react-native-modal";
import { screenHeight, screenWidth } from "../../../constants/screenSize";
import { TouchableWithoutFeedback } from "react-native";

const Modal: FC<IModal> = ({ children, isVisible, setIsVisible, onPress }) => {
  const handlePress = () => {
    setIsVisible(false);
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <NativeModal
        isVisible={isVisible}
        hasBackdrop={true}
        backdropColor="transparent"
        deviceHeight={screenHeight}
        deviceWidth={screenWidth}
        hideModalContentWhileAnimating
        onBackdropPress={handlePress}
        onBackButtonPress={handlePress}
      >
        {children}
      </NativeModal>
    </TouchableWithoutFeedback>
  );
};

export default Modal;
