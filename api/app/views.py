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

<<<<<<< HEAD
from models import CompanyInfo
=======
from .models import CompanyInfo, db
>>>>>>> 95089ce91b23b5b43f086836a82489eeb8f75ba6

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
            or not payload['tenant_id'] or not payload['app_id'] or not payload['app_secret'] or not payload['comment']:
            response = jsonify({
                "status": "error",
                "message": "All fiends are required."
            })
            return response
        else:
            # 30 minutes from now
            timeout = 1800
            now = datetime.utcnow()
            timeout_datetime = now + timedelta(seconds=timeout)
            epoch_time = int((now - datetime(1970, 1, 1)).total_seconds())
            epoch_timeout = int((timeout_datetime - datetime(1970, 1, 1)).total_seconds())
            jti_val = str(uuid.uuid4())
            tid_val = payload['tenant_id'] # The tenant's unique identifier.
            AUTH_URL = "https://protectapi.cylance.com/auth/v2/token"

            claims = {
                "exp": epoch_timeout,
                "iat": epoch_time,
                "iss": "http://cylance.com",
                "sub": app_id,
                "tid": tid_val,
                "jti": jti_val
            }

            access_token = jwt.encode(claims, app_secret, algorithm='HS256')# auth token
            
            payload = {"auth_token": access_token}
            headers = {"Content-Type": "application/json; charset=utf-8"}
            resp = requests.post(AUTH_URL, headers=headers, data=json.dumps(payload))
            # print("http_status_code: ", str(resp.status_code))

            # save to db

            company_info = CompanyInfo(
                name=name, company=company,
                email=email, phone_number=phone_number,
                tenant_id=tenant_id,app_id=app_id, comment=comment,
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
                    "access_token": access_token
                }
            })
            company_info.status_code = 201
            return company_response
