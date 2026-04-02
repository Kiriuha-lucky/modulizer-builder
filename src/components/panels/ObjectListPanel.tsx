import { useState } from 'react';
import { Trash2, GripVertical, HelpCircle, Plus } from 'lucide-react';
import { useProjectStore } from '@/store/projectStore';
import { useUIStore } from '@/store/uiStore';
import { objectKindRegistry } from '@/engine/registry/objectKindRegistry';
import {
	Box,
	Flex,
	Center,
	Button,
	Text,
	Heading,
	ScrollArea,
	Show,
	EmptyState,
	VStack,
	IconButton,
	Icon,
	Menu,
	Portal,
} from '@chakra-ui/react';
import { HiColorSwatch } from 'react-icons/hi';

export function ObjectListPanel() {
	const objects = useProjectStore((s) => s.objects);
	const addObject = useProjectStore((s) => s.addObject);
	const removeObject = useProjectStore((s) => s.removeObject);
	const reorderObject = useProjectStore((s) => s.reorderObject);
	const selectedObjectIds = useUIStore((s) => s.selectedObjectIds);
	const selectObject = useUIStore((s) => s.selectObject);
	const setSelectedObjectIds = useUIStore((s) => s.setSelectedObjectIds);

	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);

	const handleDragStart = (e: React.DragEvent, index: number) => {
		e.stopPropagation();
		setDragIndex(index);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/plain', String(index));
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		setDropIndex(index);
	};

	const handleDrop = (e: React.DragEvent, toIndex: number) => {
		e.preventDefault();
		if (dragIndex !== null && dragIndex !== toIndex) {
			reorderObject(dragIndex, toIndex);
		}
		setDragIndex(null);
		setDropIndex(null);
	};

	const handleDragEnd = () => {
		setDragIndex(null);
		setDropIndex(null);
	};

	return (
		<Flex
			direction="column"
			boxSizing={'border-box'}
			p={3}
			w="300px"
			gap={3}
			flexShrink={0}
			borderRadius="8px"
			border="1px solid"
			borderColor="whiteAlpha.300"
			bg="rgba(255,255,255,0.72)"
			backdropFilter="blur(18px) saturate(160%)"
			boxShadow="
				0 1px 2px rgba(16,24,40,0.04),
				0 12px 40px rgba(16,24,40,0.10),
				inset 0 1px 0 rgba(255,255,255,0.65)
			"
			position="relative"
			overflow="hidden"
		>
			<Flex
				position="relative"
				zIndex={1}
				align="start"
				justify="space-between"
				gap={3}
			>
				<Heading
					size="md"
					fontWeight="800"
					letterSpacing="-0.03em"
					color="gray.900"
					lineHeight="1.1"
				>
					Объекты
				</Heading>

				<Center
					h={'28px'}
					w={'28px'}
					borderRadius="full"
					bg="rgba(255,255,255,0.75)"
					border="1px solid"
					borderColor="blackAlpha.100"
					boxShadow="inset 0 1px 0 rgba(255,255,255,0.65)"
				>
					<Text
						fontSize="11px"
						fontWeight="700"
						color="gray.600"
						letterSpacing="0.01em"
					>
						{objects.length}
					</Text>
				</Center>
			</Flex>

			<Box position="relative" zIndex={1}>
				<Menu.Root>
					<Menu.Trigger asChild>
						<Button
							w="full"
							h="46px"
							borderRadius="16px"
							fontWeight="700"
							fontSize="14px"
							color="white"
							bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 55%, #60a5fa 100%)"
							boxShadow="
								0 10px 24px rgba(37,99,235,0.28),
								inset 0 1px 0 rgba(255,255,255,0.18)
							"
							_hover={{
								transform: 'translateY(-1px)',
								boxShadow:
									'0 14px 28px rgba(37,99,235,0.34), inset 0 1px 0 rgba(255,255,255,0.18)',
							}}
							_active={{
								transform: 'translateY(0px) scale(0.99)',
							}}
							transition="all 0.18s ease"
						>
							<Plus size={16} />
							Добавить объект
						</Button>
					</Menu.Trigger>

					<Portal>
						<Menu.Positioner zIndex={2000}>
							<Menu.Content
								w="260px"
								p="6px"
								borderRadius="18px"
								border="1px solid"
								borderColor="whiteAlpha.400"
								bg="rgba(255,255,255,0.88)"
								backdropFilter="blur(18px)"
								boxShadow="
									0 12px 36px rgba(15,23,42,0.14),
									inset 0 1px 0 rgba(255,255,255,0.6)
								"
							>
								{objectKindRegistry
									.getAll()
									.filter(
										(reg) => reg.kind !== 'opengridBoard'
									)
									.map((reg) => {
										return (
											<Menu.Item
												key={reg.kind}
												value={reg.label}
												w="full"
												borderRadius="12px"
												px="12px"
												py="11px"
												fontSize="14px"
												fontWeight="600"
												color="gray.700"
												_hover={{
													bg: 'rgba(59,130,246,0.08)',
													color: 'gray.900',
												}}
												onClick={() => {
													const id = addObject(
														reg.kind
													);
													selectObject(id);
												}}
											>
												{reg.label}
											</Menu.Item>
										);
									})}
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu.Root>
			</Box>

			<Show when={objects.length !== 0}>
				<ScrollArea.Root h="full">
					<ScrollArea.Viewport>
						<ScrollArea.Content>
							<Flex direction="column" gap="8px">
								{objects.map((obj, index) => {
									const CurrentIcon =
										objectKindRegistry.get(obj.kind)
											?.icon ?? HelpCircle;
									const isSelected =
										selectedObjectIds.includes(obj.id);
									const isDragging = dragIndex === index;
									const isDropTarget =
										dropIndex === index &&
										dragIndex !== index;

									return (
										<Flex
											gap="10px"
											shadow={
												isDragging
													? '0 14px 32px rgba(15,23,42,0.16)'
													: isSelected
														? '0 8px 24px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.65)'
														: '0 2px 10px rgba(15,23,42,0.05), inset 0 1px 0 rgba(255,255,255,0.55)'
											}
											bg={
												isDropTarget
													? 'rgba(96,165,250,0.12)'
													: isSelected
														? 'rgba(239,246,255,0.96)'
														: 'rgba(255,255,255,0.72)'
											}
											border="1px solid"
											borderColor={
												isDropTarget
													? 'blue.300'
													: isSelected
														? 'rgba(59,130,246,0.26)'
														: 'rgba(15,23,42,0.06)'
											}
											borderRadius="18px"
											w="full"
											alignItems="center"
											px="12px"
											py="10px"
											key={obj.id}
											role="option"
											aria-selected={isSelected}
											tabIndex={0}
											draggable
											cursor="pointer"
											opacity={isDragging ? 0.82 : 1}
											transform={
												isDragging
													? 'scale(0.985)'
													: 'scale(1)'
											}
											transition="all 0.18s ease"
											_hover={{
												transform: 'translateY(-1px)',
												borderColor: isSelected
													? 'rgba(59,130,246,0.30)'
													: 'rgba(15,23,42,0.10)',
												boxShadow:
													'0 10px 24px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.62)',
											}}
											onDragStart={(e) => {
												handleDragStart(e, index);
											}}
											onDragOver={(e) => {
												handleDragOver(e, index);
											}}
											onDrop={(e) => {
												handleDrop(e, index);
											}}
											onDragEnd={handleDragEnd}
											onClick={(e) => {
												selectObject(
													obj.id,
													e.shiftKey ||
														e.ctrlKey ||
														e.metaKey
												);
											}}
											onKeyDown={(e) => {
												if (
													e.key === 'Enter' ||
													e.key === ' '
												) {
													e.preventDefault();
													selectObject(
														obj.id,
														e.shiftKey ||
															e.ctrlKey ||
															e.metaKey
													);
												}
											}}
										>
											<Flex
												align="center"
												justify="center"
												w="30px"
												h="30px"
												flexShrink={0}
												borderRadius="12px"
												bg="rgba(15,23,42,0.04)"
												color="gray.500"
												cursor="grab"
											>
												<GripVertical size={15} />
											</Flex>

											<Flex
												align="center"
												justify="center"
												w="36px"
												h="36px"
												flexShrink={0}
												borderRadius="14px"
												bg={
													isSelected
														? 'rgba(59,130,246,0.12)'
														: 'rgba(15,23,42,0.05)'
												}
												color={
													isSelected
														? 'blue.600'
														: 'gray.600'
												}
												boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
											>
												<Icon boxSize={4}>
													<CurrentIcon />
												</Icon>
											</Flex>

											<Box flex="1" minW={0}>
												<Text
													fontSize="14px"
													fontWeight="700"
													color="gray.900"
													letterSpacing="-0.015em"
													truncate
												>
													{obj.name}
												</Text>
											</Box>

											<IconButton
												ml="auto"
												variant="ghost"
												size="sm"
												borderRadius="14px"
												color="gray.500"
												bg="transparent"
												aria-label={`Delete ${obj.name}`}
												_hover={{
													bg: 'rgba(239,68,68,0.10)',
													color: 'red.500',
												}}
												_active={{
													bg: 'rgba(239,68,68,0.16)',
												}}
												onClick={(e) => {
													e.stopPropagation();
													if (isSelected) {
														setSelectedObjectIds(
															selectedObjectIds.filter(
																(id) =>
																	id !==
																	obj.id
															)
														);
													}
													removeObject(obj.id);
												}}
											>
												<Trash2 size={16} />
											</IconButton>
										</Flex>
									);
								})}
							</Flex>
						</ScrollArea.Content>
					</ScrollArea.Viewport>

					<ScrollArea.Scrollbar w="10px" p="1px" bg="transparent">
						<ScrollArea.Thumb
							borderRadius="full"
							bg="rgba(15,23,42,0.14)"
						/>
					</ScrollArea.Scrollbar>
					<ScrollArea.Corner />
				</ScrollArea.Root>
			</Show>

			<Show when={objects.length === 0}>
				<Box
					position="relative"
					zIndex={1}
					flex="1"
					display="flex"
					alignItems="center"
					justifyContent="center"
					borderRadius="22px"
					border="1px solid"
					borderColor="whiteAlpha.400"
					bg="rgba(255,255,255,0.42)"
					boxShadow="inset 0 1px 0 rgba(255,255,255,0.55)"
					px={5}
					py={10}
				>
					<EmptyState.Root>
						<EmptyState.Content>
							<EmptyState.Indicator>
								<Flex
									align="center"
									justify="center"
									w="64px"
									h="64px"
									borderRadius="20px"
									bg="linear-gradient(180deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.06) 100%)"
									color="blue.500"
									boxShadow="inset 0 1px 0 rgba(255,255,255,0.7)"
								>
									<HiColorSwatch size={28} />
								</Flex>
							</EmptyState.Indicator>

							<VStack gap={2} textAlign="center">
								<EmptyState.Title
									fontSize="16px"
									fontWeight="800"
									letterSpacing="-0.02em"
									color="gray.900"
								>
									Объекты еще не добавлены
								</EmptyState.Title>
								<EmptyState.Description
									maxW="220px"
									fontSize="13px"
									fontWeight="500"
									color="gray.500"
									lineHeight="1.5"
								>
									Добавьте объект чтобы начать
								</EmptyState.Description>
							</VStack>
						</EmptyState.Content>
					</EmptyState.Root>
				</Box>
			</Show>
		</Flex>
	);
}
