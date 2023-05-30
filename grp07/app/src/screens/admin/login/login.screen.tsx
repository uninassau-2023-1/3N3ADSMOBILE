import { Alert, Pressable } from "react-native/";
import Background from "../../../components/Background/Background";
import useLoginController from "../../../controllers/useLoginController";
import {
  Button,
  ButtonText,
  Container,
  ContenModal,
  Image,
  Input,
  TextForgot,
} from "./login.styles";

export default function Login() {
  const { setEmail, setPassword, verifyUser } = useLoginController();

  return (
    <Background>
      <Container>
        <Image source={require("../../../assets/imageWelcome.png")} />
        <ContenModal>
          <Input
            keyboardType="email-address"
            placeholder="E-mail"
            placeholderTextColor={"#828282BF"}
            onChangeText={setEmail}
          />
          <Input
            secureTextEntry
            placeholder="Senha"
            placeholderTextColor={"#828282BF"}
            onChangeText={setPassword}
          />

          <Button onPress={verifyUser}>
            <ButtonText>Acessar</ButtonText>
          </Button>

          <Pressable
            onPress={() =>
              Alert.alert(
                "Esqueceu a senha?",
                "Entre em contato com o administrador para resgatar a senha."
              )
            }
          >
            <TextForgot>Esqueceu a senha?{`\n`}Clique aqui!</TextForgot>
          </Pressable>
        </ContenModal>
      </Container>
    </Background>
  );
}
