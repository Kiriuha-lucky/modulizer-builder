import { Label } from '@/components/ui/label';
import { Slider as Slider1 } from '@/components/ui/slider';
import type { DividerGridModifier } from '@/types/gridfinity';
import { useProjectStore } from '@/store/projectStore';
import { Flex, HStack, Slider } from '@chakra-ui/react';

interface DividerGridControlsProps {
	modifier: DividerGridModifier;
}

export function DividerGridControls({ modifier }: DividerGridControlsProps) {
	const updateModifierParams = useProjectStore((s) => s.updateModifierParams);

	return (
		<Flex direction="column" gap={1}>
			{/* Dividers X */}
			<Slider.Root
				id="mod-dividers-x"
				min={0}
				max={9}
				step={1}
				w="full"
				value={[modifier.params.dividersX]}
				onValueChange={(e) =>
					updateModifierParams(modifier.id, {
						dividersX: e?.value?.[0],
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
						Количество перегородок по ширине
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
						<Slider.ValueText />
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
			{/* Dividers Y */}
			<Slider.Root
				id="mod-dividers-y"
				min={0}
				max={9}
				step={1}
				w="full"
				value={[modifier.params.dividersY]}
				onValueChange={(e) =>
					updateModifierParams(modifier.id, {
						dividersY: e?.value?.[0],
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
						Количество перегородок по длине
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
						<Slider.ValueText />
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
			{/* Wall Thickness */}
			<Slider.Root
				id="mod-divider-wall"
				min={0.4}
				max={3}
				step={0.1}
				w="full"
				value={[modifier.params.wallThickness]}
				onValueChange={(e) =>
					updateModifierParams(modifier.id, {
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
						Толщина перегородок
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
						<Slider.ValueText /> мм
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
		</Flex>
	);
}
