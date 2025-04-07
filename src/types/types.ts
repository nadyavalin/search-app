export interface PeopleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}

export interface IPerson {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  created: string;
  edited: string;
}
