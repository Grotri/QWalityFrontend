import React, { useRef, useState } from "react";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { questions } from "../../../constants/questions";
import { IQuestionSection } from "./types";
import { ArrowAccordionIcon, MessageIcon } from "../../../../assets/icons";
import { useSharedValue, withTiming } from "react-native-reanimated";
import IconRotated from "../../atoms/IconRotated";
import BottomFixIcon from "../../molecules/BottomFixIcon";

const FAQ = () => {
  const { navigate } = useMainNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const rotations = useRef(questions.map(() => useSharedValue(0))).current;

  const handleSectionChange = (sections: number[]) => {
    const newActiveIndex = sections[0];

    rotations.forEach((rotation, index) => {
      rotation.value = withTiming(newActiveIndex === index ? 1 : 0);
    });

    setActiveSections(sections);
  };

  const renderHeader = (question: IQuestionSection, index: number) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{question.title}</Text>
      <IconRotated
        icon={<ArrowAccordionIcon />}
        rotation={rotations[index]}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (question: IQuestionSection) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{question.answer}</Text>
      </View>
    );
  };

  return (
    <PageTemplate
      headerText="Помощь"
      onHeaderClick={() => navigate("Main", { direction: "backward" })}
      bottomIcon={
        <BottomFixIcon
          icon={<MessageIcon />}
          text="Обратиться в поддержку"
          onPress={() => alert("Обратиться в поддержку пока невозможно.")}
        />
      }
    >
      <View style={styles.managerWrapper}>
        <Accordion
          containerStyle={styles.accordion}
          sections={questions}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={handleSectionChange}
          touchableComponent={Pressable}
        />
      </View>
    </PageTemplate>
  );
};

export default FAQ;
