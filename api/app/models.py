"""
Define application models.
"""
from datetime import datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class CompanyInfo(db.Model):
    """
    Define user fields.
    Contains attributes for a user
    """

    __tablename__ = 'company_info'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, nullable=False)
    company = db.Column(db.String, index=True, nullable=False)
    email = db.Column(db.String, index=True, nullable=False)
    phone_number = db.Column(db.String, index=True, nullable=False)
    tenant_id = db.Column(db.String, index=True, nullable=False)
    app_id = db.Column(db.String, index=True, nullable=False)
    comment = db.Column(db.String, index=True, nullable=False)
    access_token = db.Column(db.String, index=True, nullable=False)
