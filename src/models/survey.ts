export interface Survey {
	id: number;
	title: string;
	link: string;
	is_favourite: boolean;
	questions: string[];
}

export interface SurveyDTO {
	id: number;
	is_favourite?: boolean;
	title?: string;
}
