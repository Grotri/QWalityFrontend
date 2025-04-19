import React, { FC, Fragment, useState } from "react";
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
import IconRotated from "../../atoms/IconRotated";
import Defect from "../../molecules/Defect";
import { palette } from "../../../constants/palette";
import Button from "../../atoms/Button";
import CameraSettingsModal from "../CameraSettingsModal";
import DefectSaveModal from "../DefectSaveModal";
import CameraSortModal from "../CameraSortModal";
import CameraFilterModal from "../CameraFilterModal";
import CameraPagination from "../../molecules/CameraPagination";

const CameraAccordion: FC<ICameraAccordion> = ({
  sections,
  selectedCamera,
  setSelectedCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
  isSortCameraModalOpen,
  setIsSortCameraModalOpen,
  isFilterCameraModalOpen,
  setIsFilterCameraModalOpen,
  selectedDefect,
  setSelectedDefect,
}) => {
  const DEFAULT_PAGE_CAPACITY = 5;
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [cameraPages, setCameraPages] = useState<Record<string, number>>({});

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const handlePageChange = (cameraId: string, newPage: number) => {
    setCameraPages({ ...cameraPages, [cameraId]: newPage });
  };

  const getPagedDefects = (
    defects: IDefect[],
    page: number,
    pageSize = DEFAULT_PAGE_CAPACITY
  ) => {
    const start = (page - 1) * pageSize;
    return defects.slice(start, start + pageSize);
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
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (camera: ICamera) => {
    const page = cameraPages[camera.id] || 1;
    const pagedDefects = getPagedDefects(camera.defects, page);

    return (
      <Fragment>
        <View style={styles.contentWrapper}>
          <View style={styles.settingsWrapper}>
            <View style={styles.settingsIcons}>
              <Button
                style={styles.icon}
                onPress={() => {
                  setSelectedCamera(camera);
                }}
              >
                <SettingsIcon width={19} height={19} stroke={2} />
                <Text style={styles.iconTitle}>Настроить</Text>
              </Button>
              <Button
                style={styles.icon}
                onPress={() => {
                  setIsSortCameraModalOpen(true);
                }}
              >
                <SortIcon />
                <Text style={styles.iconTitle}>Сортировать</Text>
              </Button>
              <Button
                style={styles.icon}
                onPress={() => {
                  setIsFilterCameraModalOpen(true);
                }}
              >
                <FilterIcon />
                <Text style={styles.iconTitle}>Фильтровать</Text>
              </Button>
            </View>
            <View style={styles.horizontalLine} />
          </View>
          <View
            style={[
              styles.defects,
              camera.defectsCount <= DEFAULT_PAGE_CAPACITY && {
                marginBottom: 4,
              },
            ]}
          >
            {pagedDefects.map((defect: IDefect) => (
              <Defect
                key={defect.id}
                defect={defect}
                textBtn="Скрыть"
                setSelectedDefect={setSelectedDefect}
                pressableIcon
              />
            ))}
          </View>
          <CameraPagination
            total={camera.defects.length}
            current={page}
            onPageChange={(newPage) => handlePageChange(camera.id, newPage)}
          />
        </View>
        <CameraSettingsModal
          camera={selectedCamera}
          setCamera={setSelectedCamera}
          isHistoryModalOpen={isHistoryModalOpen}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
        />
        <CameraSortModal
          isOpen={isSortCameraModalOpen}
          setIsOpen={setIsSortCameraModalOpen}
        />
        <CameraFilterModal
          isOpen={isFilterCameraModalOpen}
          setIsOpen={setIsFilterCameraModalOpen}
        />
        <DefectSaveModal
          defect={selectedDefect}
          onClose={() => setSelectedDefect(null)}
        />
      </Fragment>
    );
  };

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
