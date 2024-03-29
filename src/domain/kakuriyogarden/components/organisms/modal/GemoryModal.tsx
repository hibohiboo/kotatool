import { FC, useEffect, useState } from 'react'
import { getGemoryImage } from '~/domain/kakuriyogarden/classes/gemory'
import Modal from '~/domain/kakuriyogarden/components/molecules/modal/Modal'
import type { GemoryModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/atoms/RubyText'
import Image from 'next/image'

const GemoryModalComponent: FC<GemoryModal> = (ctx) => {
  const { gemory } = ctx
  const [description, setDescrption] = useState(gemory.description)
  const [strength, setStrength] = useState(gemory.strength)
  const [episode, setEpisode] = useState(gemory.episode)
  const [gemoryType, setGemoryType] = useState(gemory.type)
  useEffect(() => {
    setDescrption(gemory.description)
    setStrength(gemory.strength)
    setEpisode(gemory.episode)
    setGemoryType(gemory.type)
  }, [gemory])

  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-gemory-modal">
        <h3>想晶</h3>
        <p>心に強く焼き付いている記憶の結晶。魔法の源。</p>
        <div style={{ display: 'flex' }}>
          <div
            className="kg-editable"
            onClick={() => {
              ctx.openGemoryTypeModal(gemoryType, (text) => {
                ctx.dispatch.garden(
                  ctx.garden.map((x, i) =>
                    i === ctx.index ? { ...x, type: text } : x,
                  ),
                )
                setGemoryType(text)
              })
            }}
          >
            <h4>種別:{gemoryType}</h4>
            <Image
              src={getGemoryImage(gemoryType)}
              width={50}
              height={50}
              alt="gemorytype"
            />
          </div>
          <div style={{ marginLeft: '20px' }}>
            <h4>強度</h4>
            <div
              style={{ fontSize: '2rem' }}
              className="kg-editable"
              onClick={() =>
                ctx.openInputModal(
                  '強度',
                  String(strength),
                  (text) => {
                    const num = Number(text)
                    if (num < 1) {
                      setStrength(1)
                      return
                    }
                    setStrength(num)
                    // 強度がカードの枚数より増えたら増やす。減っていたら減らす
                    if (gemory.cards.length < num) {
                      ctx.dispatch.garden(
                        ctx.garden.map((x, i) =>
                          i === ctx.index
                            ? {
                                ...x,
                                strength: num,
                                cards: gemory.cards.concat(
                                  Array(num - gemory.cards.length).fill(null),
                                ),
                              }
                            : x,
                        ),
                      )
                      return
                    }
                    const cards = [...gemory.cards]
                    cards.length = num

                    ctx.dispatch.garden(
                      ctx.garden.map((x, i) =>
                        i === ctx.index ? { ...x, strength: num, cards } : x,
                      ),
                    )
                  },
                  'number',
                )
              }
            >
              {strength}
            </div>
          </div>
        </div>
        <h4>風景</h4>
        <div
          className="kg-detail-area kg-editable"
          onClick={() =>
            ctx.openInputModal(
              '風景',
              description,
              (text) => {
                setDescrption(text)
                ctx.dispatch.garden(
                  ctx.garden.map((x, i) =>
                    i === ctx.index ? { ...x, description: text } : x,
                  ),
                )
              },
              'textarea',
            )
          }
        >
          <Ruby text={description} />
        </div>
        <h4>エピソード</h4>
        <div
          className="kg-detail-area kg-editable"
          onClick={() =>
            ctx.openInputModal(
              'エピソード',
              episode,
              (text) => {
                setEpisode(text)
                ctx.dispatch.garden(
                  ctx.garden.map((x, i) =>
                    i === ctx.index ? { ...x, episode: text } : x,
                  ),
                )
              },
              'textarea',
            )
          }
        >
          <Ruby text={episode} />
        </div>
      </div>
    </Modal>
  )
}
export default GemoryModalComponent
