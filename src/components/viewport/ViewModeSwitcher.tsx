import { Box, Flex, IconButton, Portal, Tooltip } from '@chakra-ui/react';
import {
	LuPanelTop,
	LuPanelBottom,
	LuPanelLeft,
	LuPanelRight,
	LuBox,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { useUIStore } from '@/store/uiStore.ts';
import type { CameraPreset } from '@/types/gridfinity.ts';

export type ViewModeSwitcherLayout = 'horizontal' | 'vertical' | 'grid';

export type ViewModeSwitcherPlacement =
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'right-top'
	| 'right-center'
	| 'right-bottom'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom';

interface ViewModeSwitcherProps {
	layout?: ViewModeSwitcherLayout;
	placement?: ViewModeSwitcherPlacement;
}

interface ViewItem {
	key: string;
	label: string;
	icon: IconType;
	active?: boolean;
}

const items: ViewItem[] = [
	{ key: 'top', label: 'Вид сверху', icon: LuPanelTop },
	{ key: 'bottom', label: 'Снизу', icon: LuPanelBottom },
	{ key: 'front', label: 'Вид спереди', icon: LuPanelLeft },
	{ key: 'side', label: 'Справа', icon: LuPanelRight },
	{ key: 'isometric', label: '3D', icon: LuBox, active: true },
];

function getPlacementStyles(placement: ViewModeSwitcherPlacement) {
	switch (placement) {
		case 'top-left':
			return { top: '16px', left: '16px' };

		case 'top-center':
			return {
				top: '16px',
				left: '50%',
				transform: 'translateX(-50%)',
			};

		case 'top-right':
			return { top: '16px', right: '16px' };

		case 'right-top':
			return { top: '16px', right: '16px' };

		case 'right-center':
			return {
				top: '50%',
				right: '16px',
				transform: 'translateY(-50%)',
			};

		case 'right-bottom':
			return { bottom: '16px', right: '16px' };

		case 'bottom-left':
			return { bottom: '16px', left: '16px' };

		case 'bottom-center':
			return {
				bottom: '16px',
				left: '50%',
				transform: 'translateX(-50%)',
			};

		case 'bottom-right':
			return { bottom: '16px', right: '16px' };

		case 'left-top':
			return { top: '16px', left: '16px' };

		case 'left-center':
			return {
				top: '50%',
				left: '16px',
				transform: 'translateY(-50%)',
			};

		case 'left-bottom':
			return { bottom: '16px', left: '16px' };

		default:
			return {
				bottom: '16px',
				left: '50%',
				transform: 'translateX(-50%)',
			};
	}
}

function getDirection(
	layout: ViewModeSwitcherLayout
): 'row' | 'column' | 'grid' {
	if (layout === 'vertical') return 'column';
	if (layout === 'grid') return 'grid';
	return 'row';
}

export function ViewModeSwitcher({
	layout = 'horizontal',
	placement = 'bottom-center',
}: ViewModeSwitcherProps) {
	const direction = getDirection(layout);
	const placementStyles = getPlacementStyles(placement);
	const setCameraPreset = useUIStore((s) => s.setCameraPreset);

	return (
		<Box
			position="absolute"
			zIndex={30}
			p="6px"
			borderRadius="20px"
			border="1px solid"
			borderColor="whiteAlpha.300"
			bg="rgba(255,255,255,0.72)"
			backdropFilter="blur(18px) saturate(160%)"
			boxShadow="
				0 1px 2px rgba(16,24,40,0.04),
				0 12px 40px rgba(16,24,40,0.10),
				inset 0 1px 0 rgba(255,255,255,0.65)
			"
			overflow="hidden"
			{...placementStyles}
		>
			<Box
				position="absolute"
				top="-24px"
				left="50%"
				transform="translateX(-50%)"
				w="140px"
				h="56px"
				borderRadius="full"
				bg="rgba(59,130,246,0.10)"
				filter="blur(28px)"
				pointerEvents="none"
			/>

			{direction === 'grid' ? (
				<Flex
					position="relative"
					zIndex={1}
					display="grid"
					gridTemplateColumns="repeat(3, 40px)"
					gridTemplateRows="repeat(2, 40px)"
					gap="6px"
				>
					{items.map((item) => {
						const Icon = item.icon;
						const isActive = item.active;

						return (
							<Tooltip.Root
								key={item.key}
								positioning={{ placement: 'top' }}
							>
								<Tooltip.Trigger asChild>
									<IconButton
										aria-label={item.label}
										size="sm"
										variant="ghost"
										borderRadius="14px"
										minW="40px"
										w="40px"
										h="40px"
										color={
											isActive ? 'blue.600' : 'gray.600'
										}
										bg={
											isActive
												? 'rgba(59,130,246,0.12)'
												: 'transparent'
										}
										border="1px solid"
										borderColor={
											isActive
												? 'rgba(59,130,246,0.22)'
												: 'transparent'
										}
										boxShadow={
											isActive
												? '0 4px 14px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.6)'
												: 'none'
										}
										_hover={{
											bg: isActive
												? 'rgba(59,130,246,0.16)'
												: 'rgba(15,23,42,0.06)',
											color: isActive
												? 'blue.700'
												: 'gray.800',
										}}
										_active={{
											transform: 'scale(0.98)',
										}}
										onClick={() => {
											setCameraPreset(
												item.key as CameraPreset
											);
										}}
									>
										<Icon size={18} />
									</IconButton>
								</Tooltip.Trigger>

								<Portal>
									<Tooltip.Positioner>
										<Tooltip.Content
											px="8px"
											py="4px"
											borderRadius="10px"
											fontSize="12px"
											fontWeight="600"
											bg="gray.900"
											color="white"
											boxShadow="lg"
										>
											{item.label}
										</Tooltip.Content>
									</Tooltip.Positioner>
								</Portal>
							</Tooltip.Root>
						);
					})}
				</Flex>
			) : (
				<Flex
					position="relative"
					zIndex={1}
					direction={direction}
					gap="6px"
				>
					{items.map((item) => {
						const Icon = item.icon;
						const isActive = item.active;

						return (
							<Tooltip.Root
								key={item.key}
								positioning={{
									placement:
										layout === 'vertical' ? 'right' : 'top',
								}}
							>
								<Tooltip.Trigger asChild>
									<IconButton
										aria-label={item.label}
										size="sm"
										variant="ghost"
										borderRadius="14px"
										minW="40px"
										w="40px"
										h="40px"
										color={
											isActive ? 'blue.600' : 'gray.600'
										}
										bg={
											isActive
												? 'rgba(59,130,246,0.12)'
												: 'transparent'
										}
										border="1px solid"
										borderColor={
											isActive
												? 'rgba(59,130,246,0.22)'
												: 'transparent'
										}
										boxShadow={
											isActive
												? '0 4px 14px rgba(59,130,246,0.10), inset 0 1px 0 rgba(255,255,255,0.6)'
												: 'none'
										}
										_hover={{
											bg: isActive
												? 'rgba(59,130,246,0.16)'
												: 'rgba(15,23,42,0.06)',
											color: isActive
												? 'blue.700'
												: 'gray.800',
										}}
										_active={{
											transform: 'scale(0.98)',
										}}
										onClick={() => {
											setCameraPreset(
												item.key as CameraPreset
											);
										}}
									>
										<Icon size={18} />
									</IconButton>
								</Tooltip.Trigger>

								<Portal>
									<Tooltip.Positioner>
										<Tooltip.Content
											px="8px"
											py="4px"
											borderRadius="10px"
											fontSize="12px"
											fontWeight="600"
											bg="gray.900"
											color="white"
											boxShadow="lg"
										>
											{item.label}
										</Tooltip.Content>
									</Tooltip.Positioner>
								</Portal>
							</Tooltip.Root>
						);
					})}
				</Flex>
			)}
		</Box>
	);
}
