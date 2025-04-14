import React, { useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { cameras } from "../../../constants/cameras";
import { ArrowTopFAQIcon, SearchIcon } from "../../../../assets/icons";
import Input from "../../atoms/Input";
import { palette } from "../../../constants/palette";

const Main = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sectionsOnline, setSectionsOnline] = useState<number[]>([]);
  const [sectionsOffline, setSectionsOffline] = useState<number[]>([]);

  const onlineCameras = cameras.filter((camera) => camera.online);
  const offlineCameras = cameras.filter((camera) => !camera.online);

  const sections = [
    { title: `Online (${onlineCameras.length})`, cameras: onlineCameras },
    { title: `Offline (${offlineCameras.length})`, cameras: offlineCameras },
  ];

  const renderHeader = (section: (typeof sections)[number], index: number) => (
    <View style={styles.header}>
      <View style={styles.headerSearch}>
        <Text style={styles.title}>{section.title}</Text>
        {section.cameras.length > 0 && (
          <Input
            placeholder="Поиск..."
            placeholderTextColor={palette.mainText}
            customStyles={styles.input}
            customInputStyles={styles.customInputStyles}
            rightIcon={<SearchIcon />}
          />
        )}
      </View>
      <ArrowTopFAQIcon
        style={activeSections[0] !== index && { transform: [{ scaleY: -1 }] }}
      />
    </View>
  );

  const renderContent = (section: (typeof sections)[number]) => (
    <View>
      <Text>{section.title}</Text>
    </View>
  );

  return (
    <PageTemplate hasMenu>
      <View style={styles.wrapper}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
          touchableComponent={Pressable}
        />
      </View>
    </PageTemplate>
  );
};

export default Main;
