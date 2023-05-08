export interface Report {
	title: string;
	evaluation: number;
	specie: 'dog' | 'cat' | string; // Maybe would change in the future
	image: string;
	full_name: string;
	age: number;
}

export interface GeneratedReport {
	_id: string;
	title: string;
	isFavourite: boolean;
}
