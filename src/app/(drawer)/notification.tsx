import { COLORS } from '@/constants';
import { Link } from 'expo-router';
import * as React from 'react';
import { Text } from 'react-native';
import { ScrollView } from 'react-native';
import { List } from 'react-native-paper';

const Notification = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <ScrollView>      
        <List.Section style={{backgroundColor: "transparent"}}>
            <List.Accordion
                
                // onPress={handlePress}
                // style={{backgroundColor: expanded ? COLORS?.grayBg : COLORS?.primary, }}
                style={{backgroundColor: COLORS?.grayBg }}
                titleStyle={{color: "black"}}

                
                title="First Notification"
                left={props => <List.Icon  {...props} icon="" />}>
                <List.Item titleStyle={{color: "black", }} title="" descriptionStyle={{color: "black", marginTop: -30}} description="First item First item First item First item First item " />
                {/* <List.Item titleStyle={{color: "black"}} title="" description="Item description Item description Item description Item description Item description Item description Item description " /> */}
            </List.Accordion>

            <List.Accordion
                
                // onPress={handlePress}
                // style={{backgroundColor: expanded ? COLORS?.grayBg : COLORS?.primary, }}
                style={{backgroundColor: COLORS?.grayBg }}
                titleStyle={{color: "black"}}

                
                title="Second Notification"
                left={props => <List.Icon  {...props} icon="" />}>
                <List.Item titleStyle={{color: "black", }} title="" descriptionStyle={{color: "black", marginTop: -30}} description="First item First item First item First item First item " />
                {/* <List.Item titleStyle={{color: "black"}} title="" description="Item description Item description Item description Item description Item description Item description Item description " /> */}
            </List.Accordion>

            <List.Accordion
                
                // onPress={handlePress}
                // style={{backgroundColor: expanded ? COLORS?.grayBg : COLORS?.primary, }}
                style={{backgroundColor: COLORS?.grayBg }}
                titleStyle={{color: "black"}}

                
                title="Third Notification"
                left={props => <List.Icon  {...props} icon="" />}>
                <List.Item titleStyle={{color: "black", }} title="" descriptionStyle={{color: "black", marginTop: -30}} description="First item First item First item First item First item " />
                {/* <List.Item titleStyle={{color: "black"}} title="" description="Item description Item description Item description Item description Item description Item description Item description " /> */}
            </List.Accordion>
        </List.Section>
    </ScrollView>
  );
};

export default Notification;