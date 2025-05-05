import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, ConnectButton, defaultConfig, darkTheme } from "@xellar/kit";
import { polygonAmoy, liskSepolia } from "viem/chains";
import { useIsMobile } from "@/hooks/use-mobile";

const walletConnectProjectId = "3a673d426f3e97c0ceb045bd909486a1";
const xellarAppId = "a4140cfa-9133-4aa6-a0fe-061e3b69ebd1";

const config = defaultConfig({
  appName: "REYU",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "production",
  chains: [polygonAmoy, liskSepolia],
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Export the ConnectButton component for use in other parts of the application
export const WalletConnectButton = () => {
  const isMobile = useIsMobile();

  // Safe way to use ConnectButton to avoid errors when rendered outside of XellarKitProvider
  try {
    return (
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openConnectModal,
          openChainModal,
          openProfileModal,
          isConnected
        }) => {
          return (
            <div className="w-full">
              {(() => {
                if (!isConnected || !account || !chain) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className={`bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-medium ${isMobile ? 'w-full' : ''}`}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (isMobile) {
                  // Simplified view for mobile
                  return (
                    <button
                      onClick={openProfileModal}
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-medium w-full"
                    >
                      {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border border-blue-500/20 rounded-full px-4 py-2 font-medium text-sm"
                    >
                      {chain.name}
                    </button>
                    <button
                      onClick={openProfileModal}
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 font-medium text-sm"
                    >
                      {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    );
  } catch (error) {
    // Fallback button when rendered outside of XellarKitProvider
    console.warn("WalletConnectButton rendered outside of XellarKitProvider context");
    return (
      <button
        type="button"
        disabled
        className={`bg-blue-500/50 text-white rounded-full px-6 py-2 font-medium ${isMobile ? 'w-full' : ''}`}
      >
        Connect Wallet
      </button>
    );
  }
};