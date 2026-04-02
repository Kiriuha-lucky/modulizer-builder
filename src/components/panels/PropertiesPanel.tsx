import { useProjectStore } from '@/store/projectStore';
import { useUIStore } from '@/store/uiStore';
import { objectKindRegistry } from '@/engine/registry/objectKindRegistry';
import type { ObjectPropertiesComponentProps } from '@/engine/registry/types';
import { Flex, Heading, ScrollArea, Show, Text } from '@chakra-ui/react';

export function PropertiesPanel() {
	const objects = useProjectStore((s) => s.objects);
	const selectedObjectIds = useUIStore((s) => s.selectedObjectIds);

	const selectedObjects = selectedObjectIds
		.map((id) => objects.find((o) => o.id === id))
		.filter(Boolean);

	const singleSelected =
		selectedObjects.length === 1 ? selectedObjects[0] : null;

	return (
		<Flex
			direction="column"
			boxSizing="border-box"
			p={3}
			w="300px"
			h="100%"
			minH={0}
			gap={3}
			flexShrink={0}
			flexGrow={0}
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
			<Heading
				size="md"
				fontWeight="800"
				letterSpacing="-0.03em"
				color="gray.900"
				lineHeight="1.1"
			>
				Настройки объекта {singleSelected?.name}
			</Heading>

			<ScrollArea.Root>
				<ScrollArea.Viewport>
					<ScrollArea.Content>
						<Show when={selectedObjects.length === 0}>
							<Text>
								Выберите объект, чтобы просмотреть его свойства.
							</Text>
						</Show>
						<Show when={selectedObjects.length > 1}>
							<Text>
								Выделено {selectedObjects.length} объекта.
							</Text>
						</Show>
						<Show when={singleSelected && true && true}>
							{/*<div className="mb-4">*/}
							{/*	<span className="text-sm font-medium">*/}
							{/*		{singleSelected?.name}*/}
							{/*	</span>*/}
							{/*	<span className="ml-2 text-xs text-muted-foreground">*/}
							{/*		({singleSelected?.kind})*/}
							{/*	</span>*/}
							{/*</div>*/}
							{/*Kind-specific properties*/}
							{(() => {
								const reg =
									singleSelected &&
									objectKindRegistry.get(singleSelected.kind);
								if (!reg && singleSelected) {
									return (
										<div className="text-xs text-muted-foreground">
											Неизвестный тип объекта:{' '}
											{singleSelected.kind}
										</div>
									);
								}
								if (reg?.PropertiesComponent) {
									const props = {
										object: singleSelected,
									} as unknown as ObjectPropertiesComponentProps;
									return (
										<reg.PropertiesComponent {...props} />
									);
								}
								// if (reg?.propertiesSchema && singleSelected) {
								// 	return (
								// 		<SchemaPropertiesPanel
								// 			schema={reg.propertiesSchema}
								// 			object={singleSelected}
								// 		/>
								// 	);
								// }
								return null;
							})()}
						</Show>
					</ScrollArea.Content>
				</ScrollArea.Viewport>

				<ScrollArea.Scrollbar p="1px" bg="transparent">
					<ScrollArea.Thumb
						borderRadius="full"
						bg="rgba(15,23,42,0.14)"
					/>
				</ScrollArea.Scrollbar>
				<ScrollArea.Corner />
			</ScrollArea.Root>

			{/*<ScrollArea className="flex-1">*/}
			{/*  */}
			{/*  <div className="p-3">*/}
			{/*    {selectedObjects.length === 0 ? (*/}
			{/*      <div className="py-8 text-center text-xs text-muted-foreground">*/}
			{/*        Select an object to view its properties.*/}
			{/*      </div>*/}
			{/*    ) : selectedObjects.length > 1 ? (*/}
			{/*      <div className="py-8 text-center text-xs text-muted-foreground">*/}
			{/*        {selectedObjects.length} objects selected*/}
			{/*      </div>*/}
			{/*    ) : (*/}
			{/*      singleSelected && (*/}
			{/*        <>*/}
			{/*          /!* Object name *!/*/}
			{/*          <div className="mb-4">*/}
			{/*            <span className="text-sm font-medium">*/}
			{/*              {singleSelected.name}*/}
			{/*            </span>*/}
			{/*            <span className="ml-2 text-xs text-muted-foreground">*/}
			{/*              ({singleSelected.kind})*/}
			{/*            </span>*/}
			{/*          </div>*/}

			{/*          /!* Kind-specific properties *!/*/}
			{/*          {(() => {*/}
			{/*            const reg = objectKindRegistry.get(singleSelected.kind);*/}
			{/*            if (!reg) {*/}
			{/*              return (*/}
			{/*                <div className="text-xs text-muted-foreground">*/}
			{/*                  Unknown object kind: {singleSelected.kind}*/}
			{/*                </div>*/}
			{/*              );*/}
			{/*            }*/}
			{/*            if (reg.PropertiesComponent) {*/}
			{/*              const props = {*/}
			{/*                object: singleSelected,*/}
			{/*              } as unknown as ObjectPropertiesComponentProps;*/}
			{/*              return <reg.PropertiesComponent {...props} />;*/}
			{/*            }*/}
			{/*            if (reg.propertiesSchema) {*/}
			{/*              return (*/}
			{/*                <SchemaPropertiesPanel*/}
			{/*                  schema={reg.propertiesSchema}*/}
			{/*                  object={singleSelected}*/}
			{/*                />*/}
			{/*              );*/}
			{/*            }*/}
			{/*            return null;*/}
			{/*          })()}*/}
			{/*        </>*/}
			{/*      )*/}
			{/*    )}*/}
			{/*  </div>*/}
			{/*</ScrollArea>*/}
		</Flex>
	);
}
