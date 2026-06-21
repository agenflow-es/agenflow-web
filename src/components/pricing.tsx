'use client';
// Source: 21st.dev — sshahaider/pricing (shadcn registry). Adapted to the
// Agenflow brand: prices + monthly/yearly toggle removed (we quote on request),
// locale-aware links, accent-tinted BorderTrail, brand radius/tokens.
import React from 'react';
import { Button } from '@/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, StarIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { motion, Transition } from 'framer-motion';

interface Plan {
	name: string;
	info?: string;
	features: {
		text: string;
		tooltip?: string;
	}[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
	badge?: string;
}

interface PricingSectionProps extends React.ComponentProps<'div'> {
	plans: Plan[];
}

export function PricingSection({ plans, className, ...props }: PricingSectionProps) {
	return (
		<div
			className={cn(
				'mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-3',
				className,
			)}
			{...props}
		>
			{plans.map((plan) => (
				<PricingCard plan={plan} key={plan.name} />
			))}
		</div>
	);
}

type PricingCardProps = React.ComponentProps<'div'> & {
	plan: Plan;
};

export function PricingCard({ plan, className, ...props }: PricingCardProps) {
	return (
		<div
			key={plan.name}
			className={cn(
				'relative flex w-full flex-col rounded-[var(--radius-lg)] border bg-surface shadow-[var(--shadow)]',
				plan.highlighted && 'border-accent',
				className,
			)}
			{...props}
		>
			{plan.highlighted && (
				<BorderTrail
					className="bg-accent"
					style={{
						boxShadow:
							'0px 0px 36px 14px color-mix(in srgb, var(--accent) 55%, transparent)',
					}}
					size={90}
				/>
			)}
			<div
				className={cn(
					'rounded-t-[var(--radius-lg)] border-b p-6',
					plan.highlighted && 'bg-surface-2',
				)}
			>
				{plan.badge && (
					<div className="absolute top-3 right-3 z-10">
						<p className="flex items-center gap-1 rounded-full border border-accent bg-accent-soft px-2.5 py-0.5 font-label text-[11px] uppercase tracking-[0.06em] text-accent">
							<StarIcon className="h-3 w-3 fill-current" />
							{plan.badge}
						</p>
					</div>
				)}
				<div className="font-display text-[19px] font-semibold">{plan.name}</div>
				{plan.info && (
					<p className="mt-1 text-sm leading-[1.5] text-fg-muted">{plan.info}</p>
				)}
			</div>
			<div className="space-y-3.5 px-6 py-6 text-sm">
				{plan.features.map((feature, index) => (
					<div key={index} className="flex items-start gap-2.5">
						<CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger asChild>
									<p
										className={cn(
											'text-left leading-[1.5] text-fg',
											feature.tooltip &&
												'cursor-help border-b border-dashed border-border-strong',
										)}
									>
										{feature.text}
									</p>
								</TooltipTrigger>
								{feature.tooltip && (
									<TooltipContent className="max-w-[240px]">
										<p>{feature.tooltip}</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				))}
			</div>
			<div className="mt-auto w-full border-t p-4">
				<Button
					className="w-full"
					variant={plan.highlighted ? 'default' : 'outline'}
					asChild
				>
					<Link href={plan.btn.href}>{plan.btn.text}</Link>
				</Button>
			</div>
		</div>
	);
}

type BorderTrailProps = {
	className?: string;
	size?: number;
	transition?: Transition;
	delay?: number;
	onAnimationComplete?: () => void;
	style?: React.CSSProperties;
};

export function BorderTrail({
	className,
	size = 60,
	transition,
	delay,
	onAnimationComplete,
	style,
}: BorderTrailProps) {
	const BASE_TRANSITION: Transition = {
		repeat: Infinity,
		duration: 6,
		ease: 'linear',
	};

	return (
		<div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
			<motion.div
				className={cn('absolute aspect-square bg-accent', className)}
				style={{
					width: size,
					offsetPath: `rect(0 auto auto 0 round ${size}px)`,
					...style,
				}}
				animate={{
					offsetDistance: ['0%', '100%'],
				}}
				transition={{
					...(transition ?? BASE_TRANSITION),
					delay: delay,
				}}
				onAnimationComplete={onAnimationComplete}
			/>
		</div>
	);
}
