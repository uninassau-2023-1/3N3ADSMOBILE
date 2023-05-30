import Background from "../../../components/Background/Background";
import Header from "../../../components/Header/Header.screen";
import {
  Container,
  ContainerInfo,
  ContainerInfoText,
  ContainerReport,
  InfoTextTittle,
} from "./report.styles";

export default function Report() {
  return (
    <Background>
      <Container>
        <Header tittle="Relatório Detalhado" />
        <ContainerReport>
          <ContainerInfo>
            <InfoTextTittle>Senha numero: </InfoTextTittle>
            <ContainerInfoText>230409-SG01</ContainerInfoText>
          </ContainerInfo>

          <ContainerInfo>
            <InfoTextTittle>Tipo senha: </InfoTextTittle>
            <ContainerInfoText>SG</ContainerInfoText>
          </ContainerInfo>

          <ContainerInfo>
            <InfoTextTittle>Data/Hora emissão</InfoTextTittle>
            <ContainerInfoText>09/04/2023 15:30:00</ContainerInfoText>
          </ContainerInfo>

          <ContainerInfo>
            <InfoTextTittle>Data/Hora Atendimento</InfoTextTittle>
            <ContainerInfoText>09/04/2023 17:30:00</ContainerInfoText>
          </ContainerInfo>
        </ContainerReport>
      </Container>
    </Background>
  );
}
