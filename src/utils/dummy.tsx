export const notificationData = [
    {
        title: 'Payment Reminders',
        body: 'Would you like to set up payment reminders to ensure timely payments and improve your credit score?',
    },
    {
        title: 'Credit Report Changes',
        body: 'Your sentence is clear and effective for a credit repair app. It prompts users to decide whether they want to stay informed about changes in their credit score through real-time notifications.',
    },
    {
        title: 'Credit Utilization Alerts',
        body: 'After placing an order, you can navigate to your dashboard where you can view the details of your order and also keep track of the order status. ',
    },
    {
        title: 'Fraud Alerts',
        body: 'Would you like to set up payment reminders to ensure timely payments and improve your credit score?',
    },
    {
        title: 'Payment Received Confirmation',
        body: 'Would you like to set up payment reminders to ensure timely payments and improve your credit score?',
    },
    {
        title: 'Credit Limit Changes',
        body: 'Would you like to set up payment reminders to ensure timely payments and improve your credit score?',
    },
    {
        title: 'Due Date Reminders',
        body: 'Would you like to set up payment reminders to ensure timely payments and improve your credit score?',
    },
    {
        title: 'Credit Score Updates',
        body: 'Your sentence is clear and effective for a credit repair app. It prompts users to decide whether they want to stay informed about changes in their credit score through real-time notifications.',
    },
    {
        title: 'Credit Inquiry Alerts',
        body: 'Your sentence is clear and effective for a credit repair app. It prompts users to decide whether they want to stay informed about changes in their credit score through real-time notifications.',
    },

]

export const clipSentence = (str: string, wordAmout: number, fromFront?: boolean): string => {
    if(str.length > wordAmout) {
        fromFront ? str =  '**** **** ****' + str.slice(-wordAmout) : str = str.substring(0, wordAmout) + '...'
    };
    return str;
};