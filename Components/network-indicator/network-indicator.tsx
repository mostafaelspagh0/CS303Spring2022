import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useReRun from "../../hooks/rerun/rerun-hook";
import * as Network from "expo-network";
import useCurrentNetworkStatus from "../../hooks/rerun/rerun-hook";

const NetworkIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const currentNetwork = useCurrentNetworkStatus();
  return (
    <View style={{
      flexDirection: "row",
      
    }}>
      <View
        style={{
          height: 15,
          width: 15,
          marginHorizontal: 5,
          marginTop: 2,
          borderRadius: 15,
          backgroundColor: !currentNetwork.isInternetReachable
            ? "red"
            : "green",
        }}
      ></View>
      <Text>{currentNetwork.isInternetReachable ? "Connected" : "Not Connected"}</Text>
    </View>
  );
};

export default NetworkIndicator;
