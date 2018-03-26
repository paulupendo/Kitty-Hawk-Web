from flask import Flask, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# local imports
from config import app_config
from app.views import (
    CompanyInfoResource, SingleUser, AllUsersResource,
    AllDevicesResource, SingleDeviceResource
)
from app.models import db


api_blueprint = Blueprint('api', __name__)
api = Api(api_blueprint)


def create_app(config_mode):
    """
    To create application factory.
    This allows creation of app instances.

    :param config_mode: can be development, testing or production
    :return: app
    """
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_object(app_config[config_mode])

    from app import models
    db.init_app(app)
    app.register_blueprint(api_blueprint)

    # define endpoints
    api.add_resource(CompanyInfoResource, "/api/company-info", endpoint="company_info")
    api.add_resource(SingleUser, '/api/users', endpoint="users")
    api.add_resource(AllUsersResource, '/api/all-users', endpoint="all-users")
    api.add_resource(AllDevicesResource, '/api/all-devices', endpoint="all-devices")
    api.add_resource(SingleDeviceResource, '/api/single-device', endpoint="single-devices")

    migrate = Migrate(app, db)
    manager = Manager(app)

    manager.add_command('db', MigrateCommand)

    return app
