import { BufferGeometry, ExtrudeGeometry, Shape, Vector2 } from 'three';

import type {
	ScoopModifierParams,
	ModifierContext,
	GridfinityProfile,
} from '@/types/gridfinity';

import { getCurveSegments } from '../primitives';

function createScoopProfile(radius: number, segments: number): Shape {
	const r = radius;
	const points: Vector2[] = [];

	// Профиль вогнутой выемки:
	// x = от стенки внутрь
	// y = от пола вверх
	points.push(new Vector2(0, 0));
	points.push(new Vector2(r, 0));

	for (let i = 0; i <= segments; i++) {
		const t = i / segments;
		const angle = -Math.PI / 2 - (Math.PI / 2) * t;
		const x = r + Math.cos(angle) * r;
		const y = r + Math.sin(angle) * r;
		points.push(new Vector2(x, y));
	}

	points.push(new Vector2(0, r));
	points.push(new Vector2(0, 0));

	return new Shape(points);
}

export function generateScoop(
	params: ScoopModifierParams,
	context: ModifierContext,
	_profile: GridfinityProfile
): BufferGeometry {
	const { wall, radius: explicitRadius } = params;
	const { innerWidth, innerDepth, wallHeight, floorY, centerX, centerZ } =
		context;

	if (wallHeight <= 0) return new BufferGeometry();

	const isFrontBack = wall === 'front' || wall === 'back';
	const span = isFrontBack ? innerWidth : innerDepth;

	if (span <= 0) return new BufferGeometry();

	const radius = explicitRadius > 0 ? explicitRadius : wallHeight * 0.35;
	const r = Math.min(radius, wallHeight * 0.8, span * 0.25);

	if (r <= 0) return new BufferGeometry();

	const curveSegments = Math.max(16, getCurveSegments() * 2);
	const shape = createScoopProfile(r, curveSegments);

	const geo = new ExtrudeGeometry(shape, {
		depth: span,
		bevelEnabled: false,
		curveSegments,
		steps: 1,
	});

	// От 0..span в симметричный диапазон -span/2..+span/2
	geo.translate(0, 0, -span / 2);

	switch (wall) {
		case 'front': {
			// x -> внутрь по +Z
			// y -> вверх по +Y
			// z -> вдоль X
			geo.rotateY(-Math.PI / 2);
			geo.translate(centerX, floorY, centerZ - innerDepth / 2);
			break;
		}

		case 'back': {
			// x -> внутрь по -Z
			// y -> вверх по +Y
			// z -> вдоль X
			geo.rotateY(Math.PI / 2);
			geo.translate(centerX, floorY, centerZ + innerDepth / 2);
			break;
		}

		case 'left': {
			// x -> внутрь по +X
			// y -> вверх по +Y
			// z -> вдоль Z
			geo.translate(centerX - innerWidth / 2, floorY, centerZ);
			break;
		}

		case 'right': {
			// x -> внутрь по -X
			// y -> вверх по +Y
			// z -> вдоль Z
			geo.rotateY(Math.PI);
			geo.translate(centerX + innerWidth / 2, floorY, centerZ);
			break;
		}
	}

	geo.computeVertexNormals();
	return geo;
}
