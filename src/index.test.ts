import ReactDOM from "react-dom";
import { renderToDOM } from "./index";

describe("Test ReactDOM.render", () => {
  const originalGetElement = global.document.getElementById;
  const originalRender = ReactDOM.render;

  beforeEach(() => {
    ReactDOM.render = jest.fn();
    global.document.getElementById = () => true;
  });

  afterAll(() => {
    ReactDOM.render = originalRender;
    global.document.getElementById = originalGetElement;
  });

  it("Call ReactDOM.render", () => {
    renderToDOM();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
