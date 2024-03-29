import { FC } from 'react'
import Slider from 'react-slick'
import Modal from '~/domain/kakuriyogarden/components/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/organisms/card'
import Image from 'next/image'
import type { NegaiModal } from '~/domain/kakuriyogarden/store/character/modal'
import {
  avengeMagica,
  dedicationMagica,
  egoMagica,
  getHopeImageUrl,
} from '~/domain/kakuriyogarden/classes/hope'

const modal: FC<NegaiModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-negai-modal">
        <SimpleSlider {...ctx} />
      </div>
    </Modal>
  )
}
export default modal

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const SimpleSlider: FC<NegaiModal> = (ctx) => {
  return (
    <div>
      <h2>願い</h2>
      <p>魔法少女が戦う理由。</p>
      <Slider {...settings}>
        <div className="kg-modal-hope" onClick={() => ctx.hopeHandler('献身')}>
          <h3>献身</h3>
          <Image
            src={getHopeImageUrl('献身')}
            width={50}
            height={50}
            alt="献身"
          />

          <p>あなたの願いは誰かのために</p>
          <div className="kg-modal-hope-skill">
            <Card cardData={dedicationMagica} />
          </div>
        </div>
        <div className="kg-modal-hope" onClick={() => ctx.hopeHandler('利己')}>
          <h3>利己</h3>
          <Image
            src={getHopeImageUrl('利己')}
            width={50}
            height={50}
            alt="利己"
          />

          <p>あなたの願いは己のために</p>
          <div className="kg-modal-hope-skill">
            <Card cardData={egoMagica} />
          </div>
        </div>

        <div className="kg-modal-hope" onClick={() => ctx.hopeHandler('復讐')}>
          <h3>復讐</h3>
          <Image
            src={getHopeImageUrl('復讐')}
            width={50}
            height={50}
            alt="復讐"
          />
          <p>己のための奇跡は不要。ただただ報いを願うのみ</p>
          <div className="kg-modal-hope-skill">
            <Card cardData={avengeMagica} />
          </div>
        </div>
      </Slider>
    </div>
  )
}
// class SimpleSlider extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//     }
//     return (
//       <div>
//         <h2>願い選択</h2>
//         <Slider {...settings}>
//           <div className="kg-modal-hope">
//             <h3>献身</h3>
//             <img src={getHopeImageUrl('献身')} />
//             <p>あなたは誰かのために願った。</p>
//             <div className="kg-modal-hope-skill">
//               <Card cardData={dedicationMagica} />
//             </div>
//           </div>
//           <div className="kg-modal-hope">
//             <h3>利己</h3>
//             <img src={getHopeImageUrl('利己')} />
//             <p>あなたは己のために願った。</p>
//             <div className="kg-modal-hope-skill">
//               <Card cardData={egoMagica} />
//             </div>
//           </div>

//           <div className="kg-modal-hope">
//             <h3>復讐</h3>
//             <img src={getHopeImageUrl('復讐')} />
//             <p>己のための奇跡は不要。ただただ報いを願うのみ。</p>
//             <div className="kg-modal-hope-skill">
//               <Card cardData={avengeMagica} />
//             </div>
//           </div>
//         </Slider>
//       </div>
//     )
//   }
// }
