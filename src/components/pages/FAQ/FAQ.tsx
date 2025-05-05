import { supportLink } from "@/src/constants/support";
import React, { useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { ArrowAccordionIcon, MessageIcon } from "../../../../assets/icons";
import { questions } from "../../../constants/questions";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import IconRotated from "../../atoms/IconRotated";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";
import { IQuestionSection } from "./types";

const FAQ = () => {
  const { navigate } = useMainNavigation();
  const styles = getStyles();
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const renderHeader = (question: IQuestionSection, index: number) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{question.title}</Text>
      <IconRotated
        icon={<ArrowAccordionIcon />}
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
          onPress={() => Linking.openURL(supportLink)}
          marginRight={12}
          marginBottom={28}
        />
      }
    >
      <View style={styles.managerWrapper}>
        {questions.length > 0 ? (
          <Accordion
            containerStyle={styles.accordion}
            sections={questions}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={handleSectionChange}
            touchableComponent={Pressable}
          />
        ) : (
          <Text style={styles.noQuestions}>Здесь пусто</Text>
        )}
      </View>
    </PageTemplate>
  );
};

export default FAQ;
