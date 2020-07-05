/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {StyleSheet, SafeAreaView, View, ScrollView, Alert, ActivityIndicator, Vibration, ToastAndroid} from 'react-native'
import {Header, Icon, ListItem, Text, Tooltip} from 'react-native-elements'
import Modal from './components/Modal'
import AsyncStorage from '@react-native-community/async-storage'


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isVisible: false,
            listaTareas: [],
            loading: true
        }
    }

    rightComponent = () => {
        return <Icon
                    name="add"
                    size={20}
                    color="white"
                    onPress={() => this.setState({isVisible: true})}
                />
    }

    hideModal = bandera => {
        this.setState({isVisible: bandera})
    }

    async componentDidMount(){
        let listado = await AsyncStorage.getItem('listado')
        if(!listado)
            listado=[]
        this.setState({listaTareas: JSON.parse(listado), loading: false})
    }

    datosModal = async (titulo, descripcion, fecha, hora) => {
        let tarea = new Object()
        let {listaTareas} = this.state
        tarea.titulo = titulo
        tarea.descripcion = descripcion
        tarea.fecha = fecha
        tarea.hora = hora
        listaTareas.push(tarea)
        await this.setState({listaTareas, isVisible: false})
        await AsyncStorage.removeItem('listado')
        await AsyncStorage.setItem('listado', JSON.stringify(this.state.listaTareas))
        Vibration.vibrate()
        ToastAndroid.show('Tarea Agregada!!', ToastAndroid.SHORT)
    }

    clickList = async(index, ele) => {
        console.log(index)
        Alert.alert('Información', `Tarea: ${ele.titulo}\nDescripción: ${ele.descripcion}\nFecha: ${ele.fecha}\nHora: ${ele.hora}`,
        [
            {
                text: 'eliminar',
                onPress: async () => {
                    let listado = this.state.listaTareas
                    listado.splice(index, 1)
                    await this.setState({listaTareas: listado})
                    await AsyncStorage.removeItem('listado')
                    await AsyncStorage.setItem('listado', JSON.stringify(this.state.listaTareas))
                    Vibration.vibrate()
                    ToastAndroid.show('Tarea Eliminada!!', ToastAndroid.SHORT)
                }
            },
            {
                text: 'ok'
            }
        ])
    }

    render(){
        return (
            <>
                <SafeAreaView>
                    <Header 
                        centerComponent = {{text: 'TodoApp', style:{color: 'white', fontSize: 20}}}
                        rightComponent = {this.rightComponent()}
                    />
                    <Modal 
                        isVisible = {this.state.isVisible}
                        hideModal = {this.hideModal}
                        datosModal = {this.datosModal}
                    />
                    <ScrollView contentContainerStyle={{flexGrow: 1}}>
                        {
                        this.state.listaTareas.length!=0?
                        <View style={{flex: 1, marginBottom: 100}}>
                            {
                                this.state.listaTareas.map((ele, index) => {
                                    console.log(ele)
                                    return (
                                        <ListItem
                                            key = {index}
                                            title = {ele.titulo}
                                            subtitle = {ele.descripcion}
                                            style={{borderBottomWidth: 1.5, borderBottomColor: '#eeeeee'}}
                                            onPress = { () => this.clickList(index, ele)}
                                            onLongPress = {() => ToastAndroid.show(ele.fecha+" "+ele.hora, ToastAndroid.SHORT)}
                                        />
                                    )
                                }) 
                            }
                        </View> : this.state.loading?<ActivityIndicator color= '#2089dc' size='large' /> : <Text>No hay tareas</Text>
                        }
                   </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}



