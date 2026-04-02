import { BufferGeometry, Shape } from 'three';

import type {
	LabelTabModifierParams,
	ModifierContext,
	GridfinityProfile,
} from '@/types/gridfinity';

import { extrudeShape, mergeGeometries } from '../primitives';

export function generateLabelTab(
	params: LabelTabModifierParams,
	context: ModifierContext,
	_profile: GridfinityProfile
): BufferGeometry {
	const { wall, angle } = params;
	const { innerWidth, innerDepth, wallHeight, floorY, centerX, centerZ } =
		context;

	const height = Math.min(params.height, wallHeight * 0.4);

	const isXWall = wall === 'front' || wall === 'back';
	const span = isXWall ? innerWidth : innerDepth;

	if (height <= 0 || span <= 0) return new BufferGeometry();

	const tabBaseY = floorY + wallHeight * 0.6;

	const safeAngle = Math.max(5, Math.min(85, angle));
	const angleRad = (safeAngle * Math.PI) / 180;
	const maxTabDepth = isXWall ? innerDepth : innerWidth;
	const tabDepthVal = Math.min(height / Math.tan(angleRad), maxTabDepth);

	// Верх всегда горизонтальный, снизу диагональная подпорка
	const wedgeShape = new Shape();
	wedgeShape.moveTo(0, 0);
	wedgeShape.lineTo(0, height);
	wedgeShape.lineTo(tabDepthVal, height);
	wedgeShape.lineTo(0, 0);

	const geo = extrudeShape(wedgeShape, span);

	switch (wall) {
		case 'front': {
			geo.rotateZ(Math.PI / 2);
			geo.rotateX(Math.PI / 2);
			geo.translate(
				centerX + span / 2,
				tabBaseY,
				centerZ - innerDepth / 2
			);
			break;
		}
		case 'back': {
			geo.rotateZ(-Math.PI / 2);
			geo.rotateX(Math.PI / 2);
			geo.translate(
				centerX - span / 2,
				tabBaseY,
				centerZ + innerDepth / 2
			);
			break;
		}
		case 'left': {
			geo.rotateX(Math.PI / 2);
			geo.translate(
				centerX - innerWidth / 2,
				tabBaseY,
				centerZ - span / 2
			);
			break;
		}
		case 'right': {
			geo.rotateX(Math.PI / 2);
			geo.rotateY(Math.PI);
			geo.translate(
				centerX + innerWidth / 2,
				tabBaseY,
				centerZ + span / 2
			);
			break;
		}
	}

	const geometries = [geo];
	const result = mergeGeometries(geometries);
	for (const g of geometries) g.dispose();

	return result;
}
