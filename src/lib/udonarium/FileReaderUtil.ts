import * as WordArray from 'crypto-js/lib-typedarrays.js'
import * as SHA256 from 'crypto-js/sha256.js'

export function readAsArrayBufferAsync(blob: Blob): Promise<ArrayBuffer> {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer)
    }
    reader.onabort = reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsArrayBuffer(blob)
  })
}

export function readAsTextAsync(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onabort = reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsText(blob)
  })
}

export async function calcSHA256Async(arrayBuffer: ArrayBuffer): Promise<string>
export async function calcSHA256Async(blob: Blob): Promise<string>
export async function calcSHA256Async(arg: any): Promise<string> {
  if (arg instanceof Blob) {
    return _calcSHA256Async(arg)
  } else {
    return _calcSHA256(arg)
  }
}

async function _calcSHA256Async(blob: Blob): Promise<string> {
  return _calcSHA256(await readAsArrayBufferAsync(blob))
}

function _calcSHA256(arrayBuffer: ArrayBuffer): string {
  const wordArray = WordArray.create(arrayBuffer)
  return SHA256(<any>wordArray).toString()
}
