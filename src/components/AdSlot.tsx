import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const adSlotVariants = cva(
  'flex items-center justify-center rounded-md border border-dashed border-stone-300 bg-stone-50 text-stone-400 text-xs uppercase tracking-widest',
  {
    variants: {
      placement: {
        header: 'h-[60px] w-full max-w-[728px] mx-auto',
        sidebar: 'h-[250px] w-full',
      },
    },
    defaultVariants: {
      placement: 'header',
    },
  },
)

export interface AdSlotProps extends VariantProps<typeof adSlotVariants> {
  className?: string
}

export function AdSlot({ placement, className }: AdSlotProps) {
  return (
    <div
      className={cn(adSlotVariants({ placement }), className)}
      data-ad-slot={placement}
      aria-label="Advertisement placeholder"
    >
      Advertisement space
    </div>
  )
}
