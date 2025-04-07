import { IPerson, PeopleResponse } from "../types/types";

export const fetchPeople = async (
  searchParams: URLSearchParams,
  page: number,
): Promise<PeopleResponse> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?${searchParams.toString()}&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch people data");
  }
  return response.json();
};

export const fetchPerson = async (slug: string): Promise<IPerson> => {
  const res = await fetch(`https://swapi.dev/api/people/?search=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch person data");
  }
  const personData: PeopleResponse = await res.json();
  if (personData.count === 0) {
    throw new Error("Person not found");
  }
  const person: IPerson = personData.results[0];
  return person;
};
