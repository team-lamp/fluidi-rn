import React, { useRef, useMemo, useCallback } from "react";
import RoomList from "../components/RoomList";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useStore from "../store";
import { Icon } from "native-base";
import { colors } from "../constants/styleGuide";
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import Text from "../components/themed/Text";

interface SectionHeaderProps {
  section: any;
}

const SectionHeader = ({ section }: SectionHeaderProps) => {
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text variant="header">{section.title}</Text>
    </View>
  );
};

interface ContactItemProps {
  item: any;
}

const ContactItem = ({ item }: ContactItemProps) => {
  const name = `${item.firstName} ${item.lastName || ""}`;
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text variant="body">{name}</Text>
    </View>
  );
};

const contacts = [
  {
    id: 93,
    firstName: "Zarther",
    lastName: null,
  },
  {
    id: 23,
    firstName: "Katie",
    lastName: "Embrey",
  },
  {
    id: 29,
    firstName: "Edward",
    lastName: null,
  },
  {
    id: 35,
    firstName: "Johnathan",
    lastName: "Guy",
  },
  {
    id: 21,
    firstName: "Adam",
    lastName: "Anders",
  },
  {
    id: 12,
    firstName: "Dude",
    lastName: "Adams",
  },
  {
    id: 353,
    firstName: "Jack",
    lastName: "Bilbo",
  },
];

contacts.sort((a, b) => {
  const aName = a.lastName
    ? a.lastName.toUpperCase()
    : a.firstName.toUpperCase();
  const bName = b.lastName
    ? b.lastName.toUpperCase()
    : b.firstName.toUpperCase();
  return aName.localeCompare(bName);
});

const sortedContacts: any = {};
contacts.forEach((contact) => {
  const name = contact.lastName || contact.firstName;
  const firstLetter = name[0];
  if (!Object.keys(sortedContacts).includes(firstLetter)) {
    sortedContacts[firstLetter] = [contact];
  } else {
    sortedContacts[firstLetter].push(contact);
  }
});

const contactData = Object.keys(sortedContacts).map((key) => {
  return {
    title: key,
    data: sortedContacts[key],
  };
});

const HomeScreen = ({ navigation }: any) => {
  const token = useStore((state) => state.token);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [0, "100%"], []);

  const handleOpen = () => bottomSheetRef?.current?.expand();

  return (
    <View style={styles.container}>
      <RoomList navigation={navigation} />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          paddingBottom: 35,
          paddingHorizontal: 14,
        }}
      >
        <TouchableOpacity onPress={handleOpen}>
          <Icon
            type="Entypo"
            name="new-message"
            style={{ color: colors.contrastText }}
          />
        </TouchableOpacity>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <BottomSheetSectionList
          sections={contactData}
          keyExtractor={(i) => i}
          renderSectionHeader={({ section }) => (
            <SectionHeader section={section} />
          )}
          renderItem={({ item }) => <ContactItem item={item} />}
          style={{ flex: 1, backgroundColor: colors.background }}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
