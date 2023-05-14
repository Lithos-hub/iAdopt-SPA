export interface Survey {
	id: number;
	title: string;
	link: string;
	is_favourite: boolean;
	questions: string[];
}

export interface SurveyDTO {
	id?: number;
	is_favourite?: boolean;
	title?: string;
	adopter_info?: {
		name: string;
		age: number | null;
		email: string;
		phone?: string;
		region: string;
		city: string;
	};
	animal_info?: {
		specie: string;
		name: string;
		region: string;
		breed: string;
		age: string;
		image?: File | null;
		link?: string | null;
	};
	questions?: string[];
}
