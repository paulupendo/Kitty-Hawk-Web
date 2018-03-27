"""
To handle API CRUD operations.
"""
import uuid
import requests
from datetime import datetime, timedelta

from flask import request, jsonify
from flask_restful import Resource, reqparse
import jwt
import json

from .models import CompanyInfo, db


# 30 minutes from now
timeout = 1800
now = datetime.utcnow()
timeout_datetime = now + timedelta(seconds=timeout)
epoch_time = int((now - datetime(1970, 1, 1)).total_seconds())
epoch_timeout = int((timeout_datetime - datetime(1970, 1, 1)).total_seconds())
jti_val = str(uuid.uuid4())

AUTH_URL = "https://protectapi.cylance.com/auth/v2/token"


class CompanyInfoResource(Resource):
    """
    To handle company info endpoints.
    """

    def post(self):
        """
        Save company info
        /company-info
        """
        payload = request.get_json()
        # Name, Company, Email, Phone, TenantId, AppId, AppSecret
        name = payload["name"]
        company = payload["company"]
        email = payload["email"]
        phone_number = payload["phone_number"]
        app_id = payload["app_id"]
        tenant_id = payload["tenant_id"]
        app_secret = payload["app_secret"]
        comment = payload["comment"]
        app_secret = payload["app_secret"]
        if not payload['name'] or not payload['company'] or not payload['email'] or not payload['phone_number'] \
                or not payload['tenant_id'] or not payload['app_id'] or not payload['app_secret']:
            response = jsonify({
                "message": "All fields are required."
            })
            return response
        else:
            # 30 minutes from now
            timeout = 1800
            now = datetime.utcnow()
            timeout_datetime = now + timedelta(seconds=timeout)
            epoch_time = int((now - datetime(1970, 1, 1)).total_seconds())
            epoch_timeout = int(
                (timeout_datetime - datetime(1970, 1, 1)).total_seconds())
            jti_val = str(uuid.uuid4())
            tid_val = payload['tenant_id']  # The tenant's unique identifier.
            AUTH_URL = "https://protectapi-au.cylance.com/auth/v2/token"

            claims = {
                "exp": epoch_timeout,
                "iat": epoch_time,
                "iss": "http://cylance.com",
                "sub": str(app_id),
                "tid": str(tid_val),
                "jti": jti_val
            }

            auth_token = jwt.encode(claims, str(
                app_secret), algorithm='HS256')  # auth token
            payload = {"auth_token": auth_token}
            headers = {"Content-Type": "application/json; charset=utf-8"}
            resp = requests.post(AUTH_URL, headers=headers,
                                 data=json.dumps(payload))
            access_token = json.loads(resp.text)['access_token']
            # save to db
            company_info = CompanyInfo(
                name=name, company=company,
                email=email, phone_number=phone_number,
                tenant_id=tenant_id, app_id=app_id,
                app_secret=app_secret, access_token=access_token)
            db.session.add(company_info)
            db.session.commit()
            company_response = jsonify({
                "data": {
                    "name": name,
                    "company": company,
                    "email": email,
                    "phone_number": phone_number,
                    "tenant_id": tenant_id,
                    "app_id": app_id,
                    "app_secret": app_secret,
                    "comment": comment,
                    "access_token": access_token,
                   "message": "company created successfully."
                },
            })
            company_info.status_code = 201

            return company_response
    def get(self):
        """
        takes access token from URL params
        /company-info?company_name=<name>
        """
        url_params = request.args
        # fetch all companies
        companies = CompanyInfo.query.all()
        companies = [company.name for company in companies]
        return jsonify({
            "data": {
                "companies": companies,
                "message": "All companies fetched successfully" if companies else "No companies found"
            }
        })

class SingleUser(Resource):
    """
    User endpoints.
    """
    def get(self):
        """
        GET operations for users
        """
        url_params = request.args
        if url_params['user_id']:
            """
            /users?user_id=<user_id>&company_name=<name>
            """
            print("test args here", url_params['company_name'])
            user_id = url_params['user_id']
            URL = "https://protectapi-au.cylance.com/users/v2/"+user_id
            # search company
            search_company = CompanyInfo.query.filter_by(name=url_params['company_name']).first()
            # handle edge cases here!!!
            token = search_company.access_token
            print('token == ', token)
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            users = json.loads(response.text)
            if users.keys():
                return jsonify({
                    "data": {
                        "user": json.loads(response.text),
                    },
                    "message": "User fetched successfully."
                })
            else:
                return jsonify({
                    "message": "User not found"
                })

class AllUsersResource(Resource):
    """
    Get all company users
    """
    def get(self):
        """
        /all-users?company_name=<name>
        """
        url_params = request.args
        print("test args here ====", url_params['company_name'])
        company_name = url_params['company_name']
        URL = "https://protectapi-au.cylance.com/users/v2"
        # search company
        search_company = CompanyInfo.query.filter_by(name=url_params['company_name']).first()
        print("search_company ", URL)
        # handle edge cases here!!!
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        users = json.loads(response.text)
        if users['page_items']:
            return jsonify({
                "data": {
                    "users": json.loads(response.text),
                    "message": "Users fetched successfully"
                }
            })
        else:
            return jsonify({
                "message": "No users found"
            })

class AllDevicesResource(Resource):
    def get(self):
        """
        /all-devices?company_name=<name>&page=<page>&limit=<limit>
        """
        url_params = request.args
        if url_params['page'] and url_params['limit']:
            page = url_params['page']
            limit = url_params['limit']
            URL = "https://protectapi-au.cylance.com/devices/v2?page?page="+page+"&page_size="+limit
            company_name = url_params['company_name']
            search_company = CompanyInfo.query.filter_by(name=url_params['company_name']).first()
            print("search_company ", URL)
            # handle edge cases here!!!
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            devices = json.loads(response.text)
            if devices['page_items']:
                return jsonify({
                    "data": {
                        "device": json.loads(response.text),
                        "message": "Device fetched successfully." if devices['page_items'] else "No devices found"
                    }
                })
            else:
                return jsonify({
                    "message": "No devices found"
                })
        else:
            return jsonify({
                "message": "Company doesn't exist"
            })

class SingleDeviceResource(Resource):
    def get(self):
        """
        /single-device?company_name=<name>&device_id=<device_id>
        """
        url_params = request.args
        device_id = url_params['device_id']
        URL = "https://protectapi-au.cylance.com/devices/v2/"+str(device_id)
        search_company = CompanyInfo.query.filter_by(name=url_params['company_name']).first()
        if search_company:
            # handle edge cases here!!!
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            device = json.loads(response.text)
            if device.keys():
                return jsonify({
                    "data": {
                        "device": device,
                        "message": "Device fetched successfully."
                    }
                })
            else:
                return jsonify({
                    "message": "No device found"
                })

class DeviceThreats(Resource):
    def get(self):
        """
        GET: /device-threats?company_name=<name>&device_id=<device_id>&page=<page>&limit=<limit>
        """
        url_params = request.args
        page = url_params['page']
        limit = url_params['limit']
        device_id = url_params['device_id']
        URL = "https://protectapi-au.cylance.com/devices/v2/"+device_id+"/threats?page="+page+"&page_size="+limit
        search_company = CompanyInfo.query.filter_by(name=url_params['company_name']).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device_threat = json.loads(response.text)
        print(device_threat)
        if device_threat['page_items']:
            return jsonify({
                "data": {
                    "device": device_threat,
                    "message": "Device threats fetched successfully."
                }
            })
        else:
            return jsonify({
                "message": "No device threats found"
            })

class DeviceByMACAddress(Resource):
    def get(self):
        """
        GET: /api/devices/mac-address?company_name=<company_name>&mac_address=<mac_address>
        """
        url_params = request.args
        mac_address = url_params['mac_address']
        URL = "https://protectapi-au.cylance.com/devices/v2/macaddress/"+str(mac_address)
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device = json.loads(response.text)
        return jsonify(device if device["message"] else {"data": {"device": device, "message": "Device fetched successfully."}})

class GlobalList(Resource):
    def get(self):
        """
        GET: /api/global-lists?company_name=<company_name>&list_typed_id=<id>
        """
        url_params = request.args
        list_typed_id = url_params['list_typed_id']
        URL = "https://protectapi-au.cylance.com/globallists/v2?listTypeId="+list_typed_id+"&page=m&page_size=n"
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        global_list = json.loads(response.text)
        return jsonify(global_list)

class MultiplePaginatedPolicies(Resource):
    def get(self):
        """
        GET /api/policies?company_name&page=<page>&limit=<limit>
        """
        url_params = request.args
        if url_params['page'] and url_params['limit']:
            # if paginated
            page = url_params['page']
            limit = url_params['limit']
            URL = "https://protectapi-au.cylance.com/policies/v2?page="+page+"&page_size="+limit
            search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            return jsonify(json.loads(response.text))

class MultiplePolicies(Resource):
    def get(self):
        """
        GET /api/policies?company_name
        """
        # no pagination
        url_params = request.args
        URL = "https://protectapi-au.cylance.com/policies/v2"
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        return jsonify(json.loads(response.text))

class SinglePolicy(Resource):
    def get(self, policy_id=None):
        """
        GET /api/policies/<policy_id>?company_name=<name>
        """
        url_params = request.args
        URL = "https://protectapi-au.cylance.com/policies/v2/"+policy_id
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        policy = json.loads(response.text)
        # return jsonify(policy if policy['tenantPolicyId'] else {"data": {"policy": policy, "message": "Policy fetched successfully"}})
        return jsonify(policy)

class Zones(Resource):
    def get(self, zone_id=None):
        """
        GET /api/zones?company_name=<name> - All zones - unpaginated.
        GET /api/zones/<zone_id>?company_name=<name> - one zone
        """
        url_params = request.args
        if zone_id:
            URL = "https://protectapi-au.cylance.com/zones/v2/"+zone_id
            search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            zone = json.loads(response.text)
            # return jsonify(policy if policy['tenantPolicyId'] else {"data": {"policy": policy, "message": "Policy fetched successfully"}})
            return jsonify(zone)
        else:
            URL = "https://protectapi-au.cylance.com/zones/v2/"
            search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            zone = json.loads(response.text)
            # return jsonify(policy if policy['tenantPolicyId'] else {"data": {"policy": policy, "message": "Policy fetched successfully"}})
            return jsonify(zone)

class PaginatedZones(Resource):
    def get(self):
        """
        GET /api/zones?company_name=<name>&page=<page>&limit=<limit> - All zones - paginated.
        """
        url_params = request.args
        page = url_params['page']
        limit = url_params['limit']
        URL = "https://protectapi-au.cylance.com/zones/v2?page="+page+"&page_size="+limit
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        zones = json.loads(response.text)
        return jsonify(zones)

class DeviceZones(Resource):
    def get(self):
        """
        GET /api/device-zones?company_name=<name>&zone_id=<zone_id>
        """
        url_params = request.args
        URL = "https://protectapi-au.cylance.com/zones/v2/"+str(url_params['zone_id'])+"/zones"
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device_zones = json.loads(response.text)
        return jsonify({
            "data": device_zones,
            "message": "Device zones fetched successfully." if device_zones['page_items'] else "No device zones found."
        })

class PaginatedDeviceZones(Resource):
    def get(self):
        """
        GET /api/paginated-device-zones?company_name=<name>&zone_id=<zone_id>&page=<page>&limit=<limit>
        """
        url_params = request.args
        page = url_params['page']
        limit = url_params['limit']
        URL = "https://protectapi-au.cylance.com/zones/v2/"+str(url_params['zone_id'])+"/zones?page="+page+"&page_size="+limit
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device_zones = json.loads(response.text)
        return jsonify({
            "data": device_zones,
            "message": "Device zones fetched successfully." if device_zones['page_items'] else "No device zones found."
        })

class ThreatsResource(Resource):
    def get(self, zone_hash=None):
        """
        GET /api/threats?company_name=<name>
        """
        url_params = request.args
        if zone_hash:
            print("Zone_HASH ==> ", zone_hash)
            URL = "https://protectapi-au.cylance.com/threats/v2/"+str(zone_hash)
            search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            threat = json.loads(response.text)
            # return jsonify({"message": "Invalid threat id"} if threat['message'] else {"data": threat, "message": "Threat fetched successfully."})
            return jsonify(threat)
        else:
            URL = "https://protectapi-au.cylance.com/threats/v2"
            search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            threats = json.loads(response.text)
            return jsonify({
                "data": {
                    "policy": threats,
                    "message": "Threats fetched successfully" if threats["page_items"] else "No threats found."
                }
            })

class PaginatedThreats(Resource):
    def get(self):
        """
        GET /api/paginated-threats?company_name=<name>&page=<page>&limit=<limit>
        """
        url_params = request.args
        page = url_params['page']
        limit = url_params['limit']
        URL = "https://protectapi-au.cylance.com/threats/v2?page="+page+"&page_size="+limit
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        threats = json.loads(response.text)
        return jsonify({
            "data": {
                "policy": threats,
                "message": "Threats fetched successfully" if threats["page_items"] else "No threats found."
            }
        })

class ThreatDevices(Resource):
    def get(self, threat_hash):
        """
        GET /api/threat-devices/<threat_hash>/devices
        """
        url_params = request.args
        URL = "https://protectapi-au.cylance.com/threats/v2/"+threat_hash+"/devices"
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device_threats = json.loads(response.text)
        return jsonify(device_threats)

class PaginatedThreatDevices(Resource):
    def get(self, threat_hash):
        """
        GET /api/paginated-threat-devices/<threat_hash>/devices?page=<page>&limit=<limit>
        """
        url_params = request.args
        page = url_params['page']
        limit = url_params['limit']
        URL = "https://protectapi-au.cylance.com/threats/v2/"+str(threat_hash)+"/devices?page="+page+"&page_size="+limit
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        device_threats = json.loads(response.text)
        # if device_threats['page_items']:
        return jsonify({"message": "Invalid threat hash identifier."} if 'message' in device_threats else {
            "data": device_threats,
            "message": "Threat devices fetched successfully" if device_threats['page_items'] else "No threat devices matching given hash."
        })

class ThreatDownloadURL(Resource):
    def get(self, threat_hash):
        """
        GET /api/v1/threat-download-url/<threat_hash>
        """
        url_params = request.args
        URL = "https://protectapi-au.cylance.com/threats/v2/"+str(threat_hash)
        search_company = CompanyInfo.query.filter_by(name=str(url_params['company_name'])).first()
        token = search_company.access_token
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + str(token)
        }
        response = requests.get(URL, headers=headers)
        threat_download_url = json.loads(response.text)
        if 'message' in threat_download_url:
            resp = jsonify({"message": "Invalid threat hash identifier"})
            resp.status_code = 404
            return resp
        resp = jsonify({
            "data": {
                "threat_download_url": threat_download_url,
                "message": "Threat download URL fethced successfully."
            }
        })
        resp.status_code = 200
        return resp
