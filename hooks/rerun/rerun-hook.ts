import { useEffect, useState } from "react";
import { getNetworkStateAsync,NetworkStateType } from "expo-network";
import type { NetworkState } from "expo-network";

const useReRun = (onRerun: () => void): [() => void, boolean] => {
  const [reRun, setReRun] = useState(false);
  const reRunHook = (): void => {
    onRerun();
    setReRun(!reRun);
  };
  return [reRunHook, reRun];
};

const wait = (timeout: number) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const useAutoRunWithDelay = (
  funcToRun: () => Promise<void> | void,
  timeDelay: number
) => {
  const [rerunState, setRerunState] = useState(false);
  useEffect(() => {
    (async () => {
      await funcToRun();
      await wait(timeDelay);
    })().then(() => {
      setRerunState(!rerunState);
    });
  }, [rerunState]);
};

const useCurrentNetworkStatus = (): NetworkState => {
    
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    isInternetReachable: true,
    type: NetworkStateType.WIFI,
  });
  useAutoRunWithDelay(async () => {
    const networkState = await getNetworkStateAsync();
    setNetworkState(networkState);
  }, 5000);
  return networkState;
};
export default useCurrentNetworkStatus;
