// This file defines types and interfaces used in the application, such as types for characters and movies.

export interface Character {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    fullName?: string;
    powers?: string[];
    history?: string;
    appearances?: string[];
    abilities?: string;
}

export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    posterUrl: string;
}