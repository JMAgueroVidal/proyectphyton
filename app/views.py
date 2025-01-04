from flask import jsonify, request
from app.models import Usuario

def index():
    return jsonify({'message': 'API Usuario Cedes'})

def create_usuario():
    data = request.json
    new_usuario = Usuario(nombre=data['nombre'], apellido=data['apellido'], telefono=data['telefono'], reg_date=data['reg_date'])
    new_usuario.save()
    return jsonify({'message': 'Dato creado correctamente'}), 201

def get_all_usuarios():
    usuarios = Usuario.get_all()
    return jsonify([usuario.serialize() for usuario in usuarios])

def get_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Dato no encontrado'}), 404
    return jsonify(usuario.serialize())

def update_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Dato no encontrado'}), 404
    data = request.json
    usuario.nombre = data['nombre']
    usuario.apellido = data['apellido']
    usuario.telefono = data['telefono']
    usuario.reg_date = data['reg_date']
    usuario.save()
    return jsonify({'message': 'Dato modificado correctamente'})

def delete_usuario(usuario_id):
    usuario = Usuario.get_by_id(usuario_id)
    if not usuario:
        return jsonify({'message': 'Dato no encontrado'}), 404
    usuario.delete()
    return jsonify({'message': 'Dato eliminado correctamente'})