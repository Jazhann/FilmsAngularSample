import { Actor } from "@features/actors/models/actor.model";
import { Company } from "@features/companies/models/company.model";

export interface filmMapped {
    id: number;
    title: string;
    poster: string;
    genre: string [];
    year: number;
    duration: number;
    imdbRating: number;
    actors: Actor [];
    company: Company | undefined;
}