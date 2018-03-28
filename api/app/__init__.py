from flask import Flask, Blueprint
from flask_cors import CORS
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# local imports
from config import app_config
<<<<<<< HEAD
from app.views import (
    CompanyInfoResource, SingleUser, AllUsersResource,
    AllDevicesResource, SingleDeviceResource,
    DeviceThreats, DeviceByMACAddress, GlobalList,
    MultiplePaginatedPolicies, MultiplePolicies,
    SinglePolicy, Zones, PaginatedZones, DeviceZones,
    PaginatedDeviceZones, ThreatsResource, PaginatedThreats,
    ThreatDevices, PaginatedThreatDevices, ThreatDownloadURL
)
=======
from app.views import CompanyInfoResource, SingleUser, AllUsersResource
>>>>>>> 825774dbf9491b6b28eeb02536a921143056f4ab
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
    api.add_resource(DeviceThreats, '/api/device-threats', endpoint="device-threat")
    api.add_resource(DeviceByMACAddress, '/api/devices/mac-address', endpoint="device-mac-address")
    api.add_resource(GlobalList, '/api/global-lists', endpoint="global-lists")
    api.add_resource(MultiplePaginatedPolicies, '/api/all-policies', endpoint="all-policies-paginated")
    api.add_resource(MultiplePolicies, '/api/policies', endpoint="all-policies")
    api.add_resource(SinglePolicy, '/api/policies/<string:policy_id>', endpoint="single-policies")
    api.add_resource(Zones, '/api/zones/<string:zone_id>', '/api/zones/', '/api/zones', endpoint="zones")
    api.add_resource(PaginatedZones, '/api/paginated-zones/', '/api/paginated-zones', endpoint="paginated-zones")
    api.add_resource(DeviceZones, '/api/device-zones/', '/api/device-zones', endpoint="device-zones")
    api.add_resource(PaginatedDeviceZones, '/api/paginated-device-zones/', '/api/paginated-device-zones', endpoint="paginated-device-zones")
    api.add_resource(ThreatsResource, '/api/threats/', '/api/threats', '/api/threats/<string:zone_hash>', '/api/threats/<string:zone_hash>/', endpoint="threats")
    api.add_resource(PaginatedThreats, '/api/paginated-threats/', '/api/paginated-threats', endpoint="paginated-threats")
    api.add_resource(ThreatDevices, '/api/threat-devices/<string:threat_hash>/', '/api/threat-devices/<string:threat_hash>', endpoint="threat-devices")
    api.add_resource(PaginatedThreatDevices, '/api/paginated-threat-devices/<string:threat_hash>/', '/api/paginated-threat-devices/<string:threat_hash>', endpoint="paginated-threat-devices")
    api.add_resource(ThreatDownloadURL, '/api/threat-download-url/<string:threat_hash>/', '/api/threat-download-url/<string:threat_hash>', endpoint="threat-download-url")

    migrate = Migrate(app, db)
    manager = Manager(app)

    manager.add_command('db', MigrateCommand)

    return app
