import ReactDOM from "react-dom";
import { renderToDOM } from "./index";

describe("Test ReactDOM.render", () => {
  const originalGetElement = global.document.getElementById;
  const originalRender = ReactDOM.render;

  beforeEach(() => {
    // @ts-ignore
    ReactDOM.render = jest.fn();
    // @ts-ignore
    global.document.getElementById = () => true;
  });

  afterAll(() => {
    // @ts-ignore
    ReactDOM.render = originalRender;
    global.document.getElementById = originalGetElement;
  });

  it("Call ReactDOM.render", () => {
    renderToDOM();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
