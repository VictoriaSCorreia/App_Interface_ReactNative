import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type Props = {
  name: string;
  onRemove: () => void;
} /* fazer a tipagem dos parâmetros */

export function Participant({ name, onRemove }: Props) {  /* onRemove é uma função enviada como parâmetro */
  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {name}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}> {/*  ao pressionar, onRemove é executada */}
          <Text style={styles.buttonText}>
            -
          </Text>
      </TouchableOpacity>
    </View>
  )
}