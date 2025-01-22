import { useState } from "react";
import {
  ProviderType,
  SUPPORTED_WALLETS,
  WalletIcon,
} from "@omnisat/lasereyes";
import FormWrapper from "@/components/FormWrapper";
import { BaseButton } from "@/components/ui/base-button";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import Modal from "@/components/Modal";

interface ConnectWalletFormProps {
  onBack: () => void;
}

const ConnectWalletForm = ({ onBack }: ConnectWalletFormProps) => {
  const [walletState, walletActions] = useWalletConnection();
  const [isSparrowModalOpen, setIsSparrowModalOpen] = useState(false);

  return (
    <>
      <FormWrapper title="connect wallet" onBack={onBack}>
        <div className="grid grid-cols-3 gap-[calc(var(--size)*0.06)]">
          {Object.values(SUPPORTED_WALLETS)
            .filter(
              (wallet) => wallet.name !== "op_net" && wallet.name !== "wizz"
            )
            .map((wallet) => {
              const isSparrow = wallet.name === "sparrow";
              const isMissingWallet =
                !isSparrow && !walletState.hasWallet[wallet.name];

              return (
                <div key={wallet.name} className="w-full">
                  {isSparrow ? (
                    <BaseButton
                      variant="icon"
                      onClick={() => setIsSparrowModalOpen(true)}
                    >
                      <WalletIcon walletName={wallet.name} size={32} />
                    </BaseButton>
                  ) : isMissingWallet ? (
                    <BaseButton variant="icon" asChild>
                      <a
                        href={wallet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <WalletIcon walletName={wallet.name} size={32} />
                      </a>
                    </BaseButton>
                  ) : (
                    <BaseButton
                      variant="icon"
                      className="wallet-button-available"
                      onClick={() =>
                        walletActions.handleConnect(wallet.name as ProviderType)
                      }
                    >
                      <WalletIcon walletName={wallet.name} size={32} />
                    </BaseButton>
                  )}
                </div>
              );
            })}
        </div>
        <div className="input-placeholder" />
      </FormWrapper>

      <Modal
        isOpen={isSparrowModalOpen}
        onClose={() => setIsSparrowModalOpen(false)}
        title="connect sparrow"
      >
        <p className="text-center">
          Steps to sign a message with Sparrow wallet:
        </p>

        <div className="text-left space-y-[calc(var(--size)*0.06)]">
          <div>
            <p>1. Get Sparrow ready:</p>
            <ul className="list-disc pl-6 text-white/80">
              <li>
                Download Sparrow Wallet from{" "}
                <a
                  href="https://sparrowwallet.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  sparrowwallet.com
                </a>
              </li>
              <li>Install and launch the application</li>
              <li>Create a new wallet or import existing one</li>
            </ul>
          </div>

          <div>
            <p>2. Sign your message:</p>
            <ul className="list-disc pl-6 text-white/80">
              <li>Go to Tools → Sign/Verify Message</li>
              <li>Select the address you want to sign with</li>
              <li>Enter your message in the text field</li>
              <li>Click "Sign Message"</li>
              <li>Copy the signature for verification</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConnectWalletForm;
