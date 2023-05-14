export interface Report {
	evaluation_score: number;
	evaluation_results: string;
	animal_name: string;
	animal_specie: 'dog' | 'cat' | string; // Maybe would change in the future
	animal_image: string;
	adopter_name: string;
	adopter_age: number;
	adopter_region: string;
}
