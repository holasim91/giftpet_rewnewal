import Image from 'next/image';
import type { CircularRecommendation } from '@/types';

interface CircularItemProps {
  item: CircularRecommendation;
}

export default function CircularItem({ item }: CircularItemProps) {
  return (
    <button type="button" className="flex flex-col items-center group cursor-pointer">
      {/* Circle — desktop: bgColor + border-white + centered small image */}
      {/*          mobile: bg-surface-container + thin border + fill image */}
      <div
        className={[
          'rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow',
          // Size: mobile w-20, desktop w-32
          'w-20 h-20 md:w-32 md:h-32',
          // Border: mobile thin outline, desktop thick white
          'border border-outline-variant/30 md:border-4 md:border-white',
          // Background: mobile neutral, desktop use bgColor
          'bg-surface-container',
          // Desktop: flex-center for inner image sizing
          'md:flex md:items-center md:justify-center',
          item.bgColor,
        ].join(' ')}
      >
        {/* Inner image wrapper — mobile fills circle, desktop shows as small inset */}
        <div className="relative w-full h-full md:w-16 md:h-16">
          <Image
            src={item.imageUrl}
            alt={item.label}
            fill
            unoptimized
            className="object-cover md:object-contain"
            sizes="128px"
          />
        </div>
      </div>

      <span className="text-label-md text-on-surface text-center font-semibold max-w-[100px] mt-4">
        {item.label}
      </span>
    </button>
  );
}
