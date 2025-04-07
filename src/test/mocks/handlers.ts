import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://swapi.dev/api/people/", () => {
    return HttpResponse.json(
      {
        count: 82,
        results: [
          {
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            hair_color: "blond",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "19BBY",
            gender: "male",
          },
        ],
      },
      { status: 200 },
    );
  }),
];
