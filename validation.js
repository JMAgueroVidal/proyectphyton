
    const formRegister= document.getElementById("formulario");
    const inputnombre = document.getElementById('nombre');
    const inputapellido = document.getElementById('apellido');
    const inputEmail = document.getElementById('email');
    const inputTelefono = document.getElementById('telefono');
    const genero = document.querySelector('input[name="genero"]:checked');
    const localidad = document.getElementById('localidad');
    const inputDondenosConocio = document.getElementById('dondenosconocio');
    const inputConsulta = document.getElementById('consulta');
    const parrafo=document.getElementById("error");

    formRegister.addEventListener("submit", e=>{
        e.preventDefault();
        let warning="";
        let valor=false;
        parrafo.innerHTML="";
        let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let regexTelefono=/^[0-9]+$/;
        
        if(inputnombre.value.length<3){
            warning+='El nombre es corto'
            valor=true;
        }
        if(inputapellido.value.length<3){
            warning+='El apellido es corto'
        }
        if(!regexEmail.test(inputEmail.value)){
            warning+='El Email no es valido'
            valor=true;
        }
        if (inputTelefono.value) {
            if (!regexTelefono.test(inputTelefono.value)) {
                warning += 'El teléfono solo puede contener números';
                valor = true;}
            }
            if (inputdondenosconocio.value.length<6){
                warning+='Indique por que medio nos conocio';
                valor=true;
            }
            if (inputConsulta.value.length<30) {
                warning+='realize su consulta, con mas de 30 caracteres';
                valor=true;
            }
        if(valor){
            parrafo.innerHTML=warning;
        }else{
            parrafo.innerHTML="Enviado";
            formRegister.reset();
        }


    });
