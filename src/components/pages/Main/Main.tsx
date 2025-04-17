import React, { useRef, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { cameras } from "../../../constants/cameras";
import {
  ArrowAccordionIcon,
  PlusIcon,
  SearchIcon,
} from "../../../../assets/icons";
import Input from "../../atoms/Input";
import { palette } from "../../../constants/palette";
import CameraAccordion from "../../organisms/CameraAccordion";
import { useSharedValue, withTiming } from "react-native-reanimated";
import IconRotated from "../../atoms/IconRotated";
import AddCameraModal from "../../organisms/AddCameraModal";
import { ICamera, IDefect } from "./types";
import BottomFixIcon from "../../molecules/BottomFixIcon";

const Main = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [isAddCameraModalOpen, setIsAddCameraModalOpen] =
    useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<ICamera | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean | null>(
    null
  );
  const [isSortCameraModalOpen, setIsSortCameraModalOpen] =
    useState<boolean>(false);
  const [isFilterCameraModalOpen, setIsFilterCameraModalOpen] =
    useState<boolean>(false);
  const [selectedDefect, setSelectedDefect] = useState<IDefect | null>(null);

  const onlineCameras = cameras.filter((camera) => camera.online);
  const offlineCameras = cameras.filter((camera) => !camera.online);

  const sections = [
    { title: `Online (${onlineCameras.length})`, cameras: onlineCameras },
    { title: `Offline (${offlineCameras.length})`, cameras: offlineCameras },
  ];

  const rotations = useRef(sections.map(() => useSharedValue(0))).current;

  const handleSectionChange = (sections: number[]) => {
    const newActiveIndex = sections[0];

    rotations.forEach((rotation, index) => {
      rotation.value = withTiming(newActiveIndex === index ? 1 : 0);
    });

    setActiveSections(sections);
  };

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
            cursorColor={palette.subTextMainScreenPopup}
          />
        )}
      </View>
      <IconRotated
        icon={<ArrowAccordionIcon />}
        rotation={rotations[index]}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (section: (typeof sections)[number]) => (
    <CameraAccordion
      sections={section.cameras}
      selectedCamera={selectedCamera}
      setSelectedCamera={setSelectedCamera}
      isHistoryModalOpen={isHistoryModalOpen}
      setIsHistoryModalOpen={setIsHistoryModalOpen}
      isSortCameraModalOpen={isSortCameraModalOpen}
      setIsSortCameraModalOpen={setIsSortCameraModalOpen}
      isFilterCameraModalOpen={isFilterCameraModalOpen}
      setIsFilterCameraModalOpen={setIsFilterCameraModalOpen}
      selectedDefect={selectedDefect}
      setSelectedDefect={setSelectedDefect}
    />
  );

  return (
    <PageTemplate
      hasMenu
      bottomIcon={
        <BottomFixIcon
          icon={<PlusIcon />}
          text="Добавить камеру"
          onPress={() => setIsAddCameraModalOpen(true)}
        />
      }
      isBlurOn={
        isAddCameraModalOpen ||
        !!selectedCamera ||
        isSortCameraModalOpen ||
        isFilterCameraModalOpen ||
        !!selectedDefect
      }
    >
      <View style={styles.wrapper}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={handleSectionChange}
          touchableComponent={Pressable}
        />
      </View>
      <AddCameraModal
        isOpen={isAddCameraModalOpen}
        setIsOpen={setIsAddCameraModalOpen}
      />
    </PageTemplate>
  );
};

export default Main;
