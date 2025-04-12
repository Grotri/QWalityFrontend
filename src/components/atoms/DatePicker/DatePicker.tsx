import React, { FC, useState } from "react";
import { IDatePicker } from "./types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { formatDate } from "../../../helpers/formatDate";

const DatePicker: FC<IDatePicker> = ({ date, setDate }) => {
  const [show, setShow] = useState<boolean>(false);
  const defaultDate = new Date();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    if (event.type === "set") {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={showDatepicker}>
        <View style={styles.datePicker}>
          <Text style={styles.date}>
            {date ? formatDate(date) : "DD.MM.YYYY"}
          </Text>
        </View>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date || defaultDate}
          mode="date"
          is24Hour={true}
          onChange={onChange}
          locale="ru"
        />
      )}
    </View>
  );
};

export default DatePicker;
