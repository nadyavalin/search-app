import { ReactElement } from "react";
import { MainContent } from "../../components/main/mainContent";
import { fetchPerson } from "../../api/api";
import { IPerson } from "../../types/types";
import { SideSectionItem } from "../../components/main/sideSection/sideSectionItem";

interface DetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function Details({
  params: { slug },
}: DetailsPageProps): Promise<ReactElement> {
  let person: IPerson | null = null;

  try {
    person = await fetchPerson(slug);
  } catch (error) {
    console.log(error);
  }

  return (
    <MainContent>
      <SideSectionItem person={person} />
    </MainContent>
  );
}
