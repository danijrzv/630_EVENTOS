const generarId = ()=>{
    // GENERAR ID CON COMBINACIÓN DATE.NOW() Y RANDOM
    return Date.now().toString(32) + Math.random().toString(32).substring(2)
}

// EXPORTANDO FUNCIÓN
export default generarId