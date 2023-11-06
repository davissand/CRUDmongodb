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