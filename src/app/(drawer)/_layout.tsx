import { createDrawerNavigator } from '@react-navigation/drawer';
import FirstScreen from '.';
import SecondScreen from './second';
import { NavigationContainer } from '@react-navigation/native';
import TabLayout from '../(tabs)/_layout';
import { Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants';
import { Image } from 'react-native';
import Payment from './payment';
import Settings from './Settings';
// import { StackSettingsScreens } from './setting/_layout';
// import { StackNav } from './StackNav';
import Security from "./Security"
import NotificationContent from '@/components/NotificationContent';
import Notification from './notification';
// import DrawerContents from '@/components/DrawerContent';
import DrawerContent from '@/components/DrawerContent';
// import { StackNestScreens } from '../(setting)/_layout';



const StackNav = () => {
  return (
    <Stack screenOptions={{
      headerShown: false,
      headerTitleStyle: {

      }
    }}>
      {/* <Stack.Screen name="Settings" options={{ headerShown: false }} /> */}
      <Stack.Screen name="Security" options={{ headerShown: false }} />
      {/* <Stack.Screen name="editProfile" options={{ headerShown: false }} /> */}
    </Stack>
  )
}

function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    // <NavigationContainer>
      <Drawer.Navigator
      drawerContent={props => <DrawerContent />}

        screenOptions={{
          // statusBarColor: "#0163d2",
          
          headerStyle: {
            backgroundColor: "#0163d2",
            height: 100
            
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            // display: "none"
          },
          headerRight: () => (
            <Link href="/(drawer)/Settings" asChild>
              <Pressable>
                {({ pressed }) => (
                  // <FontAwesome
                  //   name="info-circle"
                  //   size={25}
                  //   color={COLORS?.grayBg}
                  //   style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  // />
                  <Image source={ require("../../../assets/images/profileImg.png")} style={{width: 40, height: 40, marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
          ),
        }}
      >
        {/* <Drawer.Screen name="Index" component={TabLayout} /> */}
        <Drawer.Screen 
          options={{
            headerTitleStyle: {
              display: "none"
            },
          }} 
          name="Dashboard" 
          component={FirstScreen} 
        />
        {/* <Drawer.Screen 
          name="second" 
          component={SecondScreen} 
          /> */}

        <Drawer.Screen 
          name="Payment" 
          component={Payment} 
          options={{
            headerTitleAlign: "left",
            headerTitleStyle: {
              textAlign: "left"
            }
          }} 
        />

        <Drawer.Screen 
          name="Notification" 
          component={Notification} 
          options={{
            headerTitleAlign: "left",
            headerTitleStyle: {
              textAlign: "left"
            }
          }} 
        />

        <Drawer.Screen 
          name="Settings"
          // name="Settings"
          component={Settings}
          // component={StackNestScreens}
          // component={StackNestScreens}
          options={{
            headerTitleAlign: "left",
            // headerShown: false,
            headerTitleStyle: {
              textAlign: "left"
            }
          }} 
        />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default MyDrawer