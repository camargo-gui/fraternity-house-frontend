import axios from 'axios';

interface CEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export const getCEP = async (cep: string): Promise<CEP> => {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return response.data;
};
