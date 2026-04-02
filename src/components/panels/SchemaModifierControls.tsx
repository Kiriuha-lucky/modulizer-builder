import type { ParamSchema } from '@/engine/registry/types';
import type { Modifier } from '@/types/gridfinity';
import { useProjectStore } from '@/store/projectStore';
import { SchemaField } from './SchemaField';
import { Flex } from '@chakra-ui/react';

interface SchemaModifierControlsProps {
	schema: ParamSchema;
	modifier: Modifier;
}

export function SchemaModifierControls({
	schema,
	modifier,
}: SchemaModifierControlsProps) {
	const updateModifierParams = useProjectStore((s) => s.updateModifierParams);

	return (
		<Flex gap={4} direction="column">
			{schema.fields.map((field) => (
				<SchemaField
					key={field.key}
					field={field}
					value={
						(modifier.params as Record<string, unknown>)[field.key]
					}
					onChange={(value) => {
						updateModifierParams(modifier.id, {
							[field.key]: value,
						});
					}}
				/>
			))}
		</Flex>
	);
}
