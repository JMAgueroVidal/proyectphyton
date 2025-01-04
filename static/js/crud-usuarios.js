class Usuario{

    constructor(id,nombre,apellido,telefono,reg_date){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.telefono=telefono;
        this.reg_date=reg_date;
    }

}


function showUsuarios(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    //buscar elemento HTML donde quiero insertar los usuarios
    const tbodyUsuarios = document.querySelector('#list-table-usuarios tbody');
    // const tbodyUsuarios = document.getElementById('#tbody-table-usuarios');
    //limpio el contenido de la tabla
    tbodyUsuarios.innerHTML = '';
    usuarios.forEach(usuario => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.apellido}</td>
                        <td>${usuario.teléfono}</td>
                        <td>${usuario.reg_date}</td>
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateUsuario(${usuario.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteUsuario(${usuario.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyUsuarios.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar un usuario al listado de usuarios
 * almacenado en el localstorage
 */
function saveUsuario(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-usuario');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id_usuario');
    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputTelefono = document.querySelector('#telefono');
    const inputReg_date = document.querySelector('#reg_date');

    //Realizo una validación simple de acuerdo al contenido del value del input del nombre
    if(inputNombre.value.trim() !== ''){
        //Busca en localstorage el item usuarios, si no existe asigna el array vacio.
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de usuarios el objeto a editar
            const usuarioFind = usuarios.find(usuario => usuario.id == inputId.value);
            //Si existe actualizo el objeto
            if (usuarioFind) {
              usuarioFind.nombre = inputNombre.value;
              usuarioFind.apellido = inputApellido.value;
              usuarioFind.telefono = inputTelefono.value;
              usuarioFind.reg_date = inputReg_date.value;
            }
        }else{
            let newUsuario = new Usuario(
                usuarios.length+1,
                inputNombre.value,
                inputApellido.value,
                inputTelefono.value,
                inputReg_date.value,
            );
            usuarios.push(newUsuario);
        }

        //Se actualiza el array de usuarios en el localstorage
        localStorage.setItem('usuarios',JSON.stringify(usuarios));
        showUsuarios();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            nombre: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            nombre: 'Error!',
            text: 'Por favor completa el campo Nombre.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar un usuario
 * de acuedo al id del usuario
 * @param {number} usuarioId id usuario que se va a actualizar
 */
function updateUsuario(usuarioId){
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    //se utiliza el metodo find para poder asegurarnos que exista un contacto con el id que queremos eliminar.
    let usuarioToUpdate = usuarios.find(usuario => usuario.id===usuarioId);
    if(usuarioToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id_usuario');
        const inputNombre = document.querySelector('#nombre');
        const inputApellido = document.querySelector('#apellido');
        const inputTelefono = document.querySelector('#telefono');
        const inputReg_date = document.querySelector('#reg_date');
        //Se cargan los inputs con los valores del usuario encontrada
        inputId.value = usuarioToUpdate.id;
        inputNombre.value = usuarioToUpdate.nombre;
        inputApellido.value = usuarioToUpdate.apellido;
        inputTelefono.value = usuarioToUpdate.telefono;
        inputReg_date.value = usuarioToUpdate.reg_date;
    }
}

/**
 * Function que permite eliminar una usuario del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} usuarioId id usuario que se va a eliminar
 */
function deleteUsuario(usuarioId){
    let usuarios = JSON.parse(localStorage.getItem('usuarios'));
    //se utiliza el metodo find para poder asegurarnos que exista un contactpa con el id que queremos eliminar.
    let usuarioToDelete = usuarios.find(usuario => usuario.id===usuarioId);
    if(usuarioToDelete){
        //se utiliza el metodo filter para actualizar el array de usuarios, sin tener el elemento encontrado en cuestion.
        usuarios = usuarios.filter(usuario => usuario.id !== usuarioToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('usuarios',JSON.stringify(usuarios));
        showUsuarios();
        Swal.fire({
            nombre: 'Exito!',
            text: 'El contacto fue eliminado.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveUsuario = document.querySelector('#btn-save-usuario');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUsuario.addEventListener('click',saveUsuario);
    showUsuarios();
});
