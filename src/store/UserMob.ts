import {action, observable} from "mobx";
import {UserInterface} from "../interfaces/UserInterface";
import {PreferencesInterface} from "../interfaces/PreferencesInterface";


class UserMob {
    @observable user: UserInterface = {
        id: 0,
        name: '',
        age: 0,
        gender: '',
        avatar: '',
        preferences: {} as PreferencesInterface,
        status: '',
        role: ''
    }

    @observable isAuth: boolean = false

    // constructor() {
    //     if (user) {
    //         this.user = user
    //     }
    // }

    @action
    setIsAuth = (isAuth: boolean) => {this.isAuth = isAuth}

    @action
    setUser = (user: any) => {
        this.user.id = user.id
        this.user.name = user.name
        this.user.age = user.age
        this.user.gender = user.gender
        this.user.avatar = user.avatar
        this.user.preferences = user.preferences
        this.user.status = user.status
        this.user.role = user.role
    }

    @action
    setStatus = (status: string) => {this.user.status = status}
}

export default UserMob
