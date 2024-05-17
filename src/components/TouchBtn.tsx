import { SIZES } from "@/constants";
import Colors from "@/constants/Colors";
import { forwardRef } from "react"
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type ButtonProps = {
    text: string;
    onPress?: () => void
}

const TouchBtn = ({ text, onPress}: ButtonProps) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text style={styles.text}>{text}</Text>

            </TouchableOpacity>
        );
    }


export default TouchBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors?.base?.primary,
        padding: 10,
        alignItems: "center",
        borderRadius: SIZES?.small,
        marginVertical: 10,
        // width: "100%"

    },
    text: {
        fontSize: 16,
        fontWeight: "600",
        color: "white"
    }
})