import React from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

export default function Detail () {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;


    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}", com o valor de ${Intl.NumberFormat('pt-BR', 
    {style: 'currency', currency:'BRL'}).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
        
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name='arrow-left' size={28} color="#e02041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.Incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
    <Text style={styles.IncidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                
                    <Text style={styles.IncidentProperty}>CASO:</Text>
                    <Text style={styles.IncidentValue}>{incident.title}</Text>

                    <Text style={styles.IncidentProperty}>Valor:</Text>
                    <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency:'BRL'}).format(incident.value)}</Text>
            </View>        

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia !</Text>
                <Text style={styles.heroTitle}>Seja o heroi deste caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}