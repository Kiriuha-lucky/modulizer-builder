import { ModifierSection } from './ModifierSection';
import type { BinObject } from '@/types/gridfinity';
import { useProjectStore } from '@/store/projectStore';
import { useProfileStore } from '@/store/profileStore';
import { getBinDimensions } from '@/engine/geometry/bin';
import {
	Flex,
	Heading,
	HStack,
	Slider,
	Switch,
	Text,
	Box,
} from '@chakra-ui/react';

interface BinPropertiesProps {
	object: BinObject;
}

export function BinProperties({ object }: BinPropertiesProps) {
	const updateObjectParams = useProjectStore((s) => s.updateObjectParams);
	const activeProfile = useProfileStore((s) => s.activeProfile);
	const dims = getBinDimensions(object.params, activeProfile);

	return (
		<Flex direction="column" gap={1}>
			<Box
				p="7px"
				borderRadius="18px"
				bg="rgba(255,255,255,0.46)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
			>
				<Text
					fontSize="10px"
					fontWeight="700"
					color="gray.500"
					textTransform="uppercase"
					letterSpacing="0.08em"
					mb="4px"
				>
					Габаритные размеры
				</Text>
				<Heading
					size="md"
					fontWeight="800"
					letterSpacing="-0.03em"
					color="gray.900"
					lineHeight="1.1"
				>
					{dims.width} x {dims.depth} x {dims.height} mm
				</Heading>
			</Box>

			{/*<ProfileSelector />*/}

			{/* Grid Width */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Slider.Root
					id="bin-grid-width"
					min={1}
					max={6}
					step={1}
					w="full"
					value={[object.params.gridWidth]}
					onValueChange={(e) =>
						updateObjectParams(object.id, {
							gridWidth: e?.value?.[0],
						})
					}
				>
					<HStack
						alignItems="center"
						w="full"
						justifyContent="space-between"
						mb="8px"
					>
						<Slider.Label
							fontSize="12px"
							fontWeight="700"
							color="gray.800"
							letterSpacing="-0.01em"
						>
							Ширина модуля
						</Slider.Label>
						<Flex
							fontSize="11px"
							fontWeight="700"
							color="gray.500"
							bg="rgba(255,255,255,0.72)"
							border="1px solid"
							borderColor="blackAlpha.100"
							borderRadius="full"
							px="8px"
							h="24px"
							align="center"
							gap="4px"
							boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
							whiteSpace="nowrap"
						>
							<Slider.ValueText />({dims.width}mm)
						</Flex>
					</HStack>
					<Slider.Control>
						<Slider.Track
							h="6px"
							borderRadius="full"
							bg="rgba(15,23,42,0.08)"
							boxShadow="inset 0 1px 2px rgba(15,23,42,0.08)"
						>
							<Slider.Range
								bg="linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
								borderRadius="full"
							/>
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>

			{/* Grid Depth */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Slider.Root
					id="bin-grid-depth"
					min={1}
					max={6}
					step={1}
					w="full"
					value={[object.params.gridDepth]}
					onValueChange={(e) =>
						updateObjectParams(object.id, {
							gridDepth: e?.value?.[0],
						})
					}
				>
					<HStack
						alignItems="center"
						w="full"
						justifyContent="space-between"
						mb="8px"
					>
						<Slider.Label
							fontSize="12px"
							fontWeight="700"
							color="gray.800"
							letterSpacing="-0.01em"
						>
							Длина модуля
						</Slider.Label>
						<Flex
							fontSize="11px"
							fontWeight="700"
							color="gray.500"
							bg="rgba(255,255,255,0.72)"
							border="1px solid"
							borderColor="blackAlpha.100"
							borderRadius="full"
							px="8px"
							h="24px"
							align="center"
							gap="4px"
							boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
							whiteSpace="nowrap"
						>
							<Slider.ValueText />({dims.depth}mm)
						</Flex>
					</HStack>
					<Slider.Control>
						<Slider.Track
							h="6px"
							borderRadius="full"
							bg="rgba(15,23,42,0.08)"
							boxShadow="inset 0 1px 2px rgba(15,23,42,0.08)"
						>
							<Slider.Range
								bg="linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
								borderRadius="full"
							/>
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>

			{/* Height Units */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Slider.Root
					id="bin-grid-depth"
					min={1}
					max={30}
					step={1}
					w="full"
					value={[object.params.heightUnits]}
					onValueChange={(e) =>
						updateObjectParams(object.id, {
							heightUnits: e?.value?.[0],
						})
					}
				>
					<HStack
						alignItems="center"
						w="full"
						justifyContent="space-between"
						mb="8px"
					>
						<Slider.Label
							fontSize="12px"
							fontWeight="700"
							color="gray.800"
							letterSpacing="-0.01em"
						>
							Высота модуля
						</Slider.Label>
						<Flex
							fontSize="11px"
							fontWeight="700"
							color="gray.500"
							bg="rgba(255,255,255,0.72)"
							border="1px solid"
							borderColor="blackAlpha.100"
							borderRadius="full"
							px="8px"
							h="24px"
							align="center"
							gap="4px"
							boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
							whiteSpace="nowrap"
						>
							<Slider.ValueText />({dims.height}mm)
						</Flex>
					</HStack>
					<Slider.Control>
						<Slider.Track
							h="6px"
							borderRadius="full"
							bg="rgba(15,23,42,0.08)"
							boxShadow="inset 0 1px 2px rgba(15,23,42,0.08)"
						>
							<Slider.Range
								bg="linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
								borderRadius="full"
							/>
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>

			{/* Stacking Lip */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Switch.Root
					id="bin-stacking-lip"
					checked={object.params.stackingLip}
					onCheckedChange={(e) =>
						updateObjectParams(object.id, {
							stackingLip: e.checked,
						})
					}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					w="full"
				>
					<Switch.Label
						fontSize="12px"
						fontWeight="700"
						color="gray.800"
						letterSpacing="-0.01em"
					>
						Стыковочный бортик
					</Switch.Label>
					<Flex align="center" gap={2}>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
					</Flex>
				</Switch.Root>
			</Box>

			{/* Wall Thickness */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Slider.Root
					id="bin-wall-thickness"
					min={0.4}
					max={3}
					step={0.1}
					w="full"
					value={[+object.params.wallThickness.toFixed(1)]}
					onValueChange={(e) =>
						updateObjectParams(object.id, {
							wallThickness: Math.round(e?.value?.[0] * 10) / 10,
						})
					}
				>
					<HStack
						alignItems="center"
						w="full"
						justifyContent="space-between"
						mb="8px"
					>
						<Slider.Label
							fontSize="12px"
							fontWeight="700"
							color="gray.800"
							letterSpacing="-0.01em"
						>
							Толщина стенок
						</Slider.Label>
						<Flex
							fontSize="11px"
							fontWeight="700"
							color="gray.500"
							bg="rgba(255,255,255,0.72)"
							border="1px solid"
							borderColor="blackAlpha.100"
							borderRadius="full"
							px="8px"
							h="24px"
							align="center"
							gap="4px"
							boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
							whiteSpace="nowrap"
						>
							<Slider.ValueText />(
							{object.params.wallThickness.toFixed(1)}mm)
						</Flex>
					</HStack>
					<Slider.Control>
						<Slider.Track
							h="6px"
							borderRadius="full"
							bg="rgba(15,23,42,0.08)"
							boxShadow="inset 0 1px 2px rgba(15,23,42,0.08)"
						>
							<Slider.Range
								bg="linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
								borderRadius="full"
							/>
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>

			{/* Inner Fillet */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Slider.Root
					id="bin-inner-fillet"
					min={0}
					max={3}
					step={0.5}
					w="full"
					value={[object.params.innerFillet]}
					onValueChange={(e) => {
						return updateObjectParams(object.id, {
							innerFillet: Math.round(e?.value?.[0] * 10) / 10,
						});
					}}
				>
					<HStack
						alignItems="center"
						w="full"
						justifyContent="space-between"
						mb="8px"
					>
						<Slider.Label
							fontSize="12px"
							fontWeight="700"
							color="gray.800"
							letterSpacing="-0.01em"
						>
							Внешнее скругление
						</Slider.Label>
						<Flex
							fontSize="11px"
							fontWeight="700"
							color="gray.500"
							bg="rgba(255,255,255,0.72)"
							border="1px solid"
							borderColor="blackAlpha.100"
							borderRadius="full"
							px="8px"
							h="24px"
							align="center"
							gap="4px"
							boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
							whiteSpace="nowrap"
						>
							<Slider.ValueText />(
							{object.params.innerFillet === 0
								? 'None'
								: `${object.params.innerFillet.toFixed(1)}mm`}
							)
						</Flex>
					</HStack>
					<Slider.Control>
						<Slider.Track
							h="6px"
							borderRadius="full"
							bg="rgba(15,23,42,0.08)"
							boxShadow="inset 0 1px 2px rgba(15,23,42,0.08)"
						>
							<Slider.Range
								bg="linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)"
								borderRadius="full"
							/>
						</Slider.Track>
						<Slider.Thumbs />
					</Slider.Control>
				</Slider.Root>
			</Box>

			{/* Base Options */}
			<Heading
				size="md"
				fontWeight="800"
				letterSpacing="-0.03em"
				color="gray.900"
				mt={1}
				mb={-1}
			>
				Настройки базы модуля
			</Heading>

			{/* Magnet Holes */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Switch.Root
					id="bin-magnet-holes"
					checked={object.params.magnetHoles}
					onCheckedChange={(e) =>
						updateObjectParams(object.id, {
							magnetHoles: e.checked,
						})
					}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					w="full"
				>
					<Switch.Label
						fontSize="12px"
						fontWeight="700"
						color="gray.800"
						letterSpacing="-0.01em"
					>
						Отверстия под магниты
					</Switch.Label>
					<Flex align="center" gap={2}>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
					</Flex>
				</Switch.Root>
			</Box>

			{/* Weight Holes */}
			<Box
				p="7px"
				borderRadius="16px"
				bg="rgba(255,255,255,0.40)"
				border="1px solid"
				borderColor="whiteAlpha.400"
				boxShadow="inset 0 1px 0 rgba(255,255,255,0.5)"
			>
				<Switch.Root
					id="bin-weight-holes"
					checked={object.params.weightHoles}
					onCheckedChange={(e) =>
						updateObjectParams(object.id, {
							weightHoles: e.checked,
						})
					}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					w="full"
				>
					<Switch.Label
						fontSize="12px"
						fontWeight="700"
						color="gray.800"
						letterSpacing="-0.01em"
					>
						Отверстия под утяжелитель
					</Switch.Label>
					<Flex align="center" gap={2}>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
					</Flex>
				</Switch.Root>
			</Box>

			{/* Honeycomb Base */}
			{/*<div className="flex items-center justify-between">*/}
			{/*  <Label htmlFor="bin-honeycomb-base" className="text-xs">*/}
			{/*    Honeycomb Base*/}
			{/*  </Label>*/}
			{/*  <Switch1*/}
			{/*    id="bin-honeycomb-base"*/}
			{/*    checked={object.params.honeycombBase}*/}
			{/*    onCheckedChange={(checked) => {*/}
			{/*      updateObjectParams(object.id, {*/}
			{/*        honeycombBase: checked,*/}
			{/*      });*/}
			{/*    }}*/}
			{/*  />*/}
			{/*</div>*/}

			<ModifierSection parentId={object.id} />
		</Flex>
	);
}
