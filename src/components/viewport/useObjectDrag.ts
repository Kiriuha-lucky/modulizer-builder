import { useMemo, useRef, useState } from 'react'
import type { Group, Intersection } from 'three'
import { Plane, Vector3 } from 'three'
import { useThree } from '@react-three/fiber'
import { useProjectStore } from '@/store/projectStore'
import { useUIStore } from '@/store/uiStore'
import { useProfileStore } from '@/store/profileStore'
import { snapObjectToGrid } from '@/engine/snapping'

interface UseObjectDragParams {
  objectId: string
  objectRef: React.RefObject<Group | null>
  isSelected: boolean
  basePosition: [number, number, number]
  gridWidth?: number
  gridDepth?: number
}

type R3FPointerEventLike = {
  stopPropagation: () => void
  ray: {
    intersectPlane: (plane: Plane, target: Vector3) => Vector3 | null
  }
  point: Vector3
  pointerId: number
  target: {
    setPointerCapture?: (pointerId: number) => void
    releasePointerCapture?: (pointerId: number) => void
  }
  intersections: Intersection[]
}

export function useObjectDrag({
  objectId,
  objectRef,
  isSelected,
  basePosition,
  gridWidth,
  gridDepth,
}: UseObjectDragParams) {
  const updateObjectPosition = useProjectStore((s) => s.updateObjectPosition)
  const snapEnabled = useUIStore((s) => s.snapToGrid)
  const gridSize = useProfileStore((s) => s.activeProfile.gridSize)
  const orbitControls = useThree((s) => s.controls)

  const [dragging, setDragging] = useState(false)

  const dragPlane = useMemo(() => new Plane(), [])
  const planeHit = useMemo(() => new Vector3(), [])
  const pointerOffset = useRef(new Vector3())
  const dragStartWorld = useRef<[number, number, number]>(basePosition)
  const lastPosition = useRef<[number, number, number]>(basePosition)

  const setOrbitEnabled = (enabled: boolean) => {
    if (orbitControls && 'enabled' in orbitControls) {
      ;(orbitControls as { enabled: boolean }).enabled = enabled
    }
  }

  const startDrag = (e: R3FPointerEventLike) => {
    if (!isSelected) return
    if (!objectRef.current) return

    e.stopPropagation()

    const worldY = objectRef.current.position.y

    dragPlane.set(new Vector3(0, 1, 0), -worldY)

    if (!e.ray.intersectPlane(dragPlane, planeHit)) return

    dragStartWorld.current = [
      objectRef.current.position.x,
      objectRef.current.position.y,
      objectRef.current.position.z,
    ]

    pointerOffset.current.set(
      objectRef.current.position.x - planeHit.x,
      0,
      objectRef.current.position.z - planeHit.z,
    )

    lastPosition.current = dragStartWorld.current
    setDragging(true)
    setOrbitEnabled(false)
    e.target.setPointerCapture?.(e.pointerId)
  }

  const moveDrag = (e: R3FPointerEventLike) => {
    if (!dragging) return
    if (!objectRef.current) return

    e.stopPropagation()

    if (!e.ray.intersectPlane(dragPlane, planeHit)) return

    let nextPos: [number, number, number] = [
      planeHit.x + pointerOffset.current.x,
      objectRef.current.position.y,
      planeHit.z + pointerOffset.current.z,
    ]

    if (snapEnabled && gridWidth != null && gridDepth != null) {
      nextPos = snapObjectToGrid(nextPos, gridSize, gridWidth, gridDepth)
    }

    objectRef.current.position.set(nextPos[0], nextPos[1], nextPos[2])
    lastPosition.current = nextPos
  }

  const endDrag = (e?: Partial<R3FPointerEventLike>) => {
    if (!dragging) return

    e?.stopPropagation?.()
    setDragging(false)
    setOrbitEnabled(true)

    e?.target?.releasePointerCapture?.(e.pointerId as number)

    updateObjectPosition(objectId, lastPosition.current)
  }

  return {
    dragging,
    bindDrag: {
      onPointerDown: startDrag,
      onPointerMove: moveDrag,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
    },
  }
}
