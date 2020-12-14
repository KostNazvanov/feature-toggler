import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
  takeRecords() {
    return []
  }
}
global.document.getSelection = function () {}
configure({
  adapter: new Adapter(),
})
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
})
