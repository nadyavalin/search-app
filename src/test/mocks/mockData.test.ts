import { IPerson, PeopleResponse } from "../../types/types";
import { mockData } from "./mockData";

export const data: PeopleResponse = {
  count: 82,
  next: "https://swapi.dev/api/people/?page=2",
  previous: null,
  results: [
    {
      name: "Owen Lars",
      height: "178",
      mass: "120",
      hair_color: "brown, grey",
      skin_color: "light",
      eye_color: "blue",
      birth_year: "52BBY",
      gender: "male",
      created: "2014-12-10T15:52:14.024000Z",
      edited: "2014-12-20T21:17:50.317000Z",
    },
  ],
};

describe("mockData", () => {
  it("should contain the correct data for Owen Lars", () => {
    const owenLars: IPerson | undefined = mockData.info.results.find(
      (person) => person.name === "Owen Lars",
    );

    expect(owenLars).toBeDefined();
    expect(owenLars?.height).toBe("178");
    expect(owenLars?.mass).toBe("120");
    expect(owenLars?.hair_color).toBe("brown, grey");
    expect(owenLars?.skin_color).toBe("light");
    expect(owenLars?.eye_color).toBe("blue");
    expect(owenLars?.birth_year).toBe("52BBY");
    expect(owenLars?.gender).toBe("male");
    expect(owenLars?.created).toBe("2014-12-10T15:52:14.024000Z");
    expect(owenLars?.edited).toBe("2014-12-20T21:17:50.317000Z");
  });
});
