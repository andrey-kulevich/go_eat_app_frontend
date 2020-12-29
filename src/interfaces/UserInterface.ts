import {PreferencesInterface} from "./PreferencesInterface";

export interface UserInterface {
    id: number,
    name: string,
    age: number,
    gender: string,
    avatar: string,
    preferences: PreferencesInterface
    status: string,
    role: string
}
