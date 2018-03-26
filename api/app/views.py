"""
To handle API CRUD operations.
"""
import uuid
from datetime import datetime, timedelta

import requests
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

class UsersResource(Resource):
    """
    User endpoints.
    """
    def get(self):
        """
        GET operations for users
        """
        url_params = request.args
        if url_params['user_id']:
            user_id = url_params['user_id']
            # # "https://protectapi-au.cylance.com/users/v2/{user_id | user_email_address}"
            URL = "https://protectapi-au.cylance.com/users/v2/"+user_id
            # search company
            search_company = CompanyInfo.query.filter_by(company=url_params['company_name']).first()
            # handle edge cases here!!!
            token = search_company.access_token
            print('token == ', token)
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            return jsonify({
                "data": {
                    "user": json.loads(response.text),
                },
                "message": "User fetched successfully."
            })
        else:
            page = url_params['page']
            limit = url_params['limit']
            company_name = url_params['company_name']
            # all_users_url = "https://protectapi-au.cylance.com/users/v2?page="+page+"&page_size="+limit
            URL = "https://protectapi-au.cylance.com/users/v2"
            # search company
            search_company = CompanyInfo.query.filter_by(company=url_params['company_name']).first()
            # handle edge cases here!!!
            token = search_company.access_token
            headers = {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + str(token)
            }
            response = requests.get(URL, headers=headers)
            return jsonify({
                "data": {
                    "users": json.loads(response.text),
                    "message": "Users fetched successfully"
                }
            })
