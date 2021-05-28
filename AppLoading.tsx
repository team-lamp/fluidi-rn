import * as React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen";

// const AppLoading = ({ navigation }: any) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(true);
//   if (isAuthenticated) {
//       navigation.navigate("HomeScreen")
//   }
//   return (
//     <View style={{
//         backgroundColor: 'black',
//         height: 1000000
//     }}>
//       <Text>Loading . . .</Text>
//     </View>
//   );
// };

const AppLoading = ({ children }: any) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // load fonts and stuff here first, then set loading to true

  //   setTimeout(() => {
  //       //pretend to load fonts
  //       setIsLoaded(true);
  //   }, 200)
  if (!isLoaded) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen setIsAuthenticated={setIsAuthenticated} />;
  }

  if (isLoaded && isAuthenticated) return children;
};

export default AppLoading;
