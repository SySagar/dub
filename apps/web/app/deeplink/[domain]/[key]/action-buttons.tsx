"use client";

import { EdgeLinkProps } from "@/lib/planetscale";
import { Button, IOSAppStore, useCopyToClipboard } from "@dub/ui";

export function DeepLinkActionButtons({ link }: { link: EdgeLinkProps }) {
  const [_copied, copyToClipboard] = useCopyToClipboard();

  const handleClick = async ({ withCopy }: { withCopy?: boolean } = {}) => {
    if (withCopy) {
      await copyToClipboard(link.shortLink);
    }

    window.location.href = link.shortLink;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        text="Open in the app"
        className="h-12 w-full rounded-xl bg-neutral-900 text-white"
        variant="primary"
        onClick={() => handleClick({ withCopy: true })}
        icon={<IOSAppStore className="size-6" />}
      />

      <button
        onClick={() => handleClick()}
        className="text-sm text-neutral-500"
      >
        Open in the app without copying
      </button>
    </div>
  );
}
