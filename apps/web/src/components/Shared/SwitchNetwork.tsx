import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import { SYSTEM } from '@lenster/data/tracking';
import { Button } from '@lenster/ui';
import { Leafwatch } from '@lib/leafwatch';
import { t } from '@lingui/macro';
import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useSwitchNetwork } from 'wagmi';

interface SwitchNetworkProps {
  toChainId: number;
  title?: string;
  className?: string;
  onSwitch?: () => void;
}

const SwitchNetwork: FC<SwitchNetworkProps> = ({
  toChainId,
  title = t`Switch Network`,
  className = '',
  onSwitch
}) => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Button
      className={className}
      type="button"
      variant="danger"
      icon={<SwitchHorizontalIcon className="h-4 w-4" />}
      onClick={() => {
        onSwitch?.();
        if (switchNetwork) {
          switchNetwork(toChainId);
        } else {
          toast.error(t`Please change your network wallet!`);
        }
        Leafwatch.track(SYSTEM.SWITCH_NETWORK, {
          chain: toChainId
        });
      }}
    >
      {title}
    </Button>
  );
};

export default SwitchNetwork;
