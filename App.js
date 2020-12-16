import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, ScrollView, ActivityIndicator} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';


const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);
  useEffect(() => {
    console.log('CONSULTAR API HA CAMBIADO');

    //consultar a api para obtener la api para obtener la cotizacion
    const cotizarCriptomoneda = async () => {
      if (consultarAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url)
        guardarCargando(true)
        //ocultar el spinner y mostrar el resultado

        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
          guardarConsultarAPI(false)
          guardarCargando(false)
        }, 3000)

    
      }
    };
    cotizarCriptomoneda()
  }, [consultarAPI]);

  // mostrsr el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> :  <Cotizacion resultado={resultado} />
  return (
    <ScrollView>
      <Header />
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
       
      </View>
      <View style={{marginTop: 40}}>
     {componente}
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
