import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Handlers", () => {
  it("should mock the GET request to /api/people/", async () => {
    const response = await fetch("https://swapi.dev/api/people/");
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.count).toBe(82);
    expect(data.results[0].name).toBe("Luke Skywalker");
  });
});
