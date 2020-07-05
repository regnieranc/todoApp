import React from 'react'
import {Text, Icon, Input, Button} from 'react-native-elements'
import { Modal as M, View, Alert } from 'react-native'
import { Col, Row } from "react-native-easy-grid"
import DateTimePicker from '@react-native-community/datetimepicker'

export default class Modal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showPickerDate: false,
            showPickerTime: false,
            date: new Date(),
            fecha: '',
            hora: '',
            titulo: '',
            descripcion: ''
        }
    }

    onChangeDate = (e, date) => {
        let fecha = date.getFullYear()+'-'+(date.getMonth()+1<=9?'0'+(date.getMonth()+1):(date.getMonth()+1))+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
        console.log(fecha)
        this.setState({showPickerDate: false, fecha})
        console.log('estado', this.state)
    }

    onChangeTime = (e, date) => {
        let hora = (date.getHours()<10?'0'+date.getHours():date.getHours())+':'+(date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes())+':00'
        this.setState({showPickerTime: false, hora})
    }

    onChangeTextTitulo = e => {
        console.log(e)
    }

    validar = () => {
        if(this.state.fecha=='' && this.state.hora=='' || this.state.titulo=='')
            Alert.alert('Error de validación', 'Falta llenar algunos datos')
        else{
            this.setState({fecha:'', hora: '', titulo: '', descripcion: ''})
            this.props.datosModal(this.state.titulo, this.state.descripcion, this.state.fecha, this.state.hora)
        }
    }

    render(){
        return(
            <>
                <M
                    visible={this.props.isVisible}    
                >
                    <View style={{height: 56, backgroundColor: '#2089dc', justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
                        <Text style={{color: 'white', fontSize: 18}}>Agregar Tarea</Text>
                    </View>

                    <Input
                        placeholder='Tarea'
                        onChangeText={text => this.setState({titulo: text})}
                        value={this.state.titulo}
                        inputContainerStyle={{borderBottomColor: '#bebebe', borderBottomWidth: 0.5}}
                    />
            
                    <Input
                        placeholder='Descripcion'
                        onChangeText={text => this.setState({descripcion: text})}
                        value={this.state.descripcion}
                        inputContainerStyle={{borderBottomColor: '#bebebe', borderBottomWidth: 0.5}}
                    />
                    <Row style={{height: 50, marginTop: 30}}>
                        <Col style={{margin: 6}}>
                            <Button
                                onPress={() => this.setState({showPickerDate: true})} 
                                title={this.state.fecha==''?'Fecha':this.state.fecha}
                            />
                        </Col>
                        <Col style={{margin: 6}}>
                            <Button
                                onPress={() => this.setState({showPickerTime: true})} 
                                title={this.state.hora==''?'Hora':this.state.hora}
                            />
                        </Col>
                    </Row>
                    
                    {
                        this.state.showPickerDate?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeDate}
                        /> : null
                    }
                    
                    {
                        this.state.showPickerTime?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={this.state.date}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChangeTime}
                        /> : null
                    }
                    <Row>
                        <Col style={{margin: 6}}>
                            <Button
                                title='Aceptar'
                                onPress={this.validar}
                            />
                        </Col>
                        <Col style={{margin: 6}}>
                            <Button
                                title='Cancelar'
                                onPress={() => this.props.hideModal(false)}
                            />
                        </Col>
                    </Row>
                </M>
            </>
        )
    }
}