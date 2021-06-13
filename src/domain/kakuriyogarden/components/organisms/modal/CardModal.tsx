import { FC } from 'react'
import Modal from '~/domain/kakuriyogarden/components/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/organisms/card'

import type { CardModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<CardModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-negai-modal">
        <Card cardData={ctx.card} />
      </div>
    </Modal>
  )
}
export default modal
