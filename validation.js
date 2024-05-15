function validateForm() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;
    const genero = document.querySelector('input[name="genero"]:checked');
    const localidad = document.getElementById('localidad').value;
    const dondenosconocio = document.getElementById('dondenosconocio').value;
    const consulta = document.getElementById('consulta').value;

    if (!nombre) {
        alert('Por favor, ingrese su nombre.');
        return false;
    }
    if (!apellido) {
        alert('Por favor, ingrese su apellido.');
        return false;
    }
    if (!telefono || !/^\d+$/.test(telefono)) {
        alert('Por favor, ingrese un número de teléfono válido.');
        return false;
    }
    if (!genero) {
        alert('Por favor, seleccione su género.');
        return false;
    }
    if (!localidad) {
        alert('Por favor, ingrese su localidad.');
        return false;
    }
    if (!dondenosconocio) {
        alert('Por favor, ingrese dónde nos conoció.');
        return false;
    }
    if (!consulta) {
        alert('Por favor, ingrese su consulta.');
        return false;
    }
    return true;
}