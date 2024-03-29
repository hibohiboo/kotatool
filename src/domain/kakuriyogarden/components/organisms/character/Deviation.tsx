import { Dispatch, FC } from 'react'
import Image from 'next/image'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/atoms/RubyText'

interface Deviation {
  point: string
  before: string
  after: string
}
const component: FC<{
  items: Deviation[]
  setDeviations: Dispatch<Deviation[]>
  openInputModal: OpenInputModal
}> = ({ items, setDeviations, openInputModal }) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '60px' }}>
        <span style={{}}>
          <ruby>逸脱</ruby>
        </span>
        <Image
          src="/images/kakuriyogarden/icons/game-icons/egg-eye.svg"
          alt="逸脱"
          width={50}
          height={50}
        />
      </div>
      <div>
        <table className="kg-table">
          <thead>
            <tr>
              <th>箇所</th>
              <th>変身前</th>
              <th>変身後</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td
                  className="kg-editable"
                  onClick={() =>
                    openInputModal('逸脱箇所', item.point, (text) =>
                      setDeviations(
                        items.map((x, j) =>
                          j === i ? { ...item, point: text } : x,
                        ),
                      ),
                    )
                  }
                >
                  <Ruby text={item.point} />
                </td>
                <td
                  className="kg-editable"
                  onClick={() =>
                    openInputModal('変身前', item.before, (text) =>
                      setDeviations(
                        items.map((x, j) =>
                          j === i ? { ...item, before: text } : x,
                        ),
                      ),
                    )
                  }
                >
                  <Ruby text={item.before} />
                </td>
                <td
                  className="kg-editable"
                  onClick={() =>
                    openInputModal('変身後', item.after, (text) =>
                      setDeviations(
                        items.map((x, j) =>
                          j === i ? { ...item, after: text } : x,
                        ),
                      ),
                    )
                  }
                >
                  <Ruby text={item.after} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{ padding: '5px', marginTop: '15px' }}
          onClick={() =>
            setDeviations([
              ...items,
              { point: '部位・性格', before: 'びふぉー', after: 'あふたー' },
            ])
          }
        >
          逸脱追加
        </button>
        <button
          style={{ padding: '5px', marginTop: '15px', marginLeft: '50px' }}
          onClick={() => {
            if (!confirm('最後の逸脱を一つ削除します。よろしいですか？')) {
              return
            }
            items.pop()
            setDeviations([...items])
          }}
        >
          逸脱削除
        </button>
      </div>
    </div>
  )
}
export default component
