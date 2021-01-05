import {PlaceInterface} from "./PlaceInterface";

export interface InvitationInterface {
    id: number,
    dateTime: string,
    place: PlaceInterface,
    whoWillPay: number,
    message: string,
    senderId: number,
    sender: string,
    recipientId: number,
    recipient: string,
    accepted: boolean
}

export interface InvitationCreateInterface {
    dateTime: string,
    address: number,
    whoWillPay: number,
    message: string,
    senderId: number,
    recipientId: number
}