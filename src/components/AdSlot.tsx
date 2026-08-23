import { cva, type VariantProps } from 'class-variance-authority'

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

export function AdSlot(_props: AdSlotProps) {
  // Real AdSense (or other ad network) code isn't wired up yet. Rendering an
  // empty dashed "Advertisement space" box in the meantime looks broken to
  // real visitors and hurts trust/SEO signals, so this component intentionally
  // renders nothing until an ad network is actually connected.
  //
  // To go live: replace this `return null` with your ad network's real embed
  // (e.g. an AdSense <ins> tag), keeping the `placement` prop to size it.
  return null
}
