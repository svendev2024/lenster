import { LightningBoltIcon as LightningBoltIconOutline } from '@heroicons/react/outline';
import { LightningBoltIcon as LightningBoltIconSolid } from '@heroicons/react/solid';
import { PREFERENCES_WORKER_URL } from '@lenster/data/constants';
import { Localstorage } from '@lenster/data/storage';
import { GARDENER } from '@lenster/data/tracking';
import cn from '@lenster/ui/cn';
import { Leafwatch } from '@lib/leafwatch';
import { t, Trans } from '@lingui/macro';
import axios from 'axios';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from 'src/store/app';
import { usePreferencesStore } from 'src/store/preferences';

interface ModModeProps {
  className?: string;
}

const GardenerMode: FC<ModModeProps> = ({ className = '' }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const gardenerMode = usePreferencesStore((state) => state.gardenerMode);
  const setGardenerMode = usePreferencesStore((state) => state.setGardenerMode);

  const toggleModMode = () => {
    toast.promise(
      axios.post(
        `${PREFERENCES_WORKER_URL}/gardenerMode`,
        {
          id: currentProfile?.id,
          enabled: !gardenerMode
        },
        {
          headers: {
            'X-Access-Token': localStorage.getItem(Localstorage.AccessToken)
          }
        }
      ),
      {
        loading: t`Toggling gardener mode...`,
        success: () => {
          setGardenerMode(!gardenerMode);
          Leafwatch.track(GARDENER.TOGGLE_MODE);

          return t`Gardener mode toggled!`;
        },
        error: t`Failed to toggle gardener mode!`
      }
    );
  };

  return (
    <button
      onClick={toggleModMode}
      className={cn(
        'flex w-full items-center space-x-1.5 px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
    >
      {gardenerMode ? (
        <LightningBoltIconSolid className="h-4 w-4 text-green-600" />
      ) : (
        <LightningBoltIconOutline className="h-4 w-4 text-red-500" />
      )}
      <div>
        <Trans>Gardener mode</Trans>
      </div>
    </button>
  );
};

export default GardenerMode;
