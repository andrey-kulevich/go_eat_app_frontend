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
    setUser = (user: UserInterface) => { this.user = user }

    @action
    setStatus = (status: string) => {this.user.status = status}
}

export default UserMob
