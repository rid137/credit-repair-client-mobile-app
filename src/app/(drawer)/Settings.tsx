import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import TouchBtn from "@/components/TouchBtn";
import { COLORS } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";
import { UserAuth } from "@/hooks/useAuthContext";


const img = require("@assets/images/Avatar.png")

const Settings = () => {
  const navigate = useNavigation();

  const { clientDetials } = UserAuth();


  // navigate('Root', { screen: 'Profile' });


  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 15, marginTop: 15}}>
      <View style={styles.btnContainer}>
        <TouchBtn text="Edit Profile" onPress={() => router.push("/editProfilePage")} />
        {/* <Link href={{
          pathname: "/",
          screen: "Help"
        }} >NAVIGAE</Link> */}
      </View>

      <View style={styles?.bodyContainer}>
        <Image 
          source={img}
        />
        <Text style={{fontWeight: "bold", marginTop: 12}}>{clientDetials?.firstName + " " + clientDetials?.lastName}</Text>
        <Text>{clientDetials?.email}</Text>
        <Text>{clientDetials?.phone}</Text>

      </View>

      {/* FIRST CONTAINER */}
      <View style={styles?.cardContainer}>

        {/* TOP ROW */}
        <View style={styles?.rowContainer}>

          <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16}}>

            <FontAwesome
              name="bell"
              size={20}
              // color={{}}
              style={{ }}
            />

            <Text>Notifications</Text>

          </View>

          <Text style={{fontWeight: "bold", color: COLORS?.primary}}>ON</Text>

        </View>

        {/* BOTTOM ROW */}
        <View style={styles?.rowContainer}>

          <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>

            <FontAwesome
              name="language"
              size={20}
              // color={{}}
              style={{ }}
            />

            <Text>Language</Text>

          </View>

          <Text style={{fontWeight: "bold", color: COLORS?.primary}}>English</Text>

        </View>




      </View>

      {/* SECOND CONTAINER */}
      <View style={styles?.cardContainer}>
          <Link href={"/security"}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
              <FontAwesome
                name="lock"
                size={20}
                style={{ }}
              />
              <Text>Security</Text>
            </View>
          </Link>
      </View>


      {/* THIRD CONTAINER */}
      <View style={styles?.cardContainer}>
        {/* FIRST ROW */}
        <Link href={"/help"} style={{marginBottom: 14}} >
          <View style={{flexDirection: "row", alignItems: "center", gap: 10,}}>
            <FontAwesome
              name="user"
              size={20}
              style={{ }}
            />
            <Text>Help & Support</Text>
          </View>
        </Link>

        {/* SECOND ROW */}
        <Link href={"/privacy"}>
          <View style={{flexDirection: "row", alignItems: "center", gap: 10}}>
            <FontAwesome
              name="address-book"
              size={20}
              style={{ }}
            />
            <Text>Privacy policy</Text>
          </View>
        </Link>
      </View>
      

    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  bodyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  cardContainer: {
    backgroundColor: COLORS?.deepGrayBg, 
    padding: 16,
    marginTop: 16
  },

  rowContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    // marginBottom: 16
  }
    
});


