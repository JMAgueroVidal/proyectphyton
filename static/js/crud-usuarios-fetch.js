const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de usuario
 * @returns 
 */
async function saveUsuario(){
  const idUsuario = document.querySelector('#id_usuario').value;
  const nombre = document.querySelector('#nombre').value;
  const apellido = document.querySelector('#apellido').value;
  const telefono = document.querySelector('#telefono').value;
  const reg_data = document.querySelector('#reg_date').value;


  //VALIDACION DE FORMULARIO
  if (!nombre || !apellido || !telefono || !reg_data) {
    Swal.fire({
        nombre: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos del usuario
  const usuarioData = {
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      reg_date: reg_data
  };

    
  let result = null;
  // Si hay un idUsuario, realiza una petición PUT para actualizar el usuario existente
  if(idUsuario!==""){
    result = await fetchData(`${BASEURL}/api/usuarios/${idUsuario}`, 'PUT', usuarioData);
  }else{
    // Si no hay idUsuario, realiza una petición POST para crear un nuevo usuario
    result = await fetchData(`${BASEURL}/api/usuarios/`, 'POST', usuarioData);
  }
  
  const formUsuario = document.querySelector('#form-usuario');
  formUsuario.reset();
  Swal.fire({
    nombre: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showUsuarios();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de usuarios
 * por medio del uso de template string de JS.
 */
async function showUsuarios(){
  let usuarios =  await fetchData(BASEURL+'/api/usuarios/', 'GET');
  const tableUsuarios = document.querySelector('#list-table-usuarios tbody');
  tableUsuarios.innerHTML='';
  usuarios.forEach((usuario,index) => {
    let tr = `<tr>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.apellido}</td>
                  <td>${usuario.telefono}</td>
                  <td>${usuario.reg_date}</td>
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateUsuario(${usuario.id_usuario})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteUsuario(${usuario.id_usuario})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableUsuarios.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * Function que permite eliminar un usuario del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteUsuario(id){
  Swal.fire({
      nombre: "Esta seguro de eliminar el usuario?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'DELETE');
        showUsuarios();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos del usuario 
 * para su edición
 * @param {number} id Id del usuario que se quiere editar
 */
async function updateUsuario(id){
  //Buscamos en el servidor el usuario de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'GET');
  const idUsuario = document.querySelector('#id_usuario');
  const nombre = document.querySelector('#nombre');
  const apellido = document.querySelector('#apellido');
  const telefono = document.querySelector('#telefono');
  const reg_data = document.querySelector('#reg_date');

  idUsuario.value = response.id_usuario;
  nombre.value = response.nombre;
  apellido.value = response.apellido;
  telefono.value = response.telefono;
  reg_data.value = response.reg_date;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveUsuario = document.querySelector('#btn-save-usuario');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveUsuario.addEventListener('click',saveUsuario);
  showUsuarios();
});

let refresh = document.getElementById('refresh');
refresh.addEventListener('click', _ => {
            location.reload();
})