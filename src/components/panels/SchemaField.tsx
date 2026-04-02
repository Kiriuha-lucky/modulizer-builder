import { Label } from '@/components/ui/label';

import {
	Select as Select1,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import type { ParamField } from '@/engine/registry/types';
import {
	Flex,
	HStack,
	Slider,
	Switch,
	Select,
	Portal,
	createListCollection,
} from '@chakra-ui/react';

export interface SchemaFieldProps {
	field: ParamField;
	value: unknown;
	onChange: (value: unknown) => void;
}

export function SchemaField({ field, value, onChange }: SchemaFieldProps) {
	const fieldId = `schema-field-${field.key}`;

	switch (field.type) {
		case 'slider': {
			const numValue =
				typeof value === 'number' && isFinite(value)
					? value
					: field.min;
			const displayValue =
				field.precision !== undefined && isFinite(numValue)
					? numValue.toFixed(field.precision)
					: String(numValue);
			return (
				<Slider.Root
					id={fieldId}
					min={field.min}
					max={field.max}
					step={field.step}
					w="full"
					value={[numValue]}
					onValueChange={(e) => {
						return onChange(e?.value?.[0]);
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
							{field.label}
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
							<Slider.ValueText />({displayValue}
							{field.unit ?? ''})
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
			);
		}
		case 'switch': {
			const boolValue = typeof value === 'boolean' ? value : false;
			return (
				<Switch.Root
					id={fieldId}
					checked={boolValue}
					onCheckedChange={(e) => onChange(e.checked)}
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
						{field.label}
					</Switch.Label>
					<Flex align="center" gap={2}>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
					</Flex>
				</Switch.Root>

				// <div className="flex items-center justify-between">
				// 	<Label htmlFor={fieldId} className="text-xs">
				// 		{field.label}
				// 	</Label>
				//
				// 	<Switch
				// 		id={fieldId}
				// 		checked={boolValue}
				// 		onCheckedChange={(checked) => {
				// 			onChange(checked);
				// 		}}
				// 	/>
				// </div>
			);
		}
		case 'select': {
			const strValue = typeof value === 'string' ? [value] : [''];
			const entities = createListCollection({
				items: field.options,
			});
			return (
				<Select.Root
					collection={entities}
					value={strValue}
					onValueChange={(e) => {
						onChange(e?.value?.[0]);
					}}
				>
					<Select.HiddenSelect />
					<Select.Label>{field.label}</Select.Label>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{entities.items.map((framework) => (
									<Select.Item
										item={framework}
										key={framework.value}
									>
										{framework.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			);
		}
		case 'number': {
			const numValue = typeof value === 'number' ? value : 0;
			return (
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor={fieldId} className="text-xs">
							{field.label}
						</Label>
						<span className="text-xs tabular-nums text-muted-foreground">
							{numValue}
							{field.unit ?? ''}
						</span>
					</div>
					<input
						id={fieldId}
						type="number"
						value={numValue}
						onChange={(e) => {
							const parsed = Number(e.target.value);
							if (e.target.value === '' || Number.isNaN(parsed))
								return;
							let clamped = parsed;
							if (field.min !== undefined)
								clamped = Math.max(field.min, clamped);
							if (field.max !== undefined)
								clamped = Math.min(field.max, clamped);
							onChange(clamped);
						}}
						min={field.min}
						max={field.max}
						step={field.step}
						className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
					/>
				</div>
			);
		}
	}
}
