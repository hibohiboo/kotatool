import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  useCallback,
} from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import Cell from './atoms/GardenCell'
import { Gemory } from '~/domain/kakuriyogarden/classes/gemory'
import { getHopeImageUrl, Hope } from '~/domain/kakuriyogarden/classes/hope'

const ImageArea: React.FC<{
  gardenItems: Gemory[]
  hope: Hope
  color: string
  setGardenUrl: Dispatch<string>
}> = ({ gardenItems, color, hope, setGardenUrl }) => {
  const size = 50
  const cellCount = Math.max(...gardenItems.map((i) => i.cards.length))
  const canvasWidth = 2 + cellCount * size
  const canvasHight = 2 + size * (gardenItems.length + 1)

  const [url, setUrl] = useState('')
  const stageRef = useRef(null)
  let firstFlg = true

  const effect = () => {
    const stage = stageRef.current
    const canvas: HTMLCanvasElement = stage.toCanvas()
    setUrl(canvas.toDataURL())
    setGardenUrl(url)

    if (firstFlg) {
      firstFlg = false
      setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
    }
  }
  useEffect(effect)
  const canvasRef = useCallback((node) => {
    if (node) node.getCanvas()._canvas.id = 'terrain-garden'
  }, [])
  return (
    <>
      <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      <div style={{ display: 'none' }}>
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer ref={canvasRef}>
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHight}
              fill={'white'}
            />
            {gardenItems.map((x, i) =>
              x.cards.map((y, j) => (
                <Cell
                  x={1 + j * size}
                  y={1 + i * size}
                  key={`${i}${j}`}
                  color={color}
                  image={y ? y.image.url : null}
                />
              )),
            )}
            <Cell
              x={1 + 0 * size}
              y={1 + gardenItems.length * size}
              color={color}
              image={`/images/kakuriyogarden/icons/game-icons/crystal-growth.svg`}
            />
            <Cell
              x={1 + 1 * size}
              y={1 + gardenItems.length * size}
              color={color}
              image={getHopeImageUrl(hope)}
            />
          </Layer>
        </Stage>
      </div>
    </>
  )
}

export default ImageArea
