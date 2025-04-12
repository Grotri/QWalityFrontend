import React, { FC } from "react";
import { IDropdown } from "./types";
import { styles } from "./styles";
import { ArrowBottomIcon } from "../../../../assets/icons";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { palette } from "../../../constants/palette";

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
}) => (
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
      ArrowDownIconComponent={() => <ArrowBottomIcon />}
      ArrowUpIconComponent={() => (
        <ArrowBottomIcon style={{ transform: [{ scaleY: -1 }] }} />
      )}
      closeAfterSelecting
      closeOnBackPressed
      onClose={() => setIsOpen(false)}
      flatListProps={{
        scrollEnabled: false,
      }}
    />
  </View>
);

export default Dropdown;
