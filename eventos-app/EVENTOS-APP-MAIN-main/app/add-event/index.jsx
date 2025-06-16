import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Header } from "../../components/Header";
import { IconArrowBack } from "../../components/Icons";
import { Footer } from "../../components/Footer";
import { useRouter } from "expo-router";
import { Button } from "../../components/Button";
import { useState } from "react";
import { useEvent } from "../../context/EventContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AddEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  useFocusEffect(
    useCallback(() => {
      setEventName("");
      setEventDate("");
    }, [])
  )
  const { events, addEvent } = useEvent();
  const router = useRouter();

  const isValidDate = (date) => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(date)) return false;

    const [, day, month, year] = date.match(regex).map(Number);
    const parseDate = new Date(year, month - 1, day);
    return (
      parseDate.getFullYear() === year &&
      parseDate.getMonth() === month - 1 &&
      parseDate.getDate() === day
    );
  };

  const formatDate = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return `${day} de ${months[month - 1]} de ${year}`;
  };

  const handleDateChange = (text) => {
    const cleaned = text.replace(/\D/g, "").slice(0, 8); // Limita a 8 números

    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(
        2,
        4
      )}/${cleaned.slice(4, 8)}`;
    } else if (cleaned.length > 2) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }

    setEventDate(formatted);
  };

  const handleAdd = () => {
    if (!eventName.trim()) {
      Alert.alert("Erro", "O nome do evento não pode estar vazio");
      return;
    }

    if (!isValidDate(eventDate)) {
      Alert.alert("Erro", "Data inválida. Use o formato dd/mm/yyyy");
      return;
    }

    if (events.some((event) => event.name === eventName)) {
      Alert.alert("Aviso", "Já existe um evento com este nome");
      return;
    }

    const formattedDate = formatDate(eventDate);

    addEvent({ name: eventName, date: formattedDate });
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Registrar Evento"}
        IconComponent={
          <TouchableOpacity onPress={() => router.navigate("/")}>
            <IconArrowBack />
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <TextInput
          style={styles.inputName}
          placeholder="Nome do evento"
          placeholderTextColor="#555"
          value={eventName}
          onChangeText={setEventName}
        ></TextInput>
        <TextInput
          style={styles.inputDate}
          placeholder="Data"
          placeholderTextColor="#555"
          value={eventDate}
          onChangeText={handleDateChange}
          keyboardType="numeric"
          maxLength={10}
        ></TextInput>

        <Button title="Salvar" onPress={handleAdd} />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    gap: 15,
  },
  inputName: {
    backgroundColor: "#EDEDED",
    width: 364,
    height: 125,
    borderRadius: 8,
    marginTop: 20,
    padding: 16,
    textAlignVertical: "top",
    fontWeight:400,
  },
  inputDate: {
    backgroundColor: "#EDEDED",
    width: 350,
    height: 50,
    padding: 16,
    fontWeight:400,
  },
});
