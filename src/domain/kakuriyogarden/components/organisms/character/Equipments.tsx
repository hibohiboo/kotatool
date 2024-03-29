import { Dispatch, FC } from 'react'
import Image from 'next/image'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/atoms/RubyText'
interface Equipment {
  title: string
  detail: string
}
const component: FC<{
  items: Equipment[]
  setEquipments: Dispatch<Equipment[]>
  openInputModal: OpenInputModal
}> = ({ items, setEquipments, openInputModal }) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '80px' }}>
        <span style={{}}>
          <ruby>魔装</ruby>
        </span>
        <div className="flex-centering">
          <Image
            src="/images/kakuriyogarden/icons/game-icons/ample-dress.svg"
            alt="魔装"
            width={50}
            height={50}
          />

          <a
            href="https://scrapbox.io/magicalGirlTRPG/%E9%AD%94%E8%A3%85%E4%B8%80%E8%A6%A7"
            target="_blank"
            rel="noreferrer"
          >
            <i
              className="far fa-question-circle"
              style={{ cursor: 'pointer' }}
            ></i>
          </a>
        </div>
      </div>
      <div className="kg-attributes">
        {items.map((item, i) => (
          <div className="kg-attribute kg-editable" key={i}>
            <div
              className=" kg-editable"
              onClick={() =>
                openInputModal('魔装', item.title, (text) =>
                  setEquipments(
                    items.map((x, j) =>
                      j === i ? { ...item, title: text } : x,
                    ),
                  ),
                )
              }
            >
              <Ruby text={item.title} />
            </div>
            <div
              onClick={() =>
                openInputModal(
                  '魔装詳細',
                  item.detail,
                  (text) =>
                    setEquipments(
                      items.map((x, j) =>
                        j === i ? { ...item, detail: text } : x,
                      ),
                    ),
                  'textarea',
                )
              }
            >
              <Ruby text={item.detail} />
            </div>
          </div>
        ))}

        <button
          style={{ padding: '5px', marginTop: '15px' }}
          onClick={() =>
            setEquipments([...items, { title: '魔装', detail: '新規魔装' }])
          }
        >
          魔装追加
        </button>
        <button
          style={{ padding: '5px', marginTop: '15px', marginLeft: '50px' }}
          onClick={() => {
            // if (!confirm('先頭の魔装を一つ削除します。よろしいですか？')) {
            //   return
            // }
            // const [, ...rest] = items
            if (!confirm('最後の魔装を一つ削除します。よろしいですか？')) {
              return
            }
            items.pop()
            setEquipments([...items])
          }}
        >
          魔装削除
        </button>
      </div>
    </div>
  )
}
export default component
