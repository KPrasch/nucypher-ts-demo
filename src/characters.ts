import {Alice, Bob, RemoteBob, SecretKey} from '@nucypher/nucypher-ts'
import type { Web3Provider } from '@ethersproject/providers'

const config = {
  // Public Porter endpoint on Lynx network
  porterUri: 'https://porter-lynx.nucypher.community/',
}

export const makeAlice = (provider: Web3Provider): Alice => {
  const secretKey = SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-alice-x'))
  return Alice.fromSecretKey(config, secretKey, provider)
}

export const makeBob = (): Bob => {
  const secretKey = SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-bob-xxx'))
  return Bob.fromSecretKey(config, secretKey)
}

export const makeRemoteBob = (): RemoteBob => {
  // The difference between a "Bob" and a "remote Bob" is that we only have
  // access to public parameters in the latter, whereas in the former
  // we also have access to Bob's secret key
  const { decryptingKey, verifyingKey } = makeBob()
  return { decryptingKey, verifyingKey }
}
