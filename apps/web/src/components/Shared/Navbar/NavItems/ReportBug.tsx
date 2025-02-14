import { ExternalLinkIcon, HandIcon } from '@heroicons/react/outline';
import cn from '@lenster/ui/cn';
import { Trans } from '@lingui/macro';
import Link from 'next/link';
import type { FC } from 'react';

interface ReportBugProps {
  onClick?: () => void;
  className?: string;
}

const ReportBug: FC<ReportBugProps> = ({ onClick, className = '' }) => {
  return (
    <Link
      href="https://github.com/lensterxyz/lenster/issues/new?assignees=bigint&labels=needs+review&template=bug_report.yml"
      target="_blank"
      className={cn(
        'flex w-full items-center justify-between px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-1.5">
        <HandIcon className="h-4 w-4" />
        <div>
          <Trans>Report a bug</Trans>
        </div>
      </div>
      <ExternalLinkIcon className="h-4 w-4 md:hidden" />
    </Link>
  );
};

export default ReportBug;
