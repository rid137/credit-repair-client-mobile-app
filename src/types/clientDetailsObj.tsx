export interface ClientDetailsType {
    addressProof: null | string;
    attended: boolean;
    consultMethod: null | string;
    createdAt: string;
    dob: string;
    email: string;
    equifaxScore: null | number;
    experianScore: null | number;
    firstName: string;
    govId: null | string;
    id: number;
    lastName: string;
    manager: {
        addressProof: null | string;
        attended: boolean;
        consultMethod: null | string;
        createdAt: string;
        dob: string;
        email: string;
        equifaxScore: null | number;
        experianScore: null | number;
        firstName: string;
        govId: null | string;
        id: number;
        lastName: string;
        middleName: null | string;
        phone: string;
        processing: boolean;
        profileImg: null | string;
        referralMethod: null | string;
        refreshDate: null | string;
        roles: { id: number; name: string }[];
        ssn: null | string;
        state: string;
        status: null | string;
        streetAddr: string;
        transunionScore: null | number;
        updatedAt: string;
        zipCode: null | string;
    };
    middleName: null | string;
    phone: string;
    processing: boolean;
    profileImg: null | string;
    referralMethod: null | string;
    refreshDate: null | string;
    roles: { id: number; name: string }[];
    ssn: null | string;
    state: string;
    status: null | string;
    streetAddr: string;
    transunionScore: null | number;
    updatedAt: string;
    zipCode: null | string;
}


export interface DisputeAccountType {
    accType: string
    accountName: string
    accountNumber: string
    balance: string
    bureau: string
    date: string
    id: number
    inDispute: boolean
}


export interface ClientScores {
    id: number,
    experianScore: "string",
    equifaxScore: "string",
    transunionScore: "string",
    createdAt: string,
    updatedAt: string
}

export interface InquiryType {
    bureau: string
    date: string
    id: number
    inDispute: boolean
    name: string
}

export interface scoresType {
    createdAt: string
    equifaxScore: string
    experianScore: string
    id: number
    transunionScore: string
    updatedAt: string
}

export interface    PaymentDataType {
    amount: number
    date: string
    status: string
    subscription: {
        id: number,
        subscriptionType: string,
        price: number,
        paymentFrequency: string,
        numberOfPayment: number,
        isActive: boolean
    },
    transactionId: string
    userName: string
}


export interface CardDetailsType {
    id?: number,
    cardName?: string,
    cardNumber?: string,
    cvv?: string,
    expiryDate?: string,
    isPrimary?: boolean
}
  

  