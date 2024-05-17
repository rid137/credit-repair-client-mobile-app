import { SIZES } from "@/constants";
import Colors from "@/constants/Colors";
import { forwardRef } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

type ButtonProps = {
    text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Button = forwardRef<View | null, ButtonProps> (
    ({ text, ...pressableProps}, ref) => {
        return (
            <Pressable ref={ref} {...pressableProps} style={styles.container}>
                <Text style={styles.text}>{text}</Text>

            </Pressable>
        );
    }
);

export default Button;

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