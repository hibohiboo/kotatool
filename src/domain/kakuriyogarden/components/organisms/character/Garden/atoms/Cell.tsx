import React from 'react'
import { Rect } from 'react-konva'
const cellSize = 50
const Cell = ({ x, y, color }: { x: number; y: number; color: string }) => (
  <Rect
    x={x}
    y={y}
    width={cellSize}
    height={cellSize}
    fill={color}
    stroke={'black'}
    strokeWidth={2}
  />
)

export default Cell
