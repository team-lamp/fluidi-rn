import React, { useRef, useMemo, useCallback } from "react";
import RoomList from "../components/RoomList";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import useStore from "../store";
import { Icon, Thumbnail } from "native-base";
import { colors } from "../constants/styleGuide";
import BottomSheet, { BottomSheetSectionList } from "@gorhom/bottom-sheet";
import Text from "../components/themed/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SectionHeaderProps {
  section: any;
}

const SectionHeader = ({ section }: SectionHeaderProps) => {
  return (
    <View style={{ marginTop: 25, marginBottom: 10, marginLeft: 20 }}>
      <Text variant="header">{section.title}</Text>
    </View>
  );
};

interface ContactItemProps {
  item: any;
}

const ContactItem = ({ item }: ContactItemProps) => {
  const name = `${item.firstName} ${item.lastName || ""}`;
  const hasAvatar = item.avatar ? true : false;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.lowOpacity.grey,
        borderRadius: 15,
        marginLeft: 55,
        marginRight: 20,
        marginVertical: 5,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {hasAvatar ? (
          <Thumbnail small source={{ uri: item.avatar }} />
        ) : (
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 36 / 2,
              backgroundColor: colors.secondaryText,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text variant="body">{item.firstName[0]}</Text>
          </View>
        )}
        <Text variant="body" style={{ marginLeft: 10 }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const contacts = [
  {
    id: 93,
    firstName: "Zarther",
    lastName: null,
    avatar: null,
  },
  {
    id: 23,
    firstName: "Katie",
    lastName: "Embrey",
    avatar:
      "https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-9/161102903_10158001431472322_1672271331533195877_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=CNSu2GUBWjwAX9BTONs&_nc_ht=scontent-ort2-2.xx&oh=857544e7e5b8e4d31c96defbd9cf7496&oe=60DB5DB8",
  },
  {
    id: 29,
    firstName: "Edward",
    lastName: null,
    avatar:
      "https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg",
  },
  {
    id: 35,
    firstName: "Johnathan",
    lastName: "Guy",
    avatar: null,
  },
  {
    id: 21,
    firstName: "Adam",
    lastName: "Anders",
    avatar:
      "https://thumbs.dreamstime.com/b/headshot-happy-asian-man-face-beard-mustache-91099404.jpg",
  },
  {
    id: 12,
    firstName: "Dude",
    lastName: "Adams",
    avatar:
      "https://st2.depositphotos.com/1010146/9831/i/950/depositphotos_98319064-stock-photo-young-man-headshot.jpg",
  },
  {
    id: 353,
    firstName: "Jack",
    lastName: "Bilbo",
    avatar: null,
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
  const insets = useSafeAreaInsets();
  const token = useStore((state) => state.token);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [0, "100%"], []);

  const handleOpen = () => bottomSheetRef?.current?.expand();

  return (
    <View style={styles.container}>
      <RoomList navigation={navigation} />
      <View
        style={[
          styles.bottomIconContainer,
          {
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 20,
            paddingRight: insets.right + 20,
          },
        ]}
      >
        <TouchableOpacity onPress={handleOpen} style={styles.createNewButton}>
          <Icon
            type="Ionicons"
            name="md-create-outline"
            style={{ color: colors.contrastText }}
          />
        </TouchableOpacity>
      </View>
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View
          style={{
            backgroundColor: colors.backgroundDark,
            paddingVertical: 20,
            alignItems: "center",
            shadowOpacity: 0.5,
            shadowColor: "#000",
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Icon
              type="MaterialIcons"
              name="person-add"
              style={{ color: colors.contrastText }}
            />
            <Text variant="body" style={{ marginLeft: 10 }}>
              Add new Contact
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Icon
              type="MaterialIcons"
              name="group"
              style={{ color: colors.contrastText }}
            />
            <Text variant="body" style={{ marginLeft: 10 }}>
              Create new Group
            </Text>
          </TouchableOpacity>
        </View>
        <BottomSheetSectionList
          sections={contactData}
          keyExtractor={(i) => String(i.id)}
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
  bottomIconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  createNewButton: {
    backgroundColor: colors.brandDark,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 48 / 2,
    shadowColor: colors.secondaryBackground,
    shadowRadius: 3,
    shadowOpacity: 0.4,
    elevation: 2,
  },
});

export default HomeScreen;
