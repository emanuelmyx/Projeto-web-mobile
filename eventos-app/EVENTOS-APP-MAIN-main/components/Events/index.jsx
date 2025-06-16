import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { IconTrash } from '../Icons';

export const Events = ({ item, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => onRemove(item.name)}>
        <IconTrash />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 15,
    borderRadius: 8,
    width: 364,
    height:61,
  },
  textContainer: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
    left: '16',
    lineHeight:'23',
  },
  date: {
    fontSize: 14,
    color: '#696666',
    fontWeight: '400',
    marginTop: 2,
    left: '16',
  },
});
