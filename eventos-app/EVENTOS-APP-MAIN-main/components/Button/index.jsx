import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({ onPress, title = "Button" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#112B11',
    width: 364,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',      
    borderRadius: 20,
    alignSelf: 'center',           
    marginTop: 24,
    borderRadius:20,      
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700', 
  }
});
