export const requests = {

    // ----------- users ---------------
    login: {
        url: (login: string, password: string) => `api/users/${login}/${password}`,
        method: 'GET'
    },
    getUserById: {
        url: (userId: number) => `api/users/${userId}`,
        method: 'GET'
    },
    getUserByLogin: {
        url: (login: string) => `api/users/login/${login}`,
        method: 'GET'
    },
    createUser: {
        url: 'api/users',
        method: 'POST'
    },
    updateStatus: {
        url: `api/users`,
        method: 'PUT'
    },

    // -------------- preferences -----------------
    getPreferencesByUserId: {
        url: (userId: number) => `api/preferences/${userId}`,
        method: 'GET'
    },
    updatePreferences: {
        url: `api/preferences`,
        method: 'PUT'
    },
    updatePreferencesOther: {
        url: `api/preferences/other`,
        method: 'PUT'
    },

    // --------------- places ---------------------
    getPlaceByAddressId: {
        url: (addressId: number) => `api/places/${addressId}`,
        method: 'GET'
    },
    getPlacesByLocationAndPreferences: {
        url: (requestArea: string, userLocation: string, cuisine_nationality: string, interior: string) =>
            `api/places/${requestArea}/${userLocation}/${cuisine_nationality}/${interior}`,
        method: 'GET'
    },
    getFavoritePlaces: {
        url: (userId: number) => `api/places/favorite/${userId}`,
        method: 'GET'
    },
    getVisitsCount: {
        url: (addressId: number) => `api/places/visits/${addressId}`,
        method: 'GET'
    },
    getRatingOfPlace: {
        url: (addressId: number) => `api/places/rating/${addressId}`,
        method: 'GET'
    },
    createPlace: {
        url: 'api/places',
        method: 'POST'
    },
    createEmptyPlace: {
        url: 'api/places/empty',
        method: 'POST'
    },
    getReviewsByPlaceId: {
        url: (placeId: number) => `api/placeReviews/${placeId}`,
        method: 'GET'
    },
    createReview: {
        url: 'api/placeReviews',
        method: 'POST'
    },

    // ------------------ invitations --------------------
    getInvitationById: {
        url: (id: number) => `api/invitations/${id}`,
        method: 'GET'
    },
    getInvitationsByLocation: {
        url: (requestArea: string, userLocation: string) => `api/invitations/${requestArea}/${userLocation}`,
        method: 'GET'
    },
    getInvitationsMadeByPerson: {
        url: (personId: number) => `api/invitations/sender/${personId}`,
        method: 'GET'
    },
    getPersonalInvitations: {
        url: (id: number) => `api/invitations/recipient/${id}`,
        method: 'GET'
    },
    createInvitation: {
        url: 'api/invitations',
        method: 'POST'
    },
    acceptInvitation: {
        url: 'api/invitations',
        method: 'PUT'
    },
    deleteInvitation: {
        url:(invitationId: number) => `api/invitations/${invitationId}`,
        method: 'DELETE'
    },

    // ------------------- dishes -----------------------
    getDishById: {
        url: (dishId: number) => `api/dishes/${dishId}`,
        method: 'GET'
    },
    getAllDishes: {
        url: `api/dishes`,
        method: 'GET'
    },
    getDishesByPlaceId: {
        url: (placeId: number) => `api/dishes/place/${placeId}`,
        method: 'GET'
    },

    // --------------------- messages -----------------------
    getDialogsList: {
        url: (userId: number) => `api/messages/dialogs/${userId}`,
        method: 'GET'
    },
    getMessagesInDialog: {
        url: (userId: number, recipientId: number) => `api/messages/${userId}/${recipientId}`,
        method: 'GET'
    },
    createMessage: {
        url: 'api/messages',
        method: 'POST'
    },

    // ---------------------- files -------------------------
    getFile: {
        url: (filename: string) => `api/files/${filename}`,
        method: 'GET'
    }
}
