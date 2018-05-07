import {colorPicker} from '../colorPicker' 

describe('colorPicker', () => {
  it('exists', () => {
    expect(colorPicker()).toBeDefined()

  })
  it('returns a string', () => {
    expect(typeof colorPicker()).toEqual('string')
  })
  it('returns red most of the time', () => {
    expect(colorPicker()).toEqual('red')
  })
})