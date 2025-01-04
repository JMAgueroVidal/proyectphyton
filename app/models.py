from app.database import get_db

class Usuario:
    def __init__(self, id_usuario=None, nombre=None, apellido=None, telefono=None, reg_date=None):
        self.id_usuario = id_usuario
        self.nombre = nombre
        self.apellido = apellido
        self.telefono = telefono
        self.reg_date = reg_date

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_usuario:
            cursor.execute("""
                UPDATE usuarios SET nombre = %s, apellido = %s, telefono = %s, reg_date = %s
                WHERE id_usuario = %s
            """, (self.nombre, self.apellido, self.telefono, self.reg_date, self.id_usuario))
        else:
            cursor.execute("""
                INSERT INTO usuarios (nombre, apellido, telefono, reg_date) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.apellido, self.telefono, self.reg_date))
            self.id_usuario = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM usuarios")
        rows = cursor.fetchall()
        usuarios = [Usuario(id_usuario=row[0], nombre=row[1], apellido=row[2], telefono=row[3], reg_date=row[4]) for row in rows]
        cursor.close()
        return usuarios

    @staticmethod
    def get_by_id(usuario_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM usuarios WHERE id_usuario = %s", (usuario_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Usuario(id_usuario=row[0], nombre=row[1], apellido=row[2], telefono=row[3], reg_date=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM usuarios WHERE id_usuario = %s", (self.id_usuario,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_usuario': self.id_usuario,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'telefono': self.telefono,
            'reg_date': self.reg_date.strftime('%Y-%m-%d')
        }


