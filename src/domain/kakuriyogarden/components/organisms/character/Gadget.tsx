import { Dispatch, FC } from 'react'
import Image from 'next/image'
import {
  Gadget,
  getGadgetImageUrl,
} from '~/domain/kakuriyogarden/classes/gadget'
import {
  OpenGadgetModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/atoms/RubyText'

const cloth: FC<{
  gadgetDetail: string
  gadget: Gadget
  setGadget: Dispatch<Gadget>
  setGadgetDetail: Dispatch<string>
  openInputModal: OpenInputModal
  openGadgetModal: OpenGadgetModal
}> = ({
  gadgetDetail,
  gadget,
  setGadget,
  openInputModal,
  setGadgetDetail,
  openGadgetModal,
}) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title">
        <span style={{ paddingLeft: '10px' }}>
          <ruby>
            焦点具<rt>ガジェット</rt>
          </ruby>
        </span>
        <div className="flex-centering">
          <Image
            src="/images/kakuriyogarden/icons/game-icons/pendant-key.svg"
            alt="ガジェット"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div
        className="kg-section-title"
        onClick={() => openGadgetModal(gadget, setGadget)}
        style={{ cursor: 'pointer' }}
      >
        <span className="kg-editable" style={{ paddingLeft: '5px' }}>
          <ruby>
            {gadget}
            <rt>モチーフ</rt>
          </ruby>
        </span>
        <div>
          <Image
            src={getGadgetImageUrl(gadget)}
            alt="モチーフ"
            width={50}
            height={50}
          />
        </div>
      </div>
      <div
        className="kg-detail-area kg-editable"
        style={{ flex: 1 }}
        onClick={() =>
          openInputModal(
            '焦点具と魔法戦衣の説明',
            gadgetDetail,
            setGadgetDetail,
            'textarea',
          )
        }
      >
        <Ruby text={gadgetDetail} />
      </div>
    </div>
  )
}
export default cloth
