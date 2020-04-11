import React, {useState, useEffect} from 'react';
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';

import styles from './styles';

export default function Incidents () {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindos !</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.IncidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) => (
                    <View style={styles.Incident}>
                    <Text style={styles.IncidentProperty}>ONG:</Text>
                    <Text style={styles.IncidentValue}>{incident.name}</Text>
                
                    <Text style={styles.IncidentProperty}>CASO:</Text>
                    <Text style={styles.IncidentValue}>{incident.title}</Text>

                    <Text style={styles.IncidentProperty}>Valor:</Text>
                    <Text style={styles.IncidentValue}>{Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency:'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailButton} onPress={() => navigationToDetail(incident)}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color="#e02041"></Feather>
                    </TouchableOpacity>
                               
                </View>
                )} 
            />
        
        </View>
    );
}