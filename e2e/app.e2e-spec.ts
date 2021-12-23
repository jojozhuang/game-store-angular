import { AppPage } from "./app.po";

describe("game-store-angular App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display product management message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Game Store - Product Management");
  });
});
