import React, { useState } from "react";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { questions } from "../../../constants/questions";
import { IQuestionSection } from "./types";
import { ArrowAccordionIcon, MessageIcon } from "../../../../assets/icons";
import IconRotated from "../../atoms/IconRotated";
import BottomFixIcon from "../../molecules/BottomFixIcon";

const FAQ = () => {
  const { navigate } = useMainNavigation();
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
          onPress={() => alert("Обратиться в поддержку пока невозможно.")}
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
