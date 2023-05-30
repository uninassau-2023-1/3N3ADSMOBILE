import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 0px 10px;
  align-items: center;
`;

export const ContainerReport = styled.View`
  flex-direction: row;
  background-color: white;
  border-radius: 4px;
  width: 100%;
  height: 130px;
  margin-top: 30px;
`;

export const ContainerInfo = styled.View`
  border-right-width: 1px;
  height: 100%;
  width: 25%;
  align-items: center;
  justify-content: center;
`;

export const InfoTextTittle = styled.Text`
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  top: 0px;
  text-align: center;
`;

export const ContainerInfoText = styled.Text`
  color: black;
  text-align: center;
  font-size: 16px;
`;
