import { Flex, Heading, Box, Text } from '@chakra-ui/react';

export function Header() {
	return (
		<Flex
			align="center"
			justify="space-between"
			h="72px"
			px="20px"
			flexShrink={0}
			borderBottom="1px solid"
			borderColor="blackAlpha.100"
			bg="rgba(255,255,255,0.72)"
			backdropFilter="blur(18px) saturate(160%)"
			boxShadow="
				0 1px 2px rgba(16,24,40,0.04),
				inset 0 1px 0 rgba(255,255,255,0.65)
			"
			position="relative"
			overflow="hidden"
			zIndex={10}
		>
			<Box
				position="absolute"
				top="-60px"
				left="50%"
				transform="translateX(-50%)"
				w="220px"
				h="120px"
				borderRadius="full"
				bg="rgba(59,130,246,0.10)"
				filter="blur(36px)"
				pointerEvents="none"
			/>

			<Flex direction="column" position="relative" zIndex={1}>
				<Heading
					size="xl"
					fontWeight="900"
					letterSpacing="-0.04em"
					color="gray.900"
					lineHeight="1"
				>
					Модулайзер
				</Heading>

				<Text
					mt="4px"
					fontSize="11px"
					fontWeight="700"
					color="gray.500"
					letterSpacing="0.08em"
					textTransform="uppercase"
				>
					Решение для порядка
				</Text>
			</Flex>
		</Flex>
	);
}
