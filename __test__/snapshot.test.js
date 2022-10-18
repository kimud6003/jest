import { describe, test, expect } from "@jest/globals";
import listMaker from "./listMaker";

describe("snapshot Test", () => {
  test("listMaker", () => {
    // expect(listMaker()).toBe([1,2,3]);
    expect(listMaker()).toMatchSnapshot();
  });

  test("listMaker", () => {
    // expect(listMaker()).toBe([1,2,3]);
    expect(listMaker(4)).toMatchInlineSnapshot(`
      [
        1,
        2,
        3,
        4,
      ]
    `);
  });
});
