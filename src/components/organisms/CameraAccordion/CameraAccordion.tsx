import React, { FC, Fragment, useRef, useState } from "react";
import { ICameraAccordion } from "./types";
import Accordion from "react-native-collapsible/Accordion";
import { Pressable, Text, View } from "react-native";
import { ICamera, IDefect } from "../../pages/Main/types";
import {
  ArrowAccordionIcon,
  CameraIcon,
  FilterIcon,
  SettingsIcon,
  SortIcon,
} from "../../../../assets/icons";
import { styles } from "./styles";
import { useSharedValue, withTiming } from "react-native-reanimated";
import IconRotated from "../../atoms/IconRotated";
import Defect from "../../molecules/Defect";
import { palette } from "../../../constants/palette";
import Button from "../../atoms/Button";
import CameraSettingsFolder from "../CameraSettingsFolder";
import DefectSaveModal from "../DefectSaveModal";

const CameraAccordion: FC<ICameraAccordion> = ({
  sections,
  isSettingsCameraModalOpen,
  setIsSettingsCameraModalOpen,
  selectedDefect,
  setSelectedDefect,
}) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const rotations = useRef(sections.map(() => useSharedValue(0))).current;

  const handleSectionChange = (sections: number[]) => {
    const newActiveIndex = sections[0];

    rotations.forEach((rotation, index) => {
      rotation.value = withTiming(newActiveIndex === index ? 1 : 0);
    });

    setActiveSections(sections);
  };

  const renderHeader = (camera: ICamera, index: number) => (
    <View style={styles.header} key={camera.id}>
      <View style={styles.headerMain}>
        <View style={styles.cameraNameWrapper}>
          <View style={styles.cameraName}>
            <CameraIcon />
            <Text style={styles.cameraTitle}>{camera.title}</Text>
          </View>
          <Text style={styles.defectText}>
            {camera.defectsCount}/100 дефектов
          </Text>
          <Text style={styles.defectText}>{camera.defectsCount}%</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.stateWrapper}>
          <View style={styles.state}>
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: camera.online
                    ? palette.greenOnline
                    : palette.red,
                },
              ]}
            />
            <Text style={styles.stateName}>
              {camera.online ? "Online" : "Offline"}
            </Text>
          </View>
          <Text style={styles.uptime}>Аптайм {camera.uptime}</Text>
        </View>
      </View>
      <IconRotated
        icon={<ArrowAccordionIcon />}
        rotation={rotations[index]}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (camera: ICamera) => (
    <Fragment>
      <View style={styles.contentWrapper}>
        <View style={styles.settingsWrapper}>
          <View style={styles.settingsIcons}>
            <Button
              style={styles.icon}
              onPress={() => {
                setIsSettingsCameraModalOpen(true);
              }}
            >
              <SettingsIcon width={19} height={19} stroke={2} />
              <Text style={styles.iconTitle}>Настроить</Text>
            </Button>
            <Button style={styles.icon}>
              <SortIcon />
              <Text style={styles.iconTitle}>Сортировать</Text>
            </Button>
            <Button style={styles.icon}>
              <FilterIcon />
              <Text style={styles.iconTitle}>Фильтровать</Text>
            </Button>
          </View>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.defects}>
          {camera.defects.map((defect: IDefect) => (
            <Defect
              key={defect.id}
              defect={defect}
              textBtn="Скрыть"
              setSelectedDefect={setSelectedDefect}
              pressableIcon
            />
          ))}
        </View>
      </View>
      <CameraSettingsFolder
        isOpen={isSettingsCameraModalOpen}
        setIsOpen={setIsSettingsCameraModalOpen}
        camera={sections[activeSections[0]]}
      />
      <DefectSaveModal
        defect={selectedDefect}
        onClose={() => setSelectedDefect(null)}
      />
    </Fragment>
  );

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={handleSectionChange}
      touchableComponent={Pressable}
    />
  );
};

export default CameraAccordion;
