import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Modifier } from '@/types/gridfinity';
import { useProjectStore } from '@/store/projectStore';
import { cn } from '@/lib/utils';
import { modifierKindRegistry } from '@/engine/registry/modifierKindRegistry';
import type { ModifierControlsComponentProps } from '@/engine/registry/types';
import { SchemaModifierControls } from './SchemaModifierControls';
import {
	Button,
	Box,
	CloseButton,
	Flex,
	Heading,
	Menu,
	Portal,
} from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip.tsx';

interface ModifierSectionProps {
	parentId: string;
	depth?: number;
}

export function ModifierSection({ parentId, depth = 0 }: ModifierSectionProps) {
	const allModifiers = useProjectStore((s) => s.modifiers);
	const modifiers = useMemo(
		() => allModifiers.filter((m) => m.parentId === parentId),
		[allModifiers, parentId]
	);
	const addModifier = useProjectStore((s) => s.addModifier);
	const removeModifier = useProjectStore((s) => s.removeModifier);
	const reorderModifier = useProjectStore((s) => s.reorderModifier);

	const [dragIndex, setDragIndex] = useState<number | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);

	const handleDragStart = (e: React.DragEvent, index: number) => {
		e.stopPropagation();
		setDragIndex(index);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData(
			'application/x-reactfinity-modifier',
			String(index)
		);
	};

	const handleDragOver = (e: React.DragEvent, index: number) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'move';
		setDropIndex(index);
	};

	const handleDrop = (e: React.DragEvent, toIndex: number) => {
		e.preventDefault();
		e.stopPropagation();
		if (dragIndex !== null && dragIndex !== toIndex) {
			reorderModifier(parentId, dragIndex, toIndex);
		}
		setDragIndex(null);
		setDropIndex(null);
	};

	const handleDragEnd = () => {
		setDragIndex(null);
		setDropIndex(null);
	};

	return (
		<Box w={'full'} flexGrow={0}>
			<Flex justifyContent={'space-between'} alignItems={'center'}>
				<Heading size={'lg'}>
					{depth === 0 ? 'Дополнительные опции' : 'Sub-modifiers'}
				</Heading>

				<Menu.Root>
					<Menu.Trigger asChild>
						<Button
							w="25px"
							h="25px"
							minW="25px"
							p="0"
							borderRadius="full"
							display="flex"
							alignItems="center"
							justifyContent="center"
							flexGrow={0}
							flexShrink={0}
							fontWeight="700"
							fontSize="12px"
							color="white"
							bg="linear-gradient(135deg, #2563eb 0%, #3b82f6 55%, #60a5fa 100%)"
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
							<Tooltip content="Добавить модификацию">
								<Plus size={8} />
							</Tooltip>
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
								{modifierKindRegistry.getAll().map((reg) => {
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
											onClick={() =>
												addModifier(parentId, reg.kind)
											}
										>
											{reg.label}
										</Menu.Item>
									);
								})}
							</Menu.Content>
						</Menu.Positioner>
					</Portal>
				</Menu.Root>
			</Flex>

			{/*{modifiers.length === 0 && (*/}
			{/*	<Text>*/}
			{/*		No modifiers added.*/}
			{/*	</Text>*/}
			{/*)}*/}

			{modifiers.map((modifier, index) => (
				<ModifierCard
					key={modifier.id}
					modifier={modifier}
					index={index}
					depth={depth}
					isDragging={dragIndex === index}
					isDropTarget={dropIndex === index && dragIndex !== index}
					onRemove={() => {
						removeModifier(modifier.id);
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
				/>
			))}
		</Box>
	);
}

interface ModifierCardProps {
	modifier: Modifier;
	index: number;
	depth?: number;
	isDragging: boolean;
	isDropTarget: boolean;
	onRemove: () => void;
	onDragStart: (e: React.DragEvent) => void;
	onDragOver: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
	onDragEnd: () => void;
}

function ModifierCard({
	modifier,
	isDragging,
	isDropTarget,
	onRemove,
	onDragStart,
	onDragOver,
	onDrop,
	onDragEnd,
}: ModifierCardProps) {
	return (
		<Box
			draggable={false}
			onDragStart={onDragStart}
			onDragOver={onDragOver}
			onDrop={onDrop}
			onDragEnd={onDragEnd}
			className={cn(
				'mt-2 rounded-md border border-border p-2',
				isDragging && 'opacity-40',
				isDropTarget && 'border-t-2 border-t-primary'
			)}
			data-testid={`modifier-${modifier.kind}`}
		>
			<Flex justifyContent="space-between" alignItems="center">
				<Heading size={'md'}>
					{modifierKindRegistry.get(modifier.kind)?.label ??
						modifier.kind}
				</Heading>
				<Tooltip
					content={`Удалить модификатор "${modifierKindRegistry.get(modifier.kind)?.label ?? modifier.kind}"`}
				>
					<CloseButton onClick={onRemove} />
				</Tooltip>
			</Flex>

			<ModifierControls modifier={modifier} />
		</Box>
	);
}

function ModifierControls({ modifier }: { modifier: Modifier }) {
	const reg = modifierKindRegistry.get(modifier.kind);
	if (!reg) return null;
	if (reg.ControlsComponent) {
		const props = { modifier } as unknown as ModifierControlsComponentProps;
		return <reg.ControlsComponent {...props} />;
	}
	if (reg.controlsSchema) {
		return (
			<SchemaModifierControls
				schema={reg.controlsSchema}
				modifier={modifier}
			/>
		);
	}
	return null;
}
