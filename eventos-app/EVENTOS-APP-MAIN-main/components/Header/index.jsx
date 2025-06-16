import { StyleSheet, Text, View } from "react-native";

export const Header = ({ title, IconComponent }) => {
  return (
    <View style={styles.header}>
      {IconComponent && <View style={styles.iconWrapper}>{IconComponent}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#112B11",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", 
  },
  iconWrapper: {
    position: "absolute",
    left: 20, 
    top: "50%",
    transform: [{ translateY: -9 }],
    marginTop: 20
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
    textAlign: "center",
  },
});
