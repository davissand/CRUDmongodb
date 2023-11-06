from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)



app.config['MONGO_URI'] = 'mongodb+srv://kathe:E7X0YhzVj6USGTT7@implementacion.3mom4vr.mongodb.net/Autos'
CORS(app)
mongo = PyMongo(app)


@app.route('/users', methods=['POST'])
def create_user():
    # Receiving Data
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    if username and email and password:
        hashed_password = generate_password_hash(password)
        id = mongo.db.users.insert(
            {'username': username, 'email': email, 'password': hashed_password})
        response = jsonify({
            '_id': str(id),
            'username': username,
            'password': password,
            'email': email
        })
        response.status_code = 201
        return response
    else:
        return not_found()


@app.route('/clientes-autos', methods=['GET'])
def get_clientes_autos():
    clientes = list(mongo.db.Cliente.aggregate([
    {
        '$lookup': {
            'from': 'Vehiculo',
            'localField': 'vehiculo_id',
            'foreignField': '_id',
            'as': 'vehiculo_info'
        }
    },
    {
        '$lookup': {
            'from': 'Modelo',
            'localField': 'vehiculo_info.modelo_id',
            'foreignField': '_id',
            'as': 'modelo_info'
        }
    },
    {
        '$match': {
            'vehiculo_info': {'$ne': []}
        }
    }
]))
    response = json_util.dumps(clientes)
    return Response(response, mimetype="application/json")

@app.route('/clientes-sin-autos', methods=['GET'])
def get_clientes_sin_autos():
    clientes = list(mongo.db.Cliente.aggregate([
    {
        '$lookup': {
            'from': 'Vehiculo',
            'localField': 'vehiculo_id',
            'foreignField': '_id',
            'as': 'vehiculo_info'
        }
    },
    {
        '$match': {
            'vehiculo_info': {'$size': 0}  # Filtra los clientes sin vehículo asignado
        }
    }
]))
    response = json_util.dumps(clientes)
    return Response(response, mimetype="application/json")


@app.route('/vehiculos_modelo/<id>', methods=['GET'])
def get_vehiculos_modelo(id):
    print(id)
    res = list(mongo.db.Vehiculo.aggregate([
    {
        '$match': {
            'modelo_id': id  # Filtra por el ID del modelo deseado
        }
    }
]))
    response = json_util.dumps(res)
    return Response(response, mimetype="application/json")

@app.route('/clientes_zona/<direccion>', methods=['GET'])
def get_clientes_zona(direccion):
    clientes = list(mongo.db.Cliente.find({'direccion': direccion}))
    response = json_util.dumps(clientes)
    return Response(response, mimetype="application/json")


@app.route('/vehiculo_zona/<direccion>', methods=['GET'])
def get_vehiculo_zona(direccion):
    vehiculos = list(mongo.db.Cliente.aggregate([
    {
        '$match': {
            'direccion': direccion # Filtra por la dirección deseada
        }
    },
    {
        '$lookup': {
            'from': 'Vehiculo',
            'localField': 'vehiculo_id',
            'foreignField': '_id',
            'as': 'vehiculo_info'
        }
    },
    {
        '$lookup': {
            'from': 'Modelo',
            'localField': 'vehiculo_info.modelo_id',
            'foreignField': '_id',
            'as': 'modelo_info'
        }
    }
]))
    response = json_util.dumps(vehiculos)
    return Response(response, mimetype="application/json")

@app.route('/vehiculos_menores_anio/<int:fecha>', methods=['GET'])
def get_vehiculos_menores(fecha):
    vehiculos =  list(mongo.db.Vehiculo.find({'anio': {'$lt': fecha}}))
    response = json_util.dumps(vehiculos)
    return Response(response, mimetype="application/json")

@app.route('/vehiculos_mayores_anio/<int:fecha>', methods=['GET'])
def get_vehiculos_mayores(fecha):
    vehiculos =  list(mongo.db.Vehiculo.find({'anio': {'$gt': fecha}}))
    response = json_util.dumps(vehiculos)
    return Response(response, mimetype="application/json")

@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    print(id)
    user = mongo.db.users.find_one({'_id': ObjectId(id), })
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")


@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    mongo.db.users.delete_one({'_id': ObjectId(id)})
    response = jsonify({'message': 'User' + id + ' Deleted Successfully'})
    response.status_code = 200
    return response


@app.route('/users/<_id>', methods=['PUT'])
def update_user(_id):
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    if username and email and password and _id:
        hashed_password = generate_password_hash(password)
        mongo.db.users.update_one(
            {'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)}, {'$set': {'username': username, 'email': email, 'password': hashed_password}})
        response = jsonify({'message': 'User' + _id + 'Updated Successfuly'})
        response.status_code = 200
        return response
    else:
      return not_found()


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'Resource Not Found ' + request.url,
        'status': 404
    }
    response = jsonify(message)
    response.status_code = 404
    return response


if __name__ == "__main__":
    app.run(debug=True, port=3000)