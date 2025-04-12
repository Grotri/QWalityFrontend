import React, { useState } from "react";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, ScrollView, Text, View } from "react-native";
import Header from "../../molecules/Header";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { questions } from "../../../constants/questions";
import { IQuestionSection } from "./types";
import { ArrowTopFAQIcon, MessageIcon } from "../../../../assets/icons";

const FAQ = () => {
  const { navigate } = useMainNavigation();
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (question: IQuestionSection) => {
    const active =
      activeSections.length > 0 &&
      questions[activeSections[0]].id === question.id;

    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{question.title}</Text>
        <ArrowTopFAQIcon style={!active && { transform: [{ scaleY: -1 }] }} />
      </View>
    );
  };

  const renderContent = (question: IQuestionSection) => {
    return (
      <View style={styles.content}>
        <Text style={styles.contentText}>{question.answer}</Text>
      </View>
    );
  };

  return (
    <PageTemplate mustScroll={false}>
      <View style={styles.wrapper}>
        <Header headerText="Помощь" />
        <ScrollView
          style={styles.managerWrapper}
          showsVerticalScrollIndicator={false}
        >
          <Accordion
            containerStyle={styles.accordion}
            sections={questions}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={setActiveSections}
            touchableComponent={Pressable}
          />
        </ScrollView>
      </View>
      <Pressable
        style={styles.support}
        onPress={() => alert("Обратиться в поддержку пока невозможно.")}
      >
        <View style={styles.circle}>
          <MessageIcon />
        </View>
        <Text style={styles.supportText}>Обратиться в поддержку</Text>
      </Pressable>
    </PageTemplate>
  );
};

export default FAQ;
