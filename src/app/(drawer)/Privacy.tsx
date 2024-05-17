import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { SIZES } from '@/constants'

const Privacy = () => {
  return (
    <ScrollView style={{flex: 1, paddingHorizontal: 15, paddingVertical: 25}}>
        <Text style={{textAlign: "justify"}}>At Wolfgang Stuant, we are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information. Please read it carefully to understand our practices regarding your data.</Text>

        <Text style={styles?.headerText}>1. Information We Collect</Text>
        <Text>We may collect the following types of information:</Text>

        <Text style={styles?.subHeaderText}>1.1 Personal Information: </Text>

        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Name</Text>
    

        {/* <Text style={{fontWeight: "bold", fontSize: 16,}}>.</Text> */}
        
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> Billing and payment details</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> Contact information (e.g., email address, phone number)</Text>

        <Text style={styles?.subHeaderText}>1.2 Usage Data: </Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> Information about how you interact with our website or services</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> Log data (e.g., IP address, browser type, pages visited)</Text>


        
        <Text style={styles?.headerText}>2. How We Use Your Information</Text>
        <Text>We may use your information for the following purposes:</Text>

        <Text style={styles?.subHeaderText}>2.1 Provide Services: </Text>

        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To provide and maintain our products and services.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To process transactions and fulfill orders.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To communicate with you about your account and updates.</Text>
        
        <Text style={styles?.subHeaderText}>2.2 Improve Services: </Text>

        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To analyze and improve our products and services.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To personalize your experience and provide tailored content.</Text>
        
        <Text style={styles?.subHeaderText}>2.3 Marketing and Promotions:</Text>

        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To send promotional materials, updates, and newsletters (with your consent).</Text>
        
        <Text style={styles?.subHeaderText}>2.4 Legal Compliance:</Text>

        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text> To comply with legal obligations and respond to lawful requests.</Text>

        <Text style={styles?.headerText}>3. Data Sharing</Text>
        <Text>We may share your personal information with:</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Service providers and partners necessary for our operations.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Legal authorities when required by law or to protect our rights.</Text>
        

        <Text style={styles?.headerText}>4. Your Choices</Text>
        <Text>You have the right to:</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Access and correct your personal information.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Opt-out of marketing communications.</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Delete your account (subject to legal requirements).</Text>

        <Text style={styles?.headerText}>5. Security</Text>
        <Text>We employ security measures to protect your information, but no method is 100% secure. We cannot guarantee the security of your data.</Text>
        
        <Text style={styles?.headerText}>6. Cookies and Tracking Technologies</Text>
        <Text>We use cookies and similar technologies to collect usage data and improve your experience on our website. You can manage your cookie preferences in your browser settings.</Text>
        
        <Text style={styles?.headerText}>7. Children's Privacy</Text>
        <Text>Our services are not directed to individuals under 13. If you are a parent or guardian and believe your child has provided us with their information, please contact us to remove it.</Text>
        
        <Text style={styles?.headerText}>8. Changes to this Privacy Policy</Text>
        <Text>We may update this Privacy Policy to reflect changes in our practices. We will notify you of any material changes via email or a prominent notice on our website.</Text>
        
        <Text style={styles?.headerText}>9. Contact Us</Text>
        <Text>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Address: 35, Afolabi Awosanya Street, Ikeja, Lagos</Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Email Address: support@companyname.com </Text>
        <Text><Text style={{fontSize: 18, }}>{`\u2022`} </Text>Phone Number: +234 901 259 8745 </Text>

        




    </ScrollView>
  )
}

export default Privacy

const styles = StyleSheet.create({
    headerText: {
        fontWeight: "bold",
        marginVertical: 5,
        fontSize: SIZES?.medium
    },
    subHeaderText: {
        fontWeight: "bold",
        marginVertical: 5,
        fontSize: 14   
    }
})