import { Menu } from '@headlessui/react';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { PROFILE } from '@lenster/data/tracking';
import type { Profile } from '@lenster/lens';
import formatHandle from '@lenster/lib/formatHandle';
import stopEventPropagation from '@lenster/lib/stopEventPropagation';
import cn from '@lenster/ui/cn';
import { Leafwatch } from '@lib/leafwatch';
import { t, Trans } from '@lingui/macro';
import type { FC } from 'react';
import toast from 'react-hot-toast';

interface ShareProps {
  profile: Profile;
}

const Share: FC<ShareProps> = ({ profile }) => {
  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-2 py-1.5 text-sm'
        )
      }
      onClick={async (event) => {
        stopEventPropagation(event);
        await navigator.clipboard.writeText(
          `${location.origin}/u/${formatHandle(profile?.handle)}`
        );
        toast.success(t`Copied to clipboard!`);
        Leafwatch.track(PROFILE.COPY_PROFILE_LINK, {
          profile_id: profile.id
        });
      }}
    >
      <div className="flex items-center space-x-2">
        <ClipboardCopyIcon className="h-4 w-4" />
        <div>
          <Trans>Copy link</Trans>
        </div>
      </div>
    </Menu.Item>
  );
};

export default Share;
