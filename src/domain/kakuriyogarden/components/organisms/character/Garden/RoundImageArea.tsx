import React, { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'
import Image from 'next/image'
import URLImage from './atoms/CellImage'
import TimeCell from './atoms/TimeCell'
import Hidden from '@material-ui/core/Hidden'

const ImageArea: React.FC = () => {
  const cellCount = 13
  const canvasWidth = 0 + cellCount * 50
  const canvasHight = 100

  const [url, setUrl] = useState('')
  const stageRef = useRef(null)
  let firstFlg = true

  const effect = () => {
    const stage = stageRef.current
    const canvas: HTMLCanvasElement = stage.toCanvas()
    setUrl(canvas.toDataURL())

    if (firstFlg) {
      firstFlg = false
      setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
    }
  }
  useEffect(effect)

  return (
    <>
      <Hidden mdUp implementation="css">
        {/* {!url ? (
          <></>
        ) : (
          <Image className="sample-image" src={url} layout="fill" alt="" />
        )} */}
      </Hidden>
      <Hidden smDown implementation="css">
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHight}
              fill={'white'}
            />
            {Array(cellCount)
              .fill(0)
              .map((x, i) => (
                <TimeCell
                  x={1 + i * 50}
                  y={50}
                  key={i}
                  color={'yellow'}
                  text={i === 0 ? '' : (13 - i).toString()}
                />
              ))}
            <URLImage
              src={'/images/kakuriyogarden/icons/icooon/time.svg'}
              x={0}
              y={50}
              scale={1}
              size={50}
            />
            <Text
              y={10}
              width={canvasWidth}
              align="center"
              text={''}
              fontFamily={
                '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif'
              }
              fontSize={30}
            />
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
