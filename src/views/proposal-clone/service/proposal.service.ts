export class ProposalService {
  static generateUUIDv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = (Math.random() * 16) | 0

      const value = char === 'x' ? rand : (rand & 0x3) | 0x8 // set variant for 'y'

      return value.toString(16)
    })
  }
}
