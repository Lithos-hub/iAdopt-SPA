import { AxiosRequestTransformer } from 'axios';

const exampleRequestTransformation: AxiosRequestTransformer = (data) => data;

const exampleResponseTransformation: AxiosRequestTransformer = (data) => data;

export const requestTransforms: AxiosRequestTransformer[] = [
	exampleRequestTransformation,
];

export const responseTransforms: AxiosRequestTransformer[] = [
	exampleResponseTransformation,
];
