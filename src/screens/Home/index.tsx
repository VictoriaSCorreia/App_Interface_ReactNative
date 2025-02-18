import { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [participantName, setParticipantName] = useState(''); /* participantName é a "variável" e setParticipantName é
  a função que se utiliza para mudar seu ESTADO */
  const [participants, setParticipants] = useState<string[]>([]); /* Um array pode ser de outros tipos, então se deve
  especificar que é de string */
  
  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.");
    }
    if(!participantName.trim()){
      return Alert.alert("Erro", "Digite um nome.")
    }

    setParticipants(prevState => [...prevState, participantName]); /* prevState é para preservar o que já estava no array
    e ...prevState seria para o array não ficar assim: [["João"], "Ana"] */
    setParticipantName(''); /* limpa a variável */
  }
  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Reunião
      </Text>

      <Text style={styles.eventDate}>
        Quinta, 27 de Fevereiro de 2025
      </Text>

      <Text style={styles.participantCount}>
        Participantes: {participants.length}
      </Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName} /* atribui as mudanças sendo digitadas à variável participantName */
          value={participantName} /* Limpa o campo quando o botão é pressionado */
        />
        
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={(item) => item} /*  todo componente deve ter uma key, aqui ela é atribuída ao próprio nome */
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}> Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.</Text>
        )}
      /> 
    </View>
    /* Maiores possibilidades de configuração do que o ScrollView, ela também vai renderizando
            conforme o usuário rola a tela. ScrollView renderiza tudo de vez, recomendado para listas pequenas */
    /* <ScrollView showsVerticalScrollIndicator={false}>
        {
          participants.map(participant => (
            <Participant 
              key={participant} 
              name={participant} 
              onRemove={() => handleParticipantRemove("Rodrigo")} 
            />
          ))
        }
        </ScrollView> */
  )
}