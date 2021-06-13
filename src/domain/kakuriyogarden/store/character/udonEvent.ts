import format from 'date-fns/format'
import { calcSHA256Async } from '~/lib/udonarium/FileReaderUtil'
import { MimeType } from '~/lib/udonarium/mimeType'
import {
  FileArchiver,
  convertDocToXML,
  createDoc,
  createElement,
} from '~/lib/fileArchiver'

import { Magic } from '../../classes/gemory/magic'
import { Character, Garden } from '.'
import { getHopeMagic } from '../../classes/hope'
import { DATE_FORMAT } from '~/lib/constants'

const getCanvasBlob = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)))

// TODO: 一旦あきらめ。画像化素直にしたほうがはやいかも。

export const createZip = async (character: Character) => {
  const { garden, magicalName } = character
  const files: File[] = []

  // 小奇跡
  const hopeBlob = await getCanvasBlob(
    document.getElementById(`card-hope`) as HTMLCanvasElement,
  )
  const hopeIdentifier = await calcSHA256Async(hopeBlob)
  files.push(
    new File(
      [hopeBlob],
      hopeIdentifier + '.' + MimeType.extension(hopeBlob.type),
      {
        type: hopeBlob.type,
      },
    ),
  )

  // 魔法
  const mappedList = await Promise.all(
    garden.map(async (g, gi) =>
      Promise.all(
        g.cards
          .filter((c) => !!c && c.type !== '想晶')
          .map(async (c, ci) => {
            const target = document.getElementById(
              `card-${gi}_${ci}`,
            ) as HTMLCanvasElement
            const blob = await getCanvasBlob(target)
            const identifier = await calcSHA256Async(blob)
            files.push(
              new File(
                [blob],
                identifier + '.' + MimeType.extension(blob.type),
                {
                  type: blob.type,
                },
              ),
            )

            return { ...c, identifier }
          }),
      ),
    ),
  )

  // 背景(キャラクターカード)
  const characterBlob = await getCanvasBlob(
    document.getElementById(`card-character`) as HTMLCanvasElement,
  )
  const characterIdentifier = await calcSHA256Async(characterBlob)
  files.push(
    new File(
      [characterBlob],
      characterIdentifier + '.' + MimeType.extension(characterBlob.type),
      {
        type: characterBlob.type,
      },
    ),
  )

  files.push(
    createCardStack(`${magicalName}の魔法山札`, characterIdentifier, [
      ...mappedList.flat(),
      { ...getHopeMagic(character.hope), identifier: hopeIdentifier },
    ]),
  )

  FileArchiver.instance.save(files, format(new Date(), DATE_FORMAT))
}

type MagicWithIdentifer = Magic & { identifier: string }

const createCardStack = (
  stackName: string,
  backIdentifier: string,
  cards: MagicWithIdentifer[],
) => {
  const doc = createDoc()
  const cardStackWrapper = createElement(doc, 'card-stack', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
    ['isShowTotal', 'true'],
  ])

  cardStackWrapper.appendChild(createCardStackElment(doc, stackName))
  cardStackWrapper.appendChild(createCardRoot(doc, cards, backIdentifier))
  doc.appendChild(cardStackWrapper)
  const sXML = convertDocToXML(doc)
  return new File([sXML], `${stackName}.xml`, { type: 'text/plain' })
}

const createCardStackElment = (doc: Document, stackName: string) => {
  // #card-stack
  const cardStack = createElement(doc, 'data', [['name', 'card-stack']])
  const image = createElement(doc, 'data', [['name', 'image']])
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ])
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], stackName)
  const detail = createElement(doc, 'data', [['name', 'detail']])
  image.appendChild(imageIdentifier)
  common.appendChild(name)
  cardStack.appendChild(image)
  cardStack.appendChild(common)
  cardStack.appendChild(detail)

  return cardStack
}

const createCardRoot = (
  doc: Document,
  cards: MagicWithIdentifer[],
  backIdentifier: string,
) => {
  const cardRoot = createElement(doc, 'node', [['name', 'cardRoot']])
  cards.forEach((card) =>
    cardRoot.appendChild(createCard(doc, card, backIdentifier)),
  )
  return cardRoot
}
const createCard = (
  doc: Document,
  card: MagicWithIdentifer,
  backIdentifier: string,
) => {
  const cardWrapper = createElement(doc, 'card', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
  ])
  const cardData = createElement(doc, 'data', [['name', 'card']])
  const image = createElement(doc, 'data', [['name', 'image']])
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ])
  const front = createElement(
    doc,
    'data',
    [
      ['name', 'front'],
      ['type', 'image'],
    ],
    card.identifier,
  )
  const back = createElement(
    doc,
    'data',
    [
      ['name', 'back'],
      ['type', 'image'],
    ],
    backIdentifier,
  )
  image.appendChild(imageIdentifier)
  image.appendChild(front)
  image.appendChild(back)
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], card.name)
  const size = createElement(doc, 'data', [['name', 'size']], '2')
  const detail = createElement(doc, 'data', [['name', 'detail']])
  image.appendChild(imageIdentifier)
  common.appendChild(name)
  common.appendChild(size)
  cardData.appendChild(image)
  cardData.appendChild(common)
  cardData.appendChild(detail)
  cardWrapper.appendChild(cardData)
  return cardWrapper
}