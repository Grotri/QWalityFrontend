import React, { FC } from "react";
import { IDropdown } from "./types";
import { styles } from "./styles";
import { ArrowBottomIcon } from "../../../../assets/icons";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { palette } from "../../../constants/palette";
import IconRotated from "../IconRotated";
import { useSharedValue } from "react-native-reanimated";

const Dropdown: FC<IDropdown> = ({
  data,
  setValue,
  value,
  label,
  isOpen,
  setIsOpen,
  wrapperStyle,
  dropdownStyle,
  selectedTextStyle,
  labelStyle,
  itemContainerStyle,
  borderColor = palette.bg,
  arrowIconComponent,
}) => {
  const rotation = useSharedValue(0);

  const renderIcon = () => (
    <IconRotated
      icon={arrowIconComponent || <ArrowBottomIcon />}
      isActive={isOpen}
      rotation={rotation}
    />
  );

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <DropDownPicker
        items={data}
        open={isOpen}
        setOpen={setIsOpen}
        multiple={false}
        setValue={(callback) => {
          setValue(callback(value));
        }}
        value={value}
        style={[styles.dropdown, dropdownStyle, { borderColor }]}
        textStyle={[styles.textStyle, selectedTextStyle]}
        dropDownContainerStyle={{ borderColor }}
        listItemContainerStyle={[styles.item, itemContainerStyle]}
        selectedItemContainerStyle={styles.selectedItem}
        showTickIcon={false}
        ArrowDownIconComponent={renderIcon}
        ArrowUpIconComponent={renderIcon}
        closeAfterSelecting
        closeOnBackPressed
        onClose={() => setIsOpen(false)}
        flatListProps={{
          scrollEnabled: false,
        }}
      />
    </View>
  );
};

export default Dropdown;
