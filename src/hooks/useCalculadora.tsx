import { useState, useRef } from "react";

enum Operadores {
    sumar, restar, multiplicar, dividir
}


export const useCalculadora = () => {
    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('100');

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0');
        setNumeroAnterior('0');
    }

    const armarNumero = (numeroTexto: string) => {
        //verificar si existe un punto decimal 

        if (numero.includes(".") && numeroTexto === '.') return;

        if (numero.startsWith('0') || numero.startsWith("-0")) {
            //punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);
                //evaluar si es otro 0 y hay un punto
            } else if (numeroTexto === '0' && numero.includes('')) {
                setNumero(numero + numeroTexto);

                //Evaluar si es diferente a 0 y no tiene punto
            } else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);

                //Evitar el 000.0000
            } else if (numeroTexto === '0' && !numero.includes('0')) {
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto)
            }
        } else {
            setNumero(numero + numeroTexto)

        }
    }

    const positivoNegativo = () => {
        if (numero.includes("-")) {
            setNumero(numero.replace("-", ""));
        } else {
            setNumero("-" + numero)
        }
    }

    const btnDelete = () => {
        let negativo = '';
        let numeroTemp = numero; 

        if(numero.includes("-")) {
            negativo = '-';
            numeroTemp = numero.substr(1);
        }

        if( numeroTemp.length > 1 ) {
            setNumero( negativo + numeroTemp.slice(0, -1) );
        } else {
            setNumero('0');
        }
    }

    const cambiarNumPorAnterior = () => {
        if(numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior( numero );
        }
        setNumero('0');
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.dividir;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.multiplicar;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.restar;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.sumar;
    }

    const calcular = () => {
        const num1 = Number( numero );
        const num2 = Number( numeroAnterior );

        switch( ultimaOperacion.current ) {
            case Operadores.sumar:
                setNumero(`${num1 + num2}`);
                break;
            
            case Operadores.restar: 
                setNumero(`${num2 - num1}`);
                break;
            
            case Operadores.multiplicar: 
                setNumero(`${num1 * num2}`);
                break;

            case Operadores.dividir: 
                setNumero(`${num2 / num1}`)

            default: 
                break;
        }

        setNumeroAnterior('0');
    }

    return {
        numeroAnterior,
        numero,
        limpiar, 
        positivoNegativo, 
        btnDelete, 
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar, 
        calcular
    }
}